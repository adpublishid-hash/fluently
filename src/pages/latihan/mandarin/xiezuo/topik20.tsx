import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-hsk-1-writing-review",
  "title": "Xiězuò 20: HSK 1 Writing Review",
  "description": "Menggabungkan pola writing HSK 1 dari salam sampai paragraf pendek.",
  "topicNumber": 20,
  "focus": "Review writing HSK 1.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "hsk-1-writing-review-1",
    "title": "HSK 1 Writing Review 1",
    "mode": "Review Sentence",
    "hanzi": "你好，我叫安娜。",
    "pinyin": "nǐ hǎo, wǒ jiào Ānnà.",
    "meaning": "Halo, saya bernama Anna.",
    "prompt": "Tulis salam dan perkenalan nama dalam satu kalimat.",
    "targetPattern": "你好，我叫...。",
    "modelAnswer": "你好，我叫安娜。",
    "modelPinyin": "Nǐ hǎo, wǒ jiào Ānnà.",
    "modelMeaning": "Halo, saya bernama Anna.",
    "hint": "Gunakan koma Mandarin ， setelah salam.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "hsk-1-writing-review-2",
    "title": "HSK 1 Writing Review 2",
    "mode": "Review Sentence",
    "hanzi": "我是印度尼西亚人。",
    "pinyin": "wǒ shì Yìndùníxīyà rén.",
    "meaning": "Saya orang Indonesia.",
    "prompt": "Tulis “Saya orang Indonesia”.",
    "targetPattern": "我 + 是 + 印度尼西亚 + 人",
    "modelAnswer": "我是印度尼西亚人。",
    "modelPinyin": "Wǒ shì Yìndùníxīyà rén.",
    "modelMeaning": "Saya orang Indonesia.",
    "hint": "Negara + 人 berarti orang dari negara itu.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "hsk-1-writing-review-3",
    "title": "HSK 1 Writing Review 3",
    "mode": "Review Sentence",
    "hanzi": "我喜欢学习中文。",
    "pinyin": "wǒ xǐhuan xuéxí Zhōngwén.",
    "meaning": "Saya suka belajar Mandarin.",
    "prompt": "Tulis “Saya suka belajar Mandarin”.",
    "targetPattern": "我 + 喜欢 + 学习 + 中文",
    "modelAnswer": "我喜欢学习中文。",
    "modelPinyin": "Wǒ xǐhuan xuéxí Zhōngwén.",
    "modelMeaning": "Saya suka belajar Mandarin.",
    "hint": "喜欢 bisa diikuti aktivitas.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "hsk-1-writing-review-4",
    "title": "HSK 1 Writing Review 4",
    "mode": "Review Paragraph",
    "hanzi": "我叫安娜。我是学生。我每天学习中文。",
    "pinyin": "wǒ jiào Ānnà. wǒ shì xuésheng. wǒ měitiān xuéxí Zhōngwén.",
    "meaning": "Saya bernama Anna. Saya pelajar. Saya belajar Mandarin setiap hari.",
    "prompt": "Tulis paragraf tiga kalimat tentang diri dan belajar Mandarin.",
    "targetPattern": "我叫...。我是学生。我每天学习中文。",
    "modelAnswer": "我叫安娜。我是学生。我每天学习中文。",
    "modelPinyin": "Wǒ jiào Ānnà. Wǒ shì xuésheng. Wǒ měitiān xuéxí Zhōngwén.",
    "modelMeaning": "Saya bernama Anna. Saya pelajar. Saya belajar Mandarin setiap hari.",
    "hint": "Jaga setiap kalimat berakhir dengan 。",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik20Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
