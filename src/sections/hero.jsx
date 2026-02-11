import { useRef } from 'react';
import AutoType from './autotype';
import AnimatedTextSlide from '../componnts/animatedTextSlide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Helmet } from '../componnts/helmet';


const hero = () => {
    const contextRef = useRef(null);
    const headerRef = useRef(null);
    const AboutText = "Hi, I'm ";
    const Name = "Sudip Pan";
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
        }, "<0.5")
    }, []);
    return (
        <section id="home" className="flex flex-col justify-end min-h-screen">
            <div ref={contextRef}>
                <div style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)" }}>
                    <div ref={headerRef} className='flex flex-col justify-center gap-6 pt-16 md:gap-12'>
                        <AnimatedTextSlide text={AboutText} className='ml-5 text-2xl md:ml-10 md:text-4xl font-light tracking-[0.5rem] uppercase' />
                        <AnimatedTextSlide text={Name} className='text-5xl ml-5 md:text-9xl md:ml-10  font-bold text-black' />
                    </div>
                </div>
                <div className='relative text-black'>
                    <div className='absolute inset-x-0 border-t-2' />
                    <div className='py-12 px-10 text-end bg-white z-50'>
                        <AutoType />
                    </div>
                </div>
            </div>
            <figure className='absolute inset-0 -z-50' style={{ width: "100vw", height: "100vh" }}>
                {/* Background Image */}
                <img
                    src="/Images/Background.jpg"
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <Canvas shadows camera={{ position: [0, 0, 10], fov: 17.5, near: 1, far: 20 }}>

                    {/* Soft ambient fill */}
                    <ambientLight intensity={0.4} />

                    {/* FRONT light */}
                    <directionalLight
                        position={[5, 0, 5]}
                        intensity={1.5}
                        castShadow
                    />

                    {/* BACK light (rim light) */}
                    <directionalLight
                        position={[-5, 0, -5]}
                        intensity={1.2}
                    />

                    {/* LEFT light */}
                    <directionalLight
                        position={[-5, 0, 5]}
                        intensity={1.2}
                    />

                    {/* RIGHT light */}
                    <directionalLight
                        position={[5, 0, -5]}
                        intensity={1.2}
                    />

                    {/* TOP light */}
                    <directionalLight
                        position={[0, 5, 0]}
                        intensity={1.5}
                    />

                    {/* BOTTOM fill light */}
                    <directionalLight
                        position={[0, -5, 0]}
                        intensity={0.6}
                    />
                    <Helmet position={[0, -3.25, 0]} shadows />

                </Canvas>
            </figure>
        </section>
    )
}

export default hero