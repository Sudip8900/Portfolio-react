import React from 'react'
import AutoType from '../componnts/autotype'
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const headingRef = useRef(null);
    useGSAP(() => {

        gsap.from(headingRef.current, {
            duration: 1,
            opacity: 0,
            yPercent: 200,
            ease: "circ.out",
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
            }
        });
    });

    return (
        <section id="about" className='min-h-screen bg-black rounded-t-4xl'>
            <div className='text-white text-4xl md:text-8xl font-bold p-5 pl-2 pb-1 md:p-10 md:pb-1'>
                <h1 ref={headingRef} className='inline-block text-center w-full md:text-start'>About Me</h1>
            </div>
            <div className='bg-black border-t-orange-500 border-t-2 py-20 px-5 md:px-10 rounded-t-[50px]'>
                
            </div>
        </section>
    )
}

export default About