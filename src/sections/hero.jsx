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

gsap.registerPlugin(ScrollTrigger);


const hero = () => {
    const contextRef = useRef(null);
    const headerRef = useRef(null);
    const AboutText = "Hi, I'm ";
    const Name = "Sudip Pan";
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
            y: "50vh",
            ease: "circ.out",
        });

        // Header lines staggered
        tl.from(headerRef.current.children, {
            duration: 1,
            opacity: 0,
            y: 150,
            ease: "circ.out",
            stagger: 0.4,
        }, "<0.5");

        // Background image
        tl.from(ImageRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: "circ.out",
        }, "<");

        // Social icons
        tl.from(SocialRef.current, {
            duration: 1,
            opacity: 0,
            x: window.innerWidth,
            ease: "circ.out",
        }, "<-0.5");

        // Hire button
        tl.from(hireRef.current, {
            duration: 1,
            opacity: 0,
            scale: 0,
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
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section id="home" className="flex flex-col justify-end min-h-screen">
            <div ref={contextRef}>
                <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                    <div ref={headerRef} className='flex flex-col justify-center gap-6 pt-16 md:gap-12'>
                        <AnimatedTextSlide text={AboutText} className='ml-5 text-2xl md:ml-10 md:text-4xl font-light tracking-[0.5rem] uppercase' />
                        <AnimatedTextSlide text={Name} className='text-5xl ml-5 md:text-9xl md:ml-10  font-bold ' />
                    </div>
                </div>
                <div className='relative text-black'>
                    <div className='absolute inset-x-0 border-t-2 border-t-orange-500' />
                    <div className='py-12 px-10 bg-white z-50'>
                        <div className='text-end'>
                            <AutoType subTitle={"I am a passonate "} text={["Game Developer", "Game Designer", "Level Designer", "UE5 Enthusiast", "Electronics Engineer"]} Ntextcolor="text-black" AnimTextcolor="text-orange-500" NtextSize="text-1xl md:text-2xl" AnimTextSize="text-[1.5rem] md:text-[4rem]" />
                        </div>

                    </div>
                </div>
            </div>
            <figure className='absolute inset-0 -z-50' style={{ width: "100vw", height: "100vh" }}>
                {/* Background Image */}
                <img ref={ImageRef}
                    src="/Images/Background.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 -z-50"
                />
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}>
                    <ambientLight intensity={2} />
                    <Environment resolution={256}>
                        <group rotation={[-Math.PI / 3, 4, 1]}>
                            <Lightformer form={"circle"} intensity={4} position={[0, 5, -9]} scale={10} />
                            <Lightformer form={"circle"} intensity={4} position={[0, 3, 1]} scale={10} />
                            <Lightformer form={"circle"} intensity={4} position={[-5, -1, -1]} scale={10} />
                            <Lightformer form={"circle"} intensity={4} position={[10, 1, 0]} scale={16} />
                        </group>
                    </Environment>
                    <Float speed={0.5}>
                        <Helmet position={isMobile ? [0, -2.3, 0] : [0, -3.6, 0]} shadows scale={isMobile ? 0.7 : 1.1} />
                    </Float>

                </Canvas>
            </figure>
            <div ref={SocialRef} style={showSocial ? { transform: "translateX(0)", opacity: "1", transition: "all, 0.4s" } : { transform: "translateX(50px)", opacity: "0", transition: "all, 0.4s " }} className='absolute mb-auto top-70 right-3 mx-auto h-auto w-auto justify-center flex flex-col align-middle gap-y-5 p-2 z-40 md:gap-y-10'>
                <div className='bg-orange-500 p-2 rounded-full transition-all duration-300 hover:scale-105'>
                    <a href="https://www.instagram.com/sudip_pan00/" target='_blank'><img src="/Images/instagram-brands-solid.png" alt="Insta" className='w-8 md:w-12 cursor-pointer mb-2 md:mb-5 hover:rounded-full hover:bg-white' /></a>
                    <a href="https://www.linkedin.com/in/sudip-pan-7a3946253" target='_blank'><img src="/Images/linkedin-brands-solid.png" alt="Insta" className='w-8 cursor-pointer md:w-12 mb-2 md:mb-5 hover:rounded-full hover:bg-white' /></a>
                    <a href="https://github.com/Sudip8900" target='_blank'><img src="/Images/github-brands-solid.png" alt="Insta" className='w-8 cursor-pointer md:w-12 mb-2 md:mb-5 hover:rounded-full hover:bg-white' /></a>
                    <a href="https://www.facebook.com/sudip.pan.792/" target='_blank'><img src="/Images/facebook-brands-solid.png" alt="Insta" className='w-8 cursor-pointer md:w-12 hover:rounded-full hover:bg-white' /></a>
                </div>
                <div className='relative z-50 md:hidden'>
                    <Link to="contact" smooth={true} duration={600} offset={-50}><button className='bg-orange-500 p-2 rounded-full'><img width="30" src="https://img.icons8.com/pulsar-line/48/hire-me.png" alt="hire-me" /></button></Link>
                </div>
            </div>
            <div ref={hireRef} className=' hidden md:flex absolute mb-10 ml-10'>
                <Link to="contact" smooth={true} duration={600} offset={-50}><button className='bg-orange-500 p-5 text-2xl text-white rounded-[25px] cursor-pointer transition-all duration-300 hover:scale-105'>Get In Touch {">"} </button></Link>
            </div>
        </section>
    )
}

export default hero