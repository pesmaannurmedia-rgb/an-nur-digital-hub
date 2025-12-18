import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Sun, Moon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeContext } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

// Menu items yang bisa diubah admin
const defaultMenuItems = [
  { label: "Beranda", href: "/", external: false },
  { label: "Program", href: "/#program", external: false },
  { label: "Blog", href: "/blog", external: false },
  { label: "Toko", href: "/shop", external: false },
  { label: "Kontak", href: "/#kontak", external: false },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (location.pathname === path || (path === "/" && location.pathname === "/")) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
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
          {defaultMenuItems.map((item) => (
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive(item.href.split("#")[0])
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            )
          ))}
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
          <div className="container-section py-4 space-y-2">
            {defaultMenuItems.map((item) => (
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive(item.href.split("#")[0])
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
