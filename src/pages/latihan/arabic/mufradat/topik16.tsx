import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-hewan",
  "title": "Mufradat 16: Hewan",
  "description": "Kosakata hewan yang sering dikenalkan.",
  "topicNumber": 16,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema hewan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "hewan-1",
    "arabic": "قِطٌّ",
    "transliteration": "qiththun",
    "meaning": "kucing",
    "category": "Hewan",
    "example": "كَلِمَةُ الْيَوْمِ: قِطٌّ",
    "prompt": "Apa arti kata قِطٌّ?",
    "answer": "kucing",
    "hint": "Tema: Hewan. Ucapkan qiththun sebelum melihat jawaban."
  },
  {
    "id": "hewan-2",
    "arabic": "كَلْبٌ",
    "transliteration": "kalbun",
    "meaning": "anjing",
    "category": "Hewan",
    "example": "كَلِمَةُ الْيَوْمِ: كَلْبٌ",
    "prompt": "Apa arti kata كَلْبٌ?",
    "answer": "anjing",
    "hint": "Tema: Hewan. Ucapkan kalbun sebelum melihat jawaban."
  },
  {
    "id": "hewan-3",
    "arabic": "طَيْرٌ",
    "transliteration": "thairun",
    "meaning": "burung",
    "category": "Hewan",
    "example": "كَلِمَةُ الْيَوْمِ: طَيْرٌ",
    "prompt": "Apa arti kata طَيْرٌ?",
    "answer": "burung",
    "hint": "Tema: Hewan. Ucapkan thairun sebelum melihat jawaban."
  },
  {
    "id": "hewan-4",
    "arabic": "حِصَانٌ",
    "transliteration": "hishanun",
    "meaning": "kuda",
    "category": "Hewan",
    "example": "كَلِمَةُ الْيَوْمِ: حِصَانٌ",
    "prompt": "Apa arti kata حِصَانٌ?",
    "answer": "kuda",
    "hint": "Tema: Hewan. Ucapkan hishanun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik16Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
