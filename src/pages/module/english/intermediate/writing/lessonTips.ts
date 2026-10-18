/**
 * Lesson-specific tips for the "Target Mekanikal" box in each intermediate
 * writing lesson. Each entry is based on that lesson's own model text and genre.
 */
export const lessonTips: Record<number, { intro: string; tips: Array<[label: string, text: string]> }> = {
  1: {
    intro: 'Tulisan tentang kampung halaman (hometown) adalah teks deskriptif. Supaya pembaca bisa "melihat" kotamu, perhatikan hal berikut:',
    tips: [
      ['Lokasi Dulu', 'Buka dengan nama kota dan letaknya, lalu satu ciri khas. Contoh: "I come from Bandung, a bustling city in West Java."'],
      ['Kata Sifat Spesifik', 'Ganti "nice" atau "beautiful" dengan kata yang lebih hidup: "cool climate", "lush green landscapes", "vibrant culinary scene".'],
      ['Sisi Positif & Negatif', 'Tunjukkan gambaran yang jujur dengan "Despite": "Despite the heavy traffic, the people remain warm and welcoming."'],
    ],
  },
  2: {
    intro: 'Email pribadi (personal communication) ditulis untuk teman, jadi nadanya santai tetapi tetap rapi. Perhatikan susunannya:',
    tips: [
      ['Sapaan Akrab', 'Mulai dengan "Hi Sarah," lalu satu pertanyaan basa-basi seperti "How have you been?" atau "It feels like ages since we last caught up."'],
      ['Satu Kabar Utama', 'Sampaikan alasan menulis dengan jelas: "I\'m writing to let you know that I\'ve just moved back to Jakarta."'],
      ['Ajakan & Penutup', 'Akhiri dengan rencana konkret dan penutup hangat: "Are you free this weekend?", "Can\'t wait to see you soon!", "Warmly, David".'],
    ],
  },
  3: {
    intro: 'Teks daily routines menceritakan kebiasaan sehari-hari secara berurutan. Kuncinya ada pada tenses dan penanda waktu:',
    tips: [
      ['Simple Present', 'Kebiasaan ditulis dengan Simple Present (ingat -s untuk he/she): "My alarm goes off at 5:30 AM", "I take a shower".'],
      ['Penanda Waktu', 'Gunakan jam dan frasa waktu agar alurnya jelas: "By 7:00 AM", "In the late afternoon", "Once I get home".'],
      ['Adverb of Frequency', 'Tunjukkan seberapa sering dengan "usually", "typically", "always" yang diletakkan sebelum kata kerja: "I usually cook dinner."'],
    ],
  },
  4: {
    intro: 'Cerita perjalanan berkesan (a memorable journey) adalah narasi masa lampau. Buat pembaca ikut tegang dan lega bersamamu:',
    tips: [
      ['Latar Singkat', 'Buka dengan kapan, siapa, dan ke mana: "Last August, my cousin and I took the overnight ferry from Surabaya to Lombok."'],
      ['Past Continuous + Simple', 'Pakai Past Continuous untuk latar dan Simple Past untuk kejadian mendadak: "While most passengers were sleeping, the engine suddenly stopped."'],
      ['Refleksi Penutup', 'Akhiri dengan pelajaran dari perjalanan itu: "Looking back, that night taught me that..."'],
    ],
  },
  5: {
    intro: 'Teks opini (giving an opinion) harus menyatakan sikap yang jelas lalu membelanya dengan alasan. Perhatikan strukturnya:',
    tips: [
      ['Sikap di Awal', 'Nyatakan pendapatmu di kalimat pertama: "In my opinion, every secondary school should teach students how to cook."'],
      ['Alasan Berurutan', 'Susun alasan dengan "Firstly", "Secondly", "Furthermore", dan beri contoh konkret untuk setiap alasan.'],
      ['Akui Pendapat Lain', 'Sebutkan kelemahan lalu bantah: "Admittedly, this could be expensive. Nevertheless, the benefits are far greater."'],
    ],
  },
  6: {
    intro: 'Mendeskripsikan seseorang (describing a person) berarti menggambarkan fisik, sifat, dan alasan kamu mengaguminya:',
    tips: [
      ['Fisik Lalu Sifat', 'Mulai dari penampilan ("silver hair, which she always ties in a neat bun"), baru pindah ke karakter ("patient, generous and hard-working").'],
      ['Buktikan Sifatnya', 'Jangan hanya bilang "she is kind"; beri contoh tindakan: "she makes me a cup of sweet tea and lets me speak without interrupting."'],
      ['Relative Clause', 'Gabungkan info dengan "who/which/where": "a small food stall in Yogyakarta, where she sold gudeg to students."'],
    ],
  },
  7: {
    intro: 'Teks instruksi (writing instructions) harus mudah diikuti langkah demi langkah. Pembaca perlu tahu persis apa yang harus dilakukan:',
    tips: [
      ['Kalimat Perintah', 'Mulai setiap langkah dengan kata kerja dasar (imperative): "Choose a pot", "Fill the pot with soil", "Water the soil gently".'],
      ['Kata Urutan', 'Tandai urutan dengan "First", "Next", "Then", "After that", "Finally" agar pembaca tidak tersesat.'],
      ['Angka & Peringatan', 'Beri ukuran yang tepat ("at least twenty centimetres deep") dan peringatan: "Be careful not to...", "Never rub your eyes!"'],
    ],
  },
  8: {
    intro: 'Menulis tentang makanan favorit (food I love) berarti mengajak pembaca mencicipi lewat kata-kata. Libatkan semua indra:',
    tips: [
      ['Kosakata Indra', 'Gambarkan rasa, aroma, warna, dan tekstur: "fragrant", "bright yellow", "crunchy fried shallots", "slightly sour broth".'],
      ['Isi & Penyajian', 'Jelaskan komponen hidangan dengan pasif atau daftar: "It is served with shredded chicken, rice noodles and a boiled egg."'],
      ['Makna Pribadi', 'Tunjukkan mengapa makanan itu penting bagimu: "For me, soto ayam is more than just food. It reminds me of my family."'],
    ],
  },
  9: {
    intro: 'Surat undangan resmi (letter of invitation) harus sopan dan memuat semua detail acara. Perhatikan unsur wajibnya:',
    tips: [
      ['Pembuka Formal', 'Gunakan "Dear Mr Hartono," dan nyatakan tujuan: "On behalf of Class 11B, I would like to invite you to..."'],
      ['Detail 5W', 'Cantumkan acara, hari, tanggal, jam, dan tempat dalam satu kalimat jelas: "on Saturday, 14th June, from 9 a.m. to 3 p.m. in the main hall".'],
      ['Minta Konfirmasi', 'Minta balasan dengan sopan beserta batas waktunya: "We would be very grateful if you could let us know by Friday, 6th June."'],
    ],
  },
  10: {
    intro: 'Tulisan tentang rencana masa depan (my future plans) menuntut variasi bentuk future yang tepat. Perhatikan nuansanya:',
    tips: [
      ['Going to vs Hope', 'Pakai "be going to" untuk rencana pasti ("I am going to study environmental engineering") dan "hope to / would like to" untuk keinginan.'],
      ['Alasan Pribadi', 'Hubungkan rencana dengan pengalamanmu: "I have been interested in clean water since I joined my school\'s environment club."'],
      ['Jangka Waktu', 'Bagi rencana menjadi tahap: "While I am at university...", "In the long term...", "By the time I am thirty, I hope I will have..."'],
    ],
  },
  11: {
    intro: 'Esai masalah dan solusi (a problem and solution) harus menjelaskan masalah secara konkret sebelum menawarkan jalan keluar:',
    tips: [
      ['Gambarkan Masalah', 'Jelaskan apa, kapan, dan di mana: "Every morning between 6.30 and 7 a.m., the road outside our school becomes completely blocked."'],
      ['Sebab dan Akibat', 'Tunjukkan dampaknya dengan "As a result": "As a result, many students arrive late and the air is full of exhaust fumes."'],
      ['Saran yang Realistis', 'Tawarkan solusi dengan "could" dan conditional: "The school could create a drop-off zone." "If these solutions were introduced, the area would be safer."'],
    ],
  },
  12: {
    intro: 'Mendeskripsikan sekolah (describing my school) adalah teks deskriptif tempat. Ajak pembaca "berkeliling" kampusmu:',
    tips: [
      ['Fakta Dasar', 'Mulai dengan nama, lokasi, dan data singkat: "It was built in the 1970s" dan "The school has around eight hundred students."'],
      ['Preposisi Tempat', 'Gunakan "In the centre of", "Next to", "surrounded by" agar pembaca bisa membayangkan denah sekolah.'],
      ['Lebih dari Fasilitas', 'Ceritakan suasana dan orang-orangnya: "What makes my school special is not only its facilities but also its atmosphere."'],
    ],
  },
  13: {
    intro: 'Surat terima kasih (a thank you letter) yang baik menyebut secara spesifik apa yang kamu syukuri dan dampaknya bagimu:',
    tips: [
      ['Tujuan di Awal', 'Langsung sampaikan maksud: "I am writing to thank you for everything you did for me during my work placement."'],
      ['Sebut Hal Spesifik', 'Hindari terima kasih umum; sebutkan bantuan nyata: "I am especially grateful for the time you spent showing me how to plan tour itineraries."'],
      ['Tunjukkan Dampak', 'Jelaskan perubahan yang terjadi: "Thanks to this placement, I am now certain that I want to work in tourism." Tutup dengan "With best wishes,".'],
    ],
  },
  14: {
    intro: 'Menulis tentang hobi (my hobby) bukan sekadar menyebut kegiatan; jelaskan bagaimana hobi itu dimulai dan apa artinya bagimu:',
    tips: [
      ['Awal Mula', 'Gunakan Present Perfect untuk kebiasaan yang masih berlangsung: "I started two years ago, and since then I have hardly ever left the house without it."'],
      ['Contoh Nyata', 'Beri gambaran konkret aktivitasnya: "a street vendor counting his coins, children playing football in the rain".'],
      ['Manfaat Hobi', 'Jelaskan perubahan dalam dirimu: "Photography has changed the way I see my city" dan "It has helped me to become more confident."'],
    ],
  },
  15: {
    intro: 'Cerita tentang hewan peliharaan (a story about my pet) adalah narasi dengan awal, konflik, dan akhir. Buat ceritanya hidup:',
    tips: [
      ['Adegan Pembuka', 'Mulai dengan suasana yang jelas: "on a stormy evening in January, we heard a weak crying sound coming from under our neighbour\'s car."'],
      ['Kata Kerja Hidup', 'Pilih kata kerja yang menggambarkan gerakan: "darted under the sofa", "began to creep closer", "climbed onto my brother\'s lap".'],
      ['Dulu vs Sekarang', 'Tunjukkan perubahan dengan "For the first few weeks..." lalu "Today, Milo is..." dan tutup dengan pelajaran: "trust has to be earned."'],
    ],
  },
  16: {
    intro: 'Esai membandingkan dan membedakan (comparing and contrasting) menilai dua pilihan secara adil berdasarkan beberapa kriteria:',
    tips: [
      ['Satu Kriteria per Bagian', 'Bandingkan per aspek (kecepatan, harga, kenyamanan): "The most obvious difference is speed." "Price is another important factor."'],
      ['Kata Pembanding', 'Gunakan "whereas", "unlike", "on the other hand", "both... and": "A flight takes just over an hour, whereas the train lasts seven hours."'],
      ['Kesimpulan Seimbang', 'Tentukan pilihan terbaik untuk tiap kelompok: "The plane is better for business travellers, while the train suits students and families."'],
    ],
  },
  17: {
    intro: 'Mendeskripsikan lingkungan tempat tinggal (my neighbourhood) menggabungkan gambaran tempat, kegiatan warga, dan pendapat pribadimu:',
    tips: [
      ['Pola There Is/Are', 'Perkenalkan tempat-tempat penting: "At the end of my street there is a traditional market." "Opposite the market there is a small mosque."'],
      ['Kehidupan Warga', 'Ceritakan kebiasaan orang-orangnya: "Neighbours greet each other by name, and once a month everyone takes part in kerja bakti."'],
      ['Kekurangan Juga', 'Tambahkan sisi kurang dengan "However" lalu tutup dengan "Even so": "The drains often flood. Even so, I cannot imagine living anywhere else."'],
    ],
  },
  18: {
    intro: 'Surat keluhan resmi (complaint) harus tegas, faktual, dan sopan. Tujuannya mendapatkan solusi, bukan sekadar marah:',
    tips: [
      ['Fakta & Bukti', 'Sebutkan tanggal, produk, dan nomor transaksi: "On 12th October I purchased a VisionX Pro laptop (Receipt No: 88492)." Lampirkan foto atau kuitansi.'],
      ['Bahasa Formal', 'Gunakan "I am writing to formally express my dissatisfaction..." dan hindari singkatan seperti "I\'m" atau "can\'t".'],
      ['Tuntutan Jelas', 'Nyatakan solusi yang diharapkan dan batas waktunya: "I expect a replacement or a full refund within five business days." Tutup dengan "Yours faithfully,".'],
    ],
  },
  19: {
    intro: 'Pelajaran ini melatih penggunaan conjunctions (kata penghubung) untuk menggabungkan ide. Perhatikan fungsinya masing-masing:',
    tips: [
      ['Sebab & Tujuan', 'Gunakan "because" dan "since" untuk alasan, serta "so that" untuk tujuan: "I still take the bus so that I do not arrive soaking wet."'],
      ['Kontras', 'Bedakan "although" (dalam satu kalimat) dan "However / Nevertheless" (awal kalimat baru, diikuti koma): "Although the distance is only five kilometres..."'],
      ['Syarat & Penekanan', 'Pakai "whenever", "unless", "otherwise", dan "Not only... but also" (perhatikan inversi): "Not only did my legs ache, but I also had to wake up earlier."'],
    ],
  },
  20: {
    intro: 'Pelajaran ulasan (review & writing test) ini berbentuk esai ujian "for and against" dengan batas kata. Strategi ujiannya:',
    tips: [
      ['Baca Soal Teliti', 'Garis bawahi topik dan batas kata ("150–180 words"); pastikan setiap paragraf menjawab pertanyaan "Should teenagers have part-time jobs?"'],
      ['Dua Sisi Seimbang', 'Buat satu paragraf untuk keuntungan ("On the one hand...") dan satu untuk kerugian ("On the other hand..."), masing-masing dengan contoh.'],
      ['Kesimpulan Bersyarat', 'Tutup dengan pendapat yang bernuansa: "I believe a part-time job can be beneficial, provided that students work only a few hours a week."'],
    ],
  },
};
