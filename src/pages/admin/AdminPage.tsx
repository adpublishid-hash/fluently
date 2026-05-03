import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Boxes, CheckCircle2, Crown, MapPin, Package, RefreshCw, Settings as SettingsIcon, Shield, ShoppingBag, UserCog, Users } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import { useAuth } from '../../auth/AuthContext';
import { formatRupiah } from '../../data/shopData';
import type { ProductVariant } from '../../types/shop';

type AdminSummary = {
  users: number;
  proUsers: number;
  products: number;
  orders: number;
  paidRevenue: number;
};

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'pro' | 'lifetime';
  status: 'active' | 'suspended';
  planExpiresAt?: string | null;
  createdAt?: string;
  lastLoginAt?: string | null;
};

type AdminProduct = {
  id: string;
  title: string;
  author: string;
  type: string;
  category: string;
  delivery?: 'physical' | 'digital';
  weightGrams?: number;
  description?: string;
  cover?: string;
  price: number;
  originalPrice?: number;
  stock: number;
  duration?: string;
  pages?: number;
  language?: string;
  level?: string;
  tags?: string[];
  bestseller?: boolean;
  newRelease?: boolean;
  proDiscountEnabled?: boolean;
  proDiscountPercent?: number;
  lifetimeDiscountEnabled?: boolean;
  lifetimeDiscountPercent?: number;
  variants?: ProductVariant[];
  active: boolean;
};

type AdminShopSettings = {
  origin: {
    destinationId?: number | string;
    label?: string;
    province?: string;
    city?: string;
    district?: string;
    subdistrict?: string;
    zipCode?: string;
  };
  sender: {
    name: string;
    phone: string;
    address?: string;
  };
  defaultWeightGrams?: number;
  couriers?: string[];
  notifyAdminEmail?: string;
  notifyAdminWhatsApp?: string;
};

type AdminDestinationRow = {
  id: number;
  label: string;
  province_name: string;
  city_name: string;
  district_name: string;
  subdistrict_name: string;
  zip_code: string;
};

type AdminOrder = {
  id: string;
  customer_email: string;
  customer_name: string;
  status: string;
  payment_status: string;
  total: number;
  items: Array<{ title?: string; productId?: string; quantity?: number }>;
  created_at: string;
};

const emptyProduct = {
  id: '',
  title: '',
  author: '',
  type: 'ebook',
  category: 'beginner',
  delivery: 'digital' as 'physical' | 'digital',
  weightGrams: 500,
  price: 0,
  stock: 999,
  originalPrice: 0,
  description: '',
  cover: '',
  language: 'EN / ID',
  duration: '',
  pages: 0,
  level: '',
  tags: '',
  bestseller: false,
  newRelease: false,
  proDiscountEnabled: false,
  proDiscountPercent: 10,
  lifetimeDiscountEnabled: false,
  lifetimeDiscountPercent: 20,
  variants: [] as ProductVariant[],
  active: true,
};

const normalizePercent = (value: number | string | undefined) => {
  const next = Number(value || 0);
  if (!Number.isFinite(next)) return 0;
  return Math.max(0, Math.min(100, Math.round(next)));
};

const normalizeVariants = (variants?: ProductVariant[]) =>
  (variants || [])
    .map((variant) => ({
      id: String(variant.id || '').trim(),
      name: String(variant.name || '').trim(),
      sku: variant.sku ? String(variant.sku).trim() : undefined,
      price: Number(variant.price || 0) || undefined,
      stock: Number(variant.stock || 0) || undefined,
      weightGrams: Number(variant.weightGrams || 0) || undefined,
    }))
    .filter((variant) => variant.id && variant.name);

function adminHeaders(token: string | null) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function AdminField({ label, className = '', children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.14em] text-gray-400">{label}</span>
      {children}
    </label>
  );
}

