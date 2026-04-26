import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../constants';
import Marque from '../componnts/Marque';
import Magnetic from '../componnts/Magnetic.jsx';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

    const headinRef = useRef(null);
    const lineRef = useRef(null);
    const SubRef = useRef(null);
    const lineRef2 = useRef(null);
    const FormRef = useRef(null);

    const buttonRef = useRef(null);
    const buttonTextRef = useRef(null);
    const iconRef = useRef(null);

    const items = [
        "just imagine, I'll make it real",
        "let's turn your vision into reality",
        "your ideas, my skills, our creation",
        "bringing your dreams to life",
        "let's create something extraordinary",
        "your vision, my expertise, our masterpiece",
        "turning your ideas into digital reality",
        "let's innovate and create together",
        "your imagination, my skills, our success"
    ];

    const [result, setResult] = useState("");
    const [success, setSuccess] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");

        const formData = new FormData(event.target);
        formData.append("access_key", "2fcf6229-254a-4530-a10a-814ba24bd93e");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            setResult("Form Submitted Successfully");
            setSuccess(true);
            event.target.reset();

            const tl = gsap.timeline();

            tl.to(buttonRef.current, {
                backgroundColor: "#16a34a",
                borderRadius: "50px",
                width: "50px",
                height: "50px",
                duration: 0.4
            })
                .to(buttonTextRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3
                }, "<")
                .fromTo(
                    iconRef.current,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.3 },
                    "-=0.1"
                )

                // wait before resetting
                .to({}, { duration: 2 })

                // hide icon
                .to(iconRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3
                })

                // restore text
                .to(buttonTextRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                }, "<+0.5")

                // restore button color
                .to(buttonRef.current, {
                    backgroundColor: "#ea580c",
                    borderRadius: "25px",
                    width: "240px",
                    height: "72px",
                    duration: 0.3
                }, "<");

        } else {
            setResult("Error");
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 60%",
            }
        });

        tl.from(headinRef.current.children, {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
        })
        .from(lineRef.current, {
            xPercent: 100,
            opacity: 0,
            duration: 0.8,
        }, "-=0.4")
        .from(SubRef.current.children, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
        }, "-=0.4")
        .from(lineRef2.current, {
            height: 0,
            opacity: 0,
            duration: 0.8,
        }, "-=0.6")
        .from(FormRef.current.querySelectorAll("h2, .input-box"), {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
        }, "-=0.4")
        .from(".social-link", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
        }, "-=0.6");

    }, []);

    return (
        <section id="contact" className="flex flex-col justify-between min-h-screen bg-gray-100 dark:bg-black transition-colors duration-500">

            <div>
                <div ref={headinRef}>
                    <h2 className="text-1xl font-light text-center text-orange-500 pt-10 uppercase tracking-widest md:text-3xl md:tracking-[30px]">
                        You dream it, I build it
                    </h2>

                    <h1 className="text-4xl font-bold text-center text-black dark:text-white transition-colors duration-500 md:text-end md:text-[6rem] md:mx-10">
                        Contact Me
                    </h1>
                </div>

                <div ref={lineRef} className="w-full border-orange-500 border-t-2 rounded-t-[25px]" />
            </div>

            <div className='flex flex-col md:flex-row gap-5'>

                <div className='w-full md:w-1/2 flex flex-col'>

                    <form ref={FormRef} onSubmit={onSubmit} className='p-5 text-center'>

                        <h2 className='text-orange-500 text-4xl text-center'>Catch Me</h2>

                        <div className='input-box flex flex-col m-5'>
                            <label className='text-black dark:text-white transition-colors duration-500 mb-5'>Full Name</label>
                            <input
                                type="text"
                                className='field bg-black/5 dark:bg-white/10 h-15 placeholder:text-black/60 dark:placeholder:text-white/60 border-orange-500 border rounded-[25px] p-5 text-black dark:text-white transition-colors duration-500'
                                placeholder='Enter Your Name'
                                name='name'
                                required
                            />
                        </div>

                        <div className='input-box flex flex-col m-5'>
                            <label className='text-black dark:text-white transition-colors duration-500 mb-5'>Email Address</label>
                            <input
                                type="email"
                                className='field bg-black/5 dark:bg-white/10 h-15 placeholder:text-black/60 dark:placeholder:text-white/60 border-orange-500 border rounded-[25px] p-5 text-black dark:text-white transition-colors duration-500'
                                placeholder='Enter Your Email'
                                name='email'
                                required
                            />
                        </div>

                        <div className='input-box flex flex-col m-5'>
                            <label className='text-black dark:text-white transition-colors duration-500 mb-5'>Message</label>
                            <textarea
                                name="message"
                                placeholder='Message'
                                className='bg-black/5 dark:bg-white/10 field mess placeholder:text-black/60 dark:placeholder:text-white/60 border-orange-500 border rounded-[20px] p-5 text-black dark:text-white transition-colors duration-500'
                                required
                            ></textarea>
                        </div>

                        <div className='input-box justify-center flex'>
                            <Magnetic>
                                <div className="block">
                                    <button
                                        ref={buttonRef}
                                        type="submit"
                                        className='relative flex items-center justify-center text-white bg-orange-600 p-5 rounded-[25px] text-[1.1rem] cursor-pointer transition-all duration-500 hover:scale-105 h-18 w-60'
                                    >

                                        <span ref={buttonTextRef}>
                                            Send Message
                                        </span>

                                        <span
                                            ref={iconRef}
                                            className="absolute opacity-0 text-2xl"
                                        >
                                            ✓
                                        </span>

                                    </button>
                                </div>
                            </Magnetic>
                        </div>

                    </form>

                </div>

                <div ref={lineRef2} className='bg-orange-500 w-0.5 h-150 md:block hidden' />
                <div className='border-t border-orange-500 w-[90%] mx-auto my-10 md:hidden' />

                <div className='flex flex-col w-full md:w-1/2'>

                    <div
                        ref={SubRef}
                        className="text-black/80 dark:text-white/80 transition-colors duration-500 text-end mx-5 mt-1 mb-10 md:mx-10 md:text-2xl gap-y-1 md:gap-y-2 flex flex-col items-end"
                    >
                        <p>Got a question, how or project idea?</p>
                        <p>I would love to hear from you and</p>
                        <p>discuss further!</p>
                    </div>

                    <div className='flex px-10 text-black dark:text-white transition-colors duration-500 uppercase lg:text-[32px] text-[26px] leading-none mb-10'>

                        <div className='flex flex-col w-full gap-10 md:text-end'>

                            <div className='social-link'>
                                <h2>E-mail</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />
                                <p className='text-xl text-black/80 dark:text-white/80 transition-colors duration-500 lowercase md:text-2xl lg:text-3xl'>
                                    iamsudippan@gmail.com
                                </p>
                            </div>

                            <div className='social-link'>
                                <h2>Phone</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />
                                <p className='text-xl text-black/80 dark:text-white/80 transition-colors duration-500 lowercase md:text-2xl lg:text-3xl'>
                                    +91 8900359269
                                </p>
                            </div>

                            <div className='social-link'>
                                <h2>Social Media</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />

                                <div className='flex flex-wrap gap-2 md:gap-10'>
                                    {socials.map((social, index) => (
                                        <Magnetic key={index}>
                                            <div className="inline-block relative">
                                                <a
                                                    href={social.href}
                                                    target="_blank"
                                                    className='text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-orange-500 transition-colors duration-300'
                                                >
                                                    {social.name}
                                                </a>
                                            </div>
                                        </Magnetic>
                                    ))}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Marque
                items={items}
                className='border-orange-500 text-orange-500 bg-transparent border-t'
                iconName='solar:gameboy-broken'
            />

        </section>
    )
}

export default Contact