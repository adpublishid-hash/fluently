// Mandarin Sentence Builder: [Indonesian prompt, space-separated Mandarin tokens], 30 per level.
export type SentenceTuple = [prompt: string, tokens: string];

export const easySentences: SentenceTuple[] = [
  ['Saya pelajar.', '我 是 学生'], ['Apa kabar?', '你 好 吗'], ['Saya suka minum teh.', '我 喜欢 喝 茶'],
  ['Dia guru.', '他 是 老师'], ['Saya punya sebuah buku.', '我 有 一 本 书'], ['Ini kucing saya.', '这 是 我的 猫'],
  ['Kami pergi ke sekolah.', '我们 去 学校'], ['Dia sangat senang.', '她 很 高兴'], ['Saya tidak makan daging.', '我 不 吃 肉'],
  ['Hari ini sangat panas.', '今天 很 热'], ['Nama saya Wang Ming.', '我 叫 王明'], ['Dia kakak perempuan saya.', '她 是 我 姐姐'],
  ['Saya minum air.', '我 喝 水'], ['Ayah saya dokter.', '我 爸爸 是 医生'], ['Kucing ini sangat kecil.', '这 只 猫 很 小'],
  ['Kamu mau makan apa?', '你 想 吃 什么'], ['Saya punya dua teman.', '我 有 两 个 朋友'], ['Ibu ada di rumah.', '妈妈 在 家'],
  ['Kami suka musik.', '我们 喜欢 音乐'], ['Dia tidak minum kopi.', '他 不 喝 咖啡'], ['Ini apel.', '这 是 苹果'],
  ['Sekarang jam delapan.', '现在 八 点'], ['Buku itu sangat bagus.', '那 本 书 很 好'], ['Saya orang Indonesia.', '我 是 印度尼西亚 人'],
  ['Mereka di sekolah.', '他们 在 学校'], ['Adik laki-laki saya tujuh tahun.', '我 弟弟 七 岁'], ['Kamu sibuk tidak?', '你 忙 不 忙'],
  ['Saya pergi ke toko.', '我 去 商店'], ['Teh ini tidak mahal.', '这 杯 茶 不 贵'], ['Selamat pagi, Guru!', '老师 早上 好'],
];

export const mediumSentences: SentenceTuple[] = [
  ['Saya bangun jam tujuh setiap pagi.', '我 每天 早上 七点 起床'], ['Dia naik kereta ke Beijing.', '他 坐 火车 去 北京'],
  ['Saya ingin membeli sepotong baju.', '我 想 买 一 件 衣服'], ['Kami makan malam di restoran.', '我们 在 饭店 吃 晚饭'],
  ['Bisakah kamu berbahasa Mandarin?', '你 会 说 中文 吗'], ['Kemarin saya menonton sebuah film.', '昨天 我 看 了 一 部 电影'],
  ['Rumah sakit ada di samping sekolah.', '医院 在 学校 旁边'], ['Saya lebih tinggi daripada dia.', '我 比 他 高'],
  ['Besok mungkin akan hujan.', '明天 可能 会 下雨'], ['Saya sudah menyelesaikan PR.', '我 已经 做完 作业 了'],
  ['Saya sedang belajar di perpustakaan.', '我 正在 图书馆 学习'], ['Dia pernah ke Tiongkok dua kali.', '他 去过 中国 两 次'],
  ['Rumah saya tidak jauh dari sini.', '我 家 离 这儿 不 远'], ['Saya naik bus ke kantor setiap hari.', '我 每天 坐 公交车 去 公司'],
  ['Kami sudah makan siang.', '我们 已经 吃 午饭 了'], ['Tolong bicara sedikit lebih pelan.', '请 你 说 慢 一点'],
  ['Hari ini lebih dingin daripada kemarin.', '今天 比 昨天 冷'], ['Saya mau membeli dua tiket.', '我 要 买 两 张 票'],
  ['Dia sedang menelepon.', '他 在 打 电话'], ['Akhir pekan saya biasanya berbelanja.', '周末 我 一般 去 购物'],
  ['Boleh saya duduk di sini?', '我 可以 坐 这儿 吗'], ['Film ini sangat menarik.', '这 部 电影 非常 有意思'],
  ['Saya sudah belajar Mandarin dua tahun.', '我 学了 两 年 中文'], ['Dia berlari sangat cepat.', '他 跑 得 很 快'],
  ['Supermarket buka jam sembilan.', '超市 九 点 开门'], ['Saya lupa membawa payung.', '我 忘了 带 雨伞'],
  ['Kamu pernah makan bakpao?', '你 吃过 包子 吗'], ['Kami pergi ke taman bersama-sama.', '我们 一起 去 公园'],
  ['Kamar ini bersih sekali.', '这个 房间 干净 极了'], ['Dia lebih suka minum teh.', '他 更 喜欢 喝 茶'],
];

