import { gsap } from 'gsap';
import React, { use, useEffect, useState } from 'react'
import { useRef } from 'react'
import { socials } from '../constants';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-scroll';

const Navbar = () => {
    const navRef = useRef(null);
    const navref2 = useRef(null);
    const linkRef = useRef([]);
    const contactRef = useRef(null);
    const toplineRef = useRef(null);
    const bottomlineRef = useRef(null);
    const tl = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const icontl = useRef(null);
    const [showBurger, setShowBurger] = useState(true);

    useGSAP(() => {
        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linkRef.current, contactRef.current], {
            autoAlpha: 0,
            x:-20,
        });

        tl.current = gsap.timeline({paused: true}).to(
            navRef.current, { 
                xPercent: 0, 
                duration: 1, 
                ease: "power3.out" 
        }).to(linkRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        },"<").to(contactRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        }, "<");

        gsap.from(navref2.current, {
            yPercent: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        });

        icontl.current = gsap.timeline({paused: true}).to(toplineRef.current, {
            rotate: 45,
            y: 3.3,
            duration: 0.3,
            ease: "power3.out"
        }).to(bottomlineRef.current, {
            rotate: -45,
            y: -3.3,
            duration: 0.3,
            ease: "power3.out"
        }, "<");
    }, []);

    const toggleMenue = () => {
        if(!isOpen){
            icontl.current.play();
            tl.current.play();
        }else{
            icontl.current.reverse();
            tl.current.reverse();
        }
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav ref={navref2} className=' hidden md:fixed md:z-50 md:flex md:flex-row md:justify-between md:w-full md:h-20 md:p-10 text-black'>
                <div className='text-4xl'><h1>Sudip's Portfolio</h1></div>
                <div className='flex flex-row text-2xl gap-x-10 ml-auto'>
                    {['home', 'about', 'work', 'contact'].map((section, index) => (
                        <div><Link className='transition-all p-2 duration-500 cursor-pointer hover:text-[1.75rem] active:bg-black active:rounded-[25px] active:text-white' to={`${section}`} smooth offset={0} duration={200}>{section}</Link></div>
                    ))}
                </div>
            </nav>
            <nav ref={navRef} className='fixed z-50 w-full h-full flex flex-col justify-between px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:hidden '>
                <div className='flex flex-col text-5xl gap-y-2'>
                    {['home', 'about', 'work', 'contact'].map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)}><Link className='transition-all duration-500 cursor-pointer hover:text-white' to={`${section}`} smooth offset={0} duration={200}n>{section}</Link></div>
                    ))}
                </div>
                <div ref={contactRef} className='flex flex-col flex-wrap justify-between gap-8'>
                    <div>
                        <p className='text-white/60 tracking-wider'>E-mail</p>
                        <p className='text-pretty'>iamsudippan@gmail.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-light text-white/60 tracking-wider'>Social Media</p>
                        <div className='flex flex-col flex-wrap'>{socials.map((social, index) => (
                            <a key={index} href={social.href} target='_blank' className='hover:underline underline-offset-2'>{social.name}</a>
                        ))}</div>
                    </div>
                </div>
            </nav>
            <div className='text-2xl m-5 fixed md:hidden'><h1>Sudip's Portfolio</h1></div>
            <div className='fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 top-3 right-10 md:hidden' onClick={toggleMenue}>
                <span ref={toplineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
                <span ref={bottomlineRef} className='block w-8 h-0.5 bg-white rounded-full origin-center'></span>
            </div>
        </>
    )
}

export default Navbar