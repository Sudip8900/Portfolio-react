import React, { useRef, useEffect } from 'react';
import Marque from '../componnts/Marque';
import Magnetic from '../componnts/Magnetic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Decrypted Text Component ───────────────────────────── */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';
const DecryptedText = ({ text, className }) => {
    const [displayText, setDisplayText] = React.useState(text);
    const intervalRef = useRef(null);

    const scramble = () => {
        let iterations = 0;
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDisplayText(text.split('').map((char, index) => {
                if (index < iterations || char === ' ') return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            
            if (iterations >= text.length) {
                clearInterval(intervalRef.current);
            }
            iterations += 1/3;
        }, 30);
    };

    // Scramble effect only on hover to prevent layout thrashing during scroll pin
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <span 
            className={className} 
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
};

/* ─── Radar Sweep Component ─────────────────────────────── */
const Radar = () => (
    <div className="cs-radar absolute right-6 bottom-6 hidden lg:block z-10">
        <div className="relative w-28 h-28">
            {[0, 8, 16, 24].map((inset) => (
                <div
                    key={inset}
                    className="absolute border border-orange-500/15 rounded-full hover:border-orange-500/40 transition-colors duration-300"
                    style={{ inset }}
                />
            ))}
            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-px bg-orange-500/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-full w-px bg-orange-500/10" />
            </div>
            {/* Sweep arm */}
            <div className="absolute inset-0 origin-center cs-radar-arm">
                <div className="w-1/2 h-px absolute top-1/2 right-0 bg-gradient-to-r from-orange-500/90 to-transparent shadow-[0_0_6px_rgba(255,105,0,0.8)]" />
            </div>
            {/* Sweep glow cone */}
            <div className="absolute inset-0 rounded-full cs-radar-sweep" />
            {/* Blip */}
            <div
                className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_6px_rgba(255,105,0,1)] cs-radar-blip"
                style={{ top: '30%', left: '65%' }}
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-orange-500/40 tracking-widest whitespace-nowrap">
                <DecryptedText text="TRACKING" />
            </span>
        </div>
    </div>
);

/* ─── Telemetry Row ──────────────────────────────────────── */
const TelLeft = ({ label, val }) => (
    <div className="flex flex-col gap-0.5 telemetry-left group cursor-default">
        <span className="text-orange-500/80 group-hover:text-orange-400 transition-colors duration-200"><DecryptedText text={label} /></span>
        <span className="text-orange-500/40 group-hover:text-orange-500/70 transition-colors duration-200"><DecryptedText text={val} /></span>
    </div>
);

