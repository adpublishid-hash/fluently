import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-plural-pronoun-men",
  "title": "Yǔfǎ 10: Plural Pronoun 们",
  "description": "Melatih akhiran 们 untuk pronomina jamak seperti 我们 dan 你们.",
  "topicNumber": 10,
  "focus": "Pronomina + 们.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "plural-pronoun-men-1",
    "title": "Plural Pronoun 们 1",
    "pattern": "我 + 们",
    "hanzi": "我们是学生。",
    "pinyin": "wǒmen shì xuésheng.",
    "meaning": "Kami/kita pelajar.",
    "prompt": "Buat kalimat “kami pelajar”.",
    "answer": "我们是学生。",
    "modelSentence": "我们是学生。",
    "modelPinyin": "wǒmen shì xuésheng.",
    "modelMeaning": "Kami/kita pelajar.",
    "hint": "我们 berarti kami atau kita.",
    "explanation": "们 membuat pronomina menjadi jamak."
  },
  {
    "id": "plural-pronoun-men-2",
    "title": "Plural Pronoun 们 2",
    "pattern": "你 + 们",
    "hanzi": "你们好吗？",
    "pinyin": "nǐmen hǎo ma?",
    "meaning": "Apa kabar kalian?",
    "prompt": "Buat pertanyaan “apa kabar kalian?”.",
    "answer": "你们好吗？",
    "modelSentence": "你们好吗？",
    "modelPinyin": "nǐmen hǎo ma?",
    "modelMeaning": "Apa kabar kalian?",
    "hint": "你们 berarti kalian.",
    "explanation": "吗 tetap di akhir pertanyaan."
  },
  {
    "id": "plural-pronoun-men-3",
    "title": "Plural Pronoun 们 3",
    "pattern": "他 + 们",
    "hanzi": "他们是朋友。",
    "pinyin": "tāmen shì péngyǒu.",
    "meaning": "Mereka teman.",
    "prompt": "Buat kalimat “mereka teman”.",
    "answer": "他们是朋友。",
    "modelSentence": "他们是朋友。",
    "modelPinyin": "tāmen shì péngyǒu.",
    "modelMeaning": "Mereka teman.",
    "hint": "他们 untuk mereka laki-laki/campuran.",
    "explanation": "们 tidak dipakai setelah angka + benda."
  },
  {
    "id": "plural-pronoun-men-4",
    "title": "Plural Pronoun 们 4",
    "pattern": "她 + 们",
    "hanzi": "她们都很好。",
    "pinyin": "tāmen dōu hěn hǎo.",
    "meaning": "Mereka semua baik.",
    "prompt": "Buat kalimat “mereka semua baik” untuk perempuan.",
    "answer": "她们都很好。",
    "modelSentence": "她们都很好。",
    "modelPinyin": "tāmen dōu hěn hǎo.",
    "modelMeaning": "Mereka semua baik.",
    "hint": "都 berarti semua.",
    "explanation": "她们 dibaca sama seperti 他们."
  }
];

export default function MandarinYufaTopik10Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
