import React from 'react'
import Marque from '../componnts/Marque';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSummary = () => {

    const contactSumRef = React.useRef(null);
    const items = ["Let's connect", "Let's create", "Let's collaborate", "Let's innovate", "Let's build", "Let's design", "Let's develop", "Let's code", "Let's dream", "Let's achieve"];
    const items2 = ["together", "amazing", "incredible", "extraordinary", "unforgettable", "remarkable", "spectacular", "awesome", "fantastic", "phenomenal"];
    const SumRef = React.useRef(null);

    useGSAP(() => {gsap.to(contactSumRef.current, {
        scrollTrigger: {
            trigger: contactSumRef.current,
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
        },
    })

    gsap.from(SumRef.current, {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: SumRef.current,
            start: "bottom 90%",
        },
    })
    }, []);

    return (
        <section ref={contactSumRef} className='flex flex-col items-center justify-between min-h-screen gap-12 mt-16'>
            <Marque items={items}/>
            <div ref={SumRef} className='text-center overflow-hidden font-light contact-text-responsive py-10'>
                <p>
                    " Let's <br /> <span className='font-bold'>connect</span> <br /> & <span className='italic'>create</span> something<br /> <span className='underline decoration-orange-500'>amazing</span> <span className='text-orange-500'> together</span>! "
                </p>
            </div>
            <Marque items={items2} reverse={true} className='text-black bg-transparent border-y-2 border-orange-500' iconClassname='text-orange-500' iconName='mdi:gamepad-circle-right'/>
        </section>
    )
}

export default ContactSummary