import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderProjects, UnrealProjects, CodingProjects, VLSIProjects } from '../constants';
import { Icon } from '@iconify/react';
import Magnetic from '../componnts/Magnetic.jsx';
import InteractiveCard from '../componnts/InteractiveCard.jsx';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
    const [activeProject, setActiveProject] = useState(null);
    const [videoLoading, setVideoLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...new Set(CodingProjects.map(p => p.category).filter(Boolean))];
    const filteredCodingProjects = CodingProjects.filter(p => selectedCategory === "All" || p.category === selectedCategory);

    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const subRef = useRef(null);
    const subRef2 = useRef(null);
    const dashboardRef = useRef(null);
    const countRefs = useRef({});
    const descriptionContainerRef = useRef(null);

    const total = BlenderProjects.length + UnrealProjects.length + CodingProjects.length + VLSIProjects.length;
    const counts = [BlenderProjects.length, UnrealProjects.length, CodingProjects.length, VLSIProjects.length, total];
    const unrealStatuses = ["v1.0.4", "STABLE", "LIVE", "TESTING", "STABLE"];

    const getProjectMetadata = (project) => {
        if (!project) return { typeStr: "UNKNOWN", dateStr: "N/A" };
        const name = project.name.toLowerCase();
        if (project.type === 'blender') {
            if (name.includes('perfume')) return { typeStr: "GLASS / POLY", dateStr: "2023.11.22" };
            if (name.includes('house')) return { typeStr: "CARTOON / POLY", dateStr: "2023.11.25" };
            if (name.includes('rounded') || name.includes('bottle')) return { typeStr: "GLASS / POLY", dateStr: "2023.11.27" };
            if (name.includes('bulb')) return { typeStr: "REALISTIC / EMISSION", dateStr: "2023.11.29" };
            if (name.includes('rifle')) return { typeStr: "WEAPON / HARD", dateStr: "2023.12.16" };
            if (name.includes('speaker')) return { typeStr: "ELECTRONIC / HARD", dateStr: "2023.12.22" };
            if (name.includes('katana') || name.includes('knife')) return { typeStr: "MELEE / WEAPON", dateStr: "2024.04.10" };
            return { typeStr: "3D ASSET / POLY", dateStr: "2023.12.20" };
        }
        if (project.type === 'unreal') {
            if (name.includes('combat')) return { typeStr: "BLUEPRINT / COMPONENT", dateStr: "2024.12.20" };
            if (name.includes('optimization')) return { typeStr: "UE5 / RENDER", dateStr: "2025.01.05" };
            if (name.includes('enemy')) return { typeStr: "AI / PATHFINDING", dateStr: "2025.01.12" };
            if (name.includes('target')) return { typeStr: "CAMERA / TRACE", dateStr: "2025.01.20" };
            return { typeStr: "UE5 / LEVEL DESIGN", dateStr: "2024.12.15" };
        }
        if (project.type === 'coding') {
            if (name.includes('re-plotter') || name.includes('replotter')) return { typeStr: "PYTHON / ANALYSIS", dateStr: "2024.06.10" };
            if (name.includes('forge')) return { typeStr: "C++ / TERMINAL", dateStr: "2024.08.15" };
            return { typeStr: "SOFTWARE / SYSTEM", dateStr: "2024.07.01" };
        }
        if (project.type === 'vlsi') {
            return { typeStr: "VLSI / CADENCE", dateStr: "2024.09.01" };
        }
        return { typeStr: "PORTFOLIO / OBJ", dateStr: "2024.01.01" };
    };

    const getProjectIndexTag = (project) => {
        if (!project) return "N/A";
        let prefix = "OBJ";
        let list = [];
        if (project.type === 'blender') { prefix = "OBJ"; list = BlenderProjects; }
        else if (project.type === 'unreal') { prefix = "SIM"; list = UnrealProjects; }
        else if (project.type === 'coding') { prefix = "DEV"; list = CodingProjects; }
        else if (project.type === 'vlsi') { prefix = "FAB"; list = VLSIProjects; }

        const idx = list.findIndex(p => p.name === project.name);
        const numStr = String(idx !== -1 ? idx + 1 : 1).padStart(2, '0');
        return `${prefix}_${numStr}`;
    };

    const getButtonText = (project) => {
        if (!project) return "LAUNCH";
        if (project.type === 'unreal') return "WATCH_GAMEPLAY";
        if (project.type === 'coding') return "GITHUB_REPO";
        if (project.type === 'blender') return "VIEW_3D_POST";
        return "LAUNCH_PROJECT";
    };

    // Default to the first Blender project when loaded
    useEffect(() => {
        if (!activeProject && BlenderProjects.length > 0) {
            setActiveProject({ type: "blender", ...BlenderProjects[0] });
        }
    }, [activeProject]);

    // Track category switch animations for coding list
    useEffect(() => {
        gsap.fromTo('.gsap-coding-row',
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
        );
    }, [selectedCategory]);

    // Auto-scroll long description text when it overflows the viewport container
    useEffect(() => {
        const el = descriptionContainerRef.current;
        if (!el) return;

        // Reset scroll position on active project change
        el.scrollTop = 0;

        let scrollInterval;
        let isHovered = false;
        let delayTimeout;

        const startAutoScroll = () => {
            let checks = 0;
            delayTimeout = setTimeout(() => {
                if (!el) return;
                scrollInterval = setInterval(() => {
                    if (isHovered) return;

                    const maxScroll = el.scrollHeight - el.clientHeight;
                    if (maxScroll <= 0) {
                        checks++;
                        if (checks > 125) { // Stop checking after 5 seconds of no overflow
                            clearInterval(scrollInterval);
                        }
                        return;
                    }

                    // Reset checks since it overflows
                    checks = 0;

                    if (el.scrollTop >= maxScroll - 1) {
                        clearInterval(scrollInterval);
                        setTimeout(() => {
                            if (!el) return;
                            gsap.to(el, {
                                scrollTop: 0,
                                duration: 1.5,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    startAutoScroll();
                                }
                            });
                        }, 3000);
                    } else {
                        el.scrollTop += 0.75;
                    }
                }, 40);
            }, 2000);
        };

        startAutoScroll();

        const handleMouseEnter = () => { isHovered = true; };
        const handleMouseLeave = () => { isHovered = false; };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearTimeout(delayTimeout);
            if (scrollInterval) clearInterval(scrollInterval);
            if (el) {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [activeProject]);

    /* ================= GSAP ANIMATIONS ================= */
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#works",
                start: "top 90%",
            }
        });

        // Heading Reveal
        if (headingRef.current) {
            tl.from(headingRef.current.querySelector('.header-block'), {
                duration: 0.5,
                scaleX: 0,
                opacity: 0,
                transformOrigin: "right center",
                ease: "power2.out",
            })
                .from(headingRef.current.querySelectorAll('.header-char'), {
                    duration: 0.6,
                    opacity: 0,
                    y: 30,
                    rotateX: -90,
                    stagger: 0.03,
                    ease: "back.out(1.7)",
                }, "-=0.2")
                .from(lineRef.current, {
                    duration: 0.8,
                    scaleX: 0,
                    transformOrigin: "right center",
                    ease: "power3.out",
                }, "-=0.4");
        }

        // Subtitles Reveal
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

        // Main Dashboard Grow Reveal
        if (dashboardRef.current) {
            tl.from(dashboardRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            }, "-=0.4");
        }

        // Counters Count-Up
        const keys = ['blender', 'unreal', 'coding', 'vlsi', 'total'];
        const values = {
            blender: BlenderProjects.length,
            unreal: UnrealProjects.length,
            coding: CodingProjects.length,
            vlsi: VLSIProjects.length,
            total: total
        };
        keys.forEach(key => {
            const el = countRefs.current[key];
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
                val: values[key],
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 90%' },
                onUpdate: () => {
                    el.textContent = String(Math.round(obj.val)).padStart(2, '0');
                },
            });
        });

        // Parallax scroll animation for background watermark
        gsap.fromTo(".works-watermark",
            { xPercent: 8 },
            {
                xPercent: -8,
                scrollTrigger: {
                    trigger: "#works",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );

    }, [BlenderProjects.length, UnrealProjects.length, CodingProjects.length, VLSIProjects.length]);

    return (
        <section id="works" className='relative z-10 min-h-screen flex flex-col py-20 overflow-hidden bg-[#eae8e4] text-[#111111]'>
            {/* Background Light Text Watermark */}
            <div
                className="works-watermark absolute right-0 top-10 select-none pointer-events-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] z-0 tracking-tighter"
            >
                WORKS
            </div>

            {/* Header (UNCHANGED as requested) */}
            <div className='flex items-center gap-4 mb-10 px-5 md:px-10 select-none' ref={headingRef} style={{ perspective: "1000px" }}>
                <div ref={lineRef} className='flex-1 h-[1px] bg-[#cfccb8]' />
                <h1 className='text-2xl md:text-5xl font-bold uppercase tracking-widest overflow-hidden flex flex-wrap gap-y-1 py-1'>
                    {(() => {
                        const headerText = "[ SYS.WORKS_DB ]";
                        return headerText.split("").map((char, index) => (
                            <span
                                key={index}
                                className="header-char inline-block origin-bottom text-[#111111]"
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ));
                    })()}
                </h1>
                <div className='header-block w-12 h-2 bg-orange-600/60' />
            </div>

            <div
                ref={subRef}
                className='hidden lg:flex flex-col text-end mt-5 md:mt-0 px-5 md:px-10 text-xl font-light tracking-widest uppercase text-neutral-500'
            >
                <p>// A curated collection of my creative projects.</p>
                <p>// Blending 3D design and immersive interactive systems.</p>
                <p>// Currently focusing on Unreal Engine and VLSI circuit design.</p>
            </div>

            <div
                ref={subRef2}
                className='text-end m-5 text-[0.7rem] md:text-sm text-neutral-500 md:hidden flex flex-col tracking-widest uppercase'
            >
                <p>// Creative projects.</p>
                <p>// 3D and Unreal Engine.</p>
                <p>// VLSI design.</p>
            </div>

            {/* ══════════ PORTFOLIO DASHBOARD CONTAINER ══════════ */}
            <div className="px-5 md:px-10 mt-10">
                <div
                    ref={dashboardRef}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#cfccb8] bg-white relative overflow-hidden"
                >

                    {/* ================= LEFT COLUMN (Stats + Unreal) ================= */}
                    <div className="col-span-1 lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#cfccb8] flex flex-col">

                        {/* STATS OVERVIEW PANEL (Top-Left) */}
                        <div className="lg:h-[600px] border-b border-[#cfccb8] p-10 bg-white select-none flex flex-col justify-between gap-12">
                            <div className="flex items-center gap-2 text-sm   tracking-[0.25em] text-neutral-400 uppercase font-bold">
                                <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                                SYS.STAT_OVERVIEW
                            </div>

                            <div className="flex flex-col gap-8">
                                {/* Blender Stat */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm   text-neutral-500 uppercase tracking-widest">
                                            <span>DB.BLENDER</span>
                                            <Icon icon="logos:blender" width="18" />
                                        </div>
                                        <span className="text-[11px]   text-neutral-400 uppercase tracking-widest font-semibold mt-1">3D ASSETS</span>
                                    </div>
                                    <div className="text-6xl font-bold text-[#111111]" ref={el => countRefs.current.blender = el}>
                                        00
                                    </div>
                                </div>

                                {/* Unreal Stat */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm   text-neutral-500 uppercase tracking-widest">
                                            <span>DB.UNREAL</span>
                                            <Icon icon="devicon:unrealengine" width="18" />
                                        </div>
                                        <span className="text-[11px]   text-neutral-400 uppercase tracking-widest font-semibold mt-1">ACTIVE BUILDS</span>
                                    </div>
                                    <div className="text-6xl font-bold text-[#111111]" ref={el => countRefs.current.unreal = el}>
                                        00
                                    </div>
                                </div>

                                {/* Coding Stat */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm   text-neutral-500 uppercase tracking-widest">
                                            <span>DB.CODING</span>
                                            <Icon icon="mdi:code-braces" width="18" className="text-neutral-400" />
                                        </div>
                                        <span className="text-[11px]   text-neutral-400 uppercase tracking-widest font-semibold mt-1">SOFT INDEX</span>
                                    </div>
                                    <div className="text-6xl font-bold text-[#111111]" ref={el => countRefs.current.coding = el}>
                                        00
                                    </div>
                                </div>

                                {/* VLSI Stat */}
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm   text-neutral-500 uppercase tracking-widest">
                                            <span>DB.VLSI</span>
                                            <Icon icon="mdi:chip" width="18" className="text-neutral-400" />
                                        </div>
                                        <span className="text-[11px]   text-neutral-400 uppercase tracking-widest font-semibold mt-1">FAB INDEX</span>
                                    </div>
                                    <div className="text-6xl font-bold text-[#111111]" ref={el => countRefs.current.vlsi = el}>
                                        00
                                    </div>
                                </div>

                                {/* Total Stat */}
                                <div className="pt-6 border-t border-[#cfccb8]/40 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 text-sm   text-neutral-500 uppercase tracking-widest">
                                            <span>TOTAL_DB</span>
                                            <Icon icon="mdi:database-outline" width="18" className="text-neutral-400" />
                                        </div>
                                        <span className="text-[11px]   text-neutral-400 uppercase tracking-widest font-semibold mt-1">PROJECTS INDEX</span>
                                    </div>
                                    <div className="text-6xl font-bold text-[#111111]" ref={el => countRefs.current.total = el}>
                                        00
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* UNREAL DATABASE PANEL (Bottom-Left) */}
                        <div className="lg:h-[600px] p-10 flex flex-col bg-white overflow-hidden justify-between border-b lg:border-b-0 border-[#cfccb8]">
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="flex justify-between items-center pb-3 border-b border-[#cfccb8]/60 mb-6 select-none">
                                    <h3 className="font-bold text-[#111111] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                                        UNREAL ARCHIVE
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 flex flex-col scrollbar-thin scroll-container">
                                    {UnrealProjects.map((project, index) => {
                                        const isActive = activeProject && activeProject.type === 'unreal' && activeProject.name === project.name;
                                        const tagStr = `SIM_${String(index + 1).padStart(2, '0')}`;
                                        return (
                                            <div
                                                key={index}
                                                className={`pl-4 pr-2 py-5 border-l-2 transition-all duration-300 cursor-pointer group flex justify-between items-center relative ${isActive ? 'border-l-orange-600 bg-[#f4f2ee]/45 text-orange-600 font-bold' : 'border-l-transparent hover:bg-[#f4f2ee]/25'}`}
                                                onMouseEnter={() => setActiveProject({ type: 'unreal', ...project })}
                                            >
                                                <div className="flex flex-col pl-2">
                                                    <span className="text-[9px] text-neutral-400 tracking-wider mb-1 block uppercase">
                                                        {tagStr}
                                                    </span>
                                                    <span className={`text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-[#111111] group-hover:text-orange-600'}`}>
                                                        {project.name}
                                                    </span>
                                                </div>
                                                <a
                                                    href={project.Link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`pr-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100'}`}
                                                >
                                                    <Icon icon="ion:arrow-up-right-box-outline" className="text-orange-600" width="16" height="16" />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ================= MIDDLE COLUMN (Blender + Coding/VLSI) ================= */}
                    <div className="col-span-1 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#cfccb8] flex flex-col">

                        {/* BLENDER PROJECTS LIST PANEL (Top-Middle) */}
                        <div className="lg:h-[600px] border-b border-[#cfccb8] p-10 flex flex-col overflow-hidden bg-white">
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="flex justify-between items-center pb-3 border-b border-[#cfccb8]/60 mb-6 select-none">
                                    <h3 className="font-bold text-[#111111] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                                        BLENDER ARCHIVE
                                    </h3>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 flex flex-col scrollbar-thin scroll-container">
                                    {BlenderProjects.map((project, index) => {
                                        const isActive = activeProject && activeProject.type === 'blender' && activeProject.name === project.name;
                                        const tagStr = `OBJ_${String(index + 1).padStart(2, '0')}`;
                                        return (
                                            <div
                                                key={index}
                                                className={`pl-4 pr-2 py-5 border-l-2 transition-all duration-300 cursor-pointer group flex justify-between items-center relative ${isActive ? 'border-l-orange-600 bg-[#f4f2ee]/45 text-orange-600 font-bold' : 'border-l-transparent hover:bg-[#f4f2ee]/25'}`}
                                                onMouseEnter={() => setActiveProject({ type: 'blender', ...project })}
                                            >
                                                <div className="flex flex-col pl-2">
                                                    <span className="text-[9px] text-neutral-400 tracking-wider mb-1 block uppercase">
                                                        {tagStr}
                                                    </span>
                                                    <span className={`text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-[#111111] group-hover:text-orange-600'}`}>
                                                        {project.name}
                                                    </span>
                                                </div>
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`pr-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100'}`}
                                                >
                                                    <Icon icon="ion:arrow-up-right-box-outline" className="text-orange-600" width="16" height="16" />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM ROW (Coding + VLSI Split Flex Layout) */}
                        <div className="lg:h-[600px] flex flex-col lg:flex-row gap-0 overflow-hidden bg-white">

                            {/* CODING DATABASE PANEL */}
                            <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#cfccb8] p-10 h-full flex flex-col justify-between overflow-hidden bg-white">
                                <div className="flex flex-col h-full overflow-hidden">
                                    <div className="flex justify-between items-center pb-3 border-b border-[#cfccb8]/60 select-none">
                                        <h3 className="font-bold text-[#111111] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                                            CODING ARCHIVE
                                        </h3>
                                    </div>

                                    {/* Dynamic Category Tabs */}
                                    <div className="flex gap-2 my-4 select-none">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-3 py-1 text-[10px] tracking-widest uppercase border transition-all duration-300 cursor-pointer ${selectedCategory === category
                                                    ? "border-orange-600 bg-orange-600/10 text-orange-600 font-bold"
                                                    : "border-[#cfccb8] bg-transparent text-neutral-400 hover:text-[#111111] hover:border-[#111111]"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex-1 overflow-y-auto pr-2 flex flex-col scrollbar-thin scroll-container">
                                        {filteredCodingProjects.map((project, index) => {
                                            const isActive = activeProject && activeProject.type === 'coding' && activeProject.name === project.name;
                                            const tagStr = `DEV_${String(index + 1).padStart(2, '0')}`;
                                            return (
                                                <div
                                                    key={project.id}
                                                    className={`gsap-coding-row pl-4 pr-2 py-5 border-l-2 transition-all duration-300 cursor-pointer group flex justify-between items-center relative ${isActive ? 'border-l-orange-600 bg-[#f4f2ee]/45 text-orange-600 font-bold' : 'border-l-transparent hover:bg-[#f4f2ee]/25'}`}
                                                    onMouseEnter={() => setActiveProject({ type: 'coding', ...project })}
                                                >
                                                    <div className="flex flex-col pl-2">
                                                        <span className="text-[9px] text-neutral-400 tracking-wider mb-1 block uppercase">
                                                            {tagStr}
                                                        </span>
                                                        <span className={`text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-[#111111] group-hover:text-orange-600'}`}>
                                                            {project.name}
                                                        </span>
                                                    </div>
                                                    <a
                                                        href={project.Link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`pr-2 transition-all duration-300 ${isActive ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100'}`}
                                                    >
                                                        <Icon icon="ion:arrow-up-right-box-outline" className="text-orange-600" width="16" height="16" />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* VLSI DATABASE PANEL */}
                            <div className="w-full lg:w-1/2 p-10 h-full flex flex-col justify-between overflow-hidden bg-white">
                                <div className="flex flex-col h-full overflow-hidden">
                                    <div className="flex justify-between items-center pb-3 border-b border-[#cfccb8]/60 mb-6 select-none">
                                        <h3 className="font-bold text-[#111111] text-[10px] md:text-xs tracking-[0.2em] uppercase">
                                            VLSI ARCHIVE
                                        </h3>
                                    </div>

                                    {VLSIProjects.length > 0 ? (
                                        <div className="flex-1 overflow-y-auto pr-2 flex flex-col scrollbar-thin scroll-container">
                                            {VLSIProjects.map((project, index) => {
                                                const isActive = activeProject && activeProject.type === 'vlsi' && activeProject.name === project.name;
                                                const tagStr = `FAB_${String(index + 1).padStart(2, '0')}`;
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`pl-4 pr-2 py-5 border-l-2 transition-all duration-300 cursor-pointer group flex justify-between items-center relative ${isActive ? 'border-l-orange-600 bg-[#f4f2ee]/45 text-orange-600 font-bold' : 'border-l-transparent hover:bg-[#f4f2ee]/25'}`}
                                                        onMouseEnter={() => setActiveProject({ type: 'vlsi', ...project })}
                                                    >
                                                        <div className="flex flex-col pl-2">
                                                            <span className="text-[9px] text-neutral-400 tracking-wider mb-1 block uppercase">
                                                                {tagStr}
                                                            </span>
                                                            <span className={`text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-[#111111] group-hover:text-orange-600'}`}>
                                                                {project.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-[9px] text-orange-600 font-bold uppercase pr-2">VLSI</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-[#cfccb8] bg-[#f4f2ee]/50 p-6 relative overflow-hidden group select-none">
                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-orange-600/5 to-transparent h-1/2 w-full animate-[pulse_2s_infinite]" />
                                            <div className="relative mb-4 scale-110">
                                                <div className="absolute inset-[-8px] border border-[#cfccb8]/40 rounded-full animate-ping duration-1000" />
                                                <div className="w-16 h-16 rounded-full border border-[#cfccb8] flex items-center justify-center bg-white relative z-10">
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="w-10 h-10 stroke-orange-600 fill-none animate-[spin_12s_linear_infinite]"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                                        <rect x="9" y="9" width="6" height="6" />
                                                        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="text-center relative z-10 flex flex-col gap-1">
                                                <h4 className="text-orange-600 text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
                                                    [ DB.VLSI_WIP ]
                                                </h4>
                                                <p className="text-xs text-neutral-400 tracking-wider uppercase font-semibold">
                                                    // Circuit models compiling
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ================= RIGHT COLUMN (Viewport + Status) ================= */}
                    <div className="col-span-1 lg:col-span-4 flex flex-col">

                        {/* LIVE VIEWPORT PREVIEW PANEL (Top-Right) */}
                        <div className="hidden lg:flex lg:h-[850px] border-b border-[#cfccb8] p-10 flex-col justify-between bg-[#f4f2ee]/50 relative overflow-hidden">

                            {/* Grid decorative brackets */}
                            <div className='absolute top-2 left-2 text-neutral-400 text-[8px] tracking-widest uppercase font-bold select-none'>[ VIEWPORT ACTIVE ]</div>
                            <div className='absolute top-0 left-0 w-3 h-3 border-t border-l border-[#cfccb8]/60' />
                            <div className='absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#cfccb8]/60' />

                            <div className="flex-1 flex flex-col justify-center mt-6">
                                {activeProject ? (
                                    <div className="flex flex-col h-full justify-between">

                                        {/* Preview Media (Sized larger) */}
                                        <div className="w-full h-64 lg:h-[480px] overflow-hidden border border-[#cfccb8] relative bg-black shrink-0">
                                            {activeProject.type === 'unreal' ? (
                                                (() => {
                                                    const videoId = activeProject.Link ? activeProject.Link.split('/').pop().split('?')[0] : '';
                                                    return (
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                                                            allow="autoplay; encrypted-media"
                                                            className="w-full h-full border-none pointer-events-none"
                                                        />
                                                    );
                                                })()
                                            ) : (
                                                <img src={activeProject.image} alt={activeProject.name} className="w-full h-full object-cover" />
                                            )}

                                            {/* Floating ID Tag */}
                                            <div className="absolute bottom-4 right-4 bg-white/95 border border-[#cfccb8]/60 px-3 py-1.5 text-[9px]   text-neutral-700 select-none shadow-sm z-10 uppercase tracking-widest">
                                                ID: {getProjectIndexTag(activeProject)}
                                            </div>
                                        </div>

                                        {/* Project Details */}
                                        <div className="flex-1 flex flex-col justify-between py-6">
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-start gap-4 mb-5">
                                                    <h4 className="text-base md:text-lg font-bold text-[#111111] uppercase tracking-wider leading-tight">
                                                        {activeProject.name}
                                                    </h4>
                                                    {(activeProject.Link || activeProject.link) && (
                                                        <a
                                                            href={activeProject.Link || activeProject.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="bg-black hover:bg-neutral-800 text-white text-[9px] font-bold py-2 px-3.5 transition-colors tracking-widest uppercase rounded-sm shrink-0"
                                                        >
                                                            {getButtonText(activeProject)}
                                                        </a>
                                                    )}
                                                </div>

                                                {(() => {
                                                    const { typeStr } = getProjectMetadata(activeProject);
                                                    return (
                                                        <div className="border-t border-[#cfccb8]/20 pt-5 mb-5">
                                                            <div>
                                                                <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-1">
                                                                    TYPE
                                                                </span>
                                                                <span className="text-[10px] md:text-xs font-bold uppercase text-neutral-800 tracking-wider">
                                                                    {typeStr}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })()}

                                                <div>
                                                    <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-2">
                                                        STATUS_LOG
                                                    </span>
                                                    <div
                                                        ref={descriptionContainerRef}
                                                        className="text-neutral-500 text-[9px] leading-relaxed h-[125px] lg:h-[135px] overflow-y-auto pr-1 select-none scrollbar-thin scroll-container bg-[#f4f2ee]/30 border border-[#cfccb8]/20 p-3"
                                                    >
                                                        <span className="text-orange-600 block mb-0.5">
                                                            [10:04:11] INITIALIZING_PREVIEW...
                                                        </span>
                                                        <span className="text-orange-600 block mb-0.5">
                                                            [10:04:12] ASSET_MAPPING_COMPLETE.
                                                        </span>
                                                        <span className="text-orange-600 block mb-2">
                                                            [10:04:12] RENDERING_BUFFERS_READY.
                                                        </span>
                                                        <span className="text-neutral-700 block uppercase font-bold tracking-wider mb-1">
                                                            // DESCRIPTION
                                                        </span>
                                                        <p className="text-neutral-500   text-xs md:text-sm leading-relaxed tracking-wide">
                                                            {activeProject.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-xs text-neutral-400 uppercase tracking-widest">
                                        // Awaiting Node selection
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SYSTEM STATUS PANEL (Bottom-Right) */}
                        <div className="lg:h-[350px] p-10 flex flex-col justify-between bg-white select-none">
                            <div className="flex flex-col h-full justify-between">
                                <span className="text-xs   tracking-[0.25em] text-neutral-400 uppercase font-bold">// SYSTEM_STATUS</span>

                                {/* Spinning Ring */}
                                <div className="flex flex-col items-center justify-center flex-1 py-6">
                                    <div className="relative flex items-center justify-center w-24 h-24 mb-4">
                                        <div className="absolute inset-0 border-2 border-orange-600/10 rounded-full border-t-orange-600 animate-spin" />
                                        <div className="absolute inset-2 border border-neutral-200 rounded-full flex flex-col items-center justify-center bg-[#f4f2ee]/30">
                                            <span className="text-[10px]   text-neutral-400 font-bold">SYNC</span>
                                            <span className="text-sm font-bold text-orange-600  ">96.2%</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold uppercase tracking-widest text-[#111111] block mb-1">ARCHIVE_SYNC</span>
                                        <span className="text-[10px]   text-neutral-400 uppercase tracking-widest font-semibold block">// ALL CORE SYSTEM NODES ONLINE</span>
                                    </div>
                                </div>

                                {/* Loading progress bar */}
                                <div className="w-full">
                                    <div className="flex justify-between text-[10px]   text-neutral-400 mb-1.5 font-semibold">
                                        <span>BUFFERING...</span>
                                        <span>100% SECURE</span>
                                    </div>
                                    <div className="w-full h-[2px] bg-[#cfccb8]/30 overflow-hidden">
                                        <div className="h-full bg-[#111111] w-[96.2%] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </section >
    );
};

export default Works;