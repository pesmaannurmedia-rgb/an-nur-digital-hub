import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <AnnouncementsSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
    </MainLayout>
  );
};

export default Index;