export const hardSentences: SentenceTuple[] = [
  ['Walaupun capek, saya senang.', '虽然 很 累 但是 我 很 开心'], ['Jika besok hujan, kami tidak pergi.', '如果 明天 下雨 我们 就 不 去'],
  ['Saya menaruh buku di atas meja.', '我 把 书 放在 桌子 上 了'], ['Dia dipuji oleh guru.', '他 被 老师 表扬 了'],
  ['Karena macet, saya terlambat.', '因为 交通 很 堵 所以 我 迟到 了'], ['Semakin belajar, saya semakin suka Mandarin.', '我 越 学 越 喜欢 中文'],
  ['Melindungi lingkungan adalah tanggung jawab semua orang.', '保护 环境 是 每个 人 的 责任'], ['Begitu pulang, dia langsung memasak.', '他 一 回家 就 开始 做饭'],
  ['Buku ini sudah saya baca dua kali.', '这 本 书 我 已经 看了 两 遍'], ['Belajar Mandarin sangat membantu pekerjaan saya.', '学 中文 对 我 的 工作 很 有 帮助'],
  ['Dia tidak hanya pintar, tetapi juga rajin.', '他 不但 聪明 而且 很 努力'], ['Asalkan kamu berusaha, pasti akan berhasil.', '只要 你 努力 就 一定 会 成功'],
  ['Hanya dengan banyak berlatih baru bisa bicara lancar.', '只有 多 练习 才 能 说得 流利'], ['Meskipun hujan deras, dia tetap akan datang.', '即使 下 大雨 他 也 会 来'],
  ['Bagaimanapun cuacanya, kami tetap berolahraga.', '不管 天气 怎么样 我们 都 去 运动'], ['Dompet saya dicuri orang.', '我的 钱包 被 人 偷 了'],
  ['Tolong taruh kunci di atas meja.', '请 把 钥匙 放在 桌子 上'], ['Saya bahkan tidak punya waktu untuk makan.', '我 连 吃饭 的 时间 都 没有'],
  ['Bahasa Mandarinnya makin lama makin bagus.', '他的 中文 越来越 好'], ['Dia bukan guru, melainkan dokter.', '他 不是 老师 而是 医生'],
  ['Daripada naik taksi, lebih baik naik subway.', '与其 坐 出租车 不如 坐 地铁'], ['Dia berbicara sambil tertawa.', '他 一边 说 一边 笑'],
  ['Saya sudah terbiasa dengan kehidupan di sini.', '我 已经 习惯 这里 的 生活 了'], ['Saking lelahnya, dia langsung tertidur.', '他 累 得 马上 就 睡着 了'],
  ['Selain Mandarin, dia juga bisa bahasa Jepang.', '除了 中文 以外 他 还 会 日语'], ['Rapat ditunda sampai minggu depan.', '会议 推迟 到 下 个 星期'],
  ['Kecuali kamu pergi, saya tidak akan pergi.', '除非 你 去 否则 我 不 去'], ['Untuk menjaga kesehatan, dia lari setiap hari.', '为了 保持 健康 他 每天 跑步'],
  ['Mendengar kabar ini, semua orang sangat gembira.', '听到 这个 消息 大家 都 很 高兴'], ['Masalah ini tidak semudah yang kamu bayangkan.', '这个 问题 没有 你 想 的 那么 简单'],
];
