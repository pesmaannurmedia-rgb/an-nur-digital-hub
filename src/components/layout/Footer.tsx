import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Youtube, Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteSettings {
  site_name?: string;
  site_description?: string;
  contact_address?: string;
  contact_phone?: string;
  contact_email?: string;
  social_instagram?: string;
  social_youtube?: string;
  social_facebook?: string;
  social_twitter?: string;
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value');
      
      if (data) {
        const settingsObj: SiteSettings = {};
        data.forEach(item => {
          settingsObj[item.key as keyof SiteSettings] = item.value || '';
        });
        setSettings(settingsObj);
      }
    };
    fetchSettings();
  }, []);

  const quickLinks = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/#program" },
    { label: "Blog", href: "/blog" },
    { label: "Toko", href: "/shop" },
    { label: "Kontak", href: "/#kontak" },
  ];

  const socialLinks = [
    { icon: Instagram, href: settings.social_instagram || "#", label: "Instagram", show: !!settings.social_instagram },
    { icon: Youtube, href: settings.social_youtube || "#", label: "YouTube", show: !!settings.social_youtube },
    { icon: Facebook, href: settings.social_facebook || "#", label: "Facebook", show: !!settings.social_facebook },
  ].filter(link => link.show);

  const siteName = settings.site_name || "Pesantren Mahasiswa An-Nur";
  const siteDescription = settings.site_description || "Membangun generasi Qurani, cendekia, dan berakhlak mulia.";

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
              <span className="font-bold text-xl text-foreground">{siteName}</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteDescription}
            </p>
            {socialLinks.length > 0 && (
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
            )}
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
              {settings.contact_address && (
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{settings.contact_address}</span>
                </li>
              )}
              {settings.contact_phone && (
                <li>
                  <a
                    href={`https://wa.me/${settings.contact_phone.replace(/[^0-9]/g, '')}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{settings.contact_phone}</span>
                  </a>
                </li>
              )}
              {settings.contact_email && (
                <li>
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{settings.contact_email}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} {siteName}. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
