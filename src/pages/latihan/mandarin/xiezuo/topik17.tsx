import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-travel-mini-sentences",
  "title": "Xiězuò 17: Travel Mini Sentences",
  "description": "Melatih kalimat perjalanan pendek dengan transportasi dan tempat tujuan.",
  "topicNumber": 17,
  "focus": "Perjalanan tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "travel-mini-sentences-1",
    "title": "Travel Mini Sentences 1",
    "mode": "Travel Sentence",
    "hanzi": "我坐车去学校。",
    "pinyin": "wǒ zuò chē qù xuéxiào.",
    "meaning": "Saya naik kendaraan ke sekolah.",
    "prompt": "Tulis “Saya naik kendaraan ke sekolah”.",
    "targetPattern": "我 + 坐车 + 去 + 学校",
    "modelAnswer": "我坐车去学校。",
    "modelPinyin": "Wǒ zuò chē qù xuéxiào.",
    "modelMeaning": "Saya naik kendaraan ke sekolah.",
    "hint": "坐车 berarti naik kendaraan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "travel-mini-sentences-2",
    "title": "Travel Mini Sentences 2",
    "mode": "Travel Sentence",
    "hanzi": "他坐火车去北京。",
    "pinyin": "tā zuò huǒchē qù Běijīng.",
    "meaning": "Dia naik kereta ke Beijing.",
    "prompt": "Tulis “Dia naik kereta ke Beijing”.",
    "targetPattern": "他 + 坐火车 + 去 + 北京",
    "modelAnswer": "他坐火车去北京。",
    "modelPinyin": "Tā zuò huǒchē qù Běijīng.",
    "modelMeaning": "Dia naik kereta ke Beijing.",
    "hint": "火车 berarti kereta api.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "travel-mini-sentences-3",
    "title": "Travel Mini Sentences 3",
    "mode": "Travel Sentence",
    "hanzi": "我坐飞机。",
    "pinyin": "wǒ zuò fēijī.",
    "meaning": "Saya naik pesawat.",
    "prompt": "Tulis “Saya naik pesawat”.",
    "targetPattern": "我 + 坐 + 飞机",
    "modelAnswer": "我坐飞机。",
    "modelPinyin": "Wǒ zuò fēijī.",
    "modelMeaning": "Saya naik pesawat.",
    "hint": "飞机 berarti pesawat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "travel-mini-sentences-4",
    "title": "Travel Mini Sentences 4",
    "mode": "Travel Sentence",
    "hanzi": "我们坐地铁回家。",
    "pinyin": "wǒmen zuò dìtiě huí jiā.",
    "meaning": "Kami naik metro pulang ke rumah.",
    "prompt": "Tulis “Kami naik metro pulang ke rumah”.",
    "targetPattern": "我们 + 坐地铁 + 回家",
    "modelAnswer": "我们坐地铁回家。",
    "modelPinyin": "Wǒmen zuò dìtiě huí jiā.",
    "modelMeaning": "Kami naik metro pulang ke rumah.",
    "hint": "我们 berarti kami/kita.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik17Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
