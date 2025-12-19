import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Loader2, Link2, ExternalLink, GripVertical } from 'lucide-react';

const menuLinkSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  url: z.string().url('URL tidak valid').min(1, 'URL wajib diisi'),
  description: z.string().optional(),
  icon: z.string().optional(),
  group_name: z.string().min(1, 'Grup wajib dipilih'),
  position: z.coerce.number().min(0),
  is_external: z.boolean(),
  is_active: z.boolean(),
});

type MenuLinkFormValues = z.infer<typeof menuLinkSchema>;

interface MenuLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  group_name: string | null;
  position: number;
  is_external: boolean | null;
  is_active: boolean | null;
  created_at: string;
}

const iconOptions = [
  { value: 'BookOpen', label: 'Buku' },
  { value: 'Globe', label: 'Globe' },
  { value: 'GraduationCap', label: 'Akademik' },
  { value: 'Library', label: 'Perpustakaan' },
  { value: 'FileText', label: 'Dokumen' },
  { value: 'Video', label: 'Video' },
  { value: 'Music', label: 'Audio' },
  { value: 'Image', label: 'Galeri' },
  { value: 'Calendar', label: 'Kalender' },
  { value: 'Mail', label: 'Email' },
  { value: 'Phone', label: 'Telepon' },
  { value: 'MapPin', label: 'Lokasi' },
  { value: 'ShoppingBag', label: 'Toko' },
  { value: 'Users', label: 'Komunitas' },
  { value: 'Heart', label: 'Donasi' },
  { value: 'Link', label: 'Link' },
];

const groupOptions = [
  { value: 'main', label: 'Menu Utama' },
  { value: 'akademik', label: 'Akademik' },
  { value: 'media', label: 'Media' },
  { value: 'layanan', label: 'Layanan' },
  { value: 'footer', label: 'Footer' },
];

export default function AdminMenuLinks() {
  const [menuLinks, setMenuLinks] = useState<MenuLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<MenuLink | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<MenuLinkFormValues>({
    resolver: zodResolver(menuLinkSchema),
    defaultValues: {
      title: '',
      url: '',
      description: '',
      icon: 'Link',
      group_name: 'main',
      position: 0,
      is_external: true,
      is_active: true,
    },
  });

  useEffect(() => {
    fetchMenuLinks();
  }, []);

  const fetchMenuLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_links')
        .select('*')
        .order('group_name')
        .order('position');

      if (error) throw error;
      setMenuLinks(data || []);
    } catch (error) {
      console.error('Error fetching menu links:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengambil data menu',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingLink(null);
    const maxPosition = Math.max(0, ...menuLinks.map(l => l.position)) + 1;
    form.reset({
      title: '',
      url: '',
      description: '',
      icon: 'Link',
      group_name: 'main',
      position: maxPosition,
      is_external: true,
      is_active: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (link: MenuLink) => {
    setEditingLink(link);
    form.reset({
      title: link.title,
      url: link.url,
      description: link.description || '',
      icon: link.icon || 'Link',
      group_name: link.group_name || 'main',
      position: link.position,
      is_external: link.is_external ?? true,
      is_active: link.is_active ?? true,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: MenuLinkFormValues) => {
    setIsSubmitting(true);
    try {
      if (editingLink) {
        const { error } = await supabase
          .from('menu_links')
          .update({
            title: values.title,
            url: values.url,
            description: values.description || null,
            icon: values.icon || null,
            group_name: values.group_name,
            position: values.position,
            is_external: values.is_external,
            is_active: values.is_active,
          })
          .eq('id', editingLink.id);

        if (error) throw error;
        toast({ title: 'Berhasil', description: 'Menu link berhasil diperbarui' });
      } else {
        const { error } = await supabase.from('menu_links').insert([{
          title: values.title,
          url: values.url,
          description: values.description || null,
          icon: values.icon || null,
          group_name: values.group_name,
          position: values.position,
          is_external: values.is_external,
          is_active: values.is_active,
        }]);

        if (error) throw error;
        toast({ title: 'Berhasil', description: 'Menu link berhasil ditambahkan' });
      }

      setIsDialogOpen(false);
      fetchMenuLinks();
    } catch (error: any) {
      console.error('Error saving menu link:', error);
      toast({
        title: 'Error',
        description: 'Gagal menyimpan menu link',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMenuLink = async (id: string) => {
    if (!confirm('Yakin ingin menghapus menu link ini?')) return;

    try {
      const { error } = await supabase.from('menu_links').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Berhasil', description: 'Menu link berhasil dihapus' });
      fetchMenuLinks();
    } catch (error) {
      console.error('Error deleting menu link:', error);
      toast({
        title: 'Error',
        description: 'Gagal menghapus menu link',
        variant: 'destructive',
      });
    }
  };

  const getGroupLabel = (groupName: string | null) => {
    const group = groupOptions.find(g => g.value === groupName);
    return group?.label || groupName || 'Lainnya';
  };

  // Group links by group_name
  const groupedLinks = menuLinks.reduce((acc, link) => {
    const group = link.group_name || 'main';
    if (!acc[group]) acc[group] = [];
    acc[group].push(link);
    return acc;
  }, {} as Record<string, MenuLink[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Link2 className="h-6 w-6" />
            Kelola Menu & Link
          </h2>
          <p className="text-muted-foreground">Kelola link navigasi ke website eksternal seperti OJS, E-Learning, dll</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLink ? 'Edit Menu Link' : 'Tambah Menu Link Baru'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input placeholder="Open Journal System" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://ojs.example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi (opsional)</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="Deskripsi singkat tentang link ini..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih icon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {iconOptions.map((icon) => (
                              <SelectItem key={icon.value} value={icon.value}>
                                {icon.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="group_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grup Menu</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih grup" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {groupOptions.map((group) => (
                              <SelectItem key={group.value} value={group.value}>
                                {group.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urutan</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormDescription>Angka lebih kecil ditampilkan lebih dulu</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_external"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <FormLabel className="text-base">Link Eksternal</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Buka di tab baru
                        </p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <FormLabel className="text-base">Aktif</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Tampilkan link di website
                        </p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingLink ? 'Simpan Perubahan' : 'Tambah Link'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : Object.keys(groupedLinks).length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Belum ada menu link
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedLinks).map(([groupName, links]) => (
            <Card key={groupName}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{getGroupLabel(groupName)}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {links.map((link) => (
                      <TableRow key={link.id}>
                        <TableCell className="text-muted-foreground">
                          {link.position}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{link.title}</p>
                            {link.description && (
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline"
                          >
                            <span className="truncate max-w-[200px]">{link.url}</span>
                            {link.is_external && <ExternalLink className="h-3 w-3" />}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={link.is_active ? 'default' : 'secondary'}>
                            {link.is_active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(link)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteMenuLink(link.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
