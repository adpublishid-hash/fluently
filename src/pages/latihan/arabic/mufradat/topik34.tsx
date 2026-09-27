import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-aktivitas-pagi",
  "title": "Mufradat 34: Aktivitas Pagi",
  "description": "Kosakata rutinitas pagi.",
  "topicNumber": 34,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema aktivitas pagi.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "aktivitas-pagi-1",
    "arabic": "اِسْتَيْقَظَ",
    "transliteration": "istaiqazha",
    "meaning": "dia bangun tidur",
    "category": "Aktivitas Pagi",
    "example": "كَلِمَةُ الْيَوْمِ: اِسْتَيْقَظَ",
    "prompt": "Apa arti kata اِسْتَيْقَظَ?",
    "answer": "dia bangun tidur",
    "hint": "Tema: Aktivitas Pagi. Ucapkan istaiqazha sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-pagi-2",
    "arabic": "غَسَلَ",
    "transliteration": "ghasala",
    "meaning": "dia mencuci",
    "category": "Aktivitas Pagi",
    "example": "كَلِمَةُ الْيَوْمِ: غَسَلَ",
    "prompt": "Apa arti kata غَسَلَ?",
    "answer": "dia mencuci",
    "hint": "Tema: Aktivitas Pagi. Ucapkan ghasala sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-pagi-3",
    "arabic": "صَلَّى",
    "transliteration": "shalla",
    "meaning": "dia salat",
    "category": "Aktivitas Pagi",
    "example": "كَلِمَةُ الْيَوْمِ: صَلَّى",
    "prompt": "Apa arti kata صَلَّى?",
    "answer": "dia salat",
    "hint": "Tema: Aktivitas Pagi. Ucapkan shalla sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-pagi-4",
    "arabic": "فَطُورٌ",
    "transliteration": "fathurun",
    "meaning": "sarapan",
    "category": "Aktivitas Pagi",
    "example": "كَلِمَةُ الْيَوْمِ: فَطُورٌ",
    "prompt": "Apa arti kata فَطُورٌ?",
    "answer": "sarapan",
    "hint": "Tema: Aktivitas Pagi. Ucapkan fathurun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik34Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
