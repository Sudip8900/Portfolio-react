import { useRef } from 'react';
import AutoType from './autotype';
import AnimatedTextSlide from '../componnts/animatedTextSlide.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Helmet } from '../componnts/helmet';
import { Circle, Environment, Float, Lightformer } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';



const hero = () => {
    const contextRef = useRef(null);
    const headerRef = useRef(null);
    const AboutText = "Hi, I'm ";
    const Name = "Sudip Pan";
    const ImageRef = useRef(null);
    const isMobile = useMediaQuery({maxWidth: 853});

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from(contextRef.current, {
            duration: 1,
            opacity: 0,
            y: "50vh",
            ease: "circ.out",
        });
        tl.from(headerRef.current, {
            duration: 1,
            opacity: 0,
            y: "200",
            ease: "circ.out",
        }, "<0.5").from(ImageRef.current, {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: "circ.out",
        }, "<");
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
                        <div ref={headerRef} className='text-end'>
                            <AutoType />
                        </div>

                    </div>
                </div>
            </div>
            <figure className='absolute inset-0 -z-50' style={{ width: "100vw", height: "100vh" }}>
                {/* Background Image */}
                <img ref={ImageRef}
                    src="Images/Background.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50 -z-50"
                />
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}>
                    <ambientLight intensity={2} />
                    <Environment resolution={256}>
                        <group rotation={[-Math.PI / 3, 4, 1]}>
                            <Lightformer form={"circle"} intensity={4} position={[0, 5, -9]} scale={10}/>
                            <Lightformer form={"circle"} intensity={4} position={[0, 3,  1]} scale={10}/>
                            <Lightformer form={"circle"} intensity={4} position={[-5, -1, -1]} scale={10}/>
                            <Lightformer form={"circle"} intensity={4} position={[10, 1, 0]} scale={16}/>
                        </group>
                    </Environment>
                    <Float speed={0.5}>
                        <Helmet position={isMobile? [0, -2.3, 0] : [0, -3.6, 0]} shadows scale={isMobile ? 0.7 : 1.1}/>
                    </Float>

                </Canvas>
            </figure>
        </section>
    )
}

export default hero