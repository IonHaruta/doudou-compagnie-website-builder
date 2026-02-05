import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Loader2, Search, Package } from 'lucide-react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { fetchOrders, updateOrderStatus } from '@/services/adminApi';
import { Order, OrderStatus } from '@/types/admin';

const statusColors: Record<OrderStatus, string> = {
  new: 'bg-blue-500/10 text-blue-600 border-blue-200',
  processing: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
  completed: 'bg-green-500/10 text-green-600 border-green-200',
  cancelled: 'bg-red-500/10 text-red-600 border-red-200',
};

const statusLabels: Record<OrderStatus, string> = {
  new: 'Nouă',
  processing: 'În procesare',
  completed: 'Finalizată',
  cancelled: 'Anulată',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const res = await fetchOrders();
    if (res.success) setOrders(res.data);
    setLoading(false);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.customer.firstName} ${order.customer.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: number, newStatus: OrderStatus) => {
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
      toast({ title: 'Succes', description: 'Statusul comenzii a fost actualizat.' });
      loadOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
      <div>
        <h1 className="text-3xl font-display font-semibold text-foreground">Comenzi</h1>
        <p className="text-muted-foreground mt-1">{orders.length} comenzi în total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Caută după nr. comandă, nume sau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Toate statusurile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate statusurile</SelectItem>
            <SelectItem value="new">Noi</SelectItem>
            <SelectItem value="processing">În procesare</SelectItem>
            <SelectItem value="completed">Finalizate</SelectItem>
            <SelectItem value="cancelled">Anulate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nr. Comandă</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acțiuni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.customer.firstName} {order.customer.lastName}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">€{order.total.toFixed(2)}</span>
                      {order.discount > 0 && (
                        <span className="text-sm text-green-600 ml-2">
                          (-€{order.discount.toFixed(2)})
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <Badge variant="outline" className={statusColors[order.status]}>
                          {statusLabels[order.status]}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Nouă</SelectItem>
                        <SelectItem value="processing">În procesare</SelectItem>
                        <SelectItem value="completed">Finalizată</SelectItem>
                        <SelectItem value="cancelled">Anulată</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nu au fost găsite comenzi.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalii comandă {selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={statusColors[selectedOrder.status]}>
                  {statusLabels[selectedOrder.status]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDate(selectedOrder.createdAt)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Informații client</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Nume:</span>
                    <span className="ml-2">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2">{selectedOrder.customer.email}</span>
                  </div>
                  {selectedOrder.customer.phone && (
                    <div>
                      <span className="text-muted-foreground">Telefon:</span>
                      <span className="ml-2">{selectedOrder.customer.phone}</span>
                    </div>
                  )}
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Adresă:</span>
                    <span className="ml-2">
                      {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.postalCode}, {selectedOrder.customer.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Produse comandate
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × €{item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-medium">€{item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>€{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Reducere {selectedOrder.couponCode && `(${selectedOrder.couponCode})`}:
                    </span>
                    <span className="text-green-600">-€{selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>€{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
