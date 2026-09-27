const { Pool } = require('pg');
const { requiredEnv } = require('./config');

const pool = new Pool({
  host: requiredEnv('DB_HOST', { productionOnly: true }) || process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: requiredEnv('DB_NAME', { productionOnly: true }) || process.env.DB_NAME,
  user: requiredEnv('DB_USER', { productionOnly: true }) || process.env.DB_USER,
  password: requiredEnv('DB_PASSWORD', { productionOnly: true }) || process.env.DB_PASSWORD,
});

module.exports = {
  pool,
};
