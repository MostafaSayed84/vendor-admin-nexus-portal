import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Package, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockProducts = [
  {
    id: 'P001',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    sku: 'WBH-001',
      vendors: [
        { name: 'TechCorp Solutions', price: 337.46, stock: 150 },
        { name: 'Global Supplies Inc', price: 356.21, stock: 75 }
      ],
      status: 'Active',
      totalStock: 225,
      lowestPrice: 337.46
  },
  {
    id: 'P002',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    sku: 'EOC-002',
      vendors: [
        { name: 'Innovation Labs', price: 1124.96, stock: 25 },
        { name: 'Digital Services Co', price: 1049.96, stock: 40 }
      ],
      status: 'Active',
      totalStock: 65,
      lowestPrice: 1049.96
  },
  {
    id: 'P003',
    name: 'Stainless Steel Water Bottle',
    category: 'Home & Garden',
    sku: 'SSWB-003',
      vendors: [
        { name: 'Global Supplies Inc', price: 93.71, stock: 200 }
      ],
      status: 'Active',
      totalStock: 200,
      lowestPrice: 93.71
  },
  {
    id: 'P004',
    name: 'Mechanical Gaming Keyboard',
    category: 'Electronics',
    sku: 'MGK-004',
      vendors: [
        { name: 'TechCorp Solutions', price: 562.46, stock: 80 },
        { name: 'Innovation Labs', price: 599.96, stock: 45 }
      ],
      status: 'Low Stock',
      totalStock: 125,
      lowestPrice: 562.46
  },
  {
    id: 'P005',
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    sku: 'OCT-005',
      vendors: [
        { name: 'Digital Services Co', price: 112.46, stock: 0 }
      ],
      status: 'Out of Stock',
      totalStock: 0,
      lowestPrice: 112.46
  }
];

const categories = ['All Categories', 'Electronics', 'Furniture', 'Home & Garden', 'Clothing'];

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All Status' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Low Stock':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Out of Stock':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">
            Manage products across all vendors
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/products/create">
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Low Stock">Low Stock</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vendors</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Lowest Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {product.vendors.map((vendor, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{vendor.name}</span>
                          <div className="text-right">
                            <div className="font-medium">ر.س{vendor.price}</div>
                            <div className="text-muted-foreground">Stock: {vendor.stock}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      product.totalStock === 0 ? 'text-destructive' :
                      product.totalStock < 50 ? 'text-warning' : 'text-foreground'
                    }`}>
                      {product.totalStock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-1">ر.س</span>
                      <span className="font-medium">{product.lowestPrice}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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