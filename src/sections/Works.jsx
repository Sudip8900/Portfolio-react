import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlenderProjects, UnrealProjects } from '../constants';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {

    // 🔥 Preview State (Blender images / Unreal videos)
    const [currentPreview, setCurrentPreview] = useState(null);

    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const subRef = useRef(null);
    const subRef2 = useRef(null);
    const projectRef = useRef(null);
    const previewRef = useRef(null);

    const moveX = useRef(null);
    const moveY = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    // ================= GSAP Animations =================
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

        if (lineRef.current) {
            gsap.from(lineRef.current, {
                duration: 1,
                xPercent: 100,
                ease: "circ.out",
                scrollTrigger: {
                    trigger: lineRef.current,
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

        if (projectRef.current) {
            gsap.from(projectRef.current.children, {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: projectRef.current,
                    start: "top 80%",
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    // ================= Hover Logic =================
    const handleMouseEnter = (type, index) => {
        if (window.innerWidth < 768) return;

        setCurrentPreview({ type, index });

        gsap.to(previewRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        if (window.innerWidth < 768) return;

        setCurrentPreview(null);

        gsap.to(previewRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (e) => {
        if (window.innerWidth < 768) return;

        mouse.current.x = e.clientX + 24;
        mouse.current.y = e.clientY + 24;

        moveX.current(mouse.current.x);
        moveY.current(mouse.current.y);
    };

    return (
        <section id="works" className='relative z-10 min-h-screen flex flex-col'>

            {/* ================= Heading ================= */}
            <div ref={headingRef} className='p-5 pl-2 pb-0 md:p-10 md:pb-1'>
                <p className='text-1xl md:tracking-[15px] tracking-widest text-center pb-5 font-lighter'>
                    Building Immersive Experiences
                </p>
                <h1 className='inline-block text-center w-full md:text-end text-2xl md:text-8xl font-bold'>
                    Works & Projects
                </h1>
            </div>

            {/* Line */}
            <div ref={lineRef} className='bg-orange-500 h-0.5 md:mt-2' />

            {/* Desktop Description */}
            <div
                ref={subRef}
                className='hidden lg:block text-end mt-5 md:mt-10 px-5 md:px-10 md:text-xl font-light tracking-wide text-gray-500'
            >
                <p>A curated collection of my game development and creative projects.</p>
                <p>Blending 3D design, interactive systems, and immersive gameplay experiences in Unreal Engine.</p>
                <p>Alongside game development, I have worked on VLSI design projects using Cadence Virtuoso.</p>
                <p>Each project reflects creativity, technical skill, and passion for innovation.</p>
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

            {/* ================= Project Boxes ================= */}
            <div
                ref={projectRef}
                className='flex flex-col relative md:flex-row'
                onMouseMove={handleMouseMove}
            >

                {/* ===== Blender ===== */}
                <div className='w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5 scroll-container'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        Blender
                    </h1>

                    {BlenderProjects.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => handleMouseEnter("blender", index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className='flex justify-between items-center px-6 py-4 mb-3 bg-gray-200 rounded-lg cursor-pointer group hover:bg-gray-800 transition-all duration-300 hover:scale-105'>
                                <h2 className='lg:text-[32px] text-[26px] leading-none group-hover:text-white transition'>
                                    {project.name}
                                </h2>

                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <Icon icon="ion:arrow-up-right-box-outline" className='text-orange-500' width="30" height="30" />
                                </a>
                            </div>

                            {/* Mobile image */}
                            <div className='relative flex px-10 md:hidden h-auto py-5 bg-gray-200 mb-5 rounded-lg'>
                                <img src={project.image} alt={project.name} className="rounded-lg w-full" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== Unreal ===== */}
                <div className='w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5 scroll-container'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        Unreal Engine
                    </h1>

                    <p className='my-5'>Currently working on a sci-fi action game. Demo previews below.</p>

                    {UnrealProjects.map((project, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => handleMouseEnter("unreal", index)}
                            onMouseLeave={handleMouseLeave}
                            className='px-6 py-4 mb-3 bg-gray-200 rounded-lg cursor-pointer group hover:bg-gray-800 transition-all duration-300 hover:scale-105'
                        >
                            <a
                                href={project.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex justify-between items-center'
                            >
                                <h2 className='lg:text-[32px] text-[26px] leading-none group-hover:text-white transition'>
                                    {project.name}
                                </h2>

                                <Icon icon="ion:arrow-up-right-box-outline" className='text-orange-500' width="30" height="30" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* ===== VLSI ===== */}
                <div className='w-auto md:w-1/3 h-150 overflow-y-auto bg-gray-300 m-5 rounded-lg p-5'>
                    <h1 className='text-center font-bold text-orange-500 text-[1.5rem] mb-5'>
                        VLSI
                    </h1>
                    <p>
                        Currently working on a high gain CMOS amplifier.<br />
                        Updates coming soon.
                    </p>
                </div>
            </div>

            {/* ================= Floating Preview ================= */}
            <div
                ref={previewRef}
                className='fixed -top-2/4 left-0 z-50 overflow-hidden border-2 border-orange-500 rounded-2xl pointer-events-none w-240 md:block hidden opacity-0 bg-black'
            >
                {currentPreview && currentPreview.type === "blender" && (
                    <img
                        src={BlenderProjects[currentPreview.index].image}
                        alt="Preview"
                        className='object-cover h-full w-full'
                    />
                )}

                {currentPreview && currentPreview.type === "unreal" && (
                    <video
                        src={UnrealProjects[currentPreview.index].video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover h-full w-full"
                    />
                )}
            </div>

        </section>
    );
};

export default Works;