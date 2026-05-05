import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const GLASS: React.CSSProperties = {
  background: "hsl(var(--primary) / 0.05)",
  backdropFilter: "blur(16px) saturate(1.5)",
  WebkitBackdropFilter: "blur(16px) saturate(1.5)",
  borderColor: "hsl(var(--primary) / 0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
  transition: "border-color 0.4s ease, background 0.4s ease",
};

export function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(0_0%_20%)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[hsl(0_0%_40%)] text-sm">05.</span>
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Contact</h2>
            <div className="flex-1 h-px bg-[hsl(0_0%_14%)]" />
          </div>

          <p className="text-muted-foreground leading-relaxed mb-10">
            I'm currently looking for software engineering roles at product-driven
            companies. Whether you have an opportunity or just want to say hi — my
            inbox is always open.
          </p>

          <div className="space-y-3 mb-10">
            <a
              href="mailto:vprvijay02@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg border group transition-all"
              style={GLASS}
              data-testid="link-email"
            >
              <Mail size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                vprvijay02@gmail.com
              </span>
            </a>
            <a
              href="tel:+919688928251"
              className="flex items-center gap-3 p-4 rounded-lg border group transition-all"
              style={GLASS}
              data-testid="link-phone"
            >
              <Phone size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                +91 96889 28251
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/VPRvijay"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-muted-foreground hover:text-foreground transition-all text-sm"
              style={GLASS}
              data-testid="link-github-contact"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vijayvpr/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-muted-foreground hover:text-foreground transition-all text-sm"
              style={GLASS}
              data-testid="link-linkedin-contact"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
