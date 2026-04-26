import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
    const magnetic = useRef(null);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        if(!magnetic.current) return;

        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            // Magnetic strength factor (0.35 is about 35% pull toward mouse)
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        const element = magnetic.current;
        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            if (element) {
                element.removeEventListener("mousemove", handleMouseMove);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    // Clone child to inject reference and preserve incoming refs
    return React.cloneElement(children, { 
        ref: (node) => {
            magnetic.current = node;
            
            // Forward ref if the child already has one
            const childRef = children.ref;
            if (childRef) {
                if (typeof childRef === 'function') {
                    childRef(node);
                } else if (typeof childRef === 'object') {
                    childRef.current = node;
                }
            }
        }
    });
}
