import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroBgFallback from "@/assets/hero-bg.jpg";

interface HeroSettings {
  hero_badge_text: string;
  hero_title_1: string;
  hero_title_highlight_1: string;
  hero_title_2: string;
  hero_title_3: string;
  hero_subtitle: string;
  hero_cta_primary_text: string;
  hero_cta_primary_link: string;
  hero_cta_secondary_text: string;
  hero_stat_1_number: string;
  hero_stat_1_label: string;
  hero_stat_2_number: string;
  hero_stat_2_label: string;
  hero_stat_3_number: string;
  hero_stat_3_label: string;
  hero_background_image: string;
}

const defaultSettings: HeroSettings = {
  hero_badge_text: "Pendaftaran Santri Baru Dibuka",
  hero_title_1: "Membangun Generasi",
  hero_title_highlight_1: "Qurani",
  hero_title_2: "Cendekia",
  hero_title_3: "Berakhlak Mulia",
  hero_subtitle: "Pesantren khusus untuk mahasiswa dengan program tahfidz, kajian rutin, dan mentoring yang membentuk karakter Islami tanpa mengganggu kuliah.",
  hero_cta_primary_text: "Daftar Santri Baru",
  hero_cta_primary_link: "/#kontak",
  hero_cta_secondary_text: "Pelajari Lebih Lanjut",
  hero_stat_1_number: "500+",
  hero_stat_1_label: "Alumni",
  hero_stat_2_number: "50+",
  hero_stat_2_label: "Santri Aktif",
  hero_stat_3_number: "10+",
  hero_stat_3_label: "Tahun Berdiri",
  hero_background_image: "",
};

export function HeroSection() {
  const [settings, setSettings] = useState<HeroSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const settingsMap: Partial<HeroSettings> = {};
        data.forEach((item) => {
          if (item.key.startsWith('hero_')) {
            settingsMap[item.key as keyof HeroSettings] = item.value || '';
          }
        });
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }
    } catch (error) {
      console.error('Error fetching hero settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("tentang");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const backgroundImage = settings.hero_background_image || heroBgFallback;

  const stats = [
    { number: settings.hero_stat_1_number, label: settings.hero_stat_1_label, highlight: false },
    { number: settings.hero_stat_2_number, label: settings.hero_stat_2_label, highlight: true },
    { number: settings.hero_stat_3_number, label: settings.hero_stat_3_label, highlight: false },
  ];

  if (loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background dark:from-background/90 dark:via-background/70 dark:to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-section text-center py-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Badge */}
          {settings.hero_badge_text && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {settings.hero_badge_text}
            </div>
          )}

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {settings.hero_title_1}{" "}
            <span className="text-primary">{settings.hero_title_highlight_1}</span>,{" "}
            <span className="text-secondary dark:text-secondary">{settings.hero_title_2}</span>, dan{" "}
            <span className="text-primary">{settings.hero_title_3}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {settings.hero_subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-glow" asChild>
              <Link to={settings.hero_cta_primary_link}>
                {settings.hero_cta_primary_text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 hover:border-primary"
              onClick={scrollToAbout}
            >
              {settings.hero_cta_secondary_text}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 max-w-xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl md:text-3xl font-bold ${stat.highlight ? 'text-secondary' : 'text-primary'}`}>
                  {stat.number}
                </div>
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
