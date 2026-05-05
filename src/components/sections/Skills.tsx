import { motion } from "framer-motion";
import { SiPython, SiPandas, SiGithub } from "react-icons/si";
import { Cloud, Monitor, Code2, Cpu, Globe, Database } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    skills: [{ name: "Python", icon: SiPython }],
  },
  {
    title: "Libraries & Tools",
    skills: [
      { name: "Pandas",     icon: SiPandas },
      { name: "Matplotlib", icon: null },
      { name: "Seaborn",    icon: null },
      { name: "psutil",     icon: null },
    ],
  },
  {
    title: "Cloud",
    skills: [{ name: "AWS S3", icon: Cloud }],
  },
  {
    title: "Dev Tools",
    skills: [
      { name: "VS Code",        icon: Monitor },
      { name: "Git / GitHub",   icon: SiGithub },
      { name: "GitHub Copilot", icon: Code2 },
      { name: "Spyder",         icon: null },
    ],
  },
  {
    title: "Domains",
    skills: [
      { name: "AI",                icon: Cpu      },
      { name: "ML",                icon: null     },
      { name: "IoT",               icon: Globe    },
      { name: "Embedded Systems",  icon: null     },
      { name: "Network Security",  icon: null     },
      { name: "Cloud Service Mgt", icon: null     },
      { name: "Big Data",          icon: Database },
    ],
  },
];

const GLASS: React.CSSProperties = {
  background: "hsl(var(--primary) / 0.05)",
  backdropFilter: "blur(14px) saturate(1.4)",
  WebkitBackdropFilter: "blur(14px) saturate(1.4)",
  borderColor: "hsl(var(--primary) / 0.18)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
  transition: "border-color 0.4s ease, background 0.4s ease",
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 350, damping: 22, delay: i * 0.045 },
  }),
};

export function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_20%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[hsl(0_0%_40%)] text-sm">02.</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Skills</h2>
            <div className="flex-1 h-px bg-[hsl(0_0%_14%)]" />
          </div>

          <div className="grid gap-10">
            {SKILL_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: ci * 0.07 }}
              >
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => {
                    const Icon = skill.icon as React.ElementType | null;
                    return (
                      <motion.div
                        key={skill.name}
                        custom={si}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={pillVariants}
                        whileHover={{
                          scale: 1.08,
                          y: -3,
                          borderColor: "hsl(var(--primary) / 0.5)",
                          boxShadow: "0 0 16px hsl(var(--primary) / 0.2)",
                          transition: { type: "spring", stiffness: 400, damping: 18 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm text-muted-foreground cursor-default"
                        style={GLASS}
                        data-testid={`skill-${skill.name.replace(/\s+/g, "-").toLowerCase()}`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                        <span>{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
