-- Add optional settings for About, Programs, Testimonials, and Header sections
INSERT INTO public.site_settings (key, value) VALUES
  -- Header/Navbar settings
  ('header_logo_url', ''),
  ('header_site_name', 'Pesantren Mahasiswa An-Nur'),
  ('header_site_name_short', 'An-Nur'),
  
  -- About section settings
  ('about_section_label', 'Tentang Kami'),
  ('about_section_title', 'Tentang Pesantren Mahasiswa An-Nur'),
  ('about_description_1', 'Pesantren Mahasiswa An-Nur didirikan untuk menjawab kebutuhan mahasiswa Muslim yang ingin mendalami ilmu agama tanpa meninggalkan pendidikan formal. Kami menyediakan lingkungan yang kondusif untuk belajar Al-Quran, kajian Islam, dan pengembangan diri.'),
  ('about_vision', 'Mencetak generasi muda Muslim yang Qurani, cendekia, dan berakhlak mulia yang siap berkontribusi untuk umat dan bangsa.'),
  ('about_mission', 'Menyelenggarakan pendidikan pesantren yang berkualitas, membina akhlak dan karakter Islami, serta membekali santri dengan ilmu agama dan keterampilan hidup.'),
  ('about_image_url', ''),
  ('about_experience_number', '10+'),
  ('about_experience_label', 'Tahun Pengalaman'),
  
  -- Programs section settings
  ('programs_section_label', 'Program Kami'),
  ('programs_section_title', 'Program Unggulan'),
  ('programs_section_subtitle', 'Berbagai program pendidikan dan pembinaan untuk membentuk santri yang berkualitas'),
  
  -- Testimonials section settings
  ('testimonials_section_label', 'Testimoni'),
  ('testimonials_section_title', 'Apa Kata Alumni & Santri'),
  ('testimonials_section_subtitle', 'Cerita dan pengalaman dari mereka yang telah merasakan manfaat belajar di An-Nur')
ON CONFLICT (key) DO NOTHING;