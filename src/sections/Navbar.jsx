import { gsap } from 'gsap';
import React, { use, useEffect, useState } from 'react'
import { useRef } from 'react'
import { socials } from '../constants';
import { useGSAP } from '@gsap/react';
import { Link, Events, scrollSpy } from 'react-scroll';
import { useLenis } from 'lenis/react';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';


const Navbar = () => {
    const navRef = useRef(null);
    const navref2 = useRef(null);
    const linkRef = useRef([]);
    const linkRef2 = useRef([]);
    const contactRef = useRef(null);
    const toplineRef = useRef(null);
    const bottomlineRef = useRef(null);
    const tl = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const icontl = useRef(null);
    const titleRef = useRef(null);
    const BurgerRef = useRef(null);


    // Smooth sliding indicator state
    const indicatorRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsList = ['home', 'about', 'works', 'experience', 'contact'];


    useGSAP(() => {

        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linkRef.current, contactRef.current], {
            autoAlpha: 0,
            x: -20,
        });

        tl.current = gsap.timeline({ paused: true }).to(
            navRef.current, {
            xPercent: 0,
            duration: 1,
            ease: "power3.out"
        }).to(linkRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "<").to(contactRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "<").to(navRef.current, {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
        }, "<+0.5");

        gsap.from(navref2.current, {
            y: 50,
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)",
            transformOrigin: "center center"
        }, "<+1");

        gsap.to(linkRef2.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "<");

        icontl.current = gsap.timeline({ paused: true }).to(toplineRef.current, {
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
        if (!isOpen) {
            icontl.current.play();
            tl.current.play();
        } else {
            icontl.current.reverse();
            tl.current.reverse();
        }
        setIsOpen(!isOpen);
    };

    const lenis = useLenis();

    useEffect(() => {
        // Update active link on page load
        scrollSpy.update();

        // Also update after window load (important for refresh cases)
        window.addEventListener("load", scrollSpy.update);

        return () => {
            window.removeEventListener("load", scrollSpy.update);
        };
    }, []);

    // Animate the smooth sliding indicator
    useEffect(() => {
        if (indicatorRef.current && linkRef2.current[activeIndex]) {
            const activeEl = linkRef2.current[activeIndex];
            gsap.to(indicatorRef.current, {
                x: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
                duration: 0.6,
                ease: "elastic.out(1, 0.7)",
            });
        }
    }, [activeIndex]);

    const handleSetActive = (to) => {
        const index = sectionsList.indexOf(to);
        if (index !== -1) setActiveIndex(index);
    };

    return (
        <>
            <div ref={navref2} className="hidden md:flex fixed top-4 left-4 right-4 z-50 items-center justify-center gap-4 pointer-events-none">

                {/* Main Glass Navbar */}
                <nav
                    className="flex items-center justify-between px-10 py-4 rounded-full bg-[#0a0a0a]/80 backdrop-blur-[32px] border border-orange-500/30 w-full max-w-7xl relative pointer-events-auto shadow-[0_0_30px_rgba(255,105,0,0.05)]">
                    {/* Logo */}
                    <div className="text-xl font-bold tracking-widest uppercase text-white flex items-center gap-3">
                        <span className="w-2 h-2 bg-orange-500 animate-pulse drop-shadow-[0_0_5px_rgba(255,105,0,1)]"></span>
                        <h1>SUDIP.DEV</h1>
                    </div>

                    {/* Links */}
                    <div className="flex text-[1.1rem] gap-x-12 font-medium tracking-wider relative">
                        {/* Dynamic Floating Indicator */}
                        <div
                            ref={indicatorRef}
                            className="absolute -bottom-2 left-0 h-[3px] bg-orange-500 rounded-full pointer-events-none shadow-[0_0_15px_rgba(255,105,0,1)]"
                        />

                        {sectionsList.map((section, index) => (
                            <Magnetic key={index}>
                                <div className="inline-block relative py-1" ref={(el) => (linkRef2.current[index] = el)}>
                                    <Link
                                        spy={true}
                                        activeClass='!text-orange-500 pointer-events-none scale-110 drop-shadow-[0_0_10px_rgba(255,105,0,0.5)]'
                                        className="transition-all duration-300 cursor-pointer tracking-widest text-xs text-white/50 hover:text-orange-500 uppercase inline-block"
                                        to={section}
                                        smooth
                                        duration={200}
                                        offset={-100}
                                        onSetActive={handleSetActive}
                                    >
                                        {section}
                                    </Link>
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </nav>


            </div>

            <nav ref={navRef} className='fixed z-50 w-full h-full flex flex-col justify-between px-10 uppercase bg-[#0a0a0a]/95 backdrop-blur-xl border-l-2 border-orange-500/30 text-white/80 pt-24 pb-16 gap-y-10 md:hidden shadow-2xl overflow-y-auto'>
                <div className='flex flex-col text-3xl gap-y-10 font-bold tracking-widest mt-10'>
                    <div className="text-orange-500/50 text-[10px] tracking-widest mb-2 border-b border-orange-500/20 pb-2">// SELECT_DIRECTORY</div>
                    {['home', 'about', 'works', 'experience', 'contact'].map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)} className="group">
                            <Link onClick={toggleMenue} className='flex items-center transition-all duration-300 cursor-pointer text-white/70 hover:text-orange-500' to={`${section}`} smooth offset={0} duration={200}>
                                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity mr-4">{'>'}</span>
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>
                <div ref={contactRef} className='flex flex-col gap-10 mb-10'>
                    <div>
                        <p className='text-orange-500 tracking-widest text-[10px] mb-2 border-b border-orange-500/20 pb-2'>// SYS.CONTACT</p>
                        <p className='text-sm text-white/70 hover:text-orange-500 transition-colors cursor-pointer'>iamsudippan@gmail.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-orange-500 tracking-widest text-[10px] mb-2 border-b border-orange-500/20 pb-2'>// SYS.SOCIALS</p>
                        <div className='flex flex-col gap-4'>{socials.map((social, index) => (
                            <a key={index} href={social.href} target='_blank' className='text-sm text-white/70 hover:text-orange-500 transition-colors'>[ {social.name} ]</a>
                        ))}</div>
                    </div>
                </div>
            </nav>

            <div>
                <div ref={titleRef} className='text-lg font-bold tracking-widest uppercase text-white fixed m-5 md:hidden bg-[#0a0a0a]/80 backdrop-blur-md border border-orange-500/30 shadow-[0_0_15px_rgba(255,105,0,0.1)] px-5 py-3 flex items-center gap-3 z-40'>
                    <span className="w-2 h-2 bg-orange-500 animate-pulse drop-shadow-[0_0_5px_rgba(255,105,0,1)]"></span>
                    <h1>SUDIP.DEV</h1>
                </div>
                <div ref={BurgerRef} className='fixed z-[60] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 bg-[#0a0a0a]/80 backdrop-blur-md border border-orange-500/30 shadow-[0_0_15px_rgba(255,105,0,0.1)] cursor-pointer w-12 h-12 top-5 right-5 md:hidden hover:border-orange-500 hover:bg-orange-500/10' onClick={toggleMenue}>
                    <span ref={toplineRef} className='block w-5 h-[2px] bg-orange-500 origin-center transition-all'></span>
                    <span ref={bottomlineRef} className='block w-5 h-[2px] bg-orange-500 origin-center transition-all'></span>
                </div>
            </div>
        </>
    )
}

export default Navbar