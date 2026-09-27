import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-negasi-maa",
  "title": "Nahwu 17: Negasi Maa",
  "description": "Memakai maa untuk meniadakan kejadian lampau atau kepemilikan sederhana.",
  "topicNumber": 17,
  "focus": "مَا sering dipakai dengan fiil madhi untuk makna tidak/tidak telah.",
  "goal": "Bedakan negasi maa pada fiil madhi dan ungkapan kepemilikan."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "negasi-maa-1",
    "label": "Madhi",
    "rule": "مَا sebelum fiil madhi meniadakan kejadian lampau.",
    "arabic": "مَا ذَهَبَ",
    "transliteration": "ma dhahaba",
    "meaning": "dia tidak pergi",
    "prompt": "Apa fungsi مَا?",
    "answer": "Meniadakan fiil lampau ذَهَبَ.",
    "hint": "Fiil setelahnya adalah madhi."
  },
  {
    "id": "negasi-maa-2",
    "label": "Tidak Membaca",
    "rule": "مَا + fiil madhi berarti tidak melakukan pada masa lampau.",
    "arabic": "مَا قَرَأَ",
    "transliteration": "ma qaraa",
    "meaning": "dia tidak membaca",
    "prompt": "Terjemahkan مَا قَرَأَ.",
    "answer": "Dia tidak membaca.",
    "hint": "قَرَأَ berarti telah membaca."
  },
  {
    "id": "negasi-maa-3",
    "label": "Saya Tidak Paham",
    "rule": "Akhiran ـتُ pada fiil madhi menunjukkan saya.",
    "arabic": "مَا فَهِمْتُ",
    "transliteration": "ma fahimtu",
    "meaning": "saya tidak paham",
    "prompt": "Siapa pelaku tersirat فَهِمْتُ?",
    "answer": "Saya.",
    "hint": "Akhiran tu menunjukkan aku/saya."
  },
  {
    "id": "negasi-maa-4",
    "label": "Kepemilikan",
    "rule": "مَا عِنْدِي dipakai untuk mengatakan saya tidak punya.",
    "arabic": "مَا عِنْدِي قَلَمٌ",
    "transliteration": "ma indi qalamun",
    "meaning": "saya tidak punya pulpen",
    "prompt": "Apa makna frasa ini?",
    "answer": "Saya tidak punya pulpen.",
    "hint": "عِنْدِي berarti pada saya/saya punya."
  }
];

export default function ArabicNahwuTopik17Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
