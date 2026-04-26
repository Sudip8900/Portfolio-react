import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let pX = mouseX;
        let pY = mouseY;

        // Check hover state flag to prevent spamming GSAP to()
        let isHovering = false;

        // Initial set to small size (48px * 0.4 = ~19px)
        gsap.set(cursor, { scale: 0.4 });

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Check for interactive elements
            const isClickable = e.target.closest('a, button, img, [role="button"], input, select, textarea, .cursor-pointer, h1, h2, h3');

            if (isClickable && !isHovering) {
                isHovering = true;
                gsap.to(cursor, {
                    scale: 1, // Full 48px size
                    duration: 0.3,
                    ease: 'power3.out'
                });
            } else if (!isClickable && isHovering) {
                isHovering = false;
                gsap.to(cursor, {
                    scale: 0.4, // Small ~19px size
                    duration: 0.3,
                    ease: 'power3.out'
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        const render = () => {
            pX += (mouseX - pX) * 0.15; // Smooth trailing factor
            pY += (mouseY - pY) * 0.15;

            // w-12 h-12 -> 48px => 24px offset for perfectly centered
            gsap.set(cursor, { x: pX - 24, y: pY - 24 });
            requestAnimationFrame(render);
        };

        let frameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="hidden md:block">
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-12 h-12 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
                style={{ willChange: 'transform, left, top' }}
            />
        </div>
    );
};

export default CustomCursor;
