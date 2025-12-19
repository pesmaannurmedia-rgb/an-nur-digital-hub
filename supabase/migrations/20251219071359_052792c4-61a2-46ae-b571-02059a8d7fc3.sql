-- Create site_settings table for storing website configuration
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text UNIQUE NOT NULL,
    value text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view site settings" 
ON public.site_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES
    ('site_name', 'Pesantren Mahasiswa An-Nur'),
    ('site_tagline', 'Pusat Pendidikan Islam untuk Mahasiswa'),
    ('contact_email', 'info@pesantrenannur.id'),
    ('contact_phone', '+62 812-3456-7890'),
    ('contact_address', 'Jl. Pesantren No. 1, Yogyakarta'),
    ('social_instagram', ''),
    ('social_facebook', ''),
    ('social_youtube', ''),
    ('social_twitter', ''),
    ('logo_url', ''),
    ('favicon_url', '');

-- Create media_files table for media library
CREATE TABLE public.media_files (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    file_path text NOT NULL,
    file_url text NOT NULL,
    file_type text NOT NULL,
    file_size bigint,
    folder text DEFAULT 'uncategorized',
    alt_text text,
    uploaded_by uuid REFERENCES auth.users(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Admins can view all media files" 
ON public.media_files 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage media files" 
ON public.media_files 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_media_files_updated_at
    BEFORE UPDATE ON public.media_files
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for media library
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media-library', 'media-library', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media library bucket
CREATE POLICY "Anyone can view media library files"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-library');

CREATE POLICY "Admins can upload media library files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-library' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update media library files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-library' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete media library files"
ON storage.objects FOR DELETE
USING (bucket_id = 'media-library' AND has_role(auth.uid(), 'admin'::app_role));