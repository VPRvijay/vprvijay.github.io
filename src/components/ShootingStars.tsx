import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  alpha: number;
  size: number;
  lane: number;
}

const COUNT = 24;
const ANGLE_DEG = 40;
const ANGLE_RAD = ANGLE_DEG * (Math.PI / 180);
const COS_A = Math.cos(ANGLE_RAD);
const SIN_A = Math.sin(ANGLE_RAD);
const SPEED_BASE = 3.2;
const SPEED_VAR  = 1.0;

function makeLanedStar(
  lane: number,
  totalLanes: number,
  w: number,
  h: number,
  initialY?: number,
): Star {
  const laneSpan = w + h * (SIN_A / COS_A);
  const laneX    = (lane / totalLanes) * laneSpan - h * (SIN_A / COS_A) * 0.5;
  const speed    = SPEED_BASE + Math.random() * SPEED_VAR;

  return {
    x:     laneX,
    y:     initialY !== undefined ? initialY : -30 - Math.random() * h * 0.6,
    vx:    SIN_A * speed,
    vy:    COS_A * speed,
    len:   75 + Math.random() * 45,
    /* +20% opacity vs previous values (was 0.30–0.55) */
    alpha: 0.36 + Math.random() * 0.30,
    size:  0.7 + Math.random() * 0.8,
    lane,
  };
}

function getPrimary() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "0 0% 88%"
  );
}

export function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<Star[]>([]);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const W = canvas.width;
      const H = canvas.height;
      starsRef.current = Array.from({ length: COUNT }, (_, i) => {
        const startY = -30 - (i / COUNT) * H * 1.2;
        return makeLanedStar(i, COUNT, W, H, startY);
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const primary = getPrimary();
      const W = canvas.width;
      const H = canvas.height;

      starsRef.current.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x > W + 100 || s.y > H + 100) {
          starsRef.current[i] = makeLanedStar(s.lane, COUNT, W, H);
          return;
        }

        const tx = s.x - SIN_A * s.len;
        const ty = s.y - COS_A * s.len;

        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0,   `hsl(${primary} / 0)`);
        grad.addColorStop(0.6, `hsl(${primary} / ${s.alpha * 0.5})`);
        grad.addColorStop(1,   `hsl(${primary} / ${s.alpha})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = s.size;
        ctx.lineCap     = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.3, 0, Math.PI * 2);
        ctx.fillStyle   = `hsl(${primary} / ${s.alpha})`;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = `hsl(${primary} / 0.7)`;
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 1 }}
    />
  );
}
