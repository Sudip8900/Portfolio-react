import React, { useState, useRef } from 'react';
import { experience, resumes, roleTagsMap } from '../constants';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import Magnetic from '../componnts/Magnetic.jsx';
import DrawText from '../componnts/DrawText';

gsap.registerPlugin(ScrollTrigger);



const Experience = () => {
    const [previewPdf, setPreviewPdf] = useState(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);

    useGSAP(() => {
        // Simple, robust, isolated scroll triggers for every element
        const elements = gsap.utils.toArray('.gsap-fade-in');

        elements.forEach((el) => {
            gsap.fromTo(el,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Section header reveal animation
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
                delay: 0.3,
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

        // Parallax scroll animation for background watermark
        gsap.fromTo(".experience-watermark",
            { xPercent: 8 },
            {
                xPercent: -8,
                scrollTrigger: {
                    trigger: "#experience",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );

    }, []);

    return (
        <section id="experience" className='min-h-screen pb-20 bg-[#eae8e4] text-[#111111] relative z-10'>
            {/* Background Light Text Watermark */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="experience-watermark absolute right-0 top-10 select-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] tracking-tighter"
                >
                    EXPERIENCE
                </div>
            </div>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="pt-20 px-5 md:px-10 relative z-10 w-full">

                {/* Header Section */}
                <div ref={headingRef} className='flex items-center gap-4 mb-20 select-none' style={{ perspective: "1000px" }}>
                    <div className='header-block w-12 h-2 bg-orange-600' />
                    <h1 className='text-xl md:text-5xl font-bold uppercase tracking-widest overflow-hidden flex flex-wrap gap-y-1 py-1'>
                        {(() => {
                            const headerText = "[ SYS.EXPERIENCE_LOGS ]";
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
                    <div ref={lineRef} className='flex-1 h-[1px] bg-[#cfccb8]' />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0'>

                    {/* Column 1: Technical Core (Left) */}
                    <div className="col-span-1 lg:col-span-3 lg:pr-8 lg:border-r lg:border-[#cfccb8]/60 pb-8 lg:pb-0 gsap-fade-in">
                        <div className="lg:sticky lg:top-32 h-fit">
                            <div className="flex items-center gap-2 mb-8 text-[11px] font-bold tracking-[0.2em] text-[#111111]   select-none">
                                <span className="w-2 h-2 bg-orange-600" />
                                TECHNICAL CORE
                            </div>
                            <div className="flex flex-col gap-10">
                                <div>
                                    <h3 className="text-lg font-bold tracking-wider text-[#111111] mb-2 uppercase  ">
                                        3D Art & Modeling
                                    </h3>
                                    <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                        Focus on hard-surface modeling, game asset creation, procedural texturing, and rigging for interactive systems.
                                    </p>
                                    <div className="flex flex-col gap-1   text-[9px] text-neutral-400 tracking-wider">
                                        <span>[ BLENDER_CORE ]</span>
                                        <span>[ PROCEDURAL_TEXTURING ]</span>
                                        <span>[ RIGGING_&_ANIMATION ]</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold tracking-wider text-[#111111] mb-2 uppercase ">
                                        Game Systems
                                    </h3>
                                    <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                        Modular gameplay mechanics, advanced enemy AI systems, camera targeting, and real-time performance optimization.
                                    </p>
                                    <div className="flex flex-col gap-1   text-[9px] text-neutral-400 tracking-wider">
                                        <span>[ UNREAL_ENGINE_5 ]</span>
                                        <span>[ GAMEPLAY_CPP ]</span>
                                        <span>[ BLUEPRINT_ARCHITECTURE ]</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold tracking-wider text-[#111111] mb-2 uppercase ">
                                        VLSI & Hardware
                                    </h3>
                                    <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                                        Analog and digital IC layout, schematic design, simulation, and DRC/LVS circuit validation.
                                    </p>
                                    <div className="flex flex-col gap-1   text-[9px] text-neutral-400 tracking-wider">
                                        <span>[ CADENCE_VIRTUOSO ]</span>
                                        <span>[ VERILOG_HDL ]</span>
                                        <span>[ CIRCUIT_VERIFICATION ]</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Professional Log / Experience entries (Middle) */}
                    <div className="col-span-1 lg:col-span-6 lg:px-10 lg:border-r lg:border-[#cfccb8]/60 pb-8 lg:pb-0">
                        <div className="flex items-center gap-2 mb-8 text-[11px] font-bold tracking-[0.2em] text-[#111111]   select-none">
                            <span className="w-2 h-2 bg-orange-600" />
                            PROFESSIONAL LOG
                        </div>
                        <div className="flex flex-col gap-12">
                            {experience.map((exp) => (
                                <div key={exp.id} className="gsap-fade-in relative border-b border-[#cfccb8]/30 pb-10 last:border-none last:pb-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-[#111111]">
                                            {exp.role}
                                        </h3>
                                        {exp.duration.toLowerCase().includes('present') && (
                                            <span className="text-[9px]   font-bold border border-[#111111] px-2 py-0.5 tracking-wider uppercase text-[#111111] select-none">
                                                CURRENT
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        {exp.icon ? (
                                            <Icon icon={exp.icon} width="16" height="16" className="text-neutral-600" />
                                        ) : (
                                            <img src={exp.image} alt={exp.company} className="w-4 h-4 object-contain" />
                                        )}
                                        <span className="text-[11px]   tracking-widest uppercase text-neutral-500 font-bold">
                                            {exp.company}
                                        </span>
                                    </div>

                                    <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                                        {exp.description}
                                    </p>

                                    {roleTagsMap[exp.id] && (
                                        <div className="flex flex-wrap gap-2">
                                            {roleTagsMap[exp.id].map((tag, i) => (
                                                <span key={i} className="text-[9px]   tracking-widest uppercase border border-[#cfccb8] px-3 py-1 text-neutral-500 font-semibold select-none">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: CV (Right) */}
                    <div className="col-span-1 lg:col-span-3 lg:pl-8 gsap-fade-in">
                        <div className="lg:sticky lg:top-32 h-fit">
                            <InteractiveCard>
                                <div className='p-6 md:p-8 bg-white border border-[#cfccb8] flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#111111] transition-all duration-300'>

                                    {/* HUD Decorative Elements */}
                                    <div className='absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />
                                    <div className='absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />

                                    <h1 className='w-full text-[#111111] font-bold text-3xl md:text-4xl uppercase tracking-widest mt-6 mb-15 text-left' style={{ transform: "translateZ(30px)" }}>
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

            {/* Resume Preview Modal */}
            {previewPdf && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#eae8e4]/90 backdrop-blur-md p-4 md:p-10" onClick={() => setPreviewPdf(null)}>
                    <div className="w-full max-w-5xl h-full max-h-[95vh] md:max-h-[90vh] border-2 border-[#111111] bg-white flex flex-col relative" onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b-2 border-[#111111] bg-[#f4f2ee]">
                            <div className="text-[#111111] uppercase tracking-widest text-sm font-bold flex items-center gap-3  ">
                                <span className="w-2.5 h-2.5 bg-orange-600 rounded-full animate-pulse" />
                                [ DOCUMENT.PREVIEW ]
                            </div>
                            <div className="flex gap-4">
                                <a href={previewPdf} download className="text-xs bg-orange-600 text-white border-2 border-[#111111] px-4 py-2 uppercase tracking-widest font-bold hover:bg-orange-500 transition-all flex items-center gap-2">
                                    <Icon icon="carbon:cloud-download" width="16" height="16" /> DOWNLOAD
                                </a>
                                <button onClick={() => setPreviewPdf(null)} className="text-xs border-2 border-[#111111] bg-white text-[#111111] px-4 py-2 uppercase tracking-widest font-bold hover:bg-orange-600/10 hover:text-orange-600 transition-all">
                                    CLOSE
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 w-full bg-[#eae8e4] relative">
                            <iframe src={previewPdf} className="w-full h-full border-none" title="PDF Preview" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Experience;