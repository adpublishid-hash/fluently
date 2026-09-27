import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-masjid",
  "title": "Mufradat 27: Masjid",
  "description": "Kosakata aktivitas dan benda di masjid.",
  "topicNumber": 27,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema masjid.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "masjid-1",
    "arabic": "إِمَامٌ",
    "transliteration": "imamun",
    "meaning": "imam",
    "category": "Masjid",
    "example": "كَلِمَةُ الْيَوْمِ: إِمَامٌ",
    "prompt": "Apa arti kata إِمَامٌ?",
    "answer": "imam",
    "hint": "Tema: Masjid. Ucapkan imamun sebelum melihat jawaban."
  },
  {
    "id": "masjid-2",
    "arabic": "مُؤَذِّنٌ",
    "transliteration": "mu adzdzinun",
    "meaning": "muazin",
    "category": "Masjid",
    "example": "كَلِمَةُ الْيَوْمِ: مُؤَذِّنٌ",
    "prompt": "Apa arti kata مُؤَذِّنٌ?",
    "answer": "muazin",
    "hint": "Tema: Masjid. Ucapkan mu adzdzinun sebelum melihat jawaban."
  },
  {
    "id": "masjid-3",
    "arabic": "صَلَاةٌ",
    "transliteration": "shalatun",
    "meaning": "salat",
    "category": "Masjid",
    "example": "كَلِمَةُ الْيَوْمِ: صَلَاةٌ",
    "prompt": "Apa arti kata صَلَاةٌ?",
    "answer": "salat",
    "hint": "Tema: Masjid. Ucapkan shalatun sebelum melihat jawaban."
  },
  {
    "id": "masjid-4",
    "arabic": "وُضُوءٌ",
    "transliteration": "wudhu un",
    "meaning": "wudu",
    "category": "Masjid",
    "example": "كَلِمَةُ الْيَوْمِ: وُضُوءٌ",
    "prompt": "Apa arti kata وُضُوءٌ?",
    "answer": "wudu",
    "hint": "Tema: Masjid. Ucapkan wudhu un sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik27Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
