import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/hero'

const App = () => {
  return (
    <div className='relative w-screen min-h-screen overflow-auto'>
      <Navbar/>
      <Hero/>
    </div>
  )
}

export default App