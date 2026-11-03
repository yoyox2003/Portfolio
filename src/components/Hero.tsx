import { useLayoutEffect, useRef } from "react";
import myInfo from "@/data/info";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroVisual from "./HeroVisual";

// Tailwind classes
const eyebrow = "mb-4 text-xs font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
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

    return () => media.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen">
      <div className="hero-content mx-auto flex min-h-screen max-w-[1600px] flex-col items-center justify-center gap-8 px-6 py-14 min-[801px]:flex-row min-[801px]:justify-between min-[801px]:gap-12 min-[801px]:px-9">
        <section
          id="about"
          className="w-full max-w-[740px] min-[801px]:min-w-0"
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
        <HeroVisual />
      </div>
    </section>
  );
};

export default Hero;
