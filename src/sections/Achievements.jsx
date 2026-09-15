import React, { useRef, useState, useEffect } from 'react';
import { achievementsData } from '../constants';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);

    const totalUnits = achievementsData.length;

    // Dynamically update items per page based on viewport size (1 on mobile, 2 on desktop)
    useEffect(() => {
        const updateItemsPerPage = () => {
            setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
        };
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // Max page index adaptive to total number of cards and visible items per page
    const maxIndex = Math.max(0, totalUnits - itemsPerPage);

    // Keep activeIndex within bounds when cards count or screen size changes
    useEffect(() => {
        setActiveIndex(prev => Math.min(prev, maxIndex));
    }, [totalUnits, maxIndex]);

    const handlePrev = () => {
        setActiveIndex(prev => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setActiveIndex(prev => Math.min(prev + 1, maxIndex));
    };

    useGSAP(() => {
        // Standard Section Header Animation matching Experience & About sections
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
                delay: 0.2,
                transformOrigin: "left center",
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
                transformOrigin: "left center",
                ease: "power3.out",
            }, "-=0.4");
        }

        // Parallax Background Watermark Animation
        gsap.fromTo(".achievements-watermark",
            { xPercent: 8 },
            {
                xPercent: -8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section 
            id="achievements" 
            ref={sectionRef} 
            className="min-h-screen lg:h-screen pt-16 lg:pt-20 pb-6 lg:pb-8 px-4 sm:px-8 md:px-10 lg:px-14 w-full bg-[#efeeea] text-[#111111] relative z-10 font-sans border-t border-[#d5d2c4] overflow-hidden select-none flex flex-col justify-between"
        >
            {/* Background Light Text Watermark */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="achievements-watermark absolute right-0 top-10 select-none text-[16vw] font-black uppercase leading-none text-[#111111]/[0.02] tracking-tighter font-sans">
                    ACHIEVEMENTS
                </div>
            </div>

            {/* Faint Architectural Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="w-full h-full flex flex-col justify-between relative z-10">
                
                {/* 1. Section Header matching site pages standard style */}
                <div ref={headingRef} className='flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 select-none w-full max-w-full overflow-hidden shrink-0' style={{ perspective: "1000px" }}>
                    <div className='header-block w-8 sm:w-12 h-1.5 sm:h-2 bg-orange-600 shrink-0' />
                    <h1 className='text-xs xs:text-sm sm:text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wider sm:tracking-widest overflow-hidden flex flex-nowrap whitespace-nowrap py-1 shrink-0 font-sans'>
                        {(() => {
                            const headerText = "[ SYS.HONORS_&_ACHIEVEMENTS ]";
                            return headerText.split("").map((char, index) => (
                                <span key={index} className="header-char inline-block origin-bottom text-[#111111]">
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ));
                        })()}
                    </h1>
                    <div ref={lineRef} className='flex-1 min-w-[12px] h-[1px] bg-[#cfccb8]' />
                </div>

                {/* 2. Button-Only Navigated Cards Carousel Window (Constrained to 100vh) */}
                <div className="w-full flex-1 min-h-0 overflow-hidden relative flex items-center py-2">
                    <div 
                        className="flex gap-6 transition-transform duration-500 ease-out w-full h-full"
                        style={{ transform: `translateX(calc(-${activeIndex * (100 / itemsPerPage)}% - ${activeIndex * (1.5 / itemsPerPage)}rem))` }}
                    >
                        {achievementsData.map((item, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div 
                                    key={item.id || idx}
                                    className={`flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] h-full max-h-full border border-[#111111] p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-2xl hover:border-orange-600 group relative overflow-hidden ${
                                        isEven 
                                            ? 'bg-[#f4f2ee] text-[#111111]' 
                                            : 'bg-[#111111] text-[#eae8e4]'
                                    }`}
                                    style={{ fontFamily: '"Michroma", sans-serif' }}
                                >
                                    {/* Content Stack: Image -> Title -> Description */}
                                    <div className="flex flex-col gap-3.5 sm:gap-4 overflow-hidden flex-1 min-h-0">
                                        {/* Image Box Area (Expands to fill vertical space) */}
                                        <div className="relative w-full flex-1 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px] border border-[#111111] overflow-hidden bg-neutral-900">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500 opacity-90 group-hover:opacity-100"
                                            />
                                        </div>

                                        {/* Main Card Text */}
                                        <div className="shrink-0">
                                            <h3 className={`text-base sm:text-lg lg:text-xl font-black uppercase tracking-tight leading-snug mb-2 transition-colors ${
                                                isEven ? 'text-[#111111] group-hover:text-orange-600' : 'text-white group-hover:text-orange-500'
                                            }`}>
                                                {item.title}
                                            </h3>

                                            {item.description && (
                                                <p className={`text-xs md:text-sm font-sans leading-relaxed font-normal line-clamp-3 sm:line-clamp-4 ${
                                                    isEven ? 'text-neutral-600' : 'text-neutral-300'
                                                }`}>
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tag Pills at Bottom */}
                                    <div className={`flex flex-wrap gap-1.5 pt-3 border-t mt-3 shrink-0 ${
                                        isEven ? 'border-neutral-200' : 'border-neutral-800'
                                    }`}>
                                        {item.tags && item.tags.map((tag, tIdx) => (
                                            <span 
                                                key={tIdx} 
                                                className={`px-2 py-0.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase border ${
                                                    isEven 
                                                        ? 'bg-neutral-200/80 text-[#111111] border-neutral-300' 
                                                        : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Adaptive Navigation Controls Bar (Buttons Only) */}
                <div 
                    className="border-t border-[#cfccb8] pt-4 mt-4 flex items-center justify-end shrink-0"
                    style={{ fontFamily: '"Michroma", sans-serif' }}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrev}
                            disabled={activeIndex === 0}
                            className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#eae8e4] text-xs font-black tracking-widest uppercase border border-[#111111] hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span>← PREV</span>
                            <span className="font-mono text-[10px] text-neutral-400">[{activeIndex > 0 ? String(activeIndex).padStart(2, '0') : '--'}]</span>
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={activeIndex >= maxIndex}
                            className="flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#eae8e4] text-xs font-black tracking-widest uppercase border border-[#111111] hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span>NEXT</span>
                            <span className="font-mono text-[10px] text-neutral-400">[{activeIndex < maxIndex ? String(activeIndex + 2).padStart(2, '0') : '--'}]</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Achievements;
