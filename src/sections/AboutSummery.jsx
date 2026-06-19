import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutSummery = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Use the static section container as the trigger to prevent layout recalculation overhead (Forced Reflow)
        gsap.to("#title-about-1", {
            xPercent: 20,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });
        gsap.to("#title-about-2", {
            xPercent: -30,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });
        gsap.to("#title-about-3", {
            xPercent: 100,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });
        gsap.to("#title-about-4", {
            xPercent: -100,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            },
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="mt-32 overflow-hidden leading-snug text-center mb-42 contact-text-responsive relative">
            {/* Background Decorative Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.015)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0" />
            
            {/* Top Border HUD Line */}
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 mb-12 opacity-80 z-10">
                <div className="h-[1px] bg-[#cfccb8] w-full" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-orange-600 whitespace-nowrap px-4 font-bold">[ SYSTEM_ROLE_COMPILER_V1.0.8 ]</span>
                <div className="h-[1px] bg-[#cfccb8] w-full" />
            </div>

            <div className="w-full flex flex-col h-auto whitespace-nowrap relative z-10">
                <div className="font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    <div className="w-full h-auto text-[clamp(1.5rem,4.5vw,3rem)] md:text-5xl flex flex-col gap-8 opacity-95">

                        {/* Row 1 */}
                        <div id="title-about-1" className="flex items-center justify-center gap-6 md:gap-10 py-5">
                            <span className="text-neutral-400 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_01]</span>
                            <span className="text-orange-600/50">{'<'}</span>
                            <p className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent font-extrabold">Game Developer</p>
                            <span className="text-orange-600/50">{'/>'}</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
                            <p className="outlined-text-dark font-normal">Interactive Logic</p>
                        </div>

                        {/* Row 2 */}
                        <div id="title-about-2" className="flex items-center justify-center gap-6 md:gap-10 py-5 translate-x-16">
                            <p className="outlined-text-dark font-normal">System Architecture</p>
                            <span className="text-orange-600/50 text-xl">{'//'}</span>
                            <p className="font-extrabold text-[#111111]">Game Designer</p>
                            <span className="text-orange-600/50 text-xl">{'//'}</span>
                            <p className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent font-extrabold">Game Programmer</p>
                            <span className="text-neutral-400 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_02]</span>
                        </div>

                        {/* Row 3 */}
                        <div id="title-about-3" className="flex items-center justify-center gap-6 md:gap-10 py-5 -translate-x-48">
                            <span className="text-neutral-400 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_03]</span>
                            <p className="outlined-text-dark font-normal">UI/UX Designer</p>
                            <span className="text-orange-600/50">{'>>'}</span>
                            <p className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent font-extrabold">3D Artist</p>
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
                            <p className="outlined-text-dark font-normal">Animator</p>
                            <span className="text-orange-600/50">{'<<'}</span>
                        </div>

                        {/* Row 4 */}
                        <div id="title-about-4" className="flex items-center justify-center gap-6 md:gap-10 py-5 translate-x-16">
                            <p className="bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent font-extrabold">Electronics Engineer</p>
                            <span className="text-orange-600/50 text-xl">{'::'}</span>
                            <p className="outlined-text-dark font-normal">VLSI Design</p>
                            <span className="text-neutral-400 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_04]</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Border HUD Line */}
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 mt-12 opacity-80 z-10">
                <div className="h-[1px] bg-[#cfccb8] w-full" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-orange-600 whitespace-nowrap px-4 font-bold">[ STATUS: CORE_COMPILING_COMPLETE ]</span>
                <div className="h-[1px] bg-[#cfccb8] w-full" />
            </div>
        </section>
    )
}

export default AboutSummery