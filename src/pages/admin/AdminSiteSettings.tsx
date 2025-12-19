import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, Globe, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter, Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SiteSettings {
  [key: string]: string;
}

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsMap: SiteSettings = {};
      data?.forEach((item) => {
        settingsMap[item.key] = item.value || '';
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Gagal memuat pengaturan');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value, updated_at: update.updated_at })
          .eq('key', update.key);

        if (error) throw error;
      }

      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pengaturan Website</h2>
          <p className="text-muted-foreground">Kelola informasi umum website</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Simpan Perubahan
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
          <TabsTrigger value="social">Media Sosial</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Informasi Umum
              </CardTitle>
              <CardDescription>Pengaturan dasar website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Nama Website</Label>
                <Input
                  id="site_name"
                  value={settings.site_name || ''}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="Nama website Anda"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_tagline">Tagline</Label>
                <Textarea
                  id="site_tagline"
                  value={settings.site_tagline || ''}
                  onChange={(e) => handleChange('site_tagline', e.target.value)}
                  placeholder="Deskripsi singkat website"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Informasi Kontak
              </CardTitle>
              <CardDescription>Detail kontak yang ditampilkan di website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telepon / WhatsApp
                </Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone || ''}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="+62 xxx-xxxx-xxxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Alamat
                </Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact_address || ''}
                  onChange={(e) => handleChange('contact_address', e.target.value)}
                  placeholder="Alamat lengkap"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Instagram className="h-5 w-5" />
                Media Sosial
              </CardTitle>
              <CardDescription>Link akun media sosial</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram || ''}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook || ''}
                  onChange={(e) => handleChange('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/pagename"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  YouTube
                </Label>
                <Input
                  id="social_youtube"
                  value={settings.social_youtube || ''}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@channel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter / X
                </Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter || ''}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Branding
              </CardTitle>
              <CardDescription>Logo dan identitas visual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo_url">URL Logo</Label>
                <Input
                  id="logo_url"
                  value={settings.logo_url || ''}
                  onChange={(e) => handleChange('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                {settings.logo_url && (
                  <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                    <img
                      src={settings.logo_url}
                      alt="Logo Preview"
                      className="max-h-20 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon_url">URL Favicon</Label>
                <Input
                  id="favicon_url"
                  value={settings.favicon_url || ''}
                  onChange={(e) => handleChange('favicon_url', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
