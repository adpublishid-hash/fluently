import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-question-sentences",
  "title": "Xiězuò 13: Question Sentences",
  "description": "Melatih menulis pertanyaan pendek dengan 什么, 谁, 哪儿, dan 几.",
  "topicNumber": 13,
  "focus": "Pertanyaan tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "question-sentences-1",
    "title": "Question Sentences 1",
    "mode": "Question Build",
    "hanzi": "这是什么？",
    "pinyin": "zhè shì shénme?",
    "meaning": "Ini apa?",
    "prompt": "Tulis “Ini apa?”",
    "targetPattern": "这 + 是 + 什么",
    "modelAnswer": "这是什么？",
    "modelPinyin": "Zhè shì shénme?",
    "modelMeaning": "Ini apa?",
    "hint": "什么 berada di posisi informasi yang ditanya.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "question-sentences-2",
    "title": "Question Sentences 2",
    "mode": "Question Build",
    "hanzi": "她是谁？",
    "pinyin": "tā shì shéi?",
    "meaning": "Dia siapa?",
    "prompt": "Tulis “Dia siapa?” dengan subjek perempuan.",
    "targetPattern": "她 + 是 + 谁",
    "modelAnswer": "她是谁？",
    "modelPinyin": "Tā shì shéi?",
    "modelMeaning": "Dia siapa?",
    "hint": "谁 berarti siapa.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "question-sentences-3",
    "title": "Question Sentences 3",
    "mode": "Question Build",
    "hanzi": "你去哪儿？",
    "pinyin": "nǐ qù nǎr?",
    "meaning": "Kamu pergi ke mana?",
    "prompt": "Tulis “Kamu pergi ke mana?”",
    "targetPattern": "你 + 去 + 哪儿",
    "modelAnswer": "你去哪儿？",
    "modelPinyin": "Nǐ qù nǎr?",
    "modelMeaning": "Kamu pergi ke mana?",
    "hint": "哪儿 menanyakan tempat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "question-sentences-4",
    "title": "Question Sentences 4",
    "mode": "Question Build",
    "hanzi": "你几岁？",
    "pinyin": "nǐ jǐ suì?",
    "meaning": "Kamu umur berapa?",
    "prompt": "Tulis “Kamu umur berapa?”",
    "targetPattern": "你 + 几 + 岁",
    "modelAnswer": "你几岁？",
    "modelPinyin": "Nǐ jǐ suì?",
    "modelMeaning": "Kamu umur berapa?",
    "hint": "几 dipakai untuk angka kecil.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik13Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
