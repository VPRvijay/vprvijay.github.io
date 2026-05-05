import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { MouseTrail } from "@/components/MouseTrail";
import { CanvasMouseTrail } from "@/components/CanvasMouseTrail";
import { ThemeBalls } from "@/components/ThemeBalls";
import { ShootingStars } from "@/components/ShootingStars";
import { CardShine } from "@/components/CardShine";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ChatWidget } from "@/components/ChatWidget";

const queryClient = new QueryClient();

type AudioCtxCtor = typeof AudioContext;

function getAudioCtx(): AudioContext {
  const W = window as unknown as { webkitAudioContext?: AudioCtxCtor };
  const Ctor = window.AudioContext || W.webkitAudioContext!;
  return new Ctor();
}

/** Short "tock" — regular click */
function playClickSound() {
  try {
    const ctx = getAudioCtx();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.11, ctx.currentTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
    osc.onended = () => ctx.close();
  } catch { /* ignore */ }
}

/** Soft two-note chime — link click (Contact / GitHub / LinkedIn) */
function playLinkSound() {
  try {
    const ctx = getAudioCtx();

    const note = (freq: number, startDelay: number, duration: number, vol: number) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + startDelay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startDelay + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + startDelay + duration);
      return osc;
    };

    const n1 = note(880,  0,    0.22, 0.09);
    note(1108, 0.07, 0.20, 0.07);
    n1.onended = undefined as unknown as null;
    setTimeout(() => ctx.close(), 500);
  } catch { /* ignore */ }
}

function Home() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      const isLink = !!target.closest("a[href]");
      if (isLink) {
        playLinkSound();
      } else {
        playClickSound();
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid-bg" />
      <ShootingStars />
      <MouseTrail />
      <CanvasMouseTrail />
      <CardShine />
      <ThemeBalls />
      <div className="content-layer">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
      <ChatWidget />
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
