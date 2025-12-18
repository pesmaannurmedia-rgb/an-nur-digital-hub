import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: 1,
    date: "15 Desember 2024",
    title: "Pendaftaran Santri Baru Periode Januari 2025",
    excerpt: "Dibuka pendaftaran santri baru untuk mahasiswa yang ingin bergabung.",
  },
  {
    id: 2,
    date: "10 Desember 2024",
    title: "Jadwal Kajian Kitab Bulughul Maram",
    excerpt: "Kajian rutin setiap Senin dan Kamis ba'da Maghrib bersama Ustadz Ahmad.",
  },
  {
    id: 3,
    date: "5 Desember 2024",
    title: "Wisuda Tahfidz Angkatan 2024",
    excerpt: "Alhamdulillah 15 santri telah menyelesaikan hafalan 30 juz Al-Quran.",
  },
  {
    id: 4,
    date: "1 Desember 2024",
    title: "Bakti Sosial Akhir Tahun",
    excerpt: "Santunan yatim dan dhuafa di sekitar pesantren bersama seluruh santri.",
  },
];

export function AnnouncementsSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-section">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Kabar Terbaru
            </span>
            <h2 className="section-title mt-2">Pengumuman Terbaru</h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/blog">
              Lihat Semua
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((item, index) => (
            <article 
              key={item.id}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:shadow-card transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <time>{item.date}</time>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.excerpt}</p>
                </div>
                <Link 
                  to="/blog" 
                  className="text-primary hover:underline text-sm font-medium whitespace-nowrap"
                >
                  Lihat Detail →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
