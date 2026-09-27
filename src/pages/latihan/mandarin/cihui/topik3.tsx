import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-family-members",
  "title": "Cíhuì 3: Family Members",
  "description": "Melatih kosakata keluarga inti dan saudara kandung dasar.",
  "topicNumber": 3,
  "focus": "Keluarga dan relasi.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "family-members-1",
    "title": "Family Members 1",
    "category": "Family",
    "hanzi": "妈妈",
    "pinyin": "māma",
    "meaning": "ibu",
    "prompt": "Ingat arti dan pinyin dari “妈妈”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "ibu; māma",
    "exampleSentence": "我妈妈很好。",
    "examplePinyin": "Wǒ māma hěn hǎo.",
    "exampleMeaning": "Ibu saya baik.",
    "hint": "Petunjuk: kategori kata ini adalah family.",
    "usage": "Panggilan informal dan umum untuk ibu."
  },
  {
    "id": "family-members-2",
    "title": "Family Members 2",
    "category": "Family",
    "hanzi": "爸爸",
    "pinyin": "bàba",
    "meaning": "ayah",
    "prompt": "Ingat arti dan pinyin dari “爸爸”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "ayah; bàba",
    "exampleSentence": "我爸爸在家。",
    "examplePinyin": "Wǒ bàba zài jiā.",
    "exampleMeaning": "Ayah saya ada di rumah.",
    "hint": "Petunjuk: kategori kata ini adalah family.",
    "usage": "Panggilan informal dan umum untuk ayah."
  },
  {
    "id": "family-members-3",
    "title": "Family Members 3",
    "category": "Family",
    "hanzi": "哥哥",
    "pinyin": "gēge",
    "meaning": "kakak laki-laki",
    "prompt": "Ingat arti dan pinyin dari “哥哥”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kakak laki-laki; gēge",
    "exampleSentence": "他是我哥哥。",
    "examplePinyin": "Tā shì wǒ gēge.",
    "exampleMeaning": "Dia kakak laki-laki saya.",
    "hint": "Petunjuk: kategori kata ini adalah family.",
    "usage": "Dipakai untuk kakak laki-laki kandung atau sapaan akrab."
  },
  {
    "id": "family-members-4",
    "title": "Family Members 4",
    "category": "Family",
    "hanzi": "妹妹",
    "pinyin": "mèimei",
    "meaning": "adik perempuan",
    "prompt": "Ingat arti dan pinyin dari “妹妹”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "adik perempuan; mèimei",
    "exampleSentence": "我妹妹喜欢茶。",
    "examplePinyin": "Wǒ mèimei xǐhuan chá.",
    "exampleMeaning": "Adik perempuan saya suka teh.",
    "hint": "Petunjuk: kategori kata ini adalah family.",
    "usage": "Dipakai untuk adik perempuan."
  }
];

export default function MandarinCihuiTopik3Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
