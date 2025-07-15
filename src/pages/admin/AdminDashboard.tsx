import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, ShoppingCart, TrendingUp, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of vendor management and system activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Vendors"
          value="24"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Products"
          value="1,429"
          icon={Package}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Purchase Orders"
          value="89"
          icon={ShoppingCart}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsCard
          title="Total Revenue"
          value="$142,450"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Vendor Registrations</CardTitle>
            <CardDescription>Latest vendor sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'TechCorp Solutions', date: '2 hours ago', status: 'Pending' },
                { name: 'Global Supplies Inc', date: '5 hours ago', status: 'Approved' },
                { name: 'Innovation Labs', date: '1 day ago', status: 'Approved' },
                { name: 'Digital Services Co', date: '2 days ago', status: 'Under Review' },
              ].map((vendor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{vendor.name}</p>
                    <p className="text-sm text-muted-foreground">{vendor.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    vendor.status === 'Approved' 
                      ? 'bg-success/10 text-success' 
                      : vendor.status === 'Pending'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
            <CardDescription>Latest order activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 'PO-001', vendor: 'TechCorp Solutions', amount: '$2,450', status: 'Shipped' },
                { id: 'PO-002', vendor: 'Global Supplies Inc', amount: '$890', status: 'Processing' },
                { id: 'PO-003', vendor: 'Innovation Labs', amount: '$3,200', status: 'Delivered' },
                { id: 'PO-004', vendor: 'Digital Services Co', amount: '$1,750', status: 'Pending' },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.amount}</p>
                    <span className={`text-xs font-medium ${
                      order.status === 'Delivered' || order.status === 'Shipped'
                        ? 'text-success' 
                        : order.status === 'Processing'
                        ? 'text-warning'
                        : 'text-muted-foreground'
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