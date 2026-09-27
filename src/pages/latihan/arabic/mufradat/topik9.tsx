import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-hari",
  "title": "Mufradat 9: Hari",
  "description": "Kosakata hari dan penanda waktu mingguan.",
  "topicNumber": 9,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema hari.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "hari-1",
    "arabic": "يَوْمٌ",
    "transliteration": "yaumun",
    "meaning": "hari",
    "category": "Hari",
    "example": "كَلِمَةُ الْيَوْمِ: يَوْمٌ",
    "prompt": "Apa arti kata يَوْمٌ?",
    "answer": "hari",
    "hint": "Tema: Hari. Ucapkan yaumun sebelum melihat jawaban."
  },
  {
    "id": "hari-2",
    "arabic": "السَّبْتُ",
    "transliteration": "as-sabtu",
    "meaning": "Sabtu",
    "category": "Hari",
    "example": "كَلِمَةُ الْيَوْمِ: السَّبْتُ",
    "prompt": "Apa arti kata السَّبْتُ?",
    "answer": "Sabtu",
    "hint": "Tema: Hari. Ucapkan as-sabtu sebelum melihat jawaban."
  },
  {
    "id": "hari-3",
    "arabic": "الأَحَدُ",
    "transliteration": "al-ahadu",
    "meaning": "Ahad",
    "category": "Hari",
    "example": "كَلِمَةُ الْيَوْمِ: الأَحَدُ",
    "prompt": "Apa arti kata الأَحَدُ?",
    "answer": "Ahad",
    "hint": "Tema: Hari. Ucapkan al-ahadu sebelum melihat jawaban."
  },
  {
    "id": "hari-4",
    "arabic": "الجُمُعَةُ",
    "transliteration": "al-jumu'atu",
    "meaning": "Jumat",
    "category": "Hari",
    "example": "كَلِمَةُ الْيَوْمِ: الجُمُعَةُ",
    "prompt": "Apa arti kata الجُمُعَةُ?",
    "answer": "Jumat",
    "hint": "Tema: Hari. Ucapkan al-jumu'atu sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik9Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
