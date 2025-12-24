-- Add editor and author family name columns for Google Scholar compatibility
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS editor text,
ADD COLUMN IF NOT EXISTS author_family_name text;

-- Add comments for clarity
COMMENT ON COLUMN public.products.editor IS 'Book editor name for academic publications';
COMMENT ON COLUMN public.products.author_family_name IS 'Author family/last name for Google Scholar citation format';