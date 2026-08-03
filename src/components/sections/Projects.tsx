import { motion } from "framer-motion";
import { Github, FileText, Activity, BarChart2, Zap, Globe, Bot, Code2 } from "lucide-react";

const PROJECTS = [
  {
    title: "Student Report System",
    description: "Python CLI application for managing and generating student reports. Developed as part of the Tamizhan Skills RISE Program.",
    tags: ["Python", "CLI", "File I/O"],
    github: "https://github.com/VPRvijay/student-report-python",
    Icon: FileText,
  },
  {
    title: "System Monitor",
    description: "Multi-file CLI Python app using psutil to monitor CPU, memory, disk, and network in real time.",
    tags: ["Python", "psutil", "CLI"],
    github: "https://github.com/VPRvijay/system-monitor-python",
    Icon: Activity,
  },
  {
    title: "Data Processing & Reporting System",
    description: "Automated student marks CSV pipeline with Pandas and Matplotlib for visual reporting and analytics.",
    tags: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/VPRvijay/student-report-python",
    Icon: BarChart2,
  },
  {
    title: "Energy Efficiency Optimization",
    description: "College project developing algorithms to optimize energy consumption and efficiency using Python/Spyder.",
    tags: ["Python", "Spyder", "Algorithms"],
    github: "https://github.com/VPRvijay/EBPL",
    Icon: Zap,
  },
  {
    title: "Life-cycle-inside-Python",
    description: "Comprehensive guide exploring Python object lifecycle, memory management, garbage collection, and resource optimization with practical examples and deep-dive concepts.",
    tags: ["Python", "Educational", "Memory Management"],
    github: "https://github.com/VPRvijay/Life-cycle-inside-Python",
    Icon: Code2,
  },
  {
    title: "AI Portfolio Chatbot",
    description: "Personal AI assistant built with FastAPI and NVIDIA NIM API, deployed on Render. Answers questions about my skills, projects, and experience.",
    tags: ["FastAPI", "NVIDIA NIM", "Python", "Render"],
    github: "https://github.com/VPRvijay/portfolio-chatbot",
    live: "https://portfolio-chatbot-api.onrender.com",
    Icon: Bot,
  },
  {
    title: "Portfolio Website",
    description: "This portfolio — a modern dark React app deployed on GitHub Pages and AWS CloudFront.",
    tags: ["React", "TypeScript", "Tailwind", "AWS"],
    github: "https://github.com/VPRvijay/vprvijay.github.io",
    Icon: Globe,
  },
];

const GLASS: React.CSSProperties = {
  background: "hsl(var(--primary) / 0.05)",
  backdropFilter: "blur(16px) saturate(1.5)",
  WebkitBackdropFilter: "blur(16px) saturate(1.5)",
  borderColor: "hsl(var(--primary) / 0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
  transition: "border-color 0.4s ease, background 0.4s ease, box-shadow 0.3s ease",
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.09, type: "spring", stiffness: 280, damping: 24 },
  }),
};

export function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_20%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[hsl(0_0%_40%)] text-sm">03.</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Projects</h2>
            <div className="flex-1 h-px bg-[hsl(0_0%_14%)]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project, i) => {
            const { Icon } = project;
            return (
              <motion.div
                key={project.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: "hsl(var(--primary) / 0.45)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                  transition: { type: "spring", stiffness: 380, damping: 22 },
                }}
                className="group flex flex-col p-6 rounded-lg border"
                style={GLASS}
                data-testid={`card-project-${i}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  >
                    <Icon className="w-8 h-8 text-[hsl(0_0%_50%)] group-hover:text-foreground transition-colors duration-300" />
                  </motion.div>
                  <div className="flex items-center gap-3">
                    {"live" in project && (project as any).live && (
                      <motion.a
                        href={(project as any).live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="text-xs font-mono px-2 py-0.5 rounded border text-muted-foreground hover:text-foreground transition-colors"
                        style={{ borderColor: "hsl(var(--primary) / 0.3)" }}
                        aria-label={`Live demo — ${project.title}`}
                      >
                        live ↗
                      </motion.a>
                    )}
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`GitHub — ${project.title}`}
                    >
                      <Github size={17} />
                    </motion.a>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-4 border-t border-[hsl(var(--primary)/0.12)]">
                  {project.tags.map((tag, ti) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.09 + ti * 0.06 }}
                      className="font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
