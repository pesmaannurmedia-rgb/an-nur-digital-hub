import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Bell,
  MessageSquare,
  Users,
  LogOut,
  BookOpen,
  Tag,
  UserPen,
  Link2,
  FileStack,
  Images,
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Produk', url: '/admin/products', icon: ShoppingBag },
  { title: 'Artikel', url: '/admin/posts', icon: FileText },
  { title: 'Halaman', url: '/admin/pages', icon: FileStack },
  { title: 'Galeri', url: '/admin/gallery', icon: Images },
  { title: 'Penulis', url: '/admin/authors', icon: UserPen },
  { title: 'Kategori', url: '/admin/categories', icon: Tag },
  { title: 'Menu & Link', url: '/admin/menu-links', icon: Link2 },
  { title: 'Pengumuman', url: '/admin/announcements', icon: Bell },
  { title: 'Pesan Masuk', url: '/admin/messages', icon: MessageSquare },
  { title: 'Kelola Admin', url: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuthContext();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <NavLink to="/admin" className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-foreground">Admin An-Nur</span>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Keluar</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
