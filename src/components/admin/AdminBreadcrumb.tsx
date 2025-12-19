import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeLabels: Record<string, { label: string; parent?: string }> = {
  '/admin': { label: 'Dashboard' },
  '/admin/books': { label: 'Katalog Buku', parent: 'Produk' },
  '/admin/products': { label: 'Produk Umum', parent: 'Produk' },
  '/admin/posts': { label: 'Artikel', parent: 'Konten' },
  '/admin/pages': { label: 'Halaman', parent: 'Konten' },
  '/admin/gallery': { label: 'Galeri', parent: 'Konten' },
  '/admin/media': { label: 'Media Library', parent: 'Konten' },
  '/admin/authors': { label: 'Penulis', parent: 'Master Data' },
  '/admin/categories': { label: 'Kategori', parent: 'Master Data' },
  '/admin/menu-links': { label: 'Menu & Link', parent: 'Master Data' },
  '/admin/announcements': { label: 'Pengumuman', parent: 'Komunikasi' },
  '/admin/messages': { label: 'Pesan Masuk', parent: 'Komunikasi' },
  '/admin/settings': { label: 'Pengaturan Website', parent: 'Pengaturan' },
  '/admin/users': { label: 'Kelola Admin', parent: 'Pengaturan' },
};

export function AdminBreadcrumb() {
  const location = useLocation();
  const currentRoute = routeLabels[location.pathname];

  if (!currentRoute || location.pathname === '/admin') {
    return null;
  }

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {currentRoute.parent && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="text-muted-foreground">{currentRoute.parent}</span>
            </BreadcrumbItem>
          </>
        )}

        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium text-foreground">
            {currentRoute.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