function ProductVariantEditor({
  variants,
  onAdd,
  onRemove,
  onChange,
}: {
  variants: ProductVariant[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, patch: Partial<ProductVariant>) => void;
}) {
  return (
    <div className="md:col-span-4 rounded-[8px] border border-[#CBD5E1] bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-black text-[#0F172A]">Product Variations</h3>
          <p className="text-[11px] font-semibold text-gray-500">Contoh: Size S/M/L, Basic/Premium, PDF/Printed.</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="h-9 rounded-[6px] bg-[#E0F2FE] px-3 text-xs font-black text-[#0369A1]"
        >
          Add Variant
        </button>
      </div>

      {variants.length === 0 ? (
        <p className="mt-3 rounded-[6px] bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
          Tidak ada variasi. Produk akan dijual sebagai satu pilihan.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {variants.map((variant, index) => (
            <div key={index} className="grid gap-2 rounded-[6px] border border-gray-200 bg-[#F8FAFC] p-2 md:grid-cols-[1fr_1.3fr_1fr_1fr_1fr_1fr_auto]">
              <input
                value={variant.id}
                onChange={(event) => onChange(index, { id: event.target.value })}
                placeholder="id"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <input
                value={variant.name}
                onChange={(event) => onChange(index, { name: event.target.value })}
                placeholder="Nama variasi"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <input
                value={variant.sku || ''}
                onChange={(event) => onChange(index, { sku: event.target.value })}
                placeholder="SKU"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <input
                type="number"
                value={variant.price || 0}
                onChange={(event) => onChange(index, { price: Number(event.target.value) })}
                placeholder="Harga"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <input
                type="number"
                value={variant.stock || 0}
                onChange={(event) => onChange(index, { stock: Number(event.target.value) })}
                placeholder="Stok"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <input
                type="number"
                value={variant.weightGrams || 0}
                onChange={(event) => onChange(index, { weightGrams: Number(event.target.value) })}
                placeholder="Gram"
                className="h-9 rounded-[6px] border border-[#CBD5E1] px-2 text-xs font-semibold"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="h-9 rounded-[6px] bg-red-50 px-3 text-xs font-black text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { user, token } = useAuth();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'orders' | 'settings'>('users');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | number | null>(null);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productDraft, setProductDraft] = useState<Record<string, AdminProduct>>({});
  const [settings, setSettings] = useState<AdminShopSettings | null>(null);
  const [settingsBusy, setSettingsBusy] = useState(false);
  const [settingsSearchKeyword, setSettingsSearchKeyword] = useState('');
  const [settingsSearchResults, setSettingsSearchResults] = useState<AdminDestinationRow[]>([]);
  const [settingsSearchLoading, setSettingsSearchLoading] = useState(false);

  const isAdmin = user?.role === 'admin';

  const fetchAdmin = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const headers = adminHeaders(token);
      const [summaryRes, usersRes, productsRes, ordersRes, settingsRes] = await Promise.all([
        fetch('/api/admin/summary', { headers }),
        fetch('/api/admin/users', { headers }),
        fetch('/api/admin/shop/products', { headers }),
        fetch('/api/admin/shop/orders', { headers }),
        fetch('/api/admin/shop/settings', { headers }),
      ]);

      if (!summaryRes.ok || !usersRes.ok || !productsRes.ok || !ordersRes.ok) {
        throw new Error('Admin data gagal dimuat');
      }

      const [summaryData, usersData, productsData, ordersData, settingsData] = await Promise.all([
        summaryRes.json(),
        usersRes.json(),
        productsRes.json(),
        ordersRes.json(),
        settingsRes.ok ? settingsRes.json() : Promise.resolve({ settings: null }),
      ]);

      setSummary(summaryData);
      setUsers(usersData.users ?? []);
      setProducts(productsData.products ?? []);
      setOrders(ordersData.orders ?? []);
      setSettings(settingsData.settings ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Admin data gagal dimuat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const filteredOrders = useMemo(() => orders.slice(0, 50), [orders]);

  if (!isAdmin) {
    return <Navigate to="/modul" replace />;
  }

  const updateUser = async (target: AdminUser, patch: Partial<AdminUser>) => {
    if (!user) return;
    setSavingId(target.id);
    try {
      const next = { ...target, ...patch };
      const res = await fetch(`/api/admin/users/${target.id}`, {
        method: 'PATCH',
        headers: adminHeaders(token),
        body: JSON.stringify(next),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update user gagal');
      setUsers((current) => current.map((item) => item.id === target.id ? data.user : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update user gagal');
    } finally {
      setSavingId(null);
    }
  };

  const updateProduct = async (product: AdminProduct, patch: Partial<AdminProduct>) => {
    if (!user) return;
    setSavingId(product.id);
    try {
      const res = await fetch(`/api/admin/shop/products/${product.id}`, {
        method: 'PATCH',
        headers: adminHeaders(token),
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update produk gagal');
      setProducts((current) => current.map((item) => item.id === product.id ? data.product : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update produk gagal');
    } finally {
      setSavingId(null);
    }
  };

  const startEditProduct = (product: AdminProduct) => {
    setEditingProductId(product.id);
    setProductDraft((current) => ({ ...current, [product.id]: { ...product } }));
  };

  const updateProductDraft = (productId: string, patch: Partial<AdminProduct>) => {
    setProductDraft((current) => ({
      ...current,
      [productId]: { ...current[productId], ...patch },
    }));
  };

  const updateNewProductVariant = (index: number, patch: Partial<ProductVariant>) => {
    setNewProduct((current) => {
      const variants = [...(current.variants || [])];
      variants[index] = { ...variants[index], ...patch };
      return { ...current, variants };
    });
  };

  const addNewProductVariant = () => {
    setNewProduct((current) => ({
      ...current,
      variants: [
        ...(current.variants || []),
        { id: `variant-${(current.variants || []).length + 1}`, name: '', price: current.price || undefined, stock: current.stock || undefined },
      ],
    }));
  };

  const removeNewProductVariant = (index: number) => {
    setNewProduct((current) => ({
      ...current,
      variants: (current.variants || []).filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const updateDraftVariant = (productId: string, index: number, patch: Partial<ProductVariant>) => {
    setProductDraft((current) => {
      const draft = current[productId];
      if (!draft) return current;
      const variants = [...(draft.variants || [])];
      variants[index] = { ...variants[index], ...patch };
      return { ...current, [productId]: { ...draft, variants } };
    });
  };

  const addDraftVariant = (productId: string) => {
    setProductDraft((current) => {
      const draft = current[productId];
      if (!draft) return current;
      const variants = [
        ...(draft.variants || []),
        { id: `variant-${(draft.variants || []).length + 1}`, name: '', price: draft.price || undefined, stock: draft.stock || undefined },
      ];
      return { ...current, [productId]: { ...draft, variants } };
    });
  };

  const removeDraftVariant = (productId: string, index: number) => {
    setProductDraft((current) => {
      const draft = current[productId];
      if (!draft) return current;
      return {
        ...current,
        [productId]: { ...draft, variants: (draft.variants || []).filter((_, itemIndex) => itemIndex !== index) },
      };
    });
  };

  const saveProductDraft = async (product: AdminProduct) => {
    const draft = productDraft[product.id];
    if (!draft) return;
    await updateProduct(product, {
      ...draft,
      price: Number(draft.price || 0),
      originalPrice: Number(draft.originalPrice || 0) || undefined,
      stock: Number(draft.stock || 0),
      pages: Number(draft.pages || 0) || undefined,
      duration: draft.duration || undefined,
      delivery: draft.delivery === 'physical' ? 'physical' : 'digital',
      weightGrams: Number(draft.weightGrams || 0) || undefined,
      proDiscountEnabled: Boolean(draft.proDiscountEnabled),
      proDiscountPercent: normalizePercent(draft.proDiscountPercent),
      lifetimeDiscountEnabled: Boolean(draft.lifetimeDiscountEnabled),
      lifetimeDiscountPercent: normalizePercent(draft.lifetimeDiscountPercent),
      variants: normalizeVariants(draft.variants),
      tags: Array.isArray(draft.tags)
        ? draft.tags
        : String(draft.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
    });
    setEditingProductId(null);
  };

  const createProduct = async () => {
    if (!user || !newProduct.id || !newProduct.title) return;
    setSavingId('new-product');
    try {
      const res = await fetch('/api/admin/shop/products', {
        method: 'POST',
        headers: adminHeaders(token),
        body: JSON.stringify({
          ...newProduct,
          description: newProduct.description || 'Admin-created product',
          cover: newProduct.cover || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=70&auto=format',
          originalPrice: Number(newProduct.originalPrice || 0) || undefined,
          delivery: newProduct.delivery === 'physical' ? 'physical' : 'digital',
          weightGrams: Number(newProduct.weightGrams || 0) || undefined,
          proDiscountEnabled: Boolean(newProduct.proDiscountEnabled),
          proDiscountPercent: normalizePercent(newProduct.proDiscountPercent),
          lifetimeDiscountEnabled: Boolean(newProduct.lifetimeDiscountEnabled),
          lifetimeDiscountPercent: normalizePercent(newProduct.lifetimeDiscountPercent),
          rating: 4.8,
          reviewCount: 0,
          language: newProduct.language || 'EN / ID',
          level: newProduct.level || undefined,
          pages: Number(newProduct.pages || 0) || undefined,
          duration: newProduct.duration || undefined,
          variants: normalizeVariants(newProduct.variants),
          tags: String(newProduct.tags || 'Admin').split(',').map((tag) => tag.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Tambah produk gagal');
      setProducts((current) => [data.product, ...current.filter((item) => item.id !== data.product.id)]);
      setNewProduct(emptyProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Tambah produk gagal');
    } finally {
      setSavingId(null);
    }
  };

  const saveSettings = async (next: AdminShopSettings) => {
    if (!user) return;
    setSettingsBusy(true);
    try {
      const res = await fetch('/api/admin/shop/settings', {
        method: 'PUT',
        headers: adminHeaders(token),
        body: JSON.stringify(next),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update settings gagal');
      setSettings(data.settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update settings gagal');
    } finally {
      setSettingsBusy(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'settings') return;
    const keyword = settingsSearchKeyword.trim();
    if (keyword.length < 3) { setSettingsSearchResults([]); return; }
    const handle = setTimeout(async () => {
      setSettingsSearchLoading(true);
      try {
        const res = await fetch(`/api/shop/rajaongkir/search?keyword=${encodeURIComponent(keyword)}`);
        const data = await res.json();
        if (res.ok) setSettingsSearchResults(data.results || []);
      } catch { /* ignore */ }
      finally { setSettingsSearchLoading(false); }
    }, 280);
    return () => clearTimeout(handle);
  }, [settingsSearchKeyword, activeTab]);

  const updateOrder = async (order: AdminOrder, patch: { status?: string; paymentStatus?: string }) => {
    if (!user) return;
    setSavingId(order.id);
    try {
      const res = await fetch(`/api/admin/shop/orders/${order.id}`, {
        method: 'PATCH',
        headers: adminHeaders(token),
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update order gagal');
      setOrders((current) => current.map((item) => item.id === order.id ? data.order : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update order gagal');
    } finally {
      setSavingId(null);
    }
  };

  return (
    <PageContainer>
      <div className="px-5 pb-28 pt-6 md:px-0 md:pb-8 md:pt-0">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded bg-[#E0F2FE] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#0891B2]">
              <Shield size={13} />
              Admin Console
            </span>
            <h1 className="mt-3 text-2xl font-black text-[#0F172A]">Backend Admin</h1>
            <p className="mt-1 text-sm font-semibold text-gray-500">User management, subscription plan, products, and shop orders.</p>
          </div>
          <button
            type="button"
            onClick={fetchAdmin}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-4 text-sm font-black text-[#0F172A] transition hover:bg-gray-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <div className="mb-5 grid gap-3 md:grid-cols-5">
          {[
            { label: 'Users', value: summary?.users ?? 0, icon: Users },
            { label: 'Paid Users', value: summary?.proUsers ?? 0, icon: Crown },
            { label: 'Products', value: summary?.products ?? 0, icon: Boxes },
            { label: 'Orders', value: summary?.orders ?? 0, icon: Package },
            { label: 'Paid Revenue', value: formatRupiah(summary?.paidRevenue ?? 0), icon: ShoppingBag },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[8px] border border-[#CBD5E1] bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">{item.label}</p>
                    <p className="mt-1 text-lg font-black text-[#0F172A]">{item.value}</p>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#E0F2FE] text-[#0891B2]">
                    <Icon size={17} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto">
          {[
            { id: 'users', label: 'Users', icon: UserCog },
            { id: 'products', label: 'Products', icon: Boxes },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'settings', label: 'Shop Settings', icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex h-10 items-center gap-2 rounded-[6px] border px-4 text-sm font-black transition ${
                  active ? 'border-[#0891B2] bg-[#E0F2FE] text-[#075985]' : 'border-[#CBD5E1] bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-8 text-center text-sm font-bold text-gray-500">Loading admin data...</div>
        ) : (
          <>
            {activeTab === 'users' && (
              <section className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
                <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
                  <h2 className="text-sm font-black text-[#0F172A]">User Management</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-white text-[10px] font-black uppercase tracking-[0.12em] text-gray-400">
                      <tr>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Plan</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Last Login</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <p className="font-black text-[#0F172A]">{item.name}</p>
                            <p className="text-xs font-semibold text-gray-500">{item.email}</p>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={item.plan}
                              disabled={savingId === item.id}
                              onChange={(event) => updateUser(item, { plan: event.target.value as AdminUser['plan'] })}
                              className="h-9 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-xs font-black"
                            >
                              <option value="free">Free</option>
                              <option value="pro">Pro</option>
                              <option value="lifetime">Lifetime</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={item.role}
                              disabled={savingId === item.id}
                              onChange={(event) => updateUser(item, { role: event.target.value as AdminUser['role'] })}
                              className="h-9 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-xs font-black"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              disabled={savingId === item.id}
                              onClick={() => updateUser(item, { status: item.status === 'active' ? 'suspended' : 'active' })}
                              className={`inline-flex h-8 items-center rounded-[6px] px-3 text-xs font-black ${
                                item.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                              }`}
                            >
                              {item.status}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-gray-500">
                            {item.lastLoginAt ? new Date(item.lastLoginAt).toLocaleString('id-ID') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'products' && (
              <section className="space-y-4">
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <h2 className="text-sm font-black text-[#0F172A]">Add Product</h2>
                  <div className="mt-3 grid gap-2 md:grid-cols-4">
                    {[
                      { key: 'id', label: 'Product ID' },
                      { key: 'title', label: 'Product Title' },
                      { key: 'author', label: 'Author / Creator' },
                      { key: 'price', label: 'Selling Price', type: 'number' },
                      { key: 'originalPrice', label: 'Original Price', type: 'number' },
                      { key: 'stock', label: 'Stock / Quota', type: 'number' },
                      { key: 'language', label: 'Language' },
                      { key: 'level', label: 'Learning Level' },
                      { key: 'duration', label: 'Duration' },
                      { key: 'pages', label: 'Pages', type: 'number' },
                      { key: 'tags', label: 'Tags' },
                    ].map((field) => (
                      <AdminField key={field.key} label={field.label}>
                        <input
                          type={field.type || 'text'}
                          placeholder={field.key === 'tags' ? 'grammar, beginner, ebook' : field.label}
                          value={String(newProduct[field.key as keyof typeof newProduct])}
                          onChange={(event) => setNewProduct((current) => ({
                            ...current,
                            [field.key]: field.type === 'number' ? Number(event.target.value) : event.target.value,
                          }))}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                        />
                      </AdminField>
                    ))}
                    <AdminField label="Product Type">
                      <select
                        value={newProduct.type}
                        onChange={(event) => setNewProduct((current) => ({ ...current, type: event.target.value }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      >
                        <option value="ebook">eBook</option>
                        <option value="book">Book</option>
                        <option value="ecourse">eCourse</option>
                      </select>
                    </AdminField>
                    <AdminField label="Delivery (Fisik / Digital)">
                      <select
                        value={newProduct.delivery}
                        onChange={(event) => setNewProduct((current) => ({ ...current, delivery: event.target.value as 'physical' | 'digital' }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      >
                        <option value="digital">Digital (Instant)</option>
                        <option value="physical">Fisik (Kirim Ongkir)</option>
                      </select>
                    </AdminField>
                    <AdminField label="Berat (gram, fisik)">
                      <input
                        type="number"
                        min={0}
                        placeholder="500"
                        value={newProduct.weightGrams}
                        onChange={(event) => setNewProduct((current) => ({ ...current, weightGrams: Number(event.target.value) }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      />
                    </AdminField>
                    <AdminField label="Category">
                      <select
                        value={newProduct.category}
                        onChange={(event) => setNewProduct((current) => ({ ...current, category: event.target.value }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="business">Business</option>
                        <option value="kids">Kids</option>
                        <option value="exam-prep">Exam Prep</option>
                      </select>
                    </AdminField>
                    <AdminField label="Cover Image URL" className="md:col-span-2">
                      <input
                        placeholder="https://..."
                        value={newProduct.cover}
                        onChange={(event) => setNewProduct((current) => ({ ...current, cover: event.target.value }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      />
                    </AdminField>
                    <AdminField label="Product Description" className="md:col-span-4">
                      <textarea
                        placeholder="Short description shown on product page"
                        value={newProduct.description}
                        onChange={(event) => setNewProduct((current) => ({ ...current, description: event.target.value }))}
                        className="min-h-20 w-full rounded-[6px] border border-[#CBD5E1] px-3 py-2 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      />
                    </AdminField>
                    <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-black">
                      <input
                        type="checkbox"
                        checked={newProduct.bestseller}
                        onChange={(event) => setNewProduct((current) => ({ ...current, bestseller: event.target.checked }))}
                      />
                      Bestseller
                    </label>
                    <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-black">
                      <input
                        type="checkbox"
                        checked={newProduct.newRelease}
                        onChange={(event) => setNewProduct((current) => ({ ...current, newRelease: event.target.checked }))}
                      />
                      New Release
                    </label>
                    <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-black">
                      <input
                        type="checkbox"
                        checked={newProduct.proDiscountEnabled}
                        onChange={(event) => setNewProduct((current) => ({ ...current, proDiscountEnabled: event.target.checked }))}
                      />
                      Pro Discount
                    </label>
                    <AdminField label="Pro Discount (%)">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="10"
                        value={newProduct.proDiscountPercent}
                        onChange={(event) => setNewProduct((current) => ({ ...current, proDiscountPercent: Number(event.target.value) }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      />
                    </AdminField>
                    <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-black">
                      <input
                        type="checkbox"
                        checked={newProduct.lifetimeDiscountEnabled}
                        onChange={(event) => setNewProduct((current) => ({ ...current, lifetimeDiscountEnabled: event.target.checked }))}
                      />
                      Lifetime Discount
                    </label>
                    <AdminField label="Lifetime Discount (%)">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="20"
                        value={newProduct.lifetimeDiscountPercent}
                        onChange={(event) => setNewProduct((current) => ({ ...current, lifetimeDiscountPercent: Number(event.target.value) }))}
                        className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold outline-none focus:border-[#0891B2]"
                      />
                    </AdminField>
                    <ProductVariantEditor
                      variants={newProduct.variants || []}
                      onAdd={addNewProductVariant}
                      onRemove={removeNewProductVariant}
                      onChange={updateNewProductVariant}
                    />
                    <button
                      type="button"
                      disabled={savingId === 'new-product' || !newProduct.id || !newProduct.title}
                      onClick={createProduct}
                      className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[#0891B2] px-4 text-sm font-black text-white disabled:opacity-50 md:col-span-2"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
                  <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
                    <h2 className="text-sm font-black text-[#0F172A]">Products</h2>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {products.map((product) => {
                      const draft = productDraft[product.id] || product;
                      const editing = editingProductId === product.id;

                      return (
                      <div key={product.id} className="p-4">
                        <div className="grid gap-3 md:grid-cols-[1fr_120px_90px_120px_110px] md:items-center">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-black text-[#0F172A]">{product.title}</p>
                            {product.active && <CheckCircle2 size={15} className="text-emerald-600" />}
                          </div>
                          <p className="text-xs font-semibold text-gray-500">{product.id} · {product.type} · {product.category}</p>
                          {Boolean(product.variants?.length) && (
                            <p className="mt-1 text-xs font-black text-gray-500">{product.variants?.length} variasi produk</p>
                          )}
                          {(product.proDiscountEnabled || product.lifetimeDiscountEnabled) && (
                            <p className="mt-1 text-xs font-black text-[#0891B2]">
                              {product.proDiscountEnabled ? `Pro ${product.proDiscountPercent || 0}%` : ''}
                              {product.proDiscountEnabled && product.lifetimeDiscountEnabled ? ' · ' : ''}
                              {product.lifetimeDiscountEnabled ? `Lifetime ${product.lifetimeDiscountPercent || 0}%` : ''}
                            </p>
                          )}
                        </div>
                        <p className="text-sm font-black text-[#0F172A]">{formatRupiah(product.price)}</p>
                        <p className="text-sm font-black text-gray-600">{product.stock}</p>
                        <button
                          type="button"
                          disabled={savingId === product.id}
                          onClick={() => updateProduct(product, { active: !product.active })}
                          className={`h-9 rounded-[6px] px-3 text-xs font-black ${
                            product.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {product.active ? 'Active' : 'Hidden'}
                        </button>
                        <button
                          type="button"
                          onClick={() => editing ? setEditingProductId(null) : startEditProduct(product)}
                          className="h-9 rounded-[6px] border border-[#CBD5E1] px-3 text-xs font-black text-[#0F172A] hover:bg-gray-50"
                        >
                          {editing ? 'Close' : 'Edit'}
                        </button>
                        </div>

                        {editing && (
                          <div className="mt-4 rounded-[8px] border border-[#CBD5E1] bg-[#F8FAFC] p-4">
                            <div className="grid gap-3 md:grid-cols-4">
                              <AdminField label="Product Title">
                                <input
                                  value={draft.title}
                                  onChange={(event) => updateProductDraft(product.id, { title: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Title"
                                />
                              </AdminField>
                              <AdminField label="Author / Creator">
                                <input
                                  value={draft.author}
                                  onChange={(event) => updateProductDraft(product.id, { author: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Author"
                                />
                              </AdminField>
                              <AdminField label="Product Type">
                                <select
                                  value={draft.type}
                                  onChange={(event) => updateProductDraft(product.id, { type: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                >
                                  <option value="ebook">eBook</option>
                                  <option value="book">Book</option>
                                  <option value="ecourse">eCourse</option>
                                </select>
                              </AdminField>
                              <AdminField label="Delivery (Fisik / Digital)">
                                <select
                                  value={draft.delivery || (draft.type === 'book' ? 'physical' : 'digital')}
                                  onChange={(event) => updateProductDraft(product.id, { delivery: event.target.value as 'physical' | 'digital' })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                >
                                  <option value="digital">Digital (Instant)</option>
                                  <option value="physical">Fisik (Kirim Ongkir)</option>
                                </select>
                              </AdminField>
                              <AdminField label="Berat (gram)">
                                <input
                                  type="number"
                                  min={0}
                                  value={draft.weightGrams || 0}
                                  onChange={(event) => updateProductDraft(product.id, { weightGrams: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="500"
                                />
                              </AdminField>
                              <AdminField label="Category">
                                <select
                                  value={draft.category}
                                  onChange={(event) => updateProductDraft(product.id, { category: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                >
                                  <option value="beginner">Beginner</option>
                                  <option value="intermediate">Intermediate</option>
                                  <option value="advanced">Advanced</option>
                                  <option value="business">Business</option>
                                  <option value="kids">Kids</option>
                                  <option value="exam-prep">Exam Prep</option>
                                </select>
                              </AdminField>
                              <AdminField label="Selling Price">
                                <input
                                  type="number"
                                  value={draft.price || 0}
                                  onChange={(event) => updateProductDraft(product.id, { price: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Price"
                                />
                              </AdminField>
                              <AdminField label="Original Price">
                                <input
                                  type="number"
                                  value={draft.originalPrice || 0}
                                  onChange={(event) => updateProductDraft(product.id, { originalPrice: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Original Price"
                                />
                              </AdminField>
                              <AdminField label="Stock / Quota">
                                <input
                                  type="number"
                                  value={draft.stock || 0}
                                  onChange={(event) => updateProductDraft(product.id, { stock: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Stock"
                                />
                              </AdminField>
                              <AdminField label="Learning Level">
                                <input
                                  value={draft.level || ''}
                                  onChange={(event) => updateProductDraft(product.id, { level: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Level"
                                />
                              </AdminField>
                              <AdminField label="Language">
                                <input
                                  value={draft.language || ''}
                                  onChange={(event) => updateProductDraft(product.id, { language: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Language"
                                />
                              </AdminField>
                              <AdminField label="Duration">
                                <input
                                  value={draft.duration || ''}
                                  onChange={(event) => updateProductDraft(product.id, { duration: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Duration"
                                />
                              </AdminField>
                              <AdminField label="Pages">
                                <input
                                  type="number"
                                  value={draft.pages || 0}
                                  onChange={(event) => updateProductDraft(product.id, { pages: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="Pages"
                                />
                              </AdminField>
                              <AdminField label="Cover Image URL" className="md:col-span-2">
                                <input
                                  value={draft.cover || ''}
                                  onChange={(event) => updateProductDraft(product.id, { cover: event.target.value })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="https://..."
                                />
                              </AdminField>
                              <AdminField label="Tags" className="md:col-span-4">
                                <input
                                  value={Array.isArray(draft.tags) ? draft.tags.join(', ') : String(draft.tags || '')}
                                  onChange={(event) => updateProductDraft(product.id, { tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="grammar, beginner, ebook"
                                />
                              </AdminField>
                              <AdminField label="Product Description" className="md:col-span-4">
                                <textarea
                                  value={draft.description || ''}
                                  onChange={(event) => updateProductDraft(product.id, { description: event.target.value })}
                                  className="min-h-24 w-full rounded-[6px] border border-[#CBD5E1] px-3 py-2 text-sm font-semibold"
                                  placeholder="Short description shown on product page"
                                />
                              </AdminField>
                              <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-sm font-black">
                                <input
                                  type="checkbox"
                                  checked={Boolean(draft.bestseller)}
                                  onChange={(event) => updateProductDraft(product.id, { bestseller: event.target.checked })}
                                />
                                Bestseller
                              </label>
                              <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-sm font-black">
                                <input
                                  type="checkbox"
                                  checked={Boolean(draft.newRelease)}
                                  onChange={(event) => updateProductDraft(product.id, { newRelease: event.target.checked })}
                                />
                                New Release
                              </label>
                              <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-sm font-black">
                                <input
                                  type="checkbox"
                                  checked={Boolean(draft.active)}
                                  onChange={(event) => updateProductDraft(product.id, { active: event.target.checked })}
                                />
                                Active
                              </label>
                              <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-sm font-black">
                                <input
                                  type="checkbox"
                                  checked={Boolean(draft.proDiscountEnabled)}
                                  onChange={(event) => updateProductDraft(product.id, { proDiscountEnabled: event.target.checked })}
                                />
                                Pro Discount
                              </label>
                              <AdminField label="Pro Discount (%)">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={draft.proDiscountPercent || 0}
                                  onChange={(event) => updateProductDraft(product.id, { proDiscountPercent: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="10"
                                />
                              </AdminField>
                              <label className="flex h-10 items-center gap-2 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-sm font-black">
                                <input
                                  type="checkbox"
                                  checked={Boolean(draft.lifetimeDiscountEnabled)}
                                  onChange={(event) => updateProductDraft(product.id, { lifetimeDiscountEnabled: event.target.checked })}
                                />
                                Lifetime Discount
                              </label>
                              <AdminField label="Lifetime Discount (%)">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={draft.lifetimeDiscountPercent || 0}
                                  onChange={(event) => updateProductDraft(product.id, { lifetimeDiscountPercent: Number(event.target.value) })}
                                  className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                                  placeholder="20"
                                />
                              </AdminField>
                              <ProductVariantEditor
                                variants={draft.variants || []}
                                onAdd={() => addDraftVariant(product.id)}
                                onRemove={(index) => removeDraftVariant(product.id, index)}
                                onChange={(index, patch) => updateDraftVariant(product.id, index, patch)}
                              />
                              <button
                                type="button"
                                disabled={savingId === product.id}
                                onClick={() => saveProductDraft(product)}
                                className="h-10 rounded-[6px] bg-[#0891B2] px-4 text-sm font-black text-white disabled:opacity-50"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )})}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'settings' && (
              <section className="space-y-4">
                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-[#0891B2]" />
                    <h2 className="text-sm font-black text-[#0F172A]">Lokasi Pengiriman (Origin)</h2>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 mb-3">Default: Pare, Kabupaten Kediri, Jawa Timur. Ubah jika kirim dari lokasi lain.</p>

                  {!settings ? (
                    <p className="text-sm text-gray-500">Memuat settings...</p>
                  ) : (
                    <div className="space-y-3">
                      {settings.origin?.destinationId ? (
                        <div className="flex items-center justify-between rounded-[8px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
                          <div>
                            <p className="font-black text-emerald-800">{settings.origin.label || '—'}</p>
                            <p className="text-xs text-emerald-700">ID: {settings.origin.destinationId} · POS {settings.origin.zipCode || '-'}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, origin: { ...settings.origin, destinationId: undefined } })}
                            className="text-xs font-black text-emerald-700 hover:underline"
                          >
                            Ubah
                          </button>
                        </div>
                      ) : (
                        <AdminField label="Cari Lokasi Asal (mis. 'pare kediri')">
                          <div className="relative">
                            <input
                              value={settingsSearchKeyword}
                              onChange={(e) => setSettingsSearchKeyword(e.target.value)}
                              placeholder="ketik min. 3 huruf..."
                              className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                            />
                            {(settingsSearchLoading || settingsSearchResults.length > 0) && (
                              <div className="absolute z-30 left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-white rounded-[6px] border border-[#CBD5E1] shadow-lg">
                                {settingsSearchLoading && <div className="px-3 py-2 text-xs text-gray-500">Mencari...</div>}
                                {!settingsSearchLoading && settingsSearchResults.map((row) => (
                                  <button
                                    key={row.id}
                                    type="button"
                                    onClick={() => {
                                      setSettings({
                                        ...settings,
                                        origin: {
                                          destinationId: row.id,
                                          label: row.label,
                                          province: row.province_name,
                                          city: row.city_name,
                                          district: row.district_name,
                                          subdistrict: row.subdistrict_name,
                                          zipCode: row.zip_code,
                                        },
                                      });
                                      setSettingsSearchKeyword('');
                                      setSettingsSearchResults([]);
                                    }}
                                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                                  >
                                    <p className="text-xs font-black text-[#0F172A]">{row.subdistrict_name}, {row.district_name}</p>
                                    <p className="text-[11px] text-gray-500">{row.city_name} · {row.province_name} · {row.zip_code}</p>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </AdminField>
                      )}
                      <AdminField label="Origin Label (tampil di email)">
                        <input
                          value={settings.origin?.label || ''}
                          onChange={(e) => setSettings({ ...settings, origin: { ...settings.origin, label: e.target.value } })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                          placeholder="PARE, PARE, KEDIRI, JAWA TIMUR, 64211"
                        />
                      </AdminField>
                    </div>
                  )}
                </div>

                <div className="rounded-[10px] border border-[#CBD5E1] bg-white p-4">
                  <h2 className="text-sm font-black text-[#0F172A] mb-3">Pengirim & Notifikasi</h2>
                  {settings && (
                    <div className="grid gap-3 md:grid-cols-3">
                      <AdminField label="Nama Pengirim">
                        <input
                          value={settings.sender?.name || ''}
                          onChange={(e) => setSettings({ ...settings, sender: { ...settings.sender, name: e.target.value } })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                        />
                      </AdminField>
                      <AdminField label="Telepon Pengirim">
                        <input
                          value={settings.sender?.phone || ''}
                          onChange={(e) => setSettings({ ...settings, sender: { ...settings.sender, phone: e.target.value } })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                        />
                      </AdminField>
                      <AdminField label="Email Notifikasi Order">
                        <input
                          value={settings.notifyAdminEmail || ''}
                          onChange={(e) => setSettings({ ...settings, notifyAdminEmail: e.target.value })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                          placeholder="kartikatalia5@gmail.com"
                        />
                      </AdminField>
                      <AdminField label="WhatsApp Admin (OneSender)">
                        <input
                          value={settings.notifyAdminWhatsApp || ''}
                          onChange={(e) => setSettings({ ...settings, notifyAdminWhatsApp: e.target.value })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                          placeholder="6289685350650"
                        />
                      </AdminField>
                      <AdminField label="Default Berat (gram)">
                        <input
                          type="number"
                          min={1}
                          value={settings.defaultWeightGrams || 500}
                          onChange={(e) => setSettings({ ...settings, defaultWeightGrams: Number(e.target.value) })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                        />
                      </AdminField>
                      <AdminField label="Alamat Pengirim" className="md:col-span-2">
                        <input
                          value={settings.sender?.address || ''}
                          onChange={(e) => setSettings({ ...settings, sender: { ...settings.sender, address: e.target.value } })}
                          className="h-10 w-full rounded-[6px] border border-[#CBD5E1] px-3 text-sm font-semibold"
                          placeholder="Pare, Kediri, Jawa Timur"
                        />
                      </AdminField>
                    </div>
                  )}
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      disabled={!settings || settingsBusy}
                      onClick={() => settings && saveSettings(settings)}
                      className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[#0891B2] px-4 text-sm font-black text-white disabled:opacity-50"
                    >
                      {settingsBusy ? 'Menyimpan...' : 'Simpan Settings'}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'orders' && (
              <section className="overflow-hidden rounded-[10px] border border-[#CBD5E1] bg-white">
                <div className="border-b border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3">
                  <h2 className="text-sm font-black text-[#0F172A]">Shop Orders</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-sm font-bold text-gray-500">Belum ada order.</div>
                  )}
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="grid gap-3 p-4 md:grid-cols-[1fr_130px_140px_140px] md:items-center">
                      <div>
                        <p className="font-black text-[#0F172A]">{order.id}</p>
                        <p className="text-xs font-semibold text-gray-500">{order.customer_name} · {order.customer_email}</p>
                        <p className="mt-1 text-xs font-semibold text-gray-400">{new Date(order.created_at).toLocaleString('id-ID')}</p>
                      </div>
                      <p className="font-black text-[#0891B2]">{formatRupiah(order.total)}</p>
                      <select
                        value={order.payment_status}
                        disabled={savingId === order.id}
                        onChange={(event) => updateOrder(order, { paymentStatus: event.target.value })}
                        className="h-9 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-xs font-black"
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="refunded">Refunded</option>
                      </select>
                      <select
                        value={order.status}
                        disabled={savingId === order.id}
                        onChange={(event) => updateOrder(order, { status: event.target.value })}
                        className="h-9 rounded-[6px] border border-[#CBD5E1] bg-white px-3 text-xs font-black"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
}
