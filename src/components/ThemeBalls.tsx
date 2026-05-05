import { motion } from "framer-motion";

function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function applyRandomTheme() {
  const primaryH  = rnd(0, 359);
  const accentHue = (primaryH + rnd(115, 165)) % 360;
  const accentS   = rnd(78, 95);
  const accentL   = rnd(52, 65);
  const fgH       = (accentHue + 180) % 360;
  const fgS       = 30;

  const root = document.documentElement;
  /* background intentionally NOT changed — stays black */
  root.style.setProperty("--foreground",            `${fgH} ${fgS}% 96%`);
  root.style.setProperty("--muted-foreground",      `${fgH} ${fgS}% 58%`);
  root.style.setProperty("--primary",               `${accentHue} ${accentS}% ${accentL}%`);
  root.style.setProperty("--primary-foreground",    `${accentHue} 20% 6%`);
  root.style.setProperty("--ring",                  `${accentHue} ${accentS - 4}% ${accentL + 6}%`);
  root.style.setProperty("--muted",                 `${primaryH} 20% 10%`);
  root.style.setProperty("--card",                  `${primaryH} 16% 7%`);
  root.style.setProperty("--card-foreground",       `${fgH} ${fgS}% 96%`);
  root.style.setProperty("--card-border",           `${primaryH} 20% 17%`);
  root.style.setProperty("--border",                `${primaryH} 20% 15%`);
  root.style.setProperty("--input",                 `${primaryH} 20% 17%`);
  root.style.setProperty("--popover",               `${primaryH} 16% 7%`);
  root.style.setProperty("--popover-foreground",    `${fgH} ${fgS}% 96%`);
  root.style.setProperty("--secondary",             `${primaryH} 18% 13%`);
  root.style.setProperty("--secondary-foreground",  `${fgH} ${fgS}% 96%`);
  root.style.setProperty("--accent",                `${primaryH} 18% 13%`);
  root.style.setProperty("--accent-foreground",     `${fgH} ${fgS}% 96%`);
}

/** Reset by removing ALL inline styles so the :root CSS variables take over */
function resetTheme() {
  document.documentElement.removeAttribute("style");
}

const Shine = () => (
  <span
    aria-hidden
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 36% 32%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.18) 28%, transparent 58%)",
      pointerEvents: "none",
    }}
  />
);

export function ThemeBalls() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9998,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <motion.button
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.9 }}
        onClick={applyRandomTheme}
        title="Randomise colours"
        aria-label="Randomise site colours"
        className="rgb-ball"
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <Shine />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.18 }}
        whileTap={{ scale: 0.9 }}
        onClick={resetTheme}
        title="Reset to default"
        aria-label="Reset site colours"
        className="bw-ball"
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "none",
          outline: "none",
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
        }}
      >
        <Shine />
      </motion.button>
    </div>
  );
}
