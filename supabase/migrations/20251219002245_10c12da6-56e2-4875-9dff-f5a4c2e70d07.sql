-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public viewing of profile images
CREATE POLICY "Anyone can view profile images"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');

-- Allow admins to upload profile images
CREATE POLICY "Admins can upload profile images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to update profile images
CREATE POLICY "Admins can update profile images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'profile-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to delete profile images
CREATE POLICY "Admins can delete profile images"
ON storage.objects FOR DELETE
USING (bucket_id = 'profile-images' AND has_role(auth.uid(), 'admin'));

-- Create authors table
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on authors
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;

-- Anyone can view active authors
CREATE POLICY "Anyone can view active authors"
ON public.authors FOR SELECT
USING (is_active = true);

-- Admins can view all authors
CREATE POLICY "Admins can view all authors"
ON public.authors FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Admins can manage authors
CREATE POLICY "Admins can manage authors"
ON public.authors FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_authors_updated_at
  BEFORE UPDATE ON public.authors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default author
INSERT INTO public.authors (name, slug, bio) VALUES
  ('Admin', 'admin', 'Administrator Pesantren Mahasiswa An-Nur');