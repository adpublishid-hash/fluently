# Deploy Fluently ke VPS

Panduan ini memasang Fluently di VPS **Ubuntu 22.04 / 24.04** dengan susunan berikut:

```
Browser ──HTTPS──> nginx :443 ──> Node.js (Express) :4000 ──> PostgreSQL :5432
                     │                 └─ menyajikan frontend (dist/) + API (/api/*)
                     └─ /audio/ ──> /var/www/fluently-audio (file audio TTS, opsional)
```

- Satu proses Node (`server/index.js`) melayani **API** dan **frontend hasil build** (`dist/`).
- Tabel database **dibuat otomatis** saat server start (`server/db/schema.js`), termasuk akun admin, produk shop, dan pengaturan shop.

Spesifikasi minimal: 1 vCPU, 1–2 GB RAM, 20 GB disk. Tambah disk kalau semua audio dibuat.

---

## 1. Siapkan server

```bash
# Login sebagai root/sudoer lalu update sistem
sudo apt update && sudo apt upgrade -y

# Paket dasar (build-essential & python3 untuk modul native bcrypt)
sudo apt install -y git curl nginx ufw build-essential python3 ffmpeg

# Node.js 22 (LTS)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # harus v22.x

# PostgreSQL
sudo apt install -y postgresql
sudo systemctl enable --now postgresql

# Firewall: hanya SSH + HTTP/HTTPS yang dibuka. Port 4000 & 5432 tetap tertutup dari luar
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Buat user khusus aplikasi (jangan jalankan aplikasi sebagai root):

```bash
sudo adduser --disabled-password --gecos "" fluently
```

---

## 2. Database PostgreSQL

Ganti `PASSWORD_DB_KUAT` dengan password acak, misalnya dari `openssl rand -hex 24`:

```bash
sudo -u postgres psql <<'SQL'
CREATE USER fluently WITH PASSWORD 'PASSWORD_DB_KUAT';
CREATE DATABASE fluently OWNER fluently;
SQL
```

Cek koneksi:

```bash
PGPASSWORD='PASSWORD_DB_KUAT' psql -h 127.0.0.1 -U fluently -d fluently -c 'select now();'
```

---

## 3. Ambil kode

```bash
sudo -iu fluently
git clone https://github.com/adpublishid-hash/fluently.git
cd fluently
git checkout main        # atau branch rilis yang ingin dideploy
```

> Semua perubahan terbaru ada di branch `claude/gifted-brown-t782f6`. Merge dulu ke `main`, atau checkout branch itu jika ingin mengetesnya langsung.

---

## 4. Konfigurasi environment

### 4a. Backend: `server/.env`

Server membaca `server/.env` sendiri, tanpa dotenv. Tulis format `KUNCI=nilai`, satu per baris, **tanpa tanda kutip**.

```bash
nano ~/fluently/server/.env
chmod 600 ~/fluently/server/.env
```

Isi contoh (sesuaikan semua nilai):

```env
# ── Wajib ─────────────────────────────────────────────
NODE_ENV=production
PORT=4000

DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=fluently
DB_USER=fluently
DB_PASSWORD=PASSWORD_DB_KUAT

# openssl rand -hex 48
JWT_SECRET=GANTI_DENGAN_STRING_ACAK_PANJANG
JWT_EXPIRES_IN=7d

# Akun admin dibuat otomatis saat start pertama
ADMIN_EMAIL=admin@domainmu.com
ADMIN_PASSWORD=PASSWORD_ADMIN_KUAT

PUBLIC_APP_URL=https://domainmu.com
CORS_ORIGINS=https://domainmu.com,https://www.domainmu.com

# Email (reset password, notifikasi order). WAJIB di production
SMTP_HOST=smtp.domainmu.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=no-reply@domainmu.com
SMTP_PASS=PASSWORD_SMTP
SMTP_FROM=no-reply@domainmu.com
SMTP_FROM_NAME=Fluently

# Ongkir shop. WAJIB di production
RAJAONGKIR_KEY=KEY_RAJAONGKIR

# WhatsApp OneSender. ONESENDER_KEY WAJIB di production
ONESENDER_URL=https://URL_ONESENDER
ONESENDER_KEY=KEY_ONESENDER
ONESENDER_ADMIN_PHONE=628xxxxxxxxxx

# ── AI (Kie AI, key server) ───────────────────────────
KIE_API_KEY=KEY_KIE_AI
KIE_MODEL=gemini-3-8-flash
# KIE_BASE_URL=https://api.kie.ai

# Kuota AI harian per user; setelah habis, user bisa memakai key AI Studio sendiri
AI_DAILY_QUOTA_FREE=10
AI_DAILY_QUOTA_PRO=100
AI_DAILY_QUOTA_LIFETIME=150
BYOK_GEMINI_MODEL=gemini-2.5-flash

