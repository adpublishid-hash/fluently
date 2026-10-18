// Mandarin Modal Quest: modal verbs and modal adverbs, 30 per level.
// [prompt, Indonesian translation, answer, three wrong options, tone, rule]
// Tone and rule are shown as the clue before answering, so they describe the meaning without naming the answer.
// Wrong options leave out synonyms that would also fit (能/可以, 得/必须, 只好/不得不).
import type { ChoiceTuple } from './questions';

const SKILL = 'keterampilan hasil belajar';
const WANT = 'ingin melakukan sesuatu';
const PERMIT = 'minta/memberi izin (boleh)';
const ADVICE = 'saran: sebaiknya / seharusnya';
const MUST_SPOKEN = 'keharusan dalam bahasa lisan';
const NO_NEED = 'tidak perlu melakukan';
const DONT = 'larangan langsung (= jangan)';
const MAYBE = 'kemungkinan (= mungkin)';

export const easyModals: ChoiceTuple[] = [
  ['我____说中文。', 'Saya bisa berbahasa Mandarin.', '会', ['要', '想', '应该'], 'Kemampuan', SKILL],
  ['我____喝水。', 'Saya ingin minum air.', '想', ['会', '能', '得'], 'Keinginan', WANT],
  ['这儿____拍照吗？', 'Bolehkah memotret di sini?', '可以', ['会', '想', '应该'], 'Izin', PERMIT],
  ['你____多喝水。', 'Kamu sebaiknya banyak minum air.', '应该', ['会', '可以', '想'], 'Saran', ADVICE],
  ['明天我____上班。', 'Besok saya harus masuk kerja.', '得', ['会', '可以', '想'], 'Keharusan', MUST_SPOKEN],
  ['我不____游泳。', 'Saya tidak bisa berenang.', '会', ['想', '要', '应该'], 'Kemampuan', SKILL],
  ['我____去厕所。', 'Saya mau ke toilet.', '要', ['会', '应该', '可以'], 'Kebutuhan', 'mau/perlu melakukan sekarang'],
  ['你____帮我吗？', 'Bisakah kamu membantuku?', '能', ['会', '想', '应该'], 'Permintaan', 'minta tolong: bisakah …?'],
  ['明天____下雨。', 'Besok akan hujan.', '会', ['想', '应该', '可以'], 'Prediksi', 'perkiraan sesuatu akan terjadi'],
  ['你不____来了。', 'Kamu tidak perlu datang lagi.', '用', ['会', '想', '能'], 'Tidak perlu', NO_NEED],
  ['上课的时候____说话。', 'Saat pelajaran jangan berbicara.', '别', ['会', '想', '能'], 'Larangan', DONT],
  ['我____吃辣的。', 'Saya tidak bisa makan pedas (perut tidak kuat).', '不能', ['不用', '别', '应该'], 'Ketidakmampuan', 'tidak bisa karena kondisi'],
  ['他____开车。', 'Dia bisa menyetir.', '会', ['想', '要', '得'], 'Kemampuan', SKILL],
  ['你____早点儿睡觉。', 'Kamu sebaiknya tidur lebih awal.', '应该', ['会', '能', '想'], 'Saran', ADVICE],
  ['我____看这本书。', 'Saya ingin membaca buku ini.', '想', ['会', '能', '得'], 'Keinginan', WANT],
  ['小孩子不____喝酒。', 'Anak kecil tidak boleh minum alkohol.', '可以', ['会', '想', '用'], 'Larangan', 'tidak diizinkan (tidak boleh)'],
  ['我们____走了。', 'Kita harus pergi sekarang.', '得', ['会', '能', '想'], 'Keharusan', MUST_SPOKEN],
  ['你____说慢一点儿吗？', 'Bisakah kamu bicara lebih pelan?', '能', ['会', '想', '得'], 'Permintaan', 'minta tolong: bisakah …?'],
  ['我今天不____上班。', 'Hari ini saya tidak perlu masuk kerja.', '用', ['会', '想', '能'], 'Tidak perlu', NO_NEED],
  ['我____进来吗？', 'Bolehkah saya masuk?', '可以', ['会', '想', '得'], 'Izin', PERMIT],
  ['外面很冷，你____穿外套。', 'Di luar dingin, kamu sebaiknya pakai jaket.', '应该', ['会', '能', '想'], 'Saran', ADVICE],
  ['她____唱歌。', 'Dia bisa bernyanyi.', '会', ['想', '要', '得'], 'Kemampuan', SKILL],
  ['我____买一个新手机。', 'Saya ingin membeli ponsel baru.', '想', ['会', '能', '得'], 'Keinginan', WANT],
  ['____忘了带护照！', 'Jangan lupa membawa paspor!', '别', ['会', '想', '能'], 'Larangan', DONT],
  ['你____吃完再走。', 'Kamu harus makan dulu baru pergi.', '得', ['会', '能', '想'], 'Keharusan', MUST_SPOKEN],
  ['他病了，今天不____来。', 'Dia sakit, hari ini tidak bisa datang.', '能', ['用', '想', '应该'], 'Ketidakmampuan', 'tidak bisa karena kondisi'],
  ['我____跟你一起去吗？', 'Bolehkah saya ikut pergi denganmu?', '可以', ['会', '想', '得'], 'Izin', PERMIT],
  ['你____去看医生。', 'Kamu sebaiknya periksa ke dokter.', '应该', ['会', '可以', '想'], 'Saran', ADVICE],
  ['我____当老师。', 'Saya ingin menjadi guru.', '想', ['会', '能', '得'], 'Cita-cita', WANT],
  ['我____做饭。', 'Saya bisa memasak.', '会', ['想', '要', '得'], 'Kemampuan', SKILL],
];

