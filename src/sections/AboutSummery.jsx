import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AboutSummery = () => {
    useGSAP(() => {
        gsap.to("#title-about-1", {
            xPercent: 20,
            scrollTrigger: {
                trigger: "#title-about-1",
                scrub: true,
            },
        });
        gsap.to("#title-about-2", {
            xPercent: -30,
            scrollTrigger: {
                trigger: "#title-about-2",
                scrub: true,
            },
        });
        gsap.to("#title-about-3", {
            xPercent: 100,
            scrollTrigger: {
                trigger: "#title-about-3",
                scrub: true,
            },
        });
        gsap.to("#title-about-4", {
            xPercent: -100,
            scrollTrigger: {
                trigger: "#title-about-4",
                scrub: true,
            },
        });
    });
    return (
        <section className="mt-32 overflow-hidden leading-snug text-center mb-42 contact-text-responsive relative">
            {/* Background Decorative Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,105,0,0.015)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0" />
            
            {/* Top Border HUD Line */}
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 mb-12 opacity-50 z-10">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent w-full" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 whitespace-nowrap px-4">[ SYSTEM_ROLE_COMPILER_V1.0.8 ]</span>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent w-full" />
            </div>

            <div className="w-full flex flex-col h-auto whitespace-nowrap relative z-10">
                <div className="font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    <div className="w-full h-auto text-[clamp(1.5rem,4.5vw,3rem)] md:text-5xl flex flex-col gap-8 opacity-90">

                        {/* Row 1 */}
                        <div id="title-about-1" className="flex items-center justify-center gap-6 md:gap-10 py-5 bg-[#0a0a0a]/90 border-y border-orange-500/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <span className="text-orange-500/40 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_01]</span>
                            <span className="text-orange-500/30">{'<'}</span>
                            <p className="bg-gradient-to-r from-orange-500 via-orange-300 to-white bg-clip-text text-transparent font-extrabold">Game Developer</p>
                            <span className="text-orange-500/30">{'/>'}</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#ff6a00] animate-pulse" />
                            <p className="outlined-text opacity-40 font-normal">Interactive Logic</p>
                        </div>

                        {/* Row 2 */}
                        <div id="title-about-2" className="flex items-center justify-center gap-6 md:gap-10 py-5 bg-[#0d0d0d]/80 border-b border-orange-500/5 translate-x-16">
                            <p className="outlined-text opacity-40 font-normal">System Architecture</p>
                            <span className="text-orange-500/30 text-xl">{'//'}</span>
                            <p className="font-extrabold text-white drop-shadow-[0_0_12px_rgba(255,105,0,0.4)]">Game Designer</p>
                            <span className="text-orange-500/30 text-xl">{'//'}</span>
                            <p className="bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent font-extrabold">Game Programmer</p>
                            <span className="text-orange-500/40 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_02]</span>
                        </div>

                        {/* Row 3 */}
                        <div id="title-about-3" className="flex items-center justify-center gap-6 md:gap-10 py-5 bg-[#0a0a0a]/90 border-y border-orange-500/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] -translate-x-48">
                            <span className="text-orange-500/40 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_03]</span>
                            <p className="outlined-text opacity-40 font-normal">UI/UX Designer</p>
                            <span className="text-orange-500/30">{'>>'}</span>
                            <p className="bg-gradient-to-r from-orange-500 via-orange-300 to-white bg-clip-text text-transparent font-extrabold">3D Artist</p>
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#ff6a00] animate-pulse" />
                            <p className="outlined-text opacity-40 font-normal">Animator</p>
                            <span className="text-orange-500/30">{'<<'}</span>
                        </div>

                        {/* Row 4 */}
                        <div id="title-about-4" className="flex items-center justify-center gap-6 md:gap-10 py-5 bg-[#0d0d0d]/80 border-b border-orange-500/5 translate-x-16">
                            <p className="bg-gradient-to-r from-orange-500 to-amber-300 bg-clip-text text-transparent font-extrabold">Electronics Engineer</p>
                            <span className="text-orange-500/30 text-xl">{'::'}</span>
                            <p className="outlined-text opacity-40 font-normal">VLSI Design</p>
                            <span className="text-orange-500/40 text-xs md:text-sm font-mono tracking-widest">[SYS.LOG_04]</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Border HUD Line */}
            <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 mt-12 opacity-50 z-10">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent w-full" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 whitespace-nowrap px-4">[ STATUS: CORE_COMPILING_COMPLETE ]</span>
                <div className="h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent w-full" />
            </div>
        </section>
    )
}

export default AboutSummery