import { useEffect, useRef, useState } from 'react';
import AutoType from '../componnts/autotype.jsx';
import AnimatedTextSlide from '../componnts/animatedTextSlide.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Helmet } from '../componnts/helmet';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-scroll';
import Magnetic from '../componnts/Magnetic.jsx';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const hero = () => {
    const contextRef = useRef(null);
    const headerRef = useRef(null);
    const AboutText = "> SYSTEM_USER: ";
    const Name = "SUDIP PAN";
    const ImageRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 853 });
    const SocialRef = useRef(null);
    const hireRef = useRef(null);
    const [showSocial, setShowSocial] = useState(true);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Context reveal
        tl.from(contextRef.current, {
            duration: 1,
            opacity: 0,
            y: "10vh",
            ease: "circ.out",
        });

        // Header lines staggered
        tl.from(headerRef.current.children, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "circ.out",
            stagger: 0.2,
        }, "<0.5");

        // Background image
        tl.from(ImageRef.current, {
            scale: 1.2,
            opacity: 0,
            duration: 1.5,
            ease: "circ.out",
        }, "<");

        // Social icons
        tl.from(SocialRef.current, {
            duration: 1,
            opacity: 0,
            x: 50,
            ease: "circ.out",
        }, "<-0.2");

        // Hire button
        tl.from(hireRef.current, {
            duration: 1,
            opacity: 0,
            y: 50,
            ease: "bounce.out",
        }, "<+0.5");

    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowSocial(currentScrollY <= lastScrollY || currentScrollY < 200);
            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="home" className="flex flex-col justify-end min-h-screen relative bg-[#050505] overflow-hidden text-white">

            {/* Background Image & Grid Overlay */}
            <figure className='absolute inset-0 z-0 pointer-events-none' style={{ width: "100%", height: "100vh" }}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,105,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,105,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-black/80 to-black z-10" />
                <img ref={ImageRef}
                    src="/Images/Background.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                />

                <Canvas shadows camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }} className="z-20 absolute inset-0">
                    <ambientLight intensity={1.5} />
                    <Environment resolution={256}>
                        <group rotation={[-Math.PI / 3, 4, 1]}>
                            <Lightformer form={"circle"} intensity={5} color="#ff6a00" position={[0, 5, -9]} scale={10} />
                            <Lightformer form={"circle"} intensity={3} color="#ffffff" position={[0, 3, 1]} scale={10} />
                            <Lightformer form={"circle"} intensity={4} color="#ff6a00" position={[-5, -1, -1]} scale={10} />
                            <Lightformer form={"circle"} intensity={2} color="#ffffff" position={[10, 1, 0]} scale={16} />
                        </group>
                    </Environment>
                    <Float speed={0.5}>
                        <Helmet position={isMobile ? [0, -2.3, 0] : [1.5, -3.6, 0.5]} shadows scale={isMobile ? 0.7 : 1.1} />
                    </Float>
                </Canvas>
            </figure>

            <div ref={contextRef} className="relative z-30 pointer-events-none w-full">
                <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                    <div ref={headerRef} className='flex flex-col justify-center gap-4 md:gap-10 pt-24 md:pt-16 pb-10'>
                        <div className="flex items-center gap-2 md:gap-4 ml-4 md:ml-10">
                            <div className='w-6 md:w-12 h-1 bg-orange-500 animate-pulse' />
                            <AnimatedTextSlide text={AboutText} className='text-sm sm:text-xl md:text-2xl tracking-widest uppercase text-orange-500' />
                        </div>
                        <div style={{ WebkitTextStroke: '2px white', filter: 'drop-shadow(0 0 10px rgba(255,105,0,0.8))' }}>
                            <AnimatedTextSlide text={Name} className='text-[clamp(3.5rem,12vw,8rem)] ml-4 md:ml-10 font-bold tracking-tighter text-transparent leading-none' />
                        </div>
                    </div>
                </div>

                <div className='relative transition-colors duration-500 mt-5'>
                    <div className='absolute inset-x-0 border-t border-t-orange-500/30' />
                    <div className='py-8 px-6 md:py-12 md:px-10 bg-[#0a0a0a]/80 backdrop-blur-sm transition-colors duration-500 border-b border-orange-500/10'>
                        <div className='text-start md:text-end max-w-7xl ml-auto'>
                            <AutoType
                                subTitle={"I am a passionate "}
                                text={["Game Developer", "Game Designer", "Level Designer", "UE5 Enthusiast", "Electronics Engineer"]}
                                Ntextcolor="text-white/60 tracking-widest uppercase"
                                AnimTextcolor="text-orange-500 font-bold uppercase tracking-widest"
                                NtextSize="text-[clamp(0.7rem,2.5vw,1.25rem)]"
                                AnimTextSize="text-[clamp(1rem,4vw,2.25rem)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Icons - Sci-Fi style */}
            <div ref={SocialRef} style={showSocial ? { transform: "translateX(0)", opacity: "1", transition: "all 0.4s" } : { transform: "translateX(50px)", opacity: "0", transition: "all 0.4s" }} className='absolute mb-auto top-1/2 -translate-y-1/2 right-2 md:right-8 mx-auto h-auto w-auto justify-center flex flex-col align-middle gap-y-4 md:gap-y-6 p-2 z-40 pointer-events-auto'>
                <div className="flex flex-col items-center gap-3 md:gap-4 border-r border-orange-500/30 pr-2 md:pr-4 scale-90 md:scale-100 origin-right">
                    <Magnetic>
                        <a href="https://www.instagram.com/sudip_pan00/" target='_blank' className='w-10 h-10 border border-orange-500/20 bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-orange-500 hover:border-orange-500 transition-all duration-300'>
                            <Icon icon="mdi:instagram" width="24" height="24" />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target='_blank' className='w-10 h-10 border border-orange-500/20 bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-orange-500 hover:border-orange-500 transition-all duration-300'>
                            <Icon icon="mdi:linkedin" width="24" height="24" />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://github.com/Sudip8900" target='_blank' className='w-10 h-10 border border-orange-500/20 bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-orange-500 hover:border-orange-500 transition-all duration-300'>
                            <Icon icon="mdi:github" width="24" height="24" />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://www.facebook.com/sudip.pan.792/" target='_blank' className='w-10 h-10 border border-orange-500/20 bg-[#0a0a0a]/80 flex items-center justify-center text-white/50 hover:text-orange-500 hover:border-orange-500 transition-all duration-300'>
                            <Icon icon="mdi:facebook" width="24" height="24" />
                        </a>
                    </Magnetic>
                </div>

                <div className='relative z-50 md:hidden mt-4'>
                    <Link to="contact" smooth={true} duration={600} offset={-50}>
                        <button className='w-10 h-10 border border-orange-500/50 bg-[#0a0a0a]/80 flex items-center justify-center text-orange-500'>
                            <Icon icon="mdi:email-outline" width="20" height="20" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Hire Button - Sci-Fi style */}
            <div ref={hireRef} className='hidden md:flex absolute bottom-10 left-10 z-40 pointer-events-auto'>
                <Magnetic>
                    <div className="inline-block relative">
                        <Link to="contact" smooth={true} duration={600} offset={-50} className='block w-full h-full'>
                            <button className='bg-[#0a0a0a]/80 text-lg text-orange-500 border border-orange-500/30 border-l-4 border-l-orange-500 cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black px-8 py-4 tracking-widest uppercase flex items-center gap-3 group'>
                                Get In Touch
                                <span className="text-orange-500 group-hover:text-black transition-colors font-bold">{'>'}</span>
                            </button>
                        </Link>
                    </div>
                </Magnetic>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-40 text-orange-500 pointer-events-none opacity-80">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-4 border-l-2 border-y-2 border-orange-500/50 opacity-70"></div>
                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500">
                        SYS.SCROLL
                    </span>
                    <div className="w-2 h-4 border-r-2 border-y-2 border-orange-500/50 opacity-70"></div>
                </div>
                <div className="w-[1px] h-8 md:h-12 bg-orange-500/20 relative overflow-hidden">
                    <div className="w-full h-full bg-orange-500 animate-[dropLine_2s_ease-in-out_infinite]" />
                </div>
            </div>
        </section>
    )
}

export default hero;