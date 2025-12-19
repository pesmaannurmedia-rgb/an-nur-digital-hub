-- Create menu_links table for managing external links
CREATE TABLE public.menu_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_external BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  group_name TEXT DEFAULT 'main',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.menu_links ENABLE ROW LEVEL SECURITY;

-- Anyone can view active menu links
CREATE POLICY "Anyone can view active menu links"
ON public.menu_links FOR SELECT
USING (is_active = true);

-- Admins can view all menu links
CREATE POLICY "Admins can view all menu links"
ON public.menu_links FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can manage menu links
CREATE POLICY "Admins can manage menu links"
ON public.menu_links FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_menu_links_updated_at
  BEFORE UPDATE ON public.menu_links
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default links
INSERT INTO public.menu_links (title, url, description, icon, position, group_name) VALUES
  ('Open Journal System', 'https://ojs.pesma-annur.net', 'Jurnal ilmiah pesantren', 'BookOpen', 1, 'akademik'),
  ('WordPress Blog', 'https://blog.pesma-annur.net', 'Blog resmi pesantren', 'Globe', 2, 'media'),
  ('E-Learning', 'https://elearning.pesma-annur.net', 'Platform pembelajaran online', 'GraduationCap', 3, 'akademik'),
  ('Perpustakaan Digital', 'https://lib.pesma-annur.net', 'Koleksi buku digital', 'Library', 4, 'akademik');