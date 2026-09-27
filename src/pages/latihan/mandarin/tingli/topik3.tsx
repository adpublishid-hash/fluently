import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-numbers-and-age",
  "title": "Tīnglì 3: Numbers and Age",
  "description": "Melatih angka dasar, umur, dan jumlah orang dari audio pendek.",
  "topicNumber": 3,
  "focus": "Angka, umur, dan jumlah.",
  "goal": "Dengarkan angka yang muncul, tulis informasi jumlahnya, lalu cek transcript."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "numbers-and-age-1",
    "title": "Numbers and Age 1",
    "focus": "Number",
    "audioHanzi": "我有三本书。",
    "audioPinyin": "Wǒ yǒu sān běn shū.",
    "audioMeaning": "Saya punya tiga buku.",
    "question": "Berapa buku yang dimiliki pembicara?",
    "answer": "三本 / tiga buku",
    "hint": "Dengarkan angka sebelum 本书.",
    "keywords": [
      "三",
      "本",
      "书"
    ],
    "explanation": "三 berarti tiga, jadi jumlah bukunya tiga."
  },
  {
    "id": "numbers-and-age-2",
    "title": "Numbers and Age 2",
    "focus": "Age",
    "audioHanzi": "他今年十岁。",
    "audioPinyin": "Tā jīnnián shí suì.",
    "audioMeaning": "Dia tahun ini berumur sepuluh tahun.",
    "question": "Berapa umur dia?",
    "answer": "十岁 / sepuluh tahun",
    "hint": "Dengarkan angka sebelum 岁.",
    "keywords": [
      "今年",
      "十",
      "岁"
    ],
    "explanation": "十岁 berarti berumur sepuluh tahun."
  },
  {
    "id": "numbers-and-age-3",
    "title": "Numbers and Age 3",
    "focus": "Quantity",
    "audioHanzi": "我们班有八个学生。",
    "audioPinyin": "Wǒmen bān yǒu bā gè xuésheng.",
    "audioMeaning": "Kelas kami punya delapan siswa.",
    "question": "Berapa siswa di kelas?",
    "answer": "八个学生 / delapan siswa",
    "hint": "Dengarkan angka sebelum 个学生.",
    "keywords": [
      "八",
      "个",
      "学生"
    ],
    "explanation": "八个学生 berarti delapan siswa."
  },
  {
    "id": "numbers-and-age-4",
    "title": "Numbers and Age 4",
    "focus": "Phone Number",
    "audioHanzi": "我的电话是一二三四。",
    "audioPinyin": "Wǒ de diànhuà shì yī èr sān sì.",
    "audioMeaning": "Nomor telepon saya adalah satu dua tiga empat.",
    "question": "Angka apa saja yang disebut?",
    "answer": "一二三四 / 1234",
    "hint": "Dengarkan deretan angka setelah 是.",
    "keywords": [
      "电话",
      "一",
      "二",
      "三",
      "四"
    ],
    "explanation": "Pembicara menyebut nomor 一二三四."
  }
];

export default function MandarinTingliTopik3Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
