const { ONESENDER_ADMIN_PHONE, ORDER_NOTIFY_EMAIL } = require('../config');
const { pool } = require('../db');

const defaultShopSettings = {
  origin: {
    destinationId: 34302,
    label: 'PARE, PARE, KEDIRI, JAWA TIMUR, 64211',
    province: 'JAWA TIMUR',
    city: 'KEDIRI',
    district: 'PARE',
    subdistrict: 'PARE',
    zipCode: '64211',
  },
  sender: {
    name: 'Fluently Shop',
    phone: '0812 0000 0000',
    address: 'Pare, Kediri, Jawa Timur',
  },
  defaultWeightGrams: 500,
  couriers: ['jne', 'pos', 'tiki', 'sicepat', 'jnt'],
  notifyAdminEmail: ORDER_NOTIFY_EMAIL,
  notifyAdminWhatsApp: ONESENDER_ADMIN_PHONE,
};

async function seedShopSettings() {
  const existing = await pool.query("SELECT value FROM shop_settings WHERE key = 'shipping'");
  if (!existing.rows.length) {
    await pool.query(
      `INSERT INTO shop_settings (key, value) VALUES ('shipping', $1::jsonb)`,
      [JSON.stringify(defaultShopSettings)]
    );
    return;
  }
  // Migrate from legacy RajaOngkir-Pro shape to Komerce shape if needed.
  const current = existing.rows[0].value || {};
  const isLegacy = current.origin && (current.origin.originType || current.origin.subdistrictId !== undefined) && !current.origin.destinationId;
  if (isLegacy) {
    await pool.query(
      `UPDATE shop_settings SET value = $1::jsonb, updated_at = now() WHERE key = 'shipping'`,
      [JSON.stringify({ ...defaultShopSettings, sender: { ...defaultShopSettings.sender, ...(current.sender || {}) } })]
    );
  }
}

async function getShopSettings() {
  const result = await pool.query("SELECT value FROM shop_settings WHERE key = 'shipping'");
  return result.rows[0]?.value || defaultShopSettings;
}

module.exports = {
  defaultShopSettings,
  seedShopSettings,
  getShopSettings,
};
