import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, ArrowRight } from "lucide-react";

/** Looping typewriter: types → pauses → deletes → repeats */
function useLoopingTypewriter(
  text: string,
  typeMs  = 105,
  deleteMs = 48,
  pauseMs  = 1800,
) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx   = 0;
    let phase: "typing" | "pausing" | "deleting" = "typing";
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase === "typing") {
        idx++;
        setDisplayed(text.slice(0, idx));
        if (idx >= text.length) {
          phase = "pausing";
          timer = setTimeout(tick, pauseMs);
        } else {
          timer = setTimeout(tick, typeMs);
        }
      } else if (phase === "pausing") {
        phase = "deleting";
        timer = setTimeout(tick, deleteMs);
      } else {
        idx--;
        setDisplayed(text.slice(0, idx));
        if (idx <= 0) {
          phase = "typing";
          timer = setTimeout(tick, typeMs * 3);
        } else {
          timer = setTimeout(tick, deleteMs);
        }
      }
    };

    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [text, typeMs, deleteMs, pauseMs]);

  return displayed;
}

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.35 } },
};
const charVariant = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function Hero() {
  const displayed = useLoopingTypewriter("whoami");

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full pb-20">

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_7%)] text-sm text-muted-foreground font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
            Open to Summer 2026 Internships
          </span>
        </motion.div>

        {/* Looping terminal line */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mb-6 font-mono text-sm"
        >
          <span className="text-[hsl(0_0%_55%)]">~/hello</span>
          <span className="text-muted-foreground"> $ </span>
          <span className="text-foreground">{displayed}</span>
          {/* cursor always visible since it loops */}
          <span className="inline-block w-[2px] h-[1em] bg-foreground ml-0.5 align-middle animate-pulse" />
        </motion.div>

        <div className="mb-8">
          <h1 className="font-[Space_Grotesk] font-bold leading-none tracking-tight">
            <motion.span
              className="block text-[clamp(3rem,10vw,7rem)] text-foreground overflow-hidden"
              variants={nameVariants}
              initial="hidden"
              animate="visible"
            >
              {"S. Vijay".split("").map((ch, i) => (
                <motion.span key={i} variants={charVariant} style={{ display: "inline-block", whiteSpace: "pre" }}>
                  {ch}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="block text-[clamp(3rem,10vw,7rem)] text-muted-foreground overflow-hidden"
              variants={nameVariants}
              initial="hidden"
              animate="visible"
            >
              {"Prabhakar.".split("").map((ch, i) => (
                <motion.span key={i} variants={charVariant} style={{ display: "inline-block", whiteSpace: "pre" }}>
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-8"
        >
          I'm a{" "}
          <span className="text-foreground font-medium">3rd-year B.Tech student</span>{" "}
          in AI &amp; Data Science at T.J. Institute of Technology. I build Python
          systems, wrangle data pipelines, and prepare for product-scale engineering roles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.82 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground font-mono mb-10"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            Chennai, Tamil Nadu
          </span>
          <span className="text-[hsl(0_0%_25%)]">·</span>
          <span>B.Tech AI &amp; DS · 2027</span>
          <span className="text-[hsl(0_0%_25%)]">·</span>
          <span>200+ LeetCode</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.92 }}
          className="flex flex-wrap items-center gap-3"
        >
          <motion.a
            href="#projects"
            onClick={(e) => scrollTo(e, "#projects")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-foreground border border-[hsl(0_0%_30%)] hover:border-[hsl(0_0%_50%)] rounded-md bg-[hsl(0_0%_8%)] hover:bg-[hsl(0_0%_11%)] transition-colors"
            data-testid="button-view-projects"
          >
            View Projects <ArrowRight size={15} />
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground border border-[hsl(0_0%_20%)] hover:border-[hsl(0_0%_35%)] hover:text-foreground rounded-md transition-colors"
            data-testid="button-get-in-touch"
          >
            Get in touch
          </motion.a>
          <motion.a
            href="https://github.com/VPRvijay"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground border border-[hsl(0_0%_20%)] hover:border-[hsl(0_0%_35%)] hover:text-foreground rounded-md transition-colors"
            aria-label="GitHub"
          >
            <Github size={17} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/vijayvpr/"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.12, rotate: -8 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-flex items-center justify-center w-10 h-10 text-muted-foreground border border-[hsl(0_0%_20%)] hover:border-[hsl(0_0%_35%)] hover:text-foreground rounded-md transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono text-muted-foreground tracking-[0.2em] rotate-90 mb-2">SCROLL</span>
        <div className="w-px h-12 bg-[hsl(0_0%_20%)] overflow-hidden">
          <div className="w-full h-full bg-primary scroll-line" />
        </div>
      </div>
    </section>
  );
}
