import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MessageSquare, Loader2, BookOpen, Calendar, Building2, FileText, Hash, Globe, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";

interface Book {
  id: string;
  name: string;
  slug: string;
  author: string | null;
  publisher: string | null;
  publish_year: number | null;
  edition: string | null;
  pages: number | null;
  language: string | null;
  isbn: string | null;
  doi: string | null;
  abstract: string | null;
  description: string | null;
  keywords: string[] | null;
  category: string;
  price: number;
  stock: number | null;
  image_url: string | null;
}

const ShopSinglePage = () => {
  const { slug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const fetchBook = async () => {
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
        setBook(data);
      }
    } catch (error) {
      console.error('Error fetching book:', error);
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

  if (notFound || !book) {
    return (
      <MainLayout>
        <div className="py-16 text-center">
          <div className="container-section max-w-4xl">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Buku Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">Buku yang Anda cari tidak tersedia atau sudah dihapus.</p>
            <Button asChild>
              <Link to="/shop">Kembali ke Katalog</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const waLink = `https://wa.me/6281234567890?text=Assalamu'alaikum,%20saya%20ingin%20memesan%20buku%20"${encodeURIComponent(book.name)}"`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Format citation
  const formatCitation = () => {
    const parts = [];
    if (book.author) parts.push(book.author);
    if (book.publish_year) parts.push(`(${book.publish_year})`);
    parts.push(`${book.name}.`);
    if (book.edition) parts.push(`${book.edition}.`);
    if (book.publisher) parts.push(`${book.publisher}.`);
    if (book.isbn) parts.push(`ISBN: ${book.isbn}.`);
    return parts.join(' ');
  };

  return (
    <MainLayout>
      {/* SEO Meta Tags for Google Scholar */}
      <Helmet>
        <title>{book.name} | Toko Buku Pesantren An-Nur</title>
        <meta name="description" content={book.abstract || book.description || `${book.name} oleh ${book.author}`} />
        
        {/* Google Scholar Meta Tags */}
        <meta name="citation_title" content={book.name} />
        {book.author && <meta name="citation_author" content={book.author} />}
        {book.publish_year && <meta name="citation_publication_date" content={String(book.publish_year)} />}
        {book.publisher && <meta name="citation_publisher" content={book.publisher} />}
        {book.isbn && <meta name="citation_isbn" content={book.isbn} />}
        {book.doi && <meta name="citation_doi" content={book.doi} />}
        {book.language && <meta name="citation_language" content={book.language} />}
        {book.abstract && <meta name="citation_abstract" content={book.abstract} />}
        {book.keywords?.map((keyword, i) => (
          <meta key={i} name="citation_keywords" content={keyword} />
        ))}
        
        {/* Dublin Core Metadata */}
        <meta name="DC.title" content={book.name} />
        {book.author && <meta name="DC.creator" content={book.author} />}
        {book.publish_year && <meta name="DC.date" content={String(book.publish_year)} />}
        {book.publisher && <meta name="DC.publisher" content={book.publisher} />}
        {book.language && <meta name="DC.language" content={book.language} />}
        <meta name="DC.type" content="Book" />
        {book.isbn && <meta name="DC.identifier" content={`ISBN:${book.isbn}`} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={book.name} />
        <meta property="og:type" content="book" />
        <meta property="og:description" content={book.abstract || book.description || ''} />
        {book.image_url && <meta property="og:image" content={book.image_url} />}
        <meta property="og:url" content={currentUrl} />
        {book.isbn && <meta property="book:isbn" content={book.isbn} />}
        {book.author && <meta property="book:author" content={book.author} />}
      </Helmet>

      <article className="py-8 md:py-16">
        <div className="container-section max-w-5xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-2" />Kembali ke Katalog</Link>
          </Button>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Cover - Left Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-xl overflow-hidden bg-muted shadow-lg">
                  {book.image_url ? (
                    <img 
                      src={book.image_url} 
                      alt={`Sampul buku ${book.name}`} 
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] flex items-center justify-center bg-muted">
                      <BookOpen className="w-24 h-24 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
                
                {/* Price & Order */}
                <Card className="mt-4">
                  <CardContent className="p-4 space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        Rp {book.price.toLocaleString('id-ID')}
                      </p>
                      {book.stock !== null && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {book.stock > 0 ? `Stok: ${book.stock} tersedia` : 'Stok habis'}
                        </p>
                      )}
                    </div>
                    <Button size="lg" className="w-full" asChild disabled={book.stock === 0}>
                      <a href={waLink} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Pesan Sekarang
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Book Details - Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <header>
                <Badge className="mb-3">{book.category}</Badge>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {book.name}
                </h1>
                {book.author && (
                  <p className="text-lg text-muted-foreground">
                    oleh <span className="text-foreground font-medium">{book.author}</span>
                  </p>
                )}
              </header>

              {/* Publication Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {book.publisher && (
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Penerbit</p>
                      <p className="text-sm font-medium">{book.publisher}</p>
                    </div>
                  </div>
                )}
                {book.publish_year && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tahun Terbit</p>
                      <p className="text-sm font-medium">{book.publish_year}</p>
                    </div>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Halaman</p>
                      <p className="text-sm font-medium">{book.pages} halaman</p>
                    </div>
                  </div>
                )}
                {book.isbn && (
                  <div className="flex items-start gap-2">
                    <Hash className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">ISBN</p>
                      <p className="text-sm font-medium">{book.isbn}</p>
                    </div>
                  </div>
                )}
                {book.language && (
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Bahasa</p>
                      <p className="text-sm font-medium">{book.language}</p>
                    </div>
                  </div>
                )}
                {book.edition && (
                  <div className="flex items-start gap-2">
                    <BookMarked className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Edisi</p>
                      <p className="text-sm font-medium">{book.edition}</p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Abstract */}
              {book.abstract && (
                <section>
                  <h2 className="text-lg font-semibold mb-3">Abstrak</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {book.abstract}
                  </p>
                </section>
              )}

              {/* Description */}
              {book.description && (
                <section>
                  <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {book.description}
                  </p>
                </section>
              )}

              {/* Keywords */}
              {book.keywords && book.keywords.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-3">Kata Kunci</h2>
                  <div className="flex flex-wrap gap-2">
                    {book.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <Separator />

              {/* Citation */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Sitasi</h2>
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground italic">
                      {formatCitation()}
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* DOI if available */}
              {book.doi && (
                <section>
                  <h2 className="text-lg font-semibold mb-3">DOI</h2>
                  <a 
                    href={`https://doi.org/${book.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://doi.org/{book.doi}
                  </a>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* JSON-LD Structured Data for Google Scholar */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          "name": book.name,
          "author": book.author ? {
            "@type": "Person",
            "name": book.author
          } : undefined,
          "publisher": book.publisher ? {
            "@type": "Organization",
            "name": book.publisher
          } : undefined,
          "datePublished": book.publish_year ? String(book.publish_year) : undefined,
          "isbn": book.isbn || undefined,
          "numberOfPages": book.pages || undefined,
          "inLanguage": book.language || undefined,
          "description": book.abstract || book.description || undefined,
          "keywords": book.keywords?.join(", ") || undefined,
          "image": book.image_url || undefined,
          "offers": {
            "@type": "Offer",
            "price": book.price,
            "priceCurrency": "IDR",
            "availability": book.stock && book.stock > 0 
              ? "https://schema.org/InStock" 
              : "https://schema.org/OutOfStock"
          }
        })}
      </script>
    </MainLayout>
  );
};

export default ShopSinglePage;
