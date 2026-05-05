import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(0_0%_10%)] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-muted-foreground">
          &copy; {new Date().getFullYear()} S. Vijay Prabhakar
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/VPRvijay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/vijayvpr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
