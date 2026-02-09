// Admin Panel API – login and dashboard use Django backend; rest can use mocks until wired

import {
  AdminProduct,
  Category,
  Order,
  Coupon,
  DashboardStats,
  ProductStatus,
  OrderStatus,
  ApiResponse,
  ProductFormData,
  CategoryFormData,
  CouponFormData,
  ProductImage,
} from '@/types/admin';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Django backend base URL (no trailing slash)
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const ADMIN_TOKEN_KEY = 'admin_token';

function getAuthHeaders(): HeadersInit {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem(ADMIN_TOKEN_KEY) : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
}

// ============ MOCK DATA ============

const mockCategories: Category[] = [
  { id: 1, name: 'Jucării de Pluș', slug: 'jucarii-plus', description: 'Jucării moi și pufoase', productCount: 12, createdAt: '2024-01-01', updatedAt: '2024-01-15' },
  { id: 2, name: 'Pături', slug: 'paturi', description: 'Pături pentru bebeluși', productCount: 8, createdAt: '2024-01-02', updatedAt: '2024-01-16' },
  { id: 3, name: 'Cadouri', slug: 'cadouri', description: 'Seturi cadou speciale', productCount: 5, createdAt: '2024-01-03', updatedAt: '2024-01-17' },
  { id: 4, name: 'Organic', slug: 'organic', description: 'Produse din materiale organice', productCount: 6, createdAt: '2024-01-04', updatedAt: '2024-01-18' },
];

