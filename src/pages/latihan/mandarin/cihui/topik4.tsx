import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-numbers-zero-to-ten",
  "title": "Cíhuì 4: Numbers Zero to Ten",
  "description": "Melatih angka dasar yang sering dipakai untuk umur, jumlah, dan harga.",
  "topicNumber": 4,
  "focus": "Angka dasar Mandarin.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "numbers-zero-to-ten-1",
    "title": "Numbers Zero to Ten 1",
    "category": "Number",
    "hanzi": "一",
    "pinyin": "yī",
    "meaning": "satu",
    "prompt": "Ingat arti dan pinyin dari “一”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "satu; yī",
    "exampleSentence": "我有一本书。",
    "examplePinyin": "Wǒ yǒu yī běn shū.",
    "exampleMeaning": "Saya punya satu buku.",
    "hint": "Petunjuk: kategori kata ini adalah number.",
    "usage": "Angka satu, sering berubah nada dalam frasa tertentu."
  },
  {
    "id": "numbers-zero-to-ten-2",
    "title": "Numbers Zero to Ten 2",
    "category": "Number",
    "hanzi": "二",
    "pinyin": "èr",
    "meaning": "dua",
    "prompt": "Ingat arti dan pinyin dari “二”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "dua; èr",
    "exampleSentence": "我有二十块钱。",
    "examplePinyin": "Wǒ yǒu èrshí kuài qián.",
    "exampleMeaning": "Saya punya dua puluh yuan.",
    "hint": "Petunjuk: kategori kata ini adalah number.",
    "usage": "Dipakai untuk angka dua dalam hitungan dan nomor."
  },
  {
    "id": "numbers-zero-to-ten-3",
    "title": "Numbers Zero to Ten 3",
    "category": "Number",
    "hanzi": "三",
    "pinyin": "sān",
    "meaning": "tiga",
    "prompt": "Ingat arti dan pinyin dari “三”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "tiga; sān",
    "exampleSentence": "他有三个朋友。",
    "examplePinyin": "Tā yǒu sān ge péngyǒu.",
    "exampleMeaning": "Dia punya tiga teman.",
    "hint": "Petunjuk: kategori kata ini adalah number.",
    "usage": "Angka tiga, diikuti kata ukur saat menghitung benda."
  },
  {
    "id": "numbers-zero-to-ten-4",
    "title": "Numbers Zero to Ten 4",
    "category": "Number",
    "hanzi": "十",
    "pinyin": "shí",
    "meaning": "sepuluh",
    "prompt": "Ingat arti dan pinyin dari “十”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "sepuluh; shí",
    "exampleSentence": "现在十点。",
    "examplePinyin": "Xiànzài shí diǎn.",
    "exampleMeaning": "Sekarang jam sepuluh.",
    "hint": "Petunjuk: kategori kata ini adalah number.",
    "usage": "Angka sepuluh dan pembentuk belasan atau puluhan."
  }
];

export default function MandarinCihuiTopik4Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
