import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-likes-and-wants",
  "title": "Xiězuò 10: Likes and Wants",
  "description": "Melatih kalimat dengan 喜欢 dan 想 untuk minat serta keinginan.",
  "topicNumber": 10,
  "focus": "Ekspresi suka dan ingin.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "likes-and-wants-1",
    "title": "Likes and Wants 1",
    "mode": "Sentence Build",
    "hanzi": "我喜欢茶。",
    "pinyin": "wǒ xǐhuan chá.",
    "meaning": "Saya suka teh.",
    "prompt": "Tulis “Saya suka teh”.",
    "targetPattern": "我 + 喜欢 + 茶",
    "modelAnswer": "我喜欢茶。",
    "modelPinyin": "Wǒ xǐhuan chá.",
    "modelMeaning": "Saya suka teh.",
    "hint": "喜欢 langsung diikuti objek.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "likes-and-wants-2",
    "title": "Likes and Wants 2",
    "mode": "Sentence Build",
    "hanzi": "他喜欢运动。",
    "pinyin": "tā xǐhuan yùndòng.",
    "meaning": "Dia suka olahraga.",
    "prompt": "Tulis “Dia suka olahraga”.",
    "targetPattern": "他 + 喜欢 + 运动",
    "modelAnswer": "他喜欢运动。",
    "modelPinyin": "Tā xǐhuan yùndòng.",
    "modelMeaning": "Dia suka olahraga.",
    "hint": "运动 berarti olahraga.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "likes-and-wants-3",
    "title": "Likes and Wants 3",
    "mode": "Sentence Build",
    "hanzi": "我想喝水。",
    "pinyin": "wǒ xiǎng hē shuǐ.",
    "meaning": "Saya ingin minum air.",
    "prompt": "Tulis “Saya ingin minum air”.",
    "targetPattern": "我 + 想 + 喝 + 水",
    "modelAnswer": "我想喝水。",
    "modelPinyin": "Wǒ xiǎng hē shuǐ.",
    "modelMeaning": "Saya ingin minum air.",
    "hint": "想 sebelum kata kerja.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "likes-and-wants-4",
    "title": "Likes and Wants 4",
    "mode": "Sentence Build",
    "hanzi": "她想去中国。",
    "pinyin": "tā xiǎng qù Zhōngguó.",
    "meaning": "Dia ingin pergi ke Tiongkok.",
    "prompt": "Tulis “Dia ingin pergi ke Tiongkok”.",
    "targetPattern": "她 + 想 + 去 + 中国",
    "modelAnswer": "她想去中国。",
    "modelPinyin": "Tā xiǎng qù Zhōngguó.",
    "modelMeaning": "Dia ingin pergi ke Tiongkok.",
    "hint": "去 + tempat tujuan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik10Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