const mockProducts: AdminProduct[] = [
  {
    id: 1,
    name: 'Ursuleț Maro Catifelat',
    description: 'Un ursuleț adorabil, perfect pentru somn și joacă.',
    price: 45.00,
    promotionalPrice: 39.00,
    promotionStartDate: '2024-01-20',
    promotionEndDate: '2024-02-20',
    stockQuantity: 25,
    status: 'active',
    categoryId: 1,
    images: [{ id: 1, url: '/src/assets/product-bear.jpg', alt: 'Ursuleț Maro', isPrimary: true }],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20',
  },
  {
    id: 2,
    name: 'Iepuraș Roz Puffy',
    description: 'Iepuraș de pluș cu urechi lungi și blană moale.',
    price: 52.00,
    stockQuantity: 18,
    status: 'active',
    categoryId: 1,
    images: [{ id: 2, url: '/src/assets/product-bunny.jpg', alt: 'Iepuraș Roz', isPrimary: true }],
    createdAt: '2024-01-11',
    updatedAt: '2024-01-21',
  },
  {
    id: 3,
    name: 'Cerb Nordic Elegant',
    description: 'Cerb de pluș cu design scandinav minimalist.',
    price: 58.00,
    stockQuantity: 12,
    status: 'active',
    categoryId: 1,
    images: [{ id: 3, url: '/src/assets/product-deer.jpg', alt: 'Cerb Nordic', isPrimary: true }],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-22',
  },
  {
    id: 4,
    name: 'Elefant Gri Moale',
    description: 'Elefant de pluș cu urechi mari și trompa adorabilă.',
    price: 48.00,
    stockQuantity: 0,
    status: 'hidden',
    categoryId: 1,
    images: [{ id: 4, url: '/src/assets/product-elephant.jpg', alt: 'Elefant Gri', isPrimary: true }],
    createdAt: '2024-01-13',
    updatedAt: '2024-01-23',
  },
  {
    id: 5,
    name: 'Pătură Crem cu Stele',
    description: 'Pătură moale din bumbac organic cu model de stele.',
    price: 65.00,
    promotionalPrice: 55.00,
    promotionStartDate: '2024-01-15',
    promotionEndDate: '2024-02-15',
    stockQuantity: 30,
    status: 'active',
    categoryId: 2,
    images: [{ id: 5, url: '/src/assets/collection-clair-lune.jpg', alt: 'Pătură Crem', isPrimary: true }],
    createdAt: '2024-01-14',
    updatedAt: '2024-01-24',
  },
  {
    id: 6,
    name: 'Lup Cenușiu Prietenos',
    description: 'Lup de pluș cu expresie prietenoasă și blană moale.',
    price: 55.00,
    stockQuantity: 8,
    status: 'draft',
    categoryId: 1,
    images: [{ id: 6, url: '/src/assets/product-wolf.jpg', alt: 'Lup Cenușiu', isPrimary: true }],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-25',
  },
];

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 'ORD-2024-001',
    customer: {
      id: 1,
      firstName: 'Maria',
      lastName: 'Popescu',
      email: 'maria.popescu@email.com',
      phone: '+40 721 234 567',
      address: 'Str. Florilor 12',
      city: 'București',
      postalCode: '010101',
      country: 'România',
    },
    items: [
      { id: 1, productId: 1, productName: 'Ursuleț Maro Catifelat', productImage: '/src/assets/product-bear.jpg', quantity: 2, unitPrice: 39.00, totalPrice: 78.00 },
      { id: 2, productId: 3, productName: 'Cerb Nordic Elegant', productImage: '/src/assets/product-deer.jpg', quantity: 1, unitPrice: 58.00, totalPrice: 58.00 },
    ],
    subtotal: 136.00,
    discount: 0,
    total: 136.00,
    status: 'new',
    createdAt: '2024-01-25T10:30:00',
    updatedAt: '2024-01-25T10:30:00',
  },
  {
    id: 2,
    orderNumber: 'ORD-2024-002',
    customer: {
      id: 2,
      firstName: 'Ion',
      lastName: 'Ionescu',
      email: 'ion.ionescu@email.com',
      phone: '+40 722 345 678',
      address: 'Bd. Unirii 45',
      city: 'Cluj-Napoca',
      postalCode: '400001',
      country: 'România',
    },
    items: [
      { id: 3, productId: 2, productName: 'Iepuraș Roz Puffy', productImage: '/src/assets/product-bunny.jpg', quantity: 1, unitPrice: 52.00, totalPrice: 52.00 },
    ],
    subtotal: 52.00,
    discount: 5.20,
    total: 46.80,
    status: 'processing',
    couponCode: 'WELCOME10',
    createdAt: '2024-01-24T14:15:00',
    updatedAt: '2024-01-25T09:00:00',
  },
  {
    id: 3,
    orderNumber: 'ORD-2024-003',
    customer: {
      id: 3,
      firstName: 'Elena',
      lastName: 'Vasilescu',
      email: 'elena.v@email.com',
      address: 'Str. Primăverii 8',
      city: 'Timișoara',
      postalCode: '300001',
      country: 'România',
    },
    items: [
      { id: 4, productId: 5, productName: 'Pătură Crem cu Stele', productImage: '/src/assets/collection-clair-lune.jpg', quantity: 2, unitPrice: 55.00, totalPrice: 110.00 },
    ],
    subtotal: 110.00,
    discount: 0,
    total: 110.00,
    status: 'completed',
    createdAt: '2024-01-20T16:45:00',
    updatedAt: '2024-01-23T11:00:00',
  },
  {
    id: 4,
    orderNumber: 'ORD-2024-004',
    customer: {
      id: 4,
      firstName: 'Andrei',
      lastName: 'Munteanu',
      email: 'andrei.m@email.com',
      address: 'Aleea Rozelor 3',
      city: 'Iași',
      postalCode: '700001',
      country: 'România',
    },
    items: [
      { id: 5, productId: 1, productName: 'Ursuleț Maro Catifelat', productImage: '/src/assets/product-bear.jpg', quantity: 1, unitPrice: 39.00, totalPrice: 39.00 },
    ],
    subtotal: 39.00,
    discount: 0,
    total: 39.00,
    status: 'new',
    createdAt: '2024-01-25T08:00:00',
    updatedAt: '2024-01-25T08:00:00',
  },
];

