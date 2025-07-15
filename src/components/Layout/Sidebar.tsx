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
    <div className={cn(
      "flex h-full w-64 flex-col transition-all duration-300",
      "bg-gradient-to-b from-sidebar to-sidebar-accent shadow-elegant",
      isRTL ? "border-l border-sidebar-border" : "border-r border-sidebar-border"
    )}>
      {/* Logo/Brand */}
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-6",
        isRTL ? "flex-row-reverse" : ""
      )}>
        <Building2 className="h-8 w-8 text-sidebar-foreground" />
        <span className={cn(
          "text-xl font-bold text-sidebar-foreground transition-colors duration-300",
          isRTL ? "mr-2" : "ml-2"
        )}>
          {t('appName')}
        </span>
      </div>

      {/* User Info */}
      <div className="border-b border-sidebar-border p-4 bg-sidebar-accent/30">
        <div className={cn(
          "flex items-center transition-all duration-300",
          isRTL ? "space-x-reverse space-x-3" : "space-x-3"
        )}>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-105">
            <span className="text-sm font-medium text-sidebar-primary-foreground">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div className={cn(isRTL ? "text-right" : "text-left")}>
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">
              {t(user?.role || 'user')}
            </p>
          </div>
        </div>
        <div className={cn("mt-3", isRTL ? "text-right" : "text-left")}>
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
                "group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 hover:translate-x-1",
                isRTL ? "hover:-translate-x-1" : "",
                isActive
                  ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground hover:shadow-md",
                isRTL ? "flex-row-reverse" : ""
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-all duration-300",
                isRTL ? "ml-3" : "mr-3",
                isActive ? "text-sidebar-primary-foreground" : "group-hover:scale-110"
              )} />
              <span className="transition-all duration-300">
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-4 bg-sidebar-accent/20">
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-xl py-3 px-3 text-sm font-medium transition-all duration-300",
            "text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
            "hover:shadow-md group",
            isRTL ? "justify-end flex-row-reverse" : "justify-start"
          )}
          onClick={logout}
        >
          <LogOut className={cn(
            "h-5 w-5 transition-all duration-300 group-hover:scale-110",
            isRTL ? "ml-3" : "mr-3"
          )} />
          <span className="transition-all duration-300">
            {t('logout')}
          </span>
        </Button>
      </div>
    </div>
  );
}