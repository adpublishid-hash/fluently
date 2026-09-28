const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { ONESENDER_KEY, ONESENDER_URL, PUBLIC_APP_URL, QRIS_IMAGE_URL, SMTP_HOST, SMTP_PASS, SMTP_USER } = require('../config');

function normalizeWaPhone(phone) {
  if (!phone) return '';
  let digits = String(phone).replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '62' + digits.slice(1);
  if (digits.startsWith('620')) digits = '62' + digits.slice(3);
  if (!digits.startsWith('62')) digits = '62' + digits;
  return digits;
}

async function sendWhatsApp({ to, message }) {
  const recipient = normalizeWaPhone(to);
  if (!recipient) return { sent: false, reason: 'no recipient' };
  if (!ONESENDER_URL || !ONESENDER_KEY) return { sent: false, reason: 'whatsapp provider is not configured' };
  try {
    const res = await fetch(ONESENDER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ONESENDER_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: { body: message },
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error('[onesender] failed:', res.status, data);
      return { sent: false, status: res.status, data };
    }
    return { sent: true, data };
  } catch (err) {
    console.error('[onesender] error:', err.message);
    return { sent: false, error: err.message };
  }
}

function buildOrderWaText(order, audience) {
  const a = order.shipping_address || {};
  const m = order.shipping_method || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const lines = [];
  if (audience === 'admin') {
    lines.push(`🛎️ *ORDER BARU* ${order.id}`);
    lines.push(`Customer: ${order.customer_name} (${order.customer_email})`);
    if (a.phone) lines.push(`HP: ${a.phone}`);
  } else {
    lines.push(`Halo *${a.fullName || order.customer_name}*,`);
    lines.push(`Terima kasih atas pesananmu di Fluently Shop! 🎉`);
    lines.push(`No. Order: *${order.id}*`);
  }
  lines.push('');
  lines.push('*Rincian Pesanan:*');
  for (const it of items) {
    lines.push(`• ${it.title || it.productId} ×${it.quantity || 1} — ${rupiah((it.price || 0) * (it.quantity || 1))}`);
  }
  lines.push('');
  lines.push(`Subtotal: ${rupiah(order.subtotal)}`);
  lines.push(`Ongkir (${m.name || '-'}): ${rupiah(order.shipping_cost)}`);
  if (Number(order.payment_fee) > 0) lines.push(`Kode unik: ${rupiah(order.payment_fee)}`);
  lines.push(`*Total: ${rupiah(order.total)}*`);
  if (a.address) {
    lines.push('');
    lines.push('*Alamat Kirim:*');
    lines.push(`${a.address}, ${a.district || ''}, ${a.city || ''}, ${a.province || ''} ${a.postalCode || ''}`);
  }
  if (audience === 'customer') {
    lines.push('');
    lines.push('💳 *Pembayaran QRIS*');
    lines.push(`Scan QR di halaman checkout dan bayar tepat *${rupiah(order.total)}*.`);
    lines.push(`QR: ${QRIS_IMAGE_URL}`);
    lines.push('');
    lines.push('Setelah membayar, kirim bukti transfer ke nomor ini ya. Admin akan memverifikasi & mengirim akses/produk.');
  } else {
    lines.push('');
    lines.push(`Status: *${order.payment_status || 'unpaid'}* · ${order.status || 'pending'}`);
    lines.push('Mohon verifikasi pembayaran QRIS & proses order.');
  }
  return lines.join('\n');
}

// ── Mailer ────────────────────────────────────────────────
let mailer = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  mailer = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false') === 'true',
    requireTLS: String(process.env.SMTP_REQUIRE_TLS || 'false') === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const outboxDir = path.join(__dirname, '..', '.outbox');
if (!fs.existsSync(outboxDir)) fs.mkdirSync(outboxDir, { recursive: true });

async function sendEmail({ to, subject, html, text, attachments }) {
  const fromName = process.env.SMTP_FROM_NAME || 'Fluently Shop';
  const fromAddr = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@fluently.local';
  const from = `"${fromName}" <${fromAddr}>`;
  if (mailer) {
    try {
      const info = await mailer.sendMail({ from, to, subject, html, text, attachments });
      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.error('[email] send failed:', err.message);
    }
  }
  // Fallback: write outbox file so user can verify content even without SMTP credentials.
  const file = path.join(outboxDir, `${Date.now()}-${String(to).replace(/[^a-zA-Z0-9]/g, '_')}.html`);
  fs.writeFileSync(file, `<!-- to: ${to}\n     subject: ${subject} -->\n\n${html}`);
  console.log(`[email] outbox written: ${file}`);
  return { sent: false, file };
}

