import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { createThermalField } from "@/lib/thermalField";

const HeroVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const grid = canvas?.closest<HTMLElement>("[data-dot-grid]");
    if (!canvas || !context || !grid) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phase = { value: 0 };
    let visible = false;
    let width = 0;
    let height = 0;
    let scrollFrame = 0;
    let renderField: ReturnType<typeof createThermalField> = null;
    const spacing = Number.parseFloat(
      getComputedStyle(grid).getPropertyValue("--dot-grid-spacing"),
    );

    const draw = () => {
      if (!width || !height || !renderField) return;
      context.clearRect(0, 0, width, height);

      // Matching distances from the center give all four quadrants the same pattern.
      const canvasRect = canvas.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      const offsetX = canvasRect.left - gridRect.left;
      const offsetY = canvasRect.top - gridRect.top;
      // The CSS grid's first dot is half a cell from the background origin.
      const firstX =
        spacing / 2 +
        Math.round((offsetX + width / 2 - spacing / 2) / spacing - 5.5) * spacing -
        offsetX;
      const firstY =
        spacing / 2 +
        Math.round((offsetY + height / 2 - spacing / 2) / spacing - 7.5) * spacing -
        offsetY;
      context.imageSmoothingEnabled = true;
      context.drawImage(renderField(firstX, firstY, phase.value), 0, 0, width, height);
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
      if (motion.matches) {
        phase.value = 0.18;
        draw();
      }
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      if (!width || !height) return;
      renderField = createThermalField(width, height, spacing);
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      draw();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });

    const onScroll = () => {
      if (!visible || document.hidden || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        draw();
      });
    };

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    motion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      tween.kill();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motion.removeEventListener("change", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none aspect-[3/4] w-full max-w-[320px] min-[801px]:max-w-[420px]"
    />
  );
};

export default HeroVisual;
