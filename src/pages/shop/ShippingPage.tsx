import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, User, Phone, Mail, Check, Truck, Loader2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect, useCallback } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import { useCart } from '../../shop/CartContext';
import { formatRupiah } from '../../data/shopData';
import type { ShippingAddress, ShippingOption } from '../../types/shop';
import { isPhysicalProduct } from '../../types/shop';

type DestinationRow = {
  id: number;
  label: string;
  province_name: string;
  city_name: string;
  district_name: string;
  subdistrict_name: string;
  zip_code: string;
};

type CostRow = {
  name: string;
  code: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
};

const COURIERS: { id: string; label: string }[] = [
  { id: 'jne',     label: 'JNE' },
  { id: 'pos',     label: 'POS Indonesia' },
  { id: 'tiki',    label: 'TIKI' },
  { id: 'sicepat', label: 'SiCepat' },
  { id: 'jnt',     label: 'J&T Express' },
];

export default function ShippingPage() {
  const navigate = useNavigate();
  const {
    items, address, setAddress, shippingMethod, setShippingMethod,
    subtotal, rawSubtotal, memberDiscount, products,
  } = useCart();

  const [form, setForm] = useState<ShippingAddress>(address ?? {
    fullName: '',
    phone: '',
    email: '',
    province: '',
    city: '',
    district: '',
    postalCode: '',
    address: '',
    notes: '',
    provinceId: '',
    cityId: '',
    districtId: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  const hasPhysical = useMemo(
    () => items.some(it => {
      const p = products.find(p => p.id === it.productId);
      return p && isPhysicalProduct(p);
    }),
    [items, products]
  );

  // Total weight (grams) — only for physical products.
  const totalWeight = useMemo(() => {
    let sum = 0;
    for (const it of items) {
      const p = products.find(pr => pr.id === it.productId);
      if (p && isPhysicalProduct(p)) {
        const variant = p.variants?.find((item) => item.id === it.variantId);
        sum += (variant?.weightGrams || p.weightGrams || 500) * it.quantity;
      }
    }
    return Math.max(sum, 1000);
  }, [items, products]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<DestinationRow[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [courier, setCourier] = useState<string>('jne');
  const [costRows, setCostRows] = useState<CostRow[]>([]);
  const [costLoading, setCostLoading] = useState(false);
  const [costError, setCostError] = useState('');

  // Debounced destination search.
  useEffect(() => {
    if (!hasPhysical) return;
    if (searchKeyword.trim().length < 3) { setSearchResults([]); return; }
    const handle = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/shop/rajaongkir/search?keyword=${encodeURIComponent(searchKeyword.trim())}`);
        const data = await res.json();
        if (res.ok) setSearchResults(data.results || []);
      } catch { /* ignore */ }
      finally { setSearchLoading(false); }
    }, 280);
    return () => clearTimeout(handle);
  }, [searchKeyword, hasPhysical]);

  const pickDestination = (row: DestinationRow) => {
    setForm(prev => ({
      ...prev,
      provinceId: '',
      cityId: '',
      districtId: String(row.id),
      province: row.province_name,
      city: row.city_name,
      district: `${row.district_name} (${row.subdistrict_name})`,
      postalCode: row.zip_code || prev.postalCode,
    }));
    setSearchKeyword(row.label);
    setSearchOpen(false);
  };

  // Fetch ongkir when destination + courier are ready.
  const fetchCost = useCallback(async () => {
    if (!hasPhysical) return;
    if (!form.districtId) { setCostRows([]); return; }
    setCostLoading(true);
    setCostError('');
    try {
      const res = await fetch('/api/shop/rajaongkir/cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: Number(form.districtId),
          weight: totalWeight,
          courier,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghitung ongkir');
      setCostRows(data.results || []);
    } catch (err) {
      setCostError(err instanceof Error ? err.message : 'Gagal menghitung ongkir');
      setCostRows([]);
    } finally {
      setCostLoading(false);
    }
  }, [hasPhysical, form.districtId, totalWeight, courier]);

  useEffect(() => { fetchCost(); }, [fetchCost]);

  // Build digital instant option (auto-applied for digital-only carts).
  const digitalOption: ShippingOption = useMemo(() => ({
    id: 'instant',
    name: 'Instant Delivery (Digital)',
    description: 'For eBooks & eCourses',
    cost: 0,
    eta: 'Within minutes',
    icon: '⚡',
  }), []);

  // Build physical options from cost results.
  const physicalOptions: ShippingOption[] = useMemo(() => {
    if (!hasPhysical) return [];
    return costRows.map((row) => ({
      id: `${row.code}-${row.service}`,
      name: `${row.code.toUpperCase()} ${row.service}`,
      description: row.description || row.name || '',
      cost: row.cost,
      eta: row.etd ? `${row.etd}` : '',
      icon: '📦',
    }));
  }, [hasPhysical, costRows]);

  const availableShipping: ShippingOption[] = hasPhysical ? physicalOptions : [digitalOption];

  // Auto-select shipping method.
  useEffect(() => {
    if (!hasPhysical) {
      if (shippingMethod?.id !== 'instant') setShippingMethod(digitalOption);
      return;
    }
    if (availableShipping.length === 0) return;
    const stillValid = shippingMethod && availableShipping.some(s => s.id === shippingMethod.id);
    if (!stillValid) setShippingMethod(availableShipping[0]);
  }, [hasPhysical, availableShipping, shippingMethod, setShippingMethod, digitalOption]);

  if (items.length === 0) {
    return (
      <PageContainer>
        <div className="px-5 py-20 text-center">
          <p className="text-[13px] text-text-muted">Your cart is empty.</p>
          <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-bold text-[13px] hover:underline cursor-pointer">Browse Shop</button>
        </div>
      </PageContainer>
    );
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) e.phone = 'Invalid number';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/.+@.+\..+/.test(form.email)) e.email = 'Invalid email';

    if (hasPhysical) {
      if (!form.districtId) e.district = 'Pilih lokasi tujuan';
      if (!form.postalCode.trim()) e.postalCode = 'Required';
      else if (!/^[0-9]{5}$/.test(form.postalCode)) e.postalCode = '5 digits';
      if (!form.address.trim()) e.address = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    if (hasPhysical && !shippingMethod) {
      setCostError('Pilih kurir dan layanan pengiriman terlebih dahulu.');
      return;
    }
    setAddress(form);
    navigate('/shop/checkout');
  };

  const update = <K extends keyof ShippingAddress>(key: K, value: ShippingAddress[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  return (
    <PageContainer>
      <div className="px-5 md:px-0 pt-6 md:pt-0 pb-32 md:pb-8">

        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm border border-gray-100"
          >
            <ChevronLeft size={18} className="text-text-primary" />
          </motion.button>
          <div>
            <h1 className="text-xl font-extrabold text-text-primary">Shipping</h1>
            <p className="text-[12px] text-text-muted">Where should we deliver your order?</p>
          </div>
        </div>

        <Stepper step={2} />

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">

          <div className="space-y-5">
            <Section title="Contact Information">
              <Field label="Full Name" icon={<User size={13} />} error={errors.fullName}>
                <input
                  value={form.fullName}
                  onChange={e => update('fullName', e.target.value)}
                  placeholder="Karina Saputra"
                  className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Phone" icon={<Phone size={13} />} error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    placeholder="0812 3456 7890"
                    className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                  />
                </Field>
                <Field label="Email" icon={<Mail size={13} />} error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                  />
                </Field>
              </div>
            </Section>

            {hasPhysical ? (
              <Section title="Delivery Address" icon={<MapPin size={13} className="text-primary" />}>
                <Field label="Cari Lokasi (kecamatan / kelurahan / kota)" error={errors.district || errors.city || errors.province}>
                  <div className="relative">
                    <input
                      value={searchKeyword}
                      onChange={(e) => { setSearchKeyword(e.target.value); setSearchOpen(true); }}
                      onFocus={() => setSearchOpen(true)}
                      placeholder="ketik min. 3 huruf, mis. 'pare kediri'"
                      className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                    />
                    {searchOpen && (searchLoading || searchResults.length > 0) && (
                      <div className="absolute z-30 left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-lg">
                        {searchLoading && (
                          <div className="px-3 py-2 text-[12px] text-text-muted flex items-center gap-2">
                            <Loader2 size={13} className="animate-spin" /> Mencari...
                          </div>
                        )}
                        {!searchLoading && searchResults.map((row) => (
                          <button
                            key={row.id}
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); pickDestination(row); }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                          >
                            <p className="text-[12px] font-bold text-text-primary leading-tight">{row.subdistrict_name}, {row.district_name}</p>
                            <p className="text-[11px] text-text-muted">{row.city_name} · {row.province_name} · {row.zip_code}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
                {form.districtId && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 text-[12px] text-emerald-800 flex items-center justify-between">
                    <span>{form.district}, {form.city}, {form.province} · {form.postalCode}</span>
                    <button
                      type="button"
                      onClick={() => { setForm(prev => ({ ...prev, districtId: '', district: '', city: '', province: '', postalCode: '' })); setSearchKeyword(''); }}
                      className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Ganti
                    </button>
                  </div>
                )}
                <Field label="Postal Code" error={errors.postalCode}>
                  <input
                    value={form.postalCode}
                    onChange={e => update('postalCode', e.target.value)}
                    placeholder="64211"
                    inputMode="numeric"
                    className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                  />
                </Field>
                <Field label="Alamat Lengkap (Jalan, RT/RW, No. Rumah)" error={errors.address}>
                  <textarea
                    value={form.address}
                    onChange={e => update('address', e.target.value)}
                    placeholder="Jalan Mawar No. 12, RT 03/RW 04..."
                    rows={3}
                    className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted resize-none"
                  />
                </Field>
                <Field label="Catatan Pengiriman (opsional)">
                  <input
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                    placeholder="e.g. drop at front desk"
                    className="w-full bg-transparent outline-none text-[13px] text-text-primary placeholder:text-text-muted"
                  />
                </Field>
              </Section>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">⚡</div>
                <div>
                  <p className="font-extrabold text-[13px] text-emerald-800">Digital products only</p>
                  <p className="text-[12px] text-emerald-700 mt-0.5">No physical shipping needed. We'll send your access link to <span className="font-bold">{form.email || 'your email'}</span> right after payment.</p>
                </div>
              </div>
            )}

            <Section title="Delivery Method" icon={<Truck size={13} className="text-primary" />}>
              {hasPhysical && (
                <>
                  <div className="flex flex-wrap gap-2 pb-2">
                    {COURIERS.map(c => {
                      const active = courier === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setCourier(c.id)}
                          className={`px-3 py-1.5 rounded-xl text-[11.5px] font-bold border transition-colors cursor-pointer ${
                            active ? 'bg-primary text-white border-primary' : 'bg-gray-50 text-text-secondary border-gray-100'
                          }`}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                  {!form.districtId && (
                    <p className="text-[12px] text-text-muted">Pilih provinsi, kabupaten/kota & kecamatan tujuan untuk menghitung ongkir.</p>
                  )}
                  {costLoading && (
                    <div className="flex items-center gap-2 text-[12px] text-text-muted">
                      <Loader2 size={14} className="animate-spin" />
                      Menghitung ongkir...
                    </div>
                  )}
                  {costError && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-[12px] rounded-xl p-2.5">
                      <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                      <p>{costError}</p>
                    </div>
                  )}
                </>
              )}

              {availableShipping.map(opt => {
                const active = shippingMethod?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setShippingMethod(opt)}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      active ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-primary/30'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg shrink-0">{opt.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-[13px] text-text-primary truncate">{opt.name}</p>
                      <p className="text-[11px] text-text-muted truncate">{opt.description}{opt.eta ? ' · ' + opt.eta : ''}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-black text-text-primary">{opt.cost === 0 ? 'FREE' : formatRupiah(opt.cost)}</p>
                      <div className={`mt-1 inline-flex w-5 h-5 rounded-full border-2 items-center justify-center ${active ? 'border-primary bg-primary' : 'border-gray-200'}`}>
                        {active && <Check size={11} className="text-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </Section>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <h3 className="font-extrabold text-[13px] text-text-primary mb-3">Order Summary</h3>
              {memberDiscount > 0 && (
                <>
                  <Row label="Normal subtotal" value={formatRupiah(rawSubtotal)} />
                  <Row label="Member discount" value={`- ${formatRupiah(memberDiscount)}`} />
                </>
              )}
              <Row label="Subtotal" value={formatRupiah(subtotal)} />
              <Row label="Shipping" value={shippingMethod ? (shippingMethod.cost === 0 ? 'FREE' : formatRupiah(shippingMethod.cost)) : '—'} />
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-text-primary">Total</span>
                <span className="text-xl font-black text-primary-dark">{formatRupiah(subtotal + (shippingMethod?.cost ?? 0))}</span>
              </div>

              <button
                onClick={handleContinue}
                className="w-full mt-4 py-3.5 rounded-2xl bg-primary text-white font-extrabold text-[13px] hover:bg-primary-dark transition-colors cursor-pointer"
                style={{ boxShadow: '0 6px 20px rgba(126, 195, 230, 0.4)' }}
              >
                Continue to Payment
              </button>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-extrabold text-[13px] text-text-primary">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      <div className={`bg-gray-50 rounded-xl px-3 py-2.5 border ${error ? 'border-red-300' : 'border-gray-100'} focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all`}>
        {children}
      </div>
      {error && <p className="text-[10.5px] text-red-500 font-bold mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[12px] mb-1.5">
      <span className="text-text-secondary font-medium">{label}</span>
      <span className="text-text-primary font-extrabold">{value}</span>
    </div>
  );
}

export function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps = [
    { id: 1, label: 'Cart' },
    { id: 2, label: 'Shipping' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Done' },
  ];
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {steps.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} className="flex items-center flex-1">
            <div className={`flex items-center gap-2 ${i === 0 ? '' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold border-2 transition-colors ${
                done ? 'bg-primary border-primary text-white' : active ? 'border-primary text-primary bg-white' : 'border-gray-200 text-text-muted bg-white'
              }`}>
                {done ? <Check size={12} /> : s.id}
              </div>
              <span className={`text-[11px] font-bold hidden sm:inline ${active ? 'text-primary' : done ? 'text-text-primary' : 'text-text-muted'}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded-full ${done ? 'bg-primary' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
