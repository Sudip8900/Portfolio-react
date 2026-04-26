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
  const [IsReady, setIsReady] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on load
    window.scrollTo(0, 0);
  }, [progress]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;

    // Sync GSAP and Lenis to fix Chrome stuttering
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Crucial for preventing jumps

    return () => {
      gsap.ticker.remove(update);
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
      }
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ReactLenis root
        ref={lenisRef}
        autoRaf={false}
        options={{
          smoothWheel: true,
          wheelMultiplier: 1,
          prevent: (node) => node.closest('.scroll-container')
        }} className='relative w-full overflow-x-hidden min-h-screen'>
        {!IsReady && (
          <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-orange-500 transition-opacity duration-1000 font-bold'>
            <div className="flex flex-col items-center justify-center mb-10 w-full max-w-lg px-10">

              {/* Main Glitch Text */}
              <h1 className='text-3xl md:text-5xl tracking-[0.5em] mb-4 uppercase drop-shadow-[0_0_15px_rgba(255,105,0,0.8)] animate-pulse'>
                {progress < 100 ? 'Loading' : 'Ready'}
              </h1>

              {/* Technical Sub-readout */}
              <div className="flex w-full justify-between text-[0.6rem] md:text-xs text-orange-500/80 tracking-[0.2em] mb-3 uppercase font-mono">
                <span>[sys.boot]</span>
                <span>
                  {progress < 30 ? 'Initializing Engine' : progress < 60 ? 'Compiling Shaders' : progress < 90 ? 'Building World' : 'Spawning'}...
                </span>
                <span>{Math.floor(progress)}%</span>
              </div>

              {/* Segmented Neon Progress Bar */}
              <div className='relative h-1 md:h-1.5 w-full bg-orange-950/30 overflow-hidden border border-orange-500/20'>
                <div
                  className='absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_20px_rgba(255,105,0,1)] transition-all duration-300 ease-out'
                  style={{ width: `${progress}%` }}
                />
                {/* Fake Grid Stencil Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9InRyYW5zcGFyZW50Ii8+PHJlY3QgeD0iMyIgd2lkdGg9IjEiIGhlaWdodD0iNCIgZmlsbD0icmdiYSgwLDAsMCwwLjgpIi8+PC9zdmc+')] mix-blend-overlay pointer-events-none" />
              </div>

            </div>
          </div>
        )}
        <div className={`${IsReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
          <Navbar />
          <Hero />
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