# Membuat Audio Rekaman (Pre-generated TTS)

Kalimat, bacaan, kosakata, dan contoh lesson bisa diputar dari **file audio rekaman** hasil Gemini TTS. Kalau file untuk suatu teks belum ada, aplikasi otomatis memakai **TTS browser** (suara bawaan HP/laptop), jadi aplikasi tetap jalan walau audio belum dibuat.

Setiap ada konten baru (misalnya kalimat HSK 5–9 atau bacaan N5), teksnya **otomatis masuk daftar** script `npm run audio:generate`. File audionya baru ada setelah script itu dijalankan.

---

## Cara kerja singkat

| Bagian | Lokasi | Fungsi |
|---|---|---|
| Script generator | `scripts/generate-audio.ts` | Mengumpulkan semua teks, memanggil Gemini TTS, menyimpan file audio |
| Nama file | `src/services/audioKey.ts` | Nama file = hash teks, contoh `zh/9f2c…e1.mp3`. Teks yang sama selalu menghasilkan nama file yang sama |
| Daftar file | `<folder audio>/manifest.json` | Peta `kunci → nama file`. Aplikasi membaca file ini untuk tahu audio mana yang tersedia |
| Pemutar | `src/services/audioLibrary.ts` + `src/utils/speech.ts` | Putar rekaman jika ada di manifest, jika tidak pakai TTS browser |
| Service worker | `public/sw.js` | Menyimpan audio yang sudah diputar (cache-first), jadi bisa diputar offline |

Script **melewati file yang sudah ada**. Jadi aman dijalankan berulang kali. Kalau terhenti, jalankan lagi untuk melanjutkan.

---

## Persiapan (sekali saja)

1. **API key Google AI Studio**
   - Buka https://aistudio.google.com/apikey lalu buat API key.
   - Key ini khusus untuk script, **bukan** key server (`KIE_API_KEY`). Jangan di-commit ke git.

2. **Node.js 22** dan dependensi lengkap (termasuk devDependencies, karena script memakai `vite-node`):
   ```bash
   cd /path/ke/fluently
   npm ci
   ```

3. **ffmpeg** (disarankan) supaya output berupa MP3 kecil (48 kbps), bukan WAV besar:
   ```bash
   # Ubuntu/Debian
   sudo apt install -y ffmpeg
   # macOS
   brew install ffmpeg
   ```
   Tanpa ffmpeg script tetap jalan, tetapi file berformat WAV sekitar 10× lebih besar.

---

## Langkah 1: Cek dulu berapa yang perlu dibuat (dry run)

Dry run tidak memanggil API dan tidak butuh key:

```bash
npm run audio:generate -- --dry-run
```

Contoh output:

```
scope=core texts=4630 alreadyGenerated=0 pending=4630
│ en │ 1703 │ 109739 │
│ ja │  440 │  14641 │
│ zh │ 1228 │  27721 │
│ ar │ 1259 │  83832 │
```

Ada dua cakupan (`--scope`):

| Scope | Isi | Perkiraan jumlah teks |
|---|---|---|
| `core` (default) | Semua bacaan (4 bahasa), kalimat tema HSK 5–9, model jawaban rubrik, kalimat bank Inggris, lesson Inggris tambahan | ± 4.600 |
| `all` | `core` + semua contoh, kosakata, dan pola di lesson Mandarin, Jepang, dan Arab B1–Scholar | ± 7.800 |

Mulailah dari `core`.

---

## Langkah 2: Tentukan folder output

Pilih salah satu cara:

### Cara A (disarankan untuk VPS): folder di luar repo

Audio disimpan di luar folder git, lalu disajikan langsung oleh nginx. Dengan cara ini:
- repo tidak membengkak (ribuan file mp3),
- `git pull` tidak bentrok dengan `manifest.json`,
- `npm run build` tidak menghapus audio.

```bash
sudo mkdir -p /var/www/fluently-audio
sudo chown $USER /var/www/fluently-audio
```

