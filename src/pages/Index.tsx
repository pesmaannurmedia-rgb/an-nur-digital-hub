import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Pesantren An-Nur | Pondok Pesantren Modern Terpercaya</title>
        <meta name="description" content="Pesantren An-Nur adalah pondok pesantren modern yang mengintegrasikan pendidikan Islam tradisional dengan kurikulum akademik kontemporer. Bergabunglah bersama kami." />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pesantren An-Nur | Pondok Pesantren Modern Terpercaya" />
        <meta property="og:description" content="Pesantren An-Nur adalah pondok pesantren modern yang mengintegrasikan pendidikan Islam tradisional dengan kurikulum akademik kontemporer." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pesantren An-Nur" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Pesantren An-Nur" />
        <meta name="twitter:description" content="Pondok pesantren modern yang mengintegrasikan pendidikan Islam tradisional dengan kurikulum akademik kontemporer." />
        
        {/* SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.origin : ''} />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <AnnouncementsSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />

      {/* JSON-LD Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Pesantren An-Nur",
          "description": "Pondok pesantren modern yang mengintegrasikan pendidikan Islam tradisional dengan kurikulum akademik kontemporer.",
          "@id": typeof window !== 'undefined' ? window.location.origin : '',
          "url": typeof window !== 'undefined' ? window.location.origin : ''
        })}
      </script>
    </MainLayout>
  );
};

export default Index;
