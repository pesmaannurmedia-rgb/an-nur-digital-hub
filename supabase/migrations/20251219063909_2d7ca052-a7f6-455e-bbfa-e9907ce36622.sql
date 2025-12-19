
-- Add academic book metadata fields to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS publisher TEXT,
ADD COLUMN IF NOT EXISTS publish_year INTEGER,
ADD COLUMN IF NOT EXISTS isbn TEXT,
ADD COLUMN IF NOT EXISTS abstract TEXT,
ADD COLUMN IF NOT EXISTS pages INTEGER,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'Indonesia',
ADD COLUMN IF NOT EXISTS edition TEXT,
ADD COLUMN IF NOT EXISTS doi TEXT,
ADD COLUMN IF NOT EXISTS keywords TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN public.products.author IS 'Nama penulis buku (bisa lebih dari satu, dipisah koma)';
COMMENT ON COLUMN public.products.publisher IS 'Nama penerbit buku';
COMMENT ON COLUMN public.products.publish_year IS 'Tahun terbit buku';
COMMENT ON COLUMN public.products.isbn IS 'ISBN (International Standard Book Number)';
COMMENT ON COLUMN public.products.abstract IS 'Ringkasan isi buku';
COMMENT ON COLUMN public.products.pages IS 'Jumlah halaman buku';
COMMENT ON COLUMN public.products.language IS 'Bahasa buku';
COMMENT ON COLUMN public.products.edition IS 'Edisi buku (contoh: Edisi 2, Cetakan ke-3)';
COMMENT ON COLUMN public.products.doi IS 'Digital Object Identifier (jika ada)';
COMMENT ON COLUMN public.products.keywords IS 'Kata kunci untuk pencarian';
