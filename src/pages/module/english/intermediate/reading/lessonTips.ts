/**
 * Lesson-specific reading guidance for the "Petunjuk Belajar" box in each
 * intermediate reading lesson. Tips point learners to what to look for in that
 * lesson's text without giving away the comprehension answers.
 */
export const lessonTips: Record<number, { intro: string; tips: Array<[label: string, text: string]> }> = {
  1: {
    intro: 'Di latihan ini, kamu akan membaca surat pribadi dari Sarah kepada temannya, Jane. Perhatikan cara ia menceritakan pekerjaan barunya:',
    tips: [
      ['Kronologi Cerita', 'Cari penanda waktu seperti "almost a month", "at first", dan "Last Friday" untuk mengurutkan apa yang sudah terjadi.'],
      ['Perubahan Perasaan', 'Bandingkan kata sifat di awal ("overwhelmed") dengan perasaannya sekarang. Apa yang membuatnya berubah?'],
      ['Harapan & Ajakan', 'Bagian akhir surat biasanya berisi rencana. Perhatikan kalimat dengan "I really hope" dan pertanyaan untuk Jane.'],
    ],
  },
  2: {
    intro: 'Teks ini adalah email kantor tentang perubahan jadwal rapat. Email seperti ini singkat, jadi setiap kalimat membawa informasi penting:',
    tips: [
      ['Baca Subjek Dulu', 'Kata "Rescheduled" di subjek sudah memberi tahu inti email. Lalu cari jadwal lama ("originally") dan jadwal barunya.'],
      ['Cari Alasan', 'Setelah informasi perubahan, biasanya ada kalimat penjelas. Temukan siapa yang menyebabkan rapat diundur.'],
      ['Tugas Penerima', 'Kalimat perintah seperti "Please review..." dan "Let me know if..." menunjukkan apa yang harus dilakukan tim sebelum dan jika ada bentrok jadwal.'],
    ],
  },
  3: {
    intro: 'Teks ini adalah pengumuman (notice) di tempat kerja tentang perbaikan gedung. Pengumuman fokus pada apa, kapan, dan solusi sementara:',
    tips: [
      ['Waktu Mulai-Selesai', 'Temukan hari dan rentang jam ("from... to..."). Hitung sendiri berapa lama layanan dimatikan.'],
      ['Penyebab', 'Frasa "due to" selalu diikuti alasan. Baca bagian itu untuk tahu mengapa perbaikan dilakukan.'],
      ['Pengecualian', 'Cari fasilitas yang tetap berfungsi dan bantuan yang disediakan perusahaan, serta di lantai atau ruangan mana.'],
    ],
  },
  4: {
    intro: 'Teks ini adalah surat pribadi dari Chloe yang baru pindah ke kota besar. Surat seperti ini mencampur cerita, perasaan, dan rencana:',
    tips: [
      ['Masalah Pindahan', 'Cari kejadian tidak terduga saat pindah. Perhatikan frasa "ended up at" dan "track them down".'],
      ['Kata Perasaan', 'Garis bawahi kata seperti "exhausting" dan "overwhelmed", lalu temukan kata "But" yang menandai perubahan suasana.'],
      ['Rencana ke Depan', 'Perhatikan "I\'m hoping to..." dan "looking forward to..." untuk mengetahui apa yang akan terjadi pada Chloe dan Mia.'],
    ],
  },
  5: {
    intro: 'Teks ini adalah iklan lowongan (advert) pejalan anjing. Iklan sangat padat, jadi baca seperti sedang mencari pekerjaan sungguhan:',
    tips: [
      ['Jadwal & Durasi', 'Temukan hari, jam, dan lama kegiatan. Perhatikan rentang "Monday to Friday" untuk menghitung jumlah hari.'],
      ['Hitung Bayaran', 'Gaji dihitung "per walk". Kalikan dengan jumlah hari untuk mengetahui penghasilan seminggu.'],
      ['Syarat Wajib', 'Kata "Must" menandai syarat yang tidak bisa ditawar. Lalu cari cara melamar di kalimat terakhir.'],
    ],
  },
  6: {
    intro: 'Teks ini adalah email undangan makan malam tim. Bacalah sebagai karyawan yang harus memutuskan dan membalas:',
    tips: [
      ['Kapan & Di Mana', 'Catat hari, jam, nama restoran, dan nama jalan. Cari juga alasan perayaan di kalimat pertama ("To celebrate...").'],
      ['Siapa Membayar Apa', 'Kata "but" memisahkan apa yang ditanggung perusahaan dan apa yang dibayar sendiri. Baca kedua bagiannya dengan teliti.'],
      ['Batas Balasan', 'Perhatikan kalimat "Please confirm... by..." untuk tahu apa yang harus dikirim, kapan, dan mengapa Tom membutuhkannya.'],
    ],
  },
  7: {
    intro: 'Teks ini adalah pengumuman tentang mesin kopi baru di kantor. Isinya berupa langkah penggunaan dan aturan:',
    tips: [
      ['Lokasi', 'Pengumuman biasanya menyebut tempat di awal. Cari lantai dan ruangan tempat mesin dipasang.'],
      ['Urutan Langkah', 'Instruksi ditulis dengan kata kerja perintah: "place", "select", "tap". Urutkan langkah-langkah itu di kepalamu.'],
      ['Larangan & Kontak', 'Kalimat "Please do not..." berisi larangan. Lalu cari siapa yang harus dihubungi saat ada masalah dan apa yang berubah di akhir minggu.'],
    ],
  },
  8: {
    intro: 'Teks ini adalah surat pribadi Ben kepada bibinya tentang kabar gembira. Perhatikan bagaimana kabar baik dan buruk diceritakan:',
    tips: [
      ['Kabar Utama', 'Kalimat "I\'ve got some exciting news!" diikuti inti cerita. Cari proyek apa yang membuat Ben masuk koran.'],
      ['Dampak Berita', 'Setelah "Since then...", temukan apa saja yang berubah: bantuan dari warga dan dari pemerintah setempat.'],
      ['Masa Sulit', 'Frasa "it hasn\'t all been easy" menandai masalah. Pahami arti "gave up" dari konteks dan cek isi amplop yang dikirim Ben.'],
    ],
  },
  9: {
    intro: 'Teks ini adalah iklan mencari pengasuh anak (babysitter). Bacalah seperti calon pelamar yang ingin tahu tugas dan syaratnya:',
    tips: [
      ['Hitung Jam Kerja', 'Temukan hari-hari kerja dan rentang jamnya, lalu hitung total jam per minggu.'],
      ['Daftar Tugas', 'Kata "Duties include..." diikuti daftar tugas. Ingat isinya agar bisa mengenali tugas yang tidak disebut.'],
      ['Syarat & Kontak', 'Cari kata "Must be..." untuk syarat, alasan orang tua membutuhkan bantuan ("while we..."), dan waktu yang tepat untuk menelepon.'],
    ],
  },
  10: {
    intro: 'Teks ini adalah email sambutan untuk karyawan baru. Isinya berupa saran dan satu permintaan penting:',
    tips: [
      ['Siapa Penerimanya', 'Kalimat pembuka "Welcome to the..." menunjukkan posisi Priya. Perhatikan juga arti "settle in" dari konteksnya.'],
      ['Saran Berurutan', 'Saran ditandai "First", "Second", "Finally". Untuk tiap saran, cari alasannya (biasanya setelah "as" atau ";").'],
      ['Permintaan Tegas', 'Kalimat tanya "Could you send me... by...?" berisi tugas dengan batas waktu. Cari juga nama orang yang bisa membantu Priya.'],
    ],
  },
  11: {
    intro: 'Teks ini adalah pengumuman pesta musim panas kantor. Pengumuman acara memuat detail, aturan tamu, dan rencana cadangan:',
    tips: [
      ['Detail Acara', 'Catat tanggal, jam, dan lokasi utama pesta. Perhatikan juga apa yang disediakan gratis.'],
      ['Aturan Tamu', 'Kalimat dengan "may" (boleh) dan "must" (wajib) menjelaskan jumlah tamu dan tenggat pendaftaran. Bedakan dua tanggal yang muncul.'],
      ['Rencana Cadangan', 'Frasa "In case of rain" menandai lokasi alternatif. Kalimat terakhir menjelaskan perubahan jam kantor dan tujuannya ("so that...").'],
    ],
  },
  12: {
    intro: 'Teks ini adalah surat Emma kepada kakeknya tentang rutinitas barunya di universitas. Fokus pada jadwal dan perubahan kebiasaan:',
    tips: [
      ['Jadwal Harian', 'Buat garis waktu sederhana dari jam-jam yang disebut: bangun, bus, kuliah, perpustakaan, kerja.'],
      ['Hari Kerja', 'Perhatikan bahwa pekerjaan di toko buku hanya pada hari tertentu. Jangan tertukar dengan jadwal kuliah setiap hari.'],
      ['Masalah & Solusi', 'Kata "At first" menandai kesulitan Emma, sedangkan "Now" menunjukkan solusinya. Bagian akhir berisi rencana pindah dan janji Emma.'],
    ],
  },
  13: {
    intro: 'Teks ini adalah iklan kelas yoga untuk pemula. Iklan seperti ini mencoba menarik pembaca, jadi bedakan promosi dan fakta:',
    tips: [
      ['Target Pembaca', 'Pertanyaan pembuka iklan menunjukkan siapa sasarannya. Tebak arti "stiff" dari konteks "after a long day at your desk".'],
      ['Bandingkan Harga', 'Ada harga satuan dan harga paket. Baca dengan teliti agar tidak tertukar.'],
      ['Yang Disediakan vs Dibawa', 'Kata "but" memisahkan apa yang disediakan dan apa yang harus kamu siapkan. Kalimat "so booking is essential" menjelaskan alasan harus memesan.'],
    ],
  },
  14: {
    intro: 'Teks ini adalah email keluhan resmi kepada pemasok. Bacalah untuk menemukan masalah, buktinya, dan tuntutan penulis:',
    tips: [
      ['Tujuan Email', 'Kalimat "I am writing to..." langsung menyatakan maksud. Subjek email juga meringkas dua masalah utama.'],
      ['Bandingkan Angka', 'Ada dua tanggal dan dua jumlah kursi. Hitung selisihnya sendiri untuk mengetahui keterlambatan dan kekurangan.'],
      ['Permintaan Sopan', 'Frasa "I would be grateful if you could..." berisi dua permintaan. Tebak arti "prevent" dari kalimat tersebut.'],
    ],
  },
  15: {
    intro: 'Teks ini adalah pengumuman pembaruan sistem komputer kantor. Bacalah sebagai karyawan yang harus mengikuti instruksinya dengan tepat:',
    tips: [
      ['Kapan Terjadi', 'Cari hari dan rentang jam pembaruan. Perhatikan bahwa kegiatan terjadi setelah jam kerja.'],
      ['Lakukan vs Jangan', 'Kalimat instruksi memuat "save", "log out", lalu "but do not...". Pisahkan apa yang harus dan tidak boleh dilakukan.'],
      ['Setelah Pembaruan', 'Bagian "On Friday morning" menjelaskan tugas baru beserta syarat panjangnya. Kalimat terakhir memberi kontak jika ada masalah.'],
    ],
  },
  16: {
    intro: 'Teks ini adalah surat pribadi Ollie tentang wawancara kerja. Ikuti alur ceritanya dari sebelum hingga sesudah wawancara:',
    tips: [
      ['Posisi & Tempat', 'Kalimat awal menyebut jenis pekerjaan dan lokasinya. Catat keduanya.'],
      ['Kejutan Wawancara', 'Frasa "which I hadn\'t expected at all" menandai hal yang mengejutkan. Baca kalimat sebelumnya.'],
      ['Campuran Perasaan', 'Bandingkan perasaan sebelum wawancara, saat menerima kabar ("thrilled"), dan kekhawatiran setelah kata "although".'],
    ],
  },
  17: {
    intro: 'Teks ini adalah iklan lomba menulis cerpen. Bacalah seperti calon peserta yang memeriksa aturan sebelum mengirim karya:',
    tips: [
      ['Siapa Boleh Ikut', 'Cari batasan usia peserta. Perhatikan frasa "and over".'],
      ['Aturan Cerita', 'Kata "must" muncul dua kali: satu untuk batas panjang, satu untuk kalimat yang wajib ada. Perhatikan "no longer than".'],
      ['Hadiah & Tenggat', 'Temukan biaya pendaftaran, dua hadiah untuk pemenang, alamat email, dan tanggal terakhir pengiriman.'],
    ],
  },
  18: {
    intro: 'Teks ini adalah email berisi tips sebelum kunjungan kerja ke kantor Jakarta. Selain jadwal, email ini berisi saran budaya:',
    tips: [
      ['Jadwal Kunjungan', 'Cari rentang hari kunjungan ("from... to...") dan acara yang sudah disiapkan untuk hari pertama.'],
      ['Tips Budaya', 'Bagian "A few cultural tips" menjelaskan sopan santun: tangan yang dipakai dan cara menyapa orang dengan "Pak" atau "Ibu".'],
      ['Saran Praktis', 'Perhatikan alasan setelah kata "as" pada saran tentang waktu perjalanan, dan apa yang perlu dibalas lewat email.'],
    ],
  },
  19: {
    intro: 'Teks ini adalah pengumuman tur gratis gedung bersejarah. Bacalah untuk mengetahui jadwal, aturan, dan aksesibilitas:',
    tips: [
      ['Fakta Gedung & Jadwal', 'Cari tahun pembangunan, lalu frasa "every Sunday in May" dan dua jam tur untuk memahami seberapa sering tur berjalan.'],
      ['Aksesibilitas', 'Frasa "Due to..." menjelaskan alasan satu bagian gedung tidak cocok untuk semua pengunjung, dan apa alternatifnya.'],
      ['Aturan Pengunjung', 'Tebak arti "permitted" dari kalimat tentang fotografi dan larangan setelah "although". Cek juga batas jumlah peserta per kelompok.'],
    ],
  },
  20: {
    intro: 'Teks ini adalah surat pribadi Sinta tentang setahun tinggal di Manchester. Surat ini menunjukkan perubahan dari masa sulit ke masa bahagia:',
    tips: [
      ['Awal yang Sulit', 'Bagian "When I first arrived" menggambarkan perasaan awal Sinta. Tebak arti "barely" dari konteks aksen lokal.'],
      ['Titik Balik', 'Kalimat "Things changed when..." menandai apa yang mengubah hidupnya. Cari alasan bahasa Inggrisnya membaik (setelah "because").'],
      ['Pencapaian & Pulang', 'Perhatikan prestasi yang membuatnya bangga dan bulan kepulangannya di bagian akhir surat.'],
    ],
  },
};
