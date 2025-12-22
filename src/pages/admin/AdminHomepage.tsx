import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Save, Upload, X, Home, BarChart, Type, MousePointer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HomepageSettings {
  [key: string]: string;
}

export default function AdminHomepage() {
  const [settings, setSettings] = useState<HomepageSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      const settingsMap: HomepageSettings = {};
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

  const handleImageUpload = async (file: File, key: string) => {
    setUploadingBg(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${key}-${Date.now()}.${fileExt}`;
      const filePath = `homepage/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media-library')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('media-library')
        .getPublicUrl(filePath);

      handleChange(key, urlData.publicUrl);
      toast.success('Gambar berhasil diupload');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Gagal mengupload gambar');
    } finally {
      setUploadingBg(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get all hero-related keys
      const heroKeys = Object.keys(settings).filter(key => key.startsWith('hero_'));
      
      for (const key of heroKeys) {
        const { data: existing } = await supabase
          .from('site_settings')
          .select('id')
          .eq('key', key)
          .single();

        if (existing) {
          const { error } = await supabase
            .from('site_settings')
            .update({ value: settings[key], updated_at: new Date().toISOString() })
            .eq('key', key);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('site_settings')
            .insert({ key, value: settings[key] });
          if (error) throw error;
        }
      }

      toast.success('Pengaturan homepage berhasil disimpan');
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
          <h2 className="text-2xl font-bold text-foreground">Edit Homepage</h2>
          <p className="text-muted-foreground">Kelola konten halaman utama website</p>
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

      <Tabs defaultValue="hero" className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="cta">Tombol CTA</TabsTrigger>
          <TabsTrigger value="stats">Statistik</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Hero Section
              </CardTitle>
              <CardDescription>Bagian utama yang pertama dilihat pengunjung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Badge */}
              <div className="space-y-2">
                <Label htmlFor="hero_badge_text">Badge Text</Label>
                <Input
                  id="hero_badge_text"
                  value={settings.hero_badge_text || ''}
                  onChange={(e) => handleChange('hero_badge_text', e.target.value)}
                  placeholder="Pendaftaran Santri Baru Dibuka"
                />
                <p className="text-xs text-muted-foreground">Teks kecil yang muncul di atas judul</p>
              </div>

              {/* Title */}
              <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Judul Utama
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero_title_1" className="text-sm text-muted-foreground">Baris 1</Label>
                    <Input
                      id="hero_title_1"
                      value={settings.hero_title_1 || ''}
                      onChange={(e) => handleChange('hero_title_1', e.target.value)}
                      placeholder="Membangun Generasi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_title_highlight_1" className="text-sm text-muted-foreground">Highlight 1 (Warna Primary)</Label>
                    <Input
                      id="hero_title_highlight_1"
                      value={settings.hero_title_highlight_1 || ''}
                      onChange={(e) => handleChange('hero_title_highlight_1', e.target.value)}
                      placeholder="Qurani"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_title_2" className="text-sm text-muted-foreground">Highlight 2 (Warna Secondary)</Label>
                    <Input
                      id="hero_title_2"
                      value={settings.hero_title_2 || ''}
                      onChange={(e) => handleChange('hero_title_2', e.target.value)}
                      placeholder="Cendekia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_title_3" className="text-sm text-muted-foreground">Highlight 3 (Warna Primary)</Label>
                    <Input
                      id="hero_title_3"
                      value={settings.hero_title_3 || ''}
                      onChange={(e) => handleChange('hero_title_3', e.target.value)}
                      placeholder="Berakhlak Mulia"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Subtitle</Label>
                <Textarea
                  id="hero_subtitle"
                  value={settings.hero_subtitle || ''}
                  onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                  placeholder="Deskripsi singkat tentang pesantren..."
                  rows={3}
                />
              </div>

              {/* Background Image */}
              <div className="space-y-2">
                <Label>Background Image</Label>
                <p className="text-xs text-muted-foreground">Ukuran yang disarankan: 1920x1080 piksel</p>
                <div className="flex gap-2">
                  <Input
                    value={settings.hero_background_image || ''}
                    onChange={(e) => handleChange('hero_background_image', e.target.value)}
                    placeholder="URL gambar atau upload file"
                    className="flex-1"
                  />
                  <input
                    type="file"
                    id="upload-hero-bg"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'hero_background_image');
                      e.target.value = '';
                    }}
                  />
                  <Button variant="outline" size="icon" disabled={uploadingBg} asChild>
                    <label htmlFor="upload-hero-bg" className="cursor-pointer">
                      {uploadingBg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </label>
                  </Button>
                  {settings.hero_background_image && (
                    <Button variant="ghost" size="icon" onClick={() => handleChange('hero_background_image', '')}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {settings.hero_background_image && (
                  <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                    <img
                      src={settings.hero_background_image}
                      alt="Hero Background Preview"
                      className="max-h-48 w-full object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                Tombol CTA (Call to Action)
              </CardTitle>
              <CardDescription>Tombol aksi utama di hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Primary CTA */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="font-semibold">Tombol Utama (Primary)</Label>
                  <div className="space-y-2">
                    <Label htmlFor="hero_cta_primary_text" className="text-sm text-muted-foreground">Teks Tombol</Label>
                    <Input
                      id="hero_cta_primary_text"
                      value={settings.hero_cta_primary_text || ''}
                      onChange={(e) => handleChange('hero_cta_primary_text', e.target.value)}
                      placeholder="Daftar Santri Baru"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_cta_primary_link" className="text-sm text-muted-foreground">Link Tujuan</Label>
                    <Input
                      id="hero_cta_primary_link"
                      value={settings.hero_cta_primary_link || ''}
                      onChange={(e) => handleChange('hero_cta_primary_link', e.target.value)}
                      placeholder="/#kontak"
                    />
                  </div>
                </div>

                {/* Secondary CTA */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="font-semibold">Tombol Sekunder (Outline)</Label>
                  <div className="space-y-2">
                    <Label htmlFor="hero_cta_secondary_text" className="text-sm text-muted-foreground">Teks Tombol</Label>
                    <Input
                      id="hero_cta_secondary_text"
                      value={settings.hero_cta_secondary_text || ''}
                      onChange={(e) => handleChange('hero_cta_secondary_text', e.target.value)}
                      placeholder="Pelajari Lebih Lanjut"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                Statistik
              </CardTitle>
              <CardDescription>Angka-angka penting yang ditampilkan di hero section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat 1 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="font-semibold">Statistik 1</Label>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_1_number" className="text-sm text-muted-foreground">Angka</Label>
                    <Input
                      id="hero_stat_1_number"
                      value={settings.hero_stat_1_number || ''}
                      onChange={(e) => handleChange('hero_stat_1_number', e.target.value)}
                      placeholder="500+"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_1_label" className="text-sm text-muted-foreground">Label</Label>
                    <Input
                      id="hero_stat_1_label"
                      value={settings.hero_stat_1_label || ''}
                      onChange={(e) => handleChange('hero_stat_1_label', e.target.value)}
                      placeholder="Alumni"
                    />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="font-semibold">Statistik 2 (Highlight)</Label>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_2_number" className="text-sm text-muted-foreground">Angka</Label>
                    <Input
                      id="hero_stat_2_number"
                      value={settings.hero_stat_2_number || ''}
                      onChange={(e) => handleChange('hero_stat_2_number', e.target.value)}
                      placeholder="50+"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_2_label" className="text-sm text-muted-foreground">Label</Label>
                    <Input
                      id="hero_stat_2_label"
                      value={settings.hero_stat_2_label || ''}
                      onChange={(e) => handleChange('hero_stat_2_label', e.target.value)}
                      placeholder="Santri Aktif"
                    />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <Label className="font-semibold">Statistik 3</Label>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_3_number" className="text-sm text-muted-foreground">Angka</Label>
                    <Input
                      id="hero_stat_3_number"
                      value={settings.hero_stat_3_number || ''}
                      onChange={(e) => handleChange('hero_stat_3_number', e.target.value)}
                      placeholder="10+"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_stat_3_label" className="text-sm text-muted-foreground">Label</Label>
                    <Input
                      id="hero_stat_3_label"
                      value={settings.hero_stat_3_label || ''}
                      onChange={(e) => handleChange('hero_stat_3_label', e.target.value)}
                      placeholder="Tahun Berdiri"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
