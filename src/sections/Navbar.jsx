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
            duration: 0.8,
            ease: "power3.out"
        }).to(linkRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out"
        }, "<0.2").to(contactRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "<0.3");

        gsap.from(navref2.current, {
            y: -50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
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
                duration: 0.5,
                ease: "power3.out",
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

                {/* HUD Navbar Panel */}
                <nav
                    className="flex items-center justify-between px-8 py-3 bg-[#0a0a0a]/90 backdrop-blur-md border-y border-orange-500/50 w-full max-w-7xl relative pointer-events-auto shadow-[0_0_30px_rgba(255,105,0,0.1)] group"
                    style={{ clipPath: "polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)" }}
                >
                    {/* Decorative Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-[2px] animate-[dropLine_4s_linear_infinite] pointer-events-none z-0" />

                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500 z-10" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500 z-10" />

                    {/* Branding & Telemetry */}
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="flex flex-col border-r border-orange-500/30 pr-6">
                            <div className="text-[9px] text-orange-500/70 tracking-[0.3em] uppercase mb-1">// NETWORK</div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 animate-pulse drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
                                <span className="text-[10px] text-white/80 tracking-widest">UPLINK: SECURE</span>
                            </div>
                        </div>
                        <div className="text-xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,105,0,0.3)]">
                            [ SYS.ID // SUDIP.DEV ]
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex text-[0.8rem] gap-x-6 font-medium tracking-[0.2em] relative z-10 py-2">
                        {/* Dynamic Targeting Box Indicator */}
                        <div
                            ref={indicatorRef}
                            className="absolute top-0 left-0 h-full border border-orange-500 bg-orange-500/10 pointer-events-none shadow-[0_0_15px_rgba(255,105,0,0.2)] z-0"
                            style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
                        />

                        {sectionsList.map((section, index) => (
                            <Magnetic key={index}>
                                <div className="inline-block relative px-5 py-2 z-10 cursor-pointer" ref={(el) => (linkRef2.current[index] = el)}>
                                    <Link
                                        spy={true}
                                        activeClass='!text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                                        className="transition-all duration-300 tracking-widest text-white/40 hover:text-orange-500 uppercase inline-block"
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

            {/* Mobile Slide-Out Menu */}
            <nav ref={navRef} className='fixed top-0 right-0 z-50 w-full h-full flex flex-col justify-between px-8 uppercase bg-[#050505]/95 backdrop-blur-xl border-l border-orange-500/50 text-white/80 pt-28 pb-10 gap-y-8 md:hidden shadow-[-20px_0_50px_rgba(255,105,0,0.1)] overflow-y-auto'>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500/50 to-transparent" />

                <div className='flex flex-col text-3xl gap-y-8 font-bold tracking-widest relative z-10'>
                    <div className="text-orange-500 text-[10px] tracking-[0.3em] mb-4 border-b border-orange-500/30 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 animate-pulse"></span>
                        // DIRECTORY_ACCESS
                    </div>

                    {sectionsList.map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)} className="group border-l-2 border-transparent hover:border-orange-500 pl-4 transition-all">
                            <Link onClick={toggleMenue} className='flex items-center transition-all duration-300 cursor-pointer text-white/50 hover:text-white drop-shadow-[0_0_10px_rgba(255,105,0,0)] hover:drop-shadow-[0_0_10px_rgba(255,105,0,0.8)]' to={`${section}`} smooth offset={0} duration={200}>
                                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity mr-4 text-xl">{'>'}</span>
                                [{section}]
                            </Link>
                        </div>
                    ))}
                </div>

                <div ref={contactRef} className='flex flex-col gap-8 relative z-10 mt-auto border-t border-orange-500/30 pt-8'>
                    <div>
                        <p className='text-orange-500 tracking-[0.3em] text-[10px] mb-3'>// SYS.CONTACT</p>
                        <p className='text-sm text-white/70 hover:text-orange-500 transition-colors cursor-pointer'>iamsudippan@gmail.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-orange-500 tracking-[0.3em] text-[10px] mb-3'>// SYS.UPLINKS</p>
                        <div className='flex flex-wrap gap-4'>
                            {socials.map((social, index) => (
                                <a key={index} href={social.href} target='_blank' className='text-xs text-white/70 hover:text-white hover:bg-orange-500/20 border border-orange-500/30 px-3 py-1 transition-all'>
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Header Elements */}
            <div>
                {/* Mobile Sci-Fi Logo */}
                <div ref={titleRef} className='text-sm font-bold tracking-widest uppercase text-white fixed m-5 md:hidden bg-[#0a0a0a]/90 backdrop-blur-md border border-orange-500/50 shadow-[0_0_15px_rgba(255,105,0,0.2)] px-4 py-3 flex items-center gap-3 z-40' style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}>
                    <span className="w-1.5 h-1.5 bg-orange-500 animate-pulse drop-shadow-[0_0_5px_rgba(255,105,0,1)]"></span>
                    <h1>SYS // SUDIP.DEV</h1>
                </div>

                {/* Mobile Toggle Button */}
                <div ref={BurgerRef} className='fixed z-[60] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 bg-[#0a0a0a]/90 backdrop-blur-md border border-orange-500/50 shadow-[0_0_15px_rgba(255,105,0,0.2)] cursor-pointer w-12 h-12 top-5 right-5 md:hidden hover:border-orange-500 hover:bg-orange-500/10' onClick={toggleMenue} style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}>
                    <span ref={toplineRef} className='block w-5 h-[2px] bg-orange-500 origin-center transition-all'></span>
                    <span ref={bottomlineRef} className='block w-5 h-[2px] bg-orange-500 origin-center transition-all'></span>
                </div>
            </div>
        </>
    )
}

export default Navbar