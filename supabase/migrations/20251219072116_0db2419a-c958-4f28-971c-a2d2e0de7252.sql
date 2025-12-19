-- Create activity_log table for tracking admin actions
CREATE TABLE public.activity_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    user_email text,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id text,
    entity_name text,
    details jsonb,
    ip_address text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view and insert logs
CREATE POLICY "Admins can view activity logs" 
ON public.activity_logs 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert activity logs" 
ON public.activity_logs 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add SEO settings to site_settings
INSERT INTO public.site_settings (key, value) VALUES
    ('seo_title', 'Pesantren Mahasiswa An-Nur'),
    ('seo_description', 'Pusat Pendidikan Islam untuk Mahasiswa - Pesantren Mahasiswa An-Nur'),
    ('seo_keywords', 'pesantren, mahasiswa, islam, pendidikan, kajian'),
    ('seo_og_image', ''),
    ('google_analytics_id', ''),
    ('google_site_verification', '')
ON CONFLICT (key) DO NOTHING;