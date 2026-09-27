import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-transportation-messages",
  "title": "Tīnglì 10: Transportation Messages",
  "description": "Melatih kendaraan, pergi-pulang, dan pesan transportasi pendek.",
  "topicNumber": 10,
  "focus": "Transportasi dan tujuan.",
  "goal": "Dengarkan kendaraan atau tujuan perjalanan, lalu tulis informasi yang benar."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "transportation-messages-1",
    "title": "Transportation Messages 1",
    "focus": "Transport",
    "audioHanzi": "我坐公共汽车去学校。",
    "audioPinyin": "Wǒ zuò gōnggòng qìchē qù xuéxiào.",
    "audioMeaning": "Saya naik bus ke sekolah.",
    "question": "Kendaraan apa yang dipakai?",
    "answer": "公共汽车 / bus",
    "hint": "Dengarkan kata setelah 坐.",
    "keywords": [
      "坐",
      "公共汽车",
      "学校"
    ],
    "explanation": "公共汽车 berarti bus."
  },
  {
    "id": "transportation-messages-2",
    "title": "Transportation Messages 2",
    "focus": "Transport",
    "audioHanzi": "他骑自行车回家。",
    "audioPinyin": "Tā qí zìxíngchē huí jiā.",
    "audioMeaning": "Dia naik sepeda pulang ke rumah.",
    "question": "Dia pulang dengan apa?",
    "answer": "自行车 / sepeda",
    "hint": "Cari kendaraan setelah 骑.",
    "keywords": [
      "骑",
      "自行车",
      "回家"
    ],
    "explanation": "骑自行车 berarti mengendarai sepeda."
  },
  {
    "id": "transportation-messages-3",
    "title": "Transportation Messages 3",
    "focus": "Transport",
    "audioHanzi": "火车站在右边。",
    "audioPinyin": "Huǒchēzhàn zài yòubiān.",
    "audioMeaning": "Stasiun kereta ada di kanan.",
    "question": "Stasiun ada di mana?",
    "answer": "右边 / kanan",
    "hint": "Dengarkan arah setelah 在.",
    "keywords": [
      "火车站",
      "在",
      "右边"
    ],
    "explanation": "右边 berarti kanan."
  },
  {
    "id": "transportation-messages-4",
    "title": "Transportation Messages 4",
    "focus": "Transport",
    "audioHanzi": "我们明天坐飞机。",
    "audioPinyin": "Wǒmen míngtiān zuò fēijī.",
    "audioMeaning": "Kami besok naik pesawat.",
    "question": "Kapan mereka naik pesawat?",
    "answer": "明天 / besok",
    "hint": "Dengarkan kata waktu sebelum 坐飞机.",
    "keywords": [
      "明天",
      "坐",
      "飞机"
    ],
    "explanation": "明天 adalah waktu perjalanan."
  }
];

export default function MandarinTingliTopik10Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
