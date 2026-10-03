import type { LessonCoreTuple } from '../types';

// Grammar N3 — one entry per lesson (index = lesson - 1).
export const grammar: LessonCoreTuple[] = [
  ['Kesan dan dugaan: そう・よう・みたい', ['Akar ます + そう = kelihatannya (dari penglihatan langsung); bentuk biasa + そう = katanya.', 'ようだ (formal) dan みたいだ (lisan) = sepertinya, berdasarkan petunjuk.'], [
    ['このケーキはおいしそうですね。', 'Kono keeki wa oishisou desu ne.', 'Kue ini kelihatannya enak, ya.'],
    ['今にも雨が降りそうだ。', 'Ima ni mo ame ga furisou da.', 'Sepertinya sebentar lagi akan hujan.'],
    ['誰かが部屋に入ったようです。', 'Dareka ga heya ni haitta you desu.', 'Sepertinya ada seseorang yang masuk ke kamar.'],
    ['彼、風邪をひいたみたい。', 'Kare, kaze o hiita mitai.', 'Dia sepertinya masuk angin.'],
  ]],
  ['Kabar dan ciri khas: らしい', ['らしい (1): katanya/rupanya, berdasarkan informasi yang didengar.', 'らしい (2): khas/sesuai sifat: 男らしい, 春らしい.'], [
    ['駅前に新しい店ができるらしいよ。', 'Ekimae ni atarashii mise ga dekiru rashii yo.', 'Katanya akan ada toko baru di depan stasiun.'],
    ['課長は来月転勤するらしい。', 'Kachou wa raigetsu tenkin suru rashii.', 'Rupanya kepala seksi akan dimutasi bulan depan.'],
    ['今日は春らしい暖かい日ですね。', 'Kyou wa harurashii atatakai hi desu ne.', 'Hari ini hari hangat yang khas musim semi, ya.'],
    ['あんなことを言うなんて、彼らしくない。', 'Anna koto o iu nante, karerashikunai.', 'Bicara seperti itu bukan dirinya sekali.'],
  ]],
  ['Pengandaian ば dan なら', ['〜ば: syarat umum/hipotetis (行けば, 安ければ).', '〜なら: menanggapi topik dari lawan bicara (日本へ行くなら、京都がいいよ).'], [
    ['もっと練習すれば、上手になりますよ。', 'Motto renshuu sureba, jouzu ni narimasu yo.', 'Kalau berlatih lebih banyak, kamu akan mahir.'],
    ['安ければ、二つ買いたいです。', 'Yasukereba, futatsu kaitai desu.', 'Kalau murah, saya ingin membeli dua.'],
    ['北海道に行くなら、冬がおすすめです。', 'Hokkaidou ni iku nara, fuyu ga osusume desu.', 'Kalau mau ke Hokkaido, saya sarankan musim dingin.'],
    ['パソコンのことなら、山田さんに聞いて。', 'Pasokon no koto nara, Yamada san ni kiite.', 'Kalau soal komputer, tanya Yamada.'],
  ]],
  ['Walaupun: ても', ['Bentuk て + も = walaupun/meskipun; kata benda/な: 〜でも.', 'Dengan kata tanya: いくら〜ても, どんなに〜ても = sekeras apa pun.'], [
    ['雨が降っても、試合は行われます。', 'Ame ga futte mo, shiai wa okonawaremasu.', 'Walaupun hujan, pertandingan tetap diadakan.'],
    ['いくら説明しても、分かってもらえない。', 'Ikura setsumei shite mo, wakatte moraenai.', 'Sekeras apa pun saya menjelaskan, dia tidak mengerti.'],
    ['高くても、品質がいいものを選びます。', 'Takakute mo, hinshitsu ga ii mono o erabimasu.', 'Walaupun mahal, saya memilih barang berkualitas.'],
    ['日曜日でも、店は開いています。', 'Nichiyoubi demo, mise wa aite imasu.', 'Meskipun hari Minggu, toko tetap buka.'],
  ]],
  ['Tujuan: ために dan ように', ['ために: tujuan yang dikendalikan sendiri (kata kerja kehendak).', 'ように: tujuan berupa keadaan/kemampuan (potensial, ない, kata kerja non-kehendak).'], [
    ['家を買うために、貯金しています。', 'Ie o kau tame ni, chokin shite imasu.', 'Saya menabung untuk membeli rumah.'],
    ['健康のために、毎朝走っています。', 'Kenkou no tame ni, maiasa hashitte imasu.', 'Demi kesehatan, saya berlari setiap pagi.'],
    ['後ろの人にも聞こえるように、大きな声で話します。', 'Ushiro no hito ni mo kikoeru you ni, ookina koe de hanashimasu.', 'Saya berbicara keras agar orang di belakang juga bisa mendengar.'],
    ['忘れないように、メモしておきます。', 'Wasurenai you ni, memo shite okimasu.', 'Saya mencatatnya supaya tidak lupa.'],
  ]],
  ['Keputusan pihak lain: ことになる', ['〜ことになる: diputuskan (oleh organisasi/keadaan), bukan oleh pembicara.', '〜ことになっている: sudah menjadi aturan/kebiasaan.'], [
    ['来月から大阪支店で働くことになりました。', 'Raigetsu kara Oosaka shiten de hataraku koto ni narimashita.', 'Mulai bulan depan saya jadi bekerja di cabang Osaka.'],
    ['会議は中止することになった。', 'Kaigi wa chuushi suru koto ni natta.', 'Rapatnya diputuskan dibatalkan.'],
    ['この会社では、毎朝朝礼をすることになっています。', 'Kono kaisha de wa, maiasa chourei o suru koto ni natte imasu.', 'Di perusahaan ini, setiap pagi ada apel pagi.'],
    ['結局、私が幹事をすることになった。', 'Kekkyoku, watashi ga kanji o suru koto ni natta.', 'Akhirnya saya yang jadi panitia acara.'],
  ]],
  ['Keputusan sendiri: ことにする', ['〜ことにする: pembicara sendiri memutuskan.', '〜ことにしている: kebiasaan yang dijaga atas keputusan sendiri.'], [
    ['来年、日本の大学院を受けることにしました。', 'Rainen, Nihon no daigakuin o ukeru koto ni shimashita.', 'Saya memutuskan untuk ikut ujian pascasarjana di Jepang tahun depan.'],
    ['今日から甘い物を食べないことにする。', 'Kyou kara amai mono o tabenai koto ni suru.', 'Mulai hari ini saya memutuskan tidak makan makanan manis.'],
    ['寝る前にスマホを見ないことにしています。', 'Neru mae ni sumaho o minai koto ni shite imasu.', 'Saya membiasakan tidak melihat ponsel sebelum tidur.'],
    ['旅行はやめて、家でゆっくりすることにした。', 'Ryokou wa yamete, ie de yukkuri suru koto ni shita.', 'Saya batal berwisata dan memutuskan bersantai di rumah.'],
  ]],
  ['Logika dan kesimpulan: わけ', ['〜わけだ: pantas saja/jadi itu sebabnya (kesimpulan logis).', '〜わけではない: tidak berarti; 〜わけがない: mustahil.'], [
    ['十年も住んでいたのか。日本語が上手なわけだ。', 'Juunen mo sunde ita no ka. Nihongo ga jouzu na wake da.', 'Sudah sepuluh tahun tinggal? Pantas bahasa Jepangnya bagus.'],
    ['肉が嫌いなわけではありません。', 'Niku ga kirai na wake de wa arimasen.', 'Bukan berarti saya tidak suka daging.'],
    ['あんなに練習したんだから、負けるわけがない。', 'Anna ni renshuu shitan dakara, makeru wake ga nai.', 'Sudah berlatih sebanyak itu, mustahil kalah.'],
    ['道理で寒いわけだ。雪が降っている。', 'Douri de samui wake da. Yuki ga futte iru.', 'Pantas saja dingin. Salju sedang turun.'],
  ]],
  ['Keyakinan: はず', ['〜はずだ: seharusnya (keyakinan berdasar alasan).', '〜はずがない: tidak mungkin; 〜はずだった: seharusnya (tapi tidak terjadi).'], [
    ['荷物は今日届くはずです。', 'Nimotsu wa kyou todoku hazu desu.', 'Paketnya seharusnya tiba hari ini.'],
    ['彼はベジタリアンだから、肉を食べるはずがない。', 'Kare wa bejitarian da kara, niku o taberu hazu ga nai.', 'Dia vegetarian, jadi tidak mungkin makan daging.'],
    ['鍵はかばんに入れたはずなのに、ない。', 'Kagi wa kaban ni ireta hazu na noni, nai.', 'Seharusnya kunci sudah saya masukkan ke tas, tapi tidak ada.'],
    ['電車は九時に着くはずだった。', 'Densha wa kuji ni tsuku hazu datta.', 'Keretanya seharusnya tiba jam sembilan.'],
  ]],
  ['Kewajiban moral: べき', ['〜べきだ: seharusnya (menurut norma/akal sehat); する → すべき.', '〜べきではない: tidak seharusnya.'], [
    ['約束は守るべきだ。', 'Yakusoku wa mamoru beki da.', 'Janji seharusnya ditepati.'],
    ['学生はもっと本を読むべきだと思う。', 'Gakusei wa motto hon o yomu beki da to omou.', 'Menurut saya pelajar seharusnya lebih banyak membaca.'],
    ['人の悪口を言うべきではない。', 'Hito no waruguchi o iu beki de wa nai.', 'Tidak seharusnya menjelek-jelekkan orang.'],
    ['この問題はすぐに相談すべきでした。', 'Kono mondai wa sugu ni soudan subeki deshita.', 'Masalah ini seharusnya segera dikonsultasikan.'],
  ]],
  ['Tingkat: ほど dan くらい', ['〜ほど/〜くらい = sampai-sampai (tingkat ekstrem).', 'AほどBない = tidak se-B A; くらい lebih lisan dan bisa merendahkan (〜くらいできる).'], [
    ['泣きたいほど疲れています。', 'Nakitai hodo tsukarete imasu.', 'Saya lelah sampai ingin menangis.'],
    ['今年の夏は去年ほど暑くない。', 'Kotoshi no natsu wa kyonen hodo atsukunai.', 'Musim panas tahun ini tidak sepanas tahun lalu.'],
    ['自分の名前くらい漢字で書けます。', 'Jibun no namae kurai kanji de kakemasu.', 'Paling tidak nama sendiri bisa saya tulis dengan kanji.'],
    ['びっくりするくらい安かった。', 'Bikkuri suru kurai yasukatta.', 'Murahnya sampai mengejutkan.'],
  ]],
  ['Tidak hanya: だけでなく', ['AだけでなくBも = tidak hanya A, tetapi juga B.', 'Variasi formal: 〜ばかりでなく, 〜のみならず.'], [
    ['この店は味だけでなく、サービスもいい。', 'Kono mise wa aji dake de naku, saabisu mo ii.', 'Toko ini tidak hanya rasanya, pelayanannya juga bagus.'],
    ['彼は英語だけでなく、中国語も話せる。', 'Kare wa eigo dake de naku, chuugokugo mo hanaseru.', 'Dia tidak hanya bisa bahasa Inggris, tetapi juga bahasa Mandarin.'],
    ['子どもだけでなく、大人も楽しめる映画です。', 'Kodomo dake de naku, otona mo tanoshimeru eiga desu.', 'Film yang bisa dinikmati tidak hanya oleh anak-anak, tetapi juga orang dewasa.'],
    ['勉強だけでなく、部活も頑張っている。', 'Benkyou dake de naku, bukatsu mo ganbatte iru.', 'Tidak hanya belajar, dia juga giat di klub sekolah.'],
  ]],
  ['Sikap dan kontras: に対して', ['〜に対して (1): terhadap (sasaran sikap/tindakan).', '〜に対して (2): berbeda dengan (kontras dua hal).'], [
    ['お客様に対して失礼なことを言ってはいけない。', 'Okyakusama ni taishite shitsurei na koto o itte wa ikenai.', 'Tidak boleh berkata tidak sopan terhadap pelanggan.'],
    ['その意見に対して、反対する人が多かった。', 'Sono iken ni taishite, hantai suru hito ga ookatta.', 'Banyak orang yang menentang pendapat itu.'],
    ['兄が活発なのに対して、弟はおとなしい。', 'Ani ga kappatsu na no ni taishite, otouto wa otonashii.', 'Berbeda dengan kakak yang aktif, adiknya pendiam.'],
    ['都市の人口が増えているのに対して、農村は減っている。', 'Toshi no jinkou ga fuete iru no ni taishite, nouson wa hette iru.', 'Sementara penduduk kota bertambah, penduduk desa berkurang.'],
  ]],
  ['Tentang topik: について', ['〜について = tentang/mengenai; 〜についての + benda.', 'Lebih formal: 〜に関して, 〜に関する.'], [
    ['日本の歴史について調べています。', 'Nihon no rekishi ni tsuite shirabete imasu.', 'Saya sedang meneliti tentang sejarah Jepang.'],
    ['この件について、後でご説明します。', 'Kono ken ni tsuite, ato de gosetsumei shimasu.', 'Mengenai hal ini, akan saya jelaskan nanti.'],
    ['環境問題についての講演を聞いた。', 'Kankyou mondai ni tsuite no kouen o kiita.', 'Saya mendengarkan ceramah tentang masalah lingkungan.'],
    ['事故に関して、警察が調査している。', 'Jiko ni kanshite, keisatsu ga chousa shite iru.', 'Polisi sedang menyelidiki terkait kecelakaan itu.'],
  ]],
  ['Peran dan status: として', ['〜として = sebagai (peran, status, sudut pandang).', '〜としては = dari sudut pandang…; 〜としても = walaupun sebagai….'], [
    ['彼は通訳として会議に参加した。', 'Kare wa tsuuyaku to shite kaigi ni sanka shita.', 'Dia ikut rapat sebagai penerjemah.'],
    ['留学生として、日本の文化を学んでいます。', 'Ryuugakusei to shite, Nihon no bunka o manande imasu.', 'Sebagai mahasiswa asing, saya mempelajari budaya Jepang.'],
    ['私としては、この案に賛成です。', 'Watashi to shite wa, kono an ni sansei desu.', 'Kalau saya pribadi, saya setuju dengan usulan ini.'],
    ['この町は温泉地として有名だ。', 'Kono machi wa onsenchi to shite yuumei da.', 'Kota ini terkenal sebagai daerah onsen.'],
  ]],
  ['Tergantung dan oleh: によって', ['〜によって (1): tergantung pada (人によって違う).', '〜によって (2): oleh (pelaku pasif formal) / dengan cara.'], [
    ['考え方は人によって違います。', 'Kangaekata wa hito ni yotte chigaimasu.', 'Cara berpikir berbeda-beda tergantung orangnya.'],
    ['このお寺は有名な建築家によって設計された。', 'Kono otera wa yuumei na kenchikuka ni yotte sekkei sareta.', 'Kuil ini dirancang oleh arsitek terkenal.'],
    ['天気によって、予定を変えるかもしれません。', 'Tenki ni yotte, yotei o kaeru kamo shiremasen.', 'Tergantung cuaca, rencananya mungkin berubah.'],
    ['インターネットによって、生活が大きく変わった。', 'Intaanetto ni yotte, seikatsu ga ookiku kawatta.', 'Berkat internet, kehidupan berubah besar.'],
  ]],
  ['Pasif dan kausatif', ['Kausatif: 〜させる = menyuruh/membiarkan; pelaku yang disuruh ditandai に/を.', 'Kausatif-pasif: 〜させられる = terpaksa melakukan (disuruh orang lain).'], [
    ['母は弟に部屋を掃除させました。', 'Haha wa otouto ni heya o souji sasemashita.', 'Ibu menyuruh adik membersihkan kamar.'],
    ['子どもを自由に遊ばせています。', 'Kodomo o jiyuu ni asobasete imasu.', 'Saya membiarkan anak bermain dengan bebas.'],
    ['部長にお酒を飲まされました。', 'Buchou ni osake o nomasaremashita.', 'Saya dipaksa minum alkohol oleh kepala bagian.'],
    ['子どものころ、毎日ピアノを練習させられた。', 'Kodomo no koro, mainichi piano o renshuu saserareta.', 'Waktu kecil saya dipaksa berlatih piano setiap hari.'],
  ]],
  ['Pengantar keigo', ['尊敬語 (hormat) untuk tindakan orang lain: いらっしゃる, 召し上がる, お〜になる.', '謙譲語 (merendah) untuk tindakan sendiri: 参る, いただく, お〜する.'], [
    ['社長はもうお帰りになりました。', 'Shachou wa mou okaeri ni narimashita.', 'Direktur sudah pulang.'],
    ['先生は何を召し上がりますか。', 'Sensei wa nani o meshiagarimasu ka.', 'Bapak/Ibu guru mau makan apa?'],
    ['明日、私がそちらへ参ります。', 'Ashita, watashi ga sochira e mairimasu.', 'Besok saya akan datang ke sana.'],
    ['資料をお送りします。', 'Shiryou o ookuri shimasu.', 'Saya akan mengirimkan materinya.'],
  ]],
  ['Nominalisasi: の dan こと', ['の: untuk persepsi langsung (見る, 聞こえる) dan kalimat sehari-hari.', 'こと: untuk konsep abstrak, ~ことができる, ~ことにする, dan setelah 言う/話す.'], [
    ['子どもが歌っているのが聞こえます。', 'Kodomo ga utatte iru no ga kikoemasu.', 'Terdengar anak-anak sedang bernyanyi.'],
    ['毎朝早く起きるのは大変です。', 'Maiasa hayaku okiru no wa taihen desu.', 'Bangun pagi setiap hari itu berat.'],
    ['大切なのは、あきらめないことです。', 'Taisetsu na no wa, akiramenai koto desu.', 'Yang penting adalah tidak menyerah.'],
    ['彼が会社を辞めたことを知りませんでした。', 'Kare ga kaisha o yameta koto o shirimasen deshita.', 'Saya tidak tahu bahwa dia keluar dari perusahaan.'],
  ]],
  ['Ulasan grammar N3', ['Gabungkan dugaan (そう/らしい), tujuan (ために), keputusan (ことになる/にする), dan sikap (べき).', 'Perhatikan perbedaan nuansa yang mirip: はず vs べき, ために vs ように.'], [
    ['新しいプロジェクトのリーダーを任されることになった。', 'Atarashii purojekuto no riidaa o makasareru koto ni natta.', 'Saya jadi dipercaya memimpin proyek baru.'],
    ['成功させるために、まずメンバーの意見を聞くことにした。', 'Seikou saseru tame ni, mazu menbaa no iken o kiku koto ni shita.', 'Agar berhasil, saya memutuskan mendengar pendapat anggota dulu.'],
    ['簡単ではなさそうだが、やるべきことははっきりしている。', 'Kantan de wa nasasou da ga, yaru beki koto wa hakkiri shite iru.', 'Kelihatannya tidak mudah, tapi apa yang harus dilakukan sudah jelas.'],
    ['準備さえすれば、うまくいくはずだ。', 'Junbi sae sureba, umaku iku hazu da.', 'Asalkan bersiap, seharusnya berjalan lancar.'],
  ]],
];