function rupiah(n) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(n) || 0);
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buildWelcomeEmailHtml(user) {
  const firstName = user.display_name || user.name || 'Learner';
  const appUrl = PUBLIC_APP_URL.replace(/\/$/, '');
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden">
      <div style="background:#0F8DCC;color:white;padding:22px 24px">
        <p style="margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;opacity:.8">Welcome to Fluently</p>
        <h1 style="margin:0;font-size:24px;line-height:1.25">Akun kamu sudah aktif</h1>
      </div>
      <div style="padding:22px 24px;color:#334155">
        <p style="margin:0 0 12px;font-size:15px;line-height:1.7">Hai ${escapeHtml(firstName)}, terima kasih sudah daftar di Fluently.</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.7">Kamu bisa mulai latihan bahasa, ngobrol dengan AI tutor, mengikuti modul, dan menyimpan progres belajar dari dashboard.</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${appUrl}" style="display:inline-block;background:#0F8DCC;color:#fff;font-weight:800;padding:12px 22px;border-radius:12px;text-decoration:none">Mulai Belajar</a>
        </p>
        <p style="margin:18px 0 0;font-size:12px;line-height:1.7;color:#64748b">Kalau kamu butuh bantuan, balas email ini atau hubungi support Fluently.</p>
      </div>
    </div>
  </body></html>`;
}

function buildToeflCompletionEmailHtml({ user, testName, totalScore, sections, submittedAt }) {
  const name = user.display_name || user.name || 'Learner';
  const sectionRows = sections.map((section) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:800">${escapeHtml(section.title)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#475569;text-align:center">${Number(section.raw)}/${Number(section.total)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#0F8DCC;text-align:right;font-weight:900">${Number(section.scaled)}</td>
    </tr>`).join('');
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#0D2B55,#1E6F9F);color:white;padding:24px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:900;letter-spacing:.18em;text-transform:uppercase;color:#bae6fd">TOEFL Practice Completed</p>
        <h1 style="margin:0;font-size:25px;line-height:1.25">Selamat, ${escapeHtml(name)}!</h1>
        <p style="margin:8px 0 0;color:#dbeafe;font-size:14px;line-height:1.6">Kamu sudah menyelesaikan ${escapeHtml(testName)}.</p>
      </div>
      <div style="padding:24px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;padding:18px;text-align:center">
          <p style="margin:0;color:#64748b;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.12em">Estimated TOEFL PBT Score</p>
          <p style="margin:6px 0 0;color:#0D2B55;font-size:44px;line-height:1;font-weight:950">${Number(totalScore)}</p>
          <p style="margin:8px 0 0;color:#64748b;font-size:12px">Submitted: ${new Date(submittedAt || Date.now()).toLocaleString('id-ID')}</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:18px;font-size:13px">
          <thead>
            <tr style="background:#f8fafc;color:#64748b">
              <th align="left" style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Section</th>
              <th style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Correct</th>
              <th align="right" style="padding:9px 8px;border-bottom:1px solid #e2e8f0">Scaled</th>
            </tr>
          </thead>
          <tbody>${sectionRows}</tbody>
        </table>
        <p style="margin:18px 0 0;color:#475569;font-size:14px;line-height:1.7">Sertifikat PDF kamu terlampir di email ini. Simpan sebagai bukti penyelesaian simulasi TOEFL di Fluently.</p>
        <p style="margin:10px 0 0;color:#94a3b8;font-size:11px;line-height:1.6">Catatan: skor ini adalah estimasi dari practice test dan bukan official ETS TOEFL® score report.</p>
      </div>
    </div>
  </body></html>`;
}

function buildOrderEmailHtml(order, audience) {
  const a = order.shipping_address || {};
  const m = order.shipping_method || {};
  const items = Array.isArray(order.items) ? order.items : [];
  const itemRows = items.map((it) => `
    <tr>
      <td style="padding:8px 6px;border-bottom:1px solid #eee">${escapeHtml(it.title || it.productId)}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #eee;text-align:center">×${it.quantity || 1}</td>
      <td style="padding:8px 6px;border-bottom:1px solid #eee;text-align:right">${rupiah((it.price || 0) * (it.quantity || 1))}</td>
    </tr>`).join('');
  const addressBlock = a && a.address ? `
    <p style="margin:4px 0 0;color:#475569;font-size:13px;line-height:1.6">
      ${escapeHtml(a.address)}<br>
      ${escapeHtml(a.district)}, ${escapeHtml(a.city)}, ${escapeHtml(a.province)} ${escapeHtml(a.postalCode || '')}
    </p>` : '';
  const greeting = audience === 'admin'
    ? `<h2 style="margin:0 0 4px;color:#0f172a">Order baru masuk · ${escapeHtml(order.id)}</h2>
       <p style="margin:0;color:#475569;font-size:13px">Pelanggan menunggu konfirmasi pembayaran QRIS.</p>`
    : `<h2 style="margin:0 0 4px;color:#0f172a">Terima kasih atas pesananmu, ${escapeHtml(a.fullName || order.customer_name || '')}!</h2>
       <p style="margin:0;color:#475569;font-size:13px">Berikut rincian pesananmu. Selesaikan pembayaran via QRIS untuk diproses.</p>`;
  const qrisBlock = `
    <div style="background:#f8fafc;border:1px dashed #94a3b8;border-radius:12px;padding:16px;text-align:center">
      <p style="margin:0 0 8px;font-weight:800;color:#0f172a">Scan QRIS untuk Pembayaran</p>
      <img src="${QRIS_IMAGE_URL}" alt="QRIS" style="max-width:240px;border-radius:8px"/>
      <p style="margin:8px 0 0;font-size:12px;color:#475569">Total: <b>${rupiah(order.total)}</b></p>
      ${Number(order.payment_fee) > 0 ? `<p style="margin:4px 0 0;font-size:11px;color:#64748b">Termasuk kode unik ${rupiah(order.payment_fee)} untuk verifikasi.</p>` : ''}
    </div>`;
  return `<!doctype html><html><body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#f1f5f9;margin:0;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px">
      ${greeting}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      <p style="margin:0;color:#0f172a;font-weight:800">Order ${escapeHtml(order.id)}</p>
      <p style="margin:2px 0 12px;color:#64748b;font-size:12px">${new Date(order.created_at || Date.now()).toLocaleString('id-ID')}</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px">
        <thead><tr style="background:#f8fafc;color:#475569">
          <th align="left" style="padding:8px 6px">Produk</th>
          <th style="padding:8px 6px;width:60px">Qty</th>
          <th align="right" style="padding:8px 6px;width:100px">Subtotal</th>
        </tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <table style="width:100%;margin-top:12px;font-size:13px">
        <tr><td style="color:#64748b;padding:3px 0">Subtotal</td><td align="right" style="padding:3px 0">${rupiah(order.subtotal)}</td></tr>
        <tr><td style="color:#64748b;padding:3px 0">Ongkir (${escapeHtml(m.name || '-')})</td><td align="right" style="padding:3px 0">${rupiah(order.shipping_cost)}</td></tr>
        ${Number(order.payment_fee) > 0 ? `<tr><td style="color:#64748b;padding:3px 0">Kode unik</td><td align="right" style="padding:3px 0">${rupiah(order.payment_fee)}</td></tr>` : ''}
        <tr><td style="border-top:1px solid #e2e8f0;padding-top:8px;font-weight:800">Total</td><td align="right" style="border-top:1px solid #e2e8f0;padding-top:8px;font-weight:800;color:#0891B2">${rupiah(order.total)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      <p style="margin:0;color:#0f172a;font-weight:800">Pengiriman</p>
      <p style="margin:4px 0 0;color:#475569;font-size:13px">${escapeHtml(a.fullName || '')} · ${escapeHtml(a.phone || '')}<br>${escapeHtml(a.email || order.customer_email || '')}</p>
      ${addressBlock}
      <p style="margin:8px 0 0;font-size:12px;color:#0891B2;font-weight:800">${escapeHtml(m.name || '')} ${m.eta ? '· ' + escapeHtml(m.eta) : ''}</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:14px 0"/>
      ${qrisBlock}
      <p style="margin:14px 0 0;font-size:11px;color:#94a3b8;text-align:center">Email otomatis · Fluently Shop</p>
    </div>
  </body></html>`;
}

module.exports = {
  normalizeWaPhone,
  sendWhatsApp,
  buildOrderWaText,
  mailer,
  outboxDir,
  sendEmail,
  rupiah,
  escapeHtml,
  buildWelcomeEmailHtml,
  buildToeflCompletionEmailHtml,
  buildOrderEmailHtml,
};
