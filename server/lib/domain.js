const { ADMIN_EMAIL } = require('../config');

function publicUser(user) {
  const email = normalizeEmail(user.email || '');
  const isRootAdmin = email === ADMIN_EMAIL;
  return {
    id: user.id,
    name: user.name,
    email,
    phone: user.phone || '',
    displayName: user.display_name || user.name,
    avatarUrl: user.avatar_url || '',
    xp: Number(user.xp ?? 0),
    streak: Number(user.streak ?? 0),
    level: Number(user.level ?? 1),
    onboardingCompleted: Boolean(user.onboarding_completed),
    persona: user.persona || {},
    role: isRootAdmin ? 'admin' : (user.role || 'user'),
    plan: isRootAdmin ? 'lifetime' : (user.plan || 'free'),
    planExpiresAt: user.plan_expires_at,
    status: user.status || 'active',
  };
}

function adminUser(user) {
  return {
    ...publicUser(user),
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_login_at,
  };
}

function productPayload(row) {
  return { ...row.data, id: row.id, active: row.active };
}

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function normalizePlanExpiresAt(plan, value) {
  if (plan !== 'pro') return null;
  if (!value) return null;
  const expiresAt = new Date(value);
  if (!Number.isFinite(expiresAt.getTime())) return null;
  return expiresAt.getTime() > Date.now() ? expiresAt.toISOString() : null;
}

function isPhysicalShopProduct(product) {
  if (product?.delivery) return product.delivery === 'physical';
  return product?.type === 'book';
}

function getShopProductVariant(product, variantId) {
  if (!variantId || !Array.isArray(product?.variants)) return null;
  return product.variants.find((variant) => String(variant.id) === String(variantId)) || null;
}

function getShopDiscountPercent(product, plan) {
  if (plan === 'lifetime') {
    if (product?.lifetimeDiscountEnabled) {
      return Math.max(0, Math.min(100, Number(product.lifetimeDiscountPercent || 0)));
    }
    if (product?.proDiscountEnabled) {
      return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
    }
  }
  if (plan === 'pro' && product?.proDiscountEnabled) {
    return Math.max(0, Math.min(100, Number(product.proDiscountPercent || 0)));
  }
  return 0;
}

function getShopBasePrice(product, variantId) {
  const variant = getShopProductVariant(product, variantId);
  return Number(variant?.price ?? product?.price ?? 0);
}

function getShopUnitPrice(product, variantId, plan) {
  const basePrice = getShopBasePrice(product, variantId);
  const discountPercent = getShopDiscountPercent(product, plan);
  if (discountPercent <= 0) return basePrice;
  return Math.max(0, Math.round(basePrice * (100 - discountPercent) / 100));
}

function getShopItemWeight(product, variantId) {
  const variant = getShopProductVariant(product, variantId);
  return Number(variant?.weightGrams ?? product?.weightGrams ?? 500);
}

function getServerEffectivePlan(user) {
  if (!user) return 'free';
  const email = normalizeEmail(user.email || '');
  if (email === ADMIN_EMAIL || user.plan === 'lifetime') return 'lifetime';
  if (user.plan === 'pro') {
    if (!user.plan_expires_at) return 'pro';
    return new Date(user.plan_expires_at).getTime() > Date.now() ? 'pro' : 'free';
  }
  return 'free';
}

module.exports = {
  publicUser,
  adminUser,
  productPayload,
  normalizeEmail,
  normalizePlanExpiresAt,
  isPhysicalShopProduct,
  getShopProductVariant,
  getShopDiscountPercent,
  getShopBasePrice,
  getShopUnitPrice,
  getShopItemWeight,
  getServerEffectivePlan,
};
