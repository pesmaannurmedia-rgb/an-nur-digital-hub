import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import BlogSinglePage from "./pages/BlogSinglePage";
import ShopPage from "./pages/ShopPage";
import ShopSinglePage from "./pages/ShopSinglePage";
import PageSingle from "./pages/PageSingle";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAuthors from "./pages/admin/AdminAuthors";
import AdminMenuLinks from "./pages/admin/AdminMenuLinks";
import AdminPages from "./pages/admin/AdminPages";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSiteSettings from "./pages/admin/AdminSiteSettings";
import AdminMediaLibrary from "./pages/admin/AdminMediaLibrary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogSinglePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ShopSinglePage />} />
              <Route path="/page/:slug" element={<PageSingle />} />
              <Route path="/halaman/:slug" element={<PageSingle />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="books" element={<AdminBooks />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="authors" element={<AdminAuthors />} />
                <Route path="menu-links" element={<AdminMenuLinks />} />
                <Route path="pages" element={<AdminPages />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="settings" element={<AdminSiteSettings />} />
                <Route path="media" element={<AdminMediaLibrary />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
