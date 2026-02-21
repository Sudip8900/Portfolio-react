import { useGSAP } from "@gsap/react";
import { Typewriter } from "react-simple-typewriter";
import { useRef } from "react";
import gsap from "gsap";

function AutoType({ subTitle, title, text, Ntextcolor, AnimTextcolor, NtextSize, AnimTextSize, TtextSize, Ttextcolor, TtextAlign }) {
  const AutotypeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(AutotypeRef.current.children, {
      duration: 1,
      opacity: 0,
      y: 80,
      ease: "circ.out",
      stagger: 0.3, // delay between lines
    });
  }, []);

  return (
    <h2 ref={AutotypeRef} className={`font-bold`}>
      <span className={`uppercase tracking-[0.5rem] ${NtextSize} ${Ntextcolor}`}>{subTitle}</span> <br />
      <span className={`${TtextSize} ${Ttextcolor} text-${TtextAlign}`}>{title}</span>
      <span className={`${AnimTextcolor} ${AnimTextSize}`}>
        <Typewriter
          words={text}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={90}
          deleteSpeed={60}
          delaySpeed={1200}
        />
      </span>
    </h2>
  );
}

export default AutoType;