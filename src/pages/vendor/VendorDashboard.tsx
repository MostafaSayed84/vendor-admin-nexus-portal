import { StatsCard } from '@/components/ui/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Package, Clock, TrendingUp, DollarSign, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function VendorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Vendor Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your orders and business activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Pending Orders"
          value="5"
          icon={Clock}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Total Orders"
          value="43"
          icon={ShoppingCart}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Shipped Orders"
          value="38"
          icon={Package}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Revenue This Month"
          value="$18,420"
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Average Order Value"
          value="$428"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Completion Rate"
          value="95.3%"
          icon={CheckCircle}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Recent Orders & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
            <CardDescription>Latest orders requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 'PO-001', 
                  date: '2 hours ago', 
                  amount: '$2,450', 
                  status: 'Pending',
                  items: 15,
                  priority: 'High'
                },
                { 
                  id: 'PO-002', 
                  date: '5 hours ago', 
                  amount: '$890', 
                  status: 'Processing',
                  items: 8,
                  priority: 'Medium'
                },
                { 
                  id: 'PO-003', 
                  date: '1 day ago', 
                  amount: '$3,200', 
                  status: 'Shipped',
                  items: 12,
                  priority: 'Low'
                },
                { 
                  id: 'PO-004', 
                  date: '2 days ago', 
                  amount: '$1,750', 
                  status: 'Pending',
                  items: 25,
                  priority: 'High'
                },
              ].map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{order.id}</p>
                      <Badge 
                        variant="outline" 
                        className={
                          order.priority === 'High' 
                            ? 'border-destructive text-destructive' 
                            : order.priority === 'Medium'
                            ? 'border-warning text-warning'
                            : 'border-muted-foreground text-muted-foreground'
                        }
                      >
                        {order.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.date} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.amount}</p>
                    <span className={`text-xs font-medium ${
                      order.status === 'Shipped'
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

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Your vendor performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order Fulfillment Rate</span>
                  <span className="font-medium">95.3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '95.3%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">On-Time Delivery</span>
                  <span className="font-medium">88.7%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '88.7%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Response Time</span>
                  <span className="font-medium">92.1%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '92.1%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-success">A+</p>
                    <p className="text-xs text-muted-foreground">Overall Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">4.8</p>
                    <p className="text-xs text-muted-foreground">Customer Score</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">View Orders</p>
                  <p className="text-sm text-muted-foreground">Manage purchase orders</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Update Inventory</p>
                  <p className="text-sm text-muted-foreground">Manage stock levels</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg hover:bg-warning/10 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Pending Reviews</p>
                  <p className="text-sm text-muted-foreground">5 items need attention</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}