import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-aktivitas-malam",
  "title": "Mufradat 35: Aktivitas Malam",
  "description": "Kosakata rutinitas malam.",
  "topicNumber": 35,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema aktivitas malam.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "aktivitas-malam-1",
    "arabic": "نَامَ",
    "transliteration": "nama",
    "meaning": "dia tidur",
    "category": "Aktivitas Malam",
    "example": "كَلِمَةُ الْيَوْمِ: نَامَ",
    "prompt": "Apa arti kata نَامَ?",
    "answer": "dia tidur",
    "hint": "Tema: Aktivitas Malam. Ucapkan nama sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-malam-2",
    "arabic": "عَشَاءٌ",
    "transliteration": "'asya un",
    "meaning": "makan malam",
    "category": "Aktivitas Malam",
    "example": "كَلِمَةُ الْيَوْمِ: عَشَاءٌ",
    "prompt": "Apa arti kata عَشَاءٌ?",
    "answer": "makan malam",
    "hint": "Tema: Aktivitas Malam. Ucapkan 'asya un sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-malam-3",
    "arabic": "رَجَعَ",
    "transliteration": "raja'a",
    "meaning": "dia kembali",
    "category": "Aktivitas Malam",
    "example": "كَلِمَةُ الْيَوْمِ: رَجَعَ",
    "prompt": "Apa arti kata رَجَعَ?",
    "answer": "dia kembali",
    "hint": "Tema: Aktivitas Malam. Ucapkan raja'a sebelum melihat jawaban."
  },
  {
    "id": "aktivitas-malam-4",
    "arabic": "اِسْتَرَاحَ",
    "transliteration": "istaraha",
    "meaning": "dia beristirahat",
    "category": "Aktivitas Malam",
    "example": "كَلِمَةُ الْيَوْمِ: اِسْتَرَاحَ",
    "prompt": "Apa arti kata اِسْتَرَاحَ?",
    "answer": "dia beristirahat",
    "hint": "Tema: Aktivitas Malam. Ucapkan istaraha sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik35Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
