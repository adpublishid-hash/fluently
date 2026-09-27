import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-mini-paragraph-about-self",
  "title": "Xiězuò 19: Mini Paragraph About Self",
  "description": "Melatih paragraf pendek tentang nama, identitas, bahasa, dan hobi.",
  "topicNumber": 19,
  "focus": "Paragraf diri.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "mini-paragraph-about-self-1",
    "title": "Mini Paragraph About Self 1",
    "mode": "Mini Paragraph",
    "hanzi": "我叫安娜。我是学生。",
    "pinyin": "wǒ jiào Ānnà. wǒ shì xuésheng.",
    "meaning": "Saya bernama Anna. Saya pelajar.",
    "prompt": "Tulis dua kalimat: nama dan identitas.",
    "targetPattern": "我叫...。我是学生。",
    "modelAnswer": "我叫安娜。我是学生。",
    "modelPinyin": "Wǒ jiào Ānnà. Wǒ shì xuésheng.",
    "modelMeaning": "Saya bernama Anna. Saya pelajar.",
    "hint": "Pisahkan dua kalimat dengan titik Mandarin 。",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "mini-paragraph-about-self-2",
    "title": "Mini Paragraph About Self 2",
    "mode": "Mini Paragraph",
    "hanzi": "我学习中文。我喜欢中文。",
    "pinyin": "wǒ xuéxí Zhōngwén. wǒ xǐhuan Zhōngwén.",
    "meaning": "Saya belajar Mandarin. Saya suka Mandarin.",
    "prompt": "Tulis dua kalimat tentang belajar dan suka Mandarin.",
    "targetPattern": "我学习中文。我喜欢中文。",
    "modelAnswer": "我学习中文。我喜欢中文。",
    "modelPinyin": "Wǒ xuéxí Zhōngwén. Wǒ xǐhuan Zhōngwén.",
    "modelMeaning": "Saya belajar Mandarin. Saya suka Mandarin.",
    "hint": "中文 berarti bahasa Mandarin.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "mini-paragraph-about-self-3",
    "title": "Mini Paragraph About Self 3",
    "mode": "Mini Paragraph",
    "hanzi": "我有一个朋友。他很好。",
    "pinyin": "wǒ yǒu yī ge péngyǒu. tā hěn hǎo.",
    "meaning": "Saya punya satu teman. Dia baik.",
    "prompt": "Tulis dua kalimat tentang teman.",
    "targetPattern": "我有一个朋友。他很好。",
    "modelAnswer": "我有一个朋友。他很好。",
    "modelPinyin": "Wǒ yǒu yī ge péngyǒu. Tā hěn hǎo.",
    "modelMeaning": "Saya punya satu teman. Dia baik.",
    "hint": "Gunakan 一个 untuk satu orang/benda umum.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "mini-paragraph-about-self-4",
    "title": "Mini Paragraph About Self 4",
    "mode": "Mini Paragraph",
    "hanzi": "今天我在家。我想喝茶。",
    "pinyin": "jīntiān wǒ zài jiā. wǒ xiǎng hē chá.",
    "meaning": "Hari ini saya di rumah. Saya ingin minum teh.",
    "prompt": "Tulis dua kalimat tentang hari ini dan keinginan.",
    "targetPattern": "今天我在家。我想喝茶。",
    "modelAnswer": "今天我在家。我想喝茶。",
    "modelPinyin": "Jīntiān wǒ zài jiā. Wǒ xiǎng hē chá.",
    "modelMeaning": "Hari ini saya di rumah. Saya ingin minum teh.",
    "hint": "Kalimat kedua memakai 想 + kata kerja.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik19Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
