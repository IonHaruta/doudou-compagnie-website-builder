import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Ticket,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produse', href: '/admin/products', icon: Package },
  { name: 'Categorii', href: '/admin/categories', icon: FolderTree },
  { name: 'Comenzi', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Cupoane', href: '/admin/coupons', icon: Ticket },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-admin-page-bg flex">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-admin-sidebar-bg border-r border-border transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <Link to="/admin" className="font-display text-lg font-semibold text-foreground">
              Admin Panel
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  active
                    ? 'bg-admin-nav-active text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border bg-admin-sidebar-bg">
          {sidebarOpen && user && (
            <div className="mb-3 px-3 py-2 text-sm text-muted-foreground">
              <p className="truncate font-medium text-foreground/90">{user.email}</p>
              <p className="text-xs uppercase tracking-wide">{user.role}</p>
            </div>
          )}
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 text-muted-foreground hover:text-destructive',
              !sidebarOpen && 'justify-center'
            )}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>Deconectare</span>}
          </Button>
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-start gap-3 text-muted-foreground hover:text-foreground mt-1',
                !sidebarOpen && 'justify-center'
              )}
            >
              <ChevronRight className="h-5 w-5" />
              {sidebarOpen && <span>Înapoi la magazin</span>}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300 min-h-screen',
          sidebarOpen ? 'ml-64' : 'ml-16'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
