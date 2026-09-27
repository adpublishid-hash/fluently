import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-time-words-in-sentences",
  "title": "Xiězuò 7: Time Words in Sentences",
  "description": "Melatih kata waktu seperti hari ini, besok, kemarin, dan sekarang.",
  "topicNumber": 7,
  "focus": "Kata waktu tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "time-words-in-sentences-1",
    "title": "Time Words in Sentences 1",
    "mode": "Sentence Build",
    "hanzi": "今天我学习中文。",
    "pinyin": "jīntiān wǒ xuéxí Zhōngwén.",
    "meaning": "Hari ini saya belajar Mandarin.",
    "prompt": "Tulis “Hari ini saya belajar Mandarin”.",
    "targetPattern": "今天 + 我 + 学习 + 中文",
    "modelAnswer": "今天我学习中文。",
    "modelPinyin": "Jīntiān wǒ xuéxí Zhōngwén.",
    "modelMeaning": "Hari ini saya belajar Mandarin.",
    "hint": "Kata waktu bisa di awal kalimat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "time-words-in-sentences-2",
    "title": "Time Words in Sentences 2",
    "mode": "Sentence Build",
    "hanzi": "明天我去学校。",
    "pinyin": "míngtiān wǒ qù xuéxiào.",
    "meaning": "Besok saya pergi ke sekolah.",
    "prompt": "Tulis “Besok saya pergi ke sekolah”.",
    "targetPattern": "明天 + 我 + 去 + 学校",
    "modelAnswer": "明天我去学校。",
    "modelPinyin": "Míngtiān wǒ qù xuéxiào.",
    "modelMeaning": "Besok saya pergi ke sekolah.",
    "hint": "Pergi ke tempat: 去 + tempat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "time-words-in-sentences-3",
    "title": "Time Words in Sentences 3",
    "mode": "Sentence Build",
    "hanzi": "昨天我看电影。",
    "pinyin": "zuótiān wǒ kàn diànyǐng.",
    "meaning": "Kemarin saya menonton film.",
    "prompt": "Tulis “Kemarin saya menonton film”.",
    "targetPattern": "昨天 + 我 + 看 + 电影",
    "modelAnswer": "昨天我看电影。",
    "modelPinyin": "Zuótiān wǒ kàn diànyǐng.",
    "modelMeaning": "Kemarin saya menonton film.",
    "hint": "看 bisa berarti menonton.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "time-words-in-sentences-4",
    "title": "Time Words in Sentences 4",
    "mode": "Sentence Build",
    "hanzi": "现在我在家。",
    "pinyin": "xiànzài wǒ zài jiā.",
    "meaning": "Sekarang saya di rumah.",
    "prompt": "Tulis “Sekarang saya di rumah”.",
    "targetPattern": "现在 + 我 + 在 + 家",
    "modelAnswer": "现在我在家。",
    "modelPinyin": "Xiànzài wǒ zài jiā.",
    "modelMeaning": "Sekarang saya di rumah.",
    "hint": "在 menyatakan berada di tempat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik7Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
