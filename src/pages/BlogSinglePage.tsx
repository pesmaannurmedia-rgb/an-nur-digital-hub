import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogSinglePage = () => {
  const { slug } = useParams();
  
  return (
    <MainLayout>
      <article className="py-16">
        <div className="container-section max-w-4xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Kembali ke Blog</Link>
          </Button>
          
          <header className="mb-8">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Kajian</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">Keutamaan Menghafal Al-Quran bagi Mahasiswa</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />15 Desember 2024</span>
              <span className="flex items-center gap-1"><User className="w-4 h-4" />Ustadz Ahmad</span>
              <span className="flex items-center gap-1"><Tag className="w-4 h-4" />Kajian</span>
            </div>
          </header>

          <img src="https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80" alt="Artikel" className="w-full rounded-xl mb-8" />

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-muted-foreground leading-relaxed">Menghafal Al-Quran memiliki banyak keutamaan yang luar biasa. Rasulullah SAW bersabda bahwa orang yang menghafal Al-Quran akan bersama para malaikat yang mulia.</p>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Keutamaan Pertama: Derajat yang Tinggi</h2>
            <p className="text-muted-foreground leading-relaxed">Para penghafal Al-Quran akan mendapatkan kedudukan yang tinggi di sisi Allah SWT. Mereka adalah keluarga Allah di muka bumi.</p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">"Sesungguhnya Allah mempunyai keluarga dari manusia. Para sahabat bertanya, 'Siapa mereka ya Rasulullah?' Beliau menjawab, 'Mereka adalah ahli Quran, mereka adalah keluarga Allah dan orang-orang pilihan-Nya.'"</blockquote>
            <h2 className="text-xl font-bold text-foreground mt-8 mb-4">Tips Menghafal Al-Quran</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Ikhlas karena Allah</li>
              <li>Konsisten setiap hari</li>
              <li>Muraja'ah secara rutin</li>
              <li>Berguru kepada ustadz yang kompeten</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-6">Mari bergabung di Pesantren An-Nur untuk program tahfidz dengan bimbingan ustadz berpengalaman.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">Artikel Lainnya</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[{title: "Tips Produktif Ramadhan", slug: "tips-produktif"}, {title: "Pendaftaran 2025", slug: "pendaftaran-2025"}].map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                  <span className="font-medium text-foreground hover:text-primary">{a.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default BlogSinglePage;
