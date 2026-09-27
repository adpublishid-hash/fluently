import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-shopping-and-money",
  "title": "Cíhuì 15: Shopping and Money",
  "description": "Melatih kosakata belanja: uang, membeli, mahal, dan murah.",
  "topicNumber": 15,
  "focus": "Belanja praktis.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "shopping-and-money-1",
    "title": "Shopping and Money 1",
    "category": "Shopping",
    "hanzi": "钱",
    "pinyin": "qián",
    "meaning": "uang",
    "prompt": "Ingat arti dan pinyin dari “钱”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "uang; qián",
    "exampleSentence": "我有钱。",
    "examplePinyin": "Wǒ yǒu qián.",
    "exampleMeaning": "Saya punya uang.",
    "hint": "Petunjuk: kategori kata ini adalah shopping.",
    "usage": "Kata benda untuk uang."
  },
  {
    "id": "shopping-and-money-2",
    "title": "Shopping and Money 2",
    "category": "Shopping",
    "hanzi": "买",
    "pinyin": "mǎi",
    "meaning": "membeli",
    "prompt": "Ingat arti dan pinyin dari “买”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "membeli; mǎi",
    "exampleSentence": "我买苹果。",
    "examplePinyin": "Wǒ mǎi píngguǒ.",
    "exampleMeaning": "Saya membeli apel.",
    "hint": "Petunjuk: kategori kata ini adalah shopping.",
    "usage": "Kata kerja membeli."
  },
  {
    "id": "shopping-and-money-3",
    "title": "Shopping and Money 3",
    "category": "Shopping",
    "hanzi": "贵",
    "pinyin": "guì",
    "meaning": "mahal",
    "prompt": "Ingat arti dan pinyin dari “贵”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "mahal; guì",
    "exampleSentence": "这个很贵。",
    "examplePinyin": "Zhège hěn guì.",
    "exampleMeaning": "Ini mahal.",
    "hint": "Petunjuk: kategori kata ini adalah shopping.",
    "usage": "Menilai harga yang tinggi."
  },
  {
    "id": "shopping-and-money-4",
    "title": "Shopping and Money 4",
    "category": "Shopping",
    "hanzi": "便宜",
    "pinyin": "piányi",
    "meaning": "murah",
    "prompt": "Ingat arti dan pinyin dari “便宜”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "murah; piányi",
    "exampleSentence": "那本书很便宜。",
    "examplePinyin": "Nà běn shū hěn piányi.",
    "exampleMeaning": "Buku itu murah.",
    "hint": "Petunjuk: kategori kata ini adalah shopping.",
    "usage": "Menilai harga yang rendah."
  }
];

export default function MandarinCihuiTopik15Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
