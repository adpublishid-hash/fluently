import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-classroom-mini-notes",
  "title": "Xiězuò 16: Classroom Mini Notes",
  "description": "Melatih catatan kelas pendek untuk benda dan instruksi belajar.",
  "topicNumber": 16,
  "focus": "Catatan kelas.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "classroom-mini-notes-1",
    "title": "Classroom Mini Notes 1",
    "mode": "Class Note",
    "hanzi": "请写汉字。",
    "pinyin": "qǐng xiě Hànzì.",
    "meaning": "Silakan tulis Hanzi.",
    "prompt": "Tulis instruksi “Silakan tulis Hanzi”.",
    "targetPattern": "请 + 写 + 汉字",
    "modelAnswer": "请写汉字。",
    "modelPinyin": "Qǐng xiě Hànzì.",
    "modelMeaning": "Silakan tulis Hanzi.",
    "hint": "请 membuat instruksi lebih sopan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "classroom-mini-notes-2",
    "title": "Classroom Mini Notes 2",
    "mode": "Class Note",
    "hanzi": "请读书。",
    "pinyin": "qǐng dú shū.",
    "meaning": "Silakan membaca buku.",
    "prompt": "Tulis instruksi “Silakan membaca buku”.",
    "targetPattern": "请 + 读书",
    "modelAnswer": "请读书。",
    "modelPinyin": "Qǐng dú shū.",
    "modelMeaning": "Silakan membaca buku.",
    "hint": "读书 berarti membaca/belajar.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "classroom-mini-notes-3",
    "title": "Classroom Mini Notes 3",
    "mode": "Class Note",
    "hanzi": "老师说中文。",
    "pinyin": "lǎoshī shuō Zhōngwén.",
    "meaning": "Guru berbicara Mandarin.",
    "prompt": "Tulis “Guru berbicara Mandarin”.",
    "targetPattern": "老师 + 说 + 中文",
    "modelAnswer": "老师说中文。",
    "modelPinyin": "Lǎoshī shuō Zhōngwén.",
    "modelMeaning": "Guru berbicara Mandarin.",
    "hint": "说 dipakai untuk bahasa yang diucapkan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "classroom-mini-notes-4",
    "title": "Classroom Mini Notes 4",
    "mode": "Class Note",
    "hanzi": "学生写名字。",
    "pinyin": "xuésheng xiě míngzi.",
    "meaning": "Pelajar menulis nama.",
    "prompt": "Tulis “Pelajar menulis nama”.",
    "targetPattern": "学生 + 写 + 名字",
    "modelAnswer": "学生写名字。",
    "modelPinyin": "Xuésheng xiě míngzi.",
    "modelMeaning": "Pelajar menulis nama.",
    "hint": "名字 berarti nama.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik16Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
