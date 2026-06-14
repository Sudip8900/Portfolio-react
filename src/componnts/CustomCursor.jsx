import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const rippleRefs = useRef([]);

    useEffect(() => {
        // Skip on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const crosshairs = cursor.querySelectorAll('.crosshair');
        
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let pX = mouseX;
        let pY = mouseY;
        let velX = 0;
        let velY = 0;

        let isHovering = 'none'; // 'none', 'link', 'text'
        let hoveredElement = null;
        let rippleIndex = 0;

        // Initial setup
        gsap.set(cursor, { xPercent: -50, yPercent: -50, width: 40, height: 40, borderRadius: '50%' });
        gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0.125 });
        
        // Initialize ripple positions
        rippleRefs.current.forEach(el => {
            gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
        });

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instantly move the dot
            gsap.set(dot, { x: mouseX, y: mouseY });

            // Detect element type
            const target = e.target;
            const isLinkOrBtn = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, .main-text-word');

            if (isLinkOrBtn) {
                if (isHovering !== 'link' || hoveredElement !== isLinkOrBtn) {
                    isHovering = 'link';
                    hoveredElement = isLinkOrBtn;
                    
                    const rect = isLinkOrBtn.getBoundingClientRect();
                    gsap.to(cursor, {
                        width: rect.width + 16,
                        height: rect.height + 16,
                        borderRadius: '8px',
                        borderColor: 'rgba(255,105,0,0.8)',
                        backgroundColor: 'rgba(255,105,0,0.05)',
                        borderWidth: '1px',
                        duration: 0.4,
                        ease: 'power3.out'
                    });
                    gsap.to(crosshairs, { opacity: 0, duration: 0.2 });
                    gsap.to(dot, {
                        scale: 0, // hide dot on link to let bounding box shine
                        duration: 0.3
                    });
                }
            } else {
                if (isHovering !== 'none') {
                    isHovering = 'none';
                    hoveredElement = null;
                    
                    gsap.to(cursor, {
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        borderColor: 'rgba(255,105,0,0.5)',
                        backgroundColor: 'transparent',
                        borderWidth: '1px',
                        duration: 0.4,
                        ease: 'power3.out'
                    });
                    gsap.to(crosshairs, { opacity: 1, duration: 0.3 });
                    gsap.to(dot, {
                        scale: 0.125, // 64px * 0.125 = 8px
                        backgroundColor: 'rgba(255,105,0,1)',
                        boxShadow: '0 0 10px rgba(255,105,0,0.8)',
                        mixBlendMode: 'normal',
                        duration: 0.3
                    });
                }
            }
        };

        const onMouseDown = (e) => {
            // Spawn shockwave
            const ripple = rippleRefs.current[rippleIndex];
            if (ripple) {
                gsap.killTweensOf(ripple);
                gsap.set(ripple, { x: e.clientX, y: e.clientY, scale: 0.5, opacity: 0.8 });
                gsap.to(ripple, {
                    scale: 3,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out"
                });
                rippleIndex = (rippleIndex + 1) % rippleRefs.current.length;
            }

            if (isHovering === 'none') {
                gsap.to(cursor, { scale: 0.8, duration: 0.1 });
                gsap.to(dot, { scale: 0.05, duration: 0.1 });
            }
        };

        const onMouseUp = () => {
            if (isHovering === 'none') {
                gsap.to(cursor, { scale: 1, duration: 0.4, ease: "back.out(2)" });
                gsap.to(dot, { scale: 0.125, duration: 0.4, ease: "back.out(2)" });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        const render = () => {
            if (isHovering === 'link' && hoveredElement) {
                // Magnetic snap to bounding box center
                const rect = hoveredElement.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;
                
                pX += (targetX - pX) * 0.2;
                pY += (targetY - pY) * 0.2;

                // Lock scale and rotation when snapped
                gsap.set(cursor, { x: pX, y: pY, rotation: 0, scaleX: 1, scaleY: 1 });
            } else {
                // Velocity calculation
                velX = mouseX - pX;
                velY = mouseY - pY;
                
                pX += velX * 0.2; // Smooth trailing factor
                pY += velY * 0.2;

                const velocity = Math.sqrt(velX * velX + velY * velY);
                const angle = Math.atan2(velY, velX) * (180 / Math.PI);

                // Squash and stretch based on velocity
                // Max stretch is capped to prevent breaking the design
                const scaleX = 1 + Math.min(velocity * 0.005, 0.4);
                const scaleY = 1 - Math.min(velocity * 0.003, 0.2);

                gsap.set(cursor, { 
                    x: pX, 
                    y: pY,
                    rotation: angle,
                    scaleX: scaleX,
                    scaleY: scaleY
                });
            }
            
            requestAnimationFrame(render);
        };

        let frameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="hidden md:block">
            {/* Click Ripple Pool */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (rippleRefs.current[i] = el)}
                    className="fixed top-0 left-0 w-12 h-12 rounded-full border border-orange-500/50 pointer-events-none z-[99997] shadow-[0_0_10px_rgba(255,105,0,0.5)]"
                    style={{ willChange: 'transform, opacity' }}
                >
                </div>
            ))}

            {/* Drone Reticle Outer Ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 border border-orange-500/50 rounded-full pointer-events-none z-[99998] flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(255,105,0,0.1)]"
                style={{ willChange: 'transform, width, height, border-radius' }}
            >
                {/* Crosshair Ticks */}
                <div className="crosshair absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-orange-500/80"></div>
                <div className="crosshair absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-orange-500/80"></div>
                <div className="crosshair absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-orange-500/80"></div>
                <div className="crosshair absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-[1px] bg-orange-500/80"></div>
            </div>
            
            {/* Precise Inner Dot Lens */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-16 h-16 bg-orange-500 rounded-full pointer-events-none z-[99999] shadow-[0_0_10px_rgba(255,105,0,0.8)] transition-colors"
                style={{ willChange: 'transform' }}
            />
        </div>
    );
};

export default CustomCursor;
