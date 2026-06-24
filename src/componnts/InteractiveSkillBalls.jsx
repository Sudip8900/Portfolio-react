import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

const InteractiveSkillBalls = ({ skills, hoveredSkill, setHoveredSkill }) => {
  const containerRef = useRef(null);
  const ballRefs = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 300, height: 520 });
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isOverContainer: false });
  const draggedIndexRef = useRef(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Update container dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: rect.width || 300,
        height: rect.height || 280
      });
    };
    updateSize();

    // Slight delay to ensure the page has mounted and laid out
    const timer = setTimeout(updateSize, 150);

    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);

  // Determine ball radius based on container width
  const radius = dimensions.width < 360 ? 44 : 54; // 88px or 108px diameter

  // Re-initialize particles whenever skills, dimensions, or radius change
  useEffect(() => {
    const { width, height } = dimensions;
    const count = skills.length;
    if (count === 0) return;

    const newParticles = skills.map((skill, index) => {
      // Position particles in a ring centered in the container
      const angle = (index / count) * Math.PI * 2;
      const dist = Math.min(width, height) * 0.28;
      const cx = width / 2 + Math.cos(angle) * dist;
      const cy = height / 2 + Math.sin(angle) * dist;

      return {
        id: index,
        skill,
        x: Math.max(radius, Math.min(width - radius, cx)),
        y: Math.max(radius, Math.min(height - radius, cy)),
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        radius,
        mass: 1,
        isHovered: false
      };
    });

    particlesRef.current = newParticles;
  }, [skills, dimensions, radius]);

  // Physics animation loop
  useEffect(() => {
    let animationFrameId;

    const updatePhysics = () => {
      const particles = particlesRef.current;
      const ballElements = ballRefs.current;
      const { width, height } = dimensions;
      const mouse = mouseRef.current;
      const draggedIdx = draggedIndexRef.current;

      const friction = 0.992;
      const attractionForce = 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = ballElements[i];

        if (!p || !el) continue;

        // If this particle is being dragged by the mouse
        if (draggedIdx === i) {
          // Handled directly via mouse position updates
          // Just damp velocity so it stays clean when released
          p.vx = (mouse.x - p.x) * 0.5;
          p.vy = (mouse.y - p.y) * 0.5;
          p.x = mouse.x;
          p.y = mouse.y;
        } else if (p.isHovered && mouse.isOverContainer && draggedIdx === null) {
          // Attract hovered ball to mouse cursor
          p.vx += (mouse.x - p.x) * attractionForce;
          p.vy += (mouse.y - p.y) * attractionForce;
          p.vx *= 0.75;
          p.vy *= 0.75;

          p.x += p.vx;
          p.y += p.vy;
        } else {
          // Apply friction/damping to velocities
          p.vx *= friction;
          p.vy *= friction;

          // Keep a baseline float velocity so they don't stop completely
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed < 0.3) {
            const angle = Math.random() * Math.PI * 2;
            p.vx = Math.cos(angle) * 0.5;
            p.vy = Math.sin(angle) * 0.5;
          }

          p.x += p.vx;
          p.y += p.vy;
        }

        // Boundary collision logic (keep within container box)
        if (p.x - p.radius < 0) {
          p.x = p.radius;
          p.vx = -p.vx * 0.85;
        } else if (p.x + p.radius > width) {
          p.x = width - p.radius;
          p.vx = -p.vx * 0.85;
        }

        if (p.y - p.radius < 0) {
          p.y = p.radius;
          p.vy = -p.vy * 0.85;
        } else if (p.y + p.radius > height) {
          p.y = height - p.radius;
          p.vy = -p.vy * 0.85;
        }

        // Particle-to-particle collision detection and response
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2) continue;

          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = p.radius + p2.radius;

          if (dist < minDist) {
            // Overlap resolution
            const overlap = minDist - dist;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);

            // Separate the particles equally (since mass is identical)
            // Skip resolving overlap for the currently dragged particle to avoid jitter
            if (draggedIdx !== i && draggedIdx !== j) {
              p.x -= nx * overlap * 0.5;
              p.y -= ny * overlap * 0.5;
              p2.x += nx * overlap * 0.5;
              p2.y += ny * overlap * 0.5;
            }

            // Elastic collision velocities
            const kx = p.vx - p2.vx;
            const ky = p.vy - p2.vy;
            const pVal = 2 * (nx * kx + ny * ky) / (p.mass + p2.mass);

            p.vx -= pVal * p2.mass * nx;
            p.vy -= pVal * p2.mass * ny;
            p2.vx += pVal * p.mass * nx;
            p2.vy += pVal * p.mass * ny;
          }
        }

        // Apply visual updates directly to the DOM for hardware-accelerated 60fps rendering
        el.style.transform = `translate3d(${p.x - p.radius}px, ${p.y - p.radius}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate movement delta
    const dx = x - lastMouseRef.current.x;
    const dy = y - lastMouseRef.current.y;
    lastMouseRef.current = { x, y };

    mouseRef.current = {
      x,
      y,
      isOverContainer: true
    };

    // If dragging, update the particle velocity & position immediately
    const draggedIdx = draggedIndexRef.current;
    if (draggedIdx !== null) {
      const p = particlesRef.current[draggedIdx];
      if (p) {
        p.x = x;
        p.y = y;
        p.vx = dx;
        p.vy = dy;
      }
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOverContainer = false;
    draggedIndexRef.current = null;
    particlesRef.current.forEach(p => {
      p.isHovered = false;
    });
  };

  const handleMouseUp = () => {
    draggedIndexRef.current = null;
  };

  const handleMouseDown = (e, index) => {
    e.preventDefault();
    draggedIndexRef.current = index;
    const p = particlesRef.current[index];
    if (p) {
      p.vx = 0;
      p.vy = 0;
    }
  };

  const setBallHoverState = (index, isHovered) => {
    if (particlesRef.current[index]) {
      particlesRef.current[index].isHovered = isHovered;
      if (isHovered) {
        setHoveredSkill(skills[index]);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      className="interactive-skill-balls-container relative w-full h-[520px] rounded-xl border border-[#cfccb8]/60 bg-[#111111]/[0.02] overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Grid Pattern Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.025)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {skills.map((skill, index) => {
        const isCurrentHovered = hoveredSkill?.name === skill.name;
        return (
          <div
            key={skill.name}
            ref={el => ballRefs.current[index] = el}
            onMouseEnter={() => setBallHoverState(index, true)}
            onMouseLeave={() => setBallHoverState(index, false)}
            onMouseDown={(e) => handleMouseDown(e, index)}
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              position: 'absolute',
              left: 0,
              top: 0,
              willChange: 'transform',
            }}
            className="group flex flex-col items-center justify-center p-1.5 text-center pointer-events-auto"
          >
            {/* The Outer Bubble Circle with responsive size */}
            <div
              className={`w-full h-full rounded-full flex flex-col items-center justify-center border transition-all duration-300 ${isCurrentHovered
                ? 'border-orange-600 bg-orange-600 text-white scale-110 shadow-lg shadow-orange-600/30'
                : 'border-[#cfccb8] bg-[#eae8e4]/85 hover:border-orange-600/50 hover:bg-[#eae8e4] text-[#111111]'
                }`}
            >
              {skill.icon ? (
                <Icon
                  icon={skill.icon}
                  width={radius > 50 ? '36' : '28'}
                  height={radius > 50 ? '36' : '28'}
                  className={`transition-transform duration-300 ${isCurrentHovered ? 'scale-105' : 'group-hover:scale-110'}`}
                />
              ) : (
                <Icon
                  icon="mdi:code-braces"
                  width={radius > 50 ? '36' : '28'}
                  height={radius > 50 ? '36' : '28'}
                  className={`transition-transform duration-300 ${isCurrentHovered ? 'scale-105' : 'group-hover:scale-110'}`}
                />
              )}
              <span className={`font-bold tracking-wider mt-1.5 uppercase truncate max-w-[90%] ${radius > 50 ? 'text-[11px]' : 'text-[9px]'}`}>
                {skill.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InteractiveSkillBalls;
