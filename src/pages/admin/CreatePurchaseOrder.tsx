import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Trash2, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

const mockVendors = [
  { id: '1', name: 'TechCorp Solutions' },
  { id: '2', name: 'Global Supplies Inc' },
  { id: '3', name: 'Innovation Labs' },
  { id: '4', name: 'Digital Services Co' }
];

const vendorProducts = {
  '1': [
    { id: 'P001', name: 'Wireless Bluetooth Headphones', price: 337.46 },
    { id: 'P004', name: 'Mechanical Gaming Keyboard', price: 562.46 }
  ],
  '2': [
    { id: 'P001', name: 'Wireless Bluetooth Headphones', price: 356.21 },
    { id: 'P003', name: 'Stainless Steel Water Bottle', price: 93.71 }
  ],
  '3': [
    { id: 'P002', name: 'Ergonomic Office Chair', price: 1124.96 },
    { id: 'P004', name: 'Mechanical Gaming Keyboard', price: 599.96 }
  ],
  '4': [
    { id: 'P002', name: 'Ergonomic Office Chair', price: 1049.96 },
    { id: 'P005', name: 'Organic Cotton T-Shirt', price: 112.46 }
  ]
};

export default function CreatePurchaseOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedVendor, setSelectedVendor] = useState('');
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const availableProducts = selectedVendor ? vendorProducts[selectedVendor as keyof typeof vendorProducts] || [] : [];

  const addOrderItem = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = orderItems.find(item => item.productId === productId);
    if (existingItem) {
      updateQuantity(productId, existingItem.quantity + 1);
    } else {
      const newItem: OrderItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        total: product.price
      };
      setOrderItems([...orderItems, newItem]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeOrderItem(productId);
      return;
    }

    setOrderItems(items =>
      items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity, total: item.price * newQuantity }
          : item
      )
    );
  };

  const removeOrderItem = (productId: string) => {
    setOrderItems(items => items.filter(item => item.productId !== productId));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVendor || orderItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select a vendor and add at least one item.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const orderId = `PO-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    toast({
      title: "Purchase Order Created",
      description: `Order ${orderId} has been created successfully and sent to the vendor.`,
    });
    
    setIsLoading(false);
    navigate('/admin/purchase-orders');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/purchase-orders')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Purchase Order</h1>
          <p className="text-muted-foreground">
            Create a new purchase order for a vendor
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
                <CardDescription>
                  Basic details for the purchase order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor *</Label>
                    <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockVendors.map(vendor => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderDate">Order Date *</Label>
                    <Input
                      id="orderDate"
                      type="date"
                      value={orderDate}
                      onChange={(e) => setOrderDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery Date</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={expectedDelivery}
                    onChange={(e) => setExpectedDelivery(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes or instructions..."
                    className="w-full p-3 border border-border rounded-md bg-background text-foreground"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>
                  Add products to your purchase order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedVendor && (
                  <div className="space-y-2">
                    <Label>Add Product</Label>
                    <Select onValueChange={(value) => addOrderItem(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map(product => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - ر.س{product.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {orderItems.length > 0 && (
                  <div className="border border-border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item.productId}>
                            <TableCell>{item.productName}</TableCell>
                            <TableCell>ر.س{item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>ر.س{item.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOrderItem(item.productId)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {!selectedVendor && (
                  <div className="text-center py-8 text-muted-foreground">
                    Please select a vendor to add products
                  </div>
                )}

                {selectedVendor && orderItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No items added yet. Select products from the dropdown above.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">ر.س{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%):</span>
                    <span className="font-medium">ر.س{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">ر.س{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{orderItems.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Quantity:</span>
                    <span>{orderItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/purchase-orders')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || orderItems.length === 0}>
            {isLoading ? 'Creating Order...' : 'Create Purchase Order'}
          </Button>
        </div>
      </form>
    </div>
  );
}