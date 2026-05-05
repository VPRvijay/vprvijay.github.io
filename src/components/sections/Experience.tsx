import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const ITEMS = [
  { title: "AI Virtual Internship",       org: "CodSoft",                     date: "Jul – Aug 2025", type: "internship"    },
  { title: "IBM EBPL Program",            org: "Naan Mudhalvan",               date: "Aug 2025",       type: "certification" },
  { title: "Big Data Certification",      org: "Infosys Springboard",          date: "Sep 2025",       type: "certification" },
  { title: "Big Data Certification",      org: "Infosys Springboard",          date: "Nov 2025",       type: "certification" },
  { title: "Python Certification",        org: "Tamizhan Skills RISE Program", date: "Mar 2026",       type: "certification" },
];

const EDUCATION = {
  degree:  "B.Tech — AI & Data Science",
  college: "T.J. Institute of Technology, Chennai",
  year:    "2023 – 2027",
};

const typeIcon: Record<string, React.ElementType> = {
  internship:   Briefcase,
  certification: Award,
};

const GLASS: React.CSSProperties = {
  background:           "hsl(var(--primary) / 0.05)",
  backdropFilter:       "blur(16px) saturate(1.5)",
  WebkitBackdropFilter: "blur(16px) saturate(1.5)",
  borderColor:          "hsl(var(--primary) / 0.2)",
  boxShadow:            "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
};

export function Experience() {
  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_20%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[hsl(0_0%_40%)] text-sm">04.</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Experience</h2>
            <div className="flex-1 h-px bg-[hsl(0_0%_14%)]" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_1px_2fr] gap-8">
          {/* Left — timeline */}
          <div>
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
              Internships &amp; Certifications
            </h3>
            <div className="relative pl-5">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-[hsl(0_0%_14%)]" />
              <div className="space-y-6">
                {ITEMS.map((item, i) => {
                  const Icon = typeIcon[item.type];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="relative"
                    >
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[hsl(0_0%_14%)] border border-[hsl(0_0%_25%)]" />
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon size={13} className="text-[hsl(0_0%_50%)] shrink-0" />
                        <span className="font-mono text-[11px] text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.org}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block bg-[hsl(0_0%_14%)]" />

          {/* Right — education */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-6">
              Education
            </h3>
            <div className="p-5 rounded-lg border" style={GLASS}>
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-[hsl(0_0%_50%)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{EDUCATION.degree}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{EDUCATION.college}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-2">{EDUCATION.year}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
