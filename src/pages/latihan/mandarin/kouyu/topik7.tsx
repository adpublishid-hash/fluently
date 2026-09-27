import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-daily-routine",
  "title": "Kǒuyǔ 7: Daily Routine",
  "description": "Melatih bicara tentang rutinitas pagi, belajar, makan, dan tidur.",
  "topicNumber": 7,
  "focus": "Rutinitas harian.",
  "goal": "Susun respons pendek dengan waktu + subjek + aktivitas."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "daily-routine-1",
    "title": "Daily Routine 1",
    "scenario": "Routine",
    "prompt": "Katakan kamu bangun jam tujuh pagi.",
    "role": "You talk about morning routine.",
    "modelHanzi": "我早上七点起床。",
    "modelPinyin": "Wǒ zǎoshang qī diǎn qǐchuáng.",
    "modelMeaning": "Saya bangun jam tujuh pagi.",
    "starter": "我早上...起床。",
    "hint": "Waktu bisa ditempatkan setelah subjek.",
    "checklist": [
      "早上七点 jelas.",
      "起床 diucapkan qǐchuáng.",
      "Urutan waktu dan aktivitas tepat."
    ],
    "followUp": "Ganti 七点 dengan jam bangunmu."
  },
  {
    "id": "daily-routine-2",
    "title": "Daily Routine 2",
    "scenario": "Routine",
    "prompt": "Katakan kamu belajar Mandarin sore ini.",
    "role": "You talk about study.",
    "modelHanzi": "今天下午我学习中文。",
    "modelPinyin": "Jīntiān xiàwǔ wǒ xuéxí Zhōngwén.",
    "modelMeaning": "Sore ini saya belajar Mandarin.",
    "starter": "今天下午我...",
    "hint": "Mulai dari waktu 今天下午.",
    "checklist": [
      "今天下午 tidak terlalu cepat.",
      "学习中文 jelas.",
      "Kalimat terdengar seperti rencana."
    ],
    "followUp": "Coba versi 明天上午."
  },
  {
    "id": "daily-routine-3",
    "title": "Daily Routine 3",
    "scenario": "Routine",
    "prompt": "Katakan kamu makan malam di rumah.",
    "role": "You describe dinner.",
    "modelHanzi": "我晚上在家吃饭。",
    "modelPinyin": "Wǒ wǎnshang zài jiā chī fàn.",
    "modelMeaning": "Saya makan malam di rumah.",
    "starter": "我晚上在家...",
    "hint": "在家 berarti di rumah.",
    "checklist": [
      "晚上 sebagai waktu.",
      "在家 sebagai lokasi.",
      "吃饭 sebagai aktivitas."
    ],
    "followUp": "Ucapkan lagi tanpa melihat model."
  },
  {
    "id": "daily-routine-4",
    "title": "Daily Routine 4",
    "scenario": "Routine",
    "prompt": "Katakan kamu tidur jam sembilan.",
    "role": "You describe bedtime.",
    "modelHanzi": "我九点睡觉。",
    "modelPinyin": "Wǒ jiǔ diǎn shuìjiào.",
    "modelMeaning": "Saya tidur jam sembilan.",
    "starter": "我...点睡觉。",
    "hint": "点 menandai jam.",
    "checklist": [
      "九点 jelas.",
      "睡觉 tidak tertukar dengan 学习.",
      "Jawaban singkat dan natural."
    ],
    "followUp": "Coba ganti dengan 十点."
  }
];

export default function MandarinKouyuTopik7Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
