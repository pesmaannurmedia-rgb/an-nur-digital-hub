import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const blogPosts = [
  { id: 1, slug: "keutamaan-tahfidz", title: "Keutamaan Menghafal Al-Quran", excerpt: "Menghafal Al-Quran memiliki banyak keutamaan...", date: "15 Des 2024", author: "Ustadz Ahmad", category: "Kajian", image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=400&q=80" },
  { id: 2, slug: "tips-produktif-ramadhan", title: "Tips Produktif di Bulan Ramadhan", excerpt: "Ramadhan adalah bulan penuh berkah...", date: "10 Des 2024", author: "Ustadzah Fatimah", category: "Tips", image: "https://images.unsplash.com/photo-1584286595398-a59511e0649f?w=400&q=80" },
  { id: 3, slug: "pendaftaran-2025", title: "Pendaftaran Santri Baru 2025 Dibuka", excerpt: "Alhamdulillah pendaftaran santri baru...", date: "5 Des 2024", author: "Admin", category: "Pengumuman", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80" },
];

const BlogPage = () => {
  const [search, setSearch] = useState("");
  const filtered = blogPosts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <section className="py-16 bg-surface">
        <div className="container-section">
          <div className="text-center mb-12">
            <h1 className="section-title">Blog & Kajian An-Nur</h1>
            <p className="section-subtitle">Artikel, kajian, dan pengumuman dari Pesantren An-Nur</p>
          </div>
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Cari artikel..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <article key={post.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
                  <h2 className="font-semibold text-foreground mt-3 mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-primary hover:underline flex items-center gap-1">Baca <ArrowRight className="w-3 h-3" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogPage;
