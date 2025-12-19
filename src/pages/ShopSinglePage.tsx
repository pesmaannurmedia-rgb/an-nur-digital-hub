import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string | null;
  image_url: string | null;
  stock: number | null;
}

const ShopSinglePage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setNotFound(true);
      } else {
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  if (notFound || !product) {
    return (
      <MainLayout>
        <div className="py-16 text-center">
          <div className="container-section max-w-4xl">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Produk Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">Produk yang Anda cari tidak tersedia atau sudah dihapus.</p>
            <Button asChild>
              <Link to="/shop">Kembali ke Toko</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const waLink = `https://wa.me/6281234567890?text=Assalamu'alaikum,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`;

  return (
    <MainLayout>
      <section className="py-16">
        <div className="container-section max-w-5xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-2" />Kembali ke Toko</Link>
          </Button>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden bg-muted">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-auto object-cover" />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-muted-foreground/50" />
                </div>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-secondary-foreground dark:text-secondary bg-secondary/20 px-3 py-1 rounded-full">{product.category}</span>
              <h1 className="text-3xl font-bold text-foreground mt-4 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-2">Rp {product.price.toLocaleString('id-ID')}</p>
              {product.stock !== null && (
                <p className="text-sm text-muted-foreground mb-6">
                  Stok: {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                </p>
              )}
              <p className="text-muted-foreground mb-8">{product.description || 'Deskripsi produk tidak tersedia.'}</p>
              <Button size="lg" className="w-full" asChild disabled={product.stock === 0}>
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
