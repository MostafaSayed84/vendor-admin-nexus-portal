import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { LanguageProvider } from "@/components/LanguageContext";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VendorList from "./pages/admin/VendorList";
import CreateVendor from "./pages/admin/CreateVendor";
import ProductList from "./pages/admin/ProductList";
import CreateProduct from "./pages/admin/CreateProduct";
import PurchaseOrders from "./pages/admin/PurchaseOrders";
import CreatePurchaseOrder from "./pages/admin/CreatePurchaseOrder";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorOrders from "./pages/vendor/VendorOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'admin' | 'vendor' }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/vendor'} replace />;
  }
  
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppRoutes() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Navigate to={user.role === 'admin' ? '/admin' : '/vendor'} replace />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/vendors" element={<ProtectedRoute allowedRole="admin"><VendorList /></ProtectedRoute>} />
      <Route path="/admin/vendors/create" element={<ProtectedRoute allowedRole="admin"><CreateVendor /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute allowedRole="admin"><ProductList /></ProtectedRoute>} />
      <Route path="/admin/products/create" element={<ProtectedRoute allowedRole="admin"><CreateProduct /></ProtectedRoute>} />
      <Route path="/admin/purchase-orders" element={<ProtectedRoute allowedRole="admin"><PurchaseOrders /></ProtectedRoute>} />
      <Route path="/admin/purchase-orders/create" element={<ProtectedRoute allowedRole="admin"><CreatePurchaseOrder /></ProtectedRoute>} />
      
      {/* Vendor Routes */}
      <Route path="/vendor" element={<ProtectedRoute allowedRole="vendor"><VendorDashboard /></ProtectedRoute>} />
      <Route path="/vendor/orders" element={<ProtectedRoute allowedRole="vendor"><VendorOrders /></ProtectedRoute>} />
      
      {/* Redirects */}
      <Route path="/" element={<Navigate to={user.role === 'admin' ? '/admin' : '/vendor'} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
