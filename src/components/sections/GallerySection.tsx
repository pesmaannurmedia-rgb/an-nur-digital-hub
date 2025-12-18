import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1584286595398-a59511e0649f?w=600&q=80", alt: "Kajian rutin santri" },
  { id: 2, src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80", alt: "Sholat berjamaah" },
  { id: 3, src: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&q=80", alt: "Belajar Al-Quran" },
  { id: 4, src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80", alt: "Kegiatan outdoor" },
  { id: 5, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80", alt: "Wisuda tahfidz" },
  { id: 6, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", alt: "Diskusi bersama" },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-surface">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Galeri
          </span>
          <h2 className="section-title mt-2">Galeri Kegiatan</h2>
          <p className="section-subtitle">
            Momen-momen berharga dari berbagai kegiatan santri di Pesantren An-Nur
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image.src)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {selectedImage && (
              <img
                src={selectedImage.replace("w=600", "w=1200")}
                alt="Gallery image"
                className="w-full h-auto"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
