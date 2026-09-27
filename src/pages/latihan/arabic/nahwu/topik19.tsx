import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-kalimat-sederhana",
  "title": "Nahwu 19: Kalimat Sederhana",
  "description": "Menyusun kalimat Arab pendek untuk identitas, kepemilikan, dan aktivitas.",
  "topicNumber": 19,
  "focus": "Gabungkan dhamir, isim, huruf jar, dan fiil dalam kalimat dasar.",
  "goal": "Kenali pola makna pada kalimat pendek yang siap dipakai."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "kalimat-sederhana-1",
    "label": "Identitas",
    "rule": "Dhamir dapat menjadi mubtada, lalu diikuti khabar identitas.",
    "arabic": "أَنَا طَالِبٌ",
    "transliteration": "ana talibun",
    "meaning": "saya seorang pelajar",
    "prompt": "Apa pola kalimat ini?",
    "answer": "Dhamir أَنَا sebagai mubtada, طَالِبٌ sebagai khabar.",
    "hint": "Saya + identitas."
  },
  {
    "id": "kalimat-sederhana-2",
    "label": "Kepemilikan",
    "rule": "عِنْدِي dipakai untuk menyatakan saya punya.",
    "arabic": "عِنْدِي كِتَابٌ",
    "transliteration": "indi kitabun",
    "meaning": "saya punya buku",
    "prompt": "Apa makna عِنْدِي?",
    "answer": "Pada saya/saya punya.",
    "hint": "Kata setelahnya adalah benda yang dimiliki."
  },
  {
    "id": "kalimat-sederhana-3",
    "label": "Ada Di Tempat",
    "rule": "Frasa tempat di awal dapat menunjukkan ada sesuatu di tempat itu.",
    "arabic": "فِي الْفَصْلِ سَبُّورَةٌ",
    "transliteration": "fi al-fasli sabburatun",
    "meaning": "di kelas ada papan tulis",
    "prompt": "Apa benda yang ada di kelas?",
    "answer": "سَبُّورَةٌ adalah benda yang ada.",
    "hint": "Kata setelah frasa tempat."
  },
  {
    "id": "kalimat-sederhana-4",
    "label": "Fiil Objek",
    "rule": "Fiil dapat diikuti objek yang dikenai pekerjaan.",
    "arabic": "أُحِبُّ اللُّغَةَ الْعَرَبِيَّةَ",
    "transliteration": "uhibbu al-lughata al-arabiyyata",
    "meaning": "saya mencintai bahasa Arab",
    "prompt": "Apa objek yang dicintai?",
    "answer": "اللُّغَةَ الْعَرَبِيَّةَ adalah objek.",
    "hint": "Yang dicintai adalah bahasa Arab."
  }
];

export default function ArabicNahwuTopik19Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
