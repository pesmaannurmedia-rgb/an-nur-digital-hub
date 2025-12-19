import { MainLayout } from "@/components/layout/MainLayout";
import { Search, ShoppingBag, Loader2, Percent, X, Filter } from "lucide-react";
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

interface Category {
  id: string;
  name: string;
  slug: string;
}

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('type', 'product')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getDiscountPercentage = (product: Product) => {
    if (product.discount_percentage) return product.discount_percentage;
    if (product.discount_price && product.price > 0) {
      return Math.round(((product.price - product.discount_price) / product.price) * 100);
    }
    return 0;
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearch("");
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    return matchesSearch && matchesCategory;
  });

  const hasActiveFilters = selectedCategories.length > 0 || search.length > 0;

  return (
    <MainLayout>
      <section className="py-16 bg-surface min-h-screen">
        <div className="container-section">
          <div className="text-center mb-12">
            <h1 className="section-title">Toko An-Nur</h1>
            <p className="section-subtitle">Buku, merchandise, dan produk resmi Pesantren An-Nur</p>
          </div>

          {/* Search & Filter Section */}
          <div className="max-w-4xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Cari produk..." 
                className="pl-10" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Kategori:</span>
                {categories.map(category => (
                  <Badge
                    key={category.id}
                    variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => toggleCategory(category.name)}
                  >
                    {category.name}
                    {selectedCategories.includes(category.name) && (
                      <X className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>

              {/* Active Filters & Clear */}
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Menampilkan {filtered.length} dari {products.length} produk
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                    <X className="w-3 h-3 mr-1" />
                    Hapus Filter
                  </Button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>{hasActiveFilters ? 'Tidak ada produk yang sesuai filter' : 'Belum ada produk tersedia'}</p>
              {hasActiveFilters && (
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  Hapus semua filter
                </Button>
              )}
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
