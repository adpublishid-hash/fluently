import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-weather-and-plans",
  "title": "Kǒuyǔ 14: Weather and Plans",
  "description": "Melatih membicarakan cuaca dan rencana kegiatan sederhana.",
  "topicNumber": 14,
  "focus": "Cuaca dan rencana.",
  "goal": "Gabungkan kata cuaca dengan rencana memakai 去, 在家, atau 所以."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "weather-and-plans-1",
    "title": "Weather and Plans 1",
    "scenario": "Weather",
    "prompt": "Katakan hari ini sangat panas.",
    "role": "You describe weather.",
    "modelHanzi": "今天很热。",
    "modelPinyin": "Jīntiān hěn rè.",
    "modelMeaning": "Hari ini sangat panas.",
    "starter": "今天很...",
    "hint": "热 berarti panas.",
    "checklist": [
      "今天 jelas.",
      "很热 tidak terlalu pendek.",
      "Intonasi deskriptif."
    ],
    "followUp": "Coba ganti 热 dengan 冷."
  },
  {
    "id": "weather-and-plans-2",
    "title": "Weather and Plans 2",
    "scenario": "Weather",
    "prompt": "Katakan besok akan hujan.",
    "role": "You forecast rain.",
    "modelHanzi": "明天下雨。",
    "modelPinyin": "Míngtiān xià yǔ.",
    "modelMeaning": "Besok hujan.",
    "starter": "明天...",
    "hint": "下雨 berarti hujan turun.",
    "checklist": [
      "明天 jelas.",
      "下雨 dua suku kata.",
      "Kalimat informatif."
    ],
    "followUp": "Tambahkan 所以我在家 untuk alasan."
  },
  {
    "id": "weather-and-plans-3",
    "title": "Weather and Plans 3",
    "scenario": "Plan",
    "prompt": "Katakan cuaca bagus, kamu pergi ke taman.",
    "role": "You link weather and plan.",
    "modelHanzi": "天气好，我去公园。",
    "modelPinyin": "Tiānqì hǎo, wǒ qù gōngyuán.",
    "modelMeaning": "Cuaca bagus, saya pergi ke taman.",
    "starter": "天气好，我去...",
    "hint": "公园 berarti taman.",
    "checklist": [
      "天气好 jelas.",
      "Jeda sebelum 我去.",
      "公园 diucapkan gōngyuán."
    ],
    "followUp": "Coba tambah 今天 di awal."
  },
  {
    "id": "weather-and-plans-4",
    "title": "Weather and Plans 4",
    "scenario": "Weather",
    "prompt": "Katakan hari ini tidak dingin.",
    "role": "You negate weather.",
    "modelHanzi": "今天不冷。",
    "modelPinyin": "Jīntiān bù lěng.",
    "modelMeaning": "Hari ini tidak dingin.",
    "starter": "今天不...",
    "hint": "不冷 berarti tidak dingin.",
    "checklist": [
      "不 sebelum 冷.",
      "Leng bernada turun-naik.",
      "Kalimat jelas."
    ],
    "followUp": "Coba versi 不热."
  }
];

export default function MandarinKouyuTopik14Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
