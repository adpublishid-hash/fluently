import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-stroke-basics-and-simple-hanzi",
  "title": "Xiězuò 1: Stroke Basics and Simple Hanzi",
  "description": "Melatih Hanzi paling sederhana untuk membangun kontrol garis dan bentuk dasar.",
  "topicNumber": 1,
  "focus": "Stroke dasar dan Hanzi tunggal.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "stroke-basics-and-simple-hanzi-1",
    "title": "Stroke Basics and Simple Hanzi 1",
    "mode": "Copy Hanzi",
    "hanzi": "一",
    "pinyin": "yī",
    "meaning": "satu",
    "prompt": "Salin Hanzi “一” tiga kali, lalu tulis pinyin dan artinya.",
    "targetPattern": "一 = yī = satu",
    "modelAnswer": "一",
    "modelPinyin": "yī",
    "modelMeaning": "Satu.",
    "hint": "Satu garis mendatar dari kiri ke kanan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "stroke-basics-and-simple-hanzi-2",
    "title": "Stroke Basics and Simple Hanzi 2",
    "mode": "Copy Hanzi",
    "hanzi": "二",
    "pinyin": "èr",
    "meaning": "dua",
    "prompt": "Salin Hanzi “二” tiga kali dan jaga garis atas lebih pendek.",
    "targetPattern": "二 = èr = dua",
    "modelAnswer": "二",
    "modelPinyin": "èr",
    "modelMeaning": "Dua.",
    "hint": "Garis atas lebih pendek daripada garis bawah.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "stroke-basics-and-simple-hanzi-3",
    "title": "Stroke Basics and Simple Hanzi 3",
    "mode": "Copy Hanzi",
    "hanzi": "三",
    "pinyin": "sān",
    "meaning": "tiga",
    "prompt": "Salin Hanzi “三” dan perhatikan panjang tiga garisnya.",
    "targetPattern": "三 = sān = tiga",
    "modelAnswer": "三",
    "modelPinyin": "sān",
    "modelMeaning": "Tiga.",
    "hint": "Garis tengah biasanya paling pendek.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "stroke-basics-and-simple-hanzi-4",
    "title": "Stroke Basics and Simple Hanzi 4",
    "mode": "Copy Hanzi",
    "hanzi": "十",
    "pinyin": "shí",
    "meaning": "sepuluh",
    "prompt": "Salin Hanzi “十” dan tulis pinyin serta artinya.",
    "targetPattern": "十 = shí = sepuluh",
    "modelAnswer": "十",
    "modelPinyin": "shí",
    "modelMeaning": "Sepuluh.",
    "hint": "Garis horizontal ditulis sebelum garis vertikal.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik1Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
