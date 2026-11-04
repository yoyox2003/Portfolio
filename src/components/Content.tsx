import { useLayoutEffect, useRef, type RefObject } from "react";
import ProjectCard, { projects } from "./ProjectCard";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const eyebrow = "mb-4 text-xs font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "text-[2rem] tracking-[-0.03em]";

type contentProps = {
  portfolioRef: RefObject<HTMLDivElement | null>;
};

const Content = ({ portfolioRef }: contentProps) => {
  const contentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    // Load up the content dom element
    const content = contentRef.current;
    if (!content) return;
    // Load up the portfolio dom element
    const portfolio = portfolioRef.current;
    if (!portfolio) return;

    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 800px)", desktop: "(min-width: 801px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion) return;
      gsap.fromTo(
        ".content-animation",
        { x: +window.innerWidth },
        {
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: context.conditions.mobile ? content : portfolio,
            start: "top 90%",
            end: "top top",
            scrub: 2,
          },
        },
      );
    }, portfolio);

    return () => media.revert();
  }, [contentRef, portfolioRef]);

  return (
    <main
      ref={contentRef}
      className="w-full min-w-0 max-w-[1600px] px-6 pb-12 min-[801px]:pt-[42px] min-[801px]:pr-[42px] min-[801px]:pb-[60px] min-[801px]:pl-0"
    >
      <section id="projects">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className={`${eyebrow} content-animation`}>A selection of work</p>
            <h2 className={`${heading} content-animation`}>Projects</h2>
          </div>
          <p className="content-animation mb-1 hidden text-[0.8rem] text-[#aaa6a3] min-[561px]:block">
            Selected projects / Examples
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </section>

      <section id="contact" className="pt-[70px] pb-5 min-[561px]:pt-[100px]">
        <p className={eyebrow}>Get in touch</p>
        <h2 className={`${heading} mb-4`}>Contact</h2>
        <p className="leading-[1.6] text-[#c1bdb9]">Add clickable contacts here</p>
      </section>
    </main>
  );
};

export default Content;
