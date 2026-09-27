import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-weather-journal",
  "title": "Xiězuò 14: Weather Journal",
  "description": "Melatih kalimat catatan cuaca harian yang pendek dan jelas.",
  "topicNumber": 14,
  "focus": "Jurnal cuaca.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "weather-journal-1",
    "title": "Weather Journal 1",
    "mode": "Journal Sentence",
    "hanzi": "今天天气很好。",
    "pinyin": "jīntiān tiānqì hěn hǎo.",
    "meaning": "Cuaca hari ini bagus.",
    "prompt": "Tulis “Cuaca hari ini bagus”.",
    "targetPattern": "今天 + 天气 + 很 + 好",
    "modelAnswer": "今天天气很好。",
    "modelPinyin": "Jīntiān tiānqì hěn hǎo.",
    "modelMeaning": "Cuaca hari ini bagus.",
    "hint": "天气 berarti cuaca.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "weather-journal-2",
    "title": "Weather Journal 2",
    "mode": "Journal Sentence",
    "hanzi": "今天很热。",
    "pinyin": "jīntiān hěn rè.",
    "meaning": "Hari ini panas.",
    "prompt": "Tulis “Hari ini panas”.",
    "targetPattern": "今天 + 很 + 热",
    "modelAnswer": "今天很热。",
    "modelPinyin": "Jīntiān hěn rè.",
    "modelMeaning": "Hari ini panas.",
    "hint": "热 berarti panas.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "weather-journal-3",
    "title": "Weather Journal 3",
    "mode": "Journal Sentence",
    "hanzi": "北京很冷。",
    "pinyin": "Běijīng hěn lěng.",
    "meaning": "Beijing dingin.",
    "prompt": "Tulis “Beijing dingin”.",
    "targetPattern": "北京 + 很 + 冷",
    "modelAnswer": "北京很冷。",
    "modelPinyin": "Běijīng hěn lěng.",
    "modelMeaning": "Beijing dingin.",
    "hint": "冷 berarti dingin.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "weather-journal-4",
    "title": "Weather Journal 4",
    "mode": "Journal Sentence",
    "hanzi": "明天下雨。",
    "pinyin": "míngtiān xià yǔ.",
    "meaning": "Besok hujan.",
    "prompt": "Tulis “Besok hujan”.",
    "targetPattern": "明天 + 下雨",
    "modelAnswer": "明天下雨。",
    "modelPinyin": "Míngtiān xià yǔ.",
    "modelMeaning": "Besok hujan.",
    "hint": "下雨 berarti turun hujan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik14Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