const TelRight = ({ label, val, pulse }) => (
    <div className="flex flex-col gap-0.5 telemetry-right group cursor-default text-right">
        <span className="text-orange-500/40 group-hover:text-orange-500/60 transition-colors duration-200"><DecryptedText text={label} /></span>
        <span className={`text-orange-500/80 group-hover:text-orange-400 transition-colors duration-200 ${pulse ? 'animate-pulse text-green-400/70' : ''}`}>
            <DecryptedText text={val} />
        </span>
    </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const ContactSummary = () => {
    const contactSumRef = useRef(null);
    const bgRef = useRef(null);
    const SumRef = useRef(null);
    const canvasRef = useRef(null);

    const marqueItems = ["INITIALIZING HANDSHAKE", "ESTABLISHING UPLINK", "SYNCING DATA", "OPENING CHANNELS", "AWAITING INPUT", "SYSTEM READY", "CONNECTION SECURE", "PINGING SERVER", "TRANSMITTING", "RECEIVING"];
    const marqueItems2 = ["CREATE", "INNOVATE", "BUILD", "DESIGN", "DEVELOP", "CODE", "ENGINEER", "EXECUTE", "DEPLOY", "LAUNCH"];

    /* ── Canvas floating particles (Interactive) ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const pts = Array.from({ length: 90 }, () => ({
            x: Math.random() * canvas.width, 
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.5 + 0.5,
            baseAlpha: Math.random() * 0.3 + 0.1,
            phase: Math.random() * Math.PI * 2,
        }));

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };
        
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let alpha = p.baseAlpha + 0.2 * Math.abs(Math.sin(p.phase));
                p.phase += 0.02;

                if (dist < 180) {
                    p.x -= dx * 0.015;
                    p.y -= dy * 0.015;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255,105,0,${0.2 - dist/900})`;
                    ctx.stroke();
                    alpha = 0.8;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,105,0,${alpha})`;
                ctx.fill();
            });
            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => { 
            cancelAnimationFrame(animId); 
            window.removeEventListener('resize', resize); 
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    /* ── GSAP ── */
    useGSAP(() => {
        /* Pin */
        gsap.to(contactSumRef.current, {
            scrollTrigger: {
                trigger: contactSumRef.current,
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        /* Set everything invisible before reveal */
        gsap.set('.cs-bg-grid', { autoAlpha: 0 });
        gsap.set('.tech-bracket', { autoAlpha: 0, scale: 0 });
        gsap.set('.cs-radar', { autoAlpha: 0, scale: 0 });
        gsap.set('.telemetry-left', { autoAlpha: 0, x: -40 });
        gsap.set('.telemetry-right', { autoAlpha: 0, x: 40 });
        gsap.set('.incoming-label', { autoAlpha: 0, y: -16, scale: 0.8 });
        gsap.set('.main-text-word', { autoAlpha: 0, y: 36, filter: 'blur(10px)' });
        gsap.set('.cs-cta', { autoAlpha: 0, y: 20 });
        gsap.set('.cs-scan-line', { left: '-4%', autoAlpha: 1 });

        /* Boot sequence timeline */
        const tl = gsap.timeline({
            scrollTrigger: { trigger: SumRef.current, start: 'top 82%' },
        });

        tl
            /* 1 – scan line sweeps */
            .to('.cs-scan-line', { left: '104%', duration: 1.2, ease: 'power2.inOut' }, 0)
            /* 2 – grid powers on */
            .to('.cs-bg-grid', { autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 0.25)
            /* 3 – corner brackets */
            .to('.tech-bracket', { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.07 }, 0.5)
            /* 4 – radar initialises */
            .to('.cs-radar', { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 0.65)
            /* 5 – telemetry slides in */
            .to('.telemetry-left', { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out', stagger: 0.07 }, 0.75)
            .to('.telemetry-right', { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power3.out', stagger: 0.07 }, 0.75)
            /* 6 – transmission label */
            .to('.incoming-label', { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 1.05)
            /* 7 – main words fly up */
            .to('.main-text-word', { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 1.15)
            /* 8 – CTA */
            .to('.cs-cta', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }, 1.8);

        /* Mouse parallax for Grid and Content */
        const onMove = (e) => {
            if (!bgRef.current || !SumRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            gsap.to(bgRef.current, { x, y, duration: 1, ease: 'power2.out' });
            gsap.to(SumRef.current, { 
                rotateX: -y * 0.5, 
                rotateY: x * 0.5, 
                duration: 1, 
                ease: 'power2.out',
                transformPerspective: 1000
            });
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, { scope: contactSumRef });

    return (
        <section
            ref={contactSumRef}
            className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16 bg-black overflow-hidden relative"
        >
            {/* ── Top Marquee ── */}
            <Marque
                items={marqueItems}
                className="border-y border-orange-500/20 bg-[#050505] relative z-20 shadow-[0_0_20px_rgba(255,105,0,0.1)]"
                iconClassname="text-orange-500/50"
                iconName="carbon:data-1"
            />

            {/* ── Main Area ── */}
            <div className="w-full px-5 relative flex justify-center items-center h-full flex-1">

                {/* Particle canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[1] pointer-events-auto" />

                {/* Parallax background grid */}
                <div
                    ref={bgRef}
                    className="cs-bg-grid absolute inset-[-50px] pointer-events-none z-[0]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,105,0,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,105,0,0.08) 1px,transparent 1px)',
                        backgroundSize: '50px 50px',
                        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,#000 50%,transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%,#000 50%,transparent 100%)',
                    }}
                />

                {/* CRT scanline overlay */}
                <div
                    className="absolute inset-0 pointer-events-none z-[2] opacity-30 mix-blend-overlay"
                    style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)',
                    }}
                />

                {/* Scroll-trigger scan line */}
                <div
                    className="cs-scan-line absolute top-0 bottom-0 z-30 pointer-events-none"
                    style={{
                        width: '4px',
                        left: '-4%',
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(255,105,0,1) 40%, #fff 50%, rgba(255,105,0,1) 60%, transparent 100%)',
                        boxShadow: '0 0 25px 5px rgba(255,105,0,0.8), 0 0 50px 10px rgba(255,105,0,0.4)',
                        filter: 'blur(0.5px)',
                    }}
                />

                {/* Radar */}
                <Radar />

                {/* Left Telemetry */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] hidden md:flex flex-col gap-4 font-mono tracking-widest z-10">
                    <TelLeft label="SYS.ON" val="0x8F2A" />
                    <TelLeft label="NET.OK" val="PING 12ms" />
                    <TelLeft label="FRQ.89" val="1024 GB/s" />
                    <TelLeft label="MEM.OK" val="16.0 TB" />
                </div>

                {/* Right Telemetry */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] hidden md:flex flex-col gap-4 font-mono tracking-widest z-10">
                    <TelRight label="{DATA.SYNC}" val="ACTIVE" />
                    <TelRight label="{UPLINK}" val="SECURE" />
                    <TelRight label="{STATUS}" val="STABLE" pulse />
                    <TelRight label="{SIGNAL}" val="██████ 94%" />
                </div>

                {/* ── Central Content ── */}
                <div
                    ref={SumRef}
                    className="text-center font-light contact-text-responsive py-8 md:py-14 px-4 md:px-12 relative z-20 group"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Corner brackets */}
                    <div className="absolute left-0 top-0 w-8 h-8 border-l-2 border-t-2 border-orange-500/60 tech-bracket transition-transform duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2" />
                    <div className="absolute right-0 top-0 w-8 h-8 border-r-2 border-t-2 border-orange-500/60 tech-bracket transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
                    <div className="absolute left-0 bottom-0 w-8 h-8 border-l-2 border-b-2 border-orange-500/60 tech-bracket transition-transform duration-300 group-hover:-translate-x-2 group-hover:translate-y-2" />
                    <div className="absolute right-0 bottom-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/60 tech-bracket transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />

                    {/* Bracket coords (decorative) */}
                    <span className="absolute top-1 left-10 text-[8px] font-mono text-orange-500/30 hidden md:block transition-all duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2"><DecryptedText text="X:00 Y:00" /></span>
                    <span className="absolute top-1 right-10 text-[8px] font-mono text-orange-500/30 hidden md:block transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"><DecryptedText text="X:FF Y:FF" /></span>

                    {/* INCOMING TRANSMISSION label */}
                    <div className="incoming-label absolute -top-4 left-1/2 -translate-x-1/2 text-orange-500 text-[10px] md:text-xs tracking-[0.3em] uppercase flex items-center gap-3 whitespace-nowrap bg-black/60 px-5 py-1.5 border border-orange-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(255,105,0,0.15)] rounded-sm" style={{ transform: 'translateZ(30px)' }}>
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
                        <DecryptedText text="[ INCOMING TRANSMISSION ]" />
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
                    </div>

                    {/* Main text */}
                    <p className="uppercase tracking-widest leading-tight drop-shadow-[0_0_18px_rgba(255,105,0,0.45)]" style={{ transform: 'translateZ(50px)' }}>
                        <span className="text-white/30 font-mono text-sm mr-2 main-text-word inline-block">{'>'}</span>
                        <DecryptedText text="LET'S" className="main-text-word inline-block" />
                        <br />
                        <span className="main-text-word inline-block mt-2">
                            <Magnetic>
                                <span className="cs-glitch-word font-bold text-orange-500 inline-block cursor-pointer transition-all duration-300 hover:text-white hover:scale-105 hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.9)]">
                                    CONNECT
                                </span>
                            </Magnetic>
                        </span>
                        <br />
                        <span className="text-white/30 text-sm mx-2 main-text-word inline-block">&amp;</span>
                        <span className="main-text-word inline-block mt-2">
                            <Magnetic>
                                <DecryptedText text="CREATE" className="italic text-white inline-block cursor-pointer transition-all duration-300 hover:text-orange-500 hover:scale-105 hover:drop-shadow-[0_0_22px_rgba(255,105,0,0.9)]" />
                            </Magnetic>
                        </span>{' '}
                        <DecryptedText text="SOMETHING" className="main-text-word inline-block ml-1" />
                        <br />
                        <span className="main-text-word inline-block mt-2">
                            <Magnetic>
                                <DecryptedText text="AMAZING" className="border-b-2 border-orange-500 text-white inline-block cursor-pointer transition-all duration-300 hover:text-orange-500 hover:border-white hover:scale-105 hover:drop-shadow-[0_0_22px_rgba(255,105,0,0.9)]" />
                            </Magnetic>
                        </span>{' '}
                        <span className="main-text-word inline-block">
                            <Magnetic>
                                <DecryptedText text="TOGETHER" className="text-orange-500 inline-block cursor-pointer transition-all duration-300 hover:text-white hover:scale-105 hover:drop-shadow-[0_0_24px_rgba(255,255,255,0.9)]" />
                            </Magnetic>
                        </span>
                        <span className="main-text-word animate-pulse text-orange-500 font-mono ml-2 inline-block">_</span>
                    </p>

                    {/* CTA button */}
                    <div className="cs-cta mt-12 flex justify-center" style={{ transform: 'translateZ(40px)' }}>
                        <Magnetic>
                            <button
                                id="contact-summary-cta"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="cs-cta-btn relative group px-10 py-4 font-mono text-sm tracking-[0.35em] uppercase border border-orange-500/60 text-orange-500 overflow-hidden hover:text-black transition-colors duration-300 focus:outline-none shadow-[0_0_20px_rgba(255,105,0,0.1)] hover:shadow-[0_0_30px_rgba(255,105,0,0.4)]"
                            >
                                {/* Fill sweep */}
                                <span className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
                                {/* Corner accents */}
                                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-400 group-hover:border-black transition-colors duration-300" />
                                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-400 group-hover:border-black transition-colors duration-300" />
                                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-400 group-hover:border-black transition-colors duration-300" />
                                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-400 group-hover:border-black transition-colors duration-300" />
                                <span className="relative z-10 flex items-center gap-3 font-semibold">
                                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse group-hover:shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                                    <DecryptedText text="INITIATE CONTACT" />
                                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse group-hover:shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                                </span>
                            </button>
                        </Magnetic>
                    </div>
                </div>
            </div>

            {/* ── Bottom Marquee ── */}
            <Marque
                items={marqueItems2}
                reverse
                className="text-white bg-[#050505] border-y border-orange-500/20 relative z-20 shadow-[0_0_20px_rgba(255,105,0,0.1)]"
                iconClassname="text-orange-500/50"
                iconName="carbon:code"
            />
        </section>
    );
};

export default ContactSummary;