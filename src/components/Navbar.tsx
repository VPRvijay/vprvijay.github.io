import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about",      label: "About",      num: "01" },
  { href: "#skills",     label: "Skills",     num: "02" },
  { href: "#projects",   label: "Projects",   num: "03" },
  { href: "#experience", label: "Experience", num: "04" },
  { href: "#contact",    label: "Contact",    num: "05" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        isScrolled
          ? {
              background: "hsl(var(--background) / 0.75)",
              backdropFilter: "blur(20px) saturate(1.5)",
              WebkitBackdropFilter: "blur(20px) saturate(1.5)",
              borderBottom: "1px solid hsl(var(--primary) / 0.15)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
            }
          : {}
      }
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
          data-testid="link-logo"
        >
          <span className="w-2 h-2 rounded-full bg-primary pulse-dot" />
          <span className="font-mono text-sm font-medium text-foreground">
            vijay<span className="text-muted-foreground">.dev</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              <span className="font-mono text-[hsl(0_0%_40%)] text-xs mr-1">{link.num}.</span>
              {link.label}
            </a>
          ))}
          <a
            href="/Vijay_Resume.docx"
            download="Vijay_Prabhakar_Resume.docx"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground rounded-md border transition-all"
            style={{
              background: "hsl(var(--primary) / 0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "hsl(var(--primary) / 0.25)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            data-testid="button-resume"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "hsl(var(--background) / 0.85)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid hsl(var(--primary) / 0.15)",
            }}
            className="md:hidden"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-mono text-[hsl(0_0%_40%)] text-xs mr-1">{link.num}.</span>
                  {link.label}
                </a>
              ))}
              <a
                href="/Vijay_Resume.docx"
                download="Vijay_Prabhakar_Resume.docx"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground rounded-md border w-fit"
                style={{
                  background: "hsl(var(--primary) / 0.08)",
                  borderColor: "hsl(var(--primary) / 0.25)",
                }}
              >
                <Download size={14} />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
