import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-hsk-1-vocabulary-review",
  "title": "Cíhuì 20: HSK 1 Vocabulary Review",
  "description": "Menggabungkan kosakata penting HSK 1 untuk review akhir Cíhuì pemula.",
  "topicNumber": 20,
  "focus": "Review kosakata HSK 1.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "hsk-1-vocabulary-review-1",
    "title": "HSK 1 Vocabulary Review 1",
    "category": "Review",
    "hanzi": "朋友",
    "pinyin": "péngyǒu",
    "meaning": "teman",
    "prompt": "Ingat arti dan pinyin dari “朋友”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "teman; péngyǒu",
    "exampleSentence": "他是我的朋友。",
    "examplePinyin": "Tā shì wǒ de péngyǒu.",
    "exampleMeaning": "Dia teman saya.",
    "hint": "Petunjuk: kategori kata ini adalah review.",
    "usage": "Orang yang dekat atau teman."
  },
  {
    "id": "hsk-1-vocabulary-review-2",
    "title": "HSK 1 Vocabulary Review 2",
    "category": "Review",
    "hanzi": "中国",
    "pinyin": "Zhōngguó",
    "meaning": "Tiongkok",
    "prompt": "Ingat arti dan pinyin dari “中国”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "Tiongkok; Zhōngguó",
    "exampleSentence": "我去中国。",
    "examplePinyin": "Wǒ qù Zhōngguó.",
    "exampleMeaning": "Saya pergi ke Tiongkok.",
    "hint": "Petunjuk: kategori kata ini adalah review.",
    "usage": "Nama negara Tiongkok."
  },
  {
    "id": "hsk-1-vocabulary-review-3",
    "title": "HSK 1 Vocabulary Review 3",
    "category": "Review",
    "hanzi": "语言",
    "pinyin": "yǔyán",
    "meaning": "bahasa",
    "prompt": "Ingat arti dan pinyin dari “语言”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "bahasa; yǔyán",
    "exampleSentence": "中文是一种语言。",
    "examplePinyin": "Zhōngwén shì yī zhǒng yǔyán.",
    "exampleMeaning": "Bahasa Mandarin adalah sebuah bahasa.",
    "hint": "Petunjuk: kategori kata ini adalah review.",
    "usage": "Bahasa sebagai sistem komunikasi."
  },
  {
    "id": "hsk-1-vocabulary-review-4",
    "title": "HSK 1 Vocabulary Review 4",
    "category": "Review",
    "hanzi": "名字",
    "pinyin": "míngzi",
    "meaning": "nama",
    "prompt": "Ingat arti dan pinyin dari “名字”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "nama; míngzi",
    "exampleSentence": "你的名字是什么？",
    "examplePinyin": "Nǐ de míngzi shì shénme?",
    "exampleMeaning": "Nama kamu apa?",
    "hint": "Petunjuk: kategori kata ini adalah review.",
    "usage": "Nama orang atau sesuatu."
  }
];

export default function MandarinCihuiTopik20Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
