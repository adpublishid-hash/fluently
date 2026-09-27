import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-hsk-1-speaking-review",
  "title": "Kǒuyǔ 20: HSK 1 Speaking Review",
  "description": "Review Kǒuyǔ HSK 1 dengan perkenalan, waktu, keluarga, tempat, dan rencana.",
  "topicNumber": 20,
  "focus": "Review percakapan HSK 1.",
  "goal": "Gabungkan pola-pola dasar menjadi respons yang lebih siap dipakai."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "hsk-1-speaking-review-1",
    "title": "HSK 1 Speaking Review 1",
    "scenario": "Review",
    "prompt": "Berikan perkenalan singkat HSK 1.",
    "role": "You introduce yourself.",
    "modelHanzi": "你好，我叫大卫。我是学生。",
    "modelPinyin": "Nǐ hǎo, wǒ jiào Dàwèi. Wǒ shì xuésheng.",
    "modelMeaning": "Halo, nama saya David. Saya siswa.",
    "starter": "你好，我叫...。我是...",
    "hint": "Gunakan dua kalimat pendek.",
    "checklist": [
      "Salam jelas.",
      "Nama dan identitas lengkap.",
      "Jeda di antara kalimat."
    ],
    "followUp": "Coba pakai namamu sendiri."
  },
  {
    "id": "hsk-1-speaking-review-2",
    "title": "HSK 1 Speaking Review 2",
    "scenario": "Review",
    "prompt": "Ceritakan jadwal pergi ke sekolah hari ini.",
    "role": "You describe schedule.",
    "modelHanzi": "今天七点我去学校。",
    "modelPinyin": "Jīntiān qī diǎn wǒ qù xuéxiào.",
    "modelMeaning": "Hari ini jam tujuh saya pergi ke sekolah.",
    "starter": "今天...我去...",
    "hint": "Letakkan waktu sebelum aktivitas.",
    "checklist": [
      "今天七点 jelas.",
      "去学校 sebagai aktivitas.",
      "Kalimat natural."
    ],
    "followUp": "Ganti 七点 dengan waktu lain."
  },
  {
    "id": "hsk-1-speaking-review-3",
    "title": "HSK 1 Speaking Review 3",
    "scenario": "Review",
    "prompt": "Katakan kamu punya dua teman dan mereka suka Mandarin.",
    "role": "You describe friends.",
    "modelHanzi": "我有两个朋友，他们喜欢中文。",
    "modelPinyin": "Wǒ yǒu liǎng gè péngyou, tāmen xǐhuan Zhōngwén.",
    "modelMeaning": "Saya punya dua teman, mereka suka Mandarin.",
    "starter": "我有...，他们...",
    "hint": "他们 berarti mereka.",
    "checklist": [
      "两个朋友 jelas.",
      "他们 sebagai subjek kedua.",
      "喜欢中文 di akhir."
    ],
    "followUp": "Coba ganti 朋友 dengan 同学."
  },
  {
    "id": "hsk-1-speaking-review-4",
    "title": "HSK 1 Speaking Review 4",
    "scenario": "Review",
    "prompt": "Katakan besok tidak hujan, jadi kalian pergi ke taman.",
    "role": "You combine weather and plan.",
    "modelHanzi": "明天不下雨，我们去公园。",
    "modelPinyin": "Míngtiān bù xià yǔ, wǒmen qù gōngyuán.",
    "modelMeaning": "Besok tidak hujan, kami pergi ke taman.",
    "starter": "明天...，我们...",
    "hint": "Gunakan koma sebagai jeda bicara.",
    "checklist": [
      "不下雨 jelas.",
      "我们去公园 sebagai rencana.",
      "Kalimat gabungan tetap pelan."
    ],
    "followUp": "Coba tambah 所以 sebelum 我们."
  }
];

export default function MandarinKouyuTopik20Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
