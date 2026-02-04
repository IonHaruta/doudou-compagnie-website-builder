import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from '@/services/adminApi';
import { Coupon } from '@/types/admin';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: '',
    discountPercent: '',
    validFrom: '',
    validTo: '',
    isActive: true,
    maxUsage: '',
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);
    const res = await fetchCoupons();
    if (res.success) setCoupons(res.data);
    setLoading(false);
  };

  const openCreateForm = () => {
    setEditingCoupon(null);
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      code: '',
      discountPercent: '',
      validFrom: today,
      validTo: '',
      isActive: true,
      maxUsage: '',
    });
    setIsFormOpen(true);
  };

  const openEditForm = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountPercent: coupon.discountPercent.toString(),
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      isActive: coupon.isActive,
      maxUsage: coupon.maxUsage?.toString() || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const couponData = {
      code: formData.code.toUpperCase(),
      discountPercent: parseInt(formData.discountPercent),
      validFrom: formData.validFrom,
      validTo: formData.validTo,
      isActive: formData.isActive,
      maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : undefined,
    };

    if (editingCoupon) {
      const res = await updateCoupon(editingCoupon.id, couponData);
      if (res.success) {
        toast({ title: 'Succes', description: 'Cuponul a fost actualizat.' });
        loadCoupons();
      }
    } else {
      const res = await createCoupon(couponData);
      if (res.success) {
        toast({ title: 'Succes', description: 'Cuponul a fost creat.' });
        loadCoupons();
      }
    }
    setIsFormOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await deleteCoupon(deleteId);
    if (res.success) {
      toast({ title: 'Succes', description: 'Cuponul a fost șters.' });
      loadCoupons();
    }
    setDeleteId(null);
  };

  const handleToggleActive = async (coupon: Coupon) => {
    const res = await updateCoupon(coupon.id, { isActive: !coupon.isActive });
    if (res.success) {
      toast({
        title: 'Succes',
        description: `Cuponul a fost ${!coupon.isActive ? 'activat' : 'dezactivat'}.`,
      });
      loadCoupons();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpired = (validTo: string) => {
    return new Date(validTo) < new Date();
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
          <h1 className="text-3xl font-display font-semibold text-foreground">Cupoane</h1>
          <p className="text-muted-foreground mt-1">{coupons.length} cupoane în total</p>
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="h-4 w-4 mr-2" />
          Adaugă cupon
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cod</TableHead>
                <TableHead>Reducere</TableHead>
                <TableHead>Valabilitate</TableHead>
                <TableHead>Utilizări</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => {
                const expired = isExpired(coupon.validTo);
                return (
                  <TableRow key={coupon.id} className={expired ? 'opacity-60' : ''}>
                    <TableCell className="font-mono font-medium">{coupon.code}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{coupon.discountPercent}%</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(coupon.validFrom)} - {formatDate(coupon.validTo)}
                      {expired && (
                        <Badge variant="outline" className="ml-2 text-destructive border-destructive">
                          Expirat
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {coupon.usageCount}
                      {coupon.maxUsage && ` / ${coupon.maxUsage}`}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(coupon)}
                        className={coupon.isActive ? 'text-green-600' : 'text-muted-foreground'}
                      >
                        {coupon.isActive ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <X className="h-4 w-4 mr-1" />
                        )}
                        {coupon.isActive ? 'Activ' : 'Inactiv'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditForm(coupon)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(coupon.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {coupons.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nu există cupoane.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCoupon ? 'Editare cupon' : 'Adaugă cupon nou'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="code">Cod cupon</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="ex: SUMMER20"
                className="font-mono"
                required
              />
            </div>

            <div>
              <Label htmlFor="discountPercent">Procent reducere (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                min="1"
                max="100"
                value={formData.discountPercent}
                onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="validFrom">Valabil de la</Label>
                <Input
                  id="validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="validTo">Valabil până la</Label>
                <Input
                  id="validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maxUsage">Număr maxim utilizări (opțional)</Label>
              <Input
                id="maxUsage"
                type="number"
                min="1"
                value={formData.maxUsage}
                onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                placeholder="Nelimitat"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Cupon activ</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Anulează
              </Button>
              <Button type="submit">
                {editingCoupon ? 'Salvează' : 'Creează'}
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
              Această acțiune nu poate fi anulată. Cuponul va fi șters permanent.
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
