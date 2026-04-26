import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { experience } from '../constants';
import { Icon } from '@iconify/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../componnts/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

const BentoCard = ({ exp, className }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center center"
        });
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bento-card bg-gray-100 dark:bg-[#111111] border border-orange-500/20 flex flex-col justify-between rounded-3xl p-8 relative group transition-colors duration-500 hover:border-orange-500/80 shadow-md ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange-400/10 via-transparent to-transparent pointer-events-none rounded-[30px]" style={{ transform: 'translateZ(-1px)' }}></div>
            
            <h3 className="text-2xl font-bold text-orange-600 mb-6 drop-shadow-sm" style={{ transform: 'translateZ(30px)' }}>{exp.role}</h3>

            <div style={{ transform: 'translateZ(40px)' }}>
                {exp.icon ? (
                    <Icon icon={exp.icon} width="60" height="60" className="text-gray-800 dark:text-gray-200 drop-shadow-sm transition-colors duration-500" />
                ) : (
                    <img
                        src={exp.image}
                        alt={exp.company}
                        width={exp.width}
                        height={exp.height}
                        className="rounded-lg shadow-sm"
                    />
                )}
            </div>

            <div className='mt-8' style={{ transform: 'translateZ(20px)' }}>
                <p className="text-[1.5rem] font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-500">{exp.company}</p>
                <p className="text-orange-600 font-medium tracking-wide">{exp.duration}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed transition-colors duration-500">{exp.description}</p>
            </div>
        </div>
    );
};

const Experience = () => {

    const sectionRef = useRef(null);
    const headinRef = useRef(null);
    const lineRef = useRef(null);
    const GridRef = useRef(null);
    const CVRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.bento-card');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
            }
        });

        tl.from(headinRef.current.children, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
        })
        .from(lineRef.current, {
            width: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.4")
        .from(cards, {
            y: 80,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
        }, "-=0.4")
        .from(CVRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        }, "-=0.6");

    }, { scope: sectionRef });

    const getBentoClasses = (index) => {
        switch (index) {
            case 0: return 'md:col-span-2 md:row-span-2 min-h-[350px]';
            case 1: return 'md:col-span-2 md:row-span-1 min-h-[250px]';
            case 2: return 'md:col-span-1 md:row-span-1 min-h-[250px]';
            case 3: return 'md:col-span-1 md:row-span-1 min-h-[250px]';
            case 4: return 'md:col-span-2 md:row-span-1 min-h-[250px]';
            case 5: return 'md:col-span-2 md:row-span-1 min-h-[250px]';
            default: return 'md:col-span-1 md:row-span-1 min-h-[250px]';
        }
    };

    return (
        <section ref={sectionRef} className='min-h-screen pb-20'>
            <div>
                <div ref={headinRef}>
                    <h2 className="text-1xl font-light text-center text-orange-500 pt-10 uppercase tracking-widest md:text-3xl md:tracking-[30px]">My Professional Journey</h2>
                    <h1 className="text-4xl font-bold text-center md:text-start md:text-[6rem] md:mx-10 mt-4 text-inherit">Experience</h1>
                </div>

                <div ref={lineRef} className="w-full border-orange-500 border-t-2 rounded-t-[25px] mt-2 mb-10" />

                <div className='flex flex-col xl:flex-row justify-between gap-10 mx-5'>

                    <div ref={GridRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full xl:w-2/3" style={{ perspective: '2000px' }}>
                        {experience.map((exp, index) => (
                            <BentoCard 
                                key={exp.id} 
                                exp={exp} 
                                className={getBentoClasses(index)} 
                            />
                        ))}
                    </div>

                    <div ref={CVRef} className='p-8 bg-gradient-to-br from-orange-500 to-orange-600 w-full xl:w-1/3 rounded-[30px] flex flex-col justify-center items-center shadow-2xl relative md:sticky top-32 overflow-hidden h-fit'>
                        {/* Decorative glow in CV card */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-black/20 rounded-full blur-3xl"></div>

                        <h1 className='text-white font-light text-7xl md:text-8xl relative z-10'>CV</h1>

                        <div className="w-full mt-12 flex flex-col gap-5 relative z-10">
                            <Magnetic>
                                <a href="/Documets/Resume.pdf" target='_blank' className='block w-full'>
                                    <button className='flex flex-row items-center justify-between w-full bg-white dark:bg-[#111111] text-black dark:text-white p-5 rounded-full font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'>
                                        <span className="text-lg">Game Development</span>
                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <Icon icon="solar:download-minimalistic-bold-duotone" width="24" height="24" className="text-orange-500"/>
                                        </div>
                                    </button>
                                </a>
                            </Magnetic>
                            
                            <Magnetic>
                                <a href="/Documets/Resume2.pdf" target='_blank' className='block w-full'>
                                    <button className='flex flex-row items-center justify-between w-full bg-white dark:bg-[#111111] text-black dark:text-white p-5 rounded-full font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'>
                                        <span className="text-lg">Electronics Engineering</span>
                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <Icon icon="solar:download-minimalistic-bold-duotone" width="24" height="24" className="text-orange-500"/>
                                        </div>
                                    </button>
                                </a>
                            </Magnetic>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Experience