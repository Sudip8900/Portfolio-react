import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socials } from '../constants';
import Marque from '../componnts/Marque';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

    const headinRef = useRef(null);
    const lineRef = useRef(null);
    const SubRef = useRef(null);
    const items = ["just imagine, I'll make it real", "let's turn your vision into reality", "your ideas, my skills, our creation", "bringing your dreams to life", "let's create something extraordinary", "your vision, my expertise, our masterpiece", "turning your ideas into digital reality", "let's innovate and create together", "your imagination, my skills, our success"];
    const [result, setResult] = useState("");
    const lineRef2 = useRef(null);
    const FormRef = useRef(null);

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
            event.target.reset();
        } else {
            setResult("Error");
        }
    };

    useGSAP(() => {
        gsap.from(headinRef.current.children, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: headinRef.current,
                start: "top 80%",
            }
        });

        gsap.from(lineRef.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: lineRef.current,
                start: "top 80%",
            }
        });

        gsap.from(SubRef.current.children, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.3,
            duration: 1,
            scrollTrigger: {
                trigger: SubRef.current,
                start: "top 80%",
            }
        });

        gsap.from(".social-link", {
            y: 100,
            opacity: 0,
            delay: 0.5,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".social-link",
            },
        });

        gsap.from(lineRef2.current, {
            height: 0,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: lineRef2.current,
                start: "top 80%",
            }
        });

        gsap.from(FormRef.current.querySelectorAll("h2, .input-box"), {
            y: -50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: FormRef.current,
                start: "top 80%",
            }
        });
    }, []);

    return (
        <section id="contact" className="flex flex-col justify-between min-h-screen bg-black">
            <div>
                <div ref={headinRef}>
                    <h2 className="text-1xl font-light text-center text-orange-500 pt-10 uppercase tracking-widest md:text-3xl md:tracking-[30px]">You dream it, I build it</h2>
                    <h1 className="text-4xl font-bold text-center text-white md:text-start md:text-[6rem] md:mx-10">Contact Me</h1>
                </div>
                <div ref={lineRef} className="w-full border-orange-500 border-t-2 rounded-t-[25px]" />
            </div>
            <div className='flex flex-row gap-x-5'>
                <div className='md:w-1/2 md:flex md:flex-col hidden'>
                    <form ref={FormRef} onSubmit={onSubmit} className='p-5 text-center '>
                        <h2 className='text-orange-500 text-4xl text-center'>Catch Me</h2>
                        <div className='input-box flex flex-col m-5'>
                            <label className='text-white mb-5'>Full Name</label>
                            <input type="text" className='field bg-white/10 h-15 placeholder:text-white border-orange-500 border rounded-[25px] p-5 text-white' placeholder='Enter Your Name' name='name' required />
                        </div>
                        <div className='input-box flex flex-col m-5'>
                            <label className='text-white mb-5'>Email Address</label>
                            <input type="email" className='field bg-white/10 h-15 placeholder:text-white border-orange-500 border rounded-[25px] p-5 text-white' placeholder='Enter Your Email' name='email' required />
                        </div>
                        <div className='input-box flex flex-col m-5'>
                            <label className='text-white mb-5'>Message</label>
                            <textarea name="message" placeholder='Message' className='bg-white/10 field mess placeholder:text-white border-orange-500 border rounded-[20px] p-5 text-white ' required></textarea>
                        </div>
                        <div className='input-box'>
                            <button type="submit" className='text-white bg-orange-600 p-5 rounded-[25px] text-[1.1rem] cursor-pointer transition-all duration-500 hover:scale-105'>Send Mssage</button>
                        </div>
                    </form>
                </div>
                <div ref={lineRef2} className='bg-orange-500 w-0.5 h-150 md:block hidden' />
                <div className='flex flex-col w-full md:w-1/2'>
                    <div ref={SubRef} className="text-white/80 text-end mx-5 mt-1 mb-10 md:mx-10 md:text-2xl gap-y-1 md:gap-y-2 flex flex-col items-end">
                        <p>Got a question, how or project idea?</p>
                        <p>I would love to hear from you and</p>
                        <p>discuss further!</p>
                    </div>
                    <div className='flex px-10 text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10'>
                        <div className='flex flex-col w-full gap-10 md:text-end'>
                            <div className='social-link'>
                                <h2>E-mail</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />
                                <p className='text-xl text-white/80 lowercase md:text-2xl lg:text-3xl'>iamsudippan@gmail.com</p>
                            </div>
                            <div className='social-link'>
                                <h2>Phone</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />
                                <p className='text-xl text-white/80 lowercase md:text-2xl lg:text-3xl'>+91 8900359269</p>
                            </div>
                            <div className='social-link'>
                                <h2>Social Media</h2>
                                <div className='w-full h-px my-2 bg-orange-400' />
                                <div className='flex flex-wrap gap-2 md:gap-10'>
                                    {socials.map((social, index) => (<a key={index} href={social.href} target="_blank" className='text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-orange-500 transition-colors duration-300'>
                                        {social.name}
                                    </a>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Marque items={items} className='border-orange-500 text-orange-500 bg-transparent border-t' iconName='solar:gameboy-broken' />
        </section>
    )
}

export default Contact