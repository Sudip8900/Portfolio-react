import React, { useState } from 'react';
import { experience } from '../constants';
import { Icon } from '@iconify/react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import Magnetic from '../componnts/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const [previewPdf, setPreviewPdf] = useState(null);
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

    }, []);

    return (
        <section id="experience" className='min-h-screen pb-20 bg-black text-white relative'>
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,105,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            <div className="pt-20 px-5 md:px-10 relative z-10 w-full">

                {/* Header Section */}
                <div className='flex items-center gap-4 mb-20 gsap-fade-in'>
                    <div className='w-12 h-2 bg-orange-500/50' />
                    <h1 className='text-orange-500 text-xl md:text-5xl font-bold uppercase tracking-widest'>
                        [ SYS.EXPERIENCE_LOGS ]
                    </h1>
                    <div className='flex-1 h-[1px] bg-orange-500/20' />
                </div>

                <div className='flex flex-col xl:flex-row gap-10 lg:gap-20 perspective-[2000px]'>

                    {/* Left Side: Data Logs Timeline */}
                    <div className="w-full xl:w-2/3 relative gsap-line-grow-trigger">

                        {/* Vertical glowing line */}
                        <div className="absolute left-4 md:left-[42px] top-0 w-[2px] bg-orange-500/20 h-full">
                            <div className="w-full bg-orange-500 gsap-line-grow shadow-[0_0_10px_rgba(255,105,0,0.8)]" />
                        </div>

                        <div className="flex flex-col gap-12">
                            {experience.map((exp, index) => (
                                <div key={exp.id} className="flex gap-4 md:gap-10 relative gsap-fade-in">

                                    {/* Timeline Node */}
                                    <div className="relative mt-6 z-10 md:ml-5">
                                        <div className="w-8 h-8 md:w-12 md:h-12 bg-black border-2 border-orange-500 flex items-center justify-center rotate-45 shadow-[0_0_15px_rgba(255,105,0,0.4)]">
                                            <div className="w-2 h-2 md:w-3 md:h-3 bg-orange-500" />
                                        </div>
                                    </div>

                                    {/* Experience Card */}
                                    <InteractiveCard className="flex-1">
                                        <div className="bg-[#0a0a0a]/90 border border-orange-500/20 p-4 sm:p-6 md:p-8 relative group hover:border-orange-500/50 transition-colors duration-500">

                                            {/* Decorative Corners */}
                                            <div className='absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-500 z-10 transition-all duration-300 group-hover:-top-1 group-hover:-left-1' />
                                            <div className='absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-500 z-10 transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1' />

                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4" style={{ transform: "translateZ(30px)" }}>
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-orange-500 tracking-widest uppercase drop-shadow-[0_0_5px_rgba(255,105,0,0.3)]">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-white font-bold uppercase tracking-widest mt-1 text-sm md:text-base">{exp.company}</p>
                                                </div>

                                                {/* Duration Badge */}
                                                <div className="bg-orange-500/10 border border-orange-500/30 px-3 py-1 text-orange-500/80 text-xs tracking-widest uppercase">
                                                    {exp.duration}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start" style={{ transform: "translateZ(20px)" }}>

                                                {/* Icon / Image */}
                                                <div className="w-16 h-16 shrink-0 bg-white/5 border border-orange-500/20 flex items-center justify-center p-2">
                                                    {exp.icon ? (
                                                        <Icon icon={exp.icon} width="40" height="40" className="text-white/60 group-hover:text-white transition-colors" />
                                                    ) : (
                                                        <img
                                                            src={exp.image}
                                                            alt={exp.company}
                                                            className="w-full h-full object-contain transition-all"
                                                        />
                                                    )}
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/60 text-sm leading-relaxed tracking-wide">
                                                    <span className="text-orange-500 mr-2">{'>'}</span>
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
                            <div className='p-6 md:p-8 bg-[#050505] border border-orange-500/30 flex flex-col justify-center items-center relative overflow-hidden group'>

                                {/* Background glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,105,0,0.1)_0%,transparent_70%)] pointer-events-none" />

                                {/* HUD Decorative Elements */}
                                <div className='absolute top-4 left-4 text-orange-500/50 text-[10px] tracking-widest uppercase'>[ SECURITY.CLEARANCE.REQUIRED ]</div>
                                <div className='absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500/50' />
                                <div className='absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-orange-500/50' />

                                <div className="absolute top-0 left-0 w-full h-[1px] bg-orange-500/50 animate-[dropLine_4s_linear_infinite]" />

                                <Icon icon="carbon:fingerprint-recognition" width="60" height="60" className="text-orange-500/30 mt-10 group-hover:text-orange-500 transition-colors duration-500" style={{ transform: "translateZ(20px)" }} />

                                <h1 className='text-orange-500 font-bold text-3xl md:text-5xl uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,105,0,0.3)] mt-6 text-center' style={{ transform: "translateZ(30px)" }}>
                                    CREDENTIALS
                                </h1>
                                <p className='text-white/40 text-xs tracking-widest uppercase mt-4 mb-10 text-center' style={{ transform: "translateZ(20px)" }}>
                                    // Authorized personnel only<br />// Download access data below
                                </p>

                                <div className="w-full flex flex-col gap-4 relative z-10" style={{ transform: "translateZ(40px)" }}>
                                    <Magnetic>
                                        <div className='block w-full' onClick={() => setPreviewPdf("/Documets/Resume.pdf")}>
                                            <button className='flex flex-row items-center justify-between w-full bg-orange-500/5 border border-orange-500/30 text-white p-4 cursor-pointer transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/20 group/btn relative overflow-hidden'>
                                                <div className="absolute left-0 top-0 w-1 h-full bg-orange-500 scale-y-0 group-hover/btn:scale-y-100 transition-transform origin-top" />
                                                <div className="flex flex-col items-start pl-2">
                                                    <span className="text-xs text-orange-500/70 tracking-widest uppercase mb-1">DATA.BLOCK_01</span>
                                                    <span className="text-sm tracking-widest uppercase relative z-10 group-hover/btn:text-orange-500 transition-colors font-bold">Game Dev Resume</span>
                                                </div>
                                                <Icon icon="carbon:document-view" width="24" height="24" className="text-orange-500/50 group-hover/btn:text-orange-500 transition-colors" />
                                            </button>
                                        </div>
                                    </Magnetic>

                                    <Magnetic>
                                        <div className='block w-full' onClick={() => setPreviewPdf("/Documets/Resume2.pdf")}>
                                            <button className='flex flex-row items-center justify-between w-full bg-orange-500/5 border border-orange-500/30 text-white p-4 cursor-pointer transition-all duration-300 hover:border-orange-500 hover:bg-orange-500/20 group/btn relative overflow-hidden'>
                                                <div className="absolute left-0 top-0 w-1 h-full bg-orange-500 scale-y-0 group-hover/btn:scale-y-100 transition-transform origin-top" />
                                                <div className="flex flex-col items-start pl-2">
                                                    <span className="text-xs text-orange-500/70 tracking-widest uppercase mb-1">DATA.BLOCK_02</span>
                                                    <span className="text-sm tracking-widest uppercase relative z-10 group-hover/btn:text-orange-500 transition-colors font-bold">Electronics Resume</span>
                                                </div>
                                                <Icon icon="carbon:document-view" width="24" height="24" className="text-orange-500/50 group-hover/btn:text-orange-500 transition-colors" />
                                            </button>
                                        </div>
                                    </Magnetic>
                                </div>
                            </div>
                        </InteractiveCard>
                    </div>

                </div>
            </div>

            {/* Resume Preview Modal */}
            {previewPdf && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 md:p-10" onClick={() => setPreviewPdf(null)}>
                    <div className="w-full max-w-5xl h-full max-h-[95vh] md:max-h-[90vh] border border-orange-500/50 bg-[#0a0a0a] flex flex-col relative shadow-[0_0_50px_rgba(255,105,0,0.3)]" onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-orange-500/30 bg-[#050505]">
                            <div className="text-orange-500 uppercase tracking-widest text-sm font-bold flex items-center gap-3">
                                <span className="w-2 h-2 bg-orange-500 animate-pulse" />
                                // DOCUMENT.PREVIEW
                            </div>
                            <div className="flex gap-4">
                                <a href={previewPdf} download className="text-[10px] sm:text-xs bg-orange-500 text-black px-2 sm:px-4 py-2 uppercase tracking-widest font-bold hover:bg-orange-400 transition-colors flex items-center gap-1 sm:gap-2">
                                    <Icon icon="carbon:cloud-download" width="16" height="16" /> Download
                                </a>
                                <button onClick={() => setPreviewPdf(null)} className="text-[10px] sm:text-xs border border-orange-500/50 text-orange-500 px-2 sm:px-4 py-2 uppercase tracking-widest hover:bg-orange-500/20 transition-colors">
                                    Close
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 w-full bg-white/5 relative">
                            <iframe src={previewPdf} className="w-full h-full border-none" title="PDF Preview" />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Experience;