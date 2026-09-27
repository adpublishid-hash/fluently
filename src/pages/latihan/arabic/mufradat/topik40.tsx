import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-review-mufradat",
  "title": "Mufradat 40: Review Mufradat",
  "description": "Review kosakata inti dari beberapa topik awal.",
  "topicNumber": 40,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema review mufradat.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "review-mufradat-1",
    "arabic": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "buku",
    "category": "Review Mufradat",
    "example": "كَلِمَةُ الْيَوْمِ: كِتَابٌ",
    "prompt": "Apa arti kata كِتَابٌ?",
    "answer": "buku",
    "hint": "Tema: Review Mufradat. Ucapkan kitabun sebelum melihat jawaban."
  },
  {
    "id": "review-mufradat-2",
    "arabic": "بَيْتٌ",
    "transliteration": "baitun",
    "meaning": "rumah",
    "category": "Review Mufradat",
    "example": "كَلِمَةُ الْيَوْمِ: بَيْتٌ",
    "prompt": "Apa arti kata بَيْتٌ?",
    "answer": "rumah",
    "hint": "Tema: Review Mufradat. Ucapkan baitun sebelum melihat jawaban."
  },
  {
    "id": "review-mufradat-3",
    "arabic": "مَدْرَسَةٌ",
    "transliteration": "madrasatun",
    "meaning": "sekolah",
    "category": "Review Mufradat",
    "example": "كَلِمَةُ الْيَوْمِ: مَدْرَسَةٌ",
    "prompt": "Apa arti kata مَدْرَسَةٌ?",
    "answer": "sekolah",
    "hint": "Tema: Review Mufradat. Ucapkan madrasatun sebelum melihat jawaban."
  },
  {
    "id": "review-mufradat-4",
    "arabic": "شُكْرًا",
    "transliteration": "syukran",
    "meaning": "terima kasih",
    "category": "Review Mufradat",
    "example": "كَلِمَةُ الْيَوْمِ: شُكْرًا",
    "prompt": "Apa arti kata شُكْرًا?",
    "answer": "terima kasih",
    "hint": "Tema: Review Mufradat. Ucapkan syukran sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik40Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
