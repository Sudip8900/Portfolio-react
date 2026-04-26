import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderProjects, UnrealProjects } from '../constants';
import { Icon } from '@iconify/react';
import Magnetic from '../componnts/Magnetic.jsx';
import InteractiveCard from '../componnts/InteractiveCard.jsx';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {

    const [currentPreview, setCurrentPreview] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);

    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const subRef = useRef(null);
    const subRef2 = useRef(null);
    const projectRef = useRef(null);
    const previewRef = useRef(null);
    const DesRef = useRef(null);

    const blenderItemsRef = useRef([]);
    const unrealItemsRef = useRef([]);

    const moveX = useRef(null);
    const moveY = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    /* ================= GSAP SETUP ================= */

    useGSAP(() => {

        moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.3, ease: "power2.out" });
        moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.3, ease: "power2.out" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#works",
                start: "top 60%",
            }
        });

        if (headingRef.current) {
            tl.from(headingRef.current, {
                duration: 0.8,
                opacity: 0,
                y: 50,
                ease: "circ.out",
            });
        }

        if (lineRef.current) {
            tl.from(lineRef.current, {
                duration: 0.6,
                scaleX: 0,
                transformOrigin: "right center",
                ease: "circ.out",
            }, "-=0.4");
        }

        const isMobile = window.innerWidth < 768;
        const subToAnimate = isMobile ? subRef2.current : subRef.current;

        if (subToAnimate) {
            tl.from(subToAnimate.children, {
                duration: 0.6,
                opacity: 0,
                y: 30,
                ease: "circ.out",
            }, "-=0.3");
        }

        if (projectRef.current) {
            tl.from(projectRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.4");
        }

        /* Inner Scroll Animations */
        blenderItemsRef.current.forEach((item) => {
            if (!item) return;
            gsap.from(item, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    scroller: item.closest('.scroll-container'),
                    start: "top bottom-=10",
                    toggleActions: "play none none reverse",
                }
            });
        });

        unrealItemsRef.current.forEach((item) => {
            if (!item) return;
            gsap.from(item, {
                opacity: 0,
                x: 50,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    scroller: item.closest('.scroll-container'),
                    start: "top bottom-=10",
                    toggleActions: "play none none reverse",
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    /* ================= DESCRIPTION POPUP FIX ================= */

    useEffect(() => {
        if (!currentPreview || !DesRef.current) return;

        gsap.fromTo(
            DesRef.current,
            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)"
            }
        );
    }, [currentPreview]);

    /* ================= MOUSE HANDLERS ================= */

    const handleMouseEnter = (type, index) => {
        if (window.innerWidth < 768) return;

        setCurrentPreview({ type, index });

        if (type === "unreal") {
            setVideoLoading(true);
        }

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 768) return;

        setCurrentPreview(null);
        setVideoLoading(false);

        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;

        mouse.current.x = e.clientX + 24;
        mouse.current.y = e.clientY + 24;

        moveX.current(mouse.current.x);
        moveY.current(mouse.current.y);
    };

    /* ================= UI ================= */

    return (
        <section id="works" className='relative z-10 min-h-screen flex flex-col py-20 bg-[#050505] overflow-hidden'>

            <div className='flex items-center gap-4 mb-10 px-5 md:px-10' ref={headingRef}>
                <div className='w-12 h-2 bg-orange-500/50' />
                <h1 className='text-orange-500 text-2xl md:text-5xl font-bold uppercase tracking-widest'>
                    [ SYS.WORKS_DB ]
                </h1>
                <div ref={lineRef} className='flex-1 h-[1px] bg-orange-500/20' />
            </div>

            <div
                ref={subRef}
                className='hidden lg:flex flex-col text-end mt-5 md:mt-0 px-5 md:px-10 text-xl font-light tracking-widest uppercase text-white/50'
            >
                <p>// A curated collection of my creative projects.</p>
                <p>// Blending 3D design and immersive interactive systems.</p>
                <p>// Currently focusing on Unreal Engine and VLSI circuit design.</p>
            </div>

            <div
                ref={subRef2}
                className='text-end m-5 text-[0.7rem] md:text-sm text-white/50 md:hidden flex flex-col tracking-widest uppercase'
            >
                <p>// Creative projects.</p>
                <p>// 3D and Unreal Engine.</p>
                <p>// VLSI design.</p>
            </div>

            <div
                ref={projectRef}
                className='flex flex-col relative md:flex-row mt-10 perspective-[2000px]'
                onMouseMove={handleMouseMove}
            >

                {/* Blender */}
                <div className='w-full md:w-1/3 h-96 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 m-5 p-5 scroll-container relative'>
                    {/* Decorative Corner Brackets */}
                    <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 z-10' />
                    <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 z-10' />

                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-8 uppercase tracking-widest'>
                        [ DB.BLENDER ]
                    </h1>

                    <div className='flex flex-col gap-4'>
                        {BlenderProjects.map((project, index) => (
                            <div
                                key={index}
                                ref={el => blenderItemsRef.current[index] = el}
                                onMouseEnter={() => handleMouseEnter("blender", index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <InteractiveCard>
                                    <div className='flex justify-between items-center px-6 py-4 bg-white/5 border border-orange-500/10 cursor-pointer group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden'>
                                        {/* Hover Scanning Line */}
                                        <div className='absolute left-0 top-0 h-full w-[2px] bg-orange-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300' />

                                        <h2 className='lg:text-[24px] text-[20px] uppercase tracking-widest text-white/80 group-hover:text-white transition drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' style={{ transform: "translateZ(20px)" }}>
                                            {project.name}
                                        </h2>
                                        <Magnetic>
                                            <div className="inline-block relative" style={{ transform: "translateZ(30px)" }}>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                    <Icon icon="ion:arrow-up-right-box-outline" className='text-orange-500/50 group-hover:text-orange-500 transition-colors' width="24" height="24" />
                                                </a>
                                            </div>
                                        </Magnetic>
                                    </div>

                                    {/* Mobile Preview Image fallback */}
                                    <div className='relative flex px-5 md:hidden h-auto py-5 bg-white/5 mb-5 mt-2 transition-colors duration-500 border border-orange-500/10'>
                                        <img src={project.image} alt={project.name} className="w-full transition-all duration-500 border border-orange-500/20" />
                                    </div>
                                </InteractiveCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Unreal */}
                <div className='w-full md:w-1/3 h-96 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 m-5 p-5 scroll-container relative'>
                    {/* Decorative Corner Brackets */}
                    <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 z-10' />
                    <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 z-10' />

                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-8 uppercase tracking-widest'>
                        [ DB.UNREAL ]
                    </h1>

                    <p className='my-5 text-white/50 text-sm tracking-widest uppercase'>// Currently working on a sci-fi action game. Demo previews below.</p>

                    <div className='flex flex-col gap-4'>
                        {UnrealProjects.map((project, index) => (
                            <div
                                key={index}
                                ref={el => unrealItemsRef.current[index] = el}
                                onMouseEnter={() => handleMouseEnter("unreal", index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <InteractiveCard>
                                    <a
                                        href={project.Link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='flex justify-between items-center px-6 py-4 bg-white/5 border border-orange-500/10 cursor-pointer group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden'
                                    >
                                        {/* Hover Scanning Line */}
                                        <div className='absolute left-0 top-0 h-full w-[2px] bg-orange-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300' />

                                        <h2 className='lg:text-[24px] text-[20px] uppercase tracking-widest text-white/80 group-hover:text-white transition drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' style={{ transform: "translateZ(20px)" }}>
                                            {project.name}
                                        </h2>
                                        <Magnetic>
                                            <div className="inline-block relative" style={{ transform: "translateZ(30px)" }}>
                                                <Icon icon="ion:arrow-up-right-box-outline" className='text-orange-500/50 group-hover:text-orange-500 transition-colors' width="24" height="24" />
                                            </div>
                                        </Magnetic>
                                    </a>
                                </InteractiveCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VLSI */}
                <div className='w-full md:w-1/3 h-64 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 m-5 p-5 relative flex flex-col items-center justify-center group'>
                    {/* Decorative Corner Brackets */}
                    <div className='absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500 z-10' />
                    <div className='absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500 z-10' />

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500/50 animate-[dropLine_3s_linear_infinite]" />

                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5 uppercase tracking-widest'>
                        [ DB.VLSI ]
                    </h1>
                    <p className='text-white/50 text-sm tracking-widest uppercase text-center max-w-[200px]'>
                        // High gain CMOS amplifier in progress.
                    </p>
                    <Icon icon="line-md:downloading-loop" className='w-20 h-20 text-orange-500/50 mt-10 group-hover:text-orange-500 transition-colors duration-500' />
                    <p className='text-orange-500 text-xs tracking-widest uppercase mt-4 animate-pulse'>Awaiting Data...</p>
                </div>
            </div >

            {/* Floating Preview */}
            < div
                ref={previewRef}
                className='fixed -top-125 left-0 z-50 overflow-hidden border border-orange-500/50 pointer-events-none md:block hidden opacity-0 bg-black/90 backdrop-blur-md shadow-[0_0_50px_rgba(255,105,0,0.15)]'
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
            >
                {/* HUD Overlay Elements for Preview */}
                < div className='absolute top-2 left-2 text-orange-500 text-[10px] tracking-widest uppercase z-50' > [VIEWPORT ACTIVE]</div >
                <div className='absolute bottom-2 left-2 text-orange-500 text-[10px] tracking-widest uppercase z-50'>[ RENDERING PREVIEW ]</div>
                <div className='absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-500 z-50' />
                <div className='absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-500 z-50' />

                {
                    currentPreview && currentPreview.type === "blender" && (
                        <div className="w-[840px] h-[560px] overflow-hidden relative p-8">
                            <img
                                src={BlenderProjects[currentPreview.index].image}
                                alt="Preview"
                                className='object-cover w-full h-full border border-orange-500/30'
                            />
                            <div
                                ref={DesRef}
                                className='absolute bottom-10 left-10 right-10 bg-[#0a0a0a]/90 backdrop-blur-sm border border-orange-500/50 text-white p-5 text-[1rem] tracking-widest uppercase font-light shadow-[0_0_20px_rgba(255,105,0,0.2)]'
                                style={{ clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)" }}
                            >
                                <span className="text-orange-500 font-bold mr-2">{'>'}</span> {BlenderProjects[currentPreview.index].description}
                            </div>
                        </div>
                    )
                }

                {
                    currentPreview && currentPreview.type === "unreal" && (() => {
                        const project = UnrealProjects[currentPreview.index];
                        const videoId = project.Link ? project.Link.split('/').pop().split('?')[0] : '';
                        return (
                            <div className="relative overflow-hidden w-[900px] h-[550px] flex items-center justify-center p-8">
                                {videoLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 border border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                                            <span className="text-orange-500 text-xs tracking-widest uppercase animate-pulse">[ INITIATING STREAM ]</span>
                                        </div>
                                    </div>
                                )}

                                <div className="w-full h-full border border-orange-500/30 overflow-hidden relative">
                                    {/* <div className="absolute inset-0 bg-orange-500/5 pointer-events-none z-10" /> removed as per request */}
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&vq=hd1080`}
                                        allow="autoplay; encrypted-media"
                                        onLoad={() => setVideoLoading(false)}
                                        className="absolute w-[1250px] h-[750px] max-w-none border-none pointer-events-none -top-[100px] -left-[175px]"
                                    />
                                </div>
                            </div>
                        );
                    })()
                }
            </div >

        </section >
    );
};

export default Works;