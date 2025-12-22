import { useState, useEffect } from "react";
import { BookOpen, Users, Heart, Globe, GraduationCap, Moon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ProgramsSettings {
  programs_section_label: string;
  programs_section_title: string;
  programs_section_subtitle: string;
}

const defaultSettings: ProgramsSettings = {
  programs_section_label: "Program Kami",
  programs_section_title: "Program Unggulan",
  programs_section_subtitle: "Berbagai program pendidikan dan pembinaan untuk membentuk santri yang berkualitas",
};

const programs = [
  {
    icon: BookOpen,
    title: "Program Tahfidz/Tahsin",
    description: "Menghafal Al-Quran dengan metode mutqin dan talaqqi langsung dengan ustadz berpengalaman.",
    highlight: true,
  },
  {
    icon: Moon,
    title: "Kajian Rutin",
    description: "Kajian kitab kuning dan fiqh kontemporer setiap malam untuk memperdalam pemahaman agama.",
    highlight: false,
  },
  {
    icon: Users,
    title: "Mentoring & Halaqah",
    description: "Bimbingan personal dan halaqah mingguan untuk pembinaan karakter dan akhlak.",
    highlight: false,
  },
  {
    icon: Heart,
    title: "Kegiatan Sosial",
    description: "Bakti sosial, santunan yatim, dan pengabdian masyarakat sebagai wujud kepedulian.",
    highlight: true,
  },
  {
    icon: GraduationCap,
    title: "Pendampingan Akademik",
    description: "Dukungan belajar dan manajemen waktu agar santri tetap berprestasi di kampus.",
    highlight: false,
  },
  {
    icon: Globe,
    title: "Pengembangan Skill",
    description: "Pelatihan public speaking, leadership, dan keterampilan digital untuk masa depan.",
    highlight: false,
  },
];

export function ProgramsSection() {
  const [settings, setSettings] = useState<ProgramsSettings>(defaultSettings);

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
        const settingsMap: Partial<ProgramsSettings> = {};
        data.forEach((item) => {
          if (item.key.startsWith('programs_') && item.value) {
            settingsMap[item.key as keyof ProgramsSettings] = item.value;
          }
        });
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }
    } catch (error) {
      console.error('Error fetching programs settings:', error);
    }
  };

  return (
    <section id="program" className="py-20 bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {settings.programs_section_label}
          </span>
          <h2 className="section-title mt-2">{settings.programs_section_title}</h2>
          <p className="section-subtitle">
            {settings.programs_section_subtitle}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              className={`group hover:shadow-card-hover transition-all duration-300 ${
                program.highlight ? "hover:border-secondary/50 border-secondary/20" : "hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    program.highlight
                      ? "bg-secondary/15 group-hover:bg-secondary group-hover:shadow-[0_0_24px_hsla(38,92%,50%,0.3)]"
                      : "bg-primary/10 group-hover:bg-primary group-hover:shadow-glow"
                  }`}
                >
                  <program.icon
                    className={`w-7 h-7 transition-colors ${
                      program.highlight
                        ? "text-secondary group-hover:text-secondary-foreground"
                        : "text-primary group-hover:text-primary-foreground"
                    }`}
                  />
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{program.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
