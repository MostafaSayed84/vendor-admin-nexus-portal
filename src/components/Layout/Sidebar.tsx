import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  Plus,
  LogOut,
  Building2,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/components/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { icon: Home, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Vendors', href: '/admin/vendors' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: ShoppingCart, label: 'Purchase Orders', href: '/admin/purchase-orders' },
];

const vendorNavItems = [
  { icon: Home, label: 'Dashboard', href: '/vendor' },
  { icon: ShoppingCart, label: 'Purchase Orders', href: '/vendor/orders' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navItems = user?.role === 'admin' ? adminNavItems : vendorNavItems;

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Building2 className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold text-foreground">
          VendorPortal
        </span>
      </div>

      {/* User Info */}
      <div className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}