import { MainLayout } from "@/components/layout/MainLayout";
import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const products = [
  { id: 1, slug: "buku-tahsin", name: "Buku Panduan Tahsin", price: 75000, category: "Buku", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
  { id: 2, slug: "mushaf-hafalan", name: "Mushaf Hafalan Premium", price: 150000, category: "Buku", image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&q=80" },
  { id: 3, slug: "kaos-annur", name: "Kaos Pesantren An-Nur", price: 85000, category: "Merchandise", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80" },
  { id: 4, slug: "tumbler-annur", name: "Tumbler An-Nur", price: 95000, category: "Merchandise", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80" },
];

const ShopPage = () => {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <MainLayout>
      <section className="py-16 bg-surface min-h-screen">
        <div className="container-section">
          <div className="text-center mb-12">
            <h1 className="section-title">Toko An-Nur</h1>
            <p className="section-subtitle">Buku, merchandise, dan produk resmi Pesantren An-Nur</p>
          </div>
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Cari produk..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <article key={product.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover transition-all">
                <div className="aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{product.category}</span>
                  <h2 className="font-semibold text-foreground mt-2 mb-1">{product.name}</h2>
                  <p className="text-lg font-bold text-primary mb-3">Rp {product.price.toLocaleString('id-ID')}</p>
                  <Button size="sm" className="w-full" asChild>
                    <Link to={`/shop/${product.slug}`}><ShoppingBag className="w-4 h-4 mr-2" />Lihat Detail</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ShopPage;
