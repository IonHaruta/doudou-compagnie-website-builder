/**
 * Public catalog API – products and categories from Django backend.
 * Used by the shop/magazin so it shows the same data as the admin panel / database.
 */

const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, '');

export interface CatalogProductResponse {
  id: number;
  category: number;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  is_active: boolean;
  images: { id: number; image: string; alt_text: string; is_main: boolean }[];
  created_at: string;
  updated_at: string;
}

export interface ShopProductFromApi {
  id: number;
  name: string;
  nameKey: string;
  descriptionKey: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: 'bestseller' | 'new' | 'sale';
  stock: 'in-stock' | 'limited' | 'out-of-stock';
  collection: string;
  ageRange: string;
  color: string;
  gender: 'boy' | 'girl' | 'unisex';
}

function imageUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = path.startsWith('/') ? '' : '/media/';
  return `${BACKEND_ORIGIN}${base}${path}`;
}

/**
 * Fetches active products from the backend. Used by the shop page.
 * If the backend is unavailable or returns an error, return empty array (caller can fallback to static data).
 */
export async function getCatalogProducts(): Promise<ShopProductFromApi[]> {
  try {
    const res = await fetch(`${API_BASE}/catalog/products/`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return [];

    const list = Array.isArray(data) ? data : data.results || [];
    return list.map((p: CatalogProductResponse) => {
      const firstImage = p.images?.[0];
      const price = typeof p.price === 'string' ? parseFloat(p.price) : Number(p.price);
      const stockNum = Number(p.stock) || 0;
      const stock: 'in-stock' | 'limited' | 'out-of-stock' =
        stockNum === 0 ? 'out-of-stock' : stockNum < 5 ? 'limited' : 'in-stock';

      return {
        id: p.id,
        name: p.name,
        nameKey: '',
        descriptionKey: '',
        description: p.description,
        price,
        image: firstImage ? imageUrl(firstImage.image) : '',
        stock,
        collection: p.category_name || p.slug || '',
        ageRange: '0-6',
        color: '',
        gender: 'unisex' as const,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Fetches a single product by id. Used by the product detail page.
 */
export async function getCatalogProduct(id: number): Promise<ShopProductFromApi | null> {
  try {
    const res = await fetch(`${API_BASE}/catalog/products/${id}/`);
    const p: CatalogProductResponse = await res.json().catch(() => null);
    if (!res.ok || !p) return null;

    const firstImage = p.images?.[0];
    const price = typeof p.price === 'string' ? parseFloat(p.price) : Number(p.price);
    const stockNum = Number(p.stock) || 0;
    const stock: 'in-stock' | 'limited' | 'out-of-stock' =
      stockNum === 0 ? 'out-of-stock' : stockNum < 5 ? 'limited' : 'in-stock';

    return {
      id: p.id,
      name: p.name,
      nameKey: '',
      descriptionKey: '',
      description: p.description,
      price,
      image: firstImage ? imageUrl(firstImage.image) : '',
      stock,
      collection: p.category_name || p.slug || '',
      ageRange: '0-6',
      color: '',
      gender: 'unisex',
    };
  } catch {
    return null;
  }
}
