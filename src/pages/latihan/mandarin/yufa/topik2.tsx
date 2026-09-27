import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-yes-no-questions-with-ma",
  "title": "Yǔfǎ 2: Yes/No Questions with 吗",
  "description": "Melatih pertanyaan ya/tidak dengan partikel 吗 di akhir kalimat.",
  "topicNumber": 2,
  "focus": "Kalimat pernyataan + 吗?",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "yes-no-questions-with-ma-1",
    "title": "Yes/No Questions with 吗 1",
    "pattern": "你是学生 + 吗",
    "hanzi": "你是学生吗？",
    "pinyin": "nǐ shì xuésheng ma?",
    "meaning": "Apakah kamu pelajar?",
    "prompt": "Ubah pernyataan “你是学生” menjadi pertanyaan ya/tidak.",
    "answer": "你是学生吗？",
    "modelSentence": "你是学生吗？",
    "modelPinyin": "nǐ shì xuésheng ma?",
    "modelMeaning": "Apakah kamu pelajar?",
    "hint": "Tambahkan 吗 di akhir, jangan ubah urutan kata.",
    "explanation": "吗 mengubah kalimat pernyataan menjadi pertanyaan ya/tidak."
  },
  {
    "id": "yes-no-questions-with-ma-2",
    "title": "Yes/No Questions with 吗 2",
    "pattern": "他是老师 + 吗",
    "hanzi": "他是老师吗？",
    "pinyin": "tā shì lǎoshī ma?",
    "meaning": "Apakah dia guru?",
    "prompt": "Buat pertanyaan “apakah dia guru?”.",
    "answer": "他是老师吗？",
    "modelSentence": "他是老师吗？",
    "modelPinyin": "tā shì lǎoshī ma?",
    "modelMeaning": "Apakah dia guru?",
    "hint": "Partikel tanya berada paling akhir.",
    "explanation": "Tidak perlu membalik subjek dan predikat."
  },
  {
    "id": "yes-no-questions-with-ma-3",
    "title": "Yes/No Questions with 吗 3",
    "pattern": "你好吗",
    "hanzi": "你好吗？",
    "pinyin": "nǐ hǎo ma?",
    "meaning": "Apa kabar?",
    "prompt": "Tulis pertanyaan salam dengan 吗.",
    "answer": "你好吗？",
    "modelSentence": "你好吗？",
    "modelPinyin": "nǐ hǎo ma?",
    "modelMeaning": "Apa kabar?",
    "hint": "好 menjadi predikat, 吗 membuatnya pertanyaan.",
    "explanation": "Ini frasa tetap untuk menanyakan kabar."
  },
  {
    "id": "yes-no-questions-with-ma-4",
    "title": "Yes/No Questions with 吗 4",
    "pattern": "这是书 + 吗",
    "hanzi": "这是书吗？",
    "pinyin": "zhè shì shū ma?",
    "meaning": "Apakah ini buku?",
    "prompt": "Buat pertanyaan “apakah ini buku?”.",
    "answer": "这是书吗？",
    "modelSentence": "这是书吗？",
    "modelPinyin": "zhè shì shū ma?",
    "modelMeaning": "Apakah ini buku?",
    "hint": "这是 artinya “ini adalah”.",
    "explanation": "吗 selalu setelah seluruh kalimat."
  }
];

export default function MandarinYufaTopik2Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
