import { useLayoutEffect, useRef, type RefObject } from "react";
import ProjectCard from "./ProjectCard";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Contact from "./Contact";

import projects from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const eyebrow =
  "mb-[1.33em] text-[0.75em] font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "text-[2em] tracking-[-0.03em]";

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
    media.add(
      {
        mobile: "(max-width: 800px)",
        desktop: "(min-width: 801px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
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
      },
      portfolio,
    );

    return () => media.revert();
  }, [contentRef, portfolioRef]);

  return (
    <main
      ref={contentRef}
      className="w-full min-w-0 px-[5vw] pb-[3em] text-[max(1rem,1vw)] min-[801px]:pt-[2.625em] min-[801px]:pr-[3vw] min-[801px]:pb-[3.75em] min-[801px]:pl-0"
    >
      <section id="projects" className="@container">
        <div className="mb-[1.5em] flex items-end justify-between gap-[1.25em]">
          <div>
            <p className={`${eyebrow} content-animation`}>A selection of work</p>
            <h2 className={`${heading} content-animation`}>Projects</h2>
          </div>
          <p className="content-animation mb-[0.3em] hidden text-[0.8em] text-[#aaa6a3] min-[561px]:block">
            Selected projects / Examples
          </p>
        </div>
        <div className="grid grid-cols-1 gap-[1.25em] @min-[640px]:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <Contact />
    </main>
  );
};

export default Content;
