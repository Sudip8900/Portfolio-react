import { useEffect, useRef, useState } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = ({ IsReady }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const mobileMenuRef = useRef(null);

    const sectionsList = ['home', 'about', 'works', 'experience', 'contact'];

    const sectionIcons = {
        home: 'carbon:home',
        about: 'carbon:user',
        works: 'carbon:code',
        experience: 'carbon:development',
        contact: 'carbon:email'
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        scrollSpy.update();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // FOUC prevention
    useGSAP(() => {
        gsap.set(".nav-logo-anim", { y: -30, opacity: 0 });
        gsap.set(".nav-link-anim", { y: -30, opacity: 0 });
    }, []);

    // Entrance Animation on Load Complete
    useGSAP(() => {
        if (!IsReady) return;

        const tl = gsap.timeline();
        tl.to(".nav-logo-anim", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        })
        .to(".nav-link-anim", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out"
        }, "-=0.3");
    }, [IsReady]);

    // Stagger links inside mobile menu when it opens
    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(".mob-nav-link", 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.15 }
            );
        }
    }, [isOpen]);

    return (
        <>
            {/* Desktop Navbar - Floating Pill Shape */}
            <nav className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[56px] items-center justify-between px-8 z-50 border rounded-full transition-all duration-500 ${
                scrolled 
                    ? 'bg-[#f4f2ee]/95 backdrop-blur-md border-[#111111] text-[#111111] shadow-[4px_4px_0px_#cfccb8]' 
                    : 'bg-[#eae8e4]/85 backdrop-blur-md border-[#cfccb8] text-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
            }`}>
                
                {/* Logo */}
                <div className="nav-logo-anim flex items-center gap-2 select-none">
                    <span className="w-2 h-2 rounded-full animate-pulse shadow-lg bg-orange-600 shadow-orange-600/50" />
                    <span 
                        className="text-xs font-black tracking-[0.4em] uppercase" 
                        style={{ fontFamily: '"Michroma", sans-serif' }}
                    >
                        SUDIP.DEV
                    </span>
                </div>

                {/* Nav Links */}
                <div className="flex gap-x-1 items-center h-full">
                    {sectionsList.map((section) => (
                        <Magnetic key={section}>
                            <div className="nav-link-anim relative px-3 py-1.5 cursor-pointer flex items-center justify-center h-full">
                                <Link
                                    spy={true}
                                    to={section}
                                    smooth={true}
                                    duration={400}
                                    offset={-50}
                                    activeClass="!text-orange-500 font-extrabold after:scale-x-100"
                                    className={`relative tracking-widest text-[10px] font-bold uppercase cursor-pointer py-1 transition-all duration-300 flex items-center gap-1.5 text-[#111111]/70 hover:text-[#111111] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300`}
                                    style={{ fontFamily: '"Michroma", sans-serif' }}
                                >
                                    <Icon icon={sectionIcons[section]} className="text-[1.25em] opacity-80" />
                                    {section}
                                </Link>
                            </div>
                        </Magnetic>
                    ))}
                </div>

            </nav>

            {/* Mobile Header Bar - Floating Pill Shape */}
            <div className={`md:hidden fixed top-4 left-4 right-4 h-[54px] flex items-center justify-between px-5 z-50 border rounded-full transition-all duration-500 ${
                scrolled 
                    ? 'bg-[#f4f2ee]/95 backdrop-blur-md border-[#111111] text-[#111111] shadow-[4px_4px_0px_#cfccb8]' 
                    : 'bg-[#eae8e4]/85 backdrop-blur-md border-[#cfccb8] text-[#111111] shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
            }`}>
                <div className="nav-logo-anim flex items-center gap-2 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]" />
                    <span className="text-[10px] font-black tracking-[0.35em] uppercase" style={{ fontFamily: '"Michroma", sans-serif' }}>
                        SUDIP.DEV
                    </span>
                </div>

                {/* Burger Menu Trigger */}
                <button 
                    onClick={toggleMenu}
                    className={`nav-logo-anim flex flex-col items-center justify-center gap-1.5 w-9 h-9 border rounded-full transition-all cursor-pointer ${
                        scrolled 
                            ? 'border-[#111111] hover:border-[#111111] bg-[#f4f2ee]/50' 
                            : 'border-[#cfccb8] hover:border-[#111111] bg-[#eae8e4]/50'
                    }`}
                >
                    <span className={`block w-4 h-[1.5px] origin-center transition-all bg-[#111111] ${
                        isOpen 
                            ? 'rotate-45 translate-y-[4.5px]' 
                            : ''
                    }`} />
                    <span className={`block w-4 h-[1.5px] origin-center transition-all bg-[#111111] ${
                        isOpen 
                            ? '-rotate-45 -translate-y-[4.5px]' 
                            : ''
                    }`} />
                </button>
            </div>

            {/* Mobile Menu Drawer Overlay */}
            <div 
                ref={mobileMenuRef}
                className={`fixed top-0 right-0 z-45 w-full h-full flex flex-col justify-between px-6 uppercase bg-[#eae8e4]/95 backdrop-blur-2xl border-l border-[#cfccb8] text-[#111111] pt-24 pb-10 gap-y-8 md:hidden transition-transform duration-500 ease-out shadow-[-20px_0_50px_rgba(0,0,0,0.1)] overflow-y-auto ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#cfccb8] to-transparent" />

                <div className="flex flex-col text-xl gap-y-5 font-bold tracking-widest relative z-10 mt-6" style={{ fontFamily: '"Michroma", sans-serif' }}>
                    <div className="text-orange-600 text-[10px] tracking-[0.3em] mb-4 border-b border-[#cfccb8] pb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
                        DIRECTORY_ACCESS
                    </div>

                    {sectionsList.map((section, index) => (
                        <div key={index} className="mob-nav-link group border-l-2 border-transparent hover:border-orange-600 pl-4 transition-all">
                            <Link 
                                onClick={toggleMenu} 
                                className="flex items-center transition-all duration-300 cursor-pointer text-neutral-500 hover:text-orange-600" 
                                to={section} 
                                smooth 
                                offset={-50} 
                                duration={400}
                            >
                                <Icon icon={sectionIcons[section]} className="mr-4 text-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                                {section}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-6 relative z-10 mt-auto border-t border-[#cfccb8] pt-6 font-mono text-xs">
                    <div>
                        <p className="text-orange-600 tracking-[0.3em] text-[10px] mb-2">CONTACT</p>
                        <p className="text-neutral-700 hover:text-orange-600 transition-colors cursor-pointer">iamsudippan@gmail.com</p>
                    </div>
                    <div>
                        <p className="text-orange-600 tracking-[0.3em] text-[10px] mb-2">CONNECT</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://github.com/Sudip8900" target="_blank" rel="noreferrer" className="text-[11px] text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">GITHUB</a>
                            <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target="_blank" rel="noreferrer" className="text-[11px] text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">LINKEDIN</a>
                            <a href="https://www.instagram.com/sudip_pan00/" target="_blank" rel="noreferrer" className="text-[11px] text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">INSTAGRAM</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop for mobile overlay */}
            {isOpen && (
                <div 
                    onClick={toggleMenu}
                    className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden"
                />
            )}
        </>
    );
};

export default Navbar;