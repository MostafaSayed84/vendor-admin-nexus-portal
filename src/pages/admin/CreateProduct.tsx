import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Package, DollarSign, Tag, Barcode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  'Electronics',
  'Furniture', 
  'Home & Garden',
  'Clothing',
  'Books',
  'Sports & Outdoors',
  'Automotive',
  'Health & Beauty'
];

const vendors = [
  { id: '1', name: 'TechCorp Solutions' },
  { id: '2', name: 'Global Supplies Inc' },
  { id: '3', name: 'Innovation Labs' },
  { id: '4', name: 'Digital Services Co' }
];

export default function CreateProduct() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sku: '',
    price: '',
    vendor: '',
    specifications: '',
    warranty: '',
    weight: '',
    dimensions: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateSKU = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PRD';
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${random}`;
  };

  const handleGenerateSKU = () => {
    const newSKU = generateSKU();
    handleInputChange('sku', newSKU);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Product created successfully",
      description: `${formData.name} has been added to the product catalog.`,
    });
    
    setIsLoading(false);
    navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/products')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="text-muted-foreground">
            Create a new product for your catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Essential product details and description
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed product description..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Primary Vendor *</Label>
                    <Select value={formData.vendor} onValueChange={(value) => handleInputChange('vendor', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vendor" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendors.map(vendor => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">Specifications</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => handleInputChange('specifications', e.target.value)}
                    placeholder="Technical specifications, features, etc..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details & Pricing */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Barcode className="h-5 w-5" />
                  Product Code
                </CardTitle>
                <CardDescription>
                  SKU and identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Stock Keeping Unit) *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      placeholder="e.g., ELE-001"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateSKU}
                      disabled={!formData.category}
                    >
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for inventory tracking
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </CardTitle>
                <CardDescription>
                  Product pricing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Base Price (SAR) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      ر.س
                    </span>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                      className="pl-12"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Base price in Saudi Riyals
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="warranty">Warranty Period</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) => handleInputChange('warranty', e.target.value)}
                    placeholder="e.g., 12 months"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      placeholder="L×W×H cm"
                    />
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
            onClick={() => navigate('/admin/products')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Product...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
}