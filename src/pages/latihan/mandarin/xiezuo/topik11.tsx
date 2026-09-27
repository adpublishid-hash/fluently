import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-food-and-drink-writing",
  "title": "Xiězuò 11: Food and Drink Writing",
  "description": "Melatih kalimat makan, minum, dan selera sederhana.",
  "topicNumber": 11,
  "focus": "Makanan dan minuman tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "food-and-drink-writing-1",
    "title": "Food and Drink Writing 1",
    "mode": "Sentence Build",
    "hanzi": "我吃饭。",
    "pinyin": "wǒ chī fàn.",
    "meaning": "Saya makan.",
    "prompt": "Tulis “Saya makan”.",
    "targetPattern": "我 + 吃饭",
    "modelAnswer": "我吃饭。",
    "modelPinyin": "Wǒ chī fàn.",
    "modelMeaning": "Saya makan.",
    "hint": "吃饭 adalah frasa umum untuk makan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "food-and-drink-writing-2",
    "title": "Food and Drink Writing 2",
    "mode": "Sentence Build",
    "hanzi": "你喝茶吗？",
    "pinyin": "nǐ hē chá ma?",
    "meaning": "Apakah kamu minum teh?",
    "prompt": "Tulis pertanyaan “Apakah kamu minum teh?”",
    "targetPattern": "你 + 喝 + 茶 + 吗",
    "modelAnswer": "你喝茶吗？",
    "modelPinyin": "Nǐ hē chá ma?",
    "modelMeaning": "Apakah kamu minum teh?",
    "hint": "Pertanyaan ya/tidak memakai 吗.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "food-and-drink-writing-3",
    "title": "Food and Drink Writing 3",
    "mode": "Sentence Build",
    "hanzi": "我买苹果。",
    "pinyin": "wǒ mǎi píngguǒ.",
    "meaning": "Saya membeli apel.",
    "prompt": "Tulis “Saya membeli apel”.",
    "targetPattern": "我 + 买 + 苹果",
    "modelAnswer": "我买苹果。",
    "modelPinyin": "Wǒ mǎi píngguǒ.",
    "modelMeaning": "Saya membeli apel.",
    "hint": "买 berarti membeli.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "food-and-drink-writing-4",
    "title": "Food and Drink Writing 4",
    "mode": "Sentence Build",
    "hanzi": "妹妹吃香蕉。",
    "pinyin": "mèimei chī xiāngjiāo.",
    "meaning": "Adik perempuan makan pisang.",
    "prompt": "Tulis “Adik perempuan makan pisang”.",
    "targetPattern": "妹妹 + 吃 + 香蕉",
    "modelAnswer": "妹妹吃香蕉。",
    "modelPinyin": "Mèimei chī xiāngjiāo.",
    "modelMeaning": "Adik perempuan makan pisang.",
    "hint": "香蕉 berarti pisang.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik11Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
