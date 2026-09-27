import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-transport-reading",
  "title": "Yuèdú 10: Transport Reading",
  "description": "Membaca informasi transportasi sederhana untuk pergi dan pulang.",
  "topicNumber": 10,
  "focus": "Transportasi dalam bacaan.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "transport-reading-1",
    "title": "Transport Reading 1",
    "focus": "Transport",
    "passageHanzi": "我坐地铁去学校。地铁很快。",
    "passagePinyin": "Wǒ zuò dìtiě qù xuéxiào. Dìtiě hěn kuài.",
    "passageMeaning": "Saya naik metro ke sekolah. Metro sangat cepat.",
    "question": "Transportasi apa yang dipakai?",
    "answer": "地铁 / metro",
    "hint": "Cari 坐.",
    "keywords": [
      "坐地铁",
      "学校",
      "很快"
    ],
    "explanation": "坐地铁 berarti naik metro."
  },
  {
    "id": "transport-reading-2",
    "title": "Transport Reading 2",
    "focus": "Travel",
    "passageHanzi": "他坐飞机去中国。",
    "passagePinyin": "Tā zuò fēijī qù Zhōngguó.",
    "passageMeaning": "Dia naik pesawat ke Tiongkok.",
    "question": "Ke mana dia pergi?",
    "answer": "中国 / Tiongkok",
    "hint": "Cari setelah 去.",
    "keywords": [
      "飞机",
      "去",
      "中国"
    ],
    "explanation": "去中国 berarti pergi ke Tiongkok."
  },
  {
    "id": "transport-reading-3",
    "title": "Transport Reading 3",
    "focus": "Return",
    "passageHanzi": "晚上我们坐车回家。",
    "passagePinyin": "Wǎnshang wǒmen zuò chē huí jiā.",
    "passageMeaning": "Malam hari kami naik kendaraan pulang ke rumah.",
    "question": "Kapan mereka pulang?",
    "answer": "晚上 / malam hari",
    "hint": "Cari kata waktu di awal.",
    "keywords": [
      "晚上",
      "坐车",
      "回家"
    ],
    "explanation": "晚上 adalah kata waktu dalam teks."
  },
  {
    "id": "transport-reading-4",
    "title": "Transport Reading 4",
    "focus": "Train",
    "passageHanzi": "火车票不贵。我们买两张票。",
    "passagePinyin": "Huǒchē piào bú guì. Wǒmen mǎi liǎng zhāng piào.",
    "passageMeaning": "Tiket kereta tidak mahal. Kami membeli dua tiket.",
    "question": "Berapa tiket yang dibeli?",
    "answer": "两张票 / dua tiket",
    "hint": "Cari 买.",
    "keywords": [
      "火车票",
      "不贵",
      "两张票"
    ],
    "explanation": "买两张票 berarti membeli dua tiket."
  }
];

export default function MandarinYueduTopik10Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
