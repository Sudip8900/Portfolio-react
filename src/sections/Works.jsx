import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderProjects, UnrealProjects, VLSIProjects } from '../constants';
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
    const scrollTextRef = useRef(null);

    const blenderItemsRef = useRef([]);
    const unrealItemsRef = useRef([]);
    const vlsiItemsRef = useRef([]);
    const countRefs = useRef([]);

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

        vlsiItemsRef.current.forEach((item) => {
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

        /* ── Counter count-up animation ── */
        const total = BlenderProjects.length + UnrealProjects.length + VLSIProjects.length;
        const counts = [BlenderProjects.length, UnrealProjects.length, VLSIProjects.length, total];

        countRefs.current.forEach((el, i) => {
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
                val: counts[i],
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
                onUpdate: () => {
                    el.textContent = String(Math.round(obj.val)).padStart(2, '0');
                },
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

        if (scrollTextRef.current) {
            const el = scrollTextRef.current;
            gsap.killTweensOf(el);
            el.scrollTop = 0;

            setTimeout(() => {
                if (el.scrollHeight > el.clientHeight) {
                    const maxScroll = el.scrollHeight - el.clientHeight;
                    const duration = maxScroll / 20;

                    gsap.to(el, {
                        scrollTop: maxScroll,
                        duration: duration,
                        ease: "linear",
                        delay: 1.5,
                        yoyo: true,
                        repeat: -1,
                        repeatDelay: 1.5
                    });
                }
            }, 50);
        }
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

            {/* ══════════ PROJECT COUNTER BOX ══════════ */}
            <div className="px-5 md:px-10 mt-10 mb-2">

                {/* Section label */}
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.35em] text-orange-500/50 uppercase">[ SYS.STAT_OVERVIEW ]</span>
                    <div className="flex-1 h-px bg-orange-500/15" />
                    <span className="text-[10px] font-mono text-orange-500/30 animate-pulse">● LIVE</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: 'DB.BLENDER', sub: '3D Models', icon: 'logos:blender', idx: 0 },
                        { label: 'DB.UNREAL', sub: 'Game Demos', icon: 'devicon:unrealengine', idx: 1 },
                        { label: 'DB.VLSI', sub: 'Circuit Designs', icon: 'mdi:chip', idx: 2 },
                        { label: 'TOTAL.OBJ', sub: 'All Projects', icon: 'mdi:database-outline', idx: 3 },
                    ].map(({ label, sub, icon, idx }) => (
                        <div
                            key={idx}
                            className="relative border border-orange-500/20 bg-[#0a0a0a] p-4 md:p-6 group hover:border-orange-500/55 transition-all duration-300 overflow-hidden cursor-default"
                        >
                            {/* Corner brackets */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-500/50 group-hover:border-orange-500 transition-colors duration-300" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-500/50 group-hover:border-orange-500 transition-colors duration-300" />
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300 pointer-events-none" />
                            {/* Scan line on hover */}
                            <div className="absolute left-0 top-0 h-full w-[2px] bg-orange-500 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                            <div className="relative z-10 flex flex-col gap-2">
                                {/* Label + icon row */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] md:text-[11px] font-mono tracking-[0.2em] text-orange-500/55 uppercase">{label}</span>
                                    <Icon
                                        icon={icon}
                                        className="text-orange-500 group-hover:text-orange-500/80 transition-colors duration-300 bg-orange-300 p-1 rounded-full"
                                        width={32} height={32}
                                    />
                                </div>

                                {/* Animated counter */}
                                <span
                                    ref={el => countRefs.current[idx] = el}
                                    className="text-4xl md:text-5xl font-bold tabular-nums text-white drop-shadow-[0_0_14px_rgba(255,105,0,0.35)] group-hover:drop-shadow-[0_0_22px_rgba(255,105,0,0.7)] transition-all duration-300"
                                >
                                    00
                                </span>

                                {/* Divider */}
                                <div className="w-full h-px bg-orange-500/12 group-hover:bg-orange-500/40 transition-colors duration-300" />

                                {/* Sub label */}
                                <span className="text-[9px] font-mono tracking-widest text-orange-500/30 uppercase">{sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* ═══════════════════════════════════════ */}

            <div
                ref={projectRef}
                className='flex flex-col relative md:flex-row mt-10 perspective-[2000px]'
                onMouseMove={handleMouseMove}
            >

                {/* Blender */}
                <div className='w-auto md:w-1/3 h-96 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 mx-4 my-3 md:m-5 p-4 md:p-5'>
                    <div className='h-96 md:h-150 overflow-y-auto scroll-container relative'>
                        {/* Decorative Corner Brackets */}

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
                                        <div className='flex justify-between items-center px-4 md:px-6 py-4 bg-white/5 border border-orange-500/10 cursor-pointer group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden'>
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
                                            <img src={project.image} alt={project.name} className="w-full transition-all duration-500 border border-orange-500/20 object-cover" />
                                        </div>
                                    </InteractiveCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Unreal */}
                <div className='w-auto md:w-1/3 h-96 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 mx-4 my-3 md:m-5 p-4 md:p-5'>
                    <div className='h-96 md:h-150 overflow-y-auto scroll-container relative'>
                        {/* Decorative Corner Brackets */}

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
                                            className='flex justify-between items-center px-4 md:px-6 py-4 bg-white/5 border border-orange-500/10 cursor-pointer group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden'
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
                </div>

                {/* VLSI */}
                <div className='w-auto md:w-1/3 h-96 md:h-150 overflow-y-auto bg-[#0a0a0a]/80 border border-orange-500/20 mx-4 my-3 md:m-5 p-4 md:p-5'>
                    <div className='h-96 md:h-150 overflow-y-auto scroll-container relative'>
                        {/* Decorative Corner Brackets */}

                        <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-8 uppercase tracking-widest'>
                            [ DB.VLSI ]
                        </h1>

                        <p className='my-5 text-white/50 text-sm tracking-widest uppercase'>// Tools & Circuit designs.</p>

                        <div className='flex flex-col gap-4'>
                            {VLSIProjects.map((project, index) => (
                                <div
                                    key={index}
                                    ref={el => vlsiItemsRef.current[index] = el}
                                    onMouseEnter={() => handleMouseEnter("vlsi", index)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <InteractiveCard>
                                        <a
                                            href={project.Link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className='flex justify-between items-center px-4 md:px-6 py-4 bg-white/5 border border-orange-500/10 cursor-pointer group hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden'
                                        >
                                            {/* Hover Scanning Line */}
                                            <div className='absolute left-0 top-0 h-full w-[2px] bg-orange-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300' />

                                            <h2 className='lg:text-[20px] text-[16px] uppercase tracking-widest text-white/80 group-hover:text-white transition drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' style={{ transform: "translateZ(20px)" }}>
                                                {project.name}
                                            </h2>
                                            <Magnetic>
                                                <div className="inline-block relative" style={{ transform: "translateZ(30px)" }}>
                                                    <Icon icon="mdi:github" className='text-orange-500/50 group-hover:text-orange-500 transition-colors' width="24" height="24" />
                                                </div>
                                            </Magnetic>
                                        </a>
                                    </InteractiveCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div >

            {/* Floating Preview via Portal to escape z-index stacking context */}
            {createPortal(
                <div
                    ref={previewRef}
                    className='fixed -top-125 left-0 z-[100000] overflow-hidden border border-orange-500/50 pointer-events-none md:block hidden opacity-0 bg-black/90 backdrop-blur-md shadow-[0_0_50px_rgba(255,105,0,0.15)]'
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)" }}
                >
                    {/* HUD Overlay Elements for Preview */}
                    <div className='absolute top-2 left-2 text-orange-500 text-[10px] tracking-widest uppercase z-50'>[VIEWPORT ACTIVE]</div>
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
                                <div className="relative overflow-hidden w-[1050px] h-[550px] flex p-6 gap-6">
                                    <div className="relative w-[700px] h-full border border-orange-500/30 overflow-hidden">
                                        {videoLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-sm z-10">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-12 h-12 border border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                                                    <span className="text-orange-500 text-xs tracking-widest uppercase animate-pulse">[ INITIATING STREAM ]</span>
                                                </div>
                                            </div>
                                        )}

                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&vq=hd1080`}
                                            allow="autoplay; encrypted-media"
                                            onLoad={() => setVideoLoading(false)}
                                            className="absolute w-[1920px] h-[1080px] max-w-none border-none pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-37"
                                        />
                                    </div>

                                    <div
                                        ref={DesRef}
                                        className="relative flex-1 h-full border border-orange-500/30 bg-[#0a0a0a]/90 backdrop-blur-md p-6 flex flex-col shadow-[inset_0_0_20px_rgba(255,105,0,0.05)]"
                                        style={{ clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)" }}
                                    >
                                        <div className="text-orange-500 text-[10px] tracking-widest uppercase mb-4 border-b border-orange-500/20 pb-2">
                                            [ SYS.LOG_DATA ]
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,105,0,0.5)]">
                                            {project.name}
                                        </h3>
                                        <div ref={scrollTextRef} className="text-sm text-justify text-white/70 tracking-widest font-light leading-relaxed overflow-y-auto pr-2 flex-1 whitespace-pre-wrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                            <span className="text-orange-500 mr-2 font-bold">{'>'}</span> {project.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    }

                    {
                        currentPreview && currentPreview.type === "vlsi" && (() => {
                            const project = VLSIProjects[currentPreview.index];
                            return (
                                <div className="relative overflow-hidden w-[500px] h-[350px] flex p-6">
                                    <div
                                        ref={DesRef}
                                        className="relative flex-1 h-full border border-orange-500/30 bg-[#0a0a0a]/90 backdrop-blur-md p-6 flex flex-col shadow-[inset_0_0_20px_rgba(255,105,0,0.05)]"
                                        style={{ clipPath: "polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)" }}
                                    >
                                        <div className="text-orange-500 text-[10px] tracking-widest uppercase mb-4 border-b border-orange-500/20 pb-2 flex justify-between">
                                            <span>[ SYS.LOG_DATA ]</span>
                                            <Icon icon="mdi:chip" width={16} />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(255,105,0,0.5)]">
                                            {project.name}
                                        </h3>
                                        <div ref={scrollTextRef} className="text-sm text-justify text-white/70 tracking-widest font-light leading-relaxed overflow-y-auto pr-2 flex-1 whitespace-pre-wrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                            <span className="text-orange-500 mr-2 font-bold">{'>'}</span> {project.description}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()
                    }
                </div>,
                document.body
            )}

        </section >
    );
};

export default Works;