const mockCoupons: Coupon[] = [
  { id: 1, code: 'WELCOME10', discountPercent: 10, validFrom: '2024-01-01', validTo: '2024-12-31', isActive: true, usageCount: 45, maxUsage: 100, createdAt: '2024-01-01' },
  { id: 2, code: 'SPRING20', discountPercent: 20, validFrom: '2024-03-01', validTo: '2024-05-31', isActive: true, usageCount: 0, maxUsage: 50, createdAt: '2024-02-15' },
  { id: 3, code: 'VIP15', discountPercent: 15, validFrom: '2024-01-01', validTo: '2024-06-30', isActive: false, usageCount: 23, createdAt: '2024-01-01' },
];

// Mock dashboard stats (fallback when backend is unavailable)
const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  totalOrders: mockOrders.length,
  totalRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
  activeCategories: mockCategories.length,
  pendingOrders: mockOrders.filter(o => o.status === 'new').length,
  completedOrders: mockOrders.filter(o => o.status === 'completed').length,
};

// ============ API FUNCTIONS ============

// Dashboard – real API (Django) with mock fallback
export async function fetchDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  try {
    // Add timeout for faster fallback on GitHub Pages
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const res = await fetch(`${API_BASE_URL}/auth/dashboard-stats/`, {
      method: 'GET',
      headers: getAuthHeaders(),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Fallback to mock data if backend fails
      console.warn('Backend unavailable, using mock dashboard data');
      return { data: mockDashboardStats, success: true };
    }
    return { data: data as DashboardStats, success: true };
  } catch (e) {
    // Fallback to mock data if network error or timeout
    console.warn('Backend unavailable, using mock dashboard data');
    return { data: mockDashboardStats, success: true };
  }
}

// Products
export async function fetchProducts(): Promise<ApiResponse<AdminProduct[]>> {
  await delay(300);
  const productsWithCategories = mockProducts.map(p => ({
    ...p,
    category: mockCategories.find(c => c.id === p.categoryId),
  }));
  return { data: productsWithCategories, success: true };
}

export async function fetchProduct(id: number): Promise<ApiResponse<AdminProduct>> {
  await delay(200);
  const product = mockProducts.find(p => p.id === id);
  if (!product) {
    return { data: null as any, success: false, message: 'Product not found' };
  }
  return { data: { ...product, category: mockCategories.find(c => c.id === product.categoryId) }, success: true };
}

export async function createProduct(data: Omit<ProductFormData, 'images'> & { images?: ProductImage[] }): Promise<ApiResponse<AdminProduct>> {
  await delay(400);
  const newProduct: AdminProduct = {
    id: Math.max(...mockProducts.map(p => p.id)) + 1,
    name: data.name,
    description: data.description,
    price: data.price,
    promotionalPrice: data.promotionalPrice,
    promotionStartDate: data.promotionStartDate,
    promotionEndDate: data.promotionEndDate,
    stockQuantity: data.stockQuantity,
    status: data.status,
    categoryId: data.categoryId,
    images: data.images || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return { data: newProduct, success: true, message: 'Product created successfully' };
}

export async function updateProduct(id: number, data: Partial<Omit<ProductFormData, 'images'>>): Promise<ApiResponse<AdminProduct>> {
  await delay(400);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) {
    return { data: null as any, success: false, message: 'Product not found' };
  }
  mockProducts[index] = { ...mockProducts[index], ...data, updatedAt: new Date().toISOString() };
  return { data: mockProducts[index], success: true, message: 'Product updated successfully' };
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  await delay(300);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) {
    return { data: null, success: false, message: 'Product not found' };
  }
  mockProducts.splice(index, 1);
  return { data: null, success: true, message: 'Product deleted successfully' };
}

export async function toggleProductStatus(id: number, status: ProductStatus): Promise<ApiResponse<AdminProduct>> {
  return updateProduct(id, { status });
}

