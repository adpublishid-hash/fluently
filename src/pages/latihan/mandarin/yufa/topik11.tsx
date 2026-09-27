import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-have-there-is-with-you",
  "title": "Yǔfǎ 11: Have/There Is with 有",
  "description": "Melatih 有 untuk kepemilikan dan keberadaan.",
  "topicNumber": 11,
  "focus": "Subjek/tempat + 有 + benda.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "have-there-is-with-you-1",
    "title": "Have/There Is with 有 1",
    "pattern": "我 + 有 + 书",
    "hanzi": "我有一本书。",
    "pinyin": "wǒ yǒu yì běn shū.",
    "meaning": "Saya punya sebuah buku.",
    "prompt": "Buat kalimat “saya punya sebuah buku”.",
    "answer": "我有一本书。",
    "modelSentence": "我有一本书。",
    "modelPinyin": "wǒ yǒu yì běn shū.",
    "modelMeaning": "Saya punya sebuah buku.",
    "hint": "有 berarti punya/ada.",
    "explanation": "Buku memakai kata ukur 本."
  },
  {
    "id": "have-there-is-with-you-2",
    "title": "Have/There Is with 有 2",
    "pattern": "这里 + 有 + 人",
    "hanzi": "这里有人。",
    "pinyin": "zhèlǐ yǒu rén.",
    "meaning": "Di sini ada orang.",
    "prompt": "Buat kalimat “di sini ada orang”.",
    "answer": "这里有人。",
    "modelSentence": "这里有人。",
    "modelPinyin": "zhèlǐ yǒu rén.",
    "modelMeaning": "Di sini ada orang.",
    "hint": "Tempat bisa menjadi subjek keberadaan.",
    "explanation": "有 tidak perlu 是."
  },
  {
    "id": "have-there-is-with-you-3",
    "title": "Have/There Is with 有 3",
    "pattern": "你 + 有 + 手机 + 吗",
    "hanzi": "你有手机吗？",
    "pinyin": "nǐ yǒu shǒujī ma?",
    "meaning": "Apakah kamu punya ponsel?",
    "prompt": "Buat pertanyaan “apakah kamu punya ponsel?”.",
    "answer": "你有手机吗？",
    "modelSentence": "你有手机吗？",
    "modelPinyin": "nǐ yǒu shǒujī ma?",
    "modelMeaning": "Apakah kamu punya ponsel?",
    "hint": "Tambahkan 吗 untuk pertanyaan ya/tidak.",
    "explanation": "有 tetap sebelum benda yang dimiliki."
  },
  {
    "id": "have-there-is-with-you-4",
    "title": "Have/There Is with 有 4",
    "pattern": "我 + 没有 + 钱",
    "hanzi": "我没有钱。",
    "pinyin": "wǒ méiyǒu qián.",
    "meaning": "Saya tidak punya uang.",
    "prompt": "Buat kalimat negatif “saya tidak punya uang”.",
    "answer": "我没有钱。",
    "modelSentence": "我没有钱。",
    "modelPinyin": "wǒ méiyǒu qián.",
    "modelMeaning": "Saya tidak punya uang.",
    "hint": "Negasi 有 memakai 没有, bukan 不有.",
    "explanation": "没有 berarti tidak punya/tidak ada."
  }
];

export default function MandarinYufaTopik11Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
