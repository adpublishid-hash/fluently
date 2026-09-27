import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-weather-and-plans",
  "title": "Tīnglì 9: Weather and Plans",
  "description": "Melatih cuaca, suhu, dan rencana sederhana yang didengar.",
  "topicNumber": 9,
  "focus": "Cuaca dan rencana.",
  "goal": "Tangkap kata cuaca dan kegiatan yang terkait, lalu cek jawaban."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "weather-and-plans-1",
    "title": "Weather and Plans 1",
    "focus": "Weather",
    "audioHanzi": "今天很热。",
    "audioPinyin": "Jīntiān hěn rè.",
    "audioMeaning": "Hari ini sangat panas.",
    "question": "Bagaimana cuaca hari ini?",
    "answer": "很热 / sangat panas",
    "hint": "Dengarkan kata sifat setelah 很.",
    "keywords": [
      "今天",
      "很",
      "热"
    ],
    "explanation": "热 berarti panas."
  },
  {
    "id": "weather-and-plans-2",
    "title": "Weather and Plans 2",
    "focus": "Weather",
    "audioHanzi": "明天下雨。",
    "audioPinyin": "Míngtiān xià yǔ.",
    "audioMeaning": "Besok hujan.",
    "question": "Kapan akan hujan?",
    "answer": "明天 / besok",
    "hint": "Dengarkan kata waktu sebelum 下雨.",
    "keywords": [
      "明天",
      "下雨"
    ],
    "explanation": "明天 berarti besok."
  },
  {
    "id": "weather-and-plans-3",
    "title": "Weather and Plans 3",
    "focus": "Plan",
    "audioHanzi": "天气好，我们去公园。",
    "audioPinyin": "Tiānqì hǎo, wǒmen qù gōngyuán.",
    "audioMeaning": "Cuacanya baik, kami pergi ke taman.",
    "question": "Mereka pergi ke mana?",
    "answer": "公园 / taman",
    "hint": "Dengarkan tempat setelah 去.",
    "keywords": [
      "天气好",
      "去",
      "公园"
    ],
    "explanation": "公园 berarti taman."
  },
  {
    "id": "weather-and-plans-4",
    "title": "Weather and Plans 4",
    "focus": "Weather",
    "audioHanzi": "今天不冷。",
    "audioPinyin": "Jīntiān bù lěng.",
    "audioMeaning": "Hari ini tidak dingin.",
    "question": "Apakah hari ini dingin?",
    "answer": "Tidak, 不冷",
    "hint": "Dengarkan negasi 不 sebelum 冷.",
    "keywords": [
      "今天",
      "不",
      "冷"
    ],
    "explanation": "不冷 berarti tidak dingin."
  }
];

export default function MandarinTingliTopik9Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
