// Mandarin Question Builder: question words and particles, 30 per level.
// [prompt, Indonesian translation, answer, three wrong options, label, rule]
// Label and rule are shown before answering, so they explain the meaning without naming the answer.
// Wrong options never include a synonym that would also fit the translation.
export type ChoiceTuple = [prompt: string, translation: string, answer: string, wrong: string[], label: string, rule: string];

const WHAT = 'Menanyakan benda/hal (= apa)';
const WHERE = 'Menanyakan tempat (= di mana / ke mana)';
const WHO = 'Menanyakan orang (= siapa)';
const FEW = 'Jumlah kecil, diikuti kata bantu bilangan';
const YES_NO = 'Partikel tanya ya/tidak di akhir kalimat';
const HOW_MUCH = 'Jumlah/harga, bisa tanpa kata bantu bilangan';
const HOW = 'Cara melakukan (= bagaimana caranya)';
const HOW_IS = 'Menanyakan keadaan/pendapat (= bagaimana)';
const WHY = 'Menanyakan alasan (= mengapa)';
const WHEN = 'Menanyakan waktu (= kapan)';
const OR = 'Pilihan dalam pertanyaan (= atau)';
const WHICH = 'Memilih salah satu (= yang mana), + kata bantu bilangan';
const DEGREE = 'Seberapa + adjektiva';

export const easyQuestions: ChoiceTuple[] = [
  ['你叫____名字？', 'Siapa namamu?', '什么', ['哪儿', '谁', '几'], 'Nama', WHAT],
  ['你住在____？', 'Kamu tinggal di mana?', '哪儿', ['什么', '谁', '几'], 'Tempat', WHERE],
  ['他是____？', 'Dia siapa?', '谁', ['什么', '哪儿', '几'], 'Orang', WHO],
  ['你有____个哥哥？', 'Kamu punya berapa kakak laki-laki?', '几', ['什么', '谁', '哪儿'], 'Jumlah', FEW],
  ['你是学生____？', 'Apakah kamu pelajar?', '吗', ['呢', '吧', '什么'], 'Ya / tidak', YES_NO],
  ['我很好，你____？', 'Saya baik, kalau kamu?', '呢', ['吗', '吧', '什么'], 'Bertanya balik', 'Partikel "kalau …?" setelah kata benda/ganti'],
  ['这是____？', 'Ini apa?', '什么', ['谁', '哪儿', '几'], 'Benda', WHAT],
  ['现在____点？', 'Sekarang jam berapa?', '几', ['多少', '什么', '谁'], 'Jam', 'Angka jam (= jam berapa)'],
  ['你去____？', 'Kamu pergi ke mana?', '哪儿', ['什么', '谁', '几'], 'Tujuan', WHERE],
  ['那是____的书？', 'Itu buku siapa?', '谁', ['什么', '哪儿', '几'], 'Pemilik', 'Pemilik (= milik siapa) + 的'],
  ['你喜欢喝茶____？', 'Apakah kamu suka minum teh?', '吗', ['呢', '吧', '谁'], 'Ya / tidak', YES_NO],
  ['今天星期____？', 'Hari ini hari apa?', '几', ['什么', '多少', '哪'], 'Hari', 'Nama hari memakai angka (= hari ke berapa)'],
  ['你今年____岁？', 'Umurmu berapa tahun (anak)?', '几', ['哪', '什么', '谁'], 'Umur anak', 'Umur anak di bawah 10 tahun'],
  ['你是____国人？', 'Kamu orang negara mana?', '哪', ['什么', '谁', '几'], 'Asal negara', 'Memilih negara (= mana) + 国'],
  ['他们在____？', 'Mereka di mana?', '哪儿', ['什么', '谁', '几'], 'Tempat', WHERE],
  ['你家有____口人？', 'Keluargamu ada berapa orang?', '几', ['什么', '谁', '哪儿'], 'Jumlah', FEW],
  ['你想吃____？', 'Kamu mau makan apa?', '什么', ['谁', '哪儿', '几'], 'Benda', WHAT],
  ['____是你的老师？', 'Siapa gurumu?', '谁', ['什么', '哪儿', '几'], 'Orang', WHO],
  ['这是你的猫____？', 'Apakah ini kucingmu?', '吗', ['呢', '什么', '谁'], 'Ya / tidak', YES_NO],
  ['我的笔____？', 'Pulpenku mana?', '呢', ['吗', '吧', '谁'], 'Mencari benda', 'Kata benda + partikel = di mana …?'],
  ['你的生日是____？', 'Kapan ulang tahunmu?', '哪天', ['谁', '哪儿', '多少'], 'Tanggal', 'Hari yang mana (= kapan)'],
  ['你喜欢____颜色？', 'Kamu suka warna apa?', '什么', ['谁', '哪儿', '几'], 'Jenis', 'Apa + kata benda (= … apa)'],
  ['洗手间在____？', 'Toilet di mana?', '哪儿', ['什么', '谁', '几'], 'Tempat', WHERE],
  ['你会说中文____？', 'Bisakah kamu berbahasa Mandarin?', '吗', ['呢', '吧', '谁'], 'Ya / tidak', YES_NO],
  ['你爸爸做____工作？', 'Ayahmu bekerja sebagai apa?', '什么', ['谁', '哪儿', '几'], 'Pekerjaan', 'Apa + kata benda (= … apa)'],
  ['你们班有____学生？', 'Kelas kalian ada berapa murid?', '多少', ['什么', '谁', '哪儿'], 'Jumlah besar', HOW_MUCH],
  ['____个是你的？', 'Yang mana punyamu?', '哪', ['什么', '谁', '多'], 'Pilihan', WHICH],
  ['我们明天见，好____？', 'Sampai jumpa besok, oke?', '吗', ['呢', '什么', '谁'], 'Minta persetujuan', 'Usul + "baik?" + partikel tanya'],
  ['你妹妹叫____？', 'Adik perempuanmu namanya siapa?', '什么', ['哪儿', '几', '谁'], 'Nama', WHAT],
  ['他的电话号码是____？', 'Berapa nomor teleponnya?', '多少', ['几', '谁', '哪儿'], 'Nomor', 'Nomor telepon/kamar (= berapa)'],
];

