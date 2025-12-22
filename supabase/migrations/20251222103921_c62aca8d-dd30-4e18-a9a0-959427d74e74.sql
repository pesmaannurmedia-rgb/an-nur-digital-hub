-- Add homepage content settings to site_settings if not exists
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_badge_text', 'Pendaftaran Santri Baru Dibuka'),
  ('hero_title_1', 'Membangun Generasi'),
  ('hero_title_highlight_1', 'Qurani'),
  ('hero_title_2', 'Cendekia'),
  ('hero_title_3', 'Berakhlak Mulia'),
  ('hero_subtitle', 'Pesantren khusus untuk mahasiswa dengan program tahfidz, kajian rutin, dan mentoring yang membentuk karakter Islami tanpa mengganggu kuliah.'),
  ('hero_cta_primary_text', 'Daftar Santri Baru'),
  ('hero_cta_primary_link', '/#kontak'),
  ('hero_cta_secondary_text', 'Pelajari Lebih Lanjut'),
  ('hero_stat_1_number', '500+'),
  ('hero_stat_1_label', 'Alumni'),
  ('hero_stat_2_number', '50+'),
  ('hero_stat_2_label', 'Santri Aktif'),
  ('hero_stat_3_number', '10+'),
  ('hero_stat_3_label', 'Tahun Berdiri'),
  ('hero_background_image', '')
ON CONFLICT (key) DO NOTHING;