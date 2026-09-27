import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-like-with-xihuan",
  "title": "Yǔfǎ 13: Like with 喜欢",
  "description": "Melatih 喜欢 untuk menyatakan suka terhadap benda atau aktivitas.",
  "topicNumber": 13,
  "focus": "Subjek + 喜欢 + objek/kegiatan.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "like-with-xihuan-1",
    "title": "Like with 喜欢 1",
    "pattern": "我 + 喜欢 + 茶",
    "hanzi": "我喜欢茶。",
    "pinyin": "wǒ xǐhuan chá.",
    "meaning": "Saya suka teh.",
    "prompt": "Buat kalimat “saya suka teh”.",
    "answer": "我喜欢茶。",
    "modelSentence": "我喜欢茶。",
    "modelPinyin": "wǒ xǐhuan chá.",
    "modelMeaning": "Saya suka teh.",
    "hint": "喜欢 langsung diikuti objek.",
    "explanation": "Tidak perlu 是 sebelum 喜欢."
  },
  {
    "id": "like-with-xihuan-2",
    "title": "Like with 喜欢 2",
    "pattern": "你 + 喜欢 + 什么",
    "hanzi": "你喜欢什么？",
    "pinyin": "nǐ xǐhuan shénme?",
    "meaning": "Kamu suka apa?",
    "prompt": "Buat pertanyaan “kamu suka apa?”.",
    "answer": "你喜欢什么？",
    "modelSentence": "你喜欢什么？",
    "modelPinyin": "nǐ xǐhuan shénme?",
    "modelMeaning": "Kamu suka apa?",
    "hint": "什么 berada di posisi objek.",
    "explanation": "Kata tanya tidak harus di awal."
  },
  {
    "id": "like-with-xihuan-3",
    "title": "Like with 喜欢 3",
    "pattern": "他 + 不 + 喜欢 + 咖啡",
    "hanzi": "他不喜欢咖啡。",
    "pinyin": "tā bù xǐhuan kāfēi.",
    "meaning": "Dia tidak suka kopi.",
    "prompt": "Buat kalimat negatif “dia tidak suka kopi”.",
    "answer": "他不喜欢咖啡。",
    "modelSentence": "他不喜欢咖啡。",
    "modelPinyin": "tā bù xǐhuan kāfēi.",
    "modelMeaning": "Dia tidak suka kopi.",
    "hint": "Letakkan 不 sebelum 喜欢.",
    "explanation": "Objek tetap setelah 喜欢."
  },
  {
    "id": "like-with-xihuan-4",
    "title": "Like with 喜欢 4",
    "pattern": "她 + 喜欢 + 学中文",
    "hanzi": "她喜欢学中文。",
    "pinyin": "tā xǐhuan xué Zhōngwén.",
    "meaning": "Dia suka belajar Mandarin.",
    "prompt": "Buat kalimat “dia suka belajar Mandarin”.",
    "answer": "她喜欢学中文。",
    "modelSentence": "她喜欢学中文。",
    "modelPinyin": "tā xǐhuan xué Zhōngwén.",
    "modelMeaning": "Dia suka belajar Mandarin.",
    "hint": "Aktivitas bisa menjadi objek 喜欢.",
    "explanation": "学中文 berarti belajar bahasa Mandarin."
  }
];

export default function MandarinYufaTopik13Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
