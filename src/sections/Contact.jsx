import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../constants';
import Marque from '../componnts/Marque';
import Magnetic from '../componnts/Magnetic.jsx';
import InteractiveCard from '../componnts/InteractiveCard.jsx';
import { Icon } from '@iconify/react';
import DrawText from '../componnts/DrawText';

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

        // Detailed staggered reveal for contact info and form lines
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#contact',
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });

        contactTl.fromTo('.gsap-contact-protocol',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        )
            .fromTo('.gsap-contact-title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo('.gsap-contact-desc',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                "-=0.35"
            )
            .fromTo('.gsap-contact-link-item',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
                "-=0.3"
            )
            // Draw the vertical divider line
            .fromTo('.gsap-contact-vertical-line',
                { scaleY: 0 },
                { scaleY: 1, duration: 0.6, transformOrigin: "top center", ease: "power3.inOut" },
                "grid-draw"
            )
            // Draw the top horizontal line of form
            .fromTo('.gsap-contact-top-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, transformOrigin: "left center", ease: "power3.inOut" },
                "grid-draw+=0.1"
            )
            // Draw horizontal divider lines
            .fromTo('.gsap-contact-horizontal-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 0.5, stagger: 0.1, transformOrigin: "left center", ease: "power2.inOut" },
                "grid-draw+=0.15"
            )
            // Draw inner vertical line dividers
            .fromTo('.gsap-contact-vertical-inner-line',
                { scaleY: 0 },
                { scaleY: 1, duration: 0.5, stagger: 0.1, transformOrigin: "top center", ease: "power2.inOut" },
                "grid-draw+=0.2"
            )
            // Fade in fields contents concurrently with grid draw
            .fromTo('.gsap-contact-field-content',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" },
                "grid-draw+=0.25"
            )
            // Fade in button and footer items
            .fromTo('.gsap-contact-btn',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
                "-=0.1"
            )
            .fromTo('.gsap-contact-footer-item',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
                "-=0.2"
            )
            .fromTo('.gsap-contact-watermark',
                { opacity: 0, scale: 0.9 },
                { opacity: 0.04, scale: 1, duration: 0.8, ease: "power2.out" },
                "-=0.6"
            );

        // Parallax scroll animation for background watermark text
        gsap.fromTo(".contact-watermark-text",
            { xPercent: -8 },
            {
                xPercent: 8,
                scrollTrigger: {
                    trigger: "#contact",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );

    }, []);

    return (
        <section id="contact" className="min-h-screen bg-[#eae8e4] text-[#111111] relative overflow-hidden flex flex-col justify-between z-10">
            {/* Background Light Text Watermark */}
            <div
                className="contact-watermark-text absolute left-0 top-10 select-none pointer-events-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] z-0 tracking-tighter"
            >
                CONTACT
            </div>

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

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 relative z-10'>

                    {/* Left Column: Title and info */}
                    <div className='col-span-1 lg:col-span-5 flex flex-col justify-between lg:pr-12'>
                        <div>
                            <span className="text-[10px]   text-neutral-400 tracking-[0.2em] uppercase block mb-4 gsap-contact-protocol">// +COMMUNICATION PROTOCOL V.01</span>
                            <h2 className='text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-[#111111] uppercase mb-8 gsap-contact-title flex flex-col items-start gap-2'>
                                <DrawText text="GET IN" color="#111111" fontSize={72} />
                                <DrawText text="TOUCH" color="#111111" fontSize={72} delay={0.2} />
                            </h2>
                            <p className="text-neutral-500 text-sm leading-relaxed max-w-md gsap-contact-desc">
                                For inquiries regarding custom game development, 3D modeling, VLSI simulations, or collaborative work, please utilize the secure transmission channel. Response latency: 24-48 hours.
                            </p>
                        </div>

                        {/* Direct Contacts & Socials */}
                        <div className="mt-12 flex flex-col gap-6">
                            <div className="gsap-contact-link-item">
                                <span className="text-[10px]   text-neutral-400 tracking-widest uppercase block mb-1">// DIRECT LINK</span>
                                <a href="mailto:iamsudippan@gmail.com" className="text-sm font-bold uppercase tracking-wider text-[#111111] hover:text-orange-600 transition-colors">
                                    iamsudippan@gmail.com
                                </a>
                            </div>
                            <div className="gsap-contact-link-item">
                                <span className="text-[10px]   text-neutral-400 tracking-widest uppercase block mb-1">// SECURE VOIP</span>
                                <a href="tel:+918900359269" className="text-sm font-bold uppercase tracking-wider text-[#111111] hover:text-orange-600 transition-colors">
                                    +91 8900359269
                                </a>
                            </div>
                            <div className="gsap-contact-link-item">
                                <span className="text-[10px]   text-neutral-400 tracking-widest uppercase block mb-2">// SOCIAL NODES</span>
                                <div className="flex flex-wrap gap-x-4 gap-y-2">
                                    {socials.map((social, index) => (
                                        <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-xs uppercase font-bold tracking-widest text-[#111111] hover:text-orange-600 transition-colors">
                                            {social.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Technical Form */}
                    <div className='col-span-1 lg:col-span-7 lg:pl-12 flex flex-col justify-between relative'>
                        {/* Main Vertical Divider Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cfccb8]/60 hidden lg:block gsap-contact-vertical-line" />

                        <form onSubmit={onSubmit} className="flex flex-col w-full relative z-10">
                            {/* Top Horizontal Line */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#cfccb8]/60 gsap-contact-top-line" />

                            {/* Input 1: SUBJECT / IDENTITY */}
                            <div className="grid grid-cols-12 relative">
                                <div className="col-span-9 py-6 pr-4 gsap-contact-field-content">
                                    <label className="text-[15px]   tracking-widest text-neutral-800 uppercase mb-2 block select-none">
                                        YOUR NAME/ORGANIZATION
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="NAME / ORGANIZATION"
                                        className="w-full bg-transparent text-[#111111] placeholder:text-neutral-300   text-xl focus:outline-none uppercase font-bold tracking-wider py-1"
                                        required
                                    />
                                </div>
                                <div className="col-span-3 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cfccb8]/60 gsap-contact-vertical-inner-line" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#cfccb8]/60 gsap-contact-horizontal-line" />
                            </div>

                            {/* Input 2: ENDPOINT */}
                            <div className="grid grid-cols-12 relative">
                                <div className="col-span-9 py-6 pr-4 gsap-contact-field-content">
                                    <label className="text-[15px]   tracking-widest text-neutral-800 uppercase mb-2 block select-none">
                                        YOUR EMAIL ADDRESS
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="EMAIL ADDRESS"
                                        className="w-full bg-transparent text-[#111111] placeholder:text-neutral-300   text-xl focus:outline-none uppercase font-bold tracking-wider py-1"
                                        required
                                    />
                                </div>
                                <div className="col-span-3 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cfccb8]/60 gsap-contact-vertical-inner-line" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#cfccb8]/60 gsap-contact-horizontal-line" />
                            </div>

                            {/* Input 3: TRANSMISSION DATA */}
                            <div className="grid grid-cols-12 relative">
                                <div className="col-span-9 py-6 pr-4 gsap-contact-field-content">
                                    <label className="text-[15px]   tracking-widest text-neutral-800 uppercase mb-2 block select-none">
                                        MESSAGE
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="MESSAGE BODY"
                                        className="w-full bg-transparent text-[#111111] placeholder:text-neutral-300   text-xl focus:outline-none uppercase font-bold tracking-wider h-32 resize-none py-1"
                                        required
                                    />
                                </div>
                                <div className="col-span-3 relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cfccb8]/60 gsap-contact-vertical-inner-line" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#cfccb8]/60 gsap-contact-horizontal-line" />
                            </div>

                            {/* Footer Row: Button & Schematic Codes */}
                            <div className="grid grid-cols-12">
                                <div className="col-span-9 py-8 flex items-center gsap-contact-btn">
                                    <button
                                        type="submit"
                                        disabled={isTransmitting}
                                        className={`px-8 py-4   text-xs uppercase tracking-widest transition-all duration-300 font-bold ${isTransmitting ? 'bg-orange-600/20 text-orange-600 border border-orange-600/30 cursor-not-allowed' : 'bg-[#111111] text-white hover:bg-orange-600 cursor-pointer'}`}
                                    >
                                        {result || "SEND TERMINAL"}
                                    </button>
                                </div>
                                <div className="col-span-3 py-8 flex items-center justify-around   text-[9px] text-[#111111]/40 tracking-widest pl-4 font-bold select-none relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#cfccb8]/60 gsap-contact-vertical-inner-line" />
                                    <span className="gsap-contact-footer-item">TERMINAL</span>
                                    <span className="gsap-contact-footer-item">ARCHIVE</span>
                                    <span className="gsap-contact-footer-item">X-01</span>
                                </div>
                            </div>

                        </form>

                        {/* Cybernetic Wireframe Background Graphic */}
                        <img
                            src="/Images/contact_wireframe.png"
                            alt="Technical Schematic"
                            className="absolute bottom-0 right-0 w-80 h-auto opacity-[0.04] pointer-events-none z-0 gsap-contact-watermark"
                        />
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
