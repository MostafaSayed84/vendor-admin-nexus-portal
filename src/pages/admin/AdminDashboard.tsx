import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          {t('dashboard')}
        </h1>
        <p className="text-lg text-muted-foreground">
          Overview of vendor management and system activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title={t('vendors')}
          value="24"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('products')}
          value="1,429"
          icon={Package}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('purchaseOrders')}
          value="89"
          icon={ShoppingCart}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Total Revenue"
          value="542,450 SAR"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Growth Rate"
          value="23.5%"
          icon={TrendingUp}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard
          title="System Activity"
          value="98.2%"
          icon={Activity}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-elegant hover-shadow-card transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Recent Vendor Registrations</CardTitle>
            <CardDescription className="text-base">Latest vendor sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'TechCorp Solutions', date: '2 hours ago', status: 'Pending' },
                { name: 'Global Supplies Inc', date: '5 hours ago', status: 'Approved' },
                { name: 'Innovation Labs', date: '1 day ago', status: 'Approved' },
                { name: 'Digital Services Co', date: '2 days ago', status: 'Under Review' },
              ].map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl border border-accent transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">{vendor.date}</p>
                  </div>
                  <span className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                    vendor.status === 'Approved' 
                      ? 'bg-success/20 text-success border border-success/30' 
                      : vendor.status === 'Pending'
                      ? 'bg-warning/20 text-warning border border-warning/30'
                      : 'bg-muted text-muted-foreground border border-muted'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant hover-shadow-card transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Recent Purchase Orders</CardTitle>
            <CardDescription className="text-base">Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'PO-001', vendor: 'TechCorp Solutions', amount: '9,188 SAR', status: 'Shipped' },
                { id: 'PO-002', vendor: 'Global Supplies Inc', amount: '3,338 SAR', status: 'Processing' },
                { id: 'PO-003', vendor: 'Innovation Labs', amount: '12,000 SAR', status: 'Delivered' },
                { id: 'PO-004', vendor: 'Digital Services Co', amount: '6,563 SAR', status: 'Pending' },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-accent/50 to-accent/30 rounded-xl border border-accent transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.vendor}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold text-foreground">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'Delivered' || order.status === 'Shipped'
                        ? 'bg-success/20 text-success border border-success/30' 
                        : order.status === 'Processing'
                        ? 'bg-warning/20 text-warning border border-warning/30'
                        : 'bg-muted text-muted-foreground border border-muted'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}