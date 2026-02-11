import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextSlide = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRef = useRef([]);

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    if (lineRef.current.length > 0) {
      gsap.from(lineRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRef.current[index] = el)}
          className="block overflow-hidden"
        >
          {line}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTextSlide;
