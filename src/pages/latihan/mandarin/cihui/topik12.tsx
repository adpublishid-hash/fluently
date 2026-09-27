import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-learning-actions",
  "title": "Cíhuì 12: Learning Actions",
  "description": "Melatih kata kerja belajar: belajar, menulis, membaca, dan berbicara.",
  "topicNumber": 12,
  "focus": "Aksi belajar.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "learning-actions-1",
    "title": "Learning Actions 1",
    "category": "Study verb",
    "hanzi": "学习",
    "pinyin": "xuéxí",
    "meaning": "belajar",
    "prompt": "Ingat arti dan pinyin dari “学习”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "belajar; xuéxí",
    "exampleSentence": "我学习中文。",
    "examplePinyin": "Wǒ xuéxí Zhōngwén.",
    "exampleMeaning": "Saya belajar bahasa Mandarin.",
    "hint": "Petunjuk: kategori kata ini adalah study verb.",
    "usage": "Kata kerja umum untuk belajar."
  },
  {
    "id": "learning-actions-2",
    "title": "Learning Actions 2",
    "category": "Study verb",
    "hanzi": "写",
    "pinyin": "xiě",
    "meaning": "menulis",
    "prompt": "Ingat arti dan pinyin dari “写”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "menulis; xiě",
    "exampleSentence": "她写汉字。",
    "examplePinyin": "Tā xiě Hànzì.",
    "exampleMeaning": "Dia menulis Hanzi.",
    "hint": "Petunjuk: kategori kata ini adalah study verb.",
    "usage": "Dipakai untuk menulis huruf, nama, atau kalimat."
  },
  {
    "id": "learning-actions-3",
    "title": "Learning Actions 3",
    "category": "Study verb",
    "hanzi": "读",
    "pinyin": "dú",
    "meaning": "membaca",
    "prompt": "Ingat arti dan pinyin dari “读”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "membaca; dú",
    "exampleSentence": "我读书。",
    "examplePinyin": "Wǒ dú shū.",
    "exampleMeaning": "Saya membaca buku.",
    "hint": "Petunjuk: kategori kata ini adalah study verb.",
    "usage": "Kata kerja membaca atau belajar formal."
  },
  {
    "id": "learning-actions-4",
    "title": "Learning Actions 4",
    "category": "Study verb",
    "hanzi": "说",
    "pinyin": "shuō",
    "meaning": "berbicara",
    "prompt": "Ingat arti dan pinyin dari “说”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "berbicara; shuō",
    "exampleSentence": "他说中文。",
    "examplePinyin": "Tā shuō Zhōngwén.",
    "exampleMeaning": "Dia berbicara bahasa Mandarin.",
    "hint": "Petunjuk: kategori kata ini adalah study verb.",
    "usage": "Dipakai untuk bahasa yang diucapkan."
  }
];

export default function MandarinCihuiTopik12Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
