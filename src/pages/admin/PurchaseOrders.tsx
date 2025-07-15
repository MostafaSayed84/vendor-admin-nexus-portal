import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Eye, Calendar, Package, DollarSign, LayoutGrid, List, Edit, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/components/LanguageContext';
import { cn } from '@/lib/utils';

type ViewMode = 'table' | 'cards';

const mockPurchaseOrders = [
  {
    id: 'PO-001',
    vendor: 'TechCorp Solutions',
    orderDate: '2024-07-10',
    expectedDelivery: '2024-07-20',
    status: 'Shipped',
    totalAmount: 2450.00,
    itemCount: 15,
    items: [
      { name: 'Wireless Bluetooth Headphones', quantity: 10, price: 89.99 },
      { name: 'Mechanical Gaming Keyboard', quantity: 5, price: 149.99 }
    ]
  },
  {
    id: 'PO-002',
    vendor: 'Global Supplies Inc',
    orderDate: '2024-07-12',
    expectedDelivery: '2024-07-22',
    status: 'Processing',
    totalAmount: 890.50,
    itemCount: 8,
    items: [
      { name: 'Stainless Steel Water Bottle', quantity: 20, price: 24.99 },
      { name: 'Wireless Bluetooth Headphones', quantity: 5, price: 94.99 }
    ]
  },
  {
    id: 'PO-003',
    vendor: 'Innovation Labs',
    orderDate: '2024-07-08',
    expectedDelivery: '2024-07-15',
    status: 'Delivered',
    totalAmount: 3200.75,
    itemCount: 12,
    items: [
      { name: 'Ergonomic Office Chair', quantity: 10, price: 299.99 },
      { name: 'Mechanical Gaming Keyboard', quantity: 2, price: 159.99 }
    ]
  },
  {
    id: 'PO-004',
    vendor: 'Digital Services Co',
    orderDate: '2024-07-14',
    expectedDelivery: '2024-07-25',
    status: 'Pending',
    totalAmount: 1750.00,
    itemCount: 25,
    items: [
      { name: 'Organic Cotton T-Shirt', quantity: 50, price: 29.99 },
      { name: 'Ergonomic Office Chair', quantity: 2, price: 279.99 }
    ]
  }
];

export default function PurchaseOrders() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');

  const vendors = ['All Vendors', ...Array.from(new Set(mockPurchaseOrders.map(po => po.vendor)))];
  const statuses = ['All Status', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const filteredOrders = mockPurchaseOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Status' || order.status === selectedStatus;
    const matchesVendor = selectedVendor === 'All Vendors' || order.vendor === selectedVendor;
    
    return matchesSearch && matchesStatus && matchesVendor;
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

  const getStatusTranslation = (status: string) => {
    return t(status.toLowerCase());
  };

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = filteredOrders.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('purchaseOrders')}</h1>
          <p className="text-muted-foreground">
            {t('managePurchaseOrders')}
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/purchase-orders/create">
            <Plus className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
            {t('createOrder')}
          </Link>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('totalOrders')}</p>
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('totalAmount')}</p>
                <p className="text-2xl font-bold text-foreground">
                  {isRTL ? `${(totalValue * 3.75).toLocaleString()} ر.س` : `SAR ${(totalValue * 3.75).toLocaleString()}`}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('pending')}</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredOrders.filter(o => o.status === 'Pending').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t('delivered')}</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredOrders.filter(o => o.status === 'Delivered').length}
                </p>
              </div>
              <Package className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className={cn("absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground", isRTL ? "right-3" : "left-3")} />
            <Input
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(isRTL ? "pr-10" : "pl-10")}
            />
          </div>
          <Select value={selectedVendor} onValueChange={setSelectedVendor}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t('vendors')} />
            </SelectTrigger>
            <SelectContent>
              {vendors.map(vendor => (
                <SelectItem key={vendor} value={vendor}>
                  {vendor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder={t('status')} />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === 'All Status' ? t('status') : getStatusTranslation(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
            <span className={cn("hidden sm:inline", isRTL ? "mr-2" : "ml-2")}>{t('tableView')}</span>
          </Button>
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className={cn("hidden sm:inline", isRTL ? "mr-2" : "ml-2")}>{t('cardView')}</span>
          </Button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('orderId')}</TableHead>
                  <TableHead>{t('vendors')}</TableHead>
                  <TableHead>{t('orderDate')}</TableHead>
                  <TableHead>{t('expectedDelivery')}</TableHead>
                  <TableHead>{t('items')}</TableHead>
                  <TableHead>{t('totalAmount')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead>{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <span className="font-medium text-foreground">{order.id}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-foreground">{order.vendor}</span>
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
                      <span className="text-foreground">{order.itemCount} {t('items')}</span>
                    </TableCell>
                     <TableCell>
                       <span className="font-medium text-foreground">
                         {isRTL ? `${(order.totalAmount * 3.75).toLocaleString()} ر.س` : `SAR ${(order.totalAmount * 3.75).toLocaleString()}`}
                       </span>
                     </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusTranslation(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                          {t('view')}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                          {t('edit')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.vendor}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusTranslation(order.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('orderDate')}:</span>
                      <span className="text-foreground">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('expectedDelivery')}:</span>
                      <span className="text-foreground">
                        {new Date(order.expectedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('items')}:</span>
                      <span className="text-foreground">{order.itemCount}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-foreground">
                        {isRTL ? `${(order.totalAmount * 3.75).toLocaleString()} ر.س` : `SAR ${(order.totalAmount * 3.75).toLocaleString()}`}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                        {t('view')}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                        {t('edit')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}