import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-pronouns-and-people",
  "title": "Cíhuì 2: Pronouns and People",
  "description": "Melatih kata ganti orang paling awal dalam kalimat Mandarin.",
  "topicNumber": 2,
  "focus": "Kata ganti orang.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "pronouns-and-people-1",
    "title": "Pronouns and People 1",
    "category": "Pronoun",
    "hanzi": "我",
    "pinyin": "wǒ",
    "meaning": "saya",
    "prompt": "Ingat arti dan pinyin dari “我”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "saya; wǒ",
    "exampleSentence": "我是老师。",
    "examplePinyin": "Wǒ shì lǎoshī.",
    "exampleMeaning": "Saya guru.",
    "hint": "Petunjuk: kategori kata ini adalah pronoun.",
    "usage": "Subjek orang pertama tunggal."
  },
  {
    "id": "pronouns-and-people-2",
    "title": "Pronouns and People 2",
    "category": "Pronoun",
    "hanzi": "你",
    "pinyin": "nǐ",
    "meaning": "kamu",
    "prompt": "Ingat arti dan pinyin dari “你”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kamu; nǐ",
    "exampleSentence": "你好吗？",
    "examplePinyin": "Nǐ hǎo ma?",
    "exampleMeaning": "Apa kabarmu?",
    "hint": "Petunjuk: kategori kata ini adalah pronoun.",
    "usage": "Subjek atau objek orang kedua tunggal."
  },
  {
    "id": "pronouns-and-people-3",
    "title": "Pronouns and People 3",
    "category": "Pronoun",
    "hanzi": "他",
    "pinyin": "tā",
    "meaning": "dia laki-laki",
    "prompt": "Ingat arti dan pinyin dari “他”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "dia laki-laki; tā",
    "exampleSentence": "他是医生。",
    "examplePinyin": "Tā shì yīshēng.",
    "exampleMeaning": "Dia dokter.",
    "hint": "Petunjuk: kategori kata ini adalah pronoun.",
    "usage": "Dipakai untuk laki-laki, bunyinya sama dengan 她."
  },
  {
    "id": "pronouns-and-people-4",
    "title": "Pronouns and People 4",
    "category": "Pronoun",
    "hanzi": "她",
    "pinyin": "tā",
    "meaning": "dia perempuan",
    "prompt": "Ingat arti dan pinyin dari “她”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "dia perempuan; tā",
    "exampleSentence": "她是学生。",
    "examplePinyin": "Tā shì xuésheng.",
    "exampleMeaning": "Dia pelajar.",
    "hint": "Petunjuk: kategori kata ini adalah pronoun.",
    "usage": "Dipakai untuk perempuan, bunyinya sama dengan 他."
  }
];

export default function MandarinCihuiTopik2Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
