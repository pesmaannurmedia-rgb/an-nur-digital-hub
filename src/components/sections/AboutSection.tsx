import { BookOpen, GraduationCap, Heart, Users } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

export function AboutSection() {
  const values = [
    { icon: BookOpen, label: "Qurani", desc: "Berbasis Al-Quran dan Sunnah" },
    { icon: GraduationCap, label: "Akademis", desc: "Mendukung prestasi kuliah" },
    { icon: Heart, label: "Akhlak", desc: "Membentuk karakter mulia" },
    { icon: Users, label: "Sosial", desc: "Membangun ukhuwah Islamiyah" },
  ];

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
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Tahun Pengalaman</div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Tentang Kami
              </span>
              <h2 className="section-title mt-2">
                Tentang Pesantren Mahasiswa An-Nur
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Pesantren Mahasiswa An-Nur didirikan untuk menjawab kebutuhan mahasiswa Muslim 
              yang ingin mendalami ilmu agama tanpa meninggalkan pendidikan formal. 
              Kami menyediakan lingkungan yang kondusif untuk belajar Al-Quran, kajian Islam, 
              dan pengembangan diri.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Visi kami:</strong> Mencetak generasi muda Muslim 
              yang Qurani, cendekia, dan berakhlak mulia yang siap berkontribusi untuk umat dan bangsa.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Misi kami:</strong> Menyelenggarakan pendidikan 
              pesantren yang berkualitas, membina akhlak dan karakter Islami, serta membekali 
              santri dengan ilmu agama dan keterampilan hidup.
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
