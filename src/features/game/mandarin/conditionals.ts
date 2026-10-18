// Mandarin Conditional Run: conditional and concessive connectors, 30 per level.
// [prompt, Indonesian translation, answer, three wrong options, type, rule]
// Type and rule are shown before answering, so they are written without the connector itself.
import type { ChoiceTuple } from './questions';

const IF = 'jika …, (maka) …';
const THEN = 'jika …, maka (hasil langsung) …';
const IF_END = 'jika … (penanda di akhir syarat), …';
const AS_SOON = 'begitu …, langsung …';
const AS_LONG = 'asalkan …, pasti …';
const ONLY_IF = 'hanya jika …, baru …';
const EVEN_IF = 'meskipun …, tetap …';
const NO_MATTER = 'bagaimanapun / apa pun …, tetap …';
const OTHERWISE = '…, kalau tidak …';
const UNLESS = 'kecuali …, (kalau tidak) …';
const IN_CASE = 'kalau-kalau / seandainya terjadi …';

export const easyConditionals: ChoiceTuple[] = [
  ['____明天下雨，我们就不去公园。', 'Jika besok hujan, kami tidak pergi ke taman.', '如果', ['因为', '虽然', '但是'], 'Syarat', IF],
  ['如果你累了，____休息一下吧。', 'Kalau kamu lelah, istirahatlah sebentar.', '就', ['也', '都', '才'], 'Hasil', THEN],
  ['____你有时间，我们一起吃饭吧。', 'Kalau kamu ada waktu, ayo makan bersama.', '要是', ['因为', '虽然', '所以'], 'Syarat lisan', IF],
  ['如果你不舒服____，就回家吧。', 'Kalau kamu tidak enak badan, pulanglah.', '的话', ['了', '吗', '呢'], 'Penutup syarat', IF_END],
  ['天气好，我们____去爬山。', 'Kalau cuaca bagus, kami pergi mendaki.', '就', ['也', '都', '才'], 'Hasil', THEN],
  ['____你去，我也去。', 'Kalau kamu pergi, saya juga pergi.', '如果', ['因为', '虽然', '但是'], 'Syarat', IF],
  ['如果你喜欢，我____送给你。', 'Kalau kamu suka, saya berikan untukmu.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['你不来，我____不去。', 'Kalau kamu tidak datang, saya juga tidak pergi.', '也', ['都', '才', '还'], 'Hasil serupa', 'jika …, (saya) juga …'],
  ['要是明天不下雨，我们____去海边。', 'Kalau besok tidak hujan, kami pergi ke pantai.', '就', ['也', '才', '都'], 'Hasil', THEN],
  ['____你饿了，可以先吃。', 'Kalau kamu lapar, boleh makan duluan.', '如果', ['因为', '虽然', '所以'], 'Syarat', IF],
  ['下雨____，我们就在家看电影。', 'Kalau hujan, kami menonton film di rumah.', '的话', ['了', '吗', '呢'], 'Penutup syarat', IF_END],
  ['你努力学习，____能考好。', 'Kalau kamu rajin belajar, kamu bisa lulus ujian dengan baik.', '就', ['也', '都', '还'], 'Hasil', THEN],
  ['____有问题，就问老师。', 'Kalau ada masalah, tanyakan pada guru.', '如果', ['因为', '虽然', '所以'], 'Syarat', IF],
  ['我____有钱，就买一辆车。', 'Kalau saya punya uang, saya akan membeli mobil.', '要是', ['因为', '虽然', '所以'], 'Syarat lisan', IF],
  ['冷的话，你____穿外套。', 'Kalau dingin, pakailah jaket.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['他一回家____做饭。', 'Begitu pulang, dia langsung memasak.', '就', ['才', '都', '也'], 'Begitu … langsung', AS_SOON],
  ['我一看书____想睡觉。', 'Begitu membaca buku, saya langsung mengantuk.', '就', ['才', '都', '还'], 'Begitu … langsung', AS_SOON],
  ['我____到北京就给你打电话。', 'Begitu tiba di Beijing, saya langsung meneleponmu.', '一', ['才', '都', '也'], 'Begitu … langsung', AS_SOON],
  ['如果明天不忙，我____去看你。', 'Kalau besok tidak sibuk, saya akan menjengukmu.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['如果你不想去，____别去了。', 'Kalau kamu tidak mau pergi, ya jangan pergi.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['你要是不懂，____问我。', 'Kalau tidak paham, tanyakan saja padaku.', '就', ['才', '都', '也'], 'Hasil', THEN],
  ['____你喜欢，就买吧。', 'Kalau kamu suka, beli saja.', '要是', ['因为', '虽然', '所以'], 'Syarat lisan', IF],
  ['如果你迟到了，老师____会生气。', 'Kalau kamu terlambat, guru akan marah.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['天一黑，路灯____亮了。', 'Begitu langit gelap, lampu jalan langsung menyala.', '就', ['才', '都', '还'], 'Begitu … langsung', AS_SOON],
  ['如果你有空____，来我家玩吧。', 'Kalau kamu senggang, main ke rumahku.', '的话', ['了', '吗', '呢'], 'Penutup syarat', IF_END],
  ['____我是你，我就去。', 'Kalau saya jadi kamu, saya akan pergi.', '如果', ['因为', '虽然', '所以'], 'Andaian', IF],
  ['你吃了药，病____会好。', 'Kalau kamu minum obat, sakitmu akan sembuh.', '就', ['才', '都', '还'], 'Hasil', THEN],
  ['我一听这首歌____很开心。', 'Begitu mendengar lagu ini, saya langsung senang.', '就', ['才', '都', '还'], 'Begitu … langsung', AS_SOON],
  ['____下雪，我们就堆雪人。', 'Kalau turun salju, kita membuat boneka salju.', '要是', ['因为', '虽然', '所以'], 'Syarat lisan', IF],
  ['你不想吃____，就别吃了。', 'Kalau kamu tidak mau makan, ya tidak usah.', '的话', ['吗', '呢', '过'], 'Penutup syarat', IF_END],
];

export const mediumConditionals: ChoiceTuple[] = [
  ['____你努力，就一定会成功。', 'Asalkan kamu berusaha, pasti akan berhasil.', '只要', ['只有', '虽然', '因为'], 'Syarat cukup', AS_LONG],
  ['只有多练习，____能说得流利。', 'Hanya dengan banyak berlatih baru bisa bicara lancar.', '才', ['就', '都', '也'], 'Syarat mutlak', ONLY_IF],
  ['____明天下大雨，比赛也会照常进行。', 'Meskipun besok hujan deras, pertandingan tetap berlangsung.', '即使', ['只要', '只有', '因为'], 'Konsesi', EVEN_IF],
  ['____天气怎么样，我们都要去。', 'Bagaimanapun cuacanya, kami tetap pergi.', '不管', ['即使', '只要', '如果'], 'Tanpa syarat', NO_MATTER],
  ['只要有时间，我____去看你。', 'Asalkan ada waktu, saya pasti menjengukmu.', '就', ['才', '都', '也'], 'Syarat cukup', AS_LONG],
  ['不管多忙，他____坚持跑步。', 'Sesibuk apa pun, dia tetap rutin lari.', '都', ['就', '才', '再'], 'Tanpa syarat', NO_MATTER],
  ['即使你不说，我____知道。', 'Meskipun kamu tidak bilang, aku tetap tahu.', '也', ['就', '才', '再'], 'Konsesi', EVEN_IF],
  ['____你同意，否则我不会去。', 'Kecuali kamu setuju, saya tidak akan pergi.', '除非', ['只要', '即使', '不管'], 'Pengecualian', UNLESS],
  ['快点儿走吧，____就要迟到了。', 'Ayo cepat, kalau tidak kita akan terlambat.', '要不然', ['如果', '即使', '只要'], 'Akibat', OTHERWISE],
  ['____我忘了，请提醒我。', 'Kalau-kalau saya lupa, tolong ingatkan saya.', '万一', ['即使', '不管', '只有'], 'Antisipasi', IN_CASE],
  ['____你来，我们才开始。', 'Hanya jika kamu datang, kami baru mulai.', '只有', ['只要', '即使', '不管'], 'Syarat mutlak', ONLY_IF],
  ['无论遇到什么困难，我们____不放弃。', 'Apa pun kesulitannya, kami tidak akan menyerah.', '都', ['就', '才', '再'], 'Tanpa syarat', NO_MATTER],
  ['只要不下雨，比赛____照常进行。', 'Asalkan tidak hujan, pertandingan berjalan seperti biasa.', '就', ['才', '都', '再'], 'Syarat cukup', AS_LONG],
  ['除非你亲自去，____他不会答应。', 'Kecuali kamu sendiri yang pergi, kalau tidak dia tidak akan setuju.', '否则', ['所以', '但是', '而且'], 'Pengecualian', UNLESS],
  ['____再忙，也要吃早饭。', 'Sesibuk apa pun, tetap harus sarapan.', '即使', ['只要', '只有', '因为'], 'Konsesi', EVEN_IF],
  ['____你去哪儿，我都跟着你。', 'Ke mana pun kamu pergi, aku ikut.', '不管', ['即使', '只要', '只有'], 'Tanpa syarat', NO_MATTER],
  ['万一下雨了，我们____在家看电影。', 'Kalau-kalau hujan, kita menonton film di rumah saja.', '就', ['才', '都', '再'], 'Antisipasi', IN_CASE],
  ['你最好带把伞，____会被淋湿。', 'Sebaiknya bawa payung, kalau tidak bisa kehujanan.', '否则', ['所以', '但是', '而且'], 'Akibat', OTHERWISE],
  ['只有你____能帮我。', 'Hanya kamu yang bisa membantuku.', '才', ['就', '都', '再'], 'Syarat mutlak', ONLY_IF],
  ['____价格多贵，他都要买。', 'Semahal apa pun harganya, dia tetap mau membeli.', '无论', ['即使', '只要', '只有'], 'Tanpa syarat', NO_MATTER],
  ['只要你喜欢，我____给你买。', 'Asal kamu suka, akan kubelikan.', '就', ['才', '都', '再'], 'Syarat cukup', AS_LONG],
  ['即使失败了，我们____要试一试。', 'Meskipun gagal, kita tetap harus mencoba.', '也', ['就', '才', '再'], 'Konsesi', EVEN_IF],
  ['____他有急事，否则他一定会来。', 'Kecuali dia ada urusan mendesak, pasti dia datang.', '除非', ['只要', '即使', '不管'], 'Pengecualian', UNLESS],
  ['只有努力学习，____能考上大学。', 'Hanya dengan belajar keras baru bisa masuk universitas.', '才', ['就', '都', '再'], 'Syarat mutlak', ONLY_IF],
  ['____出了问题，马上给我打电话。', 'Kalau-kalau ada masalah, segera telepon saya.', '万一', ['即使', '不管', '只有'], 'Antisipasi', IN_CASE],
  ['不管你同不同意，我____要去。', 'Kamu setuju atau tidak, saya tetap pergi.', '都', ['就', '才', '再'], 'Tanpa syarat', NO_MATTER],
  ['只要一有空，他____去图书馆。', 'Asal ada waktu luang, dia langsung ke perpustakaan.', '就', ['才', '都', '再'], 'Syarat cukup', AS_LONG],
  ['你先走吧，____来不及了。', 'Kamu duluan saja, kalau tidak nanti tidak sempat.', '要不然', ['如果', '即使', '只要'], 'Akibat', OTHERWISE],
  ['即使是周末，他____在工作。', 'Bahkan di akhir pekan pun, dia tetap bekerja.', '也', ['就', '才', '再'], 'Konsesi', EVEN_IF],
  ['____你答应我一个条件，我就帮你。', 'Asalkan kamu menyetujui satu syarat, saya akan membantumu.', '只要', ['只有', '即使', '不管'], 'Syarat cukup', AS_LONG],
];

export const hardConditionals: ChoiceTuple[] = [
  ['____你提醒我，我早就忘了。', 'Kalau bukan karena kamu mengingatkan, saya sudah lupa.', '要不是', ['即使', '只要', '既然'], 'Kontrafaktual', 'kalau bukan karena …, (pasti) …'],
  ['____你已经决定了，我就不说什么了。', 'Karena kamu sudah memutuskan, saya tidak akan berkata apa-apa.', '既然', ['即使', '只要', '要不是'], 'Premis', 'karena memang sudah …, maka …'],
  ['____只有一线希望，我们也不放弃。', 'Meskipun hanya ada secercah harapan, kami tidak menyerah.', '哪怕', ['既然', '只要', '一旦'], 'Konsesi ekstrem', 'sekalipun hanya …, tetap …'],
  ['____出现问题，后果会很严重。', 'Sekali muncul masalah, akibatnya sangat serius.', '一旦', ['哪怕', '既然', '要不是'], 'Sekali terjadi', 'begitu (sekali) terjadi …, …'],
  ['____你不同意，我也要去。', 'Sekalipun kamu tidak setuju, saya tetap pergi.', '就算', ['既然', '一旦', '只要'], 'Konsesi lisan', 'sekalipun …, tetap …'],
  ['与其在家睡觉，____出去走走。', 'Daripada tidur di rumah, lebih baik jalan-jalan keluar.', '不如', ['而且', '并且', '何况'], 'Perbandingan pilihan', 'daripada …, lebih baik …'],
  ['我宁可走路，____不坐他的车。', 'Saya lebih baik jalan kaki daripada naik mobilnya.', '也', ['就', '才', '都'], 'Preferensi', 'lebih rela …, (dan) tetap tidak …'],
  ['幸亏你来了，____我真不知道怎么办。', 'Untung kamu datang, kalau tidak saya benar-benar tidak tahu harus bagaimana.', '不然', ['而且', '所以', '何况'], 'Akibat', OTHERWISE],
  ['____我是老板，我一定给大家加工资。', 'Seandainya saya bosnya, saya pasti menaikkan gaji semua.', '假如', ['既然', '一旦', '哪怕'], 'Andaian', 'seandainya …, …'],
  ['如果你想学好中文，____就要每天练习。', 'Jika ingin menguasai Mandarin, maka harus berlatih setiap hari.', '那么', ['而且', '何况', '并且'], 'Kesimpulan', 'jika …, maka (kesimpulannya) …'],
  ['早知道这么难，我____不报名了。', 'Kalau tahu sesulit ini, saya tidak akan mendaftar.', '就', ['才', '都', '也'], 'Penyesalan', 'kalau tahu dari awal …, (pasti) …'],
  ['要是早点儿出发，我们____不会迟到了。', 'Seandainya berangkat lebih awal, kita tidak akan terlambat.', '就', ['才', '都', '再'], 'Kontrafaktual', 'seandainya dulu …, (maka) …'],
  ['____你有任何问题，请随时联系我。', 'Apabila ada pertanyaan apa pun, silakan hubungi saya kapan saja.', '如果', ['既然', '哪怕', '宁可'], 'Syarat formal', IF],
  ['一旦养成了习惯，____很难改变。', 'Begitu kebiasaan terbentuk, sulit diubah.', '就', ['才', '都', '再'], 'Sekali terjadi', 'begitu (sekali) terjadi …, maka …'],
  ['既然来了，____多住几天吧。', 'Karena sudah datang, tinggallah beberapa hari lagi.', '就', ['才', '都', '再'], 'Premis', 'karena memang sudah …, maka …'],
  ['哪怕再累，他____坚持学习。', 'Selelah apa pun, dia tetap bertahan belajar.', '也', ['就', '才', '再'], 'Konsesi ekstrem', 'sekalipun …, tetap …'],
  ['要不是堵车，我们____到了。', 'Kalau bukan karena macet, kami sudah lama sampai.', '早就', ['才', '都', '再'], 'Kontrafaktual', 'kalau bukan karena …, (sudah dari tadi) …'],
  ['就算你说的是真的，我____不相信。', 'Sekalipun yang kamu katakan benar, saya tetap tidak percaya.', '也', ['就', '才', '再'], 'Konsesi lisan', 'sekalipun …, tetap …'],
  ['____你明天有空，那么我们一起去。', 'Jikalau besok kamu senggang, kita pergi bersama.', '倘若', ['既然', '哪怕', '一旦'], 'Andaian formal', 'jikalau …, maka …'],
  ['你最好现在就走，____会错过末班车。', 'Sebaiknya kamu pergi sekarang, kalau tidak akan ketinggalan bus terakhir.', '否则', ['而且', '所以', '何况'], 'Akibat', OTHERWISE],
  ['除非他道歉，____我不会原谅他。', 'Kecuali dia minta maaf, kalau tidak saya tidak akan memaafkannya.', '不然', ['所以', '而且', '何况'], 'Pengecualian', UNLESS],
  ['____你不想去，就早点儿说。', 'Kalau memang kamu tidak mau pergi, bilang dari awal.', '既然', ['哪怕', '一旦', '宁可'], 'Premis', 'karena memang …, maka …'],
  ['与其抱怨，____想想办法。', 'Daripada mengeluh, lebih baik cari solusi.', '不如', ['而且', '并且', '何况'], 'Perbandingan pilihan', 'daripada …, lebih baik …'],
  ['我宁可少赚点儿钱，____要有自由的时间。', 'Saya rela penghasilan lebih sedikit, asalkan punya waktu bebas.', '也', ['就', '才', '都'], 'Preferensi', 'lebih rela …, (asal) tetap …'],
  ['一旦下定决心，他____不会改变。', 'Begitu sudah bertekad, dia tidak akan berubah.', '就', ['才', '都', '再'], 'Sekali terjadi', 'begitu (sekali) terjadi …, maka …'],
  ['____再多给我一天时间，我就能完成。', 'Seandainya diberi satu hari lagi, saya bisa menyelesaikannya.', '要是', ['既然', '哪怕', '宁可'], 'Andaian lisan', 'seandainya …, …'],
  ['万一他不来，我们____怎么办？', 'Kalau-kalau dia tidak datang, kita harus bagaimana?', '该', ['才', '都', '再'], 'Antisipasi', 'kalau-kalau …, (kita) harus …'],
  ['无论结果如何，我们____要尽力。', 'Apa pun hasilnya, kita harus berusaha sebaik mungkin.', '都', ['就', '才', '再'], 'Tanpa syarat', NO_MATTER],
  ['____我们早一点儿准备，就不会这么紧张了。', 'Seandainya kita mempersiapkan lebih awal, kita tidak akan setegang ini.', '如果', ['既然', '哪怕', '宁可'], 'Kontrafaktual', 'seandainya dulu …, (maka) …'],
  ['____你不帮我，我一个人也能完成。', 'Meskipun kamu tidak membantuku, saya bisa menyelesaikannya sendiri.', '即使', ['既然', '一旦', '宁可'], 'Konsesi', EVEN_IF],
];
