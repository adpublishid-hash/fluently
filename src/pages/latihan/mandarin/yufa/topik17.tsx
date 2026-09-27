import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-how-many-with-ji",
  "title": "Yǔfǎ 17: How Many with 几",
  "description": "Melatih 几 untuk menanyakan jumlah kecil atau angka yang diketahui terbatas.",
  "topicNumber": 17,
  "focus": "几 + kata ukur + benda.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "how-many-with-ji-1",
    "title": "How Many with 几 1",
    "pattern": "几 + 个 + 人",
    "hanzi": "你家有几个人？",
    "pinyin": "nǐ jiā yǒu jǐ ge rén?",
    "meaning": "Keluargamu ada berapa orang?",
    "prompt": "Buat pertanyaan jumlah anggota keluarga.",
    "answer": "你家有几个人？",
    "modelSentence": "你家有几个人？",
    "modelPinyin": "nǐ jiā yǒu jǐ ge rén?",
    "modelMeaning": "Keluargamu ada berapa orang?",
    "hint": "几 harus diikuti kata ukur sebelum benda.",
    "explanation": "个人 berarti orang dalam hitungan umum."
  },
  {
    "id": "how-many-with-ji-2",
    "title": "How Many with 几 2",
    "pattern": "几 + 本 + 书",
    "hanzi": "你有几本书？",
    "pinyin": "nǐ yǒu jǐ běn shū?",
    "meaning": "Kamu punya berapa buku?",
    "prompt": "Buat pertanyaan “kamu punya berapa buku?”.",
    "answer": "你有几本书？",
    "modelSentence": "你有几本书？",
    "modelPinyin": "nǐ yǒu jǐ běn shū?",
    "modelMeaning": "Kamu punya berapa buku?",
    "hint": "Buku memakai 本.",
    "explanation": "Urutan: 几 + 本 + 书."
  },
  {
    "id": "how-many-with-ji-3",
    "title": "How Many with 几 3",
    "pattern": "几 + 点",
    "hanzi": "现在几点？",
    "pinyin": "xiànzài jǐ diǎn?",
    "meaning": "Sekarang jam berapa?",
    "prompt": "Buat pertanyaan waktu “sekarang jam berapa?”.",
    "answer": "现在几点？",
    "modelSentence": "现在几点？",
    "modelPinyin": "xiànzài jǐ diǎn?",
    "modelMeaning": "Sekarang jam berapa?",
    "hint": "几点 adalah frasa untuk jam berapa.",
    "explanation": "现在 berarti sekarang."
  },
  {
    "id": "how-many-with-ji-4",
    "title": "How Many with 几 4",
    "pattern": "几 + 岁",
    "hanzi": "你几岁？",
    "pinyin": "nǐ jǐ suì?",
    "meaning": "Kamu umur berapa?",
    "prompt": "Buat pertanyaan umur sederhana.",
    "answer": "你几岁？",
    "modelSentence": "你几岁？",
    "modelPinyin": "nǐ jǐ suì?",
    "modelMeaning": "Kamu umur berapa?",
    "hint": "几岁 dipakai untuk umur, terutama anak/muda.",
    "explanation": "Tidak perlu 是 dalam pola ini."
  }
];

export default function MandarinYufaTopik17Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
