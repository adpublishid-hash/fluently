import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-transport-and-travel",
  "title": "Kǒuyǔ 12: Transport and Travel",
  "description": "Melatih berbicara tentang kendaraan, tujuan, dan perjalanan singkat.",
  "topicNumber": 12,
  "focus": "Transportasi dan tujuan.",
  "goal": "Gunakan 坐, 骑, 去, dan 回家 untuk menjelaskan perjalanan."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "transport-and-travel-1",
    "title": "Transport and Travel 1",
    "scenario": "Transport",
    "prompt": "Katakan kamu naik bus ke sekolah.",
    "role": "You describe commute.",
    "modelHanzi": "我坐公共汽车去学校。",
    "modelPinyin": "Wǒ zuò gōnggòng qìchē qù xuéxiào.",
    "modelMeaning": "Saya naik bus ke sekolah.",
    "starter": "我坐...去...",
    "hint": "坐 dipakai untuk kendaraan umum.",
    "checklist": [
      "坐公共汽车 jelas.",
      "去学校 sebagai tujuan.",
      "Kalimat tidak terlalu panjang."
    ],
    "followUp": "Coba ganti 公共汽车 dengan 地铁."
  },
  {
    "id": "transport-and-travel-2",
    "title": "Transport and Travel 2",
    "scenario": "Transport",
    "prompt": "Katakan dia pulang naik sepeda.",
    "role": "You describe someone travel.",
    "modelHanzi": "他骑自行车回家。",
    "modelPinyin": "Tā qí zìxíngchē huí jiā.",
    "modelMeaning": "Dia naik sepeda pulang.",
    "starter": "他骑...回家。",
    "hint": "骑 untuk sepeda/motor/kuda.",
    "checklist": [
      "骑自行车 jelas.",
      "回家 di akhir.",
      "Subjek 他 terdengar."
    ],
    "followUp": "Coba versi 我骑自行车."
  },
  {
    "id": "transport-and-travel-3",
    "title": "Transport and Travel 3",
    "scenario": "Travel",
    "prompt": "Katakan kamu pergi wisata ke Beijing.",
    "role": "You talk about travel.",
    "modelHanzi": "我去北京旅游。",
    "modelPinyin": "Wǒ qù Běijīng lǚyóu.",
    "modelMeaning": "Saya pergi wisata ke Beijing.",
    "starter": "我去...旅游。",
    "hint": "旅游 berarti wisata.",
    "checklist": [
      "北京 jelas.",
      "旅游 tidak tertukar.",
      "Kalimat ringkas."
    ],
    "followUp": "Tambahkan 明天 jika perlu."
  },
  {
    "id": "transport-and-travel-4",
    "title": "Transport and Travel 4",
    "scenario": "Transport",
    "prompt": "Tanyakan stasiun kereta ada di mana.",
    "role": "You ask station location.",
    "modelHanzi": "火车站在哪儿？",
    "modelPinyin": "Huǒchēzhàn zài nǎr?",
    "modelMeaning": "Stasiun kereta ada di mana?",
    "starter": "火车站在哪儿？",
    "hint": "火车站 berarti stasiun kereta.",
    "checklist": [
      "火车站 jelas.",
      "在哪儿 naik di akhir.",
      "Pertanyaan natural."
    ],
    "followUp": "Coba tanyakan 出租车在哪儿？"
  }
];

export default function MandarinKouyuTopik12Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
