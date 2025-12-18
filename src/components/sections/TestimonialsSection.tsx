import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    status: "Alumni 2023 - Mahasiswa Teknik",
    quote: "Pesantren An-Nur mengajarkan saya bagaimana menyeimbangkan kuliah dan ibadah. Alhamdulillah bisa hafal 10 juz sambil tetap lulus cum laude.",
  },
  {
    id: 2,
    name: "Fatimah Azzahra",
    status: "Santri Aktif - Mahasiswi Kedokteran",
    quote: "Lingkungan yang Islami dan supportif sangat membantu saya melewati masa-masa sulit kuliah kedokteran. Ukhuwah di sini luar biasa.",
  },
  {
    id: 3,
    name: "Muhammad Rizki",
    status: "Alumni 2022 - Entrepreneur",
    quote: "Nilai-nilai yang diajarkan di pesantren sangat bermanfaat dalam membangun bisnis yang halal dan berkah. Jazakumullah khairan untuk seluruh asatidz.",
  },
  {
    id: 4,
    name: "Aisyah Putri",
    status: "Santri Aktif - Mahasiswi Hukum",
    quote: "Belajar di An-Nur membuat saya lebih percaya diri dengan identitas Muslimah saya. Kajian-kajian di sini sangat relevan dengan kehidupan modern.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Testimoni
          </span>
          <h2 className="section-title mt-2">Apa Kata Alumni & Santri</h2>
          <p className="section-subtitle">
            Cerita dan pengalaman dari mereka yang telah merasakan manfaat belajar di An-Nur
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
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.status}</div>
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
