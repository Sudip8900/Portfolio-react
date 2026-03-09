import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react'
import { experience } from '../constants';
import { Icon } from '@iconify/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {

    const sectionRef = useRef(null);
    const headinRef = useRef(null);
    const lineRef = useRef(null);
    const GridRef = useRef(null);

    useGSAP(() => {

        gsap.from(headinRef.current.children, {
            y: 50,
            opacity: 0,
            stagger: 0.5,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: headinRef.current,
                start: "top 80%",
            }
        });

        gsap.from(lineRef.current, {
            width: 0,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: lineRef.current,
                start: "top 80%",
            }
        });

        const cards = gsap.utils.toArray(GridRef.current);

        gsap.from(cards, {
            y: 80,
            opacity: 0,
            stagger: 0.25,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: GridRef.current,
                start: "top 70%",
            }
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className='min-h-screen'>
            <div>
                <div ref={headinRef}>
                    <h2 className="text-1xl font-light text-center text-orange-500 pt-10 uppercase tracking-widest md:text-3xl md:tracking-[30px]">My Professional Journey</h2>
                    <h1 className="text-4xl font-bold text-center md:text-start md:text-[6rem] md:mx-10">Experience</h1>
                </div>

                <div ref={lineRef} className="w-full border-orange-500 border-t-2 rounded-t-[25px]" />

                <div className='flex flex-row justify-between mr-5'>

                    <div ref={GridRef} className="grid grid-cols-3 gap-6 p-6 w-2/3">
                        {experience.map((exp) => (
                            <div
                                key={exp.id}
                                className="col-span-3 md:col-span-1 bg-gray-100 p-6 rounded-xl border border-orange-500 flex flex-col justify-between transition-all duration-300 hover:scale-105"
                            >
                                <h3 className="text-2xl font-bold text-orange-500 mb-10">{exp.role}</h3>

                                <Icon icon={exp.icon} width="60" height="60" />

                                <img
                                    src={exp.image}
                                    alt=""
                                    width={exp.width}
                                    height={exp.height}
                                />

                                <div className='mt-10'>
                                    <p className="text-[1.5rem] font-semibold">{exp.company}</p>
                                    <p className="text-gray-600">{exp.duration}</p>
                                    <p className="text-gray-500 mt-2">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-5 p-6 bg-orange-500 w-90 h-fit rounded-2xl'>
                        <h1 className='text-white font-light text-8xl'>CV</h1>

                        <a href="/Documets/Resume.pdf" target='_blank'>
                            <button className='flex flex-row justify-between w-full bg-white p-5 mt-15 rounded-4xl font-bold tracking-wider cursor-pointer transition-all duration-500 hover:scale-105'>
                                Download
                                <Icon icon="solar:download-minimalistic-bold-duotone" width="24" height="24"/>
                            </button>
                        </a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Experience