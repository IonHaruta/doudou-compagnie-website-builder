import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Search, Upload, X, ImageIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} from '@/services/adminApi';
import { AdminProduct, Category, ProductStatus } from '@/types/admin';

const statusColors: Record<ProductStatus, string> = {
  active: 'bg-green-500/10 text-green-600 border-green-200',
  draft: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
  hidden: 'bg-gray-500/10 text-gray-600 border-gray-200',
};

const statusLabels: Record<ProductStatus, string> = {
  active: 'Activ',
  draft: 'Ciornă',
  hidden: 'Ascuns',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    promotionalPrice: '',
    promotionStartDate: '',
    promotionEndDate: '',
    stockQuantity: '',
    status: 'draft' as ProductStatus,
    categoryId: '',
  });

  // Image upload state
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
    
    // Reset input to allow re-uploading same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      uploadedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [productsRes, categoriesRes] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
    if (productsRes.success) setProducts(productsRes.data);
    if (categoriesRes.success) setCategories(categoriesRes.data);
    setLoading(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      promotionalPrice: '',
      promotionStartDate: '',
      promotionEndDate: '',
      stockQuantity: '',
      status: 'draft',
      categoryId: categories[0]?.id.toString() || '',
    });
    setUploadedImages([]);
    setIsFormOpen(true);
  };

  const openEditForm = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      promotionalPrice: product.promotionalPrice?.toString() || '',
      promotionStartDate: product.promotionStartDate || '',
      promotionEndDate: product.promotionEndDate || '',
      stockQuantity: product.stockQuantity.toString(),
      status: product.status,
      categoryId: product.categoryId.toString(),
    });
    // Note: Existing product images would be loaded from backend
    // For now, reset uploaded images when editing
    setUploadedImages([]);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      promotionalPrice: formData.promotionalPrice ? parseFloat(formData.promotionalPrice) : undefined,
      promotionStartDate: formData.promotionStartDate || undefined,
      promotionEndDate: formData.promotionEndDate || undefined,
      stockQuantity: parseInt(formData.stockQuantity),
      status: formData.status,
      categoryId: parseInt(formData.categoryId),
    };

    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, productData);
      if (res.success) {
        toast({ title: 'Succes', description: 'Produsul a fost actualizat.' });
        loadData();
      }
    } else {
      const res = await createProduct(productData);
      if (res.success) {
        toast({ title: 'Succes', description: 'Produsul a fost creat.' });
        loadData();
      }
    }
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteProduct(deleteId);
    if (res.success) {
      toast({ title: 'Succes', description: 'Produsul a fost șters.' });
      loadData();
    }
    setDeleteId(null);
  };

  const handleToggleStatus = async (product: AdminProduct) => {
    const newStatus: ProductStatus = product.status === 'active' ? 'hidden' : 'active';
    const res = await toggleProductStatus(product.id, newStatus);
    if (res.success) {
      toast({
        title: 'Succes',
        description: `Produsul a fost ${newStatus === 'active' ? 'activat' : 'ascuns'}.`,
      });
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">Produse</h1>
          <p className="text-muted-foreground mt-1">{products.length} produse în total</p>
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="h-4 w-4 mr-2" />
          Adaugă produs
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Caută produse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Img</TableHead>
                <TableHead>Nume</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Preț</TableHead>
                <TableHead>Stoc</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-muted" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.category?.name || '-'}
                  </TableCell>
                  <TableCell>
                    {product.promotionalPrice ? (
                      <div>
                        <span className="text-destructive font-medium">
                          €{product.promotionalPrice.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground line-through text-sm ml-2">
                          €{product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span>€{product.price.toFixed(2)}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={product.stockQuantity === 0 ? 'text-destructive' : ''}>
                      {product.stockQuantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[product.status]}>
                      {statusLabels[product.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(product)}
                        title={product.status === 'active' ? 'Ascunde' : 'Activează'}
                      >
                        {product.status === 'active' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditForm(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nu au fost găsite produse.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Editare produs' : 'Adaugă produs nou'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nume produs</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="price">Preț (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="promotionalPrice">Preț promoțional (€)</Label>
                <Input
                  id="promotionalPrice"
                  type="number"
                  step="0.01"
                  value={formData.promotionalPrice}
                  onChange={(e) => setFormData({ ...formData, promotionalPrice: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="promotionStartDate">Început promoție</Label>
                <Input
                  id="promotionStartDate"
                  type="date"
                  value={formData.promotionStartDate}
                  onChange={(e) => setFormData({ ...formData, promotionStartDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="promotionEndDate">Sfârșit promoție</Label>
                <Input
                  id="promotionEndDate"
                  type="date"
                  value={formData.promotionEndDate}
                  onChange={(e) => setFormData({ ...formData, promotionEndDate: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="stockQuantity">Stoc</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoryId">Categorie</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectează" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as ProductStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Ciornă</SelectItem>
                    <SelectItem value="active">Activ</SelectItem>
                    <SelectItem value="hidden">Ascuns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label>Imagini produse</Label>
                <div className="mt-2 space-y-3">
                  {/* Preview uploaded images */}
                  {uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-20 h-20 rounded-lg object-cover border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-[10px] px-1 rounded">
                              Principal
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 rounded-full bg-muted">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click pentru a încărca imagini</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG sau WEBP (max 5MB fiecare)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    <ImageIcon className="h-3 w-3 inline mr-1" />
                    Imaginile vor fi salvate când conectezi backend-ul Django. Prima imagine va fi cea principală.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Anulează
              </Button>
              <Button type="submit">
                {editingProduct ? 'Salvează' : 'Creează'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ești sigur?</AlertDialogTitle>
            <AlertDialogDescription>
              Această acțiune nu poate fi anulată. Produsul va fi șters permanent.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anulează</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Șterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
