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

const App = () => {

  const { progress } = useProgress();
  const [IsReady, setIsReady] = useState(false);

  console.log(progress);

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

  return (
    <ReactLenis root
      options={{
        smoothWheel: true,
        wheelMultiplier: 1,
        prevent: (node) => node.closest('.scroll-container')
      }} className='relative w-screen min-h-screen'>
        {!IsReady && <div className='fixed inset-0 z-999 flex flex-col items-center justify-center bg-white text-orange-500 transition-opacity duration-700 font-bold'>
          <p className='mb-4 text-xl tracking-widest animate-pulse md:text-4xl'>Loading {Math.floor(progress)}%</p>
          <div className='relative h-1 overflow-hidden rounded w-60 bg-gray-200 md:h-2 md:w-150'>
            <div className='absolute top-0 left-0 h-full bg-orange-500 w-full' style={{ width: `${progress}%` }}></div>
          </div>
          </div>}
      <div className={`${IsReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
        <Navbar />
        <Hero />
        <AboutSummery />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  )
}

export default App
