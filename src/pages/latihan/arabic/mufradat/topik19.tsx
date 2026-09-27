import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kata-kerja-harian",
  "title": "Mufradat 19: Kata Kerja Harian",
  "description": "Kata kerja dasar untuk aktivitas sehari-hari.",
  "topicNumber": 19,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kata kerja harian.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kata-kerja-harian-1",
    "arabic": "أَكَلَ",
    "transliteration": "akala",
    "meaning": "dia makan",
    "category": "Kata Kerja Harian",
    "example": "كَلِمَةُ الْيَوْمِ: أَكَلَ",
    "prompt": "Apa arti kata أَكَلَ?",
    "answer": "dia makan",
    "hint": "Tema: Kata Kerja Harian. Ucapkan akala sebelum melihat jawaban."
  },
  {
    "id": "kata-kerja-harian-2",
    "arabic": "شَرِبَ",
    "transliteration": "syariba",
    "meaning": "dia minum",
    "category": "Kata Kerja Harian",
    "example": "كَلِمَةُ الْيَوْمِ: شَرِبَ",
    "prompt": "Apa arti kata شَرِبَ?",
    "answer": "dia minum",
    "hint": "Tema: Kata Kerja Harian. Ucapkan syariba sebelum melihat jawaban."
  },
  {
    "id": "kata-kerja-harian-3",
    "arabic": "ذَهَبَ",
    "transliteration": "dzahaba",
    "meaning": "dia pergi",
    "category": "Kata Kerja Harian",
    "example": "كَلِمَةُ الْيَوْمِ: ذَهَبَ",
    "prompt": "Apa arti kata ذَهَبَ?",
    "answer": "dia pergi",
    "hint": "Tema: Kata Kerja Harian. Ucapkan dzahaba sebelum melihat jawaban."
  },
  {
    "id": "kata-kerja-harian-4",
    "arabic": "قَرَأَ",
    "transliteration": "qara a",
    "meaning": "dia membaca",
    "category": "Kata Kerja Harian",
    "example": "كَلِمَةُ الْيَوْمِ: قَرَأَ",
    "prompt": "Apa arti kata قَرَأَ?",
    "answer": "dia membaca",
    "hint": "Tema: Kata Kerja Harian. Ucapkan qara a sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik19Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
