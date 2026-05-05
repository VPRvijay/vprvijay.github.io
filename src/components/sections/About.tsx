import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { raw: 200, suffix: "+", label: "LeetCode solved" },
  { raw: 5,   suffix: "",  label: "Projects built"  },
  { raw: 5,   suffix: "",  label: "Certifications"  },
  { raw: 2027, suffix: "", label: "Graduation"       },
];

const GLASS: React.CSSProperties = {
  background: "hsl(var(--primary) / 0.05)",
  backdropFilter: "blur(16px) saturate(1.5)",
  WebkitBackdropFilter: "blur(16px) saturate(1.5)",
  borderColor: "hsl(var(--primary) / 0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
  transition: "border-color 0.4s ease, background 0.4s ease",
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-2xl font-bold text-foreground font-mono mb-1 tabular-nums">
      {val}{suffix}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, delay: i * 0.08, type: "spring", stiffness: 260, damping: 22 },
  }),
};

export function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_20%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[hsl(0_0%_40%)] text-sm">01.</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">About</h2>
            <div className="flex-1 h-px bg-[hsl(0_0%_14%)]" />
          </div>

          <div className="grid md:grid-cols-[3fr_2fr] gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-5 text-muted-foreground leading-relaxed"
            >
              {[
                <>I'm a 3rd-year B.Tech student specialising in{" "}<span className="text-foreground font-medium">AI & Data Science</span> at T.J. Institute of Technology, Chennai. My core focus sits at the intersection of machine learning algorithms and scalable backend architectures.</>,
                <>I'm actively building my foundations in Data Structures & Algorithms — having solved <span className="font-mono text-foreground font-semibold">200+</span> LeetCode problems — and working toward engineering roles at product-driven companies.</>,
                <>Outside of coursework I've completed internships with <span className="text-foreground">CodSoft</span>, <span className="text-foreground">Infosys Springboard</span>, and the <span className="text-foreground">Tamizhan Skills RISE Program</span>, earning certifications in Big Data, AI, and Python.</>,
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45 } } }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "hsl(var(--primary) / 0.45)",
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="p-4 rounded-md border cursor-default"
                  style={GLASS}
                >
                  <CountUp target={s.raw} suffix={s.suffix} />
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
