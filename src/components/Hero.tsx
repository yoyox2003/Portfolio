import { useLayoutEffect, useRef } from "react";
import myInfo from "@/data/info";
import { gsap } from "gsap";
import HeroVisual, { type HeroVisualController } from "./HeroVisual";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HeroVisualController | null>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const origin = originRef.current;
    const visual = visualRef.current;
    if (!hero || !origin || !visual) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 801px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const state = { charge: 0 };
      let accumulated = 0;
      let lastInput = 0;
      let lastTick = performance.now();
      const setCharge = gsap.quickTo(state, "charge", {
        duration: 0.12,
        ease: "power1.out",
        onUpdate: () => visual.setCharge(state.charge),
      });
      const onWheel = (event: WheelEvent) => {
        if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        if (event.cancelable) event.preventDefault();
        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
        accumulated = Math.min(600, accumulated + Math.abs(event.deltaY) * unit);
        lastInput = performance.now();
        setCharge(accumulated / 600);
      };
      const resetCharge = () => {
        accumulated = 0;
        setCharge(0);
      };
      const tick = () => {
        const now = performance.now();
        const elapsed = Math.min(now - lastTick, 100);
        lastTick = now;
        if (now - lastInput > 200 && accumulated > 0) {
          accumulated *= 2 ** (-elapsed / 600);
          if (accumulated < 0.5) accumulated = 0;
          setCharge(accumulated / 600);
        }
      };
      // Hold the current scroll position only while the visual receives wheel input.
      origin.addEventListener("wheel", onWheel, { passive: false });
      origin.addEventListener("pointerleave", resetCharge);
      gsap.ticker.add(tick);
      return () => {
        origin.removeEventListener("wheel", onWheel);
        origin.removeEventListener("pointerleave", resetCharge);
        gsap.ticker.remove(tick);
        setCharge.tween.kill();
        visual.reset();
      };
    }, hero);
    return () => media.revert();
  }, []);

  return (
    <section ref={heroRef} data-dot-grid className="dot-grid relative isolate min-h-screen overflow-clip">
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
      <div className="relative z-20">
      <div className="hero-content mx-auto flex min-h-screen max-w-[1600px] flex-col items-center justify-center gap-8 px-6 py-14 min-[801px]:flex-row min-[801px]:justify-between min-[801px]:gap-12 min-[801px]:px-9">
        <section id="about" className="w-full max-w-[740px] min-[801px]:min-w-0">
          <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-[#b8aaa0] uppercase">Hello, I'm</p>
          <h1 className="mb-6 text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-[-0.06em]">
            {`${myInfo.name.first} ${myInfo.name.second}`}<span className="text-[#b7a0f5]">.</span>
          </h1>
          <p className="max-w-[550px] text-[clamp(1.1rem,2vw,1.4rem)] leading-[1.6] text-[#c1bdb9]">{myInfo.summary}</p>
          <a href="#portfolio-work" className="mt-8 inline-block rounded-sm font-semibold text-[#cbbcff] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">View projects <span aria-hidden="true">↗</span></a>
          <p className="hero-charge-cue mt-5 text-sm text-[#aaa6a3]">Scroll over the visual to light up more dots</p>
          <div aria-hidden="true" className="hero-charge-cue mt-2 h-0.5 w-24 overflow-hidden rounded bg-white/10">
            <div className="h-full origin-left bg-[#ef501a]" style={{ transform: "scaleX(var(--hero-charge, 0))" }} />
          </div>
        </section>
        <div ref={originRef} aria-hidden="true" className="aspect-[3/4] w-full max-w-[320px] shrink-0 min-[801px]:max-w-[420px]" />
      </div>
      </div>
      <HeroVisual originRef={originRef} controllerRef={visualRef} />
    </section>
  );
};
export default Hero;