export const mediumModals: ChoiceTuple[] = [
  ['学生____穿校服。', 'Murid wajib memakai seragam.', '必须', ['可以', '会', '想'], 'Kewajiban', 'aturan yang wajib (formal)'],
  ['你____担心。', 'Kamu tidak perlu khawatir.', '不用', ['不会', '不能', '应该'], 'Tidak perlu', NO_NEED],
  ['我一分钟____打六十个字。', 'Saya bisa mengetik 60 karakter per menit.', '能', ['会', '想', '应该'], 'Kapasitas', 'kemampuan sampai tingkat tertentu'],
  ['我感冒了，不____去游泳。', 'Saya flu, jadi tidak bisa berenang.', '能', ['用', '想', '应该'], 'Kondisi', 'tidak bisa karena kondisi'],
  ['他____不来了。', 'Dia mungkin tidak datang.', '可能', ['必须', '愿意', '敢'], 'Kemungkinan', MAYBE],
  ['我不____一个人走夜路。', 'Saya tidak berani berjalan sendirian di malam hari.', '敢', ['会', '用', '该'], 'Keberanian', 'berani melakukan'],
  ['你____帮我这个忙吗？', 'Apakah kamu bersedia membantuku?', '愿意', ['敢', '必须', '应该'], 'Kesediaan', 'bersedia / rela melakukan'],
  ['我们____一个新的计划。', 'Kami membutuhkan rencana baru.', '需要', ['愿意', '应该', '敢'], 'Kebutuhan', 'membutuhkan sesuatu'],
  ['这件事你____告诉他。', 'Hal ini sebaiknya kamu beritahukan kepadanya.', '应该', ['敢', '愿意', '可能'], 'Saran', ADVICE],
  ['这么晚了，他____已经睡了。', 'Sudah malam begini, dia mungkin sudah tidur.', '可能', ['必须', '愿意', '敢'], 'Kemungkinan', MAYBE],
  ['你不____这样说。', 'Kamu tidak seharusnya bicara begitu.', '应该', ['敢', '愿意', '必须'], 'Teguran', 'tidak seharusnya'],
  ['这个问题你____好好想想。', 'Masalah ini perlu kamu pikirkan baik-baik.', '得', ['敢', '愿意', '可能'], 'Keharusan', MUST_SPOKEN],
  ['飞机____晚点了。', 'Pesawatnya mungkin terlambat.', '可能', ['必须', '敢', '愿意'], 'Kemungkinan', MAYBE],
  ['你____不能小声一点？', 'Bisakah kamu sedikit lebih pelan?', '能', ['会', '敢', '用'], 'Permintaan', 'pola bisa-tidak bisa untuk meminta'],
  ['我____去医院看看他。', 'Saya mau ke rumah sakit menjenguknya.', '要', ['敢', '会', '可能'], 'Rencana', 'mau/akan melakukan'],
  ['他说的话你____相信。', 'Ucapannya jangan kamu percayai.', '别', ['敢', '愿意', '需要'], 'Larangan', DONT],
  ['我____试试吗？', 'Bolehkah saya coba?', '可以', ['敢', '需要', '愿意'], 'Izin', PERMIT],
  ['他____游一千米。', 'Dia sanggup berenang 1000 meter.', '能', ['会', '想', '敢'], 'Kapasitas', 'kemampuan sampai tingkat tertentu'],
  ['我们____准时到。', 'Kita wajib datang tepat waktu.', '必须', ['可能', '愿意', '敢'], 'Kewajiban', 'aturan yang wajib (formal)'],
  ['你____去，我一个人去就行。', 'Kamu tidak perlu pergi, aku sendiri saja cukup.', '不用', ['不敢', '不可能', '不应该'], 'Tidak perlu', NO_NEED],
  ['他从来不____迟到。', 'Dia tidak pernah (tidak mungkin) terlambat.', '会', ['敢', '用', '该'], 'Kecenderungan', 'kebiasaan/kemungkinan yang bisa diperkirakan'],
  ['我____请你吃饭。', 'Saya ingin mentraktirmu makan.', '想', ['敢', '得', '可能'], 'Keinginan', WANT],
  ['上课时____用手机。', 'Saat pelajaran tidak boleh memakai ponsel.', '不可以', ['不会', '不用', '不敢'], 'Larangan', 'tidak diizinkan (tidak boleh)'],
  ['没有护照，你____出国。', 'Tanpa paspor, kamu tidak bisa ke luar negeri.', '不能', ['不用', '不敢', '不想'], 'Kondisi', 'tidak bisa karena kondisi'],
  ['你这样做____会后悔的。', 'Kalau begitu kamu pasti akan menyesal.', '一定', ['敢', '愿意', '需要'], 'Kepastian', 'pasti (keyakinan kuat)'],
  ['我____知道真相。', 'Saya ingin tahu kebenarannya.', '想', ['敢', '会', '可能'], 'Keinginan', WANT],
  ['这个房间____住四个人。', 'Kamar ini bisa menampung empat orang.', '能', ['会', '敢', '想'], 'Kapasitas', 'kemampuan sampai tingkat tertentu'],
  ['他____会同意的。', 'Dia pasti akan setuju.', '一定', ['敢', '愿意', '需要'], 'Kepastian', 'pasti (keyakinan kuat)'],
  ['你____再说一遍吗？', 'Bisakah kamu mengulanginya sekali lagi?', '能', ['敢', '需要', '会'], 'Permintaan', 'minta tolong: bisakah …?'],
  ['我累了，____休息一下。', 'Saya lelah, perlu istirahat sebentar.', '需要', ['敢', '愿意', '可能'], 'Kebutuhan', 'membutuhkan sesuatu'],
];