# ── Opsional ──────────────────────────────────────────
SUPPORT_EMAIL=support@domainmu.com
ORDER_NOTIFY_EMAIL=admin@domainmu.com
GOOGLE_CLIENT_ID=CLIENT_ID_GOOGLE_LOGIN
QRIS_IMAGE_URL=https://domainmu.com/qris.png
RESET_TOKEN_TTL_MIN=30
DAILY_XP_CAP=3000
```

Catatan penting:
- Di `NODE_ENV=production`, server **langsung berhenti** dengan pesan `Missing required environment variable: …` jika salah satu variabel wajib berikut kosong: `JWT_SECRET`, `ADMIN_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `RAJAONGKIR_KEY`, `ONESENDER_KEY`.
- `ADMIN_PASSWORD` **hanya dipakai saat akun admin pertama kali dibuat**. Setelah itu, mengubah nilainya di `.env` tidak mengganti password. Ganti lewat fitur reset password.
- Jika `KIE_API_KEY` kosong, fitur AI memakai key AI Studio milik user (BYOK), atau menampilkan pesan "butuh API key".
- **Jangan pernah** commit `server/.env`. File ini sudah ada di `.gitignore`.

### 4b. Frontend (saat build): `.env.production` di root repo

Variabel `VITE_*` ditanam ke JavaScript saat `npm run build`, bukan saat server jalan.

```bash
nano ~/fluently/.env.production
```

```env
# Client ID Google Sign-In (samakan dengan GOOGLE_CLIENT_ID di server)
VITE_GOOGLE_CLIENT_ID=CLIENT_ID_GOOGLE_LOGIN
# Opsional: lokasi audio TTS. Default /audio (disajikan nginx, lihat langkah 6)
# VITE_AUDIO_BASE_URL=https://cdn.domainmu.com/audio
```

---

## 5. Install & build

```bash
cd ~/fluently
npm ci                               # dependensi frontend + tools build
npm run build                        # hasil di dist/
npm ci --prefix server --omit=dev    # dependensi backend saja
```

Tes jalan manual sebentar:

```bash
cd ~/fluently/server
NODE_ENV=production node index.js
# Harus muncul:
#   Fluently API running on http://localhost:4000
#   PostgreSQL connected
# Stop dengan Ctrl+C
```

Kembali ke user sudo: `exit`.

---

## 5b. Jalankan sebagai service (systemd)

```bash
sudo nano /etc/systemd/system/fluently.service
```

```ini
[Unit]
Description=Fluently (API + web)
After=network.target postgresql.service
Requires=postgresql.service

[Service]
Type=simple
User=fluently
WorkingDirectory=/home/fluently/fluently/server
Environment=NODE_ENV=production
ExecStart=/usr/bin/node index.js
Restart=always
RestartSec=5
# Batasi hak proses
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now fluently
sudo systemctl status fluently          # harus "active (running)"
journalctl -u fluently -f               # lihat log (Ctrl+C untuk keluar)
curl -s http://127.0.0.1:4000/api/health   # {"status":"ok"}
```

---

## 6. Nginx + HTTPS

Arahkan DNS **A record** `domainmu.com` (dan `www`) ke IP VPS terlebih dahulu.

Siapkan folder audio (dipakai oleh [AUDIO_GENERATION.md](./AUDIO_GENERATION.md), Cara A):

```bash
sudo mkdir -p /var/www/fluently-audio
sudo chown fluently:fluently /var/www/fluently-audio
```

Buat konfigurasi situs:

```bash
sudo nano /etc/nginx/sites-available/fluently
```

```nginx
server {
    listen 80;
    server_name domainmu.com www.domainmu.com;

    client_max_body_size 2m;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    # Audio TTS hasil generate: file tidak pernah berubah (nama = hash teks)
    location /audio/ {
        alias /var/www/fluently-audio/;
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable";
        location = /audio/manifest.json {
            alias /var/www/fluently-audio/manifest.json;
            add_header Cache-Control "no-cache";
        }
    }

    # Semua request lain (frontend + /api) diteruskan ke Node
    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;   # permintaan AI bisa butuh waktu
    }
}
```

> Belum membuat audio? Tidak masalah. Buat file kosong dulu agar aplikasi tidak menerima 404:
> `echo '{"version":1,"generatedAt":null,"files":{}}' | sudo -u fluently tee /var/www/fluently-audio/manifest.json`

