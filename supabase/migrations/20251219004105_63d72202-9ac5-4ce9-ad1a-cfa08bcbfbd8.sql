-- Add image_caption column to posts table for illustrator/photographer credit
ALTER TABLE public.posts 
ADD COLUMN image_caption TEXT;