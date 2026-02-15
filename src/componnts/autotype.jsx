import { Typewriter } from "react-simple-typewriter";
import AnimatedTextSlide from './animatedTextSlide.jsx';

function AutoType() {
  return (
    <h2 className="text-xl font-bold">
      <span className="uppercase tracking-[0.5rem] text-[1rem] md:text-[2rem]">I am a passonate{" "}</span> <br />
      <span className="text-orange-500 text-[1.5rem] md:text-[4rem]">
        <Typewriter
          words={["Game Developer", "Game Designer", "UE5 Enthusiast", "Elecronics Engineer"]}
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
