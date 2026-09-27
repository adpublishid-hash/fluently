import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-numbers-in-simple-sentences",
  "title": "Yǔfǎ 7: Numbers in Simple Sentences",
  "description": "Melatih angka dasar dalam kalimat pendek Mandarin.",
  "topicNumber": 7,
  "focus": "Angka + benda / informasi jumlah.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "numbers-in-simple-sentences-1",
    "title": "Numbers in Simple Sentences 1",
    "pattern": "我 + 有 + 三本书",
    "hanzi": "我有三本书。",
    "pinyin": "wǒ yǒu sān běn shū.",
    "meaning": "Saya punya tiga buku.",
    "prompt": "Buat kalimat “saya punya tiga buku”.",
    "answer": "我有三本书。",
    "modelSentence": "我有三本书。",
    "modelPinyin": "wǒ yǒu sān běn shū.",
    "modelMeaning": "Saya punya tiga buku.",
    "hint": "Buku memakai measure word 本.",
    "explanation": "Angka biasanya diikuti kata ukur sebelum benda."
  },
  {
    "id": "numbers-in-simple-sentences-2",
    "title": "Numbers in Simple Sentences 2",
    "pattern": "一 + 个 + 人",
    "hanzi": "这里有一个人。",
    "pinyin": "zhèlǐ yǒu yí ge rén.",
    "meaning": "Di sini ada satu orang.",
    "prompt": "Buat kalimat “di sini ada satu orang”.",
    "answer": "这里有一个人。",
    "modelSentence": "这里有一个人。",
    "modelPinyin": "zhèlǐ yǒu yí ge rén.",
    "modelMeaning": "Di sini ada satu orang.",
    "hint": "个 adalah kata ukur umum.",
    "explanation": "有 menyatakan keberadaan."
  },
  {
    "id": "numbers-in-simple-sentences-3",
    "title": "Numbers in Simple Sentences 3",
    "pattern": "今天 + 是 + 六月一号",
    "hanzi": "今天是六月一号。",
    "pinyin": "jīntiān shì liù yuè yī hào.",
    "meaning": "Hari ini tanggal 1 Juni.",
    "prompt": "Buat kalimat tanggal sederhana.",
    "answer": "今天是六月一号。",
    "modelSentence": "今天是六月一号。",
    "modelPinyin": "jīntiān shì liù yuè yī hào.",
    "modelMeaning": "Hari ini tanggal 1 Juni.",
    "hint": "Bulan + 月, tanggal + 号.",
    "explanation": "是 bisa menghubungkan hari dengan tanggal."
  },
  {
    "id": "numbers-in-simple-sentences-4",
    "title": "Numbers in Simple Sentences 4",
    "pattern": "我 + 要 + 两杯水",
    "hanzi": "我要两杯水。",
    "pinyin": "wǒ yào liǎng bēi shuǐ.",
    "meaning": "Saya mau dua gelas air.",
    "prompt": "Buat kalimat memesan dua gelas air.",
    "answer": "我要两杯水。",
    "modelSentence": "我要两杯水。",
    "modelPinyin": "wǒ yào liǎng bēi shuǐ.",
    "modelMeaning": "Saya mau dua gelas air.",
    "hint": "Gunakan 两 untuk jumlah dua sebelum kata ukur.",
    "explanation": "杯 adalah kata ukur untuk minuman/gelas."
  }
];

export default function MandarinYufaTopik7Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
