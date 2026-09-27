import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-transportation",
  "title": "Cíhuì 10: Transportation",
  "description": "Melatih kendaraan dasar untuk menyebut cara pergi ke tempat tertentu.",
  "topicNumber": 10,
  "focus": "Transportasi.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "transportation-1",
    "title": "Transportation 1",
    "category": "Transport",
    "hanzi": "车",
    "pinyin": "chē",
    "meaning": "kendaraan atau mobil",
    "prompt": "Ingat arti dan pinyin dari “车”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kendaraan atau mobil; chē",
    "exampleSentence": "我坐车去学校。",
    "examplePinyin": "Wǒ zuò chē qù xuéxiào.",
    "exampleMeaning": "Saya naik kendaraan ke sekolah.",
    "hint": "Petunjuk: kategori kata ini adalah transport.",
    "usage": "Kata umum untuk kendaraan, bisa mobil atau kendaraan darat."
  },
  {
    "id": "transportation-2",
    "title": "Transportation 2",
    "category": "Transport",
    "hanzi": "火车",
    "pinyin": "huǒchē",
    "meaning": "kereta api",
    "prompt": "Ingat arti dan pinyin dari “火车”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kereta api; huǒchē",
    "exampleSentence": "他坐火车去北京。",
    "examplePinyin": "Tā zuò huǒchē qù Běijīng.",
    "exampleMeaning": "Dia naik kereta ke Beijing.",
    "hint": "Petunjuk: kategori kata ini adalah transport.",
    "usage": "Kereta api, harfiah kendaraan api."
  },
  {
    "id": "transportation-3",
    "title": "Transportation 3",
    "category": "Transport",
    "hanzi": "飞机",
    "pinyin": "fēijī",
    "meaning": "pesawat",
    "prompt": "Ingat arti dan pinyin dari “飞机”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "pesawat; fēijī",
    "exampleSentence": "我坐飞机。",
    "examplePinyin": "Wǒ zuò fēijī.",
    "exampleMeaning": "Saya naik pesawat.",
    "hint": "Petunjuk: kategori kata ini adalah transport.",
    "usage": "Kendaraan udara."
  },
  {
    "id": "transportation-4",
    "title": "Transportation 4",
    "category": "Transport",
    "hanzi": "地铁",
    "pinyin": "dìtiě",
    "meaning": "kereta bawah tanah",
    "prompt": "Ingat arti dan pinyin dari “地铁”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kereta bawah tanah; dìtiě",
    "exampleSentence": "我坐地铁回家。",
    "examplePinyin": "Wǒ zuò dìtiě huí jiā.",
    "exampleMeaning": "Saya naik metro pulang ke rumah.",
    "hint": "Petunjuk: kategori kata ini adalah transport.",
    "usage": "Metro atau MRT."
  }
];

export default function MandarinCihuiTopik10Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
