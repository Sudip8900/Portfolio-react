import React, { useEffect } from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/hero'
import About from './sections/About'

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
    <div className='relative w-screen min-h-screen overflow-auto'>
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default App
