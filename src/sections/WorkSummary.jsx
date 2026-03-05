import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";
import InfiniteMenu from "../componnts/InfiniteMenu";
import React from 'react';
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const WorkSummary = () => {
    const items = [
        {
            id: 1,
            title: "Perfume Bottle",
            description: "A realistic perfume bottle model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/perfume bottle.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_hello-connection-i-am-very-happy-to-share-activity-7132760377586499584-Bwp_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 2,
            title: "Cartoony House",
            description: "A cartoony house model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/cartoony house.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-activity-7133733306671517696-HKYv?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 3,
            title: "Rounded Bottle",
            description: "A rounded bottle model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/fantasy bottle.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-activity-7134562176756826112-09bq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 4,
            title: "Realistic Light Bulb",
            description: "A realistic light bulb model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/bulb.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-activity-7135275072595927041-oAzf?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 5,
            title: "Rifle",
            description: "A realistic rifle model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/rifle.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-activity-7141983995440812033-OE5P?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 6,
            title: "Realistic Speaker",
            description: "A realistic speaker model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/speaker.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-3dmodel-3drendering-activity-7148629321497128960-e_oS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 7,
            title: "Karambit Knife",
            description: "A realistic karambit knife model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/karambit.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-blender-3dmodel-activity-7181402451307102210-JObd?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 8,
            title: "Sci-Fi Katana",
            description: "A realistic sci-fi katana model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/katana.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-3ddesign-blender-activity-7182237574076284928-nzCX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 9,
            title: "Sci-Fi Gun",
            description: "A realistic sci-fi gun model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/gun.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-blenderproject-3dmodeling-activity-7185706264390242305-DIz0?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 10,
            title: "Black Hole",
            description: "A realistic black hole model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/black hole.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-blender-3dmodelling-activity-7213885612846645248-6d1x?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 11,
            title: "COD knife",
            description: "A realistic COD knife model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/knife.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-3dmodeling-3ddesigning-activity-7234678069922258947-Ja6J?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 12,
            title: "After Rain Environment",
            description: "A realistic after rain environment model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/rainy.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_everyone-blender-3ddesign-activity-7251186012389793792-BImF?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 13,
            title: "Dungeon Environment",
            description: "A realistic dungeon environment model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/dungeon.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-blenderproject-3dmodeling-activity-7254122523980701696-LTKQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
        {
            id: 14,
            title: "Haunted tunnel",
            description: "A realistic haunted tunnel environment model created using Blender, showcasing advanced modeling techniques and attention to detail.",
            image: "/Images/tunnel.jpg",
            link: "https://www.linkedin.com/posts/sudip-pan-7a3946253_connections-gamedevelopment-3dmodeling-activity-7256902785101647872-YblK?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD6cDOsBFOByRF8HlviCci3sUNgr2EflDIo"
        },
    ];
    const WorkSumRef = React.useRef();

    useGSAP(() => {
        gsap.to(WorkSumRef.current, {
            scale: 0.8,
            scrollTrigger: {
                trigger: WorkSumRef.current,
                start: "bottom 80%",
                end: "bottom 20%",
                scrub: true,
            },
            ease: "power1.out",
        });
    }, { scope: WorkSumRef });

    return (
        <section ref={WorkSumRef}>
            <div className="rounded-4xl my-10">
                <InfiniteMenu items={items}
                    scale={1}
                />
            </div>
        </section>
    )
}

export default WorkSummary;