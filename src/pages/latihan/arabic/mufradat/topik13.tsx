import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-transportasi",
  "title": "Mufradat 13: Transportasi",
  "description": "Kosakata kendaraan umum dan pribadi.",
  "topicNumber": 13,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema transportasi.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "transportasi-1",
    "arabic": "سَيَّارَةٌ",
    "transliteration": "sayyaratun",
    "meaning": "mobil",
    "category": "Transportasi",
    "example": "كَلِمَةُ الْيَوْمِ: سَيَّارَةٌ",
    "prompt": "Apa arti kata سَيَّارَةٌ?",
    "answer": "mobil",
    "hint": "Tema: Transportasi. Ucapkan sayyaratun sebelum melihat jawaban."
  },
  {
    "id": "transportasi-2",
    "arabic": "حَافِلَةٌ",
    "transliteration": "hafilatun",
    "meaning": "bus",
    "category": "Transportasi",
    "example": "كَلِمَةُ الْيَوْمِ: حَافِلَةٌ",
    "prompt": "Apa arti kata حَافِلَةٌ?",
    "answer": "bus",
    "hint": "Tema: Transportasi. Ucapkan hafilatun sebelum melihat jawaban."
  },
  {
    "id": "transportasi-3",
    "arabic": "قِطَارٌ",
    "transliteration": "qitharun",
    "meaning": "kereta",
    "category": "Transportasi",
    "example": "كَلِمَةُ الْيَوْمِ: قِطَارٌ",
    "prompt": "Apa arti kata قِطَارٌ?",
    "answer": "kereta",
    "hint": "Tema: Transportasi. Ucapkan qitharun sebelum melihat jawaban."
  },
  {
    "id": "transportasi-4",
    "arabic": "طَائِرَةٌ",
    "transliteration": "tha iratun",
    "meaning": "pesawat",
    "category": "Transportasi",
    "example": "كَلِمَةُ الْيَوْمِ: طَائِرَةٌ",
    "prompt": "Apa arti kata طَائِرَةٌ?",
    "answer": "pesawat",
    "hint": "Tema: Transportasi. Ucapkan tha iratun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik13Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
