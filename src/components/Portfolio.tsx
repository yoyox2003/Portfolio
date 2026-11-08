import { useCallback, useRef, useState, useLayoutEffect } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExitPrompt from "./ui/ExitPrompt";
import { AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const attachPortfolio = useCallback((element: HTMLDivElement | null) => {
    portfolioRef.current = element;
    setPortfolioReady(element !== null);
  }, []);

  // Exit Prompt
  const [exitVisible, setExitVisible] = useState<boolean>(false);
  const exitRef = useRef(false);

  useLayoutEffect(() => {
    const portfolio = portfolioRef.current;
    if (!portfolioReady || !portfolio) return;
    let snapTimer: number | undefined;
    let wheelTimer: number | undefined;
    let promptTimer: number | undefined;
    let wheelActive = false;
    let touchStartY = 0;
    let touchReady = false;
    let previousOverflow = "";
    let locked = false;

    const portfolioTop = () => window.scrollY + portfolio.getBoundingClientRect().top;
    const alignPortfolio = () => {
      window.scrollTo({ top: portfolioTop(), behavior: "instant" });
    };
    const lockAtPortfolio = () => {
      if (locked || exitRef.current) return;
      exitRef.current = true;
      locked = true;
      touchReady = false;
      window.clearTimeout(snapTimer);
      document.documentElement.classList.remove("snap-y", "snap-proximity");
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      alignPortfolio();
      setExitVisible(true);
      window.clearTimeout(promptTimer);
      promptTimer = window.setTimeout(() => setExitVisible(false), 2000);
    };
    // Momentum and browser scroll restoration must not move the locked boundary.
    const onScroll = () => {
      if (locked && Math.abs(portfolio.getBoundingClientRect().top) > 0.5) {
        alignPortfolio();
      }
    };

    const unlock = (returningToHero = false) => {
      if (!locked) return;
      locked = false;
      // Continuing through the portfolio must arm the boundary for the next visit.
      exitRef.current = returningToHero;
      window.clearTimeout(promptTimer);
      document.documentElement.style.overflow = previousOverflow;
      setExitVisible(false);
    };

    const leaveForHero = () => {
      unlock(true);
      document.documentElement.classList.add("snap-y", "snap-proximity");
      document.querySelector("[data-dot-grid]")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    };

    const onWheel = (event: WheelEvent) => {
      const newGesture = !wheelActive;
      wheelActive = true;
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        wheelActive = false;
      }, 200);
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const top = portfolio.getBoundingClientRect().top;
      if (!locked && !exitRef.current && event.deltaY < 0 && top <= 1 && top >= -1) {
        if (event.cancelable) event.preventDefault();
        lockAtPortfolio();
        return;
      }
      if (!locked) return;
      if (event.cancelable) event.preventDefault();
      if (newGesture && event.deltaY < 0) leaveForHero();
      else if (newGesture && event.deltaY > 0) unlock();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchReady = locked;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!locked) return;
      if (event.cancelable) event.preventDefault();
      const distance = (event.touches[0]?.clientY ?? touchStartY) - touchStartY;
      if (touchReady && distance > 30) {
        touchReady = false;
        leaveForHero();
      } else if (touchReady && distance < -30) {
        touchReady = false;
        unlock();
      }
    };
    const onTouchEnd = () => {
      touchReady = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!locked) return;
      if (event.repeat) {
        if (["ArrowUp", "PageUp", "Home", "ArrowDown", "PageDown", "End", " "].includes(event.key)) event.preventDefault();
        return;
      }
      if (["ArrowUp", "PageUp", "Home"].includes(event.key)) {
        event.preventDefault();
        leaveForHero();
      } else if (["ArrowDown", "PageDown", "End", " "].includes(event.key)) {
        event.preventDefault();
        unlock();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    const trigger = ScrollTrigger.create({
      trigger: portfolioRef.current,
      start: "top top",
      onEnter: () => {
        if (!locked) exitRef.current = false;
        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("snap-y", "snap-proximity");
        }, 100);
      },
      onLeaveBack: lockAtPortfolio,
    });

    return () => {
      window.clearTimeout(snapTimer);
      window.clearTimeout(wheelTimer);
      window.clearTimeout(promptTimer);
      if (locked) document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      trigger.kill();
    };
  }, [portfolioReady]);

  return (
    <div
      ref={attachPortfolio}
      id="portfolio-work"
      tabIndex={-1}
      className="overflow-x-clip min-[801px]:flex min-[801px]:items-start snap-start snap-always"
    >
      <AnimatePresence>
        {exitVisible && <ExitPrompt key="exit-prompt" />}
      </AnimatePresence>
      {portfolioReady && <Sidebar portfolioRef={portfolioRef} />}
      {portfolioReady && <Content portfolioRef={portfolioRef} />}
    </div>
  );
};

export default Portfolio;
