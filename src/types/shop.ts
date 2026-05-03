export type ProductType = 'ebook' | 'book' | 'ecourse';

export type ProductCategory =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'business'
  | 'kids'
  | 'exam-prep';

export type ProductDelivery = 'physical' | 'digital';

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price?: number;
  stock?: number;
  weightGrams?: number;
}

export interface Product {
  id: string;
  type: ProductType;
  category: ProductCategory;
  delivery?: ProductDelivery;
  weightGrams?: number;
  title: string;
  author: string;
  description: string;
  cover: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  stock: number;
  duration?: string;
  pages?: number;
  language: string;
  level?: string;
  tags: string[];
  bestseller?: boolean;
  newRelease?: boolean;
  proDiscountEnabled?: boolean;
  proDiscountPercent?: number;
  lifetimeDiscountEnabled?: boolean;
  lifetimeDiscountPercent?: number;
  variants?: ProductVariant[];
}

export const isPhysicalProduct = (p: Pick<Product, 'delivery' | 'type'>) => {
  if (p.delivery) return p.delivery === 'physical';
  return p.type === 'book';
};

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  address: string;
  notes?: string;
  provinceId?: string;
  cityId?: string;
  districtId?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  cost: number;
  eta: string;
  icon: string;
}

export type PaymentMethodType = 'bank-transfer' | 'va' | 'ewallet' | 'qris' | 'card';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  description: string;
  fee?: number;
  logo?: string;
}
