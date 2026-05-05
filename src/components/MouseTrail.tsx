import { useEffect, useRef } from "react";

const GLOW_SIZE = 320;
const LERP_GLOW = 0.08;
const GRID_RADIUS = 360; /* 50% larger than previous 240px */

export function MouseTrail() {
  const glowRef   = useRef<HTMLDivElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999 });
  const glowPos   = useRef({ x: -999, y: -999 });
  const rafRef    = useRef<number>(0);
  const hiddenRef = useRef(true);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (hiddenRef.current) {
        glowPos.current   = { x: e.clientX, y: e.clientY };
        hiddenRef.current = false;
      }
      /* Grid spotlight — updates immediately on raw mouse position */
      const gridEl = document.querySelector(".grid-bg") as HTMLElement | null;
      if (gridEl) {
        const mask = `radial-gradient(circle ${GRID_RADIUS}px at ${e.clientX}px ${e.clientY}px, black 10%, transparent 80%)`;
        gridEl.style.maskImage = mask;
        gridEl.style.webkitMaskImage = mask;
      }
    };

    const onLeave = () => {
      hiddenRef.current = true;
      const gridEl = document.querySelector(".grid-bg") as HTMLElement | null;
      if (gridEl) {
        const mask = `radial-gradient(circle 0px at -999px -999px, black 0%, transparent 100%)`;
        gridEl.style.maskImage = mask;
        gridEl.style.webkitMaskImage = mask;
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const animate = () => {
      const m = mouseRef.current;
      glowPos.current.x += (m.x - glowPos.current.x) * LERP_GLOW;
      glowPos.current.y += (m.y - glowPos.current.y) * LERP_GLOW;

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${glowPos.current.x - GLOW_SIZE / 2}px, ${glowPos.current.y - GLOW_SIZE / 2}px)`;
        glowRef.current.style.opacity = hiddenRef.current ? "0" : "1";
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position:     "fixed",
        top:          0,
        left:         0,
        width:        GLOW_SIZE,
        height:       GLOW_SIZE,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--primary) / 0.04) 45%, transparent 70%)",
        filter:       "blur(18px)",
        pointerEvents: "none",
        willChange:   "transform",
        transition:   "opacity 0.25s ease",
        zIndex:       4,
      }}
    />
  );
}
