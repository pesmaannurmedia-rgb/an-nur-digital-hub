import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  id: string;
  title: string;
  url: string;
  is_external: boolean | null;
  parent_id: string | null;
  position: number;
  children?: MenuItem[];
}

// Fallback menu jika database kosong
const fallbackMenu = [
  { id: '1', title: "Beranda", url: "/", is_external: false, parent_id: null, position: 1 },
  { id: '2', title: "Blog", url: "/blog", is_external: false, parent_id: null, position: 2 },
  { id: '3', title: "Toko", url: "/shop", is_external: false, parent_id: null, position: 3 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_links')
        .select('id, title, url, is_external, parent_id, position')
        .eq('group_name', 'main')
        .eq('is_active', true)
        .order('position');

      if (error) throw error;

      if (data && data.length > 0) {
        // Build hierarchy
        const parents = data.filter(item => !item.parent_id);
        const hierarchy = parents.map(parent => ({
          ...parent,
          children: data
            .filter(item => item.parent_id === parent.id)
            .sort((a, b) => a.position - b.position)
        }));
        setMenuItems(hierarchy);
      } else {
        setMenuItems(fallbackMenu);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
      setMenuItems(fallbackMenu);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("#") || href.startsWith("/#")) return false;
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (location.pathname === path || (path === "/" && location.pathname === "/") || path === "") {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.title}
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[200px]">
            {item.children!.map((child) => (
              <DropdownMenuItem key={child.id} asChild>
                {child.is_external ? (
                  <a
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full"
                  >
                    {child.title}
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                ) : (
                  <Link
                    to={child.url}
                    onClick={() => handleNavClick(child.url)}
                    className="w-full"
                  >
                    {child.title}
                  </Link>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Single menu item (no children)
    if (item.is_external) {
      return (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.title}
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.url}
        onClick={() => handleNavClick(item.url)}
        className={cn(
          "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
          isActive(item.url.split("#")[0])
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {item.title}
      </Link>
    );
  };

  const renderMobileMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMobile === item.id;

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => setExpandedMobile(isExpanded ? null : item.id)}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            {item.title}
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
          </button>
          {isExpanded && (
            <div className="pl-4 space-y-1 mt-1">
              {item.children!.map((child) => (
                child.is_external ? (
                  <a
                    key={child.id}
                    href={child.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.title}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <Link
                    key={child.id}
                    to={child.url}
                    onClick={() => handleNavClick(child.url)}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {child.title}
                  </Link>
                )
              ))}
            </div>
          )}
        </div>
      );
    }

    if (item.is_external) {
      return (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.title}
          <ExternalLink className="w-4 h-4" />
        </a>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.url}
        onClick={() => handleNavClick(item.url)}
        className={cn(
          "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
          isActive(item.url.split("#")[0])
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-section flex h-16 items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-lg md:text-xl text-foreground hover:text-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">ا</span>
          </div>
          <span className="hidden sm:inline">Pesantren Mahasiswa An-Nur</span>
          <span className="sm:hidden">An-Nur</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map(renderMenuItem)}
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-section py-4 space-y-1">
            {menuItems.map(renderMobileMenuItem)}
          </div>
        </div>
      )}
    </header>
  );
}
