import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillsData, education, categoryNames } from '../constants';
import DrawText from '../componnts/DrawText';
import InteractiveSkillBalls from '../componnts/InteractiveSkillBalls';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredSkill, setHoveredSkill] = useState(SkillsData[0].skills[0]);

    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);

    // Sync hovered skill when active tab changes
    useEffect(() => {
        if (SkillsData[activeTab]) {
            setHoveredSkill(SkillsData[activeTab].skills[0]);
        }
    }, [activeTab]);

    const handlePrevTab = () => {
        setActiveTab((prev) => (prev === 0 ? SkillsData.length - 1 : prev - 1));
    };

    const handleNextTab = () => {
        setActiveTab((prev) => (prev === SkillsData.length - 1 ? 0 : prev + 1));
    };



    const getCategoryDetails = (tabIndex) => {
        switch (tabIndex) {
            case 0:
                return {
                    title: "3D Design & Game Engine Tools",
                    desc: "Crafting highly modular combat systems, detailed level geometry, hard-surface modeling, and asset animations."
                };
            case 1:
                return {
                    title: "Languages & Frameworks",
                    desc: "Mastering system programming, custom scripting, electronics automation, and modern web application logic."
                };
            case 2:
                return {
                    title: "VLSI Circuit Design & Hardware",
                    desc: "Simulating microelectronic circuits, layouts, and modeling digital system architectures in Verilog."
                };
            default:
                return {
                    title: "Technical Capabilities",
                    desc: "Comprehensive software engineering, 3D asset pipeline development, and ECE core systems."
                };
        }
    };

    const activeDetails = getCategoryDetails(activeTab);

    useGSAP(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
            }
        });

        if (headingRef.current) {
            tl.from(headingRef.current.querySelector('.header-block'), {
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

        if (prefersReducedMotion) {
            tl.fromTo(".editorial-col",
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power2.out",
                },
                "-=0.4"
            );
        } else {
            tl.fromTo(".editorial-col",
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.08,
                    ease: "power3.out",
                },
            );
        }

        // Parallax scroll animation for background watermark
        gsap.fromTo(".about-watermark",
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

        // Profile picture zoom reveal animation on scroll
        gsap.fromTo(".gsap-profile-img",
            { scale: 1.3, yPercent: 5 },
            {
                scale: 1.0,
                yPercent: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".gsap-profile-img-container",
                    start: "top 85%",
                    end: "bottom 30%",
                    scrub: 1,
                }
            }
        );

        gsap.fromTo(".gsap-profile-img-container",
            { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", opacity: 0 },
            {
                clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".gsap-profile-img-container",
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="min-h-screen py-16 bg-[#eae8e4] text-[#111111] w-full relative overflow-hidden">
            {/* Background Light Text Watermark */}
            <div
                className="about-watermark absolute right-0 top-10 select-none pointer-events-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] z-0 tracking-tighter"
            >
                ABOUT
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .about-editorial-container {
                    --bg: #eae8e4;
                    --ink: #111111;
                    --mid: #888888;
                    --rule: #cfccb8;
                    
                    background-color: var(--bg);
                    color: var(--ink);
                }
                .about-editorial-container *:not(.interactive-skill-balls-container, .interactive-skill-balls-container *) {
                    border-radius: 0px !important;
                    box-shadow: none !important;
                }
                .editorial-grid {
                    display: flex;
                    flex-direction: column;
                }
                @media (min-width: 900px) {
                    .editorial-grid {
                        display: flex;
                        flex-direction: row;
                    }
                    .editorial-left {
                        flex: 1 1 0%;
                        min-width: 0;
                        border-right: 1px solid var(--rule);
                        border-bottom: 0;
                    }
                    .editorial-center {
                        flex: 1 1 0%;
                        min-width: 0;
                        border-right: 1px solid var(--rule);
                        border-bottom: 0;
                    }
                    .editorial-right {
                        flex: 1 1 0%;
                        min-width: 0;
                    }
                }
                @media (max-width: 899.98px) {
                    .editorial-left, .editorial-center {
                        border-bottom: 1px solid var(--rule);
                        border-right: 0;
                    }
                }
            `}} />

            <div className="about-editorial-container w-full">

                {/* Section Header */}
                <div ref={headingRef} className="flex items-center gap-4 mb-10 px-5 md:px-10 select-none" style={{ perspective: "1000px" }}>
                    <div className="header-block w-12 h-2 bg-orange-600" />
                    <h1 className="text-2xl md:text-5xl font-bold uppercase tracking-widest overflow-hidden flex flex-wrap gap-y-1 py-1 text-[#111111]">
                        {(() => {
                            const headerText = "[ SYS.ABOUT_ME ]";
                            return headerText.split("").map((char, index) => (
                                <span
                                    key={index}
                                    className="header-char inline-block origin-bottom"
                                    style={{ color: 'var(--ink)' }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ));
                        })()}
                    </h1>
                    <div ref={lineRef} className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--rule)' }} />
                </div>

                {/* Main Editorial Grid */}
                <div className="editorial-grid">
                    {/* LEFT SIDEBAR */}
                    <div className="editorial-col editorial-left p-6 flex flex-col justify-between min-h-[500px]">
                        <div className="flex flex-col gap-4">

                            {/* 7. Description blurb */}
                            <p style={{ fontSize: '2rem', color: 'var(--mid)', lineHeight: '1.58' }} className="font-normal mt-2">
                                I'm a passionate game developer and designer with a background in 3D art and electronics engineering. I create immersive, <DrawText text="visually engaging games" color="#ea580c" fontSize={30} /> that blend strong design, technical skill, and <DrawText text="interactive innovation" color="#ea580c" fontSize={30} delay={0.25} />.
                            </p>
                            {/* 2. Body text blurb (2-3 lines) */}
                            <p style={{ fontSize: '1.2rem', color: 'var(--mid)', lineHeight: '1.55', borderColor: 'var(--rule)' }} className="font-normal mt-6 border-t">
                                Address: West Bengal, India
                            </p>
                            {/* Education Data Block */}
                            <div className="mt-6 flex flex-col gap-4 pt-4 border-t  " style={{ borderColor: 'var(--rule)' }}>
                                <span style={{ fontSize: '0.82rem', letterSpacing: '0.12em', color: 'var(--mid)' }} className="uppercase block font-bold">
                                    // EDU_DATA
                                </span>
                                <div className="flex flex-col gap-3">
                                    {education.map((edu) => (
                                        <div key={edu.id} className="flex flex-col">
                                            <div className="flex justify-between items-baseline pb-1 border-b" style={{ borderColor: 'var(--ink)' }}>
                                                <span className="text-orange-600 font-bold" style={{ fontSize: '1.05rem' }}>[{edu.year}]</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--mid)' }} className="uppercase font-bold">{edu.qualification}</span>
                                            </div>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--mid)' }} className="mt-1 uppercase tracking-wide">{edu.institution}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 8. CTA phrase at the bottom */}
                        <div style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: '1.2' }} className="mt-8 pt-6">
                            <span className="text-orange-600 font-bold">+</span> <DrawText text="CREATE IMMERSIVE, VISUALLY ENGAGING GAMES" color="#ea580c" fontSize={24} />
                        </div>
                    </div>

                    {/* CENTER STAGE */}
                    <div className="editorial-col editorial-center p-6 flex flex-col justify-end relative overflow-hidden min-h-[450px]">
                        {/* 1. Concave record-dot indicator */}
                        <div className="absolute top-6 left-6 z-20 w-[18px] h-[18px] rounded-full border flex items-center justify-center animate-pulse" style={{ borderColor: 'var(--ink)' }}>
                            <div className="w-[6px] h-[6px] rounded-full bg-orange-600" />
                        </div>

                        {/* 2. Oversized display headline */}
                        <div className="absolute top-16 left-6 z-10 flex flex-col  select-none" style={{ fontWeight: 700, letterSpacing: '-0.04em' }}>
                            <span className="text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.8] text-[#111111] whitespace-nowrap">SUDIP</span>
                            <span className="text-[clamp(4.5rem,10vw,8.5rem)] leading-[0.8] text-[#111111] whitespace-nowrap mt-5">PAN</span>
                        </div>

                        {/* 3. Primary hero image */}
                        <div className="w-full flex-1 flex items-center justify-center p-6 mt-70">
                            <div className="relative w-full max-w-[490px] aspect-[3/4] border overflow-hidden gsap-profile-img-container" style={{ borderColor: 'var(--rule)' }}>
                                <img
                                    src="/Images/ProfilePic.png"
                                    alt="SUDIP PAN"
                                    className="w-full h-full object-cover gsap-profile-img"
                                />
                                {/* 4. Small filled dot indicator */}
                                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-orange-600" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="editorial-col editorial-right flex flex-col divide-y" style={{ borderColor: 'var(--rule)' }}>

                        {/* Top panel */}
                        <div className="p-6 flex flex-col gap-4">
                            {/* Label header + arrow buttons */}
                            <div className="flex justify-between items-center">
                                <span style={{ fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--mid)' }} className="uppercase  ">
                                    {categoryNames[activeTab]}
                                </span>
                                <div className="flex gap-5 text-m">
                                    <button onClick={handlePrevTab} className=" text-white bg-black hover:bg-orange-600 cursor-pointer transition-colors px-3 py-0 pb-[6px] ">
                                        ←
                                    </button>
                                    <button onClick={handleNextTab} className=" text-white bg-black hover:bg-orange-600 cursor-pointer transition-colors px-3 py-0 pb-[6px] ">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bottom panel */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                {/* + + + decorative marker */}
                                <div style={{ color: 'var(--mid)' }} className="text-xs py-3 select-none flex gap-1 font-bold">
                                    <span>+</span>
                                    <span>+</span>
                                    <span>+</span>
                                </div>

                                {/* Secondary heading */}
                                <h4 className="uppercase" style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                                    {activeDetails.title}
                                </h4>

                                {/* Supporting paragraph */}
                                <p className="text-sm font-normal mt-2 mb-4" style={{ lineHeight: '1.58' }}>
                                    {activeDetails.desc}
                                </p>

                                {/* Technical capabilities list (Interactive Balls) */}
                                <div className="pt-3 border-t animate-fade-in" style={{ borderColor: 'var(--rule)' }}>
                                    <InteractiveSkillBalls
                                        skills={SkillsData[activeTab].skills}
                                        hoveredSkill={hoveredSkill}
                                        setHoveredSkill={setHoveredSkill}
                                    />
                                </div>
                            </div>

                            {/* Live telemetry dump */}
                            {hoveredSkill && (
                                <div className="mt-5 border-t pt-3 text-xs md:text-sm text-[#888888]   leading-relaxed" style={{ borderColor: 'var(--rule)' }}>
                                    <span className="text-orange-600 font-bold block mb-1">// {hoveredSkill.name.toUpperCase()}</span>
                                    <p>{hoveredSkill.desc}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
