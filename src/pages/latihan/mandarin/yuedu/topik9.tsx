import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-weather-notes",
  "title": "Yuèdú 9: Weather Notes",
  "description": "Membaca catatan cuaca dan suhu sederhana.",
  "topicNumber": 9,
  "focus": "Cuaca dalam bacaan.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "weather-notes-1",
    "title": "Weather Notes 1",
    "focus": "Weather",
    "passageHanzi": "今天天气很好，不冷也不热。",
    "passagePinyin": "Jīntiān tiānqì hěn hǎo, bù lěng yě bú rè.",
    "passageMeaning": "Cuaca hari ini bagus, tidak dingin dan tidak panas.",
    "question": "Bagaimana cuaca hari ini?",
    "answer": "很好 / bagus",
    "hint": "Cari 天气.",
    "keywords": [
      "天气",
      "很好",
      "不冷",
      "不热"
    ],
    "explanation": "天气很好 menyatakan cuaca bagus."
  },
  {
    "id": "weather-notes-2",
    "title": "Weather Notes 2",
    "focus": "Rain",
    "passageHanzi": "明天下雨。请带伞。",
    "passagePinyin": "Míngtiān xià yǔ. Qǐng dài sǎn.",
    "passageMeaning": "Besok hujan. Mohon bawa payung.",
    "question": "Apa yang harus dibawa?",
    "answer": "伞 / payung",
    "hint": "Cari 请带.",
    "keywords": [
      "明天",
      "下雨",
      "带伞"
    ],
    "explanation": "请带伞 berarti mohon bawa payung."
  },
  {
    "id": "weather-notes-3",
    "title": "Weather Notes 3",
    "focus": "Temperature",
    "passageHanzi": "北京很冷，上海不冷。",
    "passagePinyin": "Běijīng hěn lěng, Shànghǎi bù lěng.",
    "passageMeaning": "Beijing dingin, Shanghai tidak dingin.",
    "question": "Kota mana yang dingin?",
    "answer": "北京 / Beijing",
    "hint": "Cari 很冷.",
    "keywords": [
      "北京",
      "冷",
      "上海",
      "不冷"
    ],
    "explanation": "北京很冷 menyatakan Beijing dingin."
  },
  {
    "id": "weather-notes-4",
    "title": "Weather Notes 4",
    "focus": "Season",
    "passageHanzi": "夏天很热。我喜欢喝水。",
    "passagePinyin": "Xiàtiān hěn rè. Wǒ xǐhuan hē shuǐ.",
    "passageMeaning": "Musim panas sangat panas. Saya suka minum air.",
    "question": "Apa yang ia suka minum?",
    "answer": "水 / air",
    "hint": "Cari 喝.",
    "keywords": [
      "夏天",
      "热",
      "喝水"
    ],
    "explanation": "喜欢喝水 berarti suka minum air."
  }
];

export default function MandarinYueduTopik9Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
