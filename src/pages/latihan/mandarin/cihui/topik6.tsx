import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-places-around-town",
  "title": "Cíhuì 6: Places Around Town",
  "description": "Melatih tempat umum yang sering muncul dalam percakapan HSK 1.",
  "topicNumber": 6,
  "focus": "Tempat umum.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "places-around-town-1",
    "title": "Places Around Town 1",
    "category": "Place",
    "hanzi": "学校",
    "pinyin": "xuéxiào",
    "meaning": "sekolah",
    "prompt": "Ingat arti dan pinyin dari “学校”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "sekolah; xuéxiào",
    "exampleSentence": "我去学校。",
    "examplePinyin": "Wǒ qù xuéxiào.",
    "exampleMeaning": "Saya pergi ke sekolah.",
    "hint": "Petunjuk: kategori kata ini adalah place.",
    "usage": "Tempat belajar, sering dipakai dengan 去 atau 在."
  },
  {
    "id": "places-around-town-2",
    "title": "Places Around Town 2",
    "category": "Place",
    "hanzi": "家",
    "pinyin": "jiā",
    "meaning": "rumah",
    "prompt": "Ingat arti dan pinyin dari “家”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "rumah; jiā",
    "exampleSentence": "她在家。",
    "examplePinyin": "Tā zài jiā.",
    "exampleMeaning": "Dia ada di rumah.",
    "hint": "Petunjuk: kategori kata ini adalah place.",
    "usage": "Tempat tinggal atau keluarga."
  },
  {
    "id": "places-around-town-3",
    "title": "Places Around Town 3",
    "category": "Place",
    "hanzi": "商店",
    "pinyin": "shāngdiàn",
    "meaning": "toko",
    "prompt": "Ingat arti dan pinyin dari “商店”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "toko; shāngdiàn",
    "exampleSentence": "我去商店买水。",
    "examplePinyin": "Wǒ qù shāngdiàn mǎi shuǐ.",
    "exampleMeaning": "Saya pergi ke toko membeli air.",
    "hint": "Petunjuk: kategori kata ini adalah place.",
    "usage": "Tempat membeli barang."
  },
  {
    "id": "places-around-town-4",
    "title": "Places Around Town 4",
    "category": "Place",
    "hanzi": "医院",
    "pinyin": "yīyuàn",
    "meaning": "rumah sakit",
    "prompt": "Ingat arti dan pinyin dari “医院”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "rumah sakit; yīyuàn",
    "exampleSentence": "医生在医院。",
    "examplePinyin": "Yīshēng zài yīyuàn.",
    "exampleMeaning": "Dokter ada di rumah sakit.",
    "hint": "Petunjuk: kategori kata ini adalah place.",
    "usage": "Tempat berobat atau bekerja bagi dokter."
  }
];

export default function MandarinCihuiTopik6Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
