-- Add tags column to posts table
ALTER TABLE public.posts
ADD COLUMN tags text[] DEFAULT NULL;