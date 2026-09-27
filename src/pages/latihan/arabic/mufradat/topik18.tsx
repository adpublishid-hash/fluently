import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-hobi",
  "title": "Mufradat 18: Hobi",
  "description": "Kosakata kegiatan waktu luang.",
  "topicNumber": 18,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema hobi.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "hobi-1",
    "arabic": "قِرَاءَةٌ",
    "transliteration": "qira atun",
    "meaning": "membaca",
    "category": "Hobi",
    "example": "كَلِمَةُ الْيَوْمِ: قِرَاءَةٌ",
    "prompt": "Apa arti kata قِرَاءَةٌ?",
    "answer": "membaca",
    "hint": "Tema: Hobi. Ucapkan qira atun sebelum melihat jawaban."
  },
  {
    "id": "hobi-2",
    "arabic": "كِتَابَةٌ",
    "transliteration": "kitabatun",
    "meaning": "menulis",
    "category": "Hobi",
    "example": "كَلِمَةُ الْيَوْمِ: كِتَابَةٌ",
    "prompt": "Apa arti kata كِتَابَةٌ?",
    "answer": "menulis",
    "hint": "Tema: Hobi. Ucapkan kitabatun sebelum melihat jawaban."
  },
  {
    "id": "hobi-3",
    "arabic": "رِيَاضَةٌ",
    "transliteration": "riyadhatun",
    "meaning": "olahraga",
    "category": "Hobi",
    "example": "كَلِمَةُ الْيَوْمِ: رِيَاضَةٌ",
    "prompt": "Apa arti kata رِيَاضَةٌ?",
    "answer": "olahraga",
    "hint": "Tema: Hobi. Ucapkan riyadhatun sebelum melihat jawaban."
  },
  {
    "id": "hobi-4",
    "arabic": "رَسْمٌ",
    "transliteration": "rasmun",
    "meaning": "menggambar",
    "category": "Hobi",
    "example": "كَلِمَةُ الْيَوْمِ: رَسْمٌ",
    "prompt": "Apa arti kata رَسْمٌ?",
    "answer": "menggambar",
    "hint": "Tema: Hobi. Ucapkan rasmun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik18Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
