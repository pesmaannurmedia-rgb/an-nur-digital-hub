-- Add preview_pdf column for storing PDF file URL
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS preview_pdf text NULL;