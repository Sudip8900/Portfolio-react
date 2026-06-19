import React, { useState, useRef } from 'react';
import { experience, resumes } from '../constants';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import Magnetic from '../componnts/Magnetic.jsx';

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
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // Triggers when the element enters 85% of the viewport height
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Special animation for the left timeline line
        gsap.fromTo('.gsap-line-grow',
            { height: 0 },
            {
                height: "100%",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.gsap-line-grow-trigger',
                    start: "top 60%"
                }
            }
        );

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

    }, []);

    return (
        <section id="experience" className='min-h-screen pb-20 bg-[#eae8e4] text-[#111111] relative z-10'>
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

                <div className='flex flex-col xl:flex-row gap-10 lg:gap-20 perspective-[2000px]'>

                    {/* Left Side: Data Logs Timeline */}
                    <div className="w-full xl:w-2/3 relative gsap-line-grow-trigger">

                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-[42px] top-0 w-[2px] bg-[#cfccb8] h-full">
                            <div className="w-full bg-[#111111] gsap-line-grow" />
                        </div>

                        <div className="flex flex-col gap-12">
                            {experience.map((exp, index) => (
                                <div key={exp.id} className="flex gap-4 md:gap-10 relative gsap-fade-in">

                                    {/* Timeline Node */}
                                    <div className="relative mt-6 z-10 md:ml-5">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-[#111111] flex items-center justify-center rotate-45">
                                            <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-600 animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Experience Card */}
                                    <InteractiveCard className="flex-1">
                                        <div className="bg-white border border-[#cfccb8] p-4 sm:p-6 md:p-8 relative group hover:border-[#111111] transition-all duration-300">

                                            {/* Decorative Corners */}
                                            <div className='absolute top-0 left-0 w-3 h-3 border-t border-l border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />
                                            <div className='absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />

                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4" style={{ transform: "translateZ(30px)" }}>
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-orange-600 tracking-widest uppercase">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-[#111111] font-bold uppercase tracking-widest mt-1 text-sm md:text-base">{exp.company}</p>
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="bg-orange-600/10 border border-orange-600/30 px-3 py-1 text-orange-600 text-xs tracking-widest uppercase font-bold">
                                                    {exp.duration}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start" style={{ transform: "translateZ(20px)" }}>

                                                {/* Icon / Image */}
                                                <div className="w-16 h-16 shrink-0 bg-[#f4f2ee] border border-[#cfccb8] flex items-center justify-center p-2">
                                                    {exp.icon ? (
                                                        <Icon icon={exp.icon} width="40" height="40" className="text-neutral-600 group-hover:text-orange-600 transition-colors" />
                                                    ) : (
                                                        <img
                                                            src={exp.image}
                                                            alt={exp.company}
                                                            className="w-full h-full object-contain transition-all"
                                                        />
                                                    )}
                                                </div>

                                                {/* Description */}
                                                <p className="text-neutral-600 text-sm leading-relaxed tracking-wide">
                                                    <span className="text-orange-600 mr-2 font-bold">{'>'}</span>
                                                    {exp.description}
                                                </p>

                                            </div>

                                        </div>
                                    </InteractiveCard>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Credentials / CV */}
                    <div className='w-full xl:w-1/3 h-fit relative xl:sticky top-32 gsap-fade-in'>
                        <InteractiveCard>
                            <div className='p-6 md:p-8 bg-white border border-[#cfccb8] flex flex-col justify-center items-center relative overflow-hidden group hover:border-[#111111] transition-all duration-300'>

                                {/* HUD Decorative Elements */}
                                <div className='absolute top-4 left-4 text-neutral-500 font-mono text-[9px] tracking-widest uppercase font-bold'>[ SECURITY.CLEARANCE.REQUIRED ]</div>
                                <div className='absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />
                                <div className='absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#cfccb8] group-hover:border-[#111111] transition-colors duration-300' />

                                <Icon icon="carbon:fingerprint-recognition" width="60" height="60" className="text-[#cfccb8] mt-10 group-hover:text-orange-600 transition-colors duration-500" style={{ transform: "translateZ(20px)" }} />

                                <h1 className='text-[#111111] font-bold text-3xl md:text-4xl uppercase tracking-widest mt-6 text-center' style={{ transform: "translateZ(30px)" }}>
                                    CREDENTIALS
                                </h1>
                                <p className='text-neutral-500 text-xs tracking-widest uppercase mt-4 mb-10 text-center leading-relaxed font-mono font-bold' style={{ transform: "translateZ(20px)" }}>
                                    // Authorized personnel only<br />// Download access data below
                                </p>

                                <div className="w-full flex flex-col gap-4 relative z-10" style={{ transform: "translateZ(40px)" }}>
                                    {resumes.map((resume) => (
                                        <Magnetic key={resume.id}>
                                            <div className='block w-full cursor-pointer' onClick={() => setPreviewPdf(resume.path)}>
                                                <button className='flex flex-row items-center justify-between w-full bg-[#f4f2ee] border border-[#cfccb8] text-[#111111] p-5 md:p-6 cursor-pointer hover:border-[#111111] hover:bg-[#eae8e4]/50 group/btn transition-all duration-300'>
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-[11px] md:text-xs font-mono text-orange-600 font-bold tracking-widest uppercase mb-1">{resume.id}</span>
                                                        <span className="text-sm md:text-base tracking-widest uppercase relative z-10 group-hover/btn:text-orange-600 transition-colors font-bold">{resume.label}</span>
                                                    </div>
                                                    <Icon icon="carbon:document-view" width="28" height="28" className="text-neutral-500 group-hover/btn:text-orange-600 transition-colors" />
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

            {/* Resume Preview Modal */}
            {previewPdf && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#eae8e4]/90 backdrop-blur-md p-4 md:p-10" onClick={() => setPreviewPdf(null)}>
                    <div className="w-full max-w-5xl h-full max-h-[95vh] md:max-h-[90vh] border-2 border-[#111111] bg-white flex flex-col relative" onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b-2 border-[#111111] bg-[#f4f2ee]">
                            <div className="text-[#111111] uppercase tracking-widest text-sm font-bold flex items-center gap-3 font-mono">
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