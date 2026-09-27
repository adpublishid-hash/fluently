import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-numbers-and-measure-words",
  "title": "Xiězuò 6: Numbers and Measure Words",
  "description": "Melatih menulis angka dengan kata ukur umum dalam kalimat sederhana.",
  "topicNumber": 6,
  "focus": "Angka dan kata ukur.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "numbers-and-measure-words-1",
    "title": "Numbers and Measure Words 1",
    "mode": "Sentence Build",
    "hanzi": "我有一本书。",
    "pinyin": "wǒ yǒu yī běn shū.",
    "meaning": "Saya punya satu buku.",
    "prompt": "Tulis “Saya punya satu buku”.",
    "targetPattern": "我 + 有 + 一 + 本 + 书",
    "modelAnswer": "我有一本书。",
    "modelPinyin": "Wǒ yǒu yī běn shū.",
    "modelMeaning": "Saya punya satu buku.",
    "hint": "Buku memakai kata ukur 本.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "numbers-and-measure-words-2",
    "title": "Numbers and Measure Words 2",
    "mode": "Sentence Build",
    "hanzi": "他有三个朋友。",
    "pinyin": "tā yǒu sān ge péngyǒu.",
    "meaning": "Dia punya tiga teman.",
    "prompt": "Tulis “Dia punya tiga teman”.",
    "targetPattern": "他 + 有 + 三 + 个 + 朋友",
    "modelAnswer": "他有三个朋友。",
    "modelPinyin": "Tā yǒu sān ge péngyǒu.",
    "modelMeaning": "Dia punya tiga teman.",
    "hint": "个 adalah kata ukur umum.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "numbers-and-measure-words-3",
    "title": "Numbers and Measure Words 3",
    "mode": "Sentence Build",
    "hanzi": "我有两支笔。",
    "pinyin": "wǒ yǒu liǎng zhī bǐ.",
    "meaning": "Saya punya dua pena.",
    "prompt": "Tulis “Saya punya dua pena”.",
    "targetPattern": "我 + 有 + 两 + 支 + 笔",
    "modelAnswer": "我有两支笔。",
    "modelPinyin": "Wǒ yǒu liǎng zhī bǐ.",
    "modelMeaning": "Saya punya dua pena.",
    "hint": "Untuk jumlah dua benda sering pakai 两.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "numbers-and-measure-words-4",
    "title": "Numbers and Measure Words 4",
    "mode": "Sentence Build",
    "hanzi": "现在十点。",
    "pinyin": "xiànzài shí diǎn.",
    "meaning": "Sekarang jam sepuluh.",
    "prompt": "Tulis “Sekarang jam sepuluh”.",
    "targetPattern": "现在 + 十 + 点",
    "modelAnswer": "现在十点。",
    "modelPinyin": "Xiànzài shí diǎn.",
    "modelMeaning": "Sekarang jam sepuluh.",
    "hint": "点 dipakai untuk jam.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik6Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
