import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-possession-with-de",
  "title": "Xiězuò 9: Possession with 的",
  "description": "Melatih kepemilikan sederhana dengan 的 dalam frasa benda.",
  "topicNumber": 9,
  "focus": "Kepemilikan tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "possession-with-de-1",
    "title": "Possession with 的 1",
    "mode": "Phrase Build",
    "hanzi": "我的书",
    "pinyin": "wǒ de shū",
    "meaning": "buku saya",
    "prompt": "Tulis frasa “buku saya”.",
    "targetPattern": "我 + 的 + 书",
    "modelAnswer": "我的书",
    "modelPinyin": "Wǒ de shū",
    "modelMeaning": "Buku saya.",
    "hint": "的 diletakkan antara pemilik dan benda.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "possession-with-de-2",
    "title": "Possession with 的 2",
    "mode": "Sentence Build",
    "hanzi": "这是我的笔。",
    "pinyin": "zhè shì wǒ de bǐ.",
    "meaning": "Ini pena saya.",
    "prompt": "Tulis “Ini pena saya”.",
    "targetPattern": "这 + 是 + 我 + 的 + 笔",
    "modelAnswer": "这是我的笔。",
    "modelPinyin": "Zhè shì wǒ de bǐ.",
    "modelMeaning": "Ini pena saya.",
    "hint": "Pena ditulis 笔.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "possession-with-de-3",
    "title": "Possession with 的 3",
    "mode": "Sentence Build",
    "hanzi": "她的妈妈很好。",
    "pinyin": "tā de māma hěn hǎo.",
    "meaning": "Ibunya baik.",
    "prompt": "Tulis “Ibunya baik”.",
    "targetPattern": "她的妈妈 + 很 + 好",
    "modelAnswer": "她的妈妈很好。",
    "modelPinyin": "Tā de māma hěn hǎo.",
    "modelMeaning": "Ibunya baik.",
    "hint": "她的 berarti miliknya untuk perempuan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "possession-with-de-4",
    "title": "Possession with 的 4",
    "mode": "Sentence Build",
    "hanzi": "这是他的朋友。",
    "pinyin": "zhè shì tā de péngyǒu.",
    "meaning": "Ini temannya.",
    "prompt": "Tulis “Ini temannya” untuk laki-laki.",
    "targetPattern": "这 + 是 + 他 + 的 + 朋友",
    "modelAnswer": "这是他的朋友。",
    "modelPinyin": "Zhè shì tā de péngyǒu.",
    "modelMeaning": "Ini temannya.",
    "hint": "他的 berarti miliknya laki-laki.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik9Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