export const mediumQuestions: ChoiceTuple[] = [
  ['这件衣服____钱？', 'Berapa harga baju ini?', '多少', ['几', '什么', '谁'], 'Harga', HOW_MUCH],
  ['你____去学校？', 'Bagaimana (naik apa) kamu ke sekolah?', '怎么', ['什么', '谁', '几'], 'Cara', HOW],
  ['这个菜____？', 'Bagaimana masakan ini?', '怎么样', ['什么', '哪儿', '谁'], 'Pendapat', HOW_IS],
  ['你喝茶____喝咖啡？', 'Kamu minum teh atau kopi?', '还是', ['或者', '和', '跟'], 'Pilihan', OR],
  ['你____中国人？', 'Kamu orang Tiongkok, bukan?', '是不是', ['什么', '哪儿', '谁'], 'Konfirmasi', 'Pola positif-negatif "ya atau bukan"'],
  ['你是老师____？', 'Kamu guru, kan?', '吧', ['呢', '什么', '谁'], 'Dugaan', 'Partikel dugaan (= …, kan?)'],
  ['你____来中国？', 'Kapan kamu datang ke Tiongkok?', '什么时候', ['怎么样', '谁', '多少'], 'Waktu', WHEN],
  ['你____不高兴？', 'Mengapa kamu tidak senang?', '为什么', ['什么', '谁', '几'], 'Alasan', WHY],
  ['你喜欢____喜欢中国菜？', 'Kamu suka masakan Tiongkok atau tidak?', '不', ['没', '吗', '呢'], 'Positif-negatif', 'V + negasi + V'],
  ['去火车站____走？', 'Ke stasiun lewat mana?', '怎么', ['什么', '谁', '几'], 'Arah', HOW],
  ['你今年____大？', 'Umurmu berapa?', '多', ['几', '什么', '谁'], 'Umur', DEGREE],
  ['你家离学校____远？', 'Seberapa jauh rumahmu dari sekolah?', '多', ['几', '什么', '谁'], 'Jarak', DEGREE],
  ['你周末一般做____？', 'Akhir pekan biasanya kamu melakukan apa?', '什么', ['怎么', '谁', '几'], 'Kegiatan', WHAT],
  ['你要____个？', 'Kamu mau yang mana?', '哪', ['什么', '谁', '多'], 'Pilihan', WHICH],
  ['我们一起去，____不好？', 'Kita pergi bersama, setuju?', '好', ['吗', '呢', '吧'], 'Ajakan', 'Adj + negasi + Adj di akhir usul'],
  ['这儿可以拍照____？', 'Boleh memotret di sini?', '吗', ['呢', '什么', '谁'], 'Izin', YES_NO],
  ['你每天____起床？', 'Jam berapa kamu bangun setiap hari?', '几点', ['多少', '什么', '哪儿'], 'Jam', 'Menanyakan jam (= jam berapa)'],
  ['你学中文学了____了？', 'Sudah berapa lama kamu belajar Mandarin?', '多久', ['多少', '几', '什么'], 'Durasi', 'Menanyakan lamanya waktu'],
  ['你觉得这本书____？', 'Menurutmu buku ini bagaimana?', '怎么样', ['怎么', '什么', '谁'], 'Pendapat', HOW_IS],
  ['他____没来上课？', 'Mengapa dia tidak masuk kelas?', '为什么', ['什么', '谁', '几'], 'Alasan', WHY],
  ['你要红的____蓝的？', 'Kamu mau yang merah atau biru?', '还是', ['或者', '和', '跟'], 'Pilihan', OR],
  ['他是你哥哥，____？', 'Dia kakakmu, kan?', '是不是', ['什么', '谁', '怎么'], 'Konfirmasi', 'Tag positif-negatif di akhir'],
  ['你____回家？', 'Kapan kamu pulang?', '什么时候', ['怎么样', '谁', '多少'], 'Waktu', WHEN],
  ['这个字____念？', 'Karakter ini dibaca bagaimana?', '怎么', ['什么', '谁', '几'], 'Cara', HOW],
  ['一斤苹果____钱？', 'Sekati apel berapa harganya?', '多少', ['几', '谁', '哪'], 'Harga', HOW_MUCH],
  ['你____学中文？', 'Mengapa kamu belajar Mandarin?', '为什么', ['什么', '哪儿', '谁'], 'Alasan', WHY],
  ['你的房间有____大？', 'Seberapa besar kamarmu?', '多', ['几', '什么', '谁'], 'Ukuran', DEGREE],
  ['你明天有空____？', 'Besok kamu ada waktu?', '吗', ['呢', '什么', '谁'], 'Ya / tidak', YES_NO],
  ['你看的是____本书？', 'Buku mana yang kamu baca?', '哪', ['什么', '谁', '多'], 'Pilihan', WHICH],
  ['你最近身体____？', 'Bagaimana kesehatanmu akhir-akhir ini?', '怎么样', ['什么', '谁', '几'], 'Keadaan', HOW_IS],
];

