import React, { useEffect, useRef, useState } from 'react';

const DrawText = ({ text, color = '#ea580c', duration = 1.8, delay = 0, fontSize = 20, className = '', align = 'left' }) => {
    const [animated, setAnimated] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const safeId = text.replace(/[^a-zA-Z0-9]/g, '-');
    
    // Estimate bounds based on the wide 'Michroma' font
    const charWidth = fontSize * 0.85;
    const padding = 10;
    const svgWidth = Math.ceil(text.length * charWidth + padding);
    const svgHeight = Math.ceil(fontSize * 1.5);
    const textY = Math.ceil(fontSize * 1.1);
    
    // Dynamic estimation of stroke length for dasharray/dashoffset animation
    const estimatedStrokeLength = text.length * 60;

    let xVal = padding / 2;
    let textAnchorVal = 'start';
    if (align === 'center') {
        xVal = '50%';
        textAnchorVal = 'middle';
    } else if (align === 'right') {
        xVal = '100%';
        textAnchorVal = 'end';
    }

    return (
        <span 
            ref={containerRef} 
            className={`inline-block align-middle ${className}`} 
            style={{ 
                width: `${svgWidth}px`, 
                height: `${svgHeight}px`,
                maxWidth: '100%' 
            }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="overflow-visible"
            >
                <style>{`
                    @keyframes draw-writing-${safeId} {
                        0% {
                            stroke-dashoffset: ${estimatedStrokeLength};
                            fill: transparent;
                        }
                        75% {
                            stroke-dashoffset: 0;
                            fill: transparent;
                        }
                        100% {
                            stroke-dashoffset: 0;
                            fill: ${color};
                        }
                    }
                    .draw-writing-path-${safeId} {
                        font-family: "Michroma", sans-serif;
                        font-size: ${fontSize}px;
                        font-weight: bold;
                        fill: ${animated ? color : 'transparent'};
                        stroke: ${color};
                        stroke-width: 1px;
                        stroke-dasharray: ${estimatedStrokeLength};
                        stroke-dashoffset: ${animated ? 0 : estimatedStrokeLength};
                        animation: ${animated ? `draw-writing-${safeId} ${duration}s ease-in-out forwards ${delay}s` : 'none'};
                    }
                `}</style>
                <text
                    x={xVal}
                    y={textY}
                    textAnchor={textAnchorVal}
                    className={`draw-writing-path-${safeId}`}
                >
                    {text}
                </text>
            </svg>
        </span>
    );
};


export default DrawText;
