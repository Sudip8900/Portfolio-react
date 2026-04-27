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
    const linksContainerRef = useRef(null);
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

    const sectionIcons = {
        home: 'carbon:home',
        about: 'carbon:user',
        works: 'carbon:code',
        experience: 'carbon:development',
        contact: 'carbon:email'
    };

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
        const updateIndicator = () => {
            if (indicatorRef.current && linkRef2.current[activeIndex]) {
                const activeEl = linkRef2.current[activeIndex];
                gsap.to(indicatorRef.current, {
                    x: activeEl.offsetLeft,
                    width: activeEl.offsetWidth,
                    duration: 0.5,
                    ease: "power3.out",
                });
            }
        };

        // Initial update
        updateIndicator();

        // Observe the container for any late layout shifts (e.g., icons/fonts loading)
        let observer;
        if (linksContainerRef.current) {
            observer = new ResizeObserver(() => {
                updateIndicator();
            });
            observer.observe(linksContainerRef.current);
        }

        // Fallbacks for fonts loading
        document.fonts?.ready.then(updateIndicator);
        window.addEventListener('resize', updateIndicator);

        // Extra timeout as a failsafe for iconify icons
        const timeoutId = setTimeout(updateIndicator, 500);

        return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', updateIndicator);
            clearTimeout(timeoutId);
        };
    }, [activeIndex]);

    const handleSetActive = (to) => {
        const index = sectionsList.indexOf(to);
        if (index !== -1) setActiveIndex(index);
    };

    return (
        <>
            <div ref={navref2} className="hidden md:flex fixed top-4 left-4 right-4 z-50 items-center justify-center gap-4 pointer-events-none">

                {/* Holographic Glass Pill Navbar */}
                <nav
                    className="flex items-center justify-between px-6 py-2 bg-[#050505]/60 backdrop-blur-[24px] border border-orange-500/20 w-full max-w-5xl relative pointer-events-auto shadow-[0_8px_32px_rgba(255,105,0,0.1),inset_0_1px_1px_rgba(255,105,0,0.1)] group rounded-full transition-all duration-500 hover:border-orange-500/40"
                >
                    {/* Glowing Accent */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-full" />

                    {/* Branding */}
                    <div className="relative z-10 flex items-center gap-4 pl-4">
                        <div className="text-[0.75rem] font-bold tracking-widest uppercase text-orange-50 drop-shadow-[0_0_8px_rgba(255,105,0,0.3)] flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]"></span>
                            SUDIP.DEV
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div ref={linksContainerRef} className="flex text-[0.8rem] gap-x-2 font-medium tracking-[0.2em] relative z-10 py-1.5">
                        {/* Dynamic Glass Indicator */}
                        <div
                            ref={indicatorRef}
                            className="absolute top-0 left-0 h-full border border-orange-500/40 bg-orange-500/10 pointer-events-none shadow-[0_0_15px_rgba(255,105,0,0.2)] z-0 rounded-full backdrop-blur-md"
                        />

                        {sectionsList.map((section, index) => (
                            <Magnetic key={index}>
                                <div className="inline-block relative px-5 py-2 z-10 cursor-pointer" ref={(el) => (linkRef2.current[index] = el)}>
                                    <Link
                                        spy={true}
                                        activeClass='!text-orange-400 drop-shadow-[0_0_10px_rgba(255,105,0,0.8)]'
                                        className="transition-all duration-300 tracking-widest text-white/40 hover:text-orange-400 uppercase inline-flex items-center gap-2"
                                        to={section}
                                        smooth
                                        duration={200}
                                        offset={-100}
                                        onSetActive={handleSetActive}
                                    >
                                        <Icon icon={sectionIcons[section]} className="text-[1.2em] opacity-80" />
                                        {section}
                                    </Link>
                                </div>
                            </Magnetic>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Mobile Slide-Out Menu */}
            <nav ref={navRef} className='fixed top-0 right-0 z-50 w-full h-full flex flex-col justify-between px-8 uppercase bg-[#050505]/90 backdrop-blur-2xl border-l border-orange-500/20 text-white/90 pt-28 pb-10 gap-y-8 md:hidden shadow-[-20px_0_50px_rgba(255,105,0,0.1)] overflow-y-auto'>
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-500/40 to-transparent" />

                <div className='flex flex-col text-3xl gap-y-8 font-medium tracking-widest relative z-10'>
                    <div className="text-orange-500/60 text-[10px] tracking-[0.3em] mb-4 border-b border-orange-500/20 pb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]"></span>
                        DIRECTORY_ACCESS
                    </div>

                    {sectionsList.map((section, index) => (
                        <div key={index} ref={(el) => (linkRef.current[index] = el)} className="group border-l-2 border-transparent hover:border-orange-500/50 pl-4 transition-all">
                            <Link onClick={toggleMenue} className='flex items-center transition-all duration-300 cursor-pointer text-white/40 hover:text-orange-400 hover:drop-shadow-[0_0_10px_rgba(255,105,0,0.5)]' to={`${section}`} smooth offset={0} duration={200}>
                                <Icon icon={sectionIcons[section]} className="mr-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>

                <div ref={contactRef} className='flex flex-col gap-8 relative z-10 mt-auto border-t border-orange-500/20 pt-8'>
                    <div>
                        <p className='text-orange-500/60 tracking-[0.3em] text-[10px] mb-3'>CONTACT</p>
                        <p className='text-sm text-white/60 hover:text-orange-400 transition-colors cursor-pointer'>iamsudippan@gmail.com</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-orange-500/60 tracking-[0.3em] text-[10px] mb-3'>SOCIALS</p>
                        <div className='flex flex-wrap gap-4'>
                            {socials.map((social, index) => (
                                <a key={index} href={social.href} target='_blank' className='text-xs text-white/60 hover:text-orange-400 hover:bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 transition-all hover:shadow-[0_0_10px_rgba(255,105,0,0.2)]'>
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
                <div ref={titleRef} className='text-sm font-medium tracking-widest uppercase text-orange-50 fixed m-5 md:hidden bg-[#050505]/60 backdrop-blur-[24px] border border-orange-500/20 shadow-[0_8px_32px_rgba(255,105,0,0.15),inset_0_1px_1px_rgba(255,105,0,0.1)] rounded-full px-5 py-3 flex items-center gap-3 z-40'>
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]"></span>
                    <h1>SUDIP.DEV</h1>
                </div>

                {/* Mobile Toggle Button */}
                <div ref={BurgerRef} className='fixed z-[60] flex flex-col items-center justify-center gap-1.5 transition-all duration-500 bg-[#050505]/60 backdrop-blur-[24px] border border-orange-500/20 shadow-[0_8px_32px_rgba(255,105,0,0.15),inset_0_1px_1px_rgba(255,105,0,0.1)] rounded-full cursor-pointer w-12 h-12 top-5 right-5 md:hidden hover:border-orange-500/50 hover:bg-orange-500/10' onClick={toggleMenue}>
                    <span ref={toplineRef} className='block w-5 h-[1.5px] bg-orange-400 origin-center transition-all drop-shadow-[0_0_5px_rgba(255,105,0,0.8)]'></span>
                    <span ref={bottomlineRef} className='block w-5 h-[1.5px] bg-orange-400 origin-center transition-all drop-shadow-[0_0_5px_rgba(255,105,0,0.8)]'></span>
                </div>
            </div>
        </>
    )
}

export default Navbar