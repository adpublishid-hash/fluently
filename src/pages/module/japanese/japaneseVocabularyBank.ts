import type { JapaneseLevelId } from './japaneseModuleData';

export type JapaneseWord = { japanese: string; romaji: string; meaning: string };

type WordTuple = [japanese: string, romaji: string, meaning: string];

// Themed word sets, one per vocabulary lesson (index = lesson - 1), following
// the vocabulary topic order in japaneseLessonContent.ts. Lesson 20 is review.
const bank: Record<JapaneseLevelId, WordTuple[][]> = {
  beginner: [
    [['人', 'hito', 'orang'], ['男の人', 'otoko no hito', 'laki-laki'], ['女の人', 'onna no hito', 'perempuan'], ['友達', 'tomodachi', 'teman'], ['先生', 'sensei', 'guru'], ['学生', 'gakusei', 'pelajar']],
    [['家族', 'kazoku', 'keluarga'], ['父', 'chichi', 'ayah (sendiri)'], ['母', 'haha', 'ibu (sendiri)'], ['兄', 'ani', 'kakak laki-laki'], ['姉', 'ane', 'kakak perempuan'], ['弟', 'otouto', 'adik laki-laki']],
    [['一', 'ichi', 'satu'], ['三', 'san', 'tiga'], ['五', 'go', 'lima'], ['十', 'juu', 'sepuluh'], ['百', 'hyaku', 'seratus'], ['千', 'sen', 'seribu']],
    [['今', 'ima', 'sekarang'], ['朝', 'asa', 'pagi'], ['昼', 'hiru', 'siang'], ['夜', 'yoru', 'malam'], ['〜時', '~ji', 'jam ~'], ['〜分', '~fun', 'menit ~']],
    [['月曜日', 'getsuyoubi', 'Senin'], ['水曜日', 'suiyoubi', 'Rabu'], ['金曜日', 'kin\'youbi', 'Jumat'], ['日曜日', 'nichiyoubi', 'Minggu'], ['今日', 'kyou', 'hari ini'], ['明日', 'ashita', 'besok']],
    [['ご飯', 'gohan', 'nasi / makanan'], ['パン', 'pan', 'roti'], ['肉', 'niku', 'daging'], ['魚', 'sakana', 'ikan'], ['野菜', 'yasai', 'sayur'], ['卵', 'tamago', 'telur']],
    [['水', 'mizu', 'air'], ['お茶', 'ocha', 'teh'], ['牛乳', 'gyuunyuu', 'susu sapi'], ['コーヒー', 'koohii', 'kopi'], ['ジュース', 'juusu', 'jus'], ['飲みます', 'nomimasu', 'minum']],
    [['駅', 'eki', 'stasiun'], ['銀行', 'ginkou', 'bank'], ['病院', 'byouin', 'rumah sakit'], ['郵便局', 'yuubinkyoku', 'kantor pos'], ['公園', 'kouen', 'taman'], ['店', 'mise', 'toko']],
    [['電車', 'densha', 'kereta listrik'], ['バス', 'basu', 'bus'], ['車', 'kuruma', 'mobil'], ['自転車', 'jitensha', 'sepeda'], ['飛行機', 'hikouki', 'pesawat'], ['歩きます', 'arukimasu', 'berjalan kaki']],
    [['学校', 'gakkou', 'sekolah'], ['教室', 'kyoushitsu', 'ruang kelas'], ['宿題', 'shukudai', 'PR'], ['試験', 'shiken', 'ujian'], ['辞書', 'jisho', 'kamus'], ['勉強します', 'benkyou shimasu', 'belajar']],
    [['会社', 'kaisha', 'perusahaan'], ['仕事', 'shigoto', 'pekerjaan'], ['会社員', 'kaishain', 'karyawan'], ['休み', 'yasumi', 'libur / istirahat'], ['働きます', 'hatarakimasu', 'bekerja'], ['会議', 'kaigi', 'rapat']],
    [['家', 'ie', 'rumah'], ['部屋', 'heya', 'kamar'], ['台所', 'daidokoro', 'dapur'], ['窓', 'mado', 'jendela'], ['ドア', 'doa', 'pintu'], ['机', 'tsukue', 'meja']],
    [['大きい', 'ookii', 'besar'], ['小さい', 'chiisai', 'kecil'], ['新しい', 'atarashii', 'baru'], ['古い', 'furui', 'lama / tua (benda)'], ['高い', 'takai', 'mahal / tinggi'], ['安い', 'yasui', 'murah']],
    [['起きます', 'okimasu', 'bangun'], ['寝ます', 'nemasu', 'tidur'], ['食べます', 'tabemasu', 'makan'], ['見ます', 'mimasu', 'melihat'], ['聞きます', 'kikimasu', 'mendengar / bertanya'], ['書きます', 'kakimasu', 'menulis']],
    [['買います', 'kaimasu', 'membeli'], ['いくら', 'ikura', 'berapa (harga)'], ['円', 'en', 'yen'], ['財布', 'saifu', 'dompet'], ['安い', 'yasui', 'murah'], ['ください', 'kudasai', 'tolong beri saya']],
    [['天気', 'tenki', 'cuaca'], ['雨', 'ame', 'hujan'], ['雪', 'yuki', 'salju'], ['暑い', 'atsui', 'panas (cuaca)'], ['寒い', 'samui', 'dingin (cuaca)'], ['晴れ', 'hare', 'cerah']],
    [['頭', 'atama', 'kepala'], ['目', 'me', 'mata'], ['耳', 'mimi', 'telinga'], ['口', 'kuchi', 'mulut'], ['手', 'te', 'tangan'], ['足', 'ashi', 'kaki']],
    [['趣味', 'shumi', 'hobi'], ['音楽', 'ongaku', 'musik'], ['映画', 'eiga', 'film'], ['写真', 'shashin', 'foto'], ['料理', 'ryouri', 'masakan'], ['スポーツ', 'supootsu', 'olahraga']],
    [['旅行', 'ryokou', 'perjalanan wisata'], ['ホテル', 'hoteru', 'hotel'], ['地図', 'chizu', 'peta'], ['切符', 'kippu', 'tiket'], ['荷物', 'nimotsu', 'barang bawaan'], ['お土産', 'omiyage', 'oleh-oleh']],
  ],
  elementary: [
    [['調べる', 'shiraberu', 'menyelidiki / mencari tahu'], ['準備する', 'junbi suru', 'menyiapkan'], ['届ける', 'todokeru', 'mengantarkan'], ['集める', 'atsumeru', 'mengumpulkan'], ['続ける', 'tsuzukeru', 'melanjutkan'], ['片付ける', 'katazukeru', 'merapikan']],
    [['熱', 'netsu', 'demam'], ['薬', 'kusuri', 'obat'], ['咳', 'seki', 'batuk'], ['怪我', 'kega', 'luka / cedera'], ['入院', 'nyuuin', 'rawat inap'], ['具合', 'guai', 'kondisi (badan)']],
    [['予約', 'yoyaku', 'reservasi'], ['空港', 'kuukou', 'bandara'], ['乗り換え', 'norikae', 'transit / ganti kendaraan'], ['観光', 'kankou', 'wisata'], ['案内', 'annai', 'pemanduan / informasi'], ['出発', 'shuppatsu', 'keberangkatan']],
    [['入学式', 'nyuugakushiki', 'upacara masuk sekolah'], ['卒業', 'sotsugyou', 'kelulusan'], ['運動会', 'undoukai', 'hari olahraga sekolah'], ['文化祭', 'bunkasai', 'festival budaya sekolah'], ['授業', 'jugyou', 'pelajaran / kuliah'], ['発表', 'happyou', 'presentasi']],
    [['アルバイト', 'arubaito', 'kerja paruh waktu'], ['店長', 'tenchou', 'manajer toko'], ['交代', 'koutai', 'pergantian (shift)'], ['遅刻', 'chikoku', 'terlambat'], ['給料', 'kyuuryou', 'gaji'], ['残業', 'zangyou', 'lembur']],
    [['家賃', 'yachin', 'sewa rumah'], ['引っ越し', 'hikkoshi', 'pindahan'], ['大家', 'ooya', 'pemilik rumah sewa'], ['近所', 'kinjo', 'lingkungan sekitar'], ['ごみ', 'gomi', 'sampah'], ['駐車場', 'chuushajou', 'tempat parkir']],
    [['規則', 'kisoku', 'peraturan'], ['禁止', 'kinshi', 'larangan'], ['守る', 'mamoru', 'mematuhi / melindungi'], ['注意', 'chuui', 'perhatian / peringatan'], ['許可', 'kyoka', 'izin'], ['必要', 'hitsuyou', 'perlu']],
    [['比べる', 'kuraberu', 'membandingkan'], ['〜より', '~yori', 'daripada ~'], ['一番', 'ichiban', 'paling / nomor satu'], ['同じ', 'onaji', 'sama'], ['違う', 'chigau', 'berbeda'], ['ほう', 'hou', 'pihak / yang lebih (dalam perbandingan)']],
    [['経験', 'keiken', 'pengalaman'], ['初めて', 'hajimete', 'pertama kali'], ['思い出', 'omoide', 'kenangan'], ['珍しい', 'mezurashii', 'langka / jarang'], ['登る', 'noboru', 'mendaki'], ['習う', 'narau', 'belajar (dari orang)']],
    [['相談', 'soudan', 'konsultasi / berunding'], ['意見', 'iken', 'pendapat'], ['無理', 'muri', 'mustahil / berlebihan'], ['気をつける', 'ki o tsukeru', 'berhati-hati'], ['やめる', 'yameru', 'berhenti'], ['休む', 'yasumu', 'istirahat']],
    [['予約する', 'yoyaku suru', 'memesan tempat'], ['席', 'seki', 'kursi / tempat duduk'], ['〜名様', '~meisama', '~ orang (tamu, sopan)'], ['キャンセル', 'kyanseru', 'pembatalan'], ['変更', 'henkou', 'perubahan'], ['確認', 'kakunin', 'konfirmasi']],
    [['値段', 'nedan', 'harga'], ['割引', 'waribiki', 'diskon'], ['売り場', 'uriba', 'bagian penjualan'], ['試着', 'shichaku', 'mencoba pakaian'], ['袋', 'fukuro', 'kantong'], ['お釣り', 'otsuri', 'uang kembalian']],
    [['嬉しい', 'ureshii', 'senang'], ['悲しい', 'kanashii', 'sedih'], ['寂しい', 'sabishii', 'kesepian'], ['恥ずかしい', 'hazukashii', 'malu'], ['怒る', 'okoru', 'marah'], ['心配', 'shinpai', 'khawatir']],
    [['天気予報', 'tenki yohou', 'prakiraan cuaca'], ['台風', 'taifuu', 'topan'], ['曇り', 'kumori', 'berawan'], ['傘', 'kasa', 'payung'], ['中止', 'chuushi', 'pembatalan'], ['延期', 'enki', 'penundaan']],
    [['市役所', 'shiyakusho', 'balai kota'], ['図書館', 'toshokan', 'perpustakaan'], ['美術館', 'bijutsukan', 'museum seni'], ['交番', 'kouban', 'pos polisi'], ['受付', 'uketsuke', 'resepsionis / loket'], ['窓口', 'madoguchi', 'loket layanan']],
    [['押す', 'osu', 'menekan / mendorong'], ['引く', 'hiku', 'menarik'], ['回す', 'mawasu', 'memutar'], ['入れる', 'ireru', 'memasukkan'], ['説明書', 'setsumeisho', 'buku petunjuk'], ['手順', 'tejun', 'langkah / prosedur']],
    [['お祭り', 'omatsuri', 'festival'], ['花見', 'hanami', 'menikmati bunga sakura'], ['花火', 'hanabi', 'kembang api'], ['誕生日', 'tanjoubi', 'ulang tahun'], ['招待', 'shoutai', 'undangan'], ['参加', 'sanka', 'partisipasi']],
    [['始める', 'hajimeru', 'memulai'], ['終わる', 'owaru', 'selesai'], ['使う', 'tsukau', 'menggunakan'], ['待つ', 'matsu', 'menunggu'], ['持つ', 'motsu', 'membawa / memegang'], ['送る', 'okuru', 'mengirim / mengantar']],
    [['それから', 'sorekara', 'setelah itu'], ['だから', 'dakara', 'oleh karena itu'], ['でも', 'demo', 'tetapi'], ['それに', 'soreni', 'lagi pula'], ['例えば', 'tatoeba', 'misalnya'], ['つまり', 'tsumari', 'singkatnya / artinya']],
  ],
  intermediate: [
    [['意見', 'iken', 'pendapat'], ['賛成', 'sansei', 'setuju'], ['反対', 'hantai', 'menentang'], ['考え', 'kangae', 'gagasan / pikiran'], ['立場', 'tachiba', 'posisi / sudut pandang'], ['印象', 'inshou', 'kesan']],
    [['上司', 'joushi', 'atasan'], ['部下', 'buka', 'bawahan'], ['同僚', 'douryou', 'rekan kerja'], ['担当', 'tantou', 'penanggung jawab'], ['締め切り', 'shimekiri', 'tenggat waktu'], ['報告', 'houkoku', 'laporan']],
    [['事件', 'jiken', 'insiden / kasus'], ['事故', 'jiko', 'kecelakaan'], ['記事', 'kiji', 'artikel'], ['政府', 'seifu', 'pemerintah'], ['発表する', 'happyou suru', 'mengumumkan'], ['増加', 'zouka', 'peningkatan']],
    [['お客様', 'okyakusama', 'pelanggan (sopan)'], ['対応', 'taiou', 'penanganan / respons'], ['サービス', 'saabisu', 'layanan'], ['返品', 'henpin', 'pengembalian barang'], ['交換', 'koukan', 'penukaran'], ['保証', 'hoshou', 'garansi']],
    [['講義', 'kougi', 'kuliah'], ['単位', 'tan\'i', 'SKS / satuan kredit'], ['専攻', 'senkou', 'jurusan'], ['論文', 'ronbun', 'makalah / skripsi'], ['奨学金', 'shougakukin', 'beasiswa'], ['研究', 'kenkyuu', 'penelitian']],
    [['問題', 'mondai', 'masalah'], ['原因', 'gen\'in', 'penyebab'], ['解決', 'kaiketsu', 'penyelesaian'], ['方法', 'houhou', 'cara / metode'], ['改善', 'kaizen', 'perbaikan'], ['工夫', 'kufuu', 'akal / upaya kreatif']],
    [['文化', 'bunka', 'budaya'], ['習慣', 'shuukan', 'kebiasaan'], ['伝統', 'dentou', 'tradisi'], ['礼儀', 'reigi', 'tata krama'], ['価値観', 'kachikan', 'nilai / pandangan hidup'], ['行事', 'gyouji', 'acara tahunan / upacara']],
    [['理由', 'riyuu', 'alasan'], ['根拠', 'konkyo', 'dasar / bukti'], ['主張', 'shuchou', 'klaim / pendapat utama'], ['例', 'rei', 'contoh'], ['結論', 'ketsuron', 'kesimpulan'], ['説得', 'settoku', 'membujuk / meyakinkan']],
    [['推測', 'suisoku', 'dugaan'], ['判断', 'handan', 'penilaian / keputusan'], ['可能性', 'kanousei', 'kemungkinan'], ['確か', 'tashika', 'pasti / seingat saya'], ['おそらく', 'osoraku', 'barangkali'], ['どうやら', 'douyara', 'tampaknya']],
    [['件名', 'kenmei', 'subjek (email)'], ['添付', 'tenpu', 'lampiran'], ['宛先', 'atesaki', 'alamat tujuan'], ['お世話になっております', 'osewa ni natte orimasu', 'salam pembuka bisnis'], ['ご確認', 'gokakunin', 'mohon diperiksa'], ['よろしくお願いいたします', 'yoroshiku onegai itashimasu', 'mohon kerja samanya']],
    [['苦情', 'kujou', 'keluhan'], ['不満', 'fuman', 'ketidakpuasan'], ['迷惑', 'meiwaku', 'gangguan / merepotkan'], ['謝る', 'ayamaru', 'meminta maaf'], ['弁償', 'benshou', 'ganti rugi'], ['改める', 'aratameru', 'memperbaiki / mengubah']],
    [['調査', 'chousa', 'survei / penyelidikan'], ['回答', 'kaitou', 'jawaban (survei)'], ['割合', 'wariai', 'proporsi / persentase'], ['結果', 'kekka', 'hasil'], ['対象', 'taishou', 'sasaran / objek'], ['傾向', 'keikou', 'kecenderungan']],
    [['提案', 'teian', 'usulan'], ['計画', 'keikaku', 'rencana'], ['目的', 'mokuteki', 'tujuan'], ['予算', 'yosan', 'anggaran'], ['効果', 'kouka', 'efek / hasil'], ['実施', 'jisshi', 'pelaksanaan']],
    [['手続き', 'tetsuzuki', 'prosedur'], ['段階', 'dankai', 'tahap'], ['まず', 'mazu', 'pertama-tama'], ['次に', 'tsugi ni', 'selanjutnya'], ['最後に', 'saigo ni', 'terakhir'], ['完成', 'kansei', 'penyelesaian / rampung']],
    [['悔しい', 'kuyashii', 'kesal / menyesal (kalah)'], ['懐かしい', 'natsukashii', 'rindu (masa lalu)'], ['羨ましい', 'urayamashii', 'iri'], ['気まずい', 'kimazui', 'canggung'], ['ほっとする', 'hotto suru', 'lega'], ['がっかりする', 'gakkari suru', 'kecewa']],
    [['ようやく', 'youyaku', 'akhirnya (setelah lama)'], ['いきなり', 'ikinari', 'tiba-tiba'], ['わざわざ', 'wazawaza', 'repot-repot / sengaja'], ['せっかく', 'sekkaku', 'sudah susah-susah'], ['たまたま', 'tamatama', 'kebetulan'], ['ますます', 'masumasu', 'semakin']],
    [['認める', 'mitomeru', 'mengakui'], ['求める', 'motomeru', 'menuntut / mencari'], ['含む', 'fukumu', 'mengandung / termasuk'], ['与える', 'ataeru', 'memberikan'], ['伝える', 'tsutaeru', 'menyampaikan'], ['備える', 'sonaeru', 'bersiap / melengkapi']],
    [['しかし', 'shikashi', 'namun'], ['そのため', 'sono tame', 'oleh karena itu'], ['一方', 'ippou', 'sementara itu'], ['さらに', 'sarani', 'selain itu'], ['つまり', 'tsumari', 'dengan kata lain'], ['なぜなら', 'nazenara', 'sebab']],
    [['丁寧語', 'teineigo', 'bahasa sopan'], ['敬語', 'keigo', 'bahasa hormat'], ['くだけた', 'kudaketa', 'santai / informal'], ['改まった', 'aratamatta', 'formal / resmi'], ['言葉遣い', 'kotobazukai', 'cara berbicara'], ['目上', 'meue', 'orang yang lebih senior']],
  ],
  advanced: [
    [['概念', 'gainen', 'konsep'], ['本質', 'honshitsu', 'esensi'], ['要因', 'youin', 'faktor'], ['側面', 'sokumen', 'aspek'], ['前提', 'zentei', 'premis / asumsi dasar'], ['背景', 'haikei', 'latar belakang']],
    [['政策', 'seisaku', 'kebijakan'], ['制度', 'seido', 'sistem / institusi'], ['規制', 'kisei', 'regulasi'], ['導入', 'dounyuu', 'penerapan / pengenalan'], ['施策', 'shisaku', 'langkah kebijakan'], ['見直し', 'minaoshi', 'peninjauan ulang']],
    [['取引', 'torihiki', 'transaksi'], ['契約', 'keiyaku', 'kontrak'], ['業績', 'gyouseki', 'kinerja bisnis'], ['市場', 'shijou', 'pasar'], ['競争', 'kyousou', 'persaingan'], ['戦略', 'senryaku', 'strategi']],
    [['仮説', 'kasetsu', 'hipotesis'], ['検証', 'kenshou', 'verifikasi'], ['分析', 'bunseki', 'analisis'], ['文献', 'bunken', 'literatur'], ['考察', 'kousatsu', 'pembahasan'], ['手法', 'shuhou', 'metode']],
    [['統計', 'toukei', 'statistik'], ['推移', 'suii', 'perubahan dari waktu ke waktu'], ['上昇', 'joushou', 'kenaikan'], ['減少', 'genshou', 'penurunan'], ['平均', 'heikin', 'rata-rata'], ['比率', 'hiritsu', 'rasio']],
    [['危険性', 'kikensei', 'tingkat bahaya'], ['懸念', 'kenen', 'kekhawatiran'], ['損失', 'sonshitsu', 'kerugian'], ['対策', 'taisaku', 'langkah penanganan'], ['予防', 'yobou', 'pencegahan'], ['回避', 'kaihi', 'penghindaran']],
    [['利害関係者', 'rigai kankeisha', 'pemangku kepentingan'], ['株主', 'kabunushi', 'pemegang saham'], ['顧客', 'kokyaku', 'klien / pelanggan'], ['地域住民', 'chiiki juumin', 'warga setempat'], ['合意', 'goui', 'kesepakatan'], ['調整', 'chousei', 'koordinasi / penyesuaian']],
    [['したがって', 'shitagatte', 'oleh karena itu (formal)'], ['ただし', 'tadashi', 'namun demikian / dengan catatan'], ['なお', 'nao', 'sebagai tambahan'], ['すなわち', 'sunawachi', 'yaitu'], ['にもかかわらず', 'nimo kakawarazu', 'meskipun demikian'], ['とはいえ', 'to wa ie', 'walaupun begitu']],
    [['反論', 'hanron', 'sanggahan'], ['指摘', 'shiteki', 'penunjukan (masalah)'], ['矛盾', 'mujun', 'kontradiksi'], ['妥協', 'dakyou', 'kompromi'], ['譲歩', 'jouho', 'konsesi'], ['異論', 'iron', 'pendapat berbeda']],
    [['社説', 'shasetsu', 'tajuk rencana'], ['論評', 'ronpyou', 'ulasan kritis'], ['世論', 'yoron', 'opini publik'], ['報道', 'houdou', 'pemberitaan'], ['批判', 'hihan', 'kritik'], ['論調', 'ronchou', 'nada argumen']],
    [['条項', 'joukou', 'pasal / klausul'], ['規約', 'kiyaku', 'ketentuan'], ['違反', 'ihan', 'pelanggaran'], ['義務', 'gimu', 'kewajiban'], ['権利', 'kenri', 'hak'], ['責任', 'sekinin', 'tanggung jawab']],
    [['投資', 'toushi', 'investasi'], ['資金', 'shikin', 'dana'], ['利益', 'rieki', 'keuntungan'], ['負債', 'fusai', 'utang / liabilitas'], ['金利', 'kinri', 'suku bunga'], ['景気', 'keiki', 'kondisi ekonomi']],
    [['人工知能', 'jinkou chinou', 'kecerdasan buatan'], ['普及', 'fukyuu', 'penyebaran luas'], ['自動化', 'jidouka', 'otomatisasi'], ['情報漏洩', 'jouhou rouei', 'kebocoran informasi'], ['革新', 'kakushin', 'inovasi'], ['活用', 'katsuyou', 'pemanfaatan']],
    [['少子化', 'shoushika', 'penurunan angka kelahiran'], ['高齢化', 'koureika', 'penuaan populasi'], ['格差', 'kakusa', 'kesenjangan'], ['福祉', 'fukushi', 'kesejahteraan sosial'], ['雇用', 'koyou', 'lapangan kerja'], ['共生', 'kyousei', 'hidup berdampingan']],
    [['多様性', 'tayousei', 'keberagaman'], ['固定観念', 'kotei kannen', 'stereotip'], ['同調圧力', 'douchou atsuryoku', 'tekanan untuk seragam'], ['継承', 'keishou', 'pewarisan'], ['独自', 'dokuji', 'khas / orisinal'], ['商業化', 'shougyouka', 'komersialisasi']],
    [['維持', 'iji', 'pemeliharaan'], ['促進', 'sokushin', 'percepatan / dorongan'], ['確保', 'kakuho', 'pengamanan / memastikan'], ['把握', 'haaku', 'pemahaman menyeluruh'], ['貢献', 'kouken', 'kontribusi'], ['抑制', 'yokusei', 'pengendalian / penekanan']],
    [['腕を上げる', 'ude o ageru', 'meningkatkan keterampilan'], ['手を打つ', 'te o utsu', 'mengambil tindakan'], ['頭が下がる', 'atama ga sagaru', 'kagum / hormat'], ['目を通す', 'me o toosu', 'membaca sekilas'], ['気が進まない', 'ki ga susumanai', 'enggan'], ['口を出す', 'kuchi o dasu', 'ikut campur bicara']],
    [['伺う', 'ukagau', 'bertanya / berkunjung (merendah)'], ['申し上げる', 'moushiageru', 'menyampaikan (merendah)'], ['拝見する', 'haiken suru', 'melihat (merendah)'], ['存じる', 'zonjiru', 'mengetahui (merendah)'], ['お越しになる', 'okoshi ni naru', 'datang (hormat)'], ['ご覧になる', 'goran ni naru', 'melihat (hormat)']],
    [['見込む', 'mikomu', 'memperkirakan / mengandalkan'], ['見なす', 'minasu', 'menganggap'], ['踏まえる', 'fumaeru', 'mempertimbangkan / berdasarkan'], ['掲げる', 'kakageru', 'mengusung'], ['損なう', 'sokonau', 'merusak / merugikan'], ['補う', 'oginau', 'melengkapi / menutupi kekurangan']],
  ],
  proficiency: [
    [['枠組み', 'wakugumi', 'kerangka'], ['言説', 'gensetsu', 'wacana'], ['パラダイム', 'paradaimu', 'paradigma'], ['知見', 'chiken', 'temuan / wawasan ilmiah'], ['射程', 'shatei', 'cakupan / jangkauan'], ['相関', 'soukan', 'korelasi']],
    [['財源', 'zaigen', 'sumber anggaran'], ['規制緩和', 'kisei kanwa', 'deregulasi'], ['透明性', 'toumeisei', 'transparansi'], ['説明責任', 'setsumei sekinin', 'akuntabilitas'], ['是正', 'zesei', 'koreksi / pembenahan'], ['施行', 'shikou', 'pemberlakuan (undang-undang)']],
    [['実証する', 'jisshou suru', 'membuktikan secara empiris'], ['提唱する', 'teishou suru', 'mencetuskan / menganjurkan'], ['援用する', 'en\'you suru', 'mengutip untuk mendukung'], ['概観する', 'gaikan suru', 'meninjau secara umum'], ['精査する', 'seisa suru', 'meneliti secara cermat'], ['再考する', 'saikou suru', 'mempertimbangkan ulang']],
    [['ひいては', 'hiite wa', 'pada akhirnya / lebih jauh lagi'], ['いわば', 'iwaba', 'boleh dikatakan'], ['むしろ', 'mushiro', 'justru / malah'], ['もっとも', 'mottomo', 'meskipun demikian (koreksi)'], ['ともすれば', 'tomosureba', 'cenderung mudah'], ['翻って', 'hirugaette', 'sebaliknya / kembali ke']],
    [['訴訟', 'soshou', 'gugatan hukum'], ['判決', 'hanketsu', 'putusan pengadilan'], ['原告', 'genkoku', 'penggugat'], ['被告', 'hikoku', 'tergugat / terdakwa'], ['準拠', 'junkyo', 'kepatuhan pada standar'], ['管轄', 'kankatsu', 'yurisdiksi']],
    [['偏向', 'henkou', 'bias'], ['扇情的', 'senjouteki', 'sensasional'], ['印象操作', 'inshou sousa', 'manipulasi citra'], ['裏付け', 'urazuke', 'bukti pendukung'], ['検閲', 'ken\'etsu', 'sensor'], ['情報源', 'jouhougen', 'sumber informasi']],
    [['倫理', 'rinri', 'etika'], ['尊厳', 'songen', 'martabat'], ['公正', 'kousei', 'keadilan / fair'], ['良心', 'ryoushin', 'hati nurani'], ['葛藤', 'kattou', 'konflik batin'], ['規範', 'kihan', 'norma']],
    [['景気後退', 'keiki koutai', 'resesi'], ['需給', 'jukyuu', 'permintaan dan penawaran'], ['物価', 'bukka', 'harga barang'], ['為替', 'kawase', 'kurs'], ['財政赤字', 'zaisei akaji', 'defisit anggaran'], ['持続可能', 'jizoku kanou', 'berkelanjutan']],
    [['汎用', 'han\'you', 'serbaguna'], ['実装', 'jissou', 'implementasi'], ['脆弱性', 'zeijakusei', 'kerentanan'], ['演算', 'enzan', 'komputasi'], ['膨大', 'boudai', 'sangat besar'], ['代替', 'daitai', 'alternatif / substitusi']],
    [['生態系', 'seitaikei', 'ekosistem'], ['温室効果', 'onshitsu kouka', 'efek rumah kaca'], ['排出', 'haishutsu', 'emisi'], ['枯渇', 'kokatsu', 'penipisan / habis'], ['循環', 'junkan', 'sirkulasi / daur'], ['保全', 'hozen', 'konservasi']],
    [['比喩', 'hiyu', 'metafora'], ['叙述', 'jojutsu', 'narasi / deskripsi'], ['余韻', 'yoin', 'kesan yang tertinggal'], ['作風', 'sakufuu', 'gaya karya'], ['風刺', 'fuushi', 'satir'], ['趣', 'omomuki', 'nuansa / cita rasa']],
    [['存在', 'sonzai', 'eksistensi'], ['認識', 'ninshiki', 'kognisi / pemahaman'], ['主観', 'shukan', 'subjektivitas'], ['客観', 'kyakkan', 'objektivitas'], ['普遍', 'fuhen', 'universal'], ['逆説', 'gyakusetsu', 'paradoks']],
    [['賜る', 'tamawaru', 'menerima (dari atasan, sangat hormat)'], ['恐縮', 'kyoushuku', 'merasa sangat tidak enak / berterima kasih'], ['ご高配', 'gokouhai', 'perhatian baik Anda'], ['ご査収', 'gosashuu', 'mohon diterima dan diperiksa'], ['お力添え', 'ochikarazoe', 'bantuan Anda'], ['ご鞭撻', 'gobentatsu', 'dorongan / bimbingan Anda']],
    [['腑に落ちない', 'fu ni ochinai', 'tidak masuk akal / belum paham'], ['一石を投じる', 'isseki o toujiru', 'memicu diskusi'], ['襟を正す', 'eri o tadasu', 'bersikap serius / berbenah'], ['水を差す', 'mizu o sasu', 'merusak suasana'], ['二の足を踏む', 'ni no ashi o fumu', 'ragu-ragu'], ['肝に銘じる', 'kimo ni meijiru', 'mengingat baik-baik']],
    [['一石二鳥', 'isseki nichou', 'sekali dayung dua pulau terlampaui'], ['試行錯誤', 'shikou sakugo', 'coba-coba (trial and error)'], ['臨機応変', 'rinki ouhen', 'fleksibel sesuai situasi'], ['本末転倒', 'honmatsu tentou', 'terbalik prioritasnya'], ['賛否両論', 'sanpi ryouron', 'pro dan kontra'], ['一朝一夕', 'icchou isseki', 'dalam waktu singkat']],
    [['顕著', 'kencho', 'mencolok / signifikan'], ['緻密', 'chimitsu', 'teliti / cermat'], ['漠然', 'bakuzen', 'samar / tidak jelas'], ['逸脱', 'itsudatsu', 'penyimpangan'], ['凌駕', 'ryouga', 'melampaui'], ['払拭', 'fusshoku', 'menghapus (keraguan)']],
    [['看過できない', 'kanka dekinai', 'tidak bisa diabaikan'], ['疑問の余地がない', 'gimon no yochi ga nai', 'tidak diragukan'], ['一概には言えない', 'ichigai ni wa ienai', 'tidak bisa digeneralisasi'], ['示唆に富む', 'shisa ni tomu', 'kaya akan implikasi'], ['論を俟たない', 'ron o matanai', 'tidak perlu diperdebatkan'], ['留保する', 'ryuuho suru', 'menahan (penilaian)']],
    [['如実', 'nyojitsu', 'nyata / jelas apa adanya'], ['些細', 'sasai', 'sepele'], ['妥当', 'datou', 'wajar / tepat'], ['恣意的', 'shiiteki', 'sewenang-wenang'], ['画期的', 'kakkiteki', 'terobosan'], ['不可欠', 'fukaketsu', 'sangat diperlukan']],
    [['培う', 'tsuchikau', 'memupuk'], ['もたらす', 'motarasu', 'membawa (akibat)'], ['覆す', 'kutsugaesu', 'membalikkan (keputusan / teori)'], ['見極める', 'mikiwameru', 'memastikan dengan cermat'], ['裏打ちする', 'uraichi suru', 'menopang / mendukung'], ['帰結する', 'kiketsu suru', 'berujung pada']],
  ],
};

function toWords(tuples: WordTuple[]): JapaneseWord[] {
  return tuples.map(([japanese, romaji, meaning]) => ({ japanese, romaji, meaning }));
}

/** Themed words for a lesson (1-based). The review lesson takes one word from every theme. */
export function getJapaneseVocabularySet(level: JapaneseLevelId, lessonId: number): JapaneseWord[] {
  const themes = bank[level];
  const theme = themes[lessonId - 1];
  if (theme) return toWords(theme);
  return toWords(themes.flatMap((set, index) => set.slice(index % 3, (index % 3) + 1)));
}

export function getJapaneseLevelWords(level: JapaneseLevelId): JapaneseWord[] {
  return toWords(bank[level].flat());
}

export function japaneseVocabularyThemeCount(level: JapaneseLevelId) {
  return bank[level].length;
}
