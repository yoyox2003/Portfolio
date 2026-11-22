import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Contact from "./Contact";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";

gsap.registerPlugin(ScrollTrigger);

const eyebrow =
  "mb-[1.33em] text-[0.75em] font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase";
const heading = "text-[2em] tracking-[-0.03em]";

export type PortfolioView = "projects" | "experience" | "skills";

const viewOffset: Record<PortfolioView, number> = {
  projects: 24,
  experience: -24,
  skills: 0,
};

type contentProps = {
  portfolioRef: RefObject<HTMLDivElement | null>;
  activeView: PortfolioView;
  onProjectDialogChange: (open: boolean) => void;
};

const Content = ({ portfolioRef, activeView, onProjectDialogChange }: contentProps) => {
  const contentRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    // Load up the content dom element
    const content = contentRef.current;
    if (!content) return;
    // Load up the portfolio dom element
    const portfolio = portfolioRef.current;
    const view = viewRef.current;
    if (!portfolio || !view) return;

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
          view,
          { x: +window.innerWidth },
          {
            x: 0,
            duration: 1,
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
      <div id="portfolio-view" ref={viewRef} className="@container">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeView}
            initial={reducedMotion ? false : { opacity: 0, x: viewOffset[activeView] }}
            animate={{ opacity: 1, x: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
            exit={{
              opacity: 0,
              x: reducedMotion ? 0 : viewOffset[activeView],
              transition: { duration: reducedMotion ? 0 : 0.15 },
            }}
          >
            {activeView === "projects" && (
              <section id="projects" aria-labelledby="projects-heading">
                <div className="mb-[1.5em] flex items-end justify-between gap-[1.25em]">
                  <div>
                    <p className={eyebrow}>A selection of work</p>
                    <h2 id="projects-heading" className={heading}>Projects</h2>
                  </div>
                  <p className="mb-[0.3em] hidden text-[0.8em] text-[#aaa6a3] min-[561px]:block">
                    Selected projects / Examples
                  </p>
                </div>
                <Projects onDialogChange={onProjectDialogChange} />
              </section>
            )}
            {activeView === "experience" && <Experience />}
            {activeView === "skills" && <Skills />}
          </motion.div>
        </AnimatePresence>
      </div>
      <Contact />
    </main>
  );
};

export default Content;
