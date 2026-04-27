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
        <section className="mt-20 overflow-hidden leading-snug text-center mb-42 contact-text-responsive">
            <div className="w-full flex flex-col h-auto whitespace-nowrap">
                <div className="font-light uppercase tracking-[0.2em] md:tracking-[0.4em]">
                    <div className="w-full h-auto text-[1.2rem] p-5 md:text-5xl flex flex-col gap-10 opacity-90">

                        <div id="title-about-1" className="flex items-center justify-center gap-4 md:gap-8">
                            <span className="text-orange-500 opacity-50">{'<'}</span>
                            <p className="outlined-text">Game Developer</p>
                            <span className="text-orange-500 opacity-50 animate-pulse">{'_'}</span>
                        </div>

                        <div id="title-about-2" className="flex items-center justify-center gap-4 md:gap-8 translate-x-16">
                            <p className="font-bold text-orange-500 drop-shadow-[0_0_15px_rgba(255,105,0,0.8)]">Game Designer</p>
                            <div className="text-orange-500 opacity-40 text-xl md:text-4xl">{'//'}</div>
                            <p className="outlined-text">Game Programmer</p>
                        </div>

                        <div id="title-about-3" className="flex items-center justify-center gap-4 md:gap-8 -translate-x-48">
                            <p className="outlined-text">UI/UX Designer</p>
                            <div className="text-orange-500 opacity-40 text-xl md:text-4xl">{'>>'}</div>
                            <p className="font-bold text-orange-500 drop-shadow-[0_0_15px_rgba(255,105,0,0.8)]">3D Artist</p>
                            <div className="text-orange-500 opacity-40 text-xl md:text-4xl">{'<<'}</div>
                            <p className="outlined-text">Animator</p>
                        </div>

                        <div id="title-about-4" className="flex items-center justify-center gap-4 md:gap-8 translate-x-16">
                            <p className="font-bold text-orange-500 drop-shadow-[0_0_15px_rgba(255,105,0,0.8)]">Electronics Engineer</p>
                            <div className="text-orange-500 opacity-40 text-xl md:text-4xl">{'::'}</div>
                            <p className="outlined-text">VLSI Design</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSummery