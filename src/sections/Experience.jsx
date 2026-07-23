import React, { useState, useRef } from 'react';
import { experience, resumes, roleTagsMap } from '../constants';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import Magnetic from '../componnts/Magnetic.jsx';
import DrawText from '../componnts/DrawText';
import PdfModal from '../componnts/PdfModal.jsx';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const [previewPdf, setPreviewPdf] = useState(null);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const gridRef = useRef(null);
    const leftColRef = useRef(null);
    const rightColRef = useRef(null);

    useGSAP(() => {
        // 1. Element entrance animations
        const elements = gsap.utils.toArray('.gsap-fade-in');
        elements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // 2. Section header reveal animation
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

        // 3. Parallax scroll animation for background watermark
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

        // 4. GSAP ScrollTrigger Pinning for Desktop side columns
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            if (gridRef.current && leftColRef.current && rightColRef.current) {
                ScrollTrigger.create({
                    trigger: gridRef.current,
                    start: "top top+=90",
                    end: "bottom bottom",
                    pin: leftColRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });

                ScrollTrigger.create({
                    trigger: gridRef.current,
                    start: "top top+=90",
                    end: "bottom bottom",
                    pin: rightColRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });
            }
        });

    }, { scope: sectionRef });

    return (
        <section id="experience" ref={sectionRef} className='min-h-screen pb-24 bg-[#eae8e4] text-[#111111] relative z-10'>
            {/* Background Light Text Watermark */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="experience-watermark absolute right-0 top-10 select-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] tracking-tighter">
                    EXPERIENCE
                </div>
            </div>

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="pt-20 px-5 md:px-10 relative z-10 w-full">

                {/* Header Section */}
                <div ref={headingRef} className='flex items-center gap-2 sm:gap-4 mb-12 sm:mb-20 select-none w-full max-w-full overflow-hidden' style={{ perspective: "1000px" }}>
                    <div className='header-block w-8 sm:w-12 h-1.5 sm:h-2 bg-orange-600 shrink-0' />
                    <h1 className='text-[10px] xs:text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider sm:tracking-widest overflow-hidden flex flex-nowrap whitespace-nowrap py-1 shrink-0'>
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

                {/* Main 3-Column Layout */}
                <div ref={gridRef} className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 relative'>

                    {/* Column 1: Technical Core (Left Sidebar - Pinned on Desktop) */}
                    <div className="col-span-1 lg:col-span-3 lg:pr-8 lg:border-r lg:border-[#cfccb8]/60 pb-8 lg:pb-0">
                        <div ref={leftColRef} className="w-full">
                            <div className="flex items-center gap-2 mb-8 text-[11px] font-bold tracking-[0.2em] text-[#111111] select-none">
                                <span className="w-2 h-2 bg-orange-600" />
                                TECHNICAL CORE
                            </div>
                            <div className="flex flex-col gap-5 gsap-fade-in">

                                {/* Bento Card 1 */}
                                <InteractiveCard>
                                    <div className="p-5 bg-[#faf9f6] border border-[#cfccb8] hover:border-[#111111] transition-all duration-300 relative group">
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-600/40 group-hover:border-orange-600 transition-colors" />
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xs font-bold tracking-wider text-[#111111] uppercase">
                                                3D Art & Modeling
                                            </h3>
                                        </div>
                                        <p className="text-neutral-500 text-[11px] leading-relaxed mb-3">
                                            Hard-surface modeling, game assets, procedural texturing, and rigging.
                                        </p>
                                        <div className="flex flex-wrap gap-1 text-[8px] font-mono text-neutral-400">
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">BLENDER</span>
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">TEXTURING</span>
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">RIGGING</span>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                {/* Bento Card 2 */}
                                <InteractiveCard>
                                    <div className="p-5 bg-white border border-[#cfccb8] hover:border-[#111111] transition-all duration-300 relative group">
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-600/40 group-hover:border-orange-600 transition-colors" />
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xs font-bold tracking-wider text-[#111111] uppercase">
                                                Game Systems
                                            </h3>
                                        </div>
                                        <p className="text-neutral-500 text-[11px] leading-relaxed mb-3">
                                            Gameplay mechanics, AI behavior trees, camera systems, and C++ optimization.
                                        </p>
                                        <div className="flex flex-wrap gap-1 text-[8px] font-mono text-neutral-400">
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">UNREAL_5</span>
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">CPP</span>
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">BLUEPRINTS</span>
                                        </div>
                                    </div>
                                </InteractiveCard>

                                {/* Bento Card 3 */}
                                <InteractiveCard>
                                    <div className="p-5 bg-[#faf9f6] border border-[#cfccb8] hover:border-[#111111] transition-all duration-300 relative group">
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-600/40 group-hover:border-orange-600 transition-colors" />
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xs font-bold tracking-wider text-[#111111] uppercase">
                                                VLSI & Hardware
                                            </h3>
                                        </div>
                                        <p className="text-neutral-500 text-[11px] leading-relaxed mb-3">
                                            Analog & digital IC layout, schematic design, simulation, and DRC/LVS validation.
                                        </p>
                                        <div className="flex flex-wrap gap-1 text-[8px] font-mono text-neutral-400">
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">CADENCE</span>
                                            <span className="bg-[#f4f2ee] px-2 py-0.5 border border-[#cfccb8]/40 text-neutral-600">VERILOG</span>
                                        </div>
                                    </div>
                                </InteractiveCard>

                            </div>
                        </div>
                    </div>

                    {/* Column 2: Professional Log Bento Grid (Middle Scrolling Area) */}
                    <div className="col-span-1 lg:col-span-6 lg:px-8 lg:border-r lg:border-[#cfccb8]/60 pb-8 lg:pb-0">
                        <div className="flex items-center justify-between mb-8 text-[11px] font-bold tracking-[0.2em] text-[#111111] select-none border-b border-[#cfccb8]/40 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-600" />
                                EXPERIENCE GRID
                            </div>
                        </div>

                        {/* Bento Box Layout Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {experience.map((exp, index) => {
                                const isCurrent = exp.duration.toLowerCase().includes('present');
                                const isFeatured = exp.role === "Game Developer" || exp.role === "3D Artist";

                                return (
                                    <div
                                        key={exp.id}
                                        className={`gsap-fade-in ${isFeatured ? 'col-span-1 sm:col-span-2' : 'col-span-1'}`}
                                    >
                                        <InteractiveCard>
                                            <div className={`w-full h-full p-6 md:p-7 border border-[#cfccb8] hover:border-[#111111] transition-all duration-300 relative overflow-hidden group/bento flex flex-col justify-between ${isFeatured
                                                    ? 'bg-gradient-to-br from-white via-[#faf9f6] to-[#f4f2ee] shadow-sm hover:shadow-xl min-h-[220px]'
                                                    : 'bg-white/90 hover:bg-white shadow-sm hover:shadow-lg min-h-[200px]'
                                                }`}>

                                                {/* Bento Corner Brackets */}
                                                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#cfccb8] group-hover/bento:border-orange-600 transition-colors duration-300" />
                                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#cfccb8] group-hover/bento:border-orange-600 transition-colors duration-300" />

                                                {/* Top Header Row */}
                                                <div>
                                                    <div className="flex items-center justify-between gap-2 mb-3">
                                                        <span className="text-[9px] font-mono text-neutral-400 tracking-widest">[ BENTO_0{index + 1} ]</span>
                                                        {isCurrent && (
                                                            <span className="text-[8px] font-mono font-bold tracking-widest uppercase bg-orange-600 text-white px-2 py-0.5 shadow-sm">
                                                                ACTIVE
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Role Title */}
                                                    <h3 className={`font-bold uppercase tracking-wider text-[#111111] mb-2 group-hover/bento:text-orange-600 transition-colors ${isFeatured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
                                                        }`}>
                                                        {exp.role}
                                                    </h3>

                                                    {/* Company Badge */}
                                                    <div className="flex items-center gap-2 mb-3 bg-[#f4f2ee] px-2.5 py-1 border border-[#cfccb8]/50 w-fit">
                                                        {exp.icon ? (
                                                            <Icon icon={exp.icon} width="16" height="16" className="text-neutral-700" />
                                                        ) : (
                                                            <img src={exp.image} alt={exp.company} className="w-3.5 h-3.5 object-contain" />
                                                        )}
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111]">
                                                            {exp.company}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-neutral-600 text-xs leading-relaxed mb-4">
                                                        {exp.description}
                                                    </p>
                                                </div>

                                                {/* Bottom Metadata & Tech Stack */}
                                                <div className="pt-3 border-t border-[#cfccb8]/30 flex flex-col gap-2">
                                                    <span className="text-[10px] font-mono text-neutral-500 font-bold">
                                                        ⏱ {exp.duration}
                                                    </span>

                                                    {roleTagsMap[exp.id] && (
                                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                                            {roleTagsMap[exp.id].map((tag, i) => (
                                                                <span key={i} className="text-[8px] font-mono tracking-wider uppercase border border-[#cfccb8]/60 bg-[#f9f8f6] px-2 py-0.5 text-neutral-600 font-semibold">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </InteractiveCard>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    {/* Column 3: CV (Right Sidebar - Pinned on Desktop) */}
                    <div className="col-span-1 lg:col-span-3 lg:pl-8">
                        <div ref={rightColRef} className="w-full">
                            <div className="gsap-fade-in">
                                <InteractiveCard>
                                    <div className='p-6 md:p-8 bg-white border border-[#cfccb8] flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#111111] transition-all duration-300 shadow-sm hover:shadow-xl'>

                                        {/* HUD Decorative Elements */}
                                        <div className='absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />
                                        <div className='absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />

                                        <h1 className='w-full text-[#111111] font-bold text-3xl md:text-4xl uppercase tracking-widest mt-4 mb-10 text-left' style={{ transform: "translateZ(30px)" }}>
                                            <DrawText text="CV" color="#000000ff" fontSize={75} align="left" />
                                        </h1>

                                        <div className="w-full flex flex-col gap-4 relative z-10" style={{ transform: "translateZ(40px)" }}>
                                            {resumes.map((resume) => (
                                                <Magnetic key={resume.id}>
                                                    <div className='block w-full cursor-pointer' onClick={() => setPreviewPdf(resume.path)}>
                                                        <button className='flex flex-row items-center justify-between w-full bg-[#f4f2ee] border border-[#cfccb8] text-[#111111] p-5 md:p-6 cursor-pointer hover:border-[#111111] hover:bg-[#eae8e4]/50 group/btn transition-all duration-300'>
                                                            <div className="flex flex-col items-start">
                                                                <span className="text-[10px] md:text-[0.75rem] tracking-widest uppercase relative z-10 group-hover/btn:text-orange-600 transition-colors font-bold">{resume.label}</span>
                                                            </div>
                                                            <Icon icon="carbon:document-view" width="28" height="28" className="text-orange-500 group-hover/btn:text-orange-600 transition-colors" />
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
            </div>

            {/* Resume Preview Modal */}
            <PdfModal pdfUrl={previewPdf} onClose={() => setPreviewPdf(null)} />
        </section>
    );
};

export default Experience;