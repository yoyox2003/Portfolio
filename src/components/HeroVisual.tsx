import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { createThermalField, getThermalFieldBounds } from "@/lib/thermalField";

export type HeroVisualController = {
  setCharge: (charge: number) => void;
  reset: () => void;
};
type HeroVisualProps = {
  originRef: RefObject<HTMLDivElement | null>;
  controllerRef: RefObject<HeroVisualController | null>;
};

const HeroVisual = ({ originRef, controllerRef }: HeroVisualProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const hero = canvas?.closest<HTMLElement>("[data-dot-grid]");
    const origin = originRef.current;
    if (!canvas || !context || !hero || !origin) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phase = { value: 0 };
    const spacing = Number.parseFloat(
      getComputedStyle(hero).getPropertyValue("--dot-grid-spacing"),
    );
    let charge = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let slotX = 0;
    let slotY = 0;
    let slotWidth = 0;
    let slotHeight = 0;
    let centerX = 0;
    let centerY = 0;
    let renderIdle: ReturnType<typeof createThermalField> = null;
    let idleBounds: ReturnType<typeof getThermalFieldBounds> | null = null;

    const draw = () => {
      if (!width || !height || !renderIdle || !idleBounds) return;
      context.clearRect(0, 0, width, height);
      const firstX = spacing / 2 + Math.round((centerX - spacing / 2) / spacing - 5.5) * spacing;
      const firstY = spacing / 2 + Math.round((centerY - spacing / 2) / spacing - 7.5) * spacing;
      // Fit the complete field, including its glow, into the responsive visual slot.
      const scale = Math.min(slotWidth / idleBounds.width, slotHeight / idleBounds.height);
      const drawnWidth = idleBounds.width * scale;
      const drawnHeight = idleBounds.height * scale;
      context.drawImage(
        renderIdle(firstX - idleBounds.x, firstY - idleBounds.y, phase.value, charge),
        centerX - drawnWidth / 2,
        centerY - drawnHeight / 2,
        drawnWidth,
        drawnHeight,
      );
    };
    const tween = gsap.to(phase, {
      value: 1,
      duration: 5,
      ease: "none",
      repeat: -1,
      paused: true,
      onUpdate: draw,
    });
    const updatePlayback = () => {
      if (visible && !document.hidden && !motion.matches) tween.play();
      else tween.pause();
      if (motion.matches) phase.value = 0.18;
      draw();
    };
    controllerRef.current = {
      setCharge(value) {
        charge = value;
        hero.style.setProperty("--hero-charge", String(value));
      },
      reset() {
        charge = 0;
        hero.style.setProperty("--hero-charge", "0");
        updatePlayback();
      },
    };
    const resize = () => {
      const rect = hero.getBoundingClientRect();
      const slot = origin.getBoundingClientRect();
      width = hero.clientWidth;
      height = hero.clientHeight;
      slotX = slot.left - rect.left;
      slotY = slot.top - rect.top;
      slotWidth = slot.width;
      slotHeight = slot.height;
      if (!width || !height || !slotWidth || !slotHeight) return;
      centerX = slotX + slotWidth / 2;
      centerY = slotY + slotHeight / 2;
      const firstX = spacing / 2 + Math.round((centerX - spacing / 2) / spacing - 5.5) * spacing;
      const firstY = spacing / 2 + Math.round((centerY - spacing / 2) / spacing - 7.5) * spacing;
      idleBounds = getThermalFieldBounds(firstX, firstY, spacing);
      renderIdle = createThermalField(idleBounds.width, idleBounds.height, spacing);
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      context.imageSmoothingEnabled = true;
      draw();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    resizeObserver.observe(origin);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    intersectionObserver.observe(hero);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    resize();
    return () => {
      controllerRef.current = null;
      tween.kill();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      hero.style.removeProperty("--hero-charge");
    };
  }, [controllerRef, originRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};
export default HeroVisual;