Aktifkan situs dan pasang SSL gratis (Let's Encrypt):

```bash
sudo ln -s /etc/nginx/sites-available/fluently /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domainmu.com -d www.domainmu.com
# pilih redirect HTTP -> HTTPS. Perpanjangan otomatis sudah diatur certbot
```

Buka `https://domainmu.com`. Halaman awal Fluently harus tampil. Login admin memakai `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

---

## 7. Verifikasi

```bash
curl -s https://domainmu.com/api/health                  # {"status":"ok"}
curl -sI https://domainmu.com/ | head -5                 # 200, ada Strict-Transport-Security
curl -s https://domainmu.com/audio/manifest.json | head -c 200
```

Smoke test API lengkap (opsional). Perhatian: test ini **membuat akun uji** `smoke-<waktu>@example.com` di database:

```bash
sudo -iu fluently
cd ~/fluently/server && API_URL=https://domainmu.com npm run smoke
```

---

## 8. Audio TTS (opsional tapi disarankan)

Ikuti [AUDIO_GENERATION.md](./AUDIO_GENERATION.md). Ringkasnya, sebagai user `fluently`:

```bash
cd ~/fluently
export GEMINI_API_KEY=AIza...     # key AI Studio, khusus untuk script ini
npm run audio:generate -- --dry-run
npm run audio:generate -- --out /var/www/fluently-audio --limit 300
```

Tidak perlu restart atau build ulang. nginx langsung menyajikan file baru.

---

## 9. Update ke versi baru

```bash
sudo -iu fluently
cd ~/fluently
git pull
npm ci
npm run build
npm ci --prefix server --omit=dev
exit
sudo systemctl restart fluently
```

- Perubahan skema database dijalankan otomatis saat start, lewat `create … if not exists` / `alter … add column if not exists`.
- User akan menerima versi baru setelah menutup dan membuka lagi tab aplikasi (service worker). Jika `public/sw.js` berubah versi cache, cache lama dibersihkan otomatis.
- Jika ada konten baru, jalankan juga `npm run audio:generate -- --out /var/www/fluently-audio` untuk membuat audionya.

Opsional, script sekali jalan `~/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /home/fluently/fluently
git pull
npm ci
npm run build
npm ci --prefix server --omit=dev
sudo systemctl restart fluently
curl -fsS http://127.0.0.1:4000/api/health && echo " deploy OK"
```

Agar user `fluently` bisa me-restart service tanpa password, tambahkan lewat `sudo visudo -f /etc/sudoers.d/fluently`:
```
fluently ALL=NOPASSWD: /bin/systemctl restart fluently
```

---

## 10. Backup database

Backup harian otomatis, disimpan 14 hari:

```bash
sudo mkdir -p /var/backups/fluently && sudo chown postgres /var/backups/fluently
sudo crontab -u postgres -e
```

Tambahkan baris:

```cron
30 2 * * * pg_dump -Fc fluently > /var/backups/fluently/fluently-$(date +\%F).dump && find /var/backups/fluently -name '*.dump' -mtime +14 -delete
```

Restore:

```bash
sudo -u postgres pg_restore --clean --if-exists -d fluently /var/backups/fluently/fluently-2026-01-01.dump
```

Salin juga backup ke luar VPS (object storage atau komputer lain) secara berkala.

---

## 11. Checklist keamanan

- [ ] `JWT_SECRET` acak dan panjang (`openssl rand -hex 48`). Jangan pakai nilai contoh.
- [ ] `ADMIN_PASSWORD` kuat, dan diganti lewat aplikasi setelah login pertama.
- [ ] **Rotasi `FREE_GEMINI_API_KEY` lama**: key itu pernah ter-commit di riwayat git. Cabut di Google AI Studio lalu buat baru bila masih dibutuhkan.
- [ ] Riwayat git masih memuat data pribadi lama. Membersihkannya memerlukan rewrite history + force-push (keputusan pemilik repo).
- [ ] `server/.env` dengan izin `600`, dan tidak di-commit.
- [ ] Port 4000 dan 5432 tidak terbuka ke internet (`sudo ufw status`).
- [ ] SSH memakai key, dengan login password dimatikan (`PasswordAuthentication no` di `/etc/ssh/sshd_config`).
- [ ] Backup database berjalan (cek `/var/backups/fluently`).

---

## Troubleshooting

| Gejala | Penyebab / solusi |
|---|---|
| Service langsung mati, log: `Missing required environment variable: X` | Isi variabel `X` di `server/.env`, lalu `sudo systemctl restart fluently` |
| Log: `ECONNREFUSED 127.0.0.1:5432` / `password authentication failed` | PostgreSQL mati, atau `DB_*` salah. Cek `sudo systemctl status postgresql` dan tes dengan `psql` (langkah 2) |
| nginx `502 Bad Gateway` | Node tidak jalan. Lihat `journalctl -u fluently -n 100` |
| Halaman putih / 404 saat refresh di sub-halaman | `dist/` belum dibuild. Jalankan `npm run build` di root repo lalu restart |
| Login Google gagal | `VITE_GOOGLE_CLIENT_ID` (saat build) dan `GOOGLE_CLIENT_ID` (server) harus sama, dan domain harus terdaftar di Google Cloud Console (Authorized JavaScript origins) |
| Error CORS di console | Tambahkan domain ke `CORS_ORIGINS` (pisahkan dengan koma) lalu restart |
| AI selalu minta API key | `KIE_API_KEY` kosong atau salah, atau kuota harian user habis (`AI_DAILY_QUOTA_*`) |
| Email reset password tidak terkirim | Cek `SMTP_*`. Log start akan memuat error `mailer.verify()` |
| `npm ci` gagal di `bcrypt` | Pastikan `build-essential` dan `python3` terpasang (langkah 1) |
| Perubahan tidak muncul di browser | Service worker masih memegang versi lama. Tutup semua tab aplikasi lalu buka lagi |
