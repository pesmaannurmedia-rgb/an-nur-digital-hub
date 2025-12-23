
-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'BookOpen',
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INTEGER DEFAULT 5,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Programs policies
CREATE POLICY "Anyone can view active programs" ON public.programs FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all programs" ON public.programs FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage programs" ON public.programs FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Testimonials policies
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all testimonials" ON public.testimonials FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default programs data
INSERT INTO public.programs (title, description, icon, position) VALUES
('Tahfidz Al-Quran', 'Program menghafal Al-Quran dengan metode talaqqi dan muraja''ah intensif', 'BookOpen', 0),
('Kajian Kitab Kuning', 'Pembelajaran kitab-kitab klasik dengan sanad keilmuan yang terjaga', 'GraduationCap', 1),
('Bahasa Arab & Inggris', 'Penguasaan bahasa asing untuk memperluas wawasan keilmuan', 'Languages', 2),
('Pendidikan Formal', 'Kurikulum pendidikan nasional terintegrasi dengan nilai-nilai Islam', 'School', 3);

-- Insert default testimonials data
INSERT INTO public.testimonials (name, role, content, rating, position) VALUES
('Ahmad Fauzi', 'Wali Santri', 'Alhamdulillah, anak saya berkembang sangat baik di pesantren ini. Hafalan Al-Quran dan akhlaknya semakin meningkat.', 5, 0),
('Ustadz Mahmud', 'Alumni', 'Pesantren ini membentuk karakter saya menjadi pribadi yang lebih baik dan berilmu.', 5, 1),
('Ibu Siti Aminah', 'Wali Santri', 'Fasilitas dan metode pembelajaran sangat baik. Anak-anak betah belajar di sini.', 5, 2);
