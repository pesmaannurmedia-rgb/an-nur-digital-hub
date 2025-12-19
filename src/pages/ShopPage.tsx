import { MainLayout } from "@/components/layout/MainLayout";
import { Search, ShoppingBag, Loader2, Percent, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  discount_price: number | null;
  discount_percentage: number | null;
  is_on_sale: boolean | null;
  category: string;
  image_url: string | null;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, slug, name, price, discount_price, discount_percentage, is_on_sale, category, image_url')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiscountPercentage = (product: Product) => {
    if (product.discount_percentage) return product.discount_percentage;
    if (product.discount_price && product.price > 0) {
      return Math.round(((product.price - product.discount_price) / product.price) * 100);
    }
    return 0;
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

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

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {search ? 'Produk tidak ditemukan' : 'Belum ada produk tersedia'}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map(product => {
                const isOnSale = product.is_on_sale && product.discount_price && product.discount_price < product.price;
                const discountPercent = getDiscountPercentage(product);
                
                return (
                  <Link to={`/shop/${product.slug}`} key={product.id} className="block">
                    <article className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover transition-all cursor-pointer h-full">
                      <div className="aspect-square overflow-hidden bg-muted relative">
                        {/* Discount Badge */}
                        {isOnSale && (
                          <div className="absolute top-2 left-2 z-10">
                            <Badge className="bg-destructive text-destructive-foreground font-bold text-xs px-2 py-1">
                              <Percent className="w-3 h-3 mr-1" />
                              {discountPercent}%
                            </Badge>
                          </div>
                        )}
                        
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-medium text-secondary-foreground dark:text-secondary bg-secondary/20 px-2 py-1 rounded">{product.category}</span>
                        <h2 className="font-semibold text-foreground mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h2>
                        
                        {/* Price Display */}
                        <div className="mb-3">
                          {isOnSale ? (
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm text-muted-foreground line-through">Rp {product.price.toLocaleString('id-ID')}</p>
                              <p className="text-lg font-bold text-destructive">Rp {product.discount_price?.toLocaleString('id-ID')}</p>
                            </div>
                          ) : (
                            <p className="text-lg font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</p>
                          )}
                        </div>
                        
                        <Button size="sm" className="w-full">
                          <ShoppingBag className="w-4 h-4 mr-2" />Lihat Detail
                        </Button>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ShopPage;
