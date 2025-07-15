import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      search: "Search",
      filter: "Filter",
      create: "Create",
      add: "Add",
      edit: "Edit",
      view: "View",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading",
      dashboard: "Dashboard",
      
      // Authentication
      appName: "VendorPortal",
      welcomeBack: "Welcome Back",
      signInToAccess: "Sign in to access your portal",
      admin: "Admin",
      vendor: "Vendor", 
      adminPortalAccess: "Admin Portal Access",
      vendorPortalAccess: "Vendor Portal Access",
      email: "Email",
      password: "Password",
      enterPassword: "Enter your password",
      signIn: "Sign In",
      signingIn: "Signing in...",
      demoCredentials: "Demo credentials",
      loginSuccessful: "Login successful",
      welcomeToPortal: "Welcome to the {{role}} portal!",
      loginFailed: "Login failed",
      invalidCredentials: "Invalid credentials. Use 'password' as the password.",
      
      // Navigation
      vendors: "Vendors",
      products: "Products",
      purchaseOrders: "Purchase Orders",
      logout: "Logout",
      
      // Vendors
      vendorName: "Vendor Name",
      vendorEmail: "Email",
      vendorPhone: "Phone",
      vendorAddress: "Address",
      vendorStatus: "Status",
      addVendor: "Add Vendor",
      manageVendors: "Manage your vendor network and relationships",
      
      // Products
      productName: "Product Name",
      category: "Category",
      sku: "SKU",
      totalStock: "Total Stock",
      lowestPrice: "Lowest Price",
      manageProducts: "Manage products across all vendors",
      addProduct: "Add Product",
      
      // Purchase Orders
      orderId: "Order ID",
      orderDate: "Order Date",
      expectedDelivery: "Expected Delivery",
      items: "Items",
      totalAmount: "Total Amount",
      status: "Status",
      actions: "Actions",
      createOrder: "Create Order",
      managePurchaseOrders: "Manage and track purchase orders across vendors",
      
      // Status
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      
      // View modes
      tableView: "Table View",
      cardView: "Card View",
      
      // Currency
      currency: "SAR",
      
      // Time
      joined: "Joined",
      orders: "Orders",
      
      // Vendor Portal
      vendorDashboard: "Vendor Dashboard",
      overviewActivity: "Overview of your orders and business activity",
      pendingOrders: "Pending Orders",
      totalOrders: "Total Orders",
      shippedOrders: "Shipped Orders",
      revenueThisMonth: "Revenue This Month",
      averageOrderValue: "Average Order Value",
      completionRate: "Completion Rate"
    }
  },
  ar: {
    translation: {
      // Common
      search: "بحث",
      filter: "تصفية",
      create: "إنشاء",
      add: "إضافة",
      edit: "تعديل",
      view: "عرض",
      delete: "حذف",
      save: "حفظ",
      cancel: "إلغاء",
      loading: "تحميل",
      dashboard: "لوحة التحكم",
      
      // Authentication
      appName: "بوابة الموردين",
      welcomeBack: "مرحباً بعودتك",
      signInToAccess: "سجل دخولك للوصول إلى البوابة",
      admin: "مدير",
      vendor: "مورد",
      adminPortalAccess: "دخول بوابة المدير",
      vendorPortalAccess: "دخول بوابة المورد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      enterPassword: "أدخل كلمة المرور",
      signIn: "تسجيل الدخول",
      signingIn: "جاري تسجيل الدخول...",
      demoCredentials: "بيانات تجريبية",
      loginSuccessful: "تم تسجيل الدخول بنجاح",
      welcomeToPortal: "مرحباً بك في بوابة {{role}}!",
      loginFailed: "فشل تسجيل الدخول",
      invalidCredentials: "بيانات غير صحيحة. استخدم 'password' ككلمة مرور.",
      
      // Navigation
      vendors: "الموردين",
      products: "المنتجات",
      purchaseOrders: "أوامر الشراء",
      logout: "تسجيل الخروج",
      
      // Vendors
      vendorName: "اسم المورد",
      vendorEmail: "البريد الإلكتروني",
      vendorPhone: "الهاتف",
      vendorAddress: "العنوان",
      vendorStatus: "الحالة",
      addVendor: "إضافة مورد",
      manageVendors: "إدارة شبكة الموردين والعلاقات",
      
      // Products
      productName: "اسم المنتج",
      category: "الفئة",
      sku: "رمز المنتج",
      totalStock: "إجمالي المخزون",
      lowestPrice: "أقل سعر",
      manageProducts: "إدارة المنتجات عبر جميع الموردين",
      addProduct: "إضافة منتج",
      
      // Purchase Orders
      orderId: "رقم الطلب",
      orderDate: "تاريخ الطلب",
      expectedDelivery: "التسليم المتوقع",
      items: "العناصر",
      totalAmount: "المبلغ الإجمالي",
      status: "الحالة",
      actions: "الإجراءات",
      createOrder: "إنشاء طلب",
      managePurchaseOrders: "إدارة وتتبع أوامر الشراء عبر الموردين",
      
      // Status
      active: "نشط",
      inactive: "غير نشط",
      pending: "قيد الانتظار",
      processing: "قيد المعالجة",
      shipped: "تم الشحن",
      delivered: "تم التسليم",
      
      // View modes
      tableView: "عرض الجدول",
      cardView: "عرض البطاقات",
      
      // Currency
      currency: "ريال",
      
      // Time
      joined: "انضم",
      orders: "الطلبات",
      
      // Vendor Portal
      vendorDashboard: "لوحة تحكم المورد",
      overviewActivity: "نظرة عامة على طلباتك ونشاط عملك",
      pendingOrders: "الطلبات المعلقة",
      totalOrders: "إجمالي الطلبات",
      shippedOrders: "الطلبات المشحونة",
      revenueThisMonth: "الإيرادات هذا الشهر",
      averageOrderValue: "متوسط قيمة الطلب",
      completionRate: "معدل الإنجاز"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;