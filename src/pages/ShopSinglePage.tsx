import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopSinglePage = () => {
  const { slug } = useParams();
  const product = { name: "Buku Panduan Tahsin", price: 75000, category: "Buku", description: "Buku panduan lengkap untuk belajar tahsin Al-Quran dengan metode yang mudah dipahami. Cocok untuk pemula maupun yang ingin memperbaiki bacaan.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80" };
  
  const waLink = `https://wa.me/6281234567890?text=Assalamu'alaikum,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`;

  return (
    <MainLayout>
      <section className="py-16">
        <div className="container-section max-w-5xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-2" />Kembali ke Toko</Link>
          </Button>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover" />
            </div>
            <div>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{product.category}</span>
              <h1 className="text-3xl font-bold text-foreground mt-4 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
              <p className="text-muted-foreground mb-8">{product.description}</p>
              <Button size="lg" className="w-full" asChild>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-5 h-5 mr-2" />Hubungi Admin untuk Pemesanan
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ShopSinglePage;