// Categories
export async function fetchCategories(): Promise<ApiResponse<Category[]>> {
  await delay(200);
  return { data: mockCategories, success: true };
}

export async function createCategory(data: CategoryFormData): Promise<ApiResponse<Category>> {
  await delay(300);
  const newCategory: Category = {
    id: Math.max(...mockCategories.map(c => c.id)) + 1,
    name: data.name,
    slug: data.slug,
    description: data.description,
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockCategories.push(newCategory);
  return { data: newCategory, success: true, message: 'Category created successfully' };
}

export async function updateCategory(id: number, data: Partial<CategoryFormData>): Promise<ApiResponse<Category>> {
  await delay(300);
  const index = mockCategories.findIndex(c => c.id === id);
  if (index === -1) {
    return { data: null as any, success: false, message: 'Category not found' };
  }
  mockCategories[index] = { ...mockCategories[index], ...data, updatedAt: new Date().toISOString() };
  return { data: mockCategories[index], success: true, message: 'Category updated successfully' };
}

export async function deleteCategory(id: number): Promise<ApiResponse<null>> {
  await delay(300);
  const index = mockCategories.findIndex(c => c.id === id);
  if (index === -1) {
    return { data: null, success: false, message: 'Category not found' };
  }
  mockCategories.splice(index, 1);
  return { data: null, success: true, message: 'Category deleted successfully' };
}

// Map backend status (PENDING, etc.) to frontend (new, etc.)
const backendToFrontendStatus: Record<string, OrderStatus> = {
  PENDING: 'new',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};
const frontendToBackendStatus: Record<OrderStatus, string> = {
  new: 'PENDING',
  processing: 'PROCESSING',
  completed: 'COMPLETED',
  cancelled: 'CANCELLED',
};

function mapBackendOrderToFrontend(backend: any): Order {
  const parts = (backend.guest_name || backend.user_username || '').trim().split(/\s+/);
  const firstName = parts[0] || '';
  const lastName = parts.slice(1).join(' ') || (backend.guest_email ? '-' : '-');
  return {
    id: backend.id,
    orderNumber: `ORD-${new Date(backend.created_at).getFullYear()}-${String(backend.id).padStart(3, '0')}`,
    customer: {
      id: backend.user || 0,
      firstName,
      lastName,
      email: backend.guest_email || backend.user_username || '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    items: (backend.items || []).map((item: any) => ({
      id: item.id,
      productId: item.product,
      productName: item.product_name || '',
      productImage: '',
      quantity: item.quantity,
      unitPrice: Number(item.price_at_purchase),
      totalPrice: Number(item.total ?? item.quantity * item.price_at_purchase),
    })),
    subtotal: Number(backend.total),
    discount: 0,
    total: Number(backend.total),
    status: backendToFrontendStatus[backend.status] ?? 'new',
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  };
}

