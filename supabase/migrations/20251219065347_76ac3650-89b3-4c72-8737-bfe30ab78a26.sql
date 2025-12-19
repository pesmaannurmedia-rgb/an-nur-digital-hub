-- Add discount price columns to products table
ALTER TABLE public.products 
ADD COLUMN discount_price numeric DEFAULT NULL,
ADD COLUMN discount_percentage integer DEFAULT NULL,
ADD COLUMN is_on_sale boolean DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN public.products.discount_price IS 'Harga diskon (jika ada promo)';
COMMENT ON COLUMN public.products.discount_percentage IS 'Persentase diskon';
COMMENT ON COLUMN public.products.is_on_sale IS 'Status apakah produk sedang diskon';