Konfigurasi nginx `location /audio/` ada di [DEPLOY_VPS.md](./DEPLOY_VPS.md#6-nginx--https).

### Cara B: `public/audio` (default)

Tanpa opsi `--out`, file masuk ke `public/audio/`. Vite menyalinnya ke `dist/audio/` saat `npm run build`.

Kekurangan cara ini: `public/audio/manifest.json` ikut dilacak git, jadi `git pull` bisa bentrok. Setelah membuat audio, `npm run build` juga harus dijalankan ulang.

---

## Langkah 3: Jalankan generator

```bash
export GEMINI_API_KEY=AIza...        # key dari AI Studio

# Cara A (folder di luar repo)
npm run audio:generate -- --out /var/www/fluently-audio

# Cara B (public/audio)
npm run audio:generate
```

### Opsi yang berguna

| Opsi | Contoh | Fungsi |
|---|---|---|
| `--scope` | `--scope all` | `core` (default) atau `all` |
| `--lang` | `--lang zh,ja` | Hanya bahasa tertentu (`en`, `ja`, `zh`, `ar`) |
| `--limit` | `--limit 300` | Maksimal N file per sekali jalan. Berguna untuk kuota harian |
| `--out` | `--out /var/www/fluently-audio` | Folder output (default `public/audio`) |
| `--concurrency` | `--concurrency 1` | Jumlah request paralel (default 2). Turunkan jika sering kena 429 |
| `--dry-run` | | Hanya menghitung, tanpa memanggil API |

Variabel environment tambahan (opsional):

| Variabel | Default | Fungsi |
|---|---|---|
| `GEMINI_API_KEY` | (wajib) | Key AI Studio. `FREE_GEMINI_API_KEY` juga dibaca sebagai cadangan |
| `GEMINI_TTS_MODEL` | `gemini-2.5-flash-preview-tts` | Model TTS |

### Contoh per tahap (aman untuk kuota gratis)

```bash
# Hari 1: Mandarin dan Jepang, 300 file dulu
npm run audio:generate -- --out /var/www/fluently-audio --lang zh,ja --limit 300

# Hari berikutnya: lanjutkan (file yang sudah ada otomatis dilewati)
npm run audio:generate -- --out /var/www/fluently-audio --lang zh,ja --limit 300

# Setelah core selesai, lanjut ke scope all
npm run audio:generate -- --out /var/www/fluently-audio --scope all --limit 300
```

Selama berjalan, script:
- menyimpan `manifest.json` setiap 20 file,
- mencoba ulang otomatis (hingga 5×, dengan jeda makin panjang) jika kena **429 / rate limit** atau error 5xx,
- mencetak `skip <kunci>: TTS failed (...)` untuk teks yang gagal. Teks itu akan dicoba lagi pada run berikutnya.

Di akhir muncul ringkasan, misalnya: `Done: 300 generated, 2 failed. Format: mp3.`

> **Kuota:** AI Studio versi gratis punya batas request per menit dan per hari. Jika banyak `skip … (429)`, hentikan dulu dan lanjutkan besok, atau gunakan akun berbayar.

---

## Langkah 4: Terapkan ke aplikasi

**Cara A (nginx):** tidak perlu build ulang. Begitu file dan `manifest.json` ada di `/var/www/fluently-audio`, audio langsung terpakai.

**Cara B (`public/audio`):**
```bash
npm run build
sudo systemctl restart fluently   # jika server sudah jalan sebagai service
```

**Membuat audio di laptop lalu upload ke VPS:**
```bash
npm run audio:generate -- --out ./audio-out
rsync -avz ./audio-out/ user@IP_VPS:/var/www/fluently-audio/
```

**Audio di CDN/domain lain (opsional):** set saat build frontend:
```bash
VITE_AUDIO_BASE_URL=https://cdn.domainmu.com/audio npm run build
```
Aplikasi lalu memuat `https://cdn.domainmu.com/audio/manifest.json` dan file-file di sana. Pastikan CDN mengizinkan CORS untuk domain aplikasi.

---

## Langkah 5: Cek hasilnya

1. Pastikan manifest bisa diakses:
   ```bash
   curl -s https://domainmu.com/audio/manifest.json | head -c 300
   ```
   Harus berisi `"files": { "zh/…": "zh/….mp3", … }`.
2. Buka satu bacaan di `/bacaan/mandarin`, putar sebuah kalimat, lalu buka DevTools → Network. Harus ada request ke `/audio/zh/….mp3` dengan status 200.
3. Jika yang terdengar masih suara browser, kemungkinan penyebabnya:
   - teks itu belum dibuat (cek ringkasan dry run),
   - `manifest.json` lama masih di-cache browser. Tutup semua tab aplikasi lalu buka lagi.

---

## Kapan perlu dijalankan lagi?

Setiap kali konten bertambah atau teks diubah, misalnya kalimat baru, bacaan baru, atau perbaikan pinyin/harakat pada teks yang diucapkan. Teks yang berubah otomatis dapat nama file baru. File lama tidak dihapus, tetapi tidak dipakai lagi.

```bash
git pull
npm ci
npm run audio:generate -- --dry-run                     # lihat berapa yang baru
npm run audio:generate -- --out /var/www/fluently-audio # buat yang baru saja
```

---

## Troubleshooting

| Gejala | Penyebab / solusi |
|---|---|
| `Set GEMINI_API_KEY (or FREE_GEMINI_API_KEY) to generate audio.` | Key belum di-export di shell. Jalankan `export GEMINI_API_KEY=...` |
| Banyak `skip … TTS failed (429)` | Kuota/rate limit. Turunkan `--concurrency 1`, pakai `--limit`, atau lanjutkan besok |
| `skip … TTS failed (400/403)` | Key salah atau tidak aktif, atau model TTS tidak tersedia untuk akunmu. Cek di AI Studio atau set `GEMINI_TTS_MODEL` |
| File berakhiran `.wav` | ffmpeg belum terpasang. Install ffmpeg lalu hapus file `.wav` dan entri manifest-nya, atau biarkan saja (tetap bisa diputar) |
| `vite-node: not found` | Jalankan `npm ci` (bukan `npm ci --omit=dev`) |
| Audio 404 di produksi | Cek `location /audio/` di nginx (Cara A), atau lupa `npm run build` (Cara B) |
