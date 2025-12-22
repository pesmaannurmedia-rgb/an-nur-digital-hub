import { useState, useEffect } from "react";
import { BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import aboutImageFallback from "@/assets/about-image.jpg";

interface AboutSettings {
  about_section_label: string;
  about_section_title: string;
  about_description_1: string;
  about_vision: string;
  about_mission: string;
  about_image_url: string;
  about_experience_number: string;
  about_experience_label: string;
}

const defaultSettings: AboutSettings = {
  about_section_label: "Tentang Kami",
  about_section_title: "Tentang Pesantren Mahasiswa An-Nur",
  about_description_1: "Pesantren Mahasiswa An-Nur didirikan untuk menjawab kebutuhan mahasiswa Muslim yang ingin mendalami ilmu agama tanpa meninggalkan pendidikan formal. Kami menyediakan lingkungan yang kondusif untuk belajar Al-Quran, kajian Islam, dan pengembangan diri.",
  about_vision: "Mencetak generasi muda Muslim yang Qurani, cendekia, dan berakhlak mulia yang siap berkontribusi untuk umat dan bangsa.",
  about_mission: "Menyelenggarakan pendidikan pesantren yang berkualitas, membina akhlak dan karakter Islami, serta membekali santri dengan ilmu agama dan keterampilan hidup.",
  about_image_url: "",
  about_experience_number: "10+",
  about_experience_label: "Tahun Pengalaman",
};

export function AboutSection() {
  const [settings, setSettings] = useState<AboutSettings>(defaultSettings);

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
        const settingsMap: Partial<AboutSettings> = {};
        data.forEach((item) => {
          if (item.key.startsWith('about_') && item.value) {
            settingsMap[item.key as keyof AboutSettings] = item.value;
          }
        });
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }
    } catch (error) {
      console.error('Error fetching about settings:', error);
    }
  };

  const values = [
    { icon: BookOpen, label: "Qurani", desc: "Berbasis Al-Quran dan Sunnah" },
    { icon: GraduationCap, label: "Akademis", desc: "Mendukung prestasi kuliah" },
    { icon: Heart, label: "Akhlak", desc: "Membentuk karakter mulia" },
    { icon: Users, label: "Sosial", desc: "Membangun ukhuwah Islamiyah" },
  ];

  const aboutImage = settings.about_image_url || aboutImageFallback;

  return (
    <section id="tentang" className="py-20 bg-surface">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              <img
                src={aboutImage}
                alt="Santri belajar bersama di Pesantren An-Nur"
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-card hidden md:block">
              <div className="text-3xl font-bold text-primary">{settings.about_experience_number}</div>
              <div className="text-sm text-muted-foreground">{settings.about_experience_label}</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                {settings.about_section_label}
              </span>
              <h2 className="section-title mt-2">
                {settings.about_section_title}
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {settings.about_description_1}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Visi kami:</strong> {settings.about_vision}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Misi kami:</strong> {settings.about_mission}
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {values.map((value) => (
                <div 
                  key={value.label} 
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{value.label}</div>
                    <div className="text-sm text-muted-foreground">{value.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
