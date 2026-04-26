import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const dot = dotRef.current;
        const ring = ringRef.current;
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let pX = mouseX;
        let pY = mouseY;

        let isHovering = false;

        // Initial setup
        gsap.set(dot, { xPercent: -50, yPercent: -50 });
        gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 1 });

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move the dot
            gsap.set(dot, { x: mouseX, y: mouseY });

            const isClickable = e.target.closest('a, button, img, [role="button"], input, select, textarea, .cursor-pointer, h1, h2, h3');

            if (isClickable && !isHovering) {
                isHovering = true;
                gsap.to(ring, {
                    scale: 1.5,
                    rotate: 45,
                    borderColor: 'rgba(255,255,255,0.8)',
                    borderWidth: '2px',
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
                gsap.to(dot, {
                    scale: 2,
                    backgroundColor: 'rgba(255,255,255,1)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                    duration: 0.3
                });
            } else if (!isClickable && isHovering) {
                isHovering = false;
                gsap.to(ring, {
                    scale: 1,
                    rotate: 0,
                    borderColor: 'rgba(255,105,0,0.5)',
                    borderWidth: '1px',
                    duration: 0.3,
                    ease: 'power3.out'
                });
                gsap.to(dot, {
                    scale: 1,
                    backgroundColor: 'rgba(255,105,0,1)',
                    boxShadow: '0 0 10px rgba(255,105,0,0.8)',
                    duration: 0.3
                });
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        const render = () => {
            pX += (mouseX - pX) * 0.15; // Smooth trailing factor
            pY += (mouseY - pY) * 0.15;

            // Trail the ring
            gsap.set(ring, { x: pX, y: pY });
            
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
            {/* Trailing Outer Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-10 h-10 border border-orange-500/50 rounded-none pointer-events-none z-[99998] flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(255,105,0,0.2)]"
                style={{ willChange: 'transform' }}
            >
                {/* Sci-Fi Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500"></div>
            </div>
            
            {/* Precise Inner Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-orange-500 rounded-full pointer-events-none z-[99999] shadow-[0_0_10px_rgba(255,105,0,0.8)]"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};

export default CustomCursor;
