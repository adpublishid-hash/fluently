import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-negasi-laa",
  "title": "Nahwu 16: Negasi Laa",
  "description": "Memahami penggunaan laa untuk meniadakan atau melarang.",
  "topicNumber": 16,
  "focus": "لَا dapat berarti tidak atau jangan sesuai bentuk kalimat.",
  "goal": "Tentukan fungsi laa pada contoh kalimat sederhana."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "negasi-laa-1",
    "label": "Tidak",
    "rule": "لَا sebelum fiil mudhari dapat meniadakan kegiatan sekarang.",
    "arabic": "لَا أَفْهَمُ",
    "transliteration": "la afhamu",
    "meaning": "saya tidak paham",
    "prompt": "Apa fungsi لَا di sini?",
    "answer": "Meniadakan: saya tidak paham.",
    "hint": "Setelahnya fiil mudhari أَفْهَمُ."
  },
  {
    "id": "negasi-laa-2",
    "label": "Larangan",
    "rule": "لَا dapat menjadi larangan ketika bermakna jangan.",
    "arabic": "لَا تَكْتُبْ",
    "transliteration": "la taktub",
    "meaning": "jangan menulis",
    "prompt": "Apakah لَا di sini berarti tidak atau jangan?",
    "answer": "Jangan, karena berupa larangan.",
    "hint": "Konteksnya memerintah agar tidak melakukan."
  },
  {
    "id": "negasi-laa-3",
    "label": "Ungkapan",
    "rule": "Sebagian ungkapan memakai لَا sebagai bentuk tetap.",
    "arabic": "لَا بَأْسَ",
    "transliteration": "la basa",
    "meaning": "tidak apa-apa",
    "prompt": "Apa makna لَا بَأْسَ?",
    "answer": "Tidak apa-apa.",
    "hint": "Ini ungkapan yang sering dipakai."
  },
  {
    "id": "negasi-laa-4",
    "label": "Keinginan",
    "rule": "لَا bisa meniadakan keinginan ketika bertemu أُرِيدُ.",
    "arabic": "لَا أُرِيدُ",
    "transliteration": "la uridu",
    "meaning": "saya tidak ingin",
    "prompt": "Terjemahkan kalimat ini.",
    "answer": "Saya tidak ingin.",
    "hint": "أُرِيدُ berarti saya ingin."
  }
];

export default function ArabicNahwuTopik16Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
