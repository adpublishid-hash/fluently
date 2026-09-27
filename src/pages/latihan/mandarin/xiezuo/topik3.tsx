import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-pronouns-in-writing",
  "title": "Xiězuò 3: Pronouns in Writing",
  "description": "Melatih menulis kata ganti orang dan membedakan bentuk Hanzi-nya.",
  "topicNumber": 3,
  "focus": "Kata ganti tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "pronouns-in-writing-1",
    "title": "Pronouns in Writing 1",
    "mode": "Word Copy",
    "hanzi": "我",
    "pinyin": "wǒ",
    "meaning": "saya",
    "prompt": "Tulis Hanzi untuk “saya”, lalu buat model pendek.",
    "targetPattern": "我 = saya",
    "modelAnswer": "我是学生。",
    "modelPinyin": "Wǒ shì xuésheng.",
    "modelMeaning": "Saya pelajar.",
    "hint": "Mulai kalimat dengan 我.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "pronouns-in-writing-2",
    "title": "Pronouns in Writing 2",
    "mode": "Word Copy",
    "hanzi": "你",
    "pinyin": "nǐ",
    "meaning": "kamu",
    "prompt": "Tulis Hanzi untuk “kamu” dan susun pertanyaan salam.",
    "targetPattern": "你 + 好 + 吗",
    "modelAnswer": "你好吗？",
    "modelPinyin": "Nǐ hǎo ma?",
    "modelMeaning": "Apa kabarmu?",
    "hint": "Pertanyaan ya/tidak dapat memakai 吗.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "pronouns-in-writing-3",
    "title": "Pronouns in Writing 3",
    "mode": "Word Contrast",
    "hanzi": "他",
    "pinyin": "tā",
    "meaning": "dia laki-laki",
    "prompt": "Tulis “dia laki-laki adalah guru”.",
    "targetPattern": "他 + 是 + 老师",
    "modelAnswer": "他是老师。",
    "modelPinyin": "Tā shì lǎoshī.",
    "modelMeaning": "Dia guru.",
    "hint": "他 untuk laki-laki.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "pronouns-in-writing-4",
    "title": "Pronouns in Writing 4",
    "mode": "Word Contrast",
    "hanzi": "她",
    "pinyin": "tā",
    "meaning": "dia perempuan",
    "prompt": "Tulis “dia perempuan adalah teman”.",
    "targetPattern": "她 + 是 + 朋友",
    "modelAnswer": "她是朋友。",
    "modelPinyin": "Tā shì péngyǒu.",
    "modelMeaning": "Dia teman.",
    "hint": "她 memakai komponen 女.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik3Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
