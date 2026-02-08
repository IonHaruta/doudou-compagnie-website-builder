import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, FolderTree, Euro, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchDashboardStats } from '@/services/adminApi';
import { DashboardStats } from '@/types/admin';

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  delay,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="h-full"
    >
      <Card className="h-full bg-card border border-border shadow-soft rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground mt-1 min-h-[1rem]">
            {description || '\u00A0'}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OrderStatusCard({
  title,
  count,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  count: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="flex items-center gap-4 p-4 bg-card border border-border shadow-soft rounded-xl">
        <div className={`p-3 rounded-full ${color} shrink-0`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{count}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetchDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 font-body">Bun venit în panoul de administrare</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Produse"
          value={stats.totalProducts}
          icon={Package}
          description={`${stats.activeProducts} active`}
          delay={0}
        />
        <StatCard
          title="Total Comenzi"
          value={stats.totalOrders}
          icon={ShoppingCart}
          delay={0.1}
        />
        <StatCard
          title="Categorii"
          value={stats.totalCategories}
          icon={FolderTree}
          delay={0.2}
        />
        <StatCard
          title="Venituri Totale"
          value={`€${stats.totalRevenue.toFixed(2)}`}
          icon={Euro}
          description="Din comenzi finalizate"
          delay={0.3}
        />
      </div>

      {/* Order Status Breakdown */}
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Status Comenzi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <OrderStatusCard
            title="Noi"
            count={stats.ordersByStatus.new}
            icon={Clock}
            color="bg-blue-500"
            delay={0.4}
          />
          <OrderStatusCard
            title="În procesare"
            count={stats.ordersByStatus.processing}
            icon={Loader2}
            color="bg-yellow-500"
            delay={0.5}
          />
          <OrderStatusCard
            title="Finalizate"
            count={stats.ordersByStatus.completed}
            icon={CheckCircle}
            color="bg-green-500"
            delay={0.6}
          />
          <OrderStatusCard
            title="Anulate"
            count={stats.ordersByStatus.cancelled}
            icon={XCircle}
            color="bg-red-500"
            delay={0.7}
          />
        </div>
      </div>

      {/* Quick Actions Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <Card className="bg-card border border-border shadow-soft rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-display font-semibold">Acțiuni Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-body">
              Folosește meniul din stânga pentru a naviga între secțiuni. Poți gestiona produse,
              categorii, comenzi și cupoane de reducere.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
