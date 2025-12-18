import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/#program" },
    { label: "Blog", href: "/blog" },
    { label: "Toko", href: "/shop" },
    { label: "Kontak", href: "/#kontak" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/pesantrenannur", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/pesantrenannur", label: "YouTube" },
    { icon: Facebook, href: "https://facebook.com/pesantrenannur", label: "Facebook" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-section py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">ا</span>
              </div>
              <span className="font-bold text-xl text-foreground">Pesantren Mahasiswa An-Nur</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Membangun generasi Qurani, cendekia, dan berakhlak mulia. Pesantren khusus untuk mahasiswa dengan program tahfidz, kajian rutin, dan mentoring.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Link Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Jl. Pendidikan No. 123, Kelurahan Contoh, Kota, 12345</span>
              </li>
              <li>
                <a
                  href="https://wa.me/6281234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@pesantrenannur.id"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>info@pesantrenannur.id</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} Pesantren Mahasiswa An-Nur. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
