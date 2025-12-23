import { useState, useEffect } from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface TestimonialsSettings {
  testimonials_section_label: string;
  testimonials_section_title: string;
  testimonials_section_subtitle: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  avatar_url: string | null;
  rating: number | null;
  position: number | null;
  is_active: boolean | null;
}

const defaultSettings: TestimonialsSettings = {
  testimonials_section_label: "Testimoni",
  testimonials_section_title: "Apa Kata Alumni & Santri",
  testimonials_section_subtitle: "Cerita dan pengalaman dari mereka yang telah merasakan manfaat belajar di An-Nur",
};

// Fallback testimonials if database is empty
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: "Ahmad Fauzi",
    role: "Alumni 2023 - Mahasiswa Teknik",
    content: "Pesantren An-Nur mengajarkan saya bagaimana menyeimbangkan kuliah dan ibadah. Alhamdulillah bisa hafal 10 juz sambil tetap lulus cum laude.",
    avatar_url: null,
    rating: 5,
    position: 0,
    is_active: true,
  },
  {
    id: '2',
    name: "Fatimah Azzahra",
    role: "Santri Aktif - Mahasiswi Kedokteran",
    content: "Lingkungan yang Islami dan supportif sangat membantu saya melewati masa-masa sulit kuliah kedokteran. Ukhuwah di sini luar biasa.",
    avatar_url: null,
    rating: 5,
    position: 1,
    is_active: true,
  },
  {
    id: '3',
    name: "Muhammad Rizki",
    role: "Alumni 2022 - Entrepreneur",
    content: "Nilai-nilai yang diajarkan di pesantren sangat bermanfaat dalam membangun bisnis yang halal dan berkah. Jazakumullah khairan untuk seluruh asatidz.",
    avatar_url: null,
    rating: 5,
    position: 2,
    is_active: true,
  },
  {
    id: '4',
    name: "Aisyah Putri",
    role: "Santri Aktif - Mahasiswi Hukum",
    content: "Belajar di An-Nur membuat saya lebih percaya diri dengan identitas Muslimah saya. Kajian-kajian di sini sangat relevan dengan kehidupan modern.",
    avatar_url: null,
    rating: 5,
    position: 3,
    is_active: true,
  },
];

export function TestimonialsSection() {
  const [settings, setSettings] = useState<TestimonialsSettings>(defaultSettings);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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
        const settingsMap: Partial<TestimonialsSettings> = {};
        settingsData.forEach((item) => {
          if (item.key.startsWith('testimonials_') && item.value) {
            settingsMap[item.key as keyof TestimonialsSettings] = item.value;
          }
        });
        setSettings(prev => ({ ...prev, ...settingsMap }));
      }

      // Fetch testimonials from database
      const { data: testimonialsData, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('position', { ascending: true });

      if (error) throw error;
      
      // Use database testimonials if available, otherwise use fallback
      if (testimonialsData && testimonialsData.length > 0) {
        setTestimonials(testimonialsData);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            {settings.testimonials_section_label}
          </span>
          <h2 className="section-title mt-2">{settings.testimonials_section_title}</h2>
          <p className="section-subtitle">
            {settings.testimonials_section_subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-card-hover transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                {/* Quote Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 pr-12">
                  "{testimonial.content}"
                </blockquote>

                {/* Rating */}
                {testimonial.rating && testimonial.rating > 0 && (
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-3">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
