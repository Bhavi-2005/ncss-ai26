import { Link } from "react-router-dom";
import { BookOpen, Users, Lightbulb, Code, ArrowRight, Calendar } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const infoCards = [
  {
    icon: Code,
    title: "Industry Exposure",
    description: "Gain industry exposure by interacting with experts and learning about current technology trends.",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with researchers, faculty, and industry professionals from across the nation.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Explore groundbreaking ideas in AI, smart systems, and future technologies.",
  },
];

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "1000+", label: "Alumni Network" },
  { value: "50+", label: "Research Papers" },
  { value: "16 Apr", label: "Conference Date" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 text-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10 max-w-4xl mx-auto w-full px-2 sm:px-4">
          <p className="mb-2 text-xs sm:text-sm font-medium tracking-widest text-primary uppercase opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Er. Perumal Manimekalai College of Engineering
          </p>
          <p className="mb-1 text-xs text-muted-foreground opacity-0 animate-fade-in-up hidden sm:block" style={{ animationDelay: "0.2s" }}>
            Approved by AICTE, New Delhi · Affiliated to Anna University, Chennai
          </p>
          <p className="mb-1 text-xs text-muted-foreground opacity-0 animate-fade-in-up hidden md:block" style={{ animationDelay: "0.25s" }}>
            Accredited by NAAC with 'A' Grade & NBA · AN AUTONOMOUS INSTITUTION
          </p>
          <p className="mb-4 sm:mb-6 text-xs text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            Konerippalli, HOSUR - 635 117.
          </p>

          <div className="mb-3 sm:mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <p className="text-xs sm:text-sm font-semibold text-primary tracking-wider uppercase">
              Department of Computer Science and Engineering
            </p>
            <p className="mt-1 text-xs text-muted-foreground italic">Proudly presents</p>
          </div>

          <h2 className="mb-2 text-base sm:text-lg md:text-xl font-medium text-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            National Conference on Smart Systems and Generative AI
          </h2>

          <h1 className="mb-6 sm:mb-8 font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight opacity-0 animate-fade-in-up glow-text" style={{ animationDelay: "0.6s" }}>
            <span className="text-foreground">NCSS.</span>
            <span className="text-primary">AI</span>
            <span className="text-foreground">'26</span>
          </h1>

          <div className="mb-6 sm:mb-8 flex items-center justify-center gap-2 text-foreground font-semibold opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <Calendar size={18} className="text-primary" />
            <span className="text-sm sm:text-base font-bold">16th April, 2026</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 opacity-0 animate-fade-in-up w-full sm:w-auto" style={{ animationDelay: "0.8s" }}>
            <Link
              to="/guidelines"
              className="w-full sm:w-auto rounded-full border border-primary/30 bg-secondary px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 hover:bg-primary/10 hover:border-primary btn-glow flex items-center justify-center gap-2"
            >
              Guidelines <ArrowRight size={16} />
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto rounded-full gradient-button px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground btn-glow flex items-center justify-center gap-2"
            >
              Register <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground text-xs animate-bounce">
          Scroll for more
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-2 text-center font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Why Participate?
          </h2>
          <p className="mb-8 sm:mb-12 text-center text-sm sm:text-base text-muted-foreground">
            Join NCSS.AI'26 for an unforgettable experience in cutting-edge AI research and smart systems
          </p>

          <div className="flex sm:grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 sm:justify-center scroll-hidden">
            {infoCards.map((card, i) => (
              <div
                key={card.title}
                className="gradient-card rounded-2xl p-5 sm:p-6 glow-border card-hover opacity-0 animate-fade-in-up flex-shrink-0 w-72 sm:w-auto"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-xs sm:text-sm font-bold text-foreground text-center">{card.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-center">{card.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 sm:mt-0 text-center text-xs text-muted-foreground/70 sm:hidden">scroll for more &gt;&gt;</p>
        </div>
      </section>

      {/* About / Stats */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 gradient-hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            About the Department
          </h2>
          <p className="mb-8 sm:mb-12 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The Computer Science and Engineering Department at Er. Perumal Manimekalai College of Engineering
            is a hub of innovation and excellence. We nurture future technology leaders with state-of-the-art
            facilities and experienced faculty.
          </p>

          <div className="flex md:grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:justify-center scroll-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="gradient-card rounded-2xl p-4 sm:p-6 glow-border card-hover flex-shrink-0 w-40 sm:w-48 md:w-auto">
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 md:mt-0 text-center text-xs text-muted-foreground/70 md:hidden">scroll for more &gt;&gt;</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 sm:py-8 px-4 sm:px-6 md:px-8 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © 2026 NCSS.AI'26 · Er. Perumal Manimekalai College of Engineering
        </p>
        <p className="mt-2 text-xs text-muted-foreground/70">
          Department of Computer Science and Engineering
        </p>
      </footer>
    </div>
  );
};

export default Index;
