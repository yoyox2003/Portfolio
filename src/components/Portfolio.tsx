import { useCallback, useRef, useState, useLayoutEffect } from "react";
import Content, { type PortfolioView } from "./Content";
import Sidebar from "./Sidebar";
import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExitPrompt from "./ui/ExitPrompt";
import { AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [portfolioReady, setPortfolioReady] = useState(false);
  const [activeView, setActiveView] = useState<PortfolioView>("projects");
  const attachPortfolio = useCallback((element: HTMLDivElement | null) => {
    portfolioRef.current = element;
    setPortfolioReady(element !== null);
  }, []);

  // Exit Prompt
  const [exitVisible, setExitVisible] = useState<boolean>(false);
  const exitRef = useRef(false);
  const releaseScrollLockRef = useRef<(() => void) | null>(null);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const handleProjectDialogChange = useCallback((open: boolean) => {
    setProjectDialogOpen(open);
    if (open) setExitVisible(false);
  }, []);

  useLayoutEffect(() => {
    const portfolio = portfolioRef.current;
    if (!portfolioReady || !portfolio || projectDialogOpen) return;
    let snapTimer: number | undefined;
    let wheelTimer: number | undefined;
    let promptTimer: number | undefined;
    let wheelActive = false;
    let touchStartY = 0;
    let touchReady = false;
    let previousOverflow = "";
    let exitStage: "unlocked" | "waiting" | "prompt" = "unlocked";
    let hasEnteredPortfolio = false;
    let returningToHero = false;
    let previousTop = portfolio.getBoundingClientRect().top;

    const portfolioTop = () => window.scrollY + portfolio.getBoundingClientRect().top;
    const alignPortfolio = () => {
      window.scrollTo({ top: portfolioTop(), behavior: "instant" });
    };
    const lockAtPortfolio = () => {
      if (exitStage !== "unlocked" || exitRef.current) return;
      exitRef.current = true;
      exitStage = "waiting";
      touchReady = false;
      window.clearTimeout(snapTimer);
      document.documentElement.classList.remove("snap-y", "snap-proximity");
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      alignPortfolio();
    };
    // Native snapping can land exactly at the boundary without firing onEnter.
    const onScroll = () => {
      const top = portfolio.getBoundingClientRect().top;
      const reachedTopFromBelow = previousTop < -1 && top >= -1;
      previousTop = top;
      if (exitStage !== "unlocked") {
        if (Math.abs(top) > 0.5) alignPortfolio();
        return;
      }
      if (returningToHero) {
        // Keep the confirmed exit free until it has crossed into the hero.
        if (top > 1) returningToHero = false;
        return;
      }
      if (hasEnteredPortfolio && (reachedTopFromBelow || top > 1)) {
        lockAtPortfolio();
      } else if (top <= 1) {
        hasEnteredPortfolio = true;
        exitRef.current = false;
      }
    };

    const unlock = (returningToHero = false) => {
      if (exitStage === "unlocked") return;
      exitStage = "unlocked";
      // Continuing through the portfolio must arm the boundary for the next visit.
      exitRef.current = returningToHero;
      window.clearTimeout(promptTimer);
      document.documentElement.style.overflow = previousOverflow;
      setExitVisible(false);
    };
    releaseScrollLockRef.current = unlock;

    const leaveForHero = () => {
      returningToHero = true;
      hasEnteredPortfolio = false;
      unlock(true);
      document.documentElement.classList.add("snap-y", "snap-proximity");
      document.querySelector("[data-dot-grid]")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
    };

    const advanceExit = () => {
      if (exitStage === "waiting") {
        exitStage = "prompt";
        setExitVisible(true);
        promptTimer = window.setTimeout(() => unlock(), 2000);
      } else if (exitStage === "prompt") {
        leaveForHero();
      }
    };

    const isAtPortfolioTop = () => Math.abs(portfolio.getBoundingClientRect().top) <= 1;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const newGesture = !wheelActive;
      wheelActive = true;
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        wheelActive = false;
      }, 200);
      if (exitStage === "unlocked" && !exitRef.current && event.deltaY < 0 && isAtPortfolioTop()) {
        if (event.cancelable) event.preventDefault();
        lockAtPortfolio();
        return;
      }
      if (exitStage === "unlocked") return;
      if (event.cancelable) event.preventDefault();
      if (newGesture && event.deltaY < 0) advanceExit();
      else if (newGesture && event.deltaY > 0) unlock();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchReady = exitStage !== "unlocked";
    };
    const onTouchMove = (event: TouchEvent) => {
      if (exitStage === "unlocked") return;
      if (event.cancelable) event.preventDefault();
      const distance = (event.touches[0]?.clientY ?? touchStartY) - touchStartY;
      if (touchReady && distance > 30) {
        touchReady = false;
        advanceExit();
      } else if (touchReady && distance < -30) {
        touchReady = false;
        unlock();
      }
    };
    const onTouchEnd = () => {
      touchReady = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const scrollsUp = ["ArrowUp", "PageUp", "Home"].includes(event.key);
      const scrollsDown = ["ArrowDown", "PageDown", "End", " "].includes(event.key);
      if (!scrollsUp && !scrollsDown) return;
      // Space activates a focused button or link through the browser's default behavior.
      if (event.key === " " && event.target instanceof Element && event.target.closest("button, a")) return;

      if (exitStage === "unlocked") {
        if (scrollsUp && !exitRef.current && isAtPortfolioTop()) {
          event.preventDefault();
          lockAtPortfolio();
        }
        return;
      }
      event.preventDefault();
      if (event.repeat) return;
      if (scrollsUp) advanceExit();
      else unlock();
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
        if (exitStage === "unlocked" && !returningToHero) {
          hasEnteredPortfolio = true;
          exitRef.current = false;
        }
        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("snap-y", "snap-proximity");
        }, 100);
      },
      onLeaveBack: lockAtPortfolio,
    });
    onScroll();

    return () => {
      releaseScrollLockRef.current = null;
      window.clearTimeout(snapTimer);
      window.clearTimeout(wheelTimer);
      window.clearTimeout(promptTimer);
      if (exitStage !== "unlocked") {
        document.documentElement.style.overflow = previousOverflow;
        exitRef.current = false;
      }
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      trigger.kill();
    };
  }, [portfolioReady, projectDialogOpen]);

  return (
    <div
      ref={attachPortfolio}
      id="portfolio-work"
      tabIndex={-1}
      className="overflow-x-clip min-[801px]:flex min-[801px]:items-start snap-start snap-always"
    >
      <AnimatePresence>{exitVisible && <ExitPrompt key="exit-prompt" />}</AnimatePresence>
      {portfolioReady && (
        <Sidebar
          portfolioRef={portfolioRef}
          activeView={activeView}
          onViewChange={setActiveView}
          onContactNavigate={() => releaseScrollLockRef.current?.()}
        />
      )}
      {portfolioReady && (
        <Content
          portfolioRef={portfolioRef}
          activeView={activeView}
          onProjectDialogChange={handleProjectDialogChange}
        />
      )}
    </div>
  );
};

export default Portfolio;
