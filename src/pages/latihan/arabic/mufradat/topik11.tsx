import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-anggota-tubuh",
  "title": "Mufradat 11: Anggota Tubuh",
  "description": "Kosakata bagian tubuh sederhana.",
  "topicNumber": 11,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema anggota tubuh.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "anggota-tubuh-1",
    "arabic": "رَأْسٌ",
    "transliteration": "ra sun",
    "meaning": "kepala",
    "category": "Anggota Tubuh",
    "example": "كَلِمَةُ الْيَوْمِ: رَأْسٌ",
    "prompt": "Apa arti kata رَأْسٌ?",
    "answer": "kepala",
    "hint": "Tema: Anggota Tubuh. Ucapkan ra sun sebelum melihat jawaban."
  },
  {
    "id": "anggota-tubuh-2",
    "arabic": "عَيْنٌ",
    "transliteration": "'ainun",
    "meaning": "mata",
    "category": "Anggota Tubuh",
    "example": "كَلِمَةُ الْيَوْمِ: عَيْنٌ",
    "prompt": "Apa arti kata عَيْنٌ?",
    "answer": "mata",
    "hint": "Tema: Anggota Tubuh. Ucapkan 'ainun sebelum melihat jawaban."
  },
  {
    "id": "anggota-tubuh-3",
    "arabic": "أُذُنٌ",
    "transliteration": "udzunun",
    "meaning": "telinga",
    "category": "Anggota Tubuh",
    "example": "كَلِمَةُ الْيَوْمِ: أُذُنٌ",
    "prompt": "Apa arti kata أُذُنٌ?",
    "answer": "telinga",
    "hint": "Tema: Anggota Tubuh. Ucapkan udzunun sebelum melihat jawaban."
  },
  {
    "id": "anggota-tubuh-4",
    "arabic": "يَدٌ",
    "transliteration": "yadun",
    "meaning": "tangan",
    "category": "Anggota Tubuh",
    "example": "كَلِمَةُ الْيَوْمِ: يَدٌ",
    "prompt": "Apa arti kata يَدٌ?",
    "answer": "tangan",
    "hint": "Tema: Anggota Tubuh. Ucapkan yadun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik11Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
