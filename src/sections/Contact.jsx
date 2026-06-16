import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../constants';
import Marque from '../componnts/Marque';
import Magnetic from '../componnts/Magnetic.jsx';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const headingRef = useRef(null);
    const lineRef = useRef(null);

    const [result, setResult] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);

    const items = [
        "SYSTEM OVERRIDE",
        "ACCESS GRANTED",
        "DATA TRANSMISSION COMPLETE",
        "ENCRYPTED COMM LINK OPEN",
        "AWAITING DIRECTIVES",
        "PROTOCOL ENGAGED",
        "CONNECTION STABLE",
        "SECURE UPLINK ESTABLISHED"
    ];

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("TRANSMITTING...");
        setIsTransmitting(true);

        const formData = new FormData(event.target);
        formData.append("access_key", "2fcf6229-254a-4530-a10a-814ba24bd93e");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("TRANSMISSION SUCCESSFUL");
                event.target.reset();
                setTimeout(() => {
                    setResult("");
                    setIsTransmitting(false);
                }, 3000);
            } else {
                setResult("TRANSMISSION FAILED");
                setIsTransmitting(false);
            }
        } catch (error) {
            setResult("NETWORK ERROR");
            setIsTransmitting(false);
        }
    };

    useGSAP(() => {
        // Robust isolated scroll triggers for all contact elements
        const elements = gsap.utils.toArray('.gsap-contact-element');
        
        elements.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%", 
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Section header reveal animation
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
                transformOrigin: "right center",
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
                transformOrigin: "right center",
                ease: "power3.out",
            }, "-=0.4");
        }

    }, []);

    return (
        <section id="contact" className="min-h-screen bg-[#eae8e4] text-[#111111] relative overflow-hidden flex flex-col justify-between z-10">

            <div className="pt-20 px-5 md:px-10 relative z-10 w-full flex-1">
                
                {/* Header */}
                <div ref={headingRef} className='flex items-center gap-4 mb-20 select-none' style={{ perspective: "1000px" }}>
                    <div ref={lineRef} className='flex-1 h-[1px] bg-[#cfccb8]' />
                    <h1 className='text-2xl md:text-5xl font-bold uppercase tracking-widest overflow-hidden flex flex-wrap gap-y-1 py-1'>
                        {(() => {
                            const headerText = "[ SYS.COMM_LINK ]";
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
                    <div className='header-block w-12 h-2 bg-orange-600' />
                </div>

                <div className='flex flex-col md:flex-row gap-12 lg:gap-20 perspective-[2000px]'>

                    {/* Left Side: Terminal Form */}
                    <div className='w-full md:w-1/2 flex flex-col gsap-contact-element'>
                        <InteractiveCard>
                            <div className="bg-white border-2 border-[#111111] p-4 sm:p-6 md:p-10 relative group shadow-[6px_6px_0px_#111111]">
                                
                                {/* Terminal Header */}
                                <div className='absolute top-0 left-0 w-full h-8 bg-[#f4f2ee] border-b-2 border-[#111111] flex items-center px-4'>
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                                    </div>
                                    <p className="ml-4 text-neutral-500 text-[9px] tracking-widest uppercase font-mono font-bold">bash // root@sudip.dev</p>
                                </div>

                                <div className="mt-8 md:mt-10">
                                    <h2 className='text-orange-600 text-sm tracking-widest uppercase mb-8 font-mono font-bold'>
                                        <span className="animate-pulse mr-2">{'>'}</span> 
                                        ./initialize_contact.sh
                                    </h2>

                                    <form onSubmit={onSubmit} className='flex flex-col gap-6'>

                                        <div className='flex flex-col'>
                                            <label className='text-neutral-500 text-[9px] tracking-widest font-mono font-bold uppercase mb-1'>[ ID.NAME ]</label>
                                            <div className="relative group/input">
                                                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#cfccb8] group-hover/input:bg-[#111111] transition-colors" />
                                                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#111111] transition-all duration-500 focus-within:w-full z-10" />
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-600 font-bold">{'>'}</span>
                                                <input
                                                    type="text"
                                                    className='w-full bg-transparent h-10 pl-6 text-[#111111] placeholder:text-neutral-400 focus:outline-none transition-all'
                                                    placeholder='Enter target designation...'
                                                    name='name'
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-neutral-500 text-[9px] tracking-widest font-mono font-bold uppercase mb-1'>[ ID.EMAIL ]</label>
                                            <div className="relative group/input">
                                                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#cfccb8] group-hover/input:bg-[#111111] transition-colors" />
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-600 font-bold">{'>'}</span>
                                                <input
                                                    type="email"
                                                    className='w-full bg-transparent h-10 pl-6 text-[#111111] placeholder:text-neutral-400 focus:outline-none transition-all'
                                                    placeholder='Enter return address...'
                                                    name='email'
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-neutral-500 text-[9px] tracking-widest font-mono font-bold uppercase mb-1'>[ DATA.PAYLOAD ]</label>
                                            <div className="relative group/input mt-2 border border-[#cfccb8] group-hover/input:border-[#111111] bg-[#f4f2ee]/40 p-4">
                                                <span className="absolute left-4 top-4 text-orange-600 font-bold">{'>'}</span>
                                                <textarea
                                                    name="message"
                                                    placeholder='Construct message payload here...'
                                                    className='w-full bg-transparent h-24 pl-6 text-[#111111] placeholder:text-neutral-400 focus:outline-none transition-all resize-none'
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className='mt-6'>
                                            <Magnetic>
                                                <button
                                                    type="submit"
                                                    disabled={isTransmitting}
                                                    className={`w-full relative flex items-center justify-center p-4 border-2 transition-all duration-300 group/btn overflow-hidden cursor-pointer ${isTransmitting ? 'border-green-600 text-green-600 bg-green-50' : 'border-[#111111] text-[#111111] bg-white hover:text-white shadow-[4px_4px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[3px] hover:translate-y-[3px]'}`}
                                                >
                                                    {!isTransmitting && <div className="absolute inset-0 bg-[#111111] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />}
                                                    <span className="tracking-widest uppercase text-xs relative z-10 font-bold font-mono">
                                                        {result || "EXECUTE TRANSMISSION"}
                                                    </span>
                                                </button>
                                            </Magnetic>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </InteractiveCard>
                    </div>

                    {/* Right Side: Modules */}
                    <div className='w-full md:w-1/2 flex flex-col gap-8'>
                        
                        <div className="text-neutral-500 font-mono font-bold tracking-widest uppercase text-xs mb-4 gsap-contact-element flex flex-col gap-2 border-l-2 border-[#cfccb8] pl-4">
                            <p>// Awaiting external connection</p>
                            <p>// Direct communication channels open</p>
                            <p>// Establish uplink below</p>
                        </div>

                        {/* Direct Contacts */}
                        <div className="flex flex-col gap-4">
                            <InteractiveCard className="gsap-contact-element">
                                <a href="mailto:iamsudippan@gmail.com" className="block bg-white border border-[#cfccb8] hover:border-[#111111] p-6 relative group transition-all duration-300 shadow-[4px_4px_0px_#cfccb8] hover:shadow-[4px_4px_0px_#111111] overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-15 group-hover:opacity-40 transition-opacity">
                                        <Icon icon="carbon:email" width="60" height="60" className="text-orange-600" />
                                    </div>
                                    <h2 className="text-[#111111]/70 font-mono text-[9px] tracking-widest uppercase mb-2 font-bold">[ UPLINK.EMAIL ]</h2>
                                    <p className='text-[#111111] tracking-widest uppercase text-sm md:text-base font-bold group-hover:text-orange-600 transition-colors'>
                                        iamsudippan@gmail.com
                                    </p>
                                </a>
                            </InteractiveCard>

                            <InteractiveCard className="gsap-contact-element">
                                <a href="tel:+918900359269" className="block bg-white border border-[#cfccb8] hover:border-[#111111] p-6 relative group transition-all duration-300 shadow-[4px_4px_0px_#cfccb8] hover:shadow-[4px_4px_0px_#111111] overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-15 group-hover:opacity-40 transition-opacity">
                                        <Icon icon="carbon:phone" width="60" height="60" className="text-orange-600" />
                                    </div>
                                    <h2 className="text-[#111111]/70 font-mono text-[9px] tracking-widest uppercase mb-2 font-bold">[ UPLINK.PHONE ]</h2>
                                    <p className='text-[#111111] tracking-widest uppercase text-sm md:text-base font-bold group-hover:text-orange-600 transition-colors'>
                                        +91 8900359269
                                    </p>
                                </a>
                            </InteractiveCard>
                        </div>

                        {/* Social Grid */}
                        <div className='mt-8 gsap-contact-element'>
                            <div className="flex items-center gap-4 mb-6">
                                <div className='w-4 h-[1px] bg-[#cfccb8]' />
                                <h2 className="text-orange-600 font-mono text-[10px] tracking-widest uppercase font-bold">[ NETWORK.NODES ]</h2>
                                <div className='flex-1 h-[1px] bg-[#cfccb8]' />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                {socials.map((social, index) => (
                                    <InteractiveCard key={index}>
                                        <Magnetic>
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center justify-center bg-white border border-[#cfccb8] hover:bg-[#111111] hover:border-[#111111] p-4 transition-all duration-300 group shadow-[4px_4px_0px_#cfccb8] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[3px] hover:translate-y-[3px]'
                                            >
                                                <span className='text-[10px] tracking-widest uppercase text-neutral-800 group-hover:text-white font-bold transition-colors'>
                                                    {social.name}
                                                </span>
                                            </a>
                                        </Magnetic>
                                    </InteractiveCard>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Bottom Marquee Footer */}
            <div className="mt-20 border-t-2 border-[#111111] bg-white">
                <Marque
                    items={items}
                    className='text-[#111111]'
                    iconName='carbon:connection-signal'
                    iconClassname='text-orange-600'
                />
            </div>

        </section>
    );
};

export default Contact;
