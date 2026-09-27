import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-daily-routine",
  "title": "Xiězuò 15: Daily Routine",
  "description": "Melatih kalimat rutinitas dengan belajar, makan, pergi, dan pulang.",
  "topicNumber": 15,
  "focus": "Rutinitas harian.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "daily-routine-1",
    "title": "Daily Routine 1",
    "mode": "Routine Sentence",
    "hanzi": "我每天学习中文。",
    "pinyin": "wǒ měitiān xuéxí Zhōngwén.",
    "meaning": "Saya belajar Mandarin setiap hari.",
    "prompt": "Tulis “Saya belajar Mandarin setiap hari”.",
    "targetPattern": "我 + 每天 + 学习 + 中文",
    "modelAnswer": "我每天学习中文。",
    "modelPinyin": "Wǒ měitiān xuéxí Zhōngwén.",
    "modelMeaning": "Saya belajar Mandarin setiap hari.",
    "hint": "每天 berarti setiap hari.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "daily-routine-2",
    "title": "Daily Routine 2",
    "mode": "Routine Sentence",
    "hanzi": "我早上吃饭。",
    "pinyin": "wǒ zǎoshang chī fàn.",
    "meaning": "Saya makan pada pagi hari.",
    "prompt": "Tulis “Saya makan pada pagi hari”.",
    "targetPattern": "我 + 早上 + 吃饭",
    "modelAnswer": "我早上吃饭。",
    "modelPinyin": "Wǒ zǎoshang chī fàn.",
    "modelMeaning": "Saya makan pada pagi hari.",
    "hint": "早上 berarti pagi.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "daily-routine-3",
    "title": "Daily Routine 3",
    "mode": "Routine Sentence",
    "hanzi": "我下午去学校。",
    "pinyin": "wǒ xiàwǔ qù xuéxiào.",
    "meaning": "Saya pergi ke sekolah pada sore hari.",
    "prompt": "Tulis “Saya pergi ke sekolah pada sore hari”.",
    "targetPattern": "我 + 下午 + 去 + 学校",
    "modelAnswer": "我下午去学校。",
    "modelPinyin": "Wǒ xiàwǔ qù xuéxiào.",
    "modelMeaning": "Saya pergi ke sekolah pada sore hari.",
    "hint": "下午 berarti siang/sore setelah tengah hari.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "daily-routine-4",
    "title": "Daily Routine 4",
    "mode": "Routine Sentence",
    "hanzi": "我晚上回家。",
    "pinyin": "wǒ wǎnshang huí jiā.",
    "meaning": "Saya pulang ke rumah pada malam hari.",
    "prompt": "Tulis “Saya pulang ke rumah pada malam hari”.",
    "targetPattern": "我 + 晚上 + 回家",
    "modelAnswer": "我晚上回家。",
    "modelPinyin": "Wǒ wǎnshang huí jiā.",
    "modelMeaning": "Saya pulang ke rumah pada malam hari.",
    "hint": "回家 berarti pulang ke rumah.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik15Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
