
-- Add additional academic book fields
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS author_affiliation TEXT,
ADD COLUMN IF NOT EXISTS table_of_contents TEXT,
ADD COLUMN IF NOT EXISTS book_format TEXT DEFAULT 'Cetak',
ADD COLUMN IF NOT EXISTS preview_link TEXT,
ADD COLUMN IF NOT EXISTS purchase_link TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.products.author_affiliation IS 'Afiliasi penulis (institusi, universitas)';
COMMENT ON COLUMN public.products.table_of_contents IS 'Daftar bab / daftar isi buku';
COMMENT ON COLUMN public.products.book_format IS 'Format buku: Cetak, PDF, eBook, atau kombinasi';
COMMENT ON COLUMN public.products.preview_link IS 'Link preview atau sample bab';
COMMENT ON COLUMN public.products.purchase_link IS 'Link pembelian eksternal (opsional)';
