-- Add product_type column to distinguish books from other products
ALTER TABLE public.products 
ADD COLUMN product_type text NOT NULL DEFAULT 'book';

-- Add comment for documentation
COMMENT ON COLUMN public.products.product_type IS 'Tipe produk: book (buku) atau general (produk umum)';

-- Update existing products to be books
UPDATE public.products SET product_type = 'book' WHERE product_type IS NULL OR product_type = '';