import { gsap } from 'gsap';
import React, { use, useEffect, useState } from 'react'
import { useRef } from 'react'
import { socials } from '../constants';
import { useGSAP } from '@gsap/react';
import { Link, Events, scrollSpy } from 'react-scroll';
import { useLenis } from 'lenis/react';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';
import { useTheme } from '../componnts/ThemeContext.jsx';

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
    const { theme, toggleTheme } = useTheme();
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const hasSeenHint = localStorage.getItem('hasSeenThemeHint');
        if (!hasSeenHint) {
            const timer = setTimeout(() => setShowHint(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismissHint = () => {
        setShowHint(false);
        localStorage.setItem('hasSeenThemeHint', 'true');
    };

    // Smooth sliding indicator state
    const indicatorRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsList = ['home', 'about', 'works', 'contact'];


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
            stagger: 0.1,
            ease: "power3.out"
        }, "<").to(contactRef.current, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
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

        gsap.set(linkRef2.current, {
            autoAlpha: 0,
            y: -20
        });

        gsap.to(linkRef2.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
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
                    className="flex items-center justify-between px-10 py-5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-[32px] backdrop-saturate-[180%] border border-black/10 dark:border-white/10 w-full max-w-7xl relative pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors duration-500">
                    {/* Logo */}
                    <div className="text-2xl font-bold tracking-widest uppercase text-black dark:text-white transition-colors duration-500 flex items-center gap-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
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
                                        activeClass='!text-black dark:!text-white pointer-events-none scale-110 drop-shadow-[0_0_10px_rgba(255,105,0,0.5)]'
                                        className="transition-all duration-300 cursor-pointer text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white uppercase inline-block"
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

                <div className="relative group">
                    <button 
                        onClick={() => { toggleTheme(); if(showHint) dismissHint(); }} 
                        className="flex items-center justify-center p-5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-[32px] backdrop-saturate-[180%] border border-black/10 dark:border-white/10 text-black dark:text-white pointer-events-auto shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:text-orange-500 dark:hover:text-orange-500 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-500 z-50"
                    >
                        {theme === 'light' ? <Icon icon="solar:moon-bold" width="24" height="24" /> : <Icon icon="solar:sun-bold" width="24" height="24" />}
                    </button>
                    {showHint && (
                        <div className="absolute top-full right-0 mt-4 w-40 bg-black/80 backdrop-blur-md border border-orange-500/50 rounded-xl p-3 shadow-[0_5px_20px_rgba(255,105,0,0.2)] pointer-events-auto animate-bounce z-50">
                            <p className="text-white text-xs text-center font-bold">Try the new Light/Dark mode!</p>
                            <div className="absolute -top-2 right-6 w-4 h-4 bg-black border-t border-l border-orange-500/50 rotate-45"></div>
                            <button onClick={dismissHint} className="absolute -top-2 -right-2 text-gray-400 hover:text-white bg-black rounded-full border border-orange-500/50 p-0.5">
                                <Icon icon="solar:close-circle-bold" width="16" height="16" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Slide-Out */}
            <nav ref={navRef} className='fixed z-50 w-full h-full flex flex-col justify-between px-10 uppercase bg-white/90 dark:bg-black/90 backdrop-blur-xl border-l border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 transition-colors duration-500 py-32 gap-y-10 md:hidden rounded-l-[40px] shadow-2xl'>
                <div className='flex flex-col text-5xl gap-y-4 font-bold tracking-wider'>
                    {['home', 'about', 'works', 'contact'].map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)}>
                            <Link onClick={toggleMenue} className='transition-all duration-300 cursor-pointer hover:text-orange-500 hover:pl-4' to={`${section}`} smooth offset={0} duration={200}>{section}</Link>
                        </div>
                    ))}
                </div>
                <div ref={contactRef} className='flex flex-col flex-wrap justify-between gap-8 mb-10'>
                    <div>
                        <p className='text-orange-500 tracking-widest text-sm mb-2'>E-MAIL</p>
                        <p className='text-xl'>iamsudippan@gmail.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-orange-500 tracking-widest text-sm mb-2'>SOCIALS</p>
                        <div className='flex flex-col gap-2'>{socials.map((social, index) => (
                            <a key={index} href={social.href} target='_blank' className='text-xl hover:text-orange-500 transition-colors'>{social.name}</a>
                        ))}</div>
                    </div>
                    <button className='bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 py-4 text-xl rounded-full'><a href="/Documets/Resume.pdf" target='_blank'>Download Resume</a></button>
                </div>
            </nav>

            {/* Mobile Top Bar */}
            <div>
                <div ref={titleRef} className='text-xl font-bold tracking-widest uppercase text-black dark:text-white fixed m-5 md:hidden bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 transition-colors duration-500 shadow-lg px-6 py-3 rounded-full z-40 flex items-center gap-2'>
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <h1>SUDIP.DEV</h1>
                </div>
                <div className="fixed z-[60] top-5 right-24 md:hidden pointer-events-none">
                    <button onClick={() => { toggleTheme(); if(showHint) dismissHint(); }} className='flex items-center justify-center text-black dark:text-white bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full cursor-pointer w-14 h-14 shadow-lg hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-500 pointer-events-auto'>
                        {theme === 'light' ? <Icon icon="solar:moon-bold" width="24" height="24" /> : <Icon icon="solar:sun-bold" width="24" height="24" />}
                    </button>
                    {showHint && (
                        <div className="absolute top-full right-0 mt-4 w-40 bg-black/80 backdrop-blur-md border border-orange-500/50 rounded-xl p-3 shadow-[0_5px_20px_rgba(255,105,0,0.2)] pointer-events-auto animate-bounce z-50">
                            <p className="text-white text-xs text-center font-bold">Try the new Light/Dark mode!</p>
                            <div className="absolute -top-2 right-6 w-4 h-4 bg-black border-t border-l border-orange-500/50 rotate-45"></div>
                            <button onClick={dismissHint} className="absolute -top-2 -right-2 text-gray-400 hover:text-white bg-black rounded-full border border-orange-500/50 p-0.5">
                                <Icon icon="solar:close-circle-bold" width="16" height="16" />
                            </button>
                        </div>
                    )}
                </div>
                <div ref={BurgerRef} className='fixed z-[60] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full cursor-pointer w-14 h-14 top-5 right-5 md:hidden shadow-lg hover:border-orange-500 dark:hover:border-orange-500' onClick={toggleMenue}>
                    <span ref={toplineRef} className='block w-6 h-0.5 bg-orange-500 rounded-full origin-center transition-all'></span>
                    <span ref={bottomlineRef} className='block w-6 h-0.5 bg-orange-500 rounded-full origin-center transition-all'></span>
                </div>
            </div>
        </>
    )
}

export default Navbar