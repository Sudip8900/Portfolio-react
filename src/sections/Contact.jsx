import React, { useState } from 'react';
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
    }, []);

    return (
        <section id="contact" className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between">

            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-black to-black pointer-events-none" />

            <div className="pt-20 px-5 md:px-10 relative z-10 w-full flex-1">
                
                {/* Header */}
                <div className='flex items-center gap-4 mb-20 gsap-contact-element'>
                    <div className='w-12 h-2 bg-orange-500/50' />
                    <h1 className='text-orange-500 text-2xl md:text-5xl font-bold uppercase tracking-widest'>
                        [ SYS.COMM_LINK ]
                    </h1>
                    <div className='flex-1 h-[1px] bg-orange-500/20' />
                </div>

                <div className='flex flex-col md:flex-row gap-12 lg:gap-20 perspective-[2000px]'>

                    {/* Left Side: Terminal Form */}
                    <div className='w-full md:w-1/2 flex flex-col gsap-contact-element'>
                        <InteractiveCard>
                            <div className="bg-[#050505] border border-orange-500/30 p-4 sm:p-6 md:p-10 relative group">
                                
                                {/* Terminal Styling */}
                                <div className='absolute top-0 left-0 w-full h-8 bg-orange-500/10 border-b border-orange-500/30 flex items-center px-4'>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    </div>
                                    <p className="ml-4 text-orange-500/50 text-[10px] tracking-widest uppercase">bash // root@sudip.dev</p>
                                </div>

                                <div className="mt-8 md:mt-10">
                                    <h2 className='text-orange-500 text-sm tracking-widest uppercase mb-8'>
                                        <span className="animate-pulse mr-2">{'>'}</span> 
                                        ./initialize_contact.sh
                                    </h2>

                                    <form onSubmit={onSubmit} className='flex flex-col gap-6'>

                                        <div className='flex flex-col'>
                                            <label className='text-white/40 text-[10px] tracking-widest uppercase mb-1'>[ ID.NAME ]</label>
                                            <div className="relative group/input">
                                                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-orange-500/30 group-hover/input:bg-orange-500 transition-colors" />
                                                <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-500 focus-within:w-full z-10" />
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500">{'>'}</span>
                                                <input
                                                    type="text"
                                                    className='w-full bg-transparent h-10 pl-6 text-white placeholder:text-white/20 focus:outline-none transition-all'
                                                    placeholder='Enter target designation...'
                                                    name='name'
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-white/40 text-[10px] tracking-widest uppercase mb-1'>[ ID.EMAIL ]</label>
                                            <div className="relative group/input">
                                                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-orange-500/30 group-hover/input:bg-orange-500 transition-colors" />
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500">{'>'}</span>
                                                <input
                                                    type="email"
                                                    className='w-full bg-transparent h-10 pl-6 text-white placeholder:text-white/20 focus:outline-none transition-all'
                                                    placeholder='Enter return address...'
                                                    name='email'
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label className='text-white/40 text-[10px] tracking-widest uppercase mb-1'>[ DATA.PAYLOAD ]</label>
                                            <div className="relative group/input mt-2 border border-orange-500/20 group-hover/input:border-orange-500/50 bg-white/5 p-4">
                                                <span className="absolute left-4 top-4 text-orange-500">{'>'}</span>
                                                <textarea
                                                    name="message"
                                                    placeholder='Construct message payload here...'
                                                    className='w-full bg-transparent h-24 pl-6 text-white placeholder:text-white/20 focus:outline-none transition-all resize-none'
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className='mt-6'>
                                            <Magnetic>
                                                <button
                                                    type="submit"
                                                    disabled={isTransmitting}
                                                    className={`w-full relative flex items-center justify-center p-4 border transition-all duration-300 group/btn overflow-hidden ${isTransmitting ? 'border-green-500/50 text-green-500' : 'border-orange-500/50 text-orange-500 hover:text-white'}`}
                                                >
                                                    {!isTransmitting && <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500 ease-out z-0" />}
                                                    <span className="tracking-widest uppercase text-xs relative z-10 font-bold">
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
                        
                        <div className="text-white/40 tracking-widest uppercase text-xs mb-4 gsap-contact-element flex flex-col gap-2 border-l-2 border-orange-500/30 pl-4">
                            <p>// Awaiting external connection</p>
                            <p>// Direct communication channels open</p>
                            <p>// Establish uplink below</p>
                        </div>

                        {/* Direct Contacts */}
                        <div className="flex flex-col gap-4">
                            <InteractiveCard className="gsap-contact-element">
                                <a href="mailto:iamsudippan@gmail.com" className="block bg-[#050505] border border-orange-500/20 p-6 relative group hover:border-orange-500/50 transition-colors overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-50 transition-opacity">
                                        <Icon icon="carbon:email" width="60" height="60" className="text-orange-500" />
                                    </div>
                                    <h2 className="text-orange-500/50 text-[10px] tracking-widest uppercase mb-2">[ UPLINK.EMAIL ]</h2>
                                    <p className='text-white tracking-widest uppercase text-sm md:text-base font-bold group-hover:text-orange-500 transition-colors'>
                                        iamsudippan@gmail.com
                                    </p>
                                </a>
                            </InteractiveCard>

                            <InteractiveCard className="gsap-contact-element">
                                <a href="tel:+918900359269" className="block bg-[#050505] border border-orange-500/20 p-6 relative group hover:border-orange-500/50 transition-colors overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-50 transition-opacity">
                                        <Icon icon="carbon:phone" width="60" height="60" className="text-orange-500" />
                                    </div>
                                    <h2 className="text-orange-500/50 text-[10px] tracking-widest uppercase mb-2">[ UPLINK.PHONE ]</h2>
                                    <p className='text-white tracking-widest uppercase text-sm md:text-base font-bold group-hover:text-orange-500 transition-colors'>
                                        +91 8900359269
                                    </p>
                                </a>
                            </InteractiveCard>
                        </div>

                        {/* Social Grid */}
                        <div className='mt-8 gsap-contact-element'>
                            <div className="flex items-center gap-4 mb-6">
                                <div className='w-4 h-[1px] bg-orange-500/50' />
                                <h2 className="text-orange-500 text-xs tracking-widest uppercase">[ NETWORK.NODES ]</h2>
                                <div className='flex-1 h-[1px] bg-orange-500/20' />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                {socials.map((social, index) => (
                                    <InteractiveCard key={index}>
                                        <Magnetic>
                                            <a
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='flex items-center justify-center bg-white/5 border border-orange-500/20 p-4 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 group'
                                            >
                                                <span className='text-[10px] tracking-widest uppercase text-white/60 group-hover:text-black font-bold group-hover:drop-shadow-none drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]'>
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
            <div className="mt-20 border-t border-orange-500/20 bg-[#050505]">
                <Marque
                    items={items}
                    className='text-white'
                    iconName='carbon:connection-signal'
                    iconClassname='text-orange-500'
                />
            </div>

        </section>
    );
};

export default Contact;