export const hardModals: ChoiceTuple[] = [
  ['下大雨了，我们____取消比赛。', 'Hujan deras, kami terpaksa membatalkan pertandingan.', '不得不', ['不必', '不妨', '值得'], 'Terpaksa', 'tidak ada pilihan lain'],
  ['你____这么客气。', 'Kamu tidak perlu sungkan begini.', '不必', ['不得不', '值得', '未必'], 'Tidak perlu', NO_NEED + ' (formal)'],
  ['这本书很____一读。', 'Buku ini layak dibaca.', '值得', ['不必', '不得不', '恐怕'], 'Layak', 'pantas/layak dilakukan'],
  ['他说的____是真的。', 'Yang dia katakan belum tentu benar.', '未必', ['不必', '值得', '不得不'], 'Keraguan', 'belum tentu'],
  ['____他已经走了。', 'Saya khawatir dia sudah pergi.', '恐怕', ['未必', '不必', '值得'], 'Dugaan cemas', 'dugaan dengan rasa khawatir'],
  ['第一次做，____会有错。', 'Pertama kali mengerjakan, wajar saja ada kesalahan.', '难免', ['未必', '值得', '不必'], 'Wajar terjadi', 'sulit dihindari, wajar terjadi'],
  ['你____试试这个方法。', 'Tidak ada salahnya kamu mencoba cara ini.', '不妨', ['未必', '难免', '不得不'], 'Usul halus', 'tidak ada salahnya'],
  ['你____忘了吃药。', 'Kamu jangan sampai lupa minum obat.', '千万别', ['不必', '未必', '不妨'], 'Peringatan', 'larangan yang sangat ditekankan'],
  ['这点小事，____生气呢？', 'Masalah sepele begini, buat apa marah?', '何必', ['未必', '难免', '不妨'], 'Retoris', 'buat apa … (tidak perlu)'],
  ['我____站着，也不坐他的车。', 'Saya lebih baik berdiri daripada naik mobilnya.', '宁可', ['不必', '不妨', '难免'], 'Preferensi', 'lebih rela memilih …'],
  ['这件事你____负责。', 'Untuk hal ini kamu sepatutnya bertanggung jawab.', '应当', ['不妨', '未必', '何必'], 'Kepatutan', 'seharusnya (formal)'],
  ['为了赶飞机，他____早早起床。', 'Demi mengejar pesawat, dia terpaksa bangun pagi-pagi.', '只好', ['宁可', '不妨', '何必'], 'Terpaksa', 'tidak ada pilihan lain (lisan)'],
  ['情况____那么糟糕。', 'Situasinya tidak sampai separah itu.', '不至于', ['不得不', '值得', '何必'], 'Batas', 'tidak sampai sejauh itu'],
  ['时间还早，你____着急。', 'Masih pagi, kamu tidak perlu terburu-buru.', '用不着', ['不得不', '值得', '难免'], 'Tidak perlu', NO_NEED + ' (lisan)'],
  ['努力____会有回报。', 'Berusaha pasti akan membuahkan hasil.', '必然', ['未必', '何必', '不妨'], 'Kepastian', 'pasti terjadi (formal)'],
  ['你____先问问老师。', 'Sebaiknya kamu tanya guru dulu.', '最好', ['未必', '难免', '何必'], 'Saran', 'pilihan terbaik adalah …'],
  ['他____不知道这件事吧？', 'Jangan-jangan dia tidak tahu soal ini?', '该不会', ['何必', '值得', '宁可'], 'Dugaan cemas', 'jangan-jangan …'],
  ['这么重要的会议，你____迟到。', 'Rapat sepenting ini, kamu sama sekali tidak boleh terlambat.', '绝对不能', ['未必', '何必', '不妨'], 'Larangan keras', 'sama sekali tidak boleh'],
  ['他____会答应你的要求。', 'Dia belum tentu menyetujui permintaanmu.', '不一定', ['不得不', '值得', '何必'], 'Keraguan', 'belum tentu (lisan)'],
  ['我们____在这儿等他。', 'Kita mau tidak mau hanya bisa menunggunya di sini.', '只能', ['宁可', '不妨', '何必'], 'Satu-satunya pilihan', 'hanya bisa …'],
  ['学外语____要多说多练。', 'Belajar bahasa asing pasti harus banyak bicara dan berlatih.', '一定', ['何必', '未必', '难免'], 'Penekanan', 'pasti / harus (ditekankan)'],
  ['这么晚了，商店____已经关门了。', 'Sudah larut begini, tokonya kemungkinan besar sudah tutup.', '大概', ['何必', '宁可', '不妨'], 'Perkiraan', 'kemungkinan besar'],
  ['这个机会____错过。', 'Kesempatan ini tidak boleh dilewatkan.', '不可', ['不必', '不妨', '何必'], 'Larangan formal', 'tidak boleh (formal)'],
  ['他____能完成这个任务。', 'Dia pasti mampu menyelesaikan tugas ini.', '肯定', ['未必', '何必', '宁可'], 'Keyakinan', 'yakin sekali (lisan)'],
  ['你早就____告诉我。', 'Seharusnya dari dulu kamu memberitahuku.', '应该', ['宁可', '何必', '难免'], 'Penyesalan', 'seharusnya (tetapi tidak dilakukan)'],
  ['遇到困难____放弃。', 'Ketika menghadapi kesulitan jangan menyerah.', '不要', ['不必', '未必', '何必'], 'Larangan', DONT],
  ['新手开车____紧张。', 'Pengemudi pemula wajar saja tegang.', '难免', ['何必', '宁可', '不妨'], 'Wajar terjadi', 'sulit dihindari, wajar terjadi'],
  ['你____跟他道歉。', 'Kamu perlu minta maaf kepadanya.', '需要', ['何必', '未必', '宁可'], 'Kebutuhan', 'perlu dilakukan'],
  ['这道题太难了，我____做不出来。', 'Soal ini terlalu sulit, saya khawatir tidak bisa mengerjakannya.', '恐怕', ['何必', '宁可', '值得'], 'Dugaan cemas', 'dugaan dengan rasa khawatir'],
  ['我们____尊重别人的意见。', 'Kita patut menghormati pendapat orang lain.', '理应', ['何必', '宁可', '难免'], 'Kepatutan', 'sudah semestinya (formal)'],
];
