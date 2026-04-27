import React from 'react'
import Marque from '../componnts/Marque';
import Magnetic from '../componnts/Magnetic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {

    const contactSumRef = React.useRef(null);
    const bgRef = React.useRef(null);
    const items = ["INITIALIZING HANDSHAKE", "ESTABLISHING UPLINK", "SYNCING DATA", "OPENING CHANNELS", "AWAITING INPUT", "SYSTEM READY", "CONNECTION SECURE", "PINGING SERVER", "TRANSMITTING", "RECEIVING"];
    const items2 = ["CREATE", "INNOVATE", "BUILD", "DESIGN", "DEVELOP", "CODE", "ENGINEER", "EXECUTE", "DEPLOY", "LAUNCH"];
    const SumRef = React.useRef(null);

    useGSAP(() => {
        gsap.to(contactSumRef.current, {
            scrollTrigger: {
                trigger: contactSumRef.current,
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: SumRef.current,
                start: "top 80%",
            }
        });

        tl.from(".telemetry-left", {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1
        }, 0)
            .from(".telemetry-right", {
                x: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1
            }, 0)
            .from(".tech-bracket", {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                ease: "back.out(2)",
                stagger: 0.1
            }, "-=0.2")
            .from(".incoming-label", {
                y: -20,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2")
            .from(".main-text-word", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.1
            }, "-=0.2");

        const handleMouseMove = (e) => {
            if (!bgRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 40;
            const y = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to(bgRef.current, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, { scope: contactSumRef });

    return (
        <section ref={contactSumRef} className='flex flex-col items-center justify-between min-h-screen gap-12 mt-16 bg-black overflow-hidden relative'>
            <Marque items={items} className='border-y border-orange-500/20 bg-[#050505] relative z-20' iconClassname='text-orange-500/50' iconName='carbon:data-1' />

            <div className='w-full px-5 relative flex justify-center items-center h-full flex-1'>

                {/* Parallax Background Grid */}
                <div ref={bgRef} className="absolute inset-[-50px] bg-[linear-gradient(rgba(255,105,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 z-10"></div>

                {/* Left Telemetry Data */}
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-orange-500/40 hidden md:flex flex-col gap-4 font-mono tracking-widest z-10'>
                    <div className="flex flex-col gap-1 telemetry-left">
                        <span className="text-orange-500/80">SYS.ON</span>
                        <span>0x8F2A</span>
                    </div>
                    <div className="flex flex-col gap-1 telemetry-left">
                        <span className="text-orange-500/80">NET.OK</span>
                        <span>PING 12ms</span>
                    </div>
                    <div className="flex flex-col gap-1 telemetry-left">
                        <span className="text-orange-500/80">FRQ.89</span>
                        <span>1024 GB/s</span>
                    </div>
                </div>

                {/* Right Telemetry Data */}
                <div className='absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-orange-500/40 hidden md:flex flex-col gap-4 font-mono tracking-widest text-right z-10'>
                    <div className="flex flex-col gap-1 telemetry-right">
                        <span>{`{DATA.SYNC}`}</span>
                        <span className="text-orange-500/80">ACTIVE</span>
                    </div>
                    <div className="flex flex-col gap-1 telemetry-right">
                        <span>{`{UPLINK}`}</span>
                        <span className="text-orange-500/80">SECURE</span>
                    </div>
                    <div className="flex flex-col gap-1 telemetry-right">
                        <span>{`{STATUS}`}</span>
                        <span className="text-orange-500/80 text-green-500/70 animate-pulse">STABLE</span>
                    </div>
                </div>

                <div ref={SumRef} className='text-center overflow-hidden font-light contact-text-responsive py-14 px-10 relative z-20 perspective-[1000px]'>

                    {/* Decorative Sci-Fi Brackets */}
                    <div className='absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 opacity-70 tech-bracket'></div>
                    <div className='absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 opacity-70 tech-bracket'></div>
                    <div className='absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 opacity-70 tech-bracket'></div>
                    <div className='absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 opacity-70 tech-bracket'></div>

                    <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 text-orange-500 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3 whitespace-nowrap bg-black/50 px-4 py-1 border border-orange-500/20 backdrop-blur-sm incoming-label'>
                        <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]'></span>
                        [ INCOMING TRANSMISSION ]
                        <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]'></span>
                    </div>

                    <p className='uppercase tracking-widest leading-relaxed drop-shadow-[0_0_15px_rgba(255,105,0,0.5)]'>
                        <span className='text-white/40 font-mono text-sm mr-2 main-text-word inline-block'>{'>'}</span>
                        <span className='main-text-word inline-block'>LET'S</span> <br />
                        <span className="main-text-word inline-block">
                            <Magnetic>
                                <span className='font-bold text-orange-500 inline-block hover:scale-110 hover:text-white hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer'>CONNECT</span>
                            </Magnetic>
                        </span> <br />
                        <span className="text-white/40 text-sm mx-2 main-text-word inline-block">&amp;</span>
                        <span className="main-text-word inline-block">
                            <Magnetic>
                                <span className='italic text-white inline-block hover:text-orange-500 hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,105,0,0.8)] transition-all duration-300 cursor-pointer'>CREATE</span>
                            </Magnetic>
                        </span> <span className='main-text-word inline-block ml-1'>SOMETHING</span><br />
                        <span className="main-text-word inline-block">
                            <Magnetic>
                                <span className='border-b border-orange-500 text-white inline-block hover:text-orange-500 hover:border-white hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,105,0,0.8)] transition-all duration-300 cursor-pointer'>AMAZING</span>
                            </Magnetic>
                        </span>{' '}
                        <span className="main-text-word inline-block">
                            <Magnetic>
                                <span className='text-orange-500 inline-block hover:text-white hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer'>TOGETHER</span>
                            </Magnetic>
                        </span>
                        <span className='main-text-word animate-pulse text-orange-500 font-mono ml-1 inline-block'>_</span>
                    </p>
                </div>
            </div>

            <Marque items={items2} reverse={true} className='text-white transition-colors duration-500 bg-[#050505] border-y border-orange-500/20 relative z-20' iconClassname='text-orange-500/50' iconName='carbon:code' />
        </section>
    )
}

export default ContactSummary