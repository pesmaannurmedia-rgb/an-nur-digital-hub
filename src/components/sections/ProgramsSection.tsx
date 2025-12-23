import { useState, useEffect } from "react";
import { BookOpen, Users, Heart, Globe, GraduationCap, Moon, Star, Award, Lightbulb, Target, Compass, Feather, Languages, School, Library, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ProgramsSettings {
  programs_section_label: string;
  programs_section_title: string;
  programs_section_subtitle: string;
}

interface Program {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  position: number | null;
  is_active: boolean | null;
}

const defaultSettings: ProgramsSettings = {
  programs_section_label: "Program Kami",
  programs_section_title: "Program Unggulan",
  programs_section_subtitle: "Berbagai program pendidikan dan pembinaan untuk membentuk santri yang berkualitas",
};

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  BookOpen,
  GraduationCap,
  Users,
  Heart,
  Globe,
  Moon,
  Star,
  Award,
  Lightbulb,
  Target,
  Compass,
  Feather,
  Languages,
  School,
  Library,
  Pencil,
};

// Fallback programs if database is empty
const fallbackPrograms = [
  {
    id: '1',
    icon: 'BookOpen',
    title: "Program Tahfidz/Tahsin",
    description: "Menghafal Al-Quran dengan metode mutqin dan talaqqi langsung dengan ustadz berpengalaman.",
    position: 0,
    is_active: true,
  },
  {
    id: '2',
    icon: 'Moon',
    title: "Kajian Rutin",
    description: "Kajian kitab kuning dan fiqh kontemporer setiap malam untuk memperdalam pemahaman agama.",
    position: 1,
    is_active: true,
  },
  {
    id: '3',
    icon: 'Users',
    title: "Mentoring & Halaqah",
    description: "Bimbingan personal dan halaqah mingguan untuk pembinaan karakter dan akhlak.",
    position: 2,
    is_active: true,
  },
  {
    id: '4',
    icon: 'Heart',
    title: "Kegiatan Sosial",
    description: "Bakti sosial, santunan yatim, dan pengabdian masyarakat sebagai wujud kepedulian.",
    position: 3,
    is_active: true,
  },
  {
    id: '5',
    icon: 'GraduationCap',
    title: "Pendampingan Akademik",
    description: "Dukungan belajar dan manajemen waktu agar santri tetap berprestasi di kampus.",
    position: 4,
    is_active: true,
  },
  {
    id: '6',
    icon: 'Globe',
    title: "Pengembangan Skill",
    description: "Pelatihan public speaking, leadership, dan keterampilan digital untuk masa depan.",
    position: 5,
    is_active: true,
  },
];

export function ProgramsSection() {
  const [settings, setSettings] = useState<ProgramsSettings>(defaultSettings);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('key, value');

      if (settingsData) {
        const settingsMap: Partial<ProgramsSettings> = {};
        settingsData.forEach((item) => {
          if (item.key.startsWith('programs_') && item.value) {
            settingsMap[item.key as keyof ProgramsSettings] = item.value;
          }
        });
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }

      // Fetch programs from database
      const { data: programsData, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      
      // Use database programs if available, otherwise use fallback
      if (programsData && programsData.length > 0) {
        setPrograms(programsData);
      } else {
        setPrograms(fallbackPrograms as Program[]);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      setPrograms(fallbackPrograms as Program[]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string | null) => {
    const IconComponent = iconMap[iconName || 'BookOpen'] || BookOpen;
    return IconComponent;
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
          {programs.map((program, index) => {
            const IconComponent = getIcon(program.icon);
            const isHighlight = index === 0 || index === 3;
            
            return (
              <Card
                key={program.id}
                className={`group hover:shadow-card-hover transition-all duration-300 ${
                  isHighlight ? "hover:border-secondary/50 border-secondary/20" : "hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isHighlight
                        ? "bg-secondary/15 group-hover:bg-secondary group-hover:shadow-[0_0_24px_hsla(38,92%,50%,0.3)]"
                        : "bg-primary/10 group-hover:bg-primary group-hover:shadow-glow"
                    }`}
                  >
                    <IconComponent
                      className={`w-7 h-7 transition-colors ${
                        isHighlight
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
