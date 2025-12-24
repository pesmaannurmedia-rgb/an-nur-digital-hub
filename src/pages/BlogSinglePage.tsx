import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useParams } from "react-router-dom";
import { Calendar, ArrowLeft, Loader2, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Helmet } from "react-helmet";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  author: string;
  category: string;
  image_url: string | null;
  published_at: string | null;
}

interface Author {
  name: string;
  image_url: string | null;
  bio: string | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
}

const BlogSinglePage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setNotFound(true);
      } else {
        setPost(data);
        fetchRelatedPosts(data.id, data.category);
        fetchAuthor(data.author);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthor = async (authorName: string) => {
    try {
      const { data } = await supabase
        .from('authors')
        .select('name, image_url, bio')
        .eq('name', authorName)
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        setAuthor(data);
      }
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const fetchRelatedPosts = async (currentId: string, category: string) => {
    try {
      const { data } = await supabase
        .from('posts')
        .select('id, title, slug')
        .eq('is_published', true)
        .eq('category', category)
        .neq('id', currentId)
        .limit(4);

      setRelatedPosts(data || []);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'd MMMM yyyy', { locale: id });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

  if (notFound || !post) {
    return (
      <MainLayout>
        <div className="py-16 text-center">
          <div className="container-section max-w-4xl">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Artikel Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-6">Artikel yang Anda cari tidak tersedia atau sudah dihapus.</p>
            <Button asChild>
              <Link to="/blog">Kembali ke Blog</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const siteName = "Pesantren An-Nur";

  return (
    <MainLayout>
      <Helmet>
        <title>{post.title} | Blog {siteName}</title>
        <meta name="description" content={post.excerpt || `Baca artikel ${post.title} di blog ${siteName}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={post.excerpt || ''} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content={siteName} />
        {post.published_at && <meta property="article:published_time" content={post.published_at} />}
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ''} />
        {post.image_url && <meta name="twitter:image" content={post.image_url} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <article className="py-16">
        <div className="container-section max-w-4xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Kembali ke Blog</Link>
          </Button>
          
          {/* Featured Image */}
          {post.image_url && (
            <div className="aspect-video overflow-hidden rounded-xl mb-8">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <header className="mb-8">
            <span className="text-sm font-medium text-secondary-foreground dark:text-secondary bg-secondary/20 px-3 py-1 rounded-full">{post.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{formatDate(post.published_at)}</span>
              <span className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={author?.image_url || undefined} alt={post.author} />
                  <AvatarFallback className="text-xs">{getInitials(post.author)}</AvatarFallback>
                </Avatar>
                {post.author}
              </span>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Konten artikel tidak tersedia.</p>' }}
          />

          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4">Artikel Lainnya</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedPosts.map(a => (
                  <Link key={a.id} to={`/blog/${a.slug}`} className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                    <span className="font-medium text-foreground hover:text-primary">{a.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt || '',
          "image": post.image_url || undefined,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": siteName
          },
          "datePublished": post.published_at || undefined,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": currentUrl
          }
        })}
      </script>
    </MainLayout>
  );
};

export default BlogSinglePage;
