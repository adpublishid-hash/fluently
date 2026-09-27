import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-colors",
  "title": "Cíhuì 14: Colors",
  "description": "Melatih warna dasar untuk mendeskripsikan benda sehari-hari.",
  "topicNumber": 14,
  "focus": "Warna dasar.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "colors-1",
    "title": "Colors 1",
    "category": "Color",
    "hanzi": "红色",
    "pinyin": "hóngsè",
    "meaning": "merah",
    "prompt": "Ingat arti dan pinyin dari “红色”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "merah; hóngsè",
    "exampleSentence": "我喜欢红色。",
    "examplePinyin": "Wǒ xǐhuan hóngsè.",
    "exampleMeaning": "Saya suka warna merah.",
    "hint": "Petunjuk: kategori kata ini adalah color.",
    "usage": "Warna merah, 色 berarti warna."
  },
  {
    "id": "colors-2",
    "title": "Colors 2",
    "category": "Color",
    "hanzi": "蓝色",
    "pinyin": "lánsè",
    "meaning": "biru",
    "prompt": "Ingat arti dan pinyin dari “蓝色”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "biru; lánsè",
    "exampleSentence": "这是蓝色的书。",
    "examplePinyin": "Zhè shì lánsè de shū.",
    "exampleMeaning": "Ini buku berwarna biru.",
    "hint": "Petunjuk: kategori kata ini adalah color.",
    "usage": "Warna biru."
  },
  {
    "id": "colors-3",
    "title": "Colors 3",
    "category": "Color",
    "hanzi": "白色",
    "pinyin": "báisè",
    "meaning": "putih",
    "prompt": "Ingat arti dan pinyin dari “白色”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "putih; báisè",
    "exampleSentence": "她有白色的笔。",
    "examplePinyin": "Tā yǒu báisè de bǐ.",
    "exampleMeaning": "Dia punya pena putih.",
    "hint": "Petunjuk: kategori kata ini adalah color.",
    "usage": "Warna putih."
  },
  {
    "id": "colors-4",
    "title": "Colors 4",
    "category": "Color",
    "hanzi": "黑色",
    "pinyin": "hēisè",
    "meaning": "hitam",
    "prompt": "Ingat arti dan pinyin dari “黑色”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "hitam; hēisè",
    "exampleSentence": "这不是黑色。",
    "examplePinyin": "Zhè bú shì hēisè.",
    "exampleMeaning": "Ini bukan warna hitam.",
    "hint": "Petunjuk: kategori kata ini adalah color.",
    "usage": "Warna hitam."
  }
];

export default function MandarinCihuiTopik14Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
