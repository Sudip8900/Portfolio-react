import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const headingRef = useRef(null);
    const imgRef = useRef(null);
    const nameRef = useRef(null);
    const paraRef = useRef(null);
    const paraRef2 = useRef(null);
    const EducationRef1 = useRef(null);
    const EducationRef2 = useRef(null);
    const EducationRef3 = useRef(null);
    const langRef = useRef(null);
    const toolsRef = useRef(null);
    const imgRef2 = useRef(null);
    const paraRef3 = useRef(null);
    const SRef = useRef(null);

    useGSAP(() => {

        gsap.from(headingRef.current, {
            duration: 1,
            opacity: 0,
            yPercent: 200,
            ease: "circ.out",
            scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
            }
        });

        gsap.from(imgRef.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top 80%",
            }
        });

        gsap.from(nameRef.current, {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: nameRef.current,
                start: "top 80%",
            }
        });

        gsap.from(paraRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: paraRef.current,
            }
        });

        gsap.from(paraRef2.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: paraRef2.current,
                start: "top 80%",
            }
        });

        gsap.from(EducationRef1.current, {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: EducationRef1.current,
                start: "top 100%",
            }
        });
        gsap.from(EducationRef2.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: EducationRef2.current,
                start: "top 100%",
            }
        });

        gsap.from(EducationRef3.current, {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: EducationRef3.current,
                start: "top 100%",
            }
        });

        gsap.from(langRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: langRef.current,
                start: "top 100%",
            }
        });

        gsap.from(toolsRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: toolsRef.current,
                start: "top 100%",
            }
        });

        gsap.from(imgRef2.current, {
            xPercent: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: imgRef2.current,
                start: "top 80%",
            }
        });

        gsap.from(paraRef3.current, {
            xPercent: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: paraRef3.current,
                start: "top 80%",
            }
        });

        gsap.from(SRef.current, {
            yPercent: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: SRef.current,
                start: "top 100%",
            }
        });
    });

    return (
        <section id="about" className='min-h-screen bg-black rounded-t-4xl'>
            <div className='text-white text-4xl md:text-8xl font-bold p-5 pl-2 pb-1 md:p-10 md:pb-1'>
                <h1 ref={headingRef} className='inline-block text-center w-full md:text-start'>About Me</h1>
            </div>
            <div className='bg-black border-t-orange-500 border-t-2 py-20 px-5 md:px-10 rounded-t-[50px]'>
                <div className='md:hidden flex flex-col'>
                    <div className='flex flex-row gap-x-5'>
                        <img ref={imgRef} src="/Images/ProfilePic.png" alt="profile pic" className='w-40 rounded-[25px] border-orange-500 border-2' />
                        <p ref={nameRef} className='text-white text-2xl text-right mt-10'>Hello I'm<br /><span className='text-orange-500 text-4xl font-bold mt-5 block'>SUDIP PAN</span></p>
                    </div>
                    <div ref={paraRef} className='mt-10'>
                        <p className='text-white text-justify'>
                            I’m a passionate game developer and designer with a background in 3D art and electronics engineering. I create immersive, visually engaging games that blend strong design, technical skill, and interactive innovation.
                        </p>
                    </div>
                    <div ref={paraRef2} className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px]'>
                        <h1 className='text-orange-500 font-bold text-2xl text-center mb-5'>Educations</h1>
                        <div ref={EducationRef1}>
                            <h2 className='text-orange-500 '>Class X</h2>
                            <div className='h-0.5 w-full bg-orange-500 rounded-full'></div>
                            <p className='mb-5'>Ramjibanpur Babulal Institution {"  [2019]"}</p>
                        </div>
                        <div ref={EducationRef2}>
                            <h2 className='text-orange-500 '>Class XII</h2>
                            <div className='h-0.5 w-full bg-orange-500 rounded-full'></div>
                            <p className='mb-5'>Ramjibanpur Babulal Institution {"  [2021]"}</p>
                        </div>
                        <div ref={EducationRef3}>
                            <h2 className='text-orange-500 '>Bachelor's Degree <span>{"  [E.C.E]"}</span></h2>
                            <div className='h-0.5 w-full bg-orange-500 rounded-full'></div>
                            <p className='mb-5'>Ramkrishna Mahato Governmet Engineering College {"  [2022-26]"}</p>
                        </div>
                    </div>
                    <div ref={langRef} className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px]'>
                        <h1 className='text-orange-500 font-bold text-[1rem] text-center mb-5'>Programming Languages</h1>
                        <div className='flex flex-row gap-x-5 justify-center'>
                            <img width="48" height="48" src="https://img.icons8.com/color/48/c-programming.png" alt="c-programming" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/python.png" alt="python" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/c-plus-plus-logo.png" alt="c++" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/javascript.png" alt="javascript" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="24" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" alt="external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/tailwind_css.png" alt="tailwind_css" className='bg-white border-orange-500 border rounded-[10px]' />
                        </div>
                    </div>
                    <div ref={toolsRef} className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px]'>
                        <h1 className='text-orange-500 font-bold text-[1rem] text-center mb-5'>Tools</h1>
                        <div className='flex flex-row gap-x-5 justify-center'>
                            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/unreal-engine.png" alt="unreal-engine" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/blender-3d.png" alt="blender-3d" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/color/48/visual-studio-code-2019.png" alt="visual-studio-code-2019" className='bg-white border-orange-500 border rounded-[10px]' />
                            <img width="48" height="48" src="https://img.icons8.com/fluency/48/visual-studio.png" alt="visual-studio" className='bg-white border-orange-500 border rounded-[10px]' />
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex md:flex-col gap-y-10 text-white'>
                    <div className='flex flex-row gap-x-10'>
                        <img ref={imgRef2} src="/Images/ProfilePic.png" alt="profile pic" className='h-150 border-orange-500 border-2 rounded-[25px] transition-all duration-500 hover:scale-105' />
                        <div ref={paraRef3} className='flex flex-col gap-y-10'>
                            <h1 className='text-4xl text-white font-bold'>Hello I'm<br /><span className='text-6xl text-orange-500 font-bold mt-5 block'>SUDIP PAN</span></h1>
                            <p className='text-2xl text-justify'>
                                I’m a passionate game developer and designer with a background in 3D art and electronics engineering. I create immersive, visually engaging games that blend strong design, technical skill, and interactive innovation.
                            </p>
                            <div ref={SRef} className='flex flex-row gap-x-10'>
                                <div className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px] w-170'>
                                    <h1 className='text-orange-500 font-bold text-2xl text-center mb-5'>Educations</h1>
                                    <p className='text-1xl text-orange-500 ml-5'>Class-X </p>
                                    <div className='h-0.5 w-full bg-orange-500 rounded-full' />
                                    <p className='text-1xl ml-5 mb-5'>Ramjibanpur Babulal Institution <span className='block text-end mr-5'>{"[2019]"}</span></p>
                                    <p className='text-1xl text-orange-500 ml-5'>Class-X </p>
                                    <div className='h-0.5 w-full bg-orange-500 rounded-full' />
                                    <p className='text-1xl ml-5 mb-5'>Ramjibanpur Babulal Institution <span className='block text-end mr-5'>{"[2021]"}</span></p>
                                    <p className='text-1xl text-orange-500 ml-5'>Graduation <span className='text-orange-500'>[E.C.E]</span> </p>
                                    <div className='h-0.5 w-full bg-orange-500 rounded-full' />
                                    <p className='text-1xl ml-5 mb-5'>Ramkrishna Mahato Government Engineering College <span className='block text-end mr-5'>{"[2022-26]"}</span></p>
                                </div>
                                <div className='flex flex-col gap-y-10'>
                                    <div className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px] w-170'>
                                        <h1 className='text-orange-500 font-bold text-2xl text-center mb-5'>Programming Languages</h1>
                                        <div className='flex flex-row justify-between mx-5'>
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/c-programming.png" alt="c-programming" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/python.png" alt="python" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/c-plus-plus-logo.png" alt="c++" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/javascript.png" alt="javascript" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="24" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png" alt="external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/tailwind_css.png" alt="tailwind_css" className='bg-white border-orange-500 border rounded-[10px]' />
                                        </div>
                                    </div>
                                    <div className='text-white border-t-2 border-t-orange-500 mt-10 pt-5 rounded-t-[50px]'>
                                        <h1 className='text-orange-500 font-bold text-2xl text-center mb-5'>Tools</h1>
                                        <div className='flex flex-row justify-between mx-5'>
                                            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/unreal-engine.png" alt="unreal-engine" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/blender-3d.png" alt="blender-3d" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/color/48/visual-studio-code-2019.png" alt="visual-studio-code-2019" className='bg-white border-orange-500 border rounded-[10px]' />
                                            <img width="48" height="48" src="https://img.icons8.com/fluency/48/visual-studio.png" alt="visual-studio" className='bg-white border-orange-500 border rounded-[10px]' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About