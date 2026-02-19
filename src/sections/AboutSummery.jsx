import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const AboutSummery = () => {
    useGSAP(()=> {
        gsap.from("#title-about-1", {
            xPercent: 20,
            scrollTrigger: {
                target: "#title-about-1",
                scrub: true,
            },
        });
        gsap.from("#title-about-2", {
            xPercent: -30,
            scrollTrigger: {
                target: "#title-about-2",
                scrub: true,
            },
        });
        gsap.from("#title-about-3", {
            xPercent: 100,
            scrollTrigger: {
                target: "#title-about-3",
                scrub: true,
            },
        });
        gsap.from("#title-about-4", {
            xPercent:-100,
            scrollTrigger: {
                target: "#title-about-4",
                scrub: true,
            },
        });
    });
  return (
    <section className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive">
        <div className="w-full flex flex-col h-auto whitespace-nowrap">
            <div className="font-light">
                <div className="w-full h-auto text-[1.5rem] p-5 md:text-4xl">
                    <div id="title-about-1">
                        <p>Game Developer</p>
                    </div>
                    <div id="title-about-2" className=" mt-5 flex items-center justify-center gap-3 translate-x-16 ">
                        <p className="font-bold">Game Designer</p>
                        <div className="w-10 h-1 md:w-32 bg-orange-500 shrink-0 md:mt-5"/>
                        <p>Game Programmer</p>
                    </div>
                    <div id="title-about-3" className=" mt-5 flex item-center justify-center gap-3 -translate-x-48">
                        <p>UI/UX Designer</p>
                        <div className=" mt-3 w-10 h-1 md:w-32 bg-orange-500 shrink-0 md:mt-5"/>
                        <p className="font-bold">3D Artist</p>
                        <div className=" mt-3 w-10 h-1 md:w-32 bg-orange-500 shrink-0 md:mt-5"/>
                        <p>Animator</p>
                    </div>
                    <div id="title-about-4" className="mt-5 flex item-center justify-center gap-3 translate-x-16">
                        <p className="font-bold">Electronics Engineer</p>
                        <div className="mt-3 w-10 h-1 md:w-32 bg-orange-500 md:mt-5 shrink-0"/>
                        <p>VLSI Design</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutSummery