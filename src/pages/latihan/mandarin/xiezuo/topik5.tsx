import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-family-sentences",
  "title": "Xiězuò 5: Family Sentences",
  "description": "Melatih kalimat pendek tentang keluarga dengan 的 dan kata sifat.",
  "topicNumber": 5,
  "focus": "Keluarga tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "family-sentences-1",
    "title": "Family Sentences 1",
    "mode": "Sentence Build",
    "hanzi": "这是我妈妈。",
    "pinyin": "zhè shì wǒ māma.",
    "meaning": "Ini ibu saya.",
    "prompt": "Tulis “Ini ibu saya”.",
    "targetPattern": "这 + 是 + 我 + 妈妈",
    "modelAnswer": "这是我妈妈。",
    "modelPinyin": "Zhè shì wǒ māma.",
    "modelMeaning": "Ini ibu saya.",
    "hint": "这 berarti ini.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "family-sentences-2",
    "title": "Family Sentences 2",
    "mode": "Sentence Build",
    "hanzi": "我爸爸很好。",
    "pinyin": "wǒ bàba hěn hǎo.",
    "meaning": "Ayah saya baik.",
    "prompt": "Tulis “Ayah saya baik”.",
    "targetPattern": "我爸爸 + 很 + 好",
    "modelAnswer": "我爸爸很好。",
    "modelPinyin": "Wǒ bàba hěn hǎo.",
    "modelMeaning": "Ayah saya baik.",
    "hint": "Adjektiva sering didahului 很.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "family-sentences-3",
    "title": "Family Sentences 3",
    "mode": "Sentence Build",
    "hanzi": "他是我哥哥。",
    "pinyin": "tā shì wǒ gēge.",
    "meaning": "Dia kakak laki-laki saya.",
    "prompt": "Tulis “Dia kakak laki-laki saya”.",
    "targetPattern": "他 + 是 + 我 + 哥哥",
    "modelAnswer": "他是我哥哥。",
    "modelPinyin": "Tā shì wǒ gēge.",
    "modelMeaning": "Dia kakak laki-laki saya.",
    "hint": "哥哥 berarti kakak laki-laki.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "family-sentences-4",
    "title": "Family Sentences 4",
    "mode": "Sentence Build",
    "hanzi": "我妹妹喜欢茶。",
    "pinyin": "wǒ mèimei xǐhuan chá.",
    "meaning": "Adik perempuan saya suka teh.",
    "prompt": "Tulis “Adik perempuan saya suka teh”.",
    "targetPattern": "我妹妹 + 喜欢 + 茶",
    "modelAnswer": "我妹妹喜欢茶。",
    "modelPinyin": "Wǒ mèimei xǐhuan chá.",
    "modelMeaning": "Adik perempuan saya suka teh.",
    "hint": "喜欢 berarti suka.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik5Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
