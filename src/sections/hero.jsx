import { useEffect, useRef, useState } from 'react';
import AutoType from '../componnts/autotype.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Helmet } from '../componnts/helmet';
import { SciFiGrid } from '../componnts/SciFiGrid.jsx';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-scroll';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';
import { BlenderProjects, UnrealProjects, CodingProjects, VLSIProjects } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ IsReady }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [activeCarousel, setActiveCarousel] = useState(0);
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isHelmetExploded, setIsHelmetExploded] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setIsHeroVisible(entry.isIntersecting);
            });
        }, { threshold: 0.05 });
        const currentHero = heroRef.current;
        if (currentHero) {
            observer.observe(currentHero);
        }
        return () => {
            if (currentHero) observer.unobserve(currentHero);
        };
    }, []);

    const projectImages = [
        "/Images/perfume bottle.jpg",
        "/Images/cartoony house.jpg",
        "/Images/fantasy bottle.jpg",
        "/Images/bulb.jpg",
        "/Images/rifle.jpg",
        "/Images/speaker.jpg",
        "/Images/karambit.jpg",
        "/Images/katana.jpg"
    ];

    const totalProjectsCount = BlenderProjects.length + UnrealProjects.length + CodingProjects.length + VLSIProjects.length;

    // Carousel items for the right column
    const carouselItems = [
        {
            id: 0,
            title: "GAME DEV",
            desc: "Custom controllers, pathfinding AI, and procedural systems in Unreal & C++.",
            icon: "carbon:game-console"
        },
        {
            id: 1,
            title: "GAME DESIGN",
            desc: "Immersive layouts, puzzle design, player pacing, and mechanics synergy.",
            icon: "carbon:cube"
        },
        {
            id: 2,
            title: "ELECTRONICS",
            desc: "Microcontroller coding, circuit design, and embedded systems.",
            icon: "carbon:chip"
        }
    ];

    // GSAP Entrance Animations
    useGSAP(() => {
        // Initial state
        gsap.set(".grid-cell", { opacity: 0, y: 30 });
        gsap.set(".bg-logo-text", { scale: 0.85, opacity: 0 });
        gsap.set(".scroll-circle-btn", { scale: 0, opacity: 0 });

        // Parallax scroll animation for background watermark
        gsap.fromTo(".hero-watermark",
            { xPercent: 8 },
            {
                xPercent: -8,
                scrollTrigger: {
                    trigger: "#home",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );
    }, []);

    useGSAP(() => {
        if (!IsReady) return;

        const tl = gsap.timeline();

        // Stagger grid cells in
        tl.to(".grid-cell", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out"
        });

        // Background large letters fade & scale
        tl.to(".bg-logo-text", {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out"
        }, "<0.3");

        // Floating scroll button scale up
        tl.to(".scroll-circle-btn", {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.8");

    }, [IsReady]);

    const handleNextCarousel = () => {
        gsap.timeline()
            .to(".carousel-content", {
                opacity: 0, y: -10, duration: 0.2, onComplete: () => {
                    setActiveCarousel((prev) => (prev + 1) % carouselItems.length);
                }
            })
            .to(".carousel-content", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const handlePrevCarousel = () => {
        gsap.timeline()
            .to(".carousel-content", {
                opacity: 0, y: 10, duration: 0.2, onComplete: () => {
                    setActiveCarousel((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
                }
            })
            .to(".carousel-content", { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    };

    return (
        <section id="home" ref={heroRef} className="relative w-full min-h-screen bg-[#eae8e4] text-[#111111] font-sans overflow-hidden border-b border-[#cfccb8] noise-bg">

            {/* Background Light Text Watermark */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="hero-watermark absolute right-0 top-10 select-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] tracking-tighter"
                >
                    SUDIP
                </div>
            </div>

            {/* Grid Container */}
            <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-4 select-none">

                {/* Column 1 (Left) */}
                <div className="flex flex-col border-b md:border-b-0 md:border-r border-[#cfccb8] justify-between h-full z-10 order-2 md:order-1">

                    {/* Box 1.1: Title Info */}
                    <div className="grid-cell border-b border-[#cfccb8] p-6 md:p-8 flex flex-col justify-center flex-grow min-h-[160px] md:min-h-[240px] lg:min-h-[280px] lg:pt-24 md:pt-20 pt-8">
                        <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-4 md:gap-6 w-full">
                            <h1 className="text-[13px] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight shrink-0" style={{ fontFamily: '"Michroma", sans-serif' }}>
                                SUDIP PAN<br />PORTFOLIO
                            </h1>

                            {/* Divider line: vertical on mobile, horizontal on desktop */}
                            <div className="h-10 md:h-[1.5px] w-[1.5px] md:w-20 bg-orange-600/60 shrink-0" />

                            {/* AutoType Component integration */}
                            <div className="flex-grow md:flex-grow-0 min-h-[50px] md:min-h-[90px] md:w-full flex items-center md:items-start" style={{ fontFamily: '"Michroma", sans-serif' }}>
                                <AutoType
                                    subTitle="I am a passionate"
                                    text={["Game Developer", "Game Designer", "Level Designer", "Unreal Engine Developer", "Electronics Engineer"]}
                                    Ntextcolor="text-[#111111]/70 tracking-wider font-semibold"
                                    AnimTextcolor="text-orange-600 font-extrabold block mt-1 md:mt-2"
                                    NtextSize="text-[10px] sm:text-xs md:text-sm"
                                    AnimTextSize="text-[13px] sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Box 1.2: Metrics */}
                    <div className="grid-cell border-b border-[#cfccb8] p-6 md:p-8 flex items-center md:items-start lg:items-center justify-between md:flex-col lg:flex-row gap-4 min-h-[100px] md:min-h-[130px] lg:min-h-[140px]">
                        <div className="flex flex-col">
                            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] leading-none" style={{ fontFamily: '"Michroma", sans-serif' }}>{totalProjectsCount}</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-neutral-500 tracking-wider text-right md:text-left lg:text-right max-w-[160px] md:max-w-none lg:max-w-[200px] leading-relaxed font-semibold" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            COMPLETED GAMES & HARDWARE PROJECTS
                        </span>
                    </div>

                    {/* Box 1.3: Call to Action (Step into...) */}
                    <div className="grid-cell p-6 md:p-8 flex flex-col justify-end min-h-[150px] md:min-h-[180px] lg:min-h-[200px] relative">
                        <span className="absolute top-6 right-6 text-neutral-400 font-light text-sm md:text-base">+</span>
                        <span className="absolute bottom-6 left-6 text-neutral-400 font-light text-sm md:text-base">+</span>
                        <h3 className="text-xs md:text-sm lg:text-base font-bold tracking-widest leading-relaxed text-[#111111] uppercase max-w-[220px] md:max-w-none lg:max-w-[300px]" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            Step into the future of interactive art
                        </h3>
                    </div>

                </div>

                {/* Column 2 (Center) - Spans 2 cols on tablet/desktop */}
                <div className="col-span-1 md:col-span-2 border-b md:border-b-0 md:border-r border-[#cfccb8] flex flex-col justify-between h-[80vh] md:h-full relative md:min-h-screen z-20 order-1 md:order-2 pt-20 md:pt-0">

                    {/* 3D Helmet Viewport - spans the full height */}
                    <div className="grid-cell flex-grow relative flex items-center justify-center overflow-hidden h-full">

                        {/* Massive background text */}
                        <div
                            className="bg-logo-text absolute select-none flex items-center justify-center font-black leading-none text-black opacity-[0.05] pointer-events-none z-0 w-full"
                            style={{
                                fontSize: isMobile ? "70vw" : "min(36vw, 34rem)",
                                fontFamily: '"Michroma", sans-serif',
                                gap: isMobile ? "3vw" : "1.5vw"
                            }}
                        >
                            <span
                                className="transform -translate-y-[12%] select-none"
                                style={{ WebkitTextStroke: isMobile ? "1.5vw currentColor" : "0.8vw currentColor" }}
                            >
                                S
                            </span>
                            <span
                                className="transform translate-y-[12%] select-none"
                                style={{ WebkitTextStroke: isMobile ? "1.5vw currentColor" : "0.8vw currentColor" }}
                            >
                                P
                            </span>
                        </div>

                        {/* Technological Reticle & Glow Background to make the Helmet stand out */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-[#cfccb8]/20 flex items-center justify-center pointer-events-none z-0">
                            {/* Outer dashed rotating ring */}
                            <div className="absolute inset-0 rounded-full border border-dashed border-orange-600/20 animate-spin-slow" />
                            {/* Inner rotating ring */}
                            <div className="absolute w-[90%] h-[90%] rounded-full border border-double border-[#cfccb8]/15 animate-spin-slow-reverse" />
                            {/* Technical Grid Crosshairs */}
                            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#cfccb8]/20 to-transparent" />
                            <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-[#cfccb8]/20 to-transparent" />
                            {/* Strong Ambient Glow */}
                            <div className="absolute w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,_rgba(255,106,0,0.18)_0%,_rgba(207,204,184,0.35)_45%,_transparent_75%)] blur-3xl animate-pulse-slow" />
                        </div>

                        {/* Interactive Canvas */}
                        <div
                            className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={() => !isMobile && setIsHelmetExploded(true)}
                            onMouseLeave={() => !isMobile && setIsHelmetExploded(false)}
                            onClick={() => isMobile && setIsHelmetExploded(!isHelmetExploded)}
                        >
                            <Canvas frameloop={isHeroVisible ? "always" : "never"} shadows={!isMobile} dpr={[1, 1.5]} gl={{ localClippingEnabled: true }} camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }} className="w-full h-full">
                                <ambientLight intensity={1.5} />
                                <Environment resolution={256}>
                                    <group rotation={[-Math.PI / 3, 4, 1]}>
                                        <Lightformer form="circle" intensity={5} color="#ff6a00" position={[0, 5, -9]} scale={10} />
                                        <Lightformer form="circle" intensity={3} color="#ffffff" position={[0, 3, 1]} scale={10} />
                                        <Lightformer form="circle" intensity={4} color="#ff6a00" position={[-5, -1, -1]} scale={10} />
                                        <Lightformer form="circle" intensity={2} color="#ffffff" position={[10, 1, 0]} scale={16} />
                                    </group>
                                </Environment>
                                <SciFiGrid IsReady={IsReady} />
                                <Helmet IsReady={IsReady} isMobile={isMobile} isExploded={isHelmetExploded} position={isMobile ? [0, -2.9, 0] : [0, -2.9, 0.5]} shadows scale={isMobile ? 0.85 : 0.82} />
                            </Canvas>
                        </div>

                        {/* Circular View Button (overlapping the canvas bottom) */}
                        <div
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center justify-center"
                            onMouseEnter={() => setIsBtnHovered(true)}
                            onMouseLeave={() => setIsBtnHovered(false)}
                        >
                            {/* Orbiting Images Ring */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                                <div className="absolute left-1/2 top-1/2 w-0 h-0 animate-orbit-ring">
                                    {projectImages.map((img, i) => {
                                        const angle = i * (360 / projectImages.length);
                                        return (
                                            <div
                                                key={i}
                                                className="absolute left-1/2 top-1/2 pointer-events-auto"
                                                style={{
                                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${isBtnHovered ? (isMobile ? '105px' : '135px') : '0px'}) rotate(-${angle}deg) scale(${isBtnHovered ? 1 : 0})`,
                                                    opacity: isBtnHovered ? 1 : 0,
                                                    transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.04}s, opacity 0.5s ease ${i * 0.04}s`
                                                }}
                                            >
                                                {/* Counter-rotating wrapper to keep image upright */}
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#111111] bg-white overflow-hidden shadow-[3px_3px_0px_#cfccb8] animate-counter-orbit">
                                                    <img
                                                        src={img}
                                                        alt="Project thumbnail"
                                                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-300 hover:scale-125 cursor-pointer pointer-events-auto"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <Link to="works" smooth={true} duration={600} offset={-50}>
                                <button className="scroll-circle-btn w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#eae8e4]/90 hover:bg-[#111111] hover:text-[#eae8e4] text-[#111111] font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase border border-[#111111]/25 hover:border-[#111111] backdrop-blur-md transition-all duration-500 flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 active:scale-95 z-10 relative" style={{ fontFamily: '"Michroma", sans-serif' }}>
                                    View Works
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Column 3 (Right) */}
                <div className="flex flex-col justify-between h-full z-10 order-3">

                    {/* Box 3.0: Wireframe rotating helmet (Large displays only) */}
                    <div className="hidden lg:flex grid-cell border-b border-[#cfccb8] p-6 justify-center items-center h-[340px] relative overflow-hidden pointer-events-auto bg-[#f4f2ee]/40">
                        {/* Subtle atmospheric gradient behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[radial-gradient(circle,_rgba(255,106,0,0.06)_0%,_rgba(207,204,184,0.15)_45%,_transparent_75%)] blur-2xl pointer-events-none z-0" />

                        <div className="absolute inset-0 w-full h-full z-10">
                            <Canvas frameloop={isHeroVisible ? "always" : "never"} dpr={[1, 1.5]} gl={{ localClippingEnabled: true }} camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }} className="w-full h-full">
                                <Helmet IsReady={IsReady} wireframeOnly={true} position={[0, -4.0, 0.5]} scale={1.05} />
                            </Canvas>
                        </div>
                    </div>

                    {/* Box 3.1: Mini Carousel (Skill Showcase) */}
                    <div className="grid-cell border-b border-[#cfccb8] p-6 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-6 flex-grow min-h-[280px] md:min-h-[320px] lg:min-h-[350px] lg:pt-24 md:pt-20 pt-16 pointer-events-auto">
                        <div className="flex items-center justify-between w-full gap-4">
                            <button
                                onClick={handlePrevCarousel}
                                className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border border-[#cfccb8] flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer"
                            >
                                <Icon icon="lucide:arrow-left" width="18" height="18" />
                            </button>

                            <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border border-[#cfccb8] bg-white/50 flex items-center justify-center shadow-inner relative overflow-hidden transition-transform duration-300 hover:scale-105">
                                <div className="carousel-content flex items-center justify-center text-[#111111] text-3xl md:text-4xl">
                                    <Icon icon={carouselItems[activeCarousel].icon} />
                                </div>
                            </div>

                            <button
                                onClick={handleNextCarousel}
                                className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border border-[#cfccb8] flex items-center justify-center text-neutral-600 hover:text-black hover:border-black transition-all cursor-pointer"
                            >
                                <Icon icon="lucide:arrow-right" width="18" height="18" />
                            </button>
                        </div>

                        <div className="carousel-content text-center max-w-[220px] md:max-w-[260px]">
                            <h4 className="text-[10px] md:text-xs lg:text-base font-bold tracking-[0.25em] text-[#111111] uppercase" style={{ fontFamily: '"Michroma", sans-serif' }}>
                                {carouselItems[activeCarousel].title}
                            </h4>
                            <p className="text-[10px] md:text-xs text-neutral-500 leading-relaxed mt-2" style={{ fontFamily: '"Michroma", sans-serif' }}>
                                {carouselItems[activeCarousel].desc}
                            </p>
                        </div>
                    </div>

                    {/* Box 3.2: Social Links Row */}
                    <div className="grid-cell border-b border-[#cfccb8] py-4 md:py-5 px-6 md:px-8 flex justify-center gap-4 md:gap-6 items-center min-h-[60px] md:min-h-[70px] pointer-events-auto">
                        <a href="https://github.com/Sudip8900" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full border border-[#cfccb8]/60 bg-white/30 flex items-center justify-center text-neutral-600 hover:text-orange-600 hover:border-orange-500 transition-all">
                            <Icon icon="mdi:github" width="18" md:width="20" lg:width="22" height="18" md:height="20" lg:height="22" />
                        </a>
                        <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full border border-[#cfccb8]/60 bg-white/30 flex items-center justify-center text-neutral-600 hover:text-orange-600 hover:border-orange-500 transition-all">
                            <Icon icon="mdi:linkedin" width="18" md:width="20" lg:width="22" height="18" md:height="20" lg:height="22" />
                        </a>
                        <a href="https://www.instagram.com/sudip_pan00/" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full border border-[#cfccb8]/60 bg-white/30 flex items-center justify-center text-neutral-600 hover:text-orange-600 hover:border-orange-500 transition-all">
                            <Icon icon="mdi:instagram" width="18" md:width="20" lg:width="22" height="18" md:height="20" lg:height="22" />
                        </a>
                        <a href="https://www.facebook.com/sudip.pan.792/" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-full border border-[#cfccb8]/60 bg-white/30 flex items-center justify-center text-neutral-600 hover:text-orange-600 hover:border-orange-500 transition-all">
                            <Icon icon="mdi:facebook" width="18" md:width="20" lg:width="22" height="18" md:height="20" lg:height="22" />
                        </a>
                    </div>

                    {/* Box 3.3: Description Block */}
                    <div className="grid-cell p-6 md:p-8 flex flex-col justify-center gap-3 md:gap-4 min-h-[150px] md:min-h-[180px] lg:min-h-[200px]">
                        <h4 className="text-[10px] md:text-xs lg:text-sm font-bold tracking-wider text-[#111111] uppercase" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            Immersive Virtual Worlds
                        </h4>
                        <p className="text-[10px] md:text-xs text-neutral-500 leading-relaxed font-sans" style={{ fontFamily: '"Michroma", sans-serif' }}>
                            Showcasing high-fidelity mechanics, systems architecture, and digital experiences crafted in Unreal Engine.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;