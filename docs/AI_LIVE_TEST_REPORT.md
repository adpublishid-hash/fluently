# Laporan Uji Live Fitur AI (Kie AI)

Tanggal uji: 23 Oktober 2026 · Branch: `claude/ai-live-test` (gabungan PR #3 + #5 + #6 dari `claude/chat-mistake-notebook` dan PR #4 `claude/ai-exam-generator`).

Semua panggilan memakai model **asli** lewat API lokal (`server/index.js` + PostgreSQL 16), dengan user uji berplan `lifetime`. Tidak ada hasil yang di-mock.

## Ringkasan

| Hal | Hasil |
| --- | --- |
| Model | `gemini-3-8-flash-openai` di Kie AI (default lama `gemini-3-8-flash` **ditolak** Kie, lihat Masalah #1) |
| Jumlah panggilan AI | ±115 (104 lewat endpoint server + 11 panggilan langsung untuk cek model dan `reasoning_effort`) |
| Endpoint diuji | `localized-lesson`, `localized-feedback`, `localized-assist`, `localized-report`, `exam-section`, `/api/chat/mistakes` |
| Uji pertama | 57 dari 67 request HTTP berhasil. 9 gagal karena error upstream Kie (524), 1 karena JSON rusak dari model |
| Setelah perbaikan | 21/21 kasus yang diuji ulang berhasil, termasuk semua yang sebelumnya gagal |
| Cek lokal | `typecheck`, `lint` (0 error, 366 warning lama), `npm test` (820), server test (42), `build`, smoke test: semua lulus |

Kualitas konten secara umum **bagus**. Aksara dan cara baca tepat, level sesuai, penjelasan dalam bahasa Indonesia natural, kunci jawaban ujian yang dicek manual semuanya benar. Masalah terbesar justru di sisi infrastruktur: slug model salah, error upstream yang sering, dan latensi tinggi.

## Tabel lulus/gagal

Keterangan: ✅ lulus validasi dan konten benar · ⚠️ lulus tapi ada catatan kecil · ❌→✅ gagal di uji pertama, lulus setelah perbaikan atau uji ulang.

### Pelajaran (`/api/ai/localized-lesson`)

| Bahasa | Vocabulary A1 | Grammar A1 | Pronunciation A1 | Speaking A1 | Reading A1 | Writing A1 | Grammar B1 | Reading B1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| English | (endpoint lain) | ✅ | (endpoint lain) | ❌→✅ JSON rusak | ✅ | ✅ | ✅ | ✅ |
| Japanese | ⚠️ 167 dtk | ✅ | ⚠️→✅ reading tidak cocok | ✅ | ✅ | ✅ | ✅ | ⚠️ satu kanji tertinggal di reading |
| Mandarin | ✅ | ❌→✅ 524 upstream | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Arabic | ✅ | ✅ | ⚠️ tip ز salah | ⚠️→✅ transliterasi | ✅ | ✅ | ⚠️ transliterasi | ⚠️→✅ transliterasi |

### Feedback, assist, report, mistake notebook

| Bahasa | Feedback salah #1 | Feedback salah #2 | Feedback benar | Assist | Report | Review mistake |
| --- | --- | --- | --- | --- | --- | --- |
| English | ✅ "I very like" → *really like* | ⚠️→✅ "She go" (skor 1 / status *almost*) | ✅ 100 | ✅ ask "did" | ✅ | (tidak diuji) |
| Japanese | ✅ 私が → 私は | ❌→✅ 524, ulang: 行きました | ❌→✅ 524, ulang: correct 96 | ❌→✅ 524 ask + hint, ulang ✅ (romaji へ "he" → diperbaiki "e") | ✅ | ✅ |
| Mandarin | ✅ 我是很高兴 → 我很高兴 | ✅ 三书 → 三本书 | ❌→✅ 524, ulang: correct 95 | ✅ ask 了/过 | ✅ | ✅ |
| Arabic | ❌→✅ 524, ulang: هذه مدرسة كبيرة ✅ | ✅ ذهبت الطالب → ذهب الطالب | ✅ 95 | ❌→✅ 524 ask, ulang ✅; example ✅ | ✅ | (tidak diuji) |

Mistake notebook: `POST /api/chat/mistakes` menyimpan 2 item JA + 1 item ZH, dan `GET` mengembalikannya (urut terbaru). Pelajaran dengan `review` benar-benar melatih item tersebut. Grammar JA disusun di sekitar partikel へ, dan pasangan persis 東京を行きます → 東京へ行きます muncul di bagian "Kesalahan". Speaking ZH dibangun di sekitar 一本书/这本书.

### Ujian (`/api/ai/exam-section`)

| Bagian | Item | `verified` | `dropped` | Cek manual kunci |
| --- | --- | --- | --- | --- |
| JLPT N5 文字・語彙 | 8/8 | ya | 0 | 8/8 benar |
| JLPT N5 文法 | 6/6 | ya | 0 | 6/6 benar (termasuk 3 soal ★ 文の組み立て) |
| JLPT N5 読解 | 8/8 | ya | 0 | benar; 1 soal "apa yang *tidak* dilakukan" agak lemah |
| JLPT N5 聴解 | 8/8 | ya | 0 | benar, skrip 男：/女： rapi |
| HSK 3 听力 | 10/10 | ya | 0 | benar, tapi urutan 对/错 teracak (diperbaiki) |
| HSK 3 阅读 | 10/10 | ya | 0 | sampel benar |
| HSK 3 词汇 | 10/10 | ya | 0 | 10/10 benar |
| HSK 3 书写 | 1 tugas | – | – | tugas paragraf dengan 3 kata, wajar |
| TOAFL Pemula فهم المسموع | 10/10 | ya | 0 | sampel benar |
| TOAFL Pemula التراكيب | 10/10 | ya | 0 | 10/10 benar, tapi urutan opsi تحديد الخطأ teracak (diperbaiki) |
| TOAFL Pemula فهم المقروء | 10/10 | ya | 0 | sampel benar |
| CEFR B1 Reading | 8/8 | ya | 0 | sampel benar |
| CEFR B1 Grammar | 8/8 | ya | 0 | 8/8 benar, tapi urutan opsi error recognition teracak (diperbaiki) |

Catatan: verifikasi memakai model yang sama, jadi `dropped = 0` bukan bukti mutlak. Karena itu kunci jawaban dicek manual. Tidak ditemukan kunci yang salah.

## Latensi

| Endpoint | Request | Gagal | Min | Median | Maks |
| --- | --- | --- | --- | --- | --- |
| localized-lesson | 37 | 2 | 16 dtk | 40 dtk | 167 dtk |
| localized-feedback | 18 | 4 | 20 dtk | 25 dtk | 45 dtk |
| localized-assist | 10 | 3 | 22 dtk | 24 dtk | 29 dtk |
| localized-report | 6 | 0 | 27 dtk | 33 dtk | 34 dtk |
| exam-section (generate + verify) | 17 | 0 | 28 dtk | 78 dtk | 178 dtk |

Latensi didominasi token "thinking" yang tersembunyi. Contohnya, vocabulary JA memakai 564 token prompt dan 2.512 token jawaban, tetapi `total_tokens` mencapai 10.563. Vocabulary dan pronunciation paling lambat (JA vocab 167 dtk, JA pronunciation 93 dtk). Tiga request menggantung sampai gateway Kie memutus di **300 dtk** (HTTP 524).

## Contoh output (dipersingkat)

**Japanese, Speaking A1 (Di stasiun kereta)**
> 東京まで一枚ください。 — とうきょう まで いちまい ください。 · toukyou made ichimai kudasai. = Tolong satu tiket sampai ke Tokyo.

**Japanese, Feedback** "私が学生です。インドネシアから来ました。" → `almost 65`, corrected 私は学生です。… "Untuk memperkenalkan topik diri sendiri, gunakan は (wa)…"

**Mandarin, Vocabulary A1**
> 几点 · jǐ diǎn · jam berapa — "Tone sandhi: karena dua nada 3 berdampingan, 几 dibaca nada 2 (jí diǎn)."

**Mandarin, Report** "我买两张票给我和朋友。" → 我给我和朋友买两张票。 "frasa 给 + orang umumnya diletakkan sebelum kata kerja…"

**Arabic, Grammar A1 (Belanja dan harga)**
> هٰذَا بِثَلَاثَةِ رِيَالَاتٍ. — haadzaa bitsalaatsati riyaalaatin. = Ini seharga tiga riyal. (kaidah bilangan-ma'dud benar)

**Arabic, Feedback** "هذا مدرسة كبير" → `incorrect 30`, corrected هٰذِهِ مَدْرَسَةٌ كَبِيرَةٌ, dengan dua kesalahan gender dijelaskan (هذا→هذه, كبير→كبيرة).

**English, Grammar B1**
> If this shirt is on sale, I will buy two. /ɪf ðɪs ʃɜrt ɪz ɑn seɪl aɪ wɪl baɪ tuː/ = Jika kemeja ini sedang diskon, saya akan membeli dua.

**English, Report** "What time the train leave?" → "What time does the train leave?" "…gunakan kata kerja bantu 'does' sebelum subjek."

## Masalah yang ditemukan dan perbaikannya

| # | Masalah | Tingkat | Perbaikan | Uji ulang |
| --- | --- | --- | --- | --- |
| 1 | Default `KIE_MODEL=gemini-3-8-flash` ditolak Kie dengan `422 "The model is not supported"`. **Semua fitur AI berbayar server gagal (502)** dengan konfigurasi default. Endpoint OpenAI-compatible untuk model ini adalah `gemini-3-8-flash-openai`. | **Kritis** | Default diganti ke `gemini-3-8-flash-openai` (`server/config.js`, `.env.example`, README). **Cek juga nilai `KIE_MODEL` di server produksi.** | ✅ semua uji memakai slug baru |
| 2 | Error upstream Kie `524 "2 times retry fail"` (±15 dtk) atau gateway timeout 300 dtk, pada 9 dari 67 request di uji pertama (±13%). Request langsung gagal 502 dan kuota di-refund. | Tinggi | `callAiJson` mengulang **sekali** jika provider memberi 5xx dalam < 60 dtk. Timeout panjang tidak diulang supaya user tidak menunggu 2×. | ✅ semua kasus 524 lulus saat diulang (pada uji ulang tidak ada 5xx lagi, jadi retry belum teramati langsung) |
| 3 | Model menulis nilai IPA tanpa tanda kutip (`"exampleReading": /ˈbrʌðər/,`). JSON tidak valid, sehingga speaking English gagal 502. | Sedang | Parser baru `parseJsonObject` (`server/lib/aiProvider.js`) mencoba ulang dengan mengutip nilai `/…/` yang telanjang. Ada unit test. | ✅ |
| 4 | Feedback: status dan skor tidak konsisten (`almost` dengan skor **1**). Skala skor tidak pernah dijelaskan di prompt. | Sedang | Prompt menetapkan pita skor: correct 85-100, almost 50-84, incorrect 0-49. | ✅ "She go…" → almost 70; jawaban off-task → incorrect 20; jawaban benar 95-96 |
| 5 | Transliterasi Arab tidak konsisten: ظ ditulis *dz* dan *zh* bergantian (yantadziru vs intizhaari), dan vokal "o" muncul setelah huruf tebal (qithooru, tadzkirotun, faqoth, aqooribi). | Sedang | Spec `reading` Arab kini berisi tabel huruf tetap (ث ts, ذ dz, ص sh, ض dh, ط th, ظ zh, …) dan hanya vokal a/i/u. Report juga diberi aturan reading ini. | ✅ qithaari, tadzkiratul, yantazhiru |
| 6 | Opsi ujian teracak padahal formatnya mengunci urutan: HSK 判断对错 keluar 错/对, dan opsi تحديد الخطأ / error recognition tidak lagi mengikuti tanda (أ)-(د) / [A]-[D] di soal. | Sedang | Item 2 opsi tidak diacak. Opsi find-the-error yang stem-nya memuat tanda diurutkan sesuai posisi di stem. Prompt grammar English kini meminta tanda [A]-[D] seperti TOAFL. Ada unit test. | ✅ 对/错 berurutan; opsi Arab dan English mengikuti tanda; kunci tetap benar |
| 7 | Reading Jepang tidak cocok dengan kalimat (妹は三人**います** dibaca …さんにん**です**), satu kanji tertinggal di reading B1 (しごとの**話**), romaji *kidzuku* (bukan Hepburn), dan partikel へ diromanisasi "**he**". | Rendah | Spec reading: hiragana harus teks yang sama persis dengan semua kanji dikonversi; づ = zu; partikel は/へ/を = wa/e/o. | ✅ 12/12 reading pronunciation cocok; hint: "kyouto e ikimasu" |
| 8 | `category` report berupa teks bebas ("A1 - Pemula", "A1 (HSK 1)", "Bagus", "Cukup"). Di klien ditampilkan tepat di bawah "Level:", jadi sering berulang. | Rendah | Prompt membatasi ke "Sangat baik" / "Baik" / "Cukup" / "Perlu latihan" sesuai skor. | ✅ "Cukup" untuk skor 68 |
| 9 | Latensi tinggi karena thinking tersembunyi. Satu panggilan dengan `reasoning_effort: "low"` selesai dalam 25 dtk (vs 124-167 dtk) dengan 20 baris valid, tapi kualitasnya sedikit turun: 早い dipakai untuk "cepat" (seharusnya 速い), dan ada kanji di atas N5. | Sedang | Opsi baru `KIE_REASONING_EFFORT` (`low`/`high`, default kosong = default model) agar pemilik bisa memilih. **Default tidak diubah** karena baru satu sampel. | 1 sampel low OK; 1 sampel low lain menggantung 300 dtk (kemungkinan beban upstream) |

## Masalah yang tersisa dan rekomendasi

1. **Latensi dan timeout 300 dtk.** Vocabulary/pronunciation dan ujian sering di atas 60 dtk, dan sesekali menggantung sampai 300 dtk. Rekomendasi:
   - coba `KIE_REASONING_EFFORT=low` di staging dengan beberapa topik lalu bandingkan kualitasnya;
   - tambahkan indikator "AI sedang menyusun…" yang jelas, plus timeout atau tombol batal di klien (`src/features/chat/services/localizedAi.ts` belum punya timeout);
   - pertimbangkan `stream: true` untuk materi panjang.
2. **Kesalahan faktual sesekali dalam tips.** Contoh: tip pelafalan ز menyebut "bibir merapat", padahal ز dibentuk dengan ujung lidah di belakang gigi. Ini tidak bisa ditangkap validasi. Pertimbangkan tombol "laporkan materi salah" di chat.
3. **Level kadang sedikit naik.** Contohnya ～てほしい di bacaan N5 dan kata 存在/親孝行 di bacaan N3. Masih wajar tetapi perlu dipantau.
4. **Verifikasi ujian memakai model yang sama.** Untuk kunci yang lebih aman, verifikasi bisa memakai model lain (mis. `gemini-3-pro`, yang juga merespons di Kie) atau `reasoning_effort: high` khusus untuk tahap verify.
5. **Retry 524 belum teramati langsung.** Saat uji ulang, Kie tidak sedang memberi 5xx. Logika retry ditutup dengan review kode, tapi sebaiknya dipantau di log produksi (`[gemini] … failed: … 524`).
6. **Format HSK 3 书写.** Model menghasilkan tugas paragraf dengan kata yang diberikan. Format resmi HSK 3 adalah 完成句子 (menyusun kata) dan 看拼音写汉字. Spec bagian ini bisa dipertajam nanti.

## Cara mengulang uji

1. Jalankan PostgreSQL dan API lokal dengan `KIE_API_KEY` di environment, lalu register user dan set `plan='lifetime'`.
2. Panggil endpoint di atas dengan Bearer token.
3. Untuk melihat teks mentah model, sementara log `result.text` di `callAiJson` (`server/routes/ai.js`). Jangan di-commit.

API key tidak pernah dicetak, disimpan, atau dimasukkan ke laporan ini.
