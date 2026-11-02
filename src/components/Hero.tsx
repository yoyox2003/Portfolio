import { useLayoutEffect, useRef } from "react";
import myInfo from "@/data/info";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Tailwind classes
const eyebrow = "mb-4 text-xs font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // This captures the hero element and checks wether it is captured
    const hero = heroRef.current;
    if (!hero) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=50%",
          pin: true,
          scrub: true,
        },
      });

      timeline.to(".hero-content", {
        opacity: 0,
        y: -40,
      });
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen">
      <div className="hero-content">
        <section
          id="about"
          className="max-w-[1000px] px-6 pt-[60px] pb-[70px] min-[801px]:px-9 min-[801px]:pt-14 min-[801px]:pb-[90px]"
        >
          <p className={eyebrow}>Hello, I'm</p>
          <h1 className="mb-6 text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-[-0.06em]">
            {`${myInfo.name.first} ${myInfo.name.second}`}
            <span className="text-[#b7a0f5]">.</span>
          </h1>
          <p className="max-w-[550px] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.6] text-[#c1bdb9]">
            {myInfo.summary}
          </p>
        </section>
      </div>
    </section>
  );
};

export default Hero;
