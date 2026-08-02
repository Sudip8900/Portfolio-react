import React, { useState, useRef } from 'react';
import { experience, resumes } from '../constants';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import Magnetic from '../componnts/Magnetic.jsx';
import PdfModal from '../componnts/PdfModal.jsx';

gsap.registerPlugin(ScrollTrigger);

// Derive timeline years dynamically from experience array exported in constants/index.js
const timelineYears = Array.from(new Set(experience.map(item => item.year || 2024))).sort((a, b) => b - a);

const Experience = () => {
    const [previewPdf, setPreviewPdf] = useState(null);
    const [activeYear, setActiveYear] = useState(timelineYears[0] || 2024);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const gridRef = useRef(null);
    const leftColRef = useRef(null);

    useGSAP(() => {
        // 1. Section Header Reveal Animation
        if (headingRef.current) {
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                }
            });

            headerTl.from(headingRef.current.querySelector('.header-block'), {
                duration: 0.5,
                scaleX: 0,
                opacity: 0,
                delay: 0.2,
                transformOrigin: "left center",
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
                    transformOrigin: "left center",
                    ease: "power3.out",
                }, "-=0.4");
        }

        // 2. Parallax Scroll Animation for Background Text Watermark
        gsap.fromTo(".experience-watermark",
            { xPercent: 8 },
            {
                xPercent: -8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );

        // 3. Track which year section is currently in view
        timelineYears.forEach((yr) => {
            const el = document.getElementById(`exp-year-${yr}`);
            if (el) {
                ScrollTrigger.create({
                    trigger: el,
                    start: "top 45%",
                    end: "bottom 45%",
                    onEnter: () => setActiveYear(yr),
                    onEnterBack: () => setActiveYear(yr),
                });
            }
        });

        // 4. GSAP ScrollTrigger Pinning for Desktop Sticky Left Column
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            if (gridRef.current && leftColRef.current) {
                ScrollTrigger.create({
                    trigger: gridRef.current,
                    start: "top top+=110",
                    end: "bottom bottom-=50",
                    pin: leftColRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });
            }
        });

        // 5. Fade in animation for experience cards
        const cards = gsap.utils.toArray('.arch-exp-card');
        cards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });
    }, { scope: sectionRef });

    const scrollToYear = (yr) => {
        setActiveYear(yr);
        const target = document.getElementById(`exp-year-${yr}`);
        if (target) {
            const yOffset = -100;
            const element = target;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <section id="experience" ref={sectionRef} className="min-h-screen pt-20 pb-24 px-4 sm:px-8 md:px-10 lg:px-14 w-full bg-[#efeeea] text-[#111111] relative z-10 font-sans border-t border-[#d5d2c4]">

            {/* Background Light Text Watermark */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="experience-watermark absolute right-0 top-10 select-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] tracking-tighter font-sans">
                    EXPERIENCE
                </div>
            </div>

            {/* Faint Architectural Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="w-full relative z-10">

                {/* Section Header */}
                <div ref={headingRef} className='flex items-center gap-2 sm:gap-4 mb-12 sm:mb-16 select-none w-full max-w-full overflow-hidden' style={{ perspective: "1000px" }}>
                    <div className='header-block w-8 sm:w-12 h-1.5 sm:h-2 bg-orange-600 shrink-0' />
                    <h1 className='text-xs xs:text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider sm:tracking-widest overflow-hidden flex flex-nowrap whitespace-nowrap py-1 shrink-0 font-sans'>
                        {(() => {
                            const headerText = "[ SYS.EXPERIENCE_LOGS ]";
                            return headerText.split("").map((char, index) => (
                                <span key={index} className="header-char inline-block origin-bottom text-[#111111]">
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ));
                        })()}
                    </h1>
                    <div ref={lineRef} className='flex-1 min-w-[12px] h-[1px] bg-[#cfccb8]' />
                </div>

                {/* Mobile Sticky Timeline Header Bar */}
                <div className="lg:hidden sticky top-16 z-30 bg-[#efeeea]/95 backdrop-blur-md border-b border-[#cfccb8] py-3 px-4 mb-8 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-[#777777] uppercase">
                        TIMELINE_ANCHOR
                    </span>
                    <div className="flex items-center gap-4">
                        {timelineYears.map((yr) => (
                            <button
                                key={yr}
                                onClick={() => scrollToYear(yr)}
                                className={`font-mono text-xs font-bold transition-colors ${
                                    activeYear === yr ? 'text-[#111111] underline underline-offset-4' : 'text-[#999999]'
                                }`}
                            >
                                {yr}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main 2-Column Grid: Left Sticky Column (Timeline + CV Box) + Right Experience Cards */}
                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 w-full relative">

                    {/* Left Sticky Column (Timeline Anchors + Original CV Box combined) */}
                    <div className="col-span-1 lg:col-span-3">
                        <div ref={leftColRef} className="sticky top-28 self-start hidden lg:flex flex-col justify-between border-r border-[#cfccb8]/70 pr-6 py-2 space-y-8">

                            {/* Top Timeline Anchors */}
                            <div>
                                <div className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#777777] uppercase mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#111111]" />
                                    TIMELINE_ANCHOR
                                </div>

                                <div className="space-y-4">
                                    {timelineYears.map((yr) => {
                                        const isActive = activeYear === yr;
                                        return (
                                            <button
                                                key={yr}
                                                onClick={() => scrollToYear(yr)}
                                                className={`block text-left transition-all duration-300 font-sans cursor-pointer ${
                                                    isActive
                                                        ? 'text-4xl xl:text-5xl font-black text-[#111111] translate-x-1'
                                                        : 'text-3xl xl:text-4xl font-semibold text-[#bab7a8] hover:text-[#555555]'
                                                }`}
                                            >
                                                {yr}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Full CV Box in the SAME Left Sticky Column */}
                            <div className="w-full pt-4 border-t border-[#cfccb8]/60">
                                <InteractiveCard>
                                    <div className="p-5 bg-white border border-[#cfccb8] flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#111111] transition-all duration-300 shadow-sm hover:shadow-xl">

                                        {/* HUD Decorative Corner Brackets */}
                                        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300" />
                                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300" />

                                        {/* Solid CV Header */}
                                        <h1 className="w-full text-[#111111] font-black text-3xl xl:text-4xl uppercase tracking-widest mt-1 mb-6 text-left font-sans">
                                            CV
                                        </h1>

                                        {/* Magnetic Buttons for Resumes */}
                                        <div className="w-full flex flex-col gap-3 relative z-10">
                                            {resumes.map((resume) => (
                                                <Magnetic key={resume.id}>
                                                    <div className="block w-full cursor-pointer" onClick={() => setPreviewPdf(resume.path)}>
                                                        <button className="flex flex-row items-center justify-between w-full bg-[#f4f2ee] border border-[#cfccb8] text-[#111111] p-3.5 cursor-pointer hover:border-[#111111] hover:bg-[#eae8e4]/50 group/btn transition-all duration-300">
                                                            <div className="flex flex-col items-start">
                                                                <span className="text-[10px] xl:text-xs tracking-widest uppercase relative z-10 group-hover/btn:text-orange-600 transition-colors font-bold font-sans">
                                                                    {resume.label}
                                                                </span>
                                                            </div>
                                                            <Icon icon="carbon:document-view" width="20" height="20" className="text-orange-500 group-hover/btn:text-orange-600 transition-colors shrink-0" />
                                                        </button>
                                                    </div>
                                                </Magnetic>
                                            ))}
                                        </div>

                                    </div>
                                </InteractiveCard>
                            </div>

                        </div>
                    </div>

                    {/* Right Experience Cards Stream Column */}
                    <div className="col-span-1 lg:col-span-9 space-y-16 lg:space-y-24 w-full">

                        {timelineYears.map((yr) => {
                            const yearExperiences = experience.filter(item => item.year === yr);
                            if (yearExperiences.length === 0) return null;

                            return (
                                <div key={yr} id={`exp-year-${yr}`} className="space-y-12 sm:space-y-16 w-full">

                                    {yearExperiences.map((exp, index) => {
                                        const imageSrc = exp.image || exp.imageMain || "/Images/rifle.jpg";
                                        const sysId = exp.sysId || `[ SYSTEM_00${exp.id || index + 1} ]`;
                                        const phase = exp.phase || `// PHASE_0${4 - (index % 4)}`;
                                        const imageOverlayText = exp.imageOverlayText || `[ SCANNING_ARCH_${exp.id || index + 1} ]`;
                                        const imageOnRight = exp.imageOnRight !== undefined ? exp.imageOnRight : (index % 2 === 0);
                                        const bulletsList = exp.bullets && exp.bullets.length > 0 ? exp.bullets : [exp.description];
                                        const tagsList = exp.tags || ["SYSTEM", "CORE"];

                                        return (
                                            <div
                                                key={exp.id}
                                                className="arch-exp-card bg-[#f7f6f2] border border-[#cfccb8] p-6 sm:p-8 md:p-10 lg:p-12 relative transition-all duration-300 hover:border-[#111111] group shadow-sm hover:shadow-md w-full"
                                            >
                                                {/* Decorative Corner Brackets */}
                                                <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#111111] opacity-40 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#111111] opacity-40 group-hover:opacity-100 transition-opacity" />

                                                {/* Top Tag Bar */}
                                                <div className="flex items-center justify-between gap-4 mb-6 font-mono text-[10px] sm:text-xs">
                                                    <span className="bg-[#111111] text-white px-2.5 py-1 font-bold tracking-wider">
                                                        {sysId}
                                                    </span>
                                                    <span className="border border-[#cfccb8] px-2.5 py-1 text-[#666666] font-semibold tracking-widest bg-white/60">
                                                        {phase}
                                                    </span>
                                                </div>

                                                {/* Experience Content Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start w-full">

                                                    {/* Text Left / Image Right variant */}
                                                    {imageOnRight ? (
                                                        <>
                                                            {/* Text Content */}
                                                            <div className="col-span-1 md:col-span-7 space-y-4">
                                                                <div>
                                                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-tight mb-2 font-sans">
                                                                        {exp.role}
                                                                    </h2>
                                                                    <p className="font-mono text-xs sm:text-sm font-bold text-[#666666] uppercase tracking-widest">
                                                                        {exp.company} // {exp.duration}
                                                                    </p>
                                                                </div>

                                                                {/* Summary Description */}
                                                                {exp.description && (
                                                                    <p className="text-xs sm:text-sm leading-relaxed text-[#555555] font-sans italic border-l-2 border-orange-600/40 pl-3">
                                                                        {exp.description}
                                                                    </p>
                                                                )}

                                                                {/* Bullet Points */}
                                                                <div className="pt-4 space-y-3 border-t border-[#cfccb8]/60">
                                                                    {bulletsList.map((bullet, idx) => (
                                                                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-[#222222] font-sans font-medium">
                                                                            <span className="font-mono text-orange-600 font-bold shrink-0 text-sm">+</span>
                                                                            <span>{bullet}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Tech Tags */}
                                                                <div className="flex flex-wrap gap-1.5 pt-4">
                                                                    {tagsList.map((tag, tIdx) => (
                                                                        <span key={tIdx} className="font-mono text-[9px] uppercase tracking-wider bg-[#eae8e1] border border-[#cfccb8] px-2 py-0.5 text-[#444444]">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Image Box */}
                                                            <div className="col-span-1 md:col-span-5">
                                                                <div className="bg-[#0a0a0a] border border-[#111111] p-2 relative overflow-hidden group/img">
                                                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
                                                                        {exp.icon && !exp.image && !exp.imageMain ? (
                                                                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#181818] p-6 text-center">
                                                                                <Icon icon={exp.icon} width="64" height="64" className="text-neutral-300 mb-3" />
                                                                                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                                                                                    {exp.company}
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <img
                                                                                src={imageSrc}
                                                                                alt={exp.role}
                                                                                className="w-full h-full object-cover grayscale contrast-125 group-hover/img:scale-105 transition-transform duration-500"
                                                                            />
                                                                        )}
                                                                        {/* Overlay Scanline & Label */}
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                                                                            <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase bg-black/60 px-2 py-0.5 border border-white/20 backdrop-blur-sm">
                                                                                {imageOverlayText}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Image Box Left */}
                                                            <div className="col-span-1 md:col-span-5 order-2 md:order-1">
                                                                <div className="bg-[#0a0a0a] border border-[#111111] p-2 relative overflow-hidden group/img">
                                                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#151515]">
                                                                        {exp.icon && !exp.image && !exp.imageMain ? (
                                                                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#181818] p-6 text-center">
                                                                                <Icon icon={exp.icon} width="64" height="64" className="text-neutral-300 mb-3" />
                                                                                <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                                                                                    {exp.company}
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <img
                                                                                src={imageSrc}
                                                                                alt={exp.role}
                                                                                className="w-full h-full object-cover grayscale contrast-125 group-hover/img:scale-105 transition-transform duration-500"
                                                                            />
                                                                        )}
                                                                        {/* Overlay Scanline & Label */}
                                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                                                                            <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase bg-black/60 px-2 py-0.5 border border-white/20 backdrop-blur-sm">
                                                                                {imageOverlayText}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Text Content Right */}
                                                            <div className="col-span-1 md:col-span-7 space-y-4 order-1 md:order-2">
                                                                <div>
                                                                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-tight mb-2 font-sans">
                                                                        {exp.role}
                                                                    </h2>
                                                                    <p className="font-mono text-xs sm:text-sm font-bold text-[#666666] uppercase tracking-widest">
                                                                        {exp.company} // {exp.duration}
                                                                    </p>
                                                                </div>

                                                                {/* Summary Description */}
                                                                {exp.description && (
                                                                    <p className="text-xs sm:text-sm leading-relaxed text-[#555555] font-sans italic border-l-2 border-orange-600/40 pl-3">
                                                                        {exp.description}
                                                                    </p>
                                                                )}

                                                                {/* Bullet Points */}
                                                                <div className="pt-4 space-y-3 border-t border-[#cfccb8]/60">
                                                                    {bulletsList.map((bullet, idx) => (
                                                                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-[#222222] font-sans font-medium">
                                                                            <span className="font-mono text-orange-600 font-bold shrink-0 text-sm">+</span>
                                                                            <span>{bullet}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Tech Tags */}
                                                                <div className="flex flex-wrap gap-1.5 pt-4">
                                                                    {tagsList.map((tag, tIdx) => (
                                                                        <span key={tIdx} className="font-mono text-[9px] uppercase tracking-wider bg-[#eae8e1] border border-[#cfccb8] px-2 py-0.5 text-[#444444]">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            );
                        })}

                        {/* Mobile CV Card Section */}
                        <div className="lg:hidden w-full pt-6">
                            <InteractiveCard>
                                <div className="p-6 bg-white border border-[#cfccb8] flex flex-col justify-center items-center relative overflow-hidden group shadow-sm">
                                    <h1 className="w-full text-[#111111] font-black text-2xl sm:text-3xl uppercase tracking-widest mb-6 text-left font-sans">
                                        CV
                                    </h1>
                                    <div className="w-full flex flex-col gap-3">
                                        {resumes.map((resume) => (
                                            <Magnetic key={resume.id}>
                                                <div className="block w-full cursor-pointer" onClick={() => setPreviewPdf(resume.path)}>
                                                    <button className="flex flex-row items-center justify-between w-full bg-[#f4f2ee] border border-[#cfccb8] text-[#111111] p-4 cursor-pointer hover:border-[#111111] hover:bg-[#eae8e4]/50 group/btn transition-all duration-300">
                                                        <span className="text-xs tracking-widest uppercase font-bold font-sans">
                                                            {resume.label}
                                                        </span>
                                                        <Icon icon="carbon:document-view" width="22" height="22" className="text-orange-500 shrink-0" />
                                                    </button>
                                                </div>
                                            </Magnetic>
                                        ))}
                                    </div>
                                </div>
                            </InteractiveCard>
                        </div>

                    </div>

                </div>
            </div>

            {/* Resume Preview Modal */}
            <PdfModal pdfUrl={previewPdf} onClose={() => setPreviewPdf(null)} />

        </section>
    );
};

export default Experience;