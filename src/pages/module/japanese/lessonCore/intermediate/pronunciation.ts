import type { LessonCoreTuple } from '../types';

// Pronunciation N3 — one entry per lesson (index = lesson - 1).
export const pronunciation: LessonCoreTuple[] = [
  ['Kecepatan alami', ['Pada kecepatan alami, vokal i dan u di antara konsonan tak bersuara sering melemah: です → des.', 'Jangan menghapus mora; hanya suaranya yang melemah.'], [
    ['失礼します', 'Shitsurei shimasu', 'permisi (shi dan su melemah)'],
    ['好きです', 'Suki desu', 'suka (u melemah)'],
    ['北海道', 'Hokkaidou', 'Hokkaido'],
    ['ちょっと聞いてください', 'Chotto kiite kudasai', 'tolong dengarkan sebentar'],
  ]],
  ['Pitch accent N3', ['Kata berbeda arti karena nada: 雨/飴, 橋/箸/端, 柿/牡蠣.', 'Dengarkan di mana nada turun (kaku).'], [
    ['柿と牡蠣', 'Kaki to kaki', 'kesemek dan tiram (nada berbeda)'],
    ['端と箸', 'Hashi to hashi', 'tepi dan sumpit (nada berbeda)'],
    ['神と紙', 'Kami to kami', 'dewa dan kertas (nada berbeda)'],
    ['今と居間', 'Ima to ima', 'sekarang dan ruang keluarga (nada berbeda)'],
  ]],
  ['Pengelompokan kalimat', ['Satu kelompok makna = satu kurva nada (naik di awal, turun bertahap).', 'Kalimat panjang punya beberapa kurva yang dipisah jeda kecil.'], [
    ['去年の夏に、家族で沖縄へ行きました。', 'Kyonen no natsu ni, kazoku de Okinawa e ikimashita.', 'Musim panas tahun lalu saya sekeluarga pergi ke Okinawa.'],
    ['駅前の新しいカフェは、いつも若い人で混んでいます。', 'Ekimae no atarashii kafe wa, itsumo wakai hito de konde imasu.', 'Kafe baru di depan stasiun selalu ramai anak muda.'],
    ['仕事が早く終わった日は、ジムに寄ってから帰ります。', 'Shigoto ga hayaku owatta hi wa, jimu ni yotte kara kaerimasu.', 'Hari ketika kerja selesai cepat, saya mampir ke gym sebelum pulang.'],
    ['先生に勧められた本を、週末に一気に読みました。', 'Sensei ni susumerareta hon o, shuumatsu ni ikki ni yomimashita.', 'Buku yang disarankan guru saya baca sekaligus di akhir pekan.'],
  ]],
  ['Penanda wacana', ['Penanda wacana diucapkan dengan jeda setelahnya: えっと, つまり, ちなみに.', 'Gunakan untuk memberi waktu berpikir tanpa diam terlalu lama.'], [
    ['えっと、何の話でしたっけ。', 'Etto, nan no hanashi deshitakke.', 'Hmm, tadi kita membicarakan apa, ya?'],
    ['つまり、今のままではだめだということです。', 'Tsumari, ima no mama de wa dame da to iu koto desu.', 'Intinya, kalau tetap seperti sekarang tidak bisa.'],
    ['ちなみに、明日は雨らしいですよ。', 'Chinami ni, ashita wa ame rashii desu yo.', 'Ngomong-ngomong, katanya besok hujan.'],
    ['要するに、時間が足りないんです。', 'You suru ni, jikan ga tarinain desu.', 'Singkatnya, waktunya kurang.'],
  ]],
  ['Ritme bicara formal', ['Bicara formal: tempo stabil, akhiran jelas, tanpa penyingkatan.', 'Tekankan kata kunci, bukan akhiran.'], [
    ['本日の会議を始めさせていただきます。', 'Honjitsu no kaigi o hajimesasete itadakimasu.', 'Izinkan saya memulai rapat hari ini.'],
    ['お手元の資料をご覧ください。', 'Otemoto no shiryou o goran kudasai.', 'Silakan lihat materi di tangan Anda.'],
    ['ご質問は最後にお受けいたします。', 'Goshitsumon wa saigo ni ouke itashimasu.', 'Pertanyaan akan kami terima di akhir.'],
    ['以上で報告を終わります。', 'Ijou de houkoku o owarimasu.', 'Demikian laporan saya.'],
  ]],
  ['Shadowing berita', ['Bahasa berita: tempo cepat, nada datar, jeda di koma.', 'Tiru jeda sebelum angka dan nama tempat.'], [
    ['きょう午前、東京都内で火事がありました。', 'Kyou gozen, Toukyou tonai de kaji ga arimashita.', 'Pagi ini terjadi kebakaran di wilayah Tokyo.'],
    ['この火事で、木造の住宅一棟が全焼しました。', 'Kono kaji de, mokuzou no juutaku ittou ga zenshou shimashita.', 'Akibat kebakaran ini, satu rumah kayu habis terbakar.'],
    ['けが人はいないということです。', 'Keganin wa inai to iu koto desu.', 'Dilaporkan tidak ada korban luka.'],
    ['警察が火事の原因を調べています。', 'Keisatsu ga kaji no gen-in o shirabete imasu.', 'Polisi sedang menyelidiki penyebab kebakaran.'],
  ]],
  ['Jeda dalam presentasi', ['Jeda 1–2 detik sebelum poin penting membuat audiens fokus.', 'Jeda setelah pertanyaan retoris.'], [
    ['では、なぜこの問題が起きたのでしょうか。', 'De wa, naze kono mondai ga okita no deshou ka.', 'Lalu, mengapa masalah ini terjadi?'],
    ['答えは、とてもシンプルです。', 'Kotae wa, totemo shinpuru desu.', 'Jawabannya sangat sederhana.'],
    ['確認が、足りなかったのです。', 'Kakunin ga, tarinakatta no desu.', 'Pemeriksaannya kurang.'],
    ['ここが、今日一番お伝えしたいポイントです。', 'Koko ga, kyou ichiban otsutae shitai pointo desu.', 'Inilah poin yang paling ingin saya sampaikan hari ini.'],
  ]],
  ['Frasa perbaikan', ['Saat salah bicara, perbaiki dengan cepat: いや, じゃなくて, 失礼しました.', 'Ucapkan perbaikan dengan nada tenang, jangan berhenti lama.'], [
    ['会議は三時、いや、四時からです。', 'Kaigi wa sanji, iya, yoji kara desu.', 'Rapat mulai jam tiga, eh, jam empat.'],
    ['山田さん、じゃなくて、山本さんに渡してください。', 'Yamada san, ja nakute, Yamamoto san ni watashite kudasai.', 'Tolong serahkan ke Yamada, eh bukan, ke Yamamoto.'],
    ['失礼しました。言い直します。', 'Shitsurei shimashita. Iinaoshimasu.', 'Maaf. Saya ulangi.'],
    ['正確に言うと、二百五十人です。', 'Seikaku ni iu to, nihyaku gojuunin desu.', 'Tepatnya, dua ratus lima puluh orang.'],
  ]],
  ['Menyatakan tidak setuju dengan lembut', ['Nada lembut: turunkan volume, perpanjang akhiran ね/けど.', 'Hindari nada naik tajam yang terdengar menantang.'], [
    ['そうですね…でも、少し難しいかもしれません。', 'Sou desu ne... demo, sukoshi muzukashii kamo shiremasen.', 'Benar juga… tapi mungkin agak sulit.'],
    ['お気持ちは分かるんですけど…。', 'Okimochi wa wakarun desu kedo...', 'Saya paham perasaan Anda, tapi…'],
    ['ほかの方法もあるかなと思いまして。', 'Hoka no houhou mo aru ka na to omoimashite.', 'Saya pikir mungkin ada cara lain.'],
    ['一度、検討させていただけますか。', 'Ichido, kentou sasete itadakemasu ka.', 'Bolehkah kami mempertimbangkannya dulu?'],
  ]],
  ['Penekanan', ['Penekanan dengan nada tinggi + sedikit lebih lambat pada kata kunci.', 'Kata penegas: 絶対に, 本当に, 必ず.'], [
    ['これは絶対に忘れないでください。', 'Kore wa zettai ni wasurenaide kudasai.', 'Ini jangan sampai dilupakan.'],
    ['本当に感謝しています。', 'Hontou ni kansha shite imasu.', 'Saya sungguh berterima kasih.'],
    ['締め切りは必ず守ってください。', 'Shimekiri wa kanarazu mamotte kudasai.', 'Tenggat harus ditepati.'],
    ['問題は量ではなく、質です。', 'Mondai wa ryou de wa naku, shitsu desu.', 'Masalahnya bukan jumlah, tapi kualitas.'],
  ]],
  ['Kata majemuk kanji', ['Kata kanji panjang dibaca sebagai satu unit dengan satu puncak nada.', 'Perhatikan perubahan bunyi: 国際 → こくさい, 学校 → がっこう.'], [
    ['国際交流', 'Kokusai kouryuu', 'pertukaran internasional'],
    ['環境問題', 'Kankyou mondai', 'masalah lingkungan'],
    ['経済成長', 'Keizai seichou', 'pertumbuhan ekonomi'],
    ['情報技術', 'Jouhou gijutsu', 'teknologi informasi'],
  ]],
  ['Ritme adverbia', ['Adverbia berulang (onomatope) punya ritme dua ketukan ganda: ゆっくり, はっきり.', 'Tekan bunyi っ dan り dengan jelas.'], [
    ['はっきり言ってください。', 'Hakkiri itte kudasai.', 'Tolong katakan dengan jelas.'],
    ['ゆっくり休んでね。', 'Yukkuri yasunde ne.', 'Istirahatlah dengan tenang.'],
    ['すっかり忘れていました。', 'Sukkari wasurete imashita.', 'Saya benar-benar lupa.'],
    ['ぐっすり眠れました。', 'Gussuri nemuremashita.', 'Saya bisa tidur nyenyak.'],
  ]],
  ['Pelafalan keigo', ['Keigo panjang: jaga ritme stabil, jangan tersendat di tengah.', 'Latih per blok: お + akar + いたします.'], [
    ['ただいま担当者をお呼びいたします。', 'Tadaima tantousha o oyobi itashimasu.', 'Saya panggilkan petugasnya sekarang.'],
    ['お名前を頂戴してもよろしいでしょうか。', 'Onamae o choudai shite mo yoroshii deshou ka.', 'Bolehkah saya tahu nama Anda?'],
    ['こちらでお召し上がりですか。', 'Kochira de omeshiagari desu ka.', 'Apakah dimakan di sini?'],
    ['またのお越しをお待ちしております。', 'Mata no okoshi o omachi shite orimasu.', 'Kami menantikan kunjungan Anda kembali.'],
  ]],
  ['Meniru ucapan cepat', ['Ucapan cepat menyatukan kata: 〜ている → てる, 〜ておく → とく, それは → そりゃ.', 'Kenali bentuk aslinya agar paham artinya.'], [
    ['そりゃ大変だったね。', 'Sorya taihen datta ne.', 'Wah, itu pasti berat.'],
    ['やっとかないと怒られるよ。', 'Yattokanai to okorareru yo.', 'Kalau tidak dikerjakan duluan, nanti dimarahi.'],
    ['もう行かなきゃ。', 'Mou ikanakya.', 'Aku sudah harus pergi.'],
    ['知らなかったんだもん。', 'Shiranakattan da mon.', 'Habisnya aku tidak tahu.'],
  ]],
  ['Pola intonasi', ['Intonasi naik: pertanyaan, kejutan; turun: pernyataan, kesimpulan; datar-panjang: ragu.', 'Kata yang sama, intonasi berbeda, makna berbeda: そう？ vs そう。'], [
    ['そう？', 'Sou?', 'Begitu? (heran, nada naik)'],
    ['そう。', 'Sou.', 'Begitu. (setuju, nada turun)'],
    ['いいよ。', 'Ii yo.', 'Boleh. (ramah)'],
    ['いいよ、別に。', 'Ii yo, betsu ni.', 'Ya sudah, terserah. (dingin)'],
  ]],
  ['Giliran bicara panjang', ['Giliran panjang: tandai struktur dengan まず, それから, 最後に.', 'Ambil napas di akhir setiap bagian, bukan di tengah kalimat.'], [
    ['私が日本語を始めたのは、高校生のときです。', 'Watashi ga nihongo o hajimeta no wa, koukousei no toki desu.', 'Saya mulai belajar bahasa Jepang saat SMA.'],
    ['最初はアニメがきっかけでしたが、だんだん文化にも興味を持ちました。', 'Saisho wa anime ga kikkake deshita ga, dandan bunka ni mo kyoumi o mochimashita.', 'Awalnya karena anime, tapi lama-lama saya tertarik juga pada budayanya.'],
    ['大学では日本語学科に進み、一年間留学もしました。', 'Daigaku de wa nihongo gakka ni susumi, ichinenkan ryuugaku mo shimashita.', 'Di universitas saya masuk jurusan bahasa Jepang dan juga belajar di luar negeri selama setahun.'],
    ['今は、通訳になるのが目標です。', 'Ima wa, tsuuyaku ni naru no ga mokuhyou desu.', 'Sekarang, tujuan saya menjadi penerjemah lisan.'],
  ]],
  ['Nada meminta klarifikasi', ['Klarifikasi: nada naik ringan di akhir, tempo pelan.', 'Ulangi kata kunci dengan nada tanya.'], [
    ['三時、ですか？', 'Sanji, desu ka?', 'Jam tiga, ya?'],
    ['すみません、もう一度おっしゃっていただけますか。', 'Sumimasen, mou ichido osshatte itadakemasu ka.', 'Maaf, bisakah Anda mengatakannya sekali lagi?'],
    ['二階の、会議室Bですね？', 'Nikai no, kaigishitsu bii desu ne?', 'Ruang rapat B di lantai dua, ya?'],
    ['それは、今週中という意味ですか。', 'Sore wa, konshuuchuu to iu imi desu ka.', 'Maksudnya dalam minggu ini?'],
  ]],
  ['Analisis rekaman', ['Rekam monolog 30 detik, lalu cek: jeda, nada akhir, kecepatan.', 'Bandingkan dengan model; perbaiki satu aspek per rekaman.'], [
    ['私の町は、山と海に囲まれた小さな町です。', 'Watashi no machi wa, yama to umi ni kakomareta chiisana machi desu.', 'Kota saya kota kecil yang dikelilingi gunung dan laut.'],
    ['夏は観光客が多く、とてもにぎやかになります。', 'Natsu wa kankoukyaku ga ooku, totemo nigiyaka ni narimasu.', 'Saat musim panas banyak turis, jadi sangat ramai.'],
    ['冬は静かで、星がとてもきれいに見えます。', 'Fuyu wa shizuka de, hoshi ga totemo kirei ni miemasu.', 'Saat musim dingin tenang, bintang terlihat sangat indah.'],
    ['ぜひ一度、遊びに来てください。', 'Zehi ichido, asobi ni kite kudasai.', 'Silakan berkunjung sekali-kali.'],
  ]],
  ['Latihan kelancaran', ['Ulangi kalimat yang sama 3 kali, setiap kali sedikit lebih lancar.', 'Kelancaran = sedikit jeda tak perlu, bukan bicara cepat.'], [
    ['できるだけ早くお返事いたします。', 'Dekiru dake hayaku ohenji itashimasu.', 'Saya akan membalas secepat mungkin.'],
    ['ご迷惑をおかけして申し訳ありません。', 'Gomeiwaku o okake shite moushiwake arimasen.', 'Mohon maaf telah merepotkan.'],
    ['その件については、確認してからご連絡します。', 'Sono ken ni tsuite wa, kakunin shite kara gorenraku shimasu.', 'Mengenai hal itu, saya kabari setelah memeriksa.'],
    ['お先に失礼いたします。', 'Osaki ni shitsurei itashimasu.', 'Saya pamit duluan.'],
  ]],
  ['Ulasan pronunciation N3', ['Gabungkan: kecepatan alami, pengelompokan, penekanan, dan intonasi.', 'Baca keras paragraf pendek seperti presentasi.'], [
    ['皆さん、こんにちは。', 'Minasan, konnichiwa.', 'Halo semuanya.'],
    ['今日は、私の国の食文化についてお話しします。', 'Kyou wa, watashi no kuni no shokubunka ni tsuite ohanashi shimasu.', 'Hari ini saya akan berbicara tentang budaya makan di negara saya.'],
    ['インドネシアでは、手で食べる習慣があります。', 'Indoneshia de wa, te de taberu shuukan ga arimasu.', 'Di Indonesia ada kebiasaan makan dengan tangan.'],
    ['最初は驚くかもしれませんが、実はとても合理的なんです。', 'Saisho wa odoroku kamo shiremasen ga, jitsu wa totemo gouriteki nan desu.', 'Awalnya mungkin mengejutkan, tapi sebenarnya sangat masuk akal.'],
  ]],
];
