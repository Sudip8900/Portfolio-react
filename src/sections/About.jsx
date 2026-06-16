import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillsData } from '../constants';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

import InteractiveCard from '../componnts/InteractiveCard.jsx';

const About = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredSkill, setHoveredSkill] = useState(SkillsData[0].skills[0]);

    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const terminalRef = useRef(null);
    const profileContainerRef = useRef(null);
    const textRef = useRef(null);
    const dataModulesRef = useRef(null);

    useGSAP(() => {
        // Section reveal (just the header)
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

        // CRT TV Terminal Opening Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%", // Start when section is comfortably in view
            }
        });

        // Setup initial states for CRT effect
        gsap.set(terminalRef.current, { scaleY: 0.005, scaleX: 0, opacity: 1, transformOrigin: "center center" });
        gsap.set(profileContainerRef.current, { opacity: 0, xPercent: -50 });
        gsap.set(textRef.current, { opacity: 0, xPercent: 50 });
        gsap.set(".data-module", { opacity: 0, yPercent: 50 });

        // Step 1: The fast horizontal bright line
        tl.to(terminalRef.current, {
            scaleX: 1,
            duration: 0.25,
            ease: "power4.out"
        })
            // Step 2: The vertical snap open
            .to(terminalRef.current, {
                scaleY: 1,
                duration: 0.4,
                ease: "back.out(1.5)"
            })
            // Step 3: Reveal internal modules
            .to(profileContainerRef.current, { opacity: 1, xPercent: 0, duration: 0.6, ease: "power3.out" }, "-=0.1")
            .to(textRef.current, { opacity: 1, xPercent: 0, duration: 0.6, ease: "power3.out" }, "<0.1")
            .to(".data-module", { opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "<0.2");

    });

    useGSAP(() => {
        // Animate new active category's cards
        gsap.fromTo(".skill-card",
            { opacity: 0, x: -15, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" }
        );
    }, [activeTab]);

    return (
        <section id="about" ref={sectionRef} className='min-h-screen py-12 md:py-20 px-4 md:px-10 overflow-hidden'>

            {/* Sci-Fi Section Header */}
            <div ref={headingRef} className='flex items-center gap-4 mb-16 select-none' style={{ perspective: "1000px" }}>
                <div className='header-block w-12 h-2 bg-orange-600/60' />
                <h1 className='text-2xl md:text-5xl font-bold uppercase tracking-widest overflow-hidden flex flex-wrap gap-y-1 py-1'>
                    {(() => {
                        const headerText = "[ SYS.PROFILE ]";
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

            {/* Terminal Window */}
            <div ref={terminalRef} className='w-full relative perspective-[2000px]'>
                <InteractiveCard className='w-full border border-[#cfccb8] bg-white p-4 sm:p-6 md:p-12 relative overflow-hidden group shadow-[6px_6px_0px_#111111]'>

                    {/* Window Header */}
                    <div className="flex justify-between items-center border-b border-[#cfccb8] pb-4 mb-10 z-10 relative" style={{ transform: "translateZ(20px)" }}>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-orange-600 animate-pulse" />
                            <h2 className="text-orange-600 tracking-[0.5em] text-sm md:text-base uppercase font-bold">// DOSSIER.ACCESS</h2>
                        </div>
                        <div className="text-neutral-400 text-xs hidden md:block">ENCRYPTED_CONNECTION_ESTABLISHED</div>
                    </div>

                    {/* Top Section: ID Badge + Bio */}
                    <div className='flex flex-col lg:flex-row gap-8 md:gap-16 z-10 relative mb-12 md:mb-16'>

                        {/* ID Badge (Left) */}
                        <div ref={profileContainerRef} className="w-full lg:w-1/3 flex-shrink-0 flex flex-col items-center justify-start gap-6" style={{ transform: "translateZ(40px)" }}>

                            <div className="relative w-48 h-48 md:w-64 md:h-64">
                                {/* Hexagon Border/Glow */}
                                <div className="absolute -inset-2 border border-[#cfccb8] z-0" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />

                                {/* Hexagon Profile Image */}
                                <div className="w-full h-full relative z-10 overflow-hidden bg-neutral-100 border-2 border-[#111111]" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                                    <img src="/Images/ProfilePic.png" alt="SUDIP PAN" className="w-full h-full object-cover opacity-95 scale-110 hover:scale-100 transition-transform duration-700" />
                                </div>
                            </div>

                            {/* Badge Info */}
                            <div className="w-full max-w-xs border border-[#cfccb8] bg-[#f4f2ee] p-4 text-center flex flex-col gap-2">
                                <div className="text-orange-600 text-xs tracking-[0.2em] font-bold">[ CLASS: DEVELOPER ]</div>
                                <div className="text-[#111111] text-sm tracking-widest border-b border-[#cfccb8] pb-2 font-bold">ID: SP-049</div>
                                <div className="text-green-600 animate-pulse text-xs tracking-widest mt-1 font-bold">STATUS: ONLINE</div>
                            </div>

                        </div>

                        {/* Bio Section (Right) */}
                        <div ref={textRef} className="w-full lg:w-2/3 flex flex-col justify-center" style={{ transform: "translateZ(30px)" }}>
                            <h2 className='text-orange-600 text-sm md:text-xl mb-2 uppercase tracking-[0.3em] font-bold'>// Identity Confirmed</h2>
                            <h1 className='text-[#111111] text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase leading-tight mb-4 md:mb-6 tracking-tighter'>
                                SUDIP <span className='text-orange-600'>PAN</span>
                            </h1>
                            <div className='w-full h-[1px] bg-gradient-to-r from-[#cfccb8] to-transparent mb-8' />
                            <p className='text-neutral-800 text-base md:text-xl leading-relaxed text-justify mb-4'>
                                I’m a passionate game developer and designer with a background in 3D art and electronics engineering. I create immersive, visually engaging games that blend strong design, technical skill, and interactive innovation.
                            </p>
                            <div className='flex items-start gap-2 mt-4'>
                                <span className='text-orange-600 font-bold uppercase tracking-widest text-sm md:text-base mt-1'>Address:</span>
                                <p className='text-neutral-600 text-sm md:text-base leading-relaxed'>
                                    Rameswarpur, Ramjibanpur, West Medinipur, West Bengal, India, 721242
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Data Strips */}
                    <div ref={dataModulesRef} className="w-full flex flex-col gap-6 z-10 relative" style={{ transform: "translateZ(20px)" }}>

                        {/* Strip 1: Education */}
                        <div className="data-module w-full border border-[#cfccb8] bg-[#f4f2ee]/80 p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6 items-start lg:items-center transition-colors hover:border-[#111111] hover:bg-[#eae8e4]/60">
                            <div className="w-full lg:w-40 flex-shrink-0 lg:border-r border-b lg:border-b-0 pb-4 lg:pb-0 border-[#cfccb8] pr-4">
                                <h3 className="text-orange-600 text-xs tracking-widest font-bold">// EDU_DATA</h3>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 text-xs text-neutral-800 w-full justify-between">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-[#111111] font-bold"><span className="text-orange-600">[2019]</span> <span>CLASS-X</span></div>
                                    <div className="h-[2px] bg-[#cfccb8]/40 w-full my-1"><div className="h-full bg-orange-600 w-full" /></div>
                                    <span className="text-neutral-500">RAMJIBANPUR BABULAL INST</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-[#111111] font-bold"><span className="text-orange-600">[2021]</span> <span>CLASS-XII</span></div>
                                    <div className="h-[2px] bg-[#cfccb8]/40 w-full my-1"><div className="h-full bg-orange-600 w-full" /></div>
                                    <span className="text-neutral-500">RAMJIBANPUR BABULAL INST</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-[#111111] font-bold"><span className="text-orange-600">[2022-26]</span> <span>B.TECH (ECE)</span></div>
                                    <div className="h-[2px] bg-[#cfccb8]/40 w-full my-1"><div className="h-full bg-orange-600 w-[75%]" /></div>
                                    <span className="text-neutral-500">R.K.M GOVT. ENGG. COLLEGE</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Skills Tab Console */}
                        <div className="w-full flex flex-col gap-6">
                            
                            {/* Skills Tab Header */}
                            <div className="flex flex-wrap gap-3 border-b border-[#cfccb8] pb-4">
                                {SkillsData.map((category, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setActiveTab(idx);
                                            setHoveredSkill(category.skills[0]);
                                        }}
                                        className={`px-5 py-2.5 text-[10px] sm:text-xs tracking-[0.2em] uppercase border transition-all duration-300 rounded-sm cursor-pointer ${
                                            activeTab === idx
                                                ? "bg-orange-600 text-white border-orange-600 font-bold"
                                                : "border-[#cfccb8] text-neutral-600 hover:border-[#111111] hover:bg-neutral-100 hover:text-[#111111]"
                                        }`}
                                    >
                                        [ {category.category} ]
                                    </button>
                                ))}
                            </div>
                            {/* Split Pane Details */}
                            <div className="flex flex-col xl:flex-row gap-6 w-full">
                                
                                {/* Left Side: Interactive Skills list */}
                                <div className="w-full xl:w-1/2 flex flex-col gap-3">
                                    {SkillsData[activeTab].skills.map((skill, idx) => (
                                        <div
                                            key={idx}
                                            onMouseEnter={() => setHoveredSkill(skill)}
                                            className={`skill-card border p-4 flex items-center justify-between cursor-pointer transition-all duration-300 rounded-sm hover:bg-orange-600/5 ${
                                                hoveredSkill.name === skill.name
                                                    ? "border-orange-600 bg-orange-600/5"
                                                    : "border-[#cfccb8]"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 border border-[#cfccb8] bg-white flex items-center justify-center text-xl text-orange-600">
                                                    <Icon icon={skill.icon} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[#111111] text-sm tracking-wider uppercase font-bold">{skill.name}</h4>
                                                    <span className="text-[10px] text-orange-600/80 font-semibold">SYS.CAPABILITY // {skill.level}%</span>
                                                </div>
                                            </div>
                                            
                                            {/* Mini Custom Progress Bar */}
                                            <div className="flex items-center gap-4">
                                                <div className="hidden sm:flex w-24 md:w-32 h-1.5 bg-[#cfccb8]/20 border border-[#cfccb8] rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-orange-600"
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                                <span className="text-orange-600 text-xs w-8 text-right font-bold">{skill.level}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
 
                                {/* Right Side: Telemetry Terminal Output */}
                                <div className="w-full xl:w-1/2 border border-[#cfccb8] bg-[#f4f2ee] p-6 flex flex-col relative overflow-hidden min-h-[280px]">
 
                                    <div className="flex justify-between items-center border-b border-[#cfccb8] pb-3 mb-6 relative z-10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                                            <span className="text-orange-600 text-[10px] tracking-wider uppercase font-bold">// DIAGNOSTIC.TELEMETRY</span>
                                        </div>
                                        <span className="text-neutral-400 text-[9px] uppercase hidden sm:inline">SECURE_DUMP_0x00FF</span>
                                    </div>
 
                                    {/* Telemetry data info */}
                                    <div className="flex-1 flex flex-col justify-between relative z-10 text-xs text-neutral-800">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-4 border-b border-[#cfccb8]/60 pb-2.5">
                                                <span className="text-neutral-500 w-28 flex-shrink-0 font-semibold">CAPABILITY:</span>
                                                <span className="text-[#111111] font-bold tracking-wider uppercase">{hoveredSkill.name}</span>
                                            </div>
                                            
                                            <div className="flex gap-4 border-b border-[#cfccb8]/60 pb-2.5">
                                                <span className="text-neutral-500 w-28 flex-shrink-0 font-semibold">PROFICIENCY:</span>
                                                <span className="text-orange-600 font-bold">{hoveredSkill.level}%</span>
                                            </div>
 
                                            <div className="flex gap-4 border-b border-[#cfccb8]/60 pb-2.5">
                                                <span className="text-neutral-500 w-28 flex-shrink-0 font-semibold">STATUS:</span>
                                                <span className="text-green-600 font-bold animate-pulse">ACTIVE // OPERATIONAL</span>
                                            </div>
 
                                            <div className="flex flex-col gap-2">
                                                <span className="text-neutral-500 font-semibold">FUNCTIONAL_DESCRIPTION:</span>
                                                <p className="text-[#111111] leading-relaxed text-left bg-white border border-[#cfccb8] p-4 text-xs sm:text-[13px] tracking-wide">
                                                    {hoveredSkill.desc}
                                                </p>
                                            </div>
                                        </div>
 
                                        <div className="border-t border-[#cfccb8]/60 pt-4 mt-6 flex justify-between items-center text-[9px] text-neutral-400">
                                            <span>SYSTEM_STATUS: STABLE</span>
                                            <span>CORE.VER_1.4.9</span>
                                        </div>
                                    </div>
                                </div>
 
                            </div>
                        </div>
 
                    </div>
                </InteractiveCard>
            </div>
        </section>
    )
}
 
export default About
