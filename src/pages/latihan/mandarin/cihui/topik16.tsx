import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-weather-and-temperature",
  "title": "Cíhuì 16: Weather and Temperature",
  "description": "Melatih kata cuaca dan suhu untuk percakapan sehari-hari.",
  "topicNumber": 16,
  "focus": "Cuaca dan suhu.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "weather-and-temperature-1",
    "title": "Weather and Temperature 1",
    "category": "Weather",
    "hanzi": "天气",
    "pinyin": "tiānqì",
    "meaning": "cuaca",
    "prompt": "Ingat arti dan pinyin dari “天气”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "cuaca; tiānqì",
    "exampleSentence": "今天天气很好。",
    "examplePinyin": "Jīntiān tiānqì hěn hǎo.",
    "exampleMeaning": "Cuaca hari ini bagus.",
    "hint": "Petunjuk: kategori kata ini adalah weather.",
    "usage": "Topik pembuka percakapan tentang cuaca."
  },
  {
    "id": "weather-and-temperature-2",
    "title": "Weather and Temperature 2",
    "category": "Weather",
    "hanzi": "热",
    "pinyin": "rè",
    "meaning": "panas",
    "prompt": "Ingat arti dan pinyin dari “热”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "panas; rè",
    "exampleSentence": "今天很热。",
    "examplePinyin": "Jīntiān hěn rè.",
    "exampleMeaning": "Hari ini panas.",
    "hint": "Petunjuk: kategori kata ini adalah weather.",
    "usage": "Suhu panas atau rasa panas."
  },
  {
    "id": "weather-and-temperature-3",
    "title": "Weather and Temperature 3",
    "category": "Weather",
    "hanzi": "冷",
    "pinyin": "lěng",
    "meaning": "dingin",
    "prompt": "Ingat arti dan pinyin dari “冷”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "dingin; lěng",
    "exampleSentence": "北京很冷。",
    "examplePinyin": "Běijīng hěn lěng.",
    "exampleMeaning": "Beijing dingin.",
    "hint": "Petunjuk: kategori kata ini adalah weather.",
    "usage": "Suhu dingin atau rasa dingin."
  },
  {
    "id": "weather-and-temperature-4",
    "title": "Weather and Temperature 4",
    "category": "Weather",
    "hanzi": "下雨",
    "pinyin": "xià yǔ",
    "meaning": "turun hujan",
    "prompt": "Ingat arti dan pinyin dari “下雨”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "turun hujan; xià yǔ",
    "exampleSentence": "明天下雨。",
    "examplePinyin": "Míngtiān xià yǔ.",
    "exampleMeaning": "Besok hujan.",
    "hint": "Petunjuk: kategori kata ini adalah weather.",
    "usage": "Kata kerja/frasa untuk hujan turun."
  }
];

export default function MandarinCihuiTopik16Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
