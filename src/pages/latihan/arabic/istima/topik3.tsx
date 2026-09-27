import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-nama-orang",
  "title": "Istima 3: Nama Orang",
  "description": "Menangkap nama yang disebut dalam pertanyaan dan jawaban pendek.",
  "topicNumber": 3,
  "focus": "Nama dan identitas",
  "goal": "Dengarkan nama, lalu tulis siapa yang disebut atau memperkenalkan diri."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "nama-orang-1",
    "title": "Nama saya",
    "arabic": "اِسْمِي عَلِيٌّ",
    "transliteration": "ismi aliyun",
    "meaning": "nama saya Ali",
    "focus": "Perkenalan",
    "prompt": "Dengarkan. Siapa nama pembicara?",
    "answer": "Ali.",
    "hint": "Nama muncul setelah ismi.",
    "keyword": "عَلِيٌّ"
  },
  {
    "id": "nama-orang-2",
    "title": "Nama perempuan",
    "arabic": "اِسْمُهَا فَاطِمَةُ",
    "transliteration": "ismuha fatimatu",
    "meaning": "namanya Fatimah",
    "focus": "Nama orang",
    "prompt": "Dengarkan. Nama siapa yang disebut?",
    "answer": "فَاطِمَةُ.",
    "hint": "Kata terakhir adalah nama.",
    "keyword": "فَاطِمَةُ"
  },
  {
    "id": "nama-orang-3",
    "title": "Tanya nama",
    "arabic": "مَا اسْمُكَ؟",
    "transliteration": "ma ismuka?",
    "meaning": "siapa namamu?",
    "focus": "Pertanyaan nama",
    "prompt": "Dengarkan. Pertanyaan ini menanyakan apa?",
    "answer": "Menanyakan nama.",
    "hint": "Ada kata ismuka.",
    "keyword": "اسْمُكَ"
  },
  {
    "id": "nama-orang-4",
    "title": "Dia Muhammad",
    "arabic": "هُوَ مُحَمَّدٌ",
    "transliteration": "huwa muhammadun",
    "meaning": "dia Muhammad",
    "focus": "Identitas",
    "prompt": "Dengarkan. Siapa dia?",
    "answer": "مُحَمَّدٌ.",
    "hint": "Nama muncul setelah huwa.",
    "keyword": "مُحَمَّدٌ"
  }
];

export default function ArabicIstimaTopik3Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