// Orders – real API (Django) with mock fallback
export async function fetchOrders(): Promise<ApiResponse<Order[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`, { headers: getAuthHeaders() });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Fallback to mock data if backend fails
      console.warn('Backend unavailable, using mock orders data');
      return { data: mockOrders, success: true };
    }
    const list = Array.isArray(data) ? data : data.results || [];
    return { data: list.map(mapBackendOrderToFrontend), success: true };
  } catch (e) {
    // Fallback to mock data if network error
    console.warn('Backend unavailable, using mock orders data');
    return { data: mockOrders, success: true };
  }
}

export async function fetchOrder(id: number): Promise<ApiResponse<Order>> {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/`, { headers: getAuthHeaders() });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Fallback to mock data if backend fails
      const mockOrder = mockOrders.find(o => o.id === id);
      if (mockOrder) {
        console.warn('Backend unavailable, using mock order data');
        return { data: mockOrder, success: true };
      }
      return { data: null as any, success: false, message: data.detail || 'Order not found' };
    }
    return { data: mapBackendOrderToFrontend(data), success: true };
  } catch (e) {
    // Fallback to mock data if network error
    const mockOrder = mockOrders.find(o => o.id === id);
    if (mockOrder) {
      console.warn('Backend unavailable, using mock order data');
      return { data: mockOrder, success: true };
    }
    return { data: null as any, success: false, message: 'Network error' };
  }
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<ApiResponse<Order>> {
  try {
    const backendStatus = frontendToBackendStatus[status];
    const res = await fetch(`${API_BASE_URL}/orders/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status: backendStatus }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { data: null as any, success: false, message: data.detail || 'Update failed' };
    }
    return { data: mapBackendOrderToFrontend(data), success: true, message: 'Order status updated successfully' };
  } catch (e) {
    return { data: null as any, success: false, message: 'Network error' };
  }
}

// Coupons
export async function fetchCoupons(): Promise<ApiResponse<Coupon[]>> {
  await delay(200);
  return { data: mockCoupons, success: true };
}

export async function createCoupon(data: CouponFormData): Promise<ApiResponse<Coupon>> {
  await delay(300);
  const newCoupon: Coupon = {
    id: Math.max(...mockCoupons.map(c => c.id)) + 1,
    code: data.code.toUpperCase(),
    discountPercent: data.discountPercent,
    validFrom: data.validFrom,
    validTo: data.validTo,
    isActive: data.isActive,
    usageCount: 0,
    maxUsage: data.maxUsage,
    createdAt: new Date().toISOString(),
  };
  mockCoupons.push(newCoupon);
  return { data: newCoupon, success: true, message: 'Coupon created successfully' };
}

export async function updateCoupon(id: number, data: Partial<CouponFormData>): Promise<ApiResponse<Coupon>> {
  await delay(300);
  const index = mockCoupons.findIndex(c => c.id === id);
  if (index === -1) {
    return { data: null as any, success: false, message: 'Coupon not found' };
  }
  mockCoupons[index] = { ...mockCoupons[index], ...data };
  return { data: mockCoupons[index], success: true, message: 'Coupon updated successfully' };
}

export async function deleteCoupon(id: number): Promise<ApiResponse<null>> {
  await delay(300);
  const index = mockCoupons.findIndex(c => c.id === id);
  if (index === -1) {
    return { data: null, success: false, message: 'Coupon not found' };
  }
  mockCoupons.splice(index, 1);
  return { data: null, success: true, message: 'Coupon deleted successfully' };
}

// Auth – real API (Django) with mock fallback for demo
export async function adminLogin(email: string, password: string): Promise<ApiResponse<{ token: string; user: { email: string; role: string } }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // Fallback to mock login if backend fails (for demo purposes)
      if (email === 'admin@doudou.com' && password === 'admin123') {
        console.warn('Backend unavailable, using mock login for demo');
        return {
          data: {
            token: 'mock-token-demo-' + Date.now(),
            user: { email: 'admin@doudou.com', role: 'ADMIN' },
          },
          success: true,
        };
      }
      const message = data.detail || (res.status === 401 ? 'Invalid email or password' : 'Login failed');
      return { data: null as any, success: false, message };
    }
    return { data: { token: data.token, user: data.user }, success: true };
  } catch (e) {
    // Fallback to mock login if network error (for demo purposes)
    if (email === 'admin@doudou.com' && password === 'admin123') {
      console.warn('Backend unavailable, using mock login for demo');
      return {
        data: {
          token: 'mock-token-demo-' + Date.now(),
          user: { email: 'admin@doudou.com', role: 'ADMIN' },
        },
        success: true,
      };
    }
    return { data: null as any, success: false, message: 'Network error. Is the backend running on port 8000?' };
  }
}

export async function adminLogout(): Promise<ApiResponse<null>> {
  await delay(200);
  return { data: null, success: true };
}
