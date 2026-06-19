import { useEffect, useRef, useState } from 'react';
import { Link, scrollSpy } from 'react-scroll';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Navbar = ({ IsReady }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
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
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Determine scroll direction and visibility
            if (currentScrollY <= 50) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
                // Scrolling down - hide navbar if menu is closed
                if (!isOpen) {
                    setVisible(false);
                }
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show navbar
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        scrollSpy.update();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // FOUC prevention & initial setup
    useGSAP(() => {
        gsap.set(".nav-grid-cell", { y: -50, opacity: 0 });
    }, []);

    // Entrance Animation on Load Complete
    useGSAP(() => {
        if (!IsReady) return;

        gsap.to(".nav-grid-cell", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, [IsReady]);

    // Stagger links inside menu when it opens
    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(".mob-nav-link", 
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.2 }
            );
        }
    }, [isOpen]);

    return (
        <>
            {/* Desktop Navbar - Grid Layout aligned with Section Columns */}
            <nav 
                className={`hidden md:grid grid-cols-4 fixed top-0 left-0 w-full h-[64px] z-50 border-b transition-all duration-500 ${
                    scrolled 
                        ? 'bg-[#f4f2ee]/95 backdrop-blur-md border-[#111111]/80 shadow-sm' 
                        : 'bg-[#eae8e4]/90 backdrop-blur-md border-[#cfccb8] shadow-none'
                }`}
                style={{
                    transform: (visible || isOpen) ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s, border-color 0.5s, shadow 0.5s'
                }}
            >
                
                {/* Column 1: Menu Button & Desktop Dropdown (Drops from Menu Button, Same Width, Full Height) */}
                <div className="nav-grid-cell col-span-1 h-full border-r border-[#cfccb8] transition-colors duration-500 relative">
                    <button
                        onClick={toggleMenu}
                        className="h-full w-full bg-[#111111] hover:bg-orange-600 text-[#eae8e4] hover:text-[#111111] transition-all duration-300 flex items-center justify-between px-8 cursor-pointer group"
                    >
                        <span className="text-sm lg:text-base font-black tracking-[0.35em]" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            MENU
                        </span>
                        <div className="flex flex-col gap-1 w-5">
                            <span className={`h-[1.5px] w-full bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
                            <span className={`h-[1.5px] w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-[1.5px] w-full bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
                        </div>
                    </button>

                    {/* Desktop Dropdown - same width as the Column 1 button */}
                    <div 
                        className="absolute top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-[#eae8e4] border-r border-b border-[#cfccb8] text-[#111111] flex flex-col justify-between px-8 py-10 shadow-lg overflow-y-auto transition-[clip-path] duration-500 ease-out z-[60]"
                        style={{
                            fontFamily: '"Michroma", sans-serif',
                            clipPath: isOpen ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
                        }}
                    >
                        <div>
                            {/* Drawer Header */}
                            <div className="flex items-center gap-2 select-none border-b border-[#cfccb8]/40 pb-4 mb-8">
                                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-ping" />
                                <span className="text-xs lg:text-[13px] tracking-[0.3em] font-black text-orange-600">
                                    SYS_NAVIGATOR
                                </span>
                            </div>

                            {/* Navigation Links with Index Details */}
                            <div className="flex flex-col gap-y-4 font-bold">
                                {sectionsList.map((section, index) => {
                                    const num = String(index + 1).padStart(2, '0');
                                    return (
                                        <div key={index} className="mob-nav-link border-b border-[#cfccb8]/40 pb-3 group">
                                            <Link 
                                                onClick={toggleMenu} 
                                                className="flex items-center justify-between transition-colors duration-300 cursor-pointer text-[#111111]/70 hover:text-orange-600" 
                                                to={section} 
                                                smooth 
                                                offset={-50} 
                                                duration={500}
                                            >
                                                <div className="flex items-center">
                                                    <span className="text-sm md:text-base text-orange-600 font-sans mr-4 tracking-normal font-bold">{num} //</span>
                                                    <Icon icon={sectionIcons[section]} className="mr-3 text-xl md:text-2xl opacity-60 group-hover:opacity-100 group-hover:text-orange-600 transition-all duration-300" />
                                                    <span className="text-base md:text-lg tracking-[0.25em] uppercase">{section}</span>
                                                </div>
                                                <span className="text-neutral-400 group-hover:text-orange-600 group-hover:translate-x-1.5 transition-all duration-300">→</span>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Tech Graphic Accent Panel */}
                            <div className="my-8 relative w-full border border-[#cfccb8] flex flex-col gap-4 p-5 overflow-hidden bg-[#eae8e4]/50 select-none">
                                {/* Dot Matrix Grid background */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                <div className="flex justify-between items-center w-full relative z-10">
                                    <div className="flex flex-col gap-1 text-[10px] lg:text-xs text-neutral-500 tracking-widest">
                                        <div>STATUS: ONLINE</div>
                                        <div>SYS.VER: 2026.06.17</div>
                                    </div>
                                    {/* Mini Rotating Radar */}
                                    <div className="relative w-12 h-12 border border-[#cfccb8] rounded-full flex items-center justify-center opacity-85">
                                        <div className="absolute w-[85%] h-[85%] border border-dashed border-[#cfccb8]/60 rounded-full animate-[spin_12s_linear_infinite]" />
                                        <div className="absolute w-full h-[1px] bg-orange-600/50 cs-radar-arm" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                                    </div>
                                </div>
                                <div className="border-t border-[#cfccb8]/30 pt-3 relative z-10">
                                    <div className="text-[9px] lg:text-[10px] text-neutral-500 uppercase tracking-widest mb-1">LOCATION</div>
                                    <div className="text-[10px] lg:text-xs text-[#111111] leading-relaxed font-bold tracking-wider">
                                        Rameswarpur, Ramjibanpur, West Medinipur, West Bengal, India, 721242
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Contact / Connect Info */}
                        <div className="flex flex-col gap-5 border-t border-[#cfccb8] pt-6 text-xs lg:text-sm mt-auto">
                            <div>
                                <p className="text-orange-600 tracking-[0.25em] mb-1 font-bold text-xs lg:text-sm">CONTACT_SYS</p>
                                <a href="mailto:iamsudippan@gmail.com" className="text-neutral-700 hover:text-orange-600 transition-colors tracking-wide font-medium text-xs lg:text-sm">
                                    iamsudippan@gmail.com
                                </a>
                            </div>
                            <div>
                                <p className="text-orange-600 tracking-[0.25em] mb-2 font-bold text-xs lg:text-sm">TERMINALS</p>
                                <div className="flex flex-wrap gap-2.5">
                                    <a href="https://github.com/Sudip8900" target="_blank" rel="noreferrer" className="text-[10px] lg:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-3 py-1 transition-all">GITHUB</a>
                                    <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target="_blank" rel="noreferrer" className="text-[10px] lg:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-3 py-1 transition-all">LINKEDIN</a>
                                    <a href="https://www.instagram.com/sudip_pan00/" target="_blank" rel="noreferrer" className="text-[10px] lg:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-3 py-1 transition-all">INSTAGRAM</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Centered branding logo */}
                <div className="nav-grid-cell col-span-2 border-r border-[#cfccb8] h-full flex items-center justify-center select-none">
                    <Link to="home" smooth={true} duration={400} className="flex items-center gap-2.5 cursor-pointer group">
                        <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]" />
                        <span className="text-sm md:text-lg font-black tracking-[0.45em] uppercase font-sans group-hover:text-orange-600 transition-colors duration-300" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            SUDIP.DEV
                        </span>
                    </Link>
                </div>

                {/* Column 3: Horizontal quick navigation links */}
                <div className="nav-grid-cell col-span-1 h-full flex items-center justify-around px-6">
                    {['about', 'works', 'contact'].map((section) => (
                        <Magnetic key={section}>
                            <div className="h-full flex items-center justify-center">
                                <Link
                                    spy={true}
                                    to={section}
                                    smooth={true}
                                    duration={400}
                                    offset={-50}
                                    activeClass="!text-orange-600 font-extrabold"
                                    className="relative tracking-widest text-xs md:text-sm font-black uppercase cursor-pointer py-2 text-[#111111]/70 hover:text-[#111111] transition-all duration-300 flex items-center gap-1.5 group"
                                    style={{ fontFamily: '"Michroma", sans-serif' }}
                                >
                                    {section}
                                    <span className="absolute bottom-1 w-full h-[1.5px] bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </Link>
                            </div>
                        </Magnetic>
                    ))}
                </div>

            </nav>

            {/* Mobile Header Bar - Grid Layout */}
            <div 
                className={`md:hidden grid grid-cols-12 fixed top-0 left-0 w-full h-[56px] z-50 border-b transition-all duration-500 ${
                    scrolled 
                        ? 'bg-[#f4f2ee]/95 backdrop-blur-md border-[#111111] shadow-sm' 
                        : 'bg-[#eae8e4]/90 backdrop-blur-md border-[#cfccb8]'
                }`}
                style={{
                    transform: (visible || isOpen) ? 'translateY(0)' : 'translateY(-100%)',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s, border-color 0.5s'
                }}
            >
                {/* Left side: Menu Trigger & Mobile Dropdown */}
                <div className="nav-grid-cell col-span-5 h-full border-r border-[#cfccb8] transition-colors duration-500 relative">
                    <button 
                        onClick={toggleMenu}
                        className="h-full w-full bg-[#111111] hover:bg-orange-600 text-[#eae8e4] hover:text-[#111111] transition-all duration-300 flex items-center justify-between px-5 cursor-pointer"
                    >
                        <span className="text-xs sm:text-[13px] font-black tracking-[0.25em]" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            MENU
                        </span>
                        <div className="flex flex-col gap-1 w-4">
                            <span className={`h-[1.2px] w-full bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
                            <span className={`h-[1.2px] w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-[1.2px] w-full bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
                        </div>
                    </button>
                </div>

                {/* Right side: Branding logo */}
                <div className="nav-grid-cell col-span-7 h-full flex items-center justify-center select-none">
                    <Link to="home" smooth={true} duration={400} className="flex items-center gap-2 cursor-pointer">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse shadow-[0_0_8px_rgba(255,105,0,0.8)]" />
                        <span className="text-xs sm:text-[13px] font-black tracking-[0.35em] uppercase" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            SUDIP.DEV
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Full Height, Full Width on Mobile View) */}
            <div 
                ref={mobileMenuRef}
                className={`md:hidden fixed top-[56px] left-0 w-full h-[calc(100vh-56px)] bg-[#eae8e4] border-b border-[#cfccb8] text-[#111111] flex flex-col justify-between px-6 py-8 shadow-lg overflow-y-auto transition-[clip-path] duration-500 ease-out z-[60]`}
                style={{
                    fontFamily: '"Michroma", sans-serif',
                    clipPath: isOpen ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
                }}
            >
                <div>
                    {/* Navigation Links with Index Details */}
                    <div className="flex flex-col gap-y-4 font-bold">
                        {sectionsList.map((section, index) => {
                            const num = String(index + 1).padStart(2, '0');
                            return (
                                <div key={index} className="mob-nav-link border-b border-[#cfccb8]/40 pb-3 group">
                                    <Link 
                                        onClick={toggleMenu} 
                                        className="flex items-center justify-between transition-colors duration-300 cursor-pointer text-[#111111]/70 hover:text-orange-600" 
                                        to={section} 
                                        smooth 
                                        offset={-50} 
                                        duration={500}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-sm md:text-base text-orange-600 mr-4 font-bold">{num} //</span>
                                            <Icon icon={sectionIcons[section]} className="mr-3 text-xl md:text-2xl opacity-60 group-hover:opacity-100 group-hover:text-orange-600 transition-all duration-300" />
                                            <span className="text-base md:text-lg tracking-[0.25em] uppercase">{section}</span>
                                        </div>
                                        <span className="text-neutral-400 group-hover:text-orange-600 group-hover:translate-x-1.5 transition-all duration-300">→</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tech Graphic Accent Panel */}
                    <div className="my-8 relative w-full border border-[#cfccb8] flex flex-col gap-4 p-5 overflow-hidden bg-[#eae8e4]/50 select-none">
                        {/* Dot Matrix Grid background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                        <div className="flex justify-between items-center w-full relative z-10">
                            <div className="flex flex-col gap-1 text-[10px] md:text-xs text-neutral-500 tracking-widest">
                                <div>STATUS: ONLINE</div>
                                <div>SYS.VER: 2026.06.17</div>
                            </div>
                            {/* Mini Rotating Radar */}
                            <div className="relative w-12 h-12 border border-[#cfccb8] rounded-full flex items-center justify-center opacity-85">
                                <div className="absolute w-[85%] h-[85%] border border-dashed border-[#cfccb8]/60 rounded-full animate-[spin_12s_linear_infinite]" />
                                <div className="absolute w-full h-[1px] bg-orange-600/50 cs-radar-arm" />
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                            </div>
                        </div>
                        <div className="border-t border-[#cfccb8]/30 pt-3 relative z-10">
                            <div className="text-[9px] md:text-[10px] text-neutral-500 uppercase tracking-widest mb-1">LOCATION</div>
                            <div className="text-[10px] md:text-xs text-[#111111] leading-relaxed font-bold tracking-wider">
                                Rameswarpur, Ramjibanpur, West Medinipur, West Bengal, India, 721242
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Contact / Connect Info */}
                <div className="flex flex-col gap-5 border-t border-[#cfccb8] pt-6 text-xs md:text-sm mt-auto">
                    <div>
                        <p className="text-orange-600 tracking-[0.25em] mb-1 font-bold text-xs md:text-sm">CONTACT_SYS</p>
                        <a href="mailto:iamsudippan@gmail.com" className="text-neutral-700 hover:text-orange-600 transition-colors tracking-wide font-medium text-xs md:text-sm">
                            iamsudippan@gmail.com
                        </a>
                    </div>
                    <div>
                        <p className="text-orange-600 tracking-[0.25em] mb-2 font-bold text-xs md:text-sm">TERMINALS</p>
                        <div className="flex flex-wrap gap-2.5">
                            <a href="https://github.com/Sudip8900" target="_blank" rel="noreferrer" className="text-[10px] md:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">GITHUB</a>
                            <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target="_blank" rel="noreferrer" className="text-[10px] md:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">LINKEDIN</a>
                            <a href="https://www.instagram.com/sudip_pan00/" target="_blank" rel="noreferrer" className="text-[10px] md:text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-600/10 border border-[#cfccb8] rounded-full px-4 py-1.5 transition-all">INSTAGRAM</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Burger Button when Navbar is Hidden */}
            <button
                onClick={toggleMenu}
                className="fixed top-2.5 left-4 md:left-6 z-[100] w-11 h-11 bg-[#111111] hover:bg-orange-600 text-[#eae8e4] hover:text-[#111111] transition-all duration-300 flex items-center justify-center cursor-pointer border border-[#cfccb8]/20 group shadow-md"
                style={{
                    opacity: !visible && !isOpen ? 1 : 0,
                    pointerEvents: !visible && !isOpen ? 'auto' : 'none',
                    transform: !visible && !isOpen ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s'
                }}
            >
                <div className="flex flex-col gap-1 w-5">
                    <span className="h-[1.5px] w-full bg-current transition-all" />
                    <span className="h-[1.5px] w-full bg-current transition-all" />
                    <span className="h-[1.5px] w-full bg-current transition-all" />
                </div>
            </button>

            {/* Backdrop Overlay for Drawer */}
            {isOpen && (
                <div 
                    onClick={toggleMenu}
                    className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2.5px] transition-opacity duration-300"
                />
            )}
        </>
    );
};

export default Navbar;