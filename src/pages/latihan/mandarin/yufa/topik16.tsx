import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-question-words-shei-shenme",
  "title": "Yǔfǎ 16: Question Words 谁 and 什么",
  "description": "Melatih kata tanya 谁 untuk siapa dan 什么 untuk apa.",
  "topicNumber": 16,
  "focus": "Kata tanya tetap di posisi jawabannya.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "question-words-shei-shenme-1",
    "title": "Question Words 谁 and 什么 1",
    "pattern": "谁 + 是 + 老师",
    "hanzi": "谁是老师？",
    "pinyin": "shéi shì lǎoshī?",
    "meaning": "Siapa gurunya?",
    "prompt": "Buat pertanyaan “siapa gurunya?”.",
    "answer": "谁是老师？",
    "modelSentence": "谁是老师？",
    "modelPinyin": "shéi shì lǎoshī?",
    "modelMeaning": "Siapa gurunya?",
    "hint": "谁 menggantikan orang yang ditanyakan.",
    "explanation": "Jika subjek tidak diketahui, 谁 bisa di awal."
  },
  {
    "id": "question-words-shei-shenme-2",
    "title": "Question Words 谁 and 什么 2",
    "pattern": "你 + 是 + 谁",
    "hanzi": "你是谁？",
    "pinyin": "nǐ shì shéi?",
    "meaning": "Kamu siapa?",
    "prompt": "Buat pertanyaan “kamu siapa?”.",
    "answer": "你是谁？",
    "modelSentence": "你是谁？",
    "modelPinyin": "nǐ shì shéi?",
    "modelMeaning": "Kamu siapa?",
    "hint": "谁 berada setelah 是 sebagai identitas.",
    "explanation": "Urutan tetap seperti jawaban: 你是..."
  },
  {
    "id": "question-words-shei-shenme-3",
    "title": "Question Words 谁 and 什么 3",
    "pattern": "这 + 是 + 什么",
    "hanzi": "这是什么？",
    "pinyin": "zhè shì shénme?",
    "meaning": "Ini apa?",
    "prompt": "Buat pertanyaan “ini apa?”.",
    "answer": "这是什么？",
    "modelSentence": "这是什么？",
    "modelPinyin": "zhè shì shénme?",
    "modelMeaning": "Ini apa?",
    "hint": "什么 menggantikan benda yang tidak diketahui.",
    "explanation": "Tidak perlu menambah 吗."
  },
  {
    "id": "question-words-shei-shenme-4",
    "title": "Question Words 谁 and 什么 4",
    "pattern": "你 + 喜欢 + 什么",
    "hanzi": "你喜欢什么？",
    "pinyin": "nǐ xǐhuan shénme?",
    "meaning": "Kamu suka apa?",
    "prompt": "Buat pertanyaan objek dengan 什么.",
    "answer": "你喜欢什么？",
    "modelSentence": "你喜欢什么？",
    "modelPinyin": "nǐ xǐhuan shénme?",
    "modelMeaning": "Kamu suka apa?",
    "hint": "什么 tetap setelah kata kerja.",
    "explanation": "Jangan menaruh 什么 di awal."
  }
];

export default function MandarinYufaTopik16Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
