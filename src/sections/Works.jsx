import { useGSAP } from '@gsap/react';
import React, { use, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderProjects, UnrealProjects } from '../constants';
import { Icon } from '@iconify/react';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
    const [CurrentIndex, setCurrentIndex] = useState(null);
    const headingRef = React.useRef(null);
    const Lineref = React.useRef(null);
    const subRef = React.useRef(null);
    const subRef2 = React.useRef(null);
    const previewRef = React.useRef(null);
    const moveX = useRef(null);
    const moveY = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ProjectRef = useRef(null);

    useGSAP(() => {

        moveX.current = gsap.quickTo(previewRef.current, "x", { duration: 0.3, ease: "power2.out" });
        moveY.current = gsap.quickTo(previewRef.current, "y", { duration: 0.3, ease: "power2.out" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
            }
        });

        if (headingRef.current) {
            tl.from(headingRef.current.children, {
                duration: 1,
                opacity: 0,
                yPercent: 100,
                ease: "circ.out",
                stagger: 0.3,
            });
        }

        if (Lineref.current) {
            gsap.from(Lineref.current, {
                duration: 1,
                xPercent: 100,
                ease: "circ.out",
                scrollTrigger: {
                    trigger: Lineref.current,
                    start: "top 80%",
                }
            });
        }

        if (subRef.current) {
            gsap.from(subRef.current.children, {
                duration: 1,
                opacity: 0,
                y: 50,
                stagger: 0.2,
                ease: "circ.out",
                scrollTrigger: {
                    trigger: subRef.current,
                    start: "top 80%",
                }
            });
        }

        if (subRef2.current) {
            gsap.from(subRef2.current.children, {
                duration: 1,
                opacity: 0,
                y: 50,
                stagger: 0.2,
                ease: "circ.out",
                scrollTrigger: {
                    trigger: subRef2.current,
                    start: "top 80%",
                }
            });
        }

        if (ProjectRef.current) {
            gsap.from(ProjectRef.current.children, {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ProjectRef.current,
                    start: "top 80%",
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    const handleMouseEnter = (index) => {
        if (window.innerWidth < 768) return; // Disable hover effect on mobile
        setCurrentIndex(index);

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",

        });
    };
    const handleMouseLeave = (index) => {
        if (window.innerWidth < 768) return; // Disable hover effect on mobile
        setCurrentIndex(null);

        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",

        });
    };

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return; // Disable hover effect on mobile
        mouse.current.x = e.clientX + 24;
        mouse.current.y = e.clientY + 24;
        moveX.current(mouse.current.x);
        moveY.current(mouse.current.y);
    };

    return (
        <section id="works" className='relative z-10 min-h-screen flex flex-col'>

            {/* Heading */}
            <div ref={headingRef} className='p-5 pl-2 pb-0 md:p-10 md:pb-1'>
                <p className='text-1xl md:tracking-[15px] tracking-widest text-center pb-5 font-lighter'>
                    Building Immersive Experiences
                </p>
                <h1 className='inline-block text-center w-full md:text-end text-2xl md:text-8xl font-bold'>
                    Works & Projects
                </h1>
            </div>

            {/* Line */}
            <div ref={Lineref} className='bg-orange-500 h-0.5 md:mt-2' />

            {/* Desktop Description */}
            <div
                ref={subRef}
                className='hidden lg:block text-end mt-5 md:mt-10 px-5 md:px-10 md:text-xl font-light tracking-wide text-gray-500'
            >
                <p>A curated collection of my game development and creative projects.</p>
                <p>Blending 3D design, interactive systems, and immersive gameplay experiences in Unreal Engine.</p>
                <p>Alongside game development, I have worked on VLSI design projects using Cadence Virtuoso.</p>
                <p>Each project reflects my creativity, technical skill, and passion for building innovative digital and hardware solutions.</p>
            </div>

            {/* Mobile Description */}
            <div
                ref={subRef2}
                className='text-end m-5 text-[0.7rem] md:text-sm text-gray-500 md:hidden'
            >
                <p>Game development and creative projects.</p>
                <p>3D design and immersive Unreal Engine experiences.</p>
                <p>VLSI design with Cadence Virtuoso.</p>
                <p>Focused on creativity and technical excellence.</p>
            </div>

            {/* Project Boxes */}
            <div ref={ProjectRef} className='flex flex-col relative md:flex-row' onMouseMove={handleMouseMove}>

                {/* Blender Box */}
                <div className=' w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        Blender
                    </h1>
                    <div className='scroll-container'>

                        {BlenderProjects.map((project, index) => (
                            <div key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                                <div
                                    className='flex justify-between items-center px-6 py-4 mb-3 bg-gray-200 rounded-lg cursor-pointer group hover:bg-gray-800 transition-all duration-300 hover:scale-105'
                                >
                                    <h2 className='lg:text-[32px] text-[26px] leading-none group-hover:text-white transition'>
                                        {project.name}
                                    </h2>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Icon
                                            icon="ion:arrow-up-right-box-outline"
                                            className='text-orange-500'
                                            width="30"
                                            height="30"
                                        />
                                    </a>
                                </div>
                                {/* mobile preview images */}
                                <div className='relative items-center justify-center flex px-10 md:hidden h-auto py-5 bg-gray-200 mb-5 rounded-lg'>
                                    <img src={project.image}
                                        alt={project.name}
                                        className="rounded-lg w-full" />
                                </div>
                            </div>
                        ))}
                        {/* desktop floating preview images */}

                    </div>
                </div>

                {/* Unreal Box */}
                <div className='w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        Unreal Engine
                    </h1>
                    <p className='my-5'>Currently Working on a sci-fi action game. Here are some demo video links</p>
                    <div className='scroll-container'>
                        {UnrealProjects.map((project, index) => (
                            <div key={index} className='px-6 py-4 mb-3 bg-gray-200 rounded-lg cursor-pointer group hover:bg-gray-800 transition-all duration-300 hover:scale-105'>
                                <a
                                    href={project.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='flex justify-between items-center'
                                >
                                    <h2 className='lg:text-[32px] text-[26px] leading-none group-hover:text-white transition'>
                                        {project.name}
                                    </h2>
                                    <Icon
                                        icon="ion:arrow-up-right-box-outline"
                                        className='text-orange-500'
                                        width="30"
                                        height="30"
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* VLSI Box */}
                <div className='w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        VLSI
                    </h1>
                    <p>
                        Currently working on a high gain amplifier using cmos.<br />
                        I will update it as soon as it is published.
                    </p>
                    <div className="flex justify-center mt-40">
                        <Icon
                            icon="line-md:download-outline"
                            width="128"
                            height="128"
                            className="text-orange-500"
                        />
                    </div>
                </div>

            </div>
            <div ref={previewRef} className='fixed -top-2/4 left-0 z-50 overflow-hidden border-2 border-orange-500 rounded-2xl pointer-events-none w-240 md:block hidden opacity-0'>
                {CurrentIndex !== null && (
                    <img src={BlenderProjects[CurrentIndex].image} alt="Preview" className='object-cover h-full w-full' />
                )}
            </div>
        </section>
    );
};

export default Works;