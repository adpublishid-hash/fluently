import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-memperkenalkan-nama",
  "title": "Kalam 2: Memperkenalkan Nama",
  "description": "Latihan menyebut nama dan menanyakan nama orang lain.",
  "topicNumber": 2,
  "focus": "Nama diri dan tanya nama",
  "goal": "Bangun respons perkenalan singkat memakai ismi dan ma ismuka."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "memperkenalkan-nama-1",
    "title": "Nama saya",
    "situation": "Memperkenalkan diri",
    "arabic": "اِسْمِي أَحْمَدُ",
    "transliteration": "ismi ahmadu",
    "meaning": "nama saya Ahmad",
    "prompt": "Perkenalkan namamu memakai pola ismi.",
    "modelAnswer": "اِسْمِي أَحْمَدُ",
    "hint": "Ganti Ahmad dengan namamu.",
    "challenge": "Ucapkan dengan nama asli kamu."
  },
  {
    "id": "memperkenalkan-nama-2",
    "title": "Tanya nama laki-laki",
    "situation": "Bertanya kepada teman laki-laki",
    "arabic": "مَا اسْمُكَ؟",
    "transliteration": "ma ismuka?",
    "meaning": "siapa namamu?",
    "prompt": "Tanyakan nama kepada teman laki-laki.",
    "modelAnswer": "مَا اسْمُكَ؟",
    "hint": "Akhiran ka untuk kamu laki-laki.",
    "challenge": "Ucapkan sebagai pertanyaan dengan intonasi naik."
  },
  {
    "id": "memperkenalkan-nama-3",
    "title": "Tanya nama perempuan",
    "situation": "Bertanya kepada teman perempuan",
    "arabic": "مَا اسْمُكِ؟",
    "transliteration": "ma ismuki?",
    "meaning": "siapa namamu?",
    "prompt": "Tanyakan nama kepada teman perempuan.",
    "modelAnswer": "مَا اسْمُكِ؟",
    "hint": "Akhiran ki untuk kamu perempuan.",
    "challenge": "Bedakan bunyi ka dan ki dengan jelas."
  },
  {
    "id": "memperkenalkan-nama-4",
    "title": "Senang berkenalan",
    "situation": "Setelah mendengar nama teman",
    "arabic": "تَشَرَّفْتُ بِمَعْرِفَتِكَ",
    "transliteration": "tasharraftu bimarifatik",
    "meaning": "senang berkenalan denganmu",
    "prompt": "Ucapkan senang berkenalan setelah teman menyebut nama.",
    "modelAnswer": "تَشَرَّفْتُ بِمَعْرِفَتِكَ",
    "hint": "Frasa ini sopan untuk perkenalan.",
    "challenge": "Ucapkan pelan, lalu ulangi lebih natural."
  }
];

export default function ArabicKalamTopik2Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
