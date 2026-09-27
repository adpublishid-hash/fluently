import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-question-words",
  "title": "Cíhuì 19: Question Words",
  "description": "Melatih kata tanya inti agar cepat mengenali maksud pertanyaan.",
  "topicNumber": 19,
  "focus": "Kata tanya.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "question-words-1",
    "title": "Question Words 1",
    "category": "Question word",
    "hanzi": "什么",
    "pinyin": "shénme",
    "meaning": "apa",
    "prompt": "Ingat arti dan pinyin dari “什么”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "apa; shénme",
    "exampleSentence": "这是什么？",
    "examplePinyin": "Zhè shì shénme?",
    "exampleMeaning": "Ini apa?",
    "hint": "Petunjuk: kategori kata ini adalah question word.",
    "usage": "Menanyakan benda, hal, atau informasi."
  },
  {
    "id": "question-words-2",
    "title": "Question Words 2",
    "category": "Question word",
    "hanzi": "谁",
    "pinyin": "shéi",
    "meaning": "siapa",
    "prompt": "Ingat arti dan pinyin dari “谁”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "siapa; shéi",
    "exampleSentence": "她是谁？",
    "examplePinyin": "Tā shì shéi?",
    "exampleMeaning": "Dia siapa?",
    "hint": "Petunjuk: kategori kata ini adalah question word.",
    "usage": "Menanyakan orang."
  },
  {
    "id": "question-words-3",
    "title": "Question Words 3",
    "category": "Question word",
    "hanzi": "哪儿",
    "pinyin": "nǎr",
    "meaning": "di mana",
    "prompt": "Ingat arti dan pinyin dari “哪儿”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "di mana; nǎr",
    "exampleSentence": "你去哪儿？",
    "examplePinyin": "Nǐ qù nǎr?",
    "exampleMeaning": "Kamu pergi ke mana?",
    "hint": "Petunjuk: kategori kata ini adalah question word.",
    "usage": "Menanyakan tempat atau arah tujuan."
  },
  {
    "id": "question-words-4",
    "title": "Question Words 4",
    "category": "Question word",
    "hanzi": "几",
    "pinyin": "jǐ",
    "meaning": "berapa",
    "prompt": "Ingat arti dan pinyin dari “几”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "berapa; jǐ",
    "exampleSentence": "你几岁？",
    "examplePinyin": "Nǐ jǐ suì?",
    "exampleMeaning": "Kamu umur berapa?",
    "hint": "Petunjuk: kategori kata ini adalah question word.",
    "usage": "Menanyakan angka kecil atau jumlah yang diperkirakan sedikit."
  }
];

export default function MandarinCihuiTopik19Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
