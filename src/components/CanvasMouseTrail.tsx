import { useEffect, useRef } from "react";

interface Point  { x: number; y: number; t: number; }
interface Ripple { x: number; y: number; born: number; }

const TRAIL_MS  = 680;
const RIPPLE_MS = 650;

function getPrimary(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "0 0% 88%"
  );
}

export function CanvasMouseTrail() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const ptsRef     = useRef<Point[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) =>
      ptsRef.current.push({ x: e.clientX, y: e.clientY, t: Date.now() });

    const onClick = (e: MouseEvent) =>
      ripplesRef.current.push({ x: e.clientX, y: e.clientY, born: Date.now() });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      const primary = getPrimary();

      ptsRef.current = ptsRef.current.filter((p) => now - p.t < TRAIL_MS);
      const pts = ptsRef.current;
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const age   = (now - pts[i].t) / TRAIL_MS;
          const alpha = (1 - age) * 0.65;
          const width = (1 - age) * 2.2 + 0.3;
          ctx.beginPath();
          ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
          ctx.lineTo(pts[i].x, pts[i].y);
          ctx.strokeStyle = `hsl(${primary} / ${alpha})`;
          ctx.lineWidth   = width;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.stroke();
        }
      }

      ripplesRef.current = ripplesRef.current.filter((r) => now - r.born < RIPPLE_MS);
      ripplesRef.current.forEach((r) => {
        const age    = (now - r.born) / RIPPLE_MS;
        const radius = 6 + age * 55;
        const alpha  = (1 - age) * 0.75;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsl(${primary} / ${alpha * 0.85})`;
        ctx.lineWidth   = 1.8 - age * 1.3;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = `hsl(${primary} / ${alpha * 0.5})`;
        ctx.stroke();

        if (age < 0.4) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius * 0.45, 0, Math.PI * 2);
          ctx.strokeStyle = `hsl(${primary} / ${(0.4 - age) * 1.5})`;
          ctx.lineWidth   = 1;
          ctx.shadowBlur  = 0;
          ctx.stroke();
        }
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9999, mixBlendMode: "screen" }}
    />
  );
}
