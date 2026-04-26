import React from 'react'
import Marque from '../componnts/Marque';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {

    const contactSumRef = React.useRef(null);
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

        gsap.from(SumRef.current, {
            y: 100,
            duration: 1,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: SumRef.current,
                start: "bottom 90%",
            },
        })
    }, []);

    return (
        <section ref={contactSumRef} className='flex flex-col items-center justify-between min-h-screen gap-12 mt-16 bg-black overflow-hidden'>
            <Marque items={items} className='border-y border-orange-500/20 bg-[#0a0a0a]' iconClassname='text-orange-500/50' iconName='carbon:data-1' />
            <div className='w-full px-5 relative flex justify-center items-center h-full flex-1'>
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,105,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
                
                <div ref={SumRef} className='text-center overflow-hidden font-light contact-text-responsive py-10 relative z-10'>
                    <div className='absolute -top-10 left-1/2 transform -translate-x-1/2 text-orange-500 text-sm tracking-widest uppercase mb-4 animate-pulse'>[ INCOMING TRANSMISSION ]</div>
                    <p className='uppercase tracking-widest leading-relaxed drop-shadow-[0_0_10px_rgba(255,105,0,0.2)]'>
                        <span className='text-white/50'>{'>'}</span> LET'S <br /> <span className='font-bold text-orange-500'>CONNECT</span> <br /> & <span className='italic text-white'>CREATE</span> SOMETHING<br /> <span className='border-b border-orange-500 text-white'>AMAZING</span> <span className='text-orange-500'> TOGETHER</span>_
                    </p>
                </div>
            </div>
            <Marque items={items2} reverse={true} className='text-white transition-colors duration-500 bg-[#0a0a0a] border-y border-orange-500/20' iconClassname='text-orange-500/50' iconName='carbon:code' />
        </section>
    )
}

export default ContactSummary