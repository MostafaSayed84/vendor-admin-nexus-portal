import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Package, Calendar, DollarSign, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const mockVendorOrders = [
  {
    id: 'PO-001',
    orderDate: '2024-07-10',
    expectedDelivery: '2024-07-20',
    status: 'Pending',
    totalAmount: 9187.50,
    itemCount: 15,
    priority: 'High',
    items: [
      { name: 'Wireless Bluetooth Headphones', quantity: 10, price: 337.46, total: 3374.60 },
      { name: 'Mechanical Gaming Keyboard', quantity: 5, price: 562.46, total: 2812.30 }
    ],
    notes: 'Urgent order for upcoming promotion. Please expedite shipping.'
  },
  {
    id: 'PO-002',
    orderDate: '2024-07-12',
    expectedDelivery: '2024-07-22',
    status: 'Processing',
    totalAmount: 3339.38,
    itemCount: 8,
    priority: 'Medium',
    items: [
      { name: 'Stainless Steel Water Bottle', quantity: 20, price: 93.71, total: 1874.20 },
      { name: 'Wireless Bluetooth Headphones', quantity: 5, price: 356.21, total: 1781.05 }
    ],
    notes: 'Standard delivery is fine for this order.'
  },
  {
    id: 'PO-003',
    orderDate: '2024-07-08',
    expectedDelivery: '2024-07-15',
    status: 'Shipped',
    totalAmount: 12002.81,
    itemCount: 12,
    priority: 'Low',
    items: [
      { name: 'Ergonomic Office Chair', quantity: 10, price: 1124.96, total: 11249.60 },
      { name: 'Mechanical Gaming Keyboard', quantity: 2, price: 599.96, total: 1199.92 }
    ],
    notes: 'Customer requested specific delivery instructions.'
  },
  {
    id: 'PO-004',
    orderDate: '2024-07-14',
    expectedDelivery: '2024-07-25',
    status: 'Pending',
    totalAmount: 6562.50,
    itemCount: 25,
    priority: 'High',
    items: [
      { name: 'Organic Cotton T-Shirt', quantity: 50, price: 112.46, total: 5623.00 },
      { name: 'Ergonomic Office Chair', quantity: 2, price: 1049.96, total: 2099.92 }
    ],
    notes: 'Large order - please confirm availability before processing.'
  }
];

export default function VendorOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedOrder, setSelectedOrder] = useState<typeof mockVendorOrders[0] | null>(null);
  const { toast } = useToast();

  const statuses = ['All Status', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = mockVendorOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || order.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'Shipped':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Processing':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Pending':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-destructive text-destructive';
      case 'Medium':
        return 'border-warning text-warning';
      case 'Low':
        return 'border-muted-foreground text-muted-foreground';
      default:
        return 'border-muted-foreground text-muted-foreground';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    toast({
      title: "Order Updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`,
    });
    setSelectedOrder(null);
  };

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = filteredOrders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Manage your purchase orders and update delivery status
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">{filteredOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-foreground">ر.س{(totalValue * 3.75).toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredOrders.filter(o => o.status === 'Shipped').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-medium text-foreground">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {new Date(order.expectedDelivery).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-foreground">{order.itemCount} items</span>
                  </TableCell>
                   <TableCell>
                     <span className="font-medium text-foreground">
                       ر.س{(order.totalAmount * 3.75).toLocaleString()}
                     </span>
                   </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                          <DialogDescription>
                            Review order details and update shipping status
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Order Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Order Date</p>
                                <p className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Expected Delivery</p>
                                <p className="font-medium">{new Date(selectedOrder.expectedDelivery).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Priority</p>
                                <Badge variant="outline" className={getPriorityColor(selectedOrder.priority)}>
                                  {selectedOrder.priority}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Current Status</p>
                                <Badge className={getStatusColor(selectedOrder.status)}>
                                  {selectedOrder.status}
                                </Badge>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h4 className="font-medium mb-3">Order Items</h4>
                              <div className="border border-border rounded-lg">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Product</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead>Unit Price</TableHead>
                                      <TableHead>Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedOrder.items.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                         <TableCell>ر.س{item.price.toFixed(2)}</TableCell>
                                         <TableCell>ر.س{item.total.toFixed(2)}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <div className="flex justify-end mt-4">
                                <div className="text-right">
                                   <p className="text-lg font-bold">
                                     Total: ر.س{selectedOrder.totalAmount.toFixed(2)}
                                   </p>
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            {selectedOrder.notes && (
                              <div>
                                <h4 className="font-medium mb-2">Special Instructions</h4>
                                <p className="text-sm text-muted-foreground bg-accent p-3 rounded-lg">
                                  {selectedOrder.notes}
                                </p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                              {selectedOrder.status === 'Pending' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'Processing')}
                                  className="flex-1"
                                >
                                  Mark as Processing
                                </Button>
                              )}
                              {selectedOrder.status === 'Processing' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'Shipped')}
                                  className="flex-1"
                                >
                                  <Truck className="h-4 w-4 mr-2" />
                                  Mark as Shipped
                                </Button>
                              )}
                              {selectedOrder.status === 'Shipped' && (
                                <Button 
                                  onClick={() => updateOrderStatus(selectedOrder.id, 'Delivered')}
                                  className="flex-1"
                                >
                                  Mark as Delivered
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}