import React, { useEffect } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/hero'
import AboutSummery from './sections/AboutSummery';
import About from './sections/About';
import ReactLenis from 'lenis/react';
import Works from './sections/works';

const App = () => {

  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root
      options={{
        smoothWheel: true,
        wheelMultiplier: 1,
        prevent: (node) => node.closest('.scroll-container')
      }} className='relative w-screen min-h-screen'>
      <Navbar />
      <Hero />
      <AboutSummery />
      <About />
      <Works />
    </ReactLenis>
  )
}

export default App
