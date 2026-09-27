import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-radicals-and-basic-shapes",
  "title": "Xiězuò 2: Radicals and Basic Shapes",
  "description": "Melatih bentuk dasar seperti orang, mulut, matahari, dan bulan.",
  "topicNumber": 2,
  "focus": "Bentuk Hanzi awal.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "radicals-and-basic-shapes-1",
    "title": "Radicals and Basic Shapes 1",
    "mode": "Shape Copy",
    "hanzi": "人",
    "pinyin": "rén",
    "meaning": "orang",
    "prompt": "Salin “人”, lalu tulis satu frasa pendek dengan 人.",
    "targetPattern": "人 = orang",
    "modelAnswer": "人",
    "modelPinyin": "rén",
    "modelMeaning": "Orang.",
    "hint": "Dua goresan membentuk figur orang.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "radicals-and-basic-shapes-2",
    "title": "Radicals and Basic Shapes 2",
    "mode": "Shape Copy",
    "hanzi": "口",
    "pinyin": "kǒu",
    "meaning": "mulut",
    "prompt": "Salin “口” dan perhatikan bentuk kotaknya.",
    "targetPattern": "口 = mulut",
    "modelAnswer": "口",
    "modelPinyin": "kǒu",
    "modelMeaning": "Mulut.",
    "hint": "Bentuk kotak ditutup di akhir.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "radicals-and-basic-shapes-3",
    "title": "Radicals and Basic Shapes 3",
    "mode": "Shape Copy",
    "hanzi": "日",
    "pinyin": "rì",
    "meaning": "matahari atau hari",
    "prompt": "Salin “日” dan tulis artinya.",
    "targetPattern": "日 = hari / matahari",
    "modelAnswer": "日",
    "modelPinyin": "rì",
    "modelMeaning": "Hari atau matahari.",
    "hint": "Mirip 口 dengan satu garis tengah.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "radicals-and-basic-shapes-4",
    "title": "Radicals and Basic Shapes 4",
    "mode": "Shape Copy",
    "hanzi": "月",
    "pinyin": "yuè",
    "meaning": "bulan",
    "prompt": "Salin “月” dan tulis pinyin lengkapnya.",
    "targetPattern": "月 = bulan",
    "modelAnswer": "月",
    "modelPinyin": "yuè",
    "modelMeaning": "Bulan.",
    "hint": "Perhatikan dua garis pendek di bagian dalam.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik2Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
