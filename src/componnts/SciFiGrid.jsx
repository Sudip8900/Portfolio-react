import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────
//  Vertex shader — standard pass-through
// ─────────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// ─────────────────────────────────────────────────────────────
//  Fragment shader — hex grid with left→right ripple wave
// ─────────────────────────────────────────────────────────────
const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  #define SQRT3 1.7320508075688772

  // ── Nearest hex-centre offset for a flat-top hex grid ──────
  // Returns the vector from the nearest hex centre to p.
  vec2 hexOffset(vec2 p) {
    // Hex tiling vectors: right=(SQRT3,0), upper-right=(SQRT3/2,1.5)
    vec2 h = vec2(SQRT3, 1.5);
    vec2 a = mod(p,         h) - h * 0.5;
    vec2 b = mod(p - h * 0.5, h) - h * 0.5;
    return dot(a, a) < dot(b, b) ? a : b;
  }

  // ── Hex SDF (unsigned): 0 at centre, 1 at the edge vertex ──
  // Works on the offset vector from hexOffset().
  float hexDist(vec2 p) {
    p = abs(p);
    // max of three "side distances" in cube-coord space
    float c = dot(p, normalize(vec2(1.0, SQRT3)));
    return max(c, p.x);
  }

  void main() {
    // Centre UV in [-aspect, aspect] × [-1, 1]
    vec2 uv = vUv - 0.5;
    uv.x *= 1.9;           // approximate aspect ratio of viewport

    // ── Hex grid ────────────────────────────────────────────
    float hexScale = 12.0; // ~12-13 cells across
    vec2  p        = uv * hexScale;

    vec2 gv     = hexOffset(p);      // offset from nearest hex centre
    vec2 center = p - gv;            // position of that hex centre

    // ── Ripple: phase driven by hex-centre X → travels left→right
    float freq    = 1.1;
    float speed   = 1.6;
    float phase   = center.x * freq - uTime * speed;
    float ripple  = sin(phase) * 0.5 + 0.5;

    // Second harmonic adds visual depth
    float ripple2 = sin(phase * 0.48 + 1.3) * 0.5 + 0.5;
    ripple = mix(ripple, ripple2, 0.28);

    // ── Hex edge band ────────────────────────────────────────
    float d        = hexDist(gv);
    float hexEdge  = 0.95;    // where the edge starts (0–1 range of hexDist)
    float lineW    = 0.10;    // edge band thickness

    // Create the hex outline (a thin annular band near the edge)
    float edge = smoothstep(hexEdge,        hexEdge - lineW,       d)
               - smoothstep(hexEdge - lineW, hexEdge - lineW*1.8,  d);

    // Modulate edge brightness by ripple
    float edgeBright = edge * (0.12 + 0.88 * ripple);

    // Soft holographic fill at ripple peaks
    float interior = 1.0 - smoothstep(0.0, hexEdge, d);
    float fill     = interior * pow(ripple, 5.0) * 0.10;

    float intensity = edgeBright + fill;

    // ── Radial vignette ──────────────────────────────────────
    float vig = 1.0 - smoothstep(0.42, 0.95, length(uv));
    intensity *= vig;

    // ── Color: orange → warm gold at ripple peaks ────────────
    vec3 baseColor = vec3(1.00, 0.42, 0.00);   // #ff6a00
    vec3 peakColor = vec3(1.00, 0.72, 0.18);   // warm amber
    vec3 color     = mix(baseColor, peakColor, ripple * edge);

    gl_FragColor = vec4(color, intensity * uOpacity);
  }
`;

// ─────────────────────────────────────────────────────────────
//  React component
// ─────────────────────────────────────────────────────────────
export function SciFiGrid({ IsReady }) {
  const matRef = useRef(null);

  // Fade in when loading is done
  useGSAP(() => {
    if (!IsReady || !matRef.current) return;
    gsap.to(matRef.current.uniforms.uOpacity, {
      value: 1,
      duration: 2.8,
      ease: 'power2.out',
      delay: 0.4,
    });
  }, { dependencies: [IsReady] });

  // Drive the time uniform every frame
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -3.5]}>
      {/* Plane large enough to fill the background at this depth */}
      <planeGeometry args={[14, 9]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        uniforms={{
          uTime:    { value: 0 },
          uOpacity: { value: 0 },
        }}
      />
    </mesh>
  );
}