export const hardQuestions: ChoiceTuple[] = [
  ['你____去北京？', 'Kapan kamu pergi ke Beijing?', '什么时候', ['多久', '为什么', '怎么样'], 'Waktu', WHEN],
  ['你们是____认识的？', 'Bagaimana kalian dulu saling kenal?', '怎么', ['什么', '哪儿', '谁'], 'Cara (lampau)', HOW],
  ['你____会说这么多语言？', 'Kok kamu bisa berbicara banyak bahasa?', '怎么', ['什么', '哪儿', '多少'], 'Heran', 'Menanyakan sebab dengan nada heran (= kok)'],
  ['你来中国多____了？', 'Sudah berapa lama kamu di Tiongkok?', '久', ['少', '大', '远'], 'Durasi', 'Seberapa + lama'],
  ['这件事____是谁做的？', 'Sebenarnya siapa yang melakukan ini?', '到底', ['难道', '怎么', '为什么'], 'Penegasan', 'Adverbia "sebenarnya" dalam pertanyaan'],
  ['____你不知道吗？', 'Masa kamu tidak tahu?', '难道', ['到底', '究竟', '怎么'], 'Retoris', 'Pertanyaan retoris (= masa …?)'],
  ['你____去过上海？', 'Kamu pernah ke Shanghai atau tidak?', '有没有', ['是不是', '为什么', '怎么样'], 'Pengalaman', 'Positif-negatif dengan "ada"'],
  ['我们该____办？', 'Kita harus bagaimana?', '怎么', ['什么', '哪儿', '谁'], 'Solusi', HOW],
  ['你喜欢什么____的工作？', 'Kamu suka pekerjaan seperti apa?', '样', ['个', '种', '么'], 'Jenis', 'Apa + "rupa" (= seperti apa)'],
  ['你去过____国家？', 'Negara mana saja yang pernah kamu kunjungi?', '哪些', ['谁', '多少', '怎么'], 'Pilihan jamak', 'Yang mana saja (jamak)'],
  ['他____这么晚还不回来？', 'Kenapa dia sudah semalam ini belum pulang?', '怎么', ['什么', '哪儿', '谁'], 'Heran', 'Menanyakan sebab dengan nada heran (= kok)'],
  ['你是坐飞机去的____坐火车去的？', 'Kamu pergi naik pesawat atau kereta?', '还是', ['或者', '和', '跟'], 'Pilihan', OR],
  ['你到底去____？', 'Sebenarnya kamu pergi atau tidak?', '不去', ['吗', '了', '过'], 'Positif-negatif', '到底 tidak bisa dengan partikel ya/tidak'],
  ['这个问题你____看？', 'Bagaimana pendapatmu tentang masalah ini?', '怎么', ['什么', '谁', '哪儿'], 'Pendapat', 'Cara memandang (= bagaimana)'],
  ['你知道他住在____吗？', 'Apakah kamu tahu dia tinggal di mana?', '哪儿', ['什么', '谁', '几'], 'Tidak langsung', WHERE],
  ['你知道这是____的吗？', 'Tahukah kamu ini milik siapa?', '谁', ['什么', '哪儿', '几'], 'Tidak langsung', 'Pemilik (= milik siapa) + 的'],
  ['你怎么不早说____？', 'Kenapa tidak bilang dari tadi?', '呢', ['吗', '吧', '了'], 'Nada menyesal', 'Partikel pelembut dalam pertanyaan kata tanya'],
  ['你是____时候到的？', 'Kapan kamu tiba?', '什么', ['怎么', '哪', '多'], 'Waktu', 'Apa + "waktu" (= kapan)'],
  ['这么多菜，我们吃得完____？', 'Makanan sebanyak ini, sanggup kita habiskan?', '吃不完', ['吃完了', '吃得了', '不吃完'], 'Potensial', 'Potensial positif + potensial negatif'],
  ['你最喜欢____个季节？', 'Musim mana yang paling kamu suka?', '哪', ['什么', '谁', '多'], 'Pilihan', WHICH],
  ['你的手机是____买的？', 'Ponselmu dibeli kapan?', '什么时候', ['怎么样', '多少', '为什么'], 'Waktu', WHEN],
  ['你打算在北京待多____？', 'Kamu berencana tinggal di Beijing berapa lama?', '久', ['少', '大', '远'], 'Durasi', 'Seberapa + lama'],
  ['你难道不想家____？', 'Masa kamu tidak rindu rumah?', '吗', ['呢', '吧', '了'], 'Retoris', 'Pertanyaan retoris + partikel ya/tidak'],
  ['他为什么没来，你知道____？', 'Kamu tahu kenapa dia tidak datang?', '吗', ['呢', '吧', '什么'], 'Tidak langsung', YES_NO],
  ['你想喝点儿____？', 'Kamu mau minum sesuatu?', '什么', ['谁', '哪儿', '几'], 'Tak tentu', 'Kata tanya bermakna "sesuatu"'],
  ['有____能帮帮我吗？', 'Adakah seseorang yang bisa membantuku?', '谁', ['什么', '哪儿', '几'], 'Tak tentu', 'Kata tanya bermakna "seseorang"'],
  ['你们公司有____员工？', 'Perusahaanmu punya berapa karyawan?', '多少', ['几', '什么', '哪儿'], 'Jumlah besar', HOW_MUCH],
  ['我们见个面，____？', 'Bagaimana kalau kita bertemu?', '怎么样', ['什么', '谁', '哪儿'], 'Usul', 'Usul + "bagaimana?" di akhir'],
  ['你到底想要____？', 'Sebenarnya kamu mau apa?', '什么', ['谁', '怎么', '哪儿'], 'Penegasan', WHAT],
  ['这么重要的事，你怎么能不告诉我____？', 'Hal sepenting ini, bagaimana bisa kamu tidak memberitahuku?', '呢', ['吗', '吧', '了'], 'Nada menyesal', 'Partikel pelembut dalam pertanyaan kata tanya'],
];
