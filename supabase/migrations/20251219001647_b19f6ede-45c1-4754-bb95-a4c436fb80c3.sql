-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public viewing of post images
CREATE POLICY "Anyone can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

-- Allow admins to upload post images
CREATE POLICY "Admins can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'post-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to update post images
CREATE POLICY "Admins can update post images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'post-images' AND has_role(auth.uid(), 'admin'));

-- Allow admins to delete post images
CREATE POLICY "Admins can delete post images"
ON storage.objects FOR DELETE
USING (bucket_id = 'post-images' AND has_role(auth.uid(), 'admin'));

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('post', 'product')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Anyone can view categories
CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT
USING (true);

-- Admins can manage categories
CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Insert default post categories
INSERT INTO public.categories (name, slug, type) VALUES
  ('Kajian', 'kajian', 'post'),
  ('Kegiatan', 'kegiatan', 'post'),
  ('Pengumuman', 'pengumuman', 'post'),
  ('Artikel', 'artikel', 'post');

-- Insert default product categories
INSERT INTO public.categories (name, slug, type) VALUES
  ('Buku', 'buku', 'product'),
  ('Merchandise', 'merchandise', 'product'),
  ('Makanan', 'makanan', 'product'),
  ('Lainnya', 'lainnya', 'product');