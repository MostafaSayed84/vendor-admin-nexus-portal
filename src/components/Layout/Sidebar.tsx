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
import { useLanguage } from '@/components/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const adminNavItems = [
  { icon: Home, labelKey: 'dashboard', href: '/admin' },
  { icon: Users, labelKey: 'vendors', href: '/admin/vendors' },
  { icon: Package, labelKey: 'products', href: '/admin/products' },
  { icon: ShoppingCart, labelKey: 'purchaseOrders', href: '/admin/purchase-orders' },
];

const vendorNavItems = [
  { icon: Home, labelKey: 'dashboard', href: '/vendor' },
  { icon: ShoppingCart, labelKey: 'purchaseOrders', href: '/vendor/orders' },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const location = useLocation();
  
  const navItems = user?.role === 'admin' ? adminNavItems : vendorNavItems;

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-sidebar to-sidebar-accent border-r border-sidebar-border shadow-elegant">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Building2 className="h-8 w-8 text-sidebar-foreground" />
        <span className={cn("text-xl font-bold text-sidebar-foreground", isRTL ? "mr-2" : "ml-2")}>
          VendorPortal
        </span>
      </div>

      {/* User Info */}
      <div className="border-b border-sidebar-border p-4">
        <div className={cn("flex items-center", isRTL ? "space-x-reverse space-x-3" : "space-x-3")}>
          <div className="h-10 w-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary-foreground">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="mt-3">
          <LanguageToggle />
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
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isRTL ? "ml-3" : "mr-3")} />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={logout}
        >
          <LogOut className={cn("h-4 w-4", isRTL ? "ml-3" : "mr-3")} />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}