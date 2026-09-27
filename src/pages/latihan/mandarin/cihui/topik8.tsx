import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-food-and-drink",
  "title": "Cíhuì 8: Food and Drink",
  "description": "Melatih kata makanan dan minuman dasar untuk kebutuhan harian.",
  "topicNumber": 8,
  "focus": "Makanan dan minuman.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "food-and-drink-1",
    "title": "Food and Drink 1",
    "category": "Food",
    "hanzi": "饭",
    "pinyin": "fàn",
    "meaning": "nasi atau makanan",
    "prompt": "Ingat arti dan pinyin dari “饭”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "nasi atau makanan; fàn",
    "exampleSentence": "我吃饭。",
    "examplePinyin": "Wǒ chī fàn.",
    "exampleMeaning": "Saya makan.",
    "hint": "Petunjuk: kategori kata ini adalah food.",
    "usage": "Bisa berarti nasi atau kegiatan makan dalam 吃饭."
  },
  {
    "id": "food-and-drink-2",
    "title": "Food and Drink 2",
    "category": "Drink",
    "hanzi": "水",
    "pinyin": "shuǐ",
    "meaning": "air",
    "prompt": "Ingat arti dan pinyin dari “水”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "air; shuǐ",
    "exampleSentence": "我喝水。",
    "examplePinyin": "Wǒ hē shuǐ.",
    "exampleMeaning": "Saya minum air.",
    "hint": "Petunjuk: kategori kata ini adalah drink.",
    "usage": "Minuman paling dasar, dipakai dengan 喝."
  },
  {
    "id": "food-and-drink-3",
    "title": "Food and Drink 3",
    "category": "Drink",
    "hanzi": "茶",
    "pinyin": "chá",
    "meaning": "teh",
    "prompt": "Ingat arti dan pinyin dari “茶”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "teh; chá",
    "exampleSentence": "妈妈喝茶。",
    "examplePinyin": "Māma hē chá.",
    "exampleMeaning": "Ibu minum teh.",
    "hint": "Petunjuk: kategori kata ini adalah drink.",
    "usage": "Minuman teh, umum dalam percakapan harian."
  },
  {
    "id": "food-and-drink-4",
    "title": "Food and Drink 4",
    "category": "Drink",
    "hanzi": "咖啡",
    "pinyin": "kāfēi",
    "meaning": "kopi",
    "prompt": "Ingat arti dan pinyin dari “咖啡”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kopi; kāfēi",
    "exampleSentence": "他喜欢咖啡。",
    "examplePinyin": "Tā xǐhuan kāfēi.",
    "exampleMeaning": "Dia suka kopi.",
    "hint": "Petunjuk: kategori kata ini adalah drink.",
    "usage": "Kata serapan untuk kopi."
  }
];

export default function MandarinCihuiTopik8Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
