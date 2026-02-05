// Admin Panel TypeScript Types - API-ready structure

export type ProductStatus = 'draft' | 'active' | 'hidden';
export type OrderStatus = 'new' | 'processing' | 'completed' | 'cancelled';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  promotionStartDate?: string;
  promotionEndDate?: string;
  stockQuantity: number;
  status: ProductStatus;
  categoryId: number;
  category?: Category;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercent: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  usageCount: number;
  maxUsage?: number;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  ordersByStatus: {
    new: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  totalRevenue: number;
  totalCategories: number;
}

// API Response types for future REST integration
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types for create/update operations
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  promotionStartDate?: string;
  promotionEndDate?: string;
  stockQuantity: number;
  status: ProductStatus;
  categoryId: number;
  images: File[];
}

export interface CategoryFormData {
  name: string;
  slug: string;
  description?: string;
}

export interface CouponFormData {
  code: string;
  discountPercent: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  maxUsage?: number;
}
