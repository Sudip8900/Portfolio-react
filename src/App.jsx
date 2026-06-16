import React, { useEffect } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/hero'
import AboutSummery from './sections/AboutSummery';
import About from './sections/About';
import ReactLenis from 'lenis/react';
import Works from './sections/Works';
import ContactSummary from './sections/ContactSummary';
import Contact from './sections/Contact';
import { useProgress } from '@react-three/drei';
import { useState } from 'react';
import Experience from './sections/Experience';

import CustomCursor from './componnts/CustomCursor';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {

  const { progress } = useProgress();
  const [loadingPhase, setLoadingPhase] = useState('loading');
  const [IsReady, setIsReady] = useState(false);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (progress === 100 && loadingPhase === 'loading') {
      setLoadingPhase('complete');

      const tl = gsap.timeline({
        onComplete: () => {
          setLoadingPhase('hidden');
          setIsReady(true);
        }
      });

      tl.to(".hud-element", {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.inOut"
      }, "+=0.8") // Show READY state briefly
        .to(".hud-door-top", {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut"
        }, "doors")
        .to(".hud-door-bottom", {
          yPercent: 100,
          duration: 1,
          ease: "power3.inOut"
        }, "doors");
    }

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [progress, loadingPhase]);

  useEffect(() => {
    if (!lenis) return;

    // Sync GSAP and Lenis to fix Chrome stuttering
    lenis.on('scroll', ScrollTrigger.update);

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Crucial for preventing jumps

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [lenis]);

  return (
    <>
      <CustomCursor />
      <ReactLenis root
        ref={(node) => {
          if (node && node.lenis) {
            setLenis(node.lenis);
          }
        }}
        autoRaf={false}
        options={{
          smoothWheel: true,
          wheelMultiplier: 1,
          prevent: (node) => node.closest('.scroll-container')
        }} className='relative w-full overflow-x-clip min-h-screen'>
        {loadingPhase !== 'hidden' && (
          <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center text-orange-600 overflow-hidden pointer-events-none'>

            {/* Split Doors */}
            <div className="hud-door-top absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-b border-orange-500/10"></div>
            <div className="hud-door-bottom absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-t border-orange-500/10"></div>

            {/* HUD Central Ring */}
            <div className="hud-element relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96">
              {/* Rotating Rings */}
              <div className="absolute inset-0 border-2 border-orange-500/10 rounded-full border-t-orange-600 animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-4 border-2 border-orange-500/10 rounded-full border-b-orange-600 animate-[spin_4s_linear_infinite_reverse]" />
              <div className="absolute inset-8 border border-orange-500/5 rounded-full border-l-orange-600/30 animate-[spin_2s_linear_infinite]" />

              {/* Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-orange-500/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[1px] bg-orange-500/10" />
              </div>

              {/* Progress Text inside Ring */}
              <div className="absolute flex flex-col items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#050505] border border-orange-500/20">
                <span className="text-[0.6rem] md:text-xs tracking-[0.3em] text-orange-500/50 mb-1">
                  {loadingPhase === 'complete' ? 'SYSTEM' : 'LOADING'}
                </span>
                <span className="text-3xl md:text-5xl font-bold text-orange-600 font-sans">
                  {loadingPhase === 'complete' ? 'READY' : `${Math.floor(progress)}%`}
                </span>
              </div>
            </div>

            {/* HUD Brackets & Extra Details */}
            <div className="hud-element absolute top-10 left-10 border-t-2 border-l-2 border-orange-500/20 w-16 h-16"></div>
            <div className="hud-element absolute top-10 right-10 border-t-2 border-r-2 border-orange-500/20 w-16 h-16"></div>
            <div className="hud-element absolute bottom-10 left-10 border-b-2 border-l-2 border-orange-500/20 w-16 h-16"></div>
            <div className="hud-element absolute bottom-10 right-10 border-b-2 border-r-2 border-orange-500/20 w-16 h-16"></div>

            {/* Data Stream / Logs */}
            <div className="hud-element absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-[0.5rem] md:text-[10px] tracking-[0.2em] text-orange-500/40">
              <span>[SYS.BOOT] INITIALIZE SEQUENCE...</span>
              <span>
                {progress < 30 ? 'ALLOCATING MEMORY...' : progress < 60 ? 'COMPILING SHADERS...' : progress < 90 ? 'BUILDING GEOMETRY...' : 'FINALIZING...'}
              </span>
            </div>

          </div>
        )}
        <div className="z-50 relative pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar IsReady={IsReady} />
          </div>
        </div>
        <Hero IsReady={IsReady} />
        <div className={`${IsReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <AboutSummery />
          <About />
          <Works />
          <Experience />
          <ContactSummary />
          <Contact />
        </div>
      </ReactLenis>
    </>
  )
}

export default App