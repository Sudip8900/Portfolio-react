import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import InteractiveCard from '../componnts/InteractiveCard.jsx';

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const terminalRef = useRef(null);
    const profileContainerRef = useRef(null);
    const textRef = useRef(null);
    const dataModulesRef = useRef(null);

    useGSAP(() => {
        // Section reveal (just the header)
        gsap.from(headingRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            ease: "circ.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
            }
        });

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

    return (
        <section id="about" ref={sectionRef} className='min-h-screen bg-[#050505] py-20 px-5 md:px-10 overflow-hidden'>
            
            {/* Sci-Fi Section Header */}
            <div className='flex items-center gap-4 mb-16'>
                <div className='w-12 h-2 bg-orange-500/50' />
                <h1 ref={headingRef} className='text-orange-500 text-2xl md:text-5xl font-bold uppercase tracking-widest'>
                    [ SYS.PROFILE ]
                </h1>
                <div className='flex-1 h-[1px] bg-orange-500/20' />
            </div>

            {/* Terminal Window */}
            <div ref={terminalRef} className='w-full relative perspective-[2000px]'>
                <InteractiveCard className='w-full border border-orange-500/30 bg-[#0a0a0a]/80 backdrop-blur-md p-6 md:p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(255,105,0,0.1)]'>
                    
                    {/* Decorative Scanline */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500/50 animate-[dropLine_3s_linear_infinite] z-0 pointer-events-none" />

                    {/* Window Header */}
                    <div className="flex justify-between items-center border-b-2 border-orange-500/30 pb-4 mb-10 z-10 relative" style={{ transform: "translateZ(20px)" }}>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-orange-500 animate-pulse" />
                            <h2 className="text-orange-500 tracking-[0.5em] text-sm md:text-base uppercase">// DOSSIER.ACCESS</h2>
                        </div>
                        <div className="text-white/30 text-xs hidden md:block">ENCRYPTED_CONNECTION_ESTABLISHED</div>
                    </div>

                    {/* Top Section: ID Badge + Bio */}
                    <div className='flex flex-col lg:flex-row gap-10 md:gap-16 z-10 relative mb-16'>
                        
                        {/* ID Badge (Left) */}
                        <div ref={profileContainerRef} className="w-full lg:w-1/3 flex-shrink-0 flex flex-col items-center justify-start gap-6" style={{ transform: "translateZ(40px)" }}>
                            
                            <div className="relative w-48 h-48 md:w-64 md:h-64">
                                {/* Hexagon Border/Glow */}
                                <div className="absolute -inset-2 border border-orange-500/50 z-0 animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                                
                                {/* Hexagon Profile Image */}
                                <div className="w-full h-full relative z-10 overflow-hidden bg-orange-500/10 border-2 border-orange-500 shadow-[0_0_30px_rgba(255,105,0,0.4)]" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                                    <img src="/Images/ProfilePic.png" alt="SUDIP PAN" className="w-full h-full object-cover opacity-90 scale-110 hover:scale-100 transition-transform duration-700" />
                                </div>
                            </div>
                            
                            {/* Badge Info */}
                            <div className="w-full max-w-xs border border-orange-500/30 bg-orange-500/5 p-4 text-center flex flex-col gap-2">
                                <div className="text-orange-500 text-xs tracking-[0.2em]">[ CLASS: DEVELOPER ]</div>
                                <div className="text-white text-sm tracking-widest border-b border-orange-500/30 pb-2">ID: SP-049</div>
                                <div className="text-green-500 animate-pulse text-xs tracking-widest mt-1">STATUS: ONLINE</div>
                            </div>

                        </div>

                        {/* Bio Section (Right) */}
                        <div ref={textRef} className="w-full lg:w-2/3 flex flex-col justify-center" style={{ transform: "translateZ(30px)" }}>
                            <h2 className='text-orange-500/70 text-sm md:text-xl mb-2 uppercase tracking-[0.3em]'>// Identity Confirmed</h2>
                            <h1 className='text-white text-4xl md:text-6xl font-bold uppercase drop-shadow-[0_0_15px_rgba(255,105,0,0.5)] leading-tight mb-6 tracking-tighter'>
                                SUDIP <span className='text-orange-500'>PAN</span>
                            </h1>
                            <div className='w-full h-[1px] bg-gradient-to-r from-orange-500 to-transparent mb-8' />
                            <p className='text-white/80 text-base md:text-xl leading-relaxed text-justify font-sans'>
                                I’m a passionate game developer and designer with a background in 3D art and electronics engineering. I create immersive, visually engaging games that blend strong design, technical skill, and interactive innovation.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Data Strips */}
                    <div ref={dataModulesRef} className="w-full flex flex-col gap-6 z-10 relative" style={{ transform: "translateZ(20px)" }}>
                        
                        {/* Strip 1: Education */}
                        <div className="data-module w-full border border-orange-500/30 bg-black/50 p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center transition-colors hover:border-orange-500/60 hover:bg-orange-500/5">
                            <div className="w-full lg:w-40 flex-shrink-0 lg:border-r-2 border-b-2 lg:border-b-0 pb-4 lg:pb-0 border-orange-500/50 pr-4">
                                <h3 className="text-orange-500 text-xs tracking-widest">// EDU_DATA</h3>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row gap-8 text-xs text-white/80 w-full justify-between">
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-white"><span className="text-orange-500">[2019]</span> <span>CLASS-X</span></div>
                                    <div className="h-[2px] bg-orange-500/30 w-full my-1"><div className="h-full bg-orange-500 w-full" /></div>
                                    <span className="opacity-50">RAMJIBANPUR BABULAL INST</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-white"><span className="text-orange-500">[2021]</span> <span>CLASS-XII</span></div>
                                    <div className="h-[2px] bg-orange-500/30 w-full my-1"><div className="h-full bg-orange-500 w-full" /></div>
                                    <span className="opacity-50">RAMJIBANPUR BABULAL INST</span>
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex justify-between text-white"><span className="text-orange-500">[2022-26]</span> <span>B.TECH (ECE)</span></div>
                                    <div className="h-[2px] bg-orange-500/30 w-full my-1"><div className="h-full bg-orange-500 w-[75%]" /></div>
                                    <span className="opacity-50">R.K.M GOVT. ENGG. COLLEGE</span>
                                </div>
                            </div>
                        </div>

                        {/* Strip 2 & 3: Tech & Tools (Side by side on desktop) */}
                        <div className="flex flex-col xl:flex-row gap-6 w-full">
                            <div className="data-module flex-1 border border-orange-500/30 bg-black/50 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-colors hover:border-orange-500/60 hover:bg-orange-500/5">
                                <div className="w-full sm:w-32 flex-shrink-0 sm:border-r-2 border-b-2 sm:border-b-0 pb-4 sm:pb-0 border-orange-500/50 pr-4">
                                    <h3 className="text-orange-500 text-xs tracking-widest">// LANGUAGES</h3>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {/* Tech Icons */}
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/c-programming.png" alt="C" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/python.png" alt="Python" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/c-plus-plus-logo.png" alt="C++" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/javascript.png" alt="JS" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/react-native.png" alt="React" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/tailwind_css.png" alt="Tailwind" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                </div>
                            </div>
                            
                            <div className="data-module flex-1 border border-orange-500/30 bg-black/50 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-colors hover:border-orange-500/60 hover:bg-orange-500/5">
                                <div className="w-full sm:w-32 flex-shrink-0 sm:border-r-2 border-b-2 sm:border-b-0 pb-4 sm:pb-0 border-orange-500/50 pr-4">
                                    <h3 className="text-orange-500 text-xs tracking-widest">// TOOLS</h3>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/ffffff/unreal-engine.png" alt="Unreal" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/blender-3d.png" alt="Blender" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/visual-studio-code-2019.png" alt="VSCode" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/fluency/48/visual-studio.png" alt="VS" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
                                    <img width="32" height="32" src="https://img.icons8.com/color/48/figma--v1.png" alt="Figma" className='opacity-80 hover:opacity-100 hover:scale-110 transition-all drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' />
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
