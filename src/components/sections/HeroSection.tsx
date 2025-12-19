import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { IslamicPattern } from "@/components/ui/IslamicPattern";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("tentang");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background dark:from-background/90 dark:via-background/70 dark:to-background" />
      </div>

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <IslamicPattern className="w-full h-full text-secondary" size={100} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-section text-center py-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground dark:text-secondary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Pendaftaran Santri Baru Dibuka
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Membangun Generasi{" "}
            <span className="text-primary">Qurani</span>,{" "}
            <span className="text-secondary dark:text-secondary">Cendekia</span>, dan{" "}
            <span className="text-primary">Berakhlak Mulia</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Pesantren khusus untuk mahasiswa dengan program tahfidz, kajian rutin, 
            dan mentoring yang membentuk karakter Islami tanpa mengganggu kuliah.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-glow" asChild>
              <Link to="/#kontak">
                Daftar Santri Baru
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 border-secondary/50 hover:bg-secondary/10 hover:border-secondary"
              onClick={scrollToAbout}
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto">
            {[
              { number: "500+", label: "Alumni", highlight: false },
              { number: "50+", label: "Santri Aktif", highlight: true },
              { number: "10+", label: "Tahun Berdiri", highlight: false },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${stat.highlight ? 'text-secondary dark:text-secondary' : 'text-primary'}`}>{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
