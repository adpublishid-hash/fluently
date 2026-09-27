import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-fruits",
  "title": "Cíhuì 9: Fruits",
  "description": "Melatih kosakata buah populer untuk belanja dan selera makan.",
  "topicNumber": 9,
  "focus": "Nama buah.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "fruits-1",
    "title": "Fruits 1",
    "category": "Fruit",
    "hanzi": "苹果",
    "pinyin": "píngguǒ",
    "meaning": "apel",
    "prompt": "Ingat arti dan pinyin dari “苹果”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "apel; píngguǒ",
    "exampleSentence": "我买苹果。",
    "examplePinyin": "Wǒ mǎi píngguǒ.",
    "exampleMeaning": "Saya membeli apel.",
    "hint": "Petunjuk: kategori kata ini adalah fruit.",
    "usage": "Buah apel, sering muncul di topik belanja."
  },
  {
    "id": "fruits-2",
    "title": "Fruits 2",
    "category": "Fruit",
    "hanzi": "香蕉",
    "pinyin": "xiāngjiāo",
    "meaning": "pisang",
    "prompt": "Ingat arti dan pinyin dari “香蕉”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "pisang; xiāngjiāo",
    "exampleSentence": "妹妹吃香蕉。",
    "examplePinyin": "Mèimei chī xiāngjiāo.",
    "exampleMeaning": "Adik perempuan makan pisang.",
    "hint": "Petunjuk: kategori kata ini adalah fruit.",
    "usage": "Buah pisang."
  },
  {
    "id": "fruits-3",
    "title": "Fruits 3",
    "category": "Fruit",
    "hanzi": "橘子",
    "pinyin": "júzi",
    "meaning": "jeruk",
    "prompt": "Ingat arti dan pinyin dari “橘子”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "jeruk; júzi",
    "exampleSentence": "这个橘子很甜。",
    "examplePinyin": "Zhège júzi hěn tián.",
    "exampleMeaning": "Jeruk ini manis.",
    "hint": "Petunjuk: kategori kata ini adalah fruit.",
    "usage": "Jeruk mandarin atau buah jeruk umum."
  },
  {
    "id": "fruits-4",
    "title": "Fruits 4",
    "category": "Fruit",
    "hanzi": "西瓜",
    "pinyin": "xīguā",
    "meaning": "semangka",
    "prompt": "Ingat arti dan pinyin dari “西瓜”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "semangka; xīguā",
    "exampleSentence": "夏天我喜欢西瓜。",
    "examplePinyin": "Xiàtiān wǒ xǐhuan xīguā.",
    "exampleMeaning": "Saat musim panas saya suka semangka.",
    "hint": "Petunjuk: kategori kata ini adalah fruit.",
    "usage": "Buah semangka."
  }
];

export default function MandarinCihuiTopik9Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
