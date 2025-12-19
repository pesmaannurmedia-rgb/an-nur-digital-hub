-- Add parent_id column to menu_links for submenu support
ALTER TABLE public.menu_links 
ADD COLUMN parent_id uuid REFERENCES public.menu_links(id) ON DELETE CASCADE;

-- Add index for better performance
CREATE INDEX idx_menu_links_parent_id ON public.menu_links(parent_id);

-- Add comment for clarity
COMMENT ON COLUMN public.menu_links.parent_id IS 'ID menu induk untuk submenu (null = menu utama)';