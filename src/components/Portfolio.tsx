import { useCallback, useRef, useState, useLayoutEffect } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const attachPortfolio = useCallback((element: HTMLDivElement | null) => {
    portfolioRef.current = element;
    setPortfolioReady(element !== null);
  }, []);

  useLayoutEffect(() => {
    let snapTimer: number | undefined;

    const trigger = ScrollTrigger.create({
      trigger: portfolioRef.current,
      start: "top top",
      onEnter: () => {
        snapTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("snap-y", "snap-proximity");
        }, 100);
      },
      onLeaveBack: () => {
        document.documentElement.classList.add("snap-y", "snap-proximity");
      },
    });

    return () => {
      window.clearTimeout(snapTimer);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={attachPortfolio}
      id="portfolio-work"
      tabIndex={-1}
      className="overflow-x-clip min-[801px]:flex min-[801px]:items-start snap-start snap-always"
    >
      {portfolioReady && <Sidebar portfolioRef={portfolioRef} />}
      {portfolioReady && <Content portfolioRef={portfolioRef} />}
    </div>
  );
};

export default Portfolio;
