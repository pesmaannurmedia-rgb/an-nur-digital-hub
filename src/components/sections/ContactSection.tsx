import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  contact: z.string().trim().min(5, "Email/No WA minimal 5 karakter").max(100, "Email/No WA maksimal 100 karakter"),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(1000, "Pesan maksimal 1000 karakter"),
});

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      contact: formData.get('contact') as string,
      message: formData.get('message') as string,
    };

    // Validate input
    const result = contactSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      setIsLoading(false);
      return;
    }

    try {
      // Determine if contact is email or phone
      const isEmail = data.contact.includes('@');
      
      const { error } = await supabase.from('contact_messages').insert([{
        name: data.name,
        email: isEmail ? data.contact : null,
        phone: !isEmail ? data.contact : null,
        message: data.message,
      }]);

      if (error) throw error;

      toast.success("Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappLink = "https://wa.me/6281234567890?text=Assalamu'alaikum,%20saya%20ingin%20bertanya%20tentang%20Pesantren%20An-Nur";

  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container-section">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Hubungi Kami
          </span>
          <h2 className="section-title mt-2">Kontak & Lokasi</h2>
          <p className="section-subtitle">
            Silakan hubungi kami untuk informasi pendaftaran atau pertanyaan lainnya
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Kirim Pesan</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Masukkan nama Anda" 
                  required 
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Email / No. WhatsApp</Label>
                <Input 
                  id="contact" 
                  name="contact" 
                  placeholder="email@example.com atau 08123456789" 
                  required 
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tulis pesan Anda di sini..." 
                  rows={4}
                  required 
                  maxLength={1000}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </Button>
            </form>

            {/* WhatsApp CTA */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Atau hubungi langsung via WhatsApp untuk respons lebih cepat
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat via WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Alamat</h4>
                  <p className="text-muted-foreground text-sm">
                    Jl. Pendidikan No. 123, Kelurahan Contoh, Kecamatan Contoh, Kota, 12345
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">WhatsApp</h4>
                  <a 
                    href="https://wa.me/6281234567890" 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a 
                    href="mailto:info@pesantrenannur.id" 
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    info@pesantrenannur.id
                  </a>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-xl overflow-hidden border border-border h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.82496091476882!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonas!5e0!3m2!1sen!2sid!4v1635134456789!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Pesantren An-Nur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
