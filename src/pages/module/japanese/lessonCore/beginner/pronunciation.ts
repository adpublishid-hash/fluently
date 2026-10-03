import type { LessonCoreTuple } from '../types';

// Pronunciation N5 — one entry per lesson (index = lesson - 1).
export const pronunciation: LessonCoreTuple[] = [
  ['Ritme mora', ['Bahasa Jepang dihitung per mora: に・ほ・ん = 3 ketukan sama panjang.', 'Tepuk tangan satu kali untuk setiap mora saat latihan.'], [
    ['さくら', 'Sakura', 'bunga sakura (3 mora)'],
    ['ともだち', 'Tomodachi', 'teman (4 mora)'],
    ['おはようございます', 'Ohayou gozaimasu', 'selamat pagi (9 mora)'],
    ['がっこう', 'Gakkou', 'sekolah (4 mora: ga-k-ko-u)'],
  ]],
  ['Lima vokal a i u e o', ['Vokal Jepang pendek dan jelas; u diucapkan tanpa membulatkan bibir.', 'Jangan mengubah vokal menjadi diftong: e tetap e, bukan ei.'], [
    ['あい', 'Ai', 'cinta'],
    ['うえ', 'Ue', 'atas'],
    ['いえ', 'Ie', 'rumah'],
    ['あおい', 'Aoi', 'biru'],
  ]],
  ['Baris ka, sa, ta', ['し dibaca shi, ち dibaca chi, つ dibaca tsu.', 'Latih つ dengan lidah di belakang gigi atas.'], [
    ['つくえ', 'Tsukue', 'meja'],
    ['ちかてつ', 'Chikatetsu', 'kereta bawah tanah'],
    ['しかく', 'Shikaku', 'segi empat'],
    ['たちつてと', 'Tachitsuteto', 'baris ta'],
  ]],
  ['Tsu kecil (っ)', ['っ adalah jeda satu ketukan sebelum konsonan berikutnya.', 'Bedakan: きて (datang) vs きって (perangko).'], [
    ['きって', 'Kitte', 'perangko'],
    ['ざっし', 'Zasshi', 'majalah'],
    ['いっしょ', 'Issho', 'bersama'],
    ['ちょっと', 'Chotto', 'sedikit / sebentar'],
  ]],
  ['Vokal panjang', ['Vokal panjang = dua ketukan; salah panjang bisa mengubah arti.', 'おばさん (bibi) vs おばあさん (nenek).'], [
    ['おばあさん', 'Obaasan', 'nenek'],
    ['おじいさん', 'Ojiisan', 'kakek'],
    ['ゆうびん', 'Yuubin', 'pos'],
    ['とおい', 'Tooi', 'jauh'],
  ]],
  ['Bunyi ん', ['ん adalah satu mora penuh; bunyinya berubah sesuai huruf berikutnya.', 'Sebelum m/b/p mirip m: さんぽ (sampo); di akhir kata nasal ringan.'], [
    ['さんぽ', 'Sanpo', 'jalan-jalan'],
    ['しんぶん', 'Shinbun', 'koran'],
    ['てんき', 'Tenki', 'cuaca'],
    ['おんがく', 'Ongaku', 'musik'],
  ]],
  ['Bunyi r Jepang', ['R Jepang adalah sentuhan ringan lidah di belakang gigi, di antara r dan l.', 'Jangan digetarkan seperti r Indonesia.'], [
    ['りんご', 'Ringo', 'apel'],
    ['くるま', 'Kuruma', 'mobil'],
    ['ふるい', 'Furui', 'tua / lama'],
    ['れいぞうこ', 'Reizouko', 'kulkas'],
  ]],
  ['Konsonan ganda', ['Konsonan ganda (kk, pp, tt, ss) ditahan satu ketukan.', 'Latihan berpasangan: かこ vs かっこ, いた vs いった.'], [
    ['いった', 'Itta', 'pergi (lampau)'],
    ['きっぷ', 'Kippu', 'tiket'],
    ['がっき', 'Gakki', 'alat musik'],
    ['まっすぐ', 'Massugu', 'lurus'],
  ]],
  ['Pengantar pitch accent', ['Bahasa Jepang memakai tinggi-rendah nada, bukan tekanan keras.', 'はし: HA-shi (sumpit) vs ha-SHI (jembatan).'], [
    ['はしで食べる', 'Hashi de taberu', 'makan dengan sumpit'],
    ['はしを渡る', 'Hashi o wataru', 'menyeberangi jembatan'],
    ['あめが降る', 'Ame ga furu', 'hujan (ame: nada tinggi-rendah)'],
    ['あめをなめる', 'Ame o nameru', 'mengulum permen (ame: nada rendah-tinggi)'],
  ]],
  ['Intonasi tanya', ['Pertanyaan dengan か naik di akhir; pernyataan turun.', 'そうですか dengan nada turun = "oh begitu", nada naik = "benarkah?".'], [
    ['学生ですか。', 'Gakusei desu ka.', 'Apakah kamu pelajar? (nada naik)'],
    ['そうですか。', 'Sou desu ka.', 'Oh, begitu. (nada turun)'],
    ['本当ですか。', 'Hontou desu ka.', 'Benarkah?'],
    ['行きますか。', 'Ikimasu ka.', 'Kamu pergi?'],
  ]],
  ['Partikel wa, e, o', ['Partikel は dibaca wa, へ dibaca e, を dibaca o.', 'Ucapkan partikel menempel pada kata sebelumnya: わたしは = watashiwa.'], [
    ['私は大学へ行きます。', 'Watashi wa daigaku e ikimasu.', 'Saya pergi ke universitas.'],
    ['本を読みます。', 'Hon o yomimasu.', 'Saya membaca buku.'],
    ['弟は家へ帰ります。', 'Otouto wa ie e kaerimasu.', 'Adik laki-laki pulang ke rumah.'],
    ['窓を閉めます。', 'Mado o shimemasu.', 'Saya menutup jendela.'],
  ]],
  ['Ritme katakana', ['Kata serapan diucapkan dengan mora Jepang, bukan aksen bahasa asal.', 'Setiap ー menambah satu ketukan.'], [
    ['コンピューター', 'Konpyuutaa', 'komputer'],
    ['スーパーマーケット', 'Suupaamaaketto', 'supermarket'],
    ['エレベーター', 'Erebeetaa', 'lift'],
    ['ハンバーガー', 'Hanbaagaa', 'hamburger'],
  ]],
  ['Shadowing pendek', ['Dengarkan, lalu ulangi segera setengah ketukan di belakang audio.', 'Fokus pada ritme, bukan kecepatan.'], [
    ['いただきます。', 'Itadakimasu.', 'Selamat makan.'],
    ['ごちそうさまでした。', 'Gochisousama deshita.', 'Terima kasih atas makanannya.'],
    ['ただいま。', 'Tadaima.', 'Saya pulang.'],
    ['おかえりなさい。', 'Okaerinasai.', 'Selamat datang di rumah.'],
  ]],
  ['Memenggal kalimat', ['Bagi kalimat panjang per frasa (kata + partikel).', 'Ambil napas di koma, bukan di tengah frasa.'], [
    ['毎朝、駅の前で、新聞を買います。', 'Maiasa, eki no mae de, shinbun o kaimasu.', 'Setiap pagi, di depan stasiun, saya membeli koran.'],
    ['日曜日に、家族と、海へ行きました。', 'Nichiyoubi ni, kazoku to, umi e ikimashita.', 'Hari Minggu, bersama keluarga, saya pergi ke laut.'],
    ['この店の、ケーキは、とてもおいしいです。', 'Kono mise no, keeki wa, totemo oishii desu.', 'Kue di toko ini sangat enak.'],
    ['先生に、もう一度、聞きます。', 'Sensei ni, mou ichido, kikimasu.', 'Saya bertanya sekali lagi kepada guru.'],
  ]],
  ['Akhiran sopan', ['です dan ます: u di akhir sering hampir tak terdengar (des, mas).', 'Jangan menekan akhiran terlalu keras.'], [
    ['わかります。', 'Wakarimasu.', 'Saya mengerti.'],
    ['大丈夫です。', 'Daijoubu desu.', 'Tidak apa-apa.'],
    ['お願いします。', 'Onegai shimasu.', 'Mohon / tolong.'],
    ['失礼します。', 'Shitsurei shimasu.', 'Permisi.'],
  ]],
  ['Pasangan kata mirip', ['Latih pasangan minimal untuk telinga dan lidah.', 'Perhatikan panjang vokal dan tsu kecil.'], [
    ['ここ と こうこう', 'Koko to koukou', 'di sini dan SMA'],
    ['おと と おっと', 'Oto to otto', 'bunyi dan suami'],
    ['ビル と ビール', 'Biru to biiru', 'gedung dan bir'],
    ['ゆき と ゆうき', 'Yuki to yuuki', 'salju dan keberanian'],
  ]],
  ['Dari lambat ke alami', ['Latih kalimat tiga tahap: per mora, per frasa, kecepatan alami.', 'Pertahankan panjang vokal walau kecepatan naik.'], [
    ['ちょっと待ってください。', 'Chotto matte kudasai.', 'Tunggu sebentar.'],
    ['すみません、もう一回お願いします。', 'Sumimasen, mou ikkai onegai shimasu.', 'Maaf, tolong sekali lagi.'],
    ['ありがとうございました。', 'Arigatou gozaimashita.', 'Terima kasih banyak (atas yang sudah dilakukan).'],
    ['よろしくお願いします。', 'Yoroshiku onegai shimasu.', 'Mohon bantuannya.'],
  ]],
  ['Meniru ucapan', ['Tiru tinggi-rendah nada pembicara asli, termasuk jeda.', 'Rekam, lalu bandingkan ritmenya dengan TTS.'], [
    ['いい天気だね。', 'Ii tenki da ne.', 'Cuacanya bagus, ya.'],
    ['本当に？', 'Hontou ni?', 'Masa?'],
    ['すごいね。', 'Sugoi ne.', 'Hebat, ya.'],
    ['なるほど。', 'Naruhodo.', 'Oh, begitu rupanya.'],
  ]],
  ['Cek rekaman', ['Rekam kalimat panjang, lalu cek: mora, vokal panjang, っ, dan ん.', 'Tandai bagian yang terlalu cepat atau terlalu datar.'], [
    ['東京で一週間勉強しました。', 'Toukyou de isshuukan benkyou shimashita.', 'Saya belajar seminggu di Tokyo.'],
    ['切手を十枚ください。', 'Kitte o juumai kudasai.', 'Minta sepuluh lembar perangko.'],
    ['病院は銀行の近くです。', 'Byouin wa ginkou no chikaku desu.', 'Rumah sakit ada di dekat bank.'],
    ['旅行の写真を見せてください。', 'Ryokou no shashin o misete kudasai.', 'Tolong perlihatkan foto perjalananmu.'],
  ]],
  ['Ulasan pronunciation N5', ['Gabungkan semua titik latihan: mora, vokal panjang, っ, ん, dan intonasi.', 'Baca keras kalimat ulasan dengan kecepatan alami.'], [
    ['きょうは しゅくだいが たくさん あります。', 'Kyou wa shukudai ga takusan arimasu.', 'Hari ini PR-nya banyak.'],
    ['らいしゅう きょうとへ りょこうします。', 'Raishuu Kyouto e ryokou shimasu.', 'Minggu depan saya berwisata ke Kyoto.'],
    ['しゃしんを いっしょに とりましょう。', 'Shashin o issho ni torimashou.', 'Ayo memotret bersama.'],
    ['にほんごの はつおんは おもしろいです。', 'Nihongo no hatsuon wa omoshiroi desu.', 'Pelafalan bahasa Jepang itu menarik.'],
  ]],
];
