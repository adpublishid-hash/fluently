import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-ungkapan-sopan",
  "title": "Mufradat 39: Ungkapan Sopan",
  "description": "Frasa sopan untuk percakapan harian.",
  "topicNumber": 39,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema ungkapan sopan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "ungkapan-sopan-1",
    "arabic": "مِنْ فَضْلِكَ",
    "transliteration": "min fadhlika",
    "meaning": "tolong",
    "category": "Ungkapan Sopan",
    "example": "كَلِمَةُ الْيَوْمِ: مِنْ فَضْلِكَ",
    "prompt": "Apa arti kata مِنْ فَضْلِكَ?",
    "answer": "tolong",
    "hint": "Tema: Ungkapan Sopan. Ucapkan min fadhlika sebelum melihat jawaban."
  },
  {
    "id": "ungkapan-sopan-2",
    "arabic": "شُكْرًا",
    "transliteration": "syukran",
    "meaning": "terima kasih",
    "category": "Ungkapan Sopan",
    "example": "كَلِمَةُ الْيَوْمِ: شُكْرًا",
    "prompt": "Apa arti kata شُكْرًا?",
    "answer": "terima kasih",
    "hint": "Tema: Ungkapan Sopan. Ucapkan syukran sebelum melihat jawaban."
  },
  {
    "id": "ungkapan-sopan-3",
    "arabic": "عَفْوًا",
    "transliteration": "'afwan",
    "meaning": "maaf atau sama-sama",
    "category": "Ungkapan Sopan",
    "example": "كَلِمَةُ الْيَوْمِ: عَفْوًا",
    "prompt": "Apa arti kata عَفْوًا?",
    "answer": "maaf atau sama-sama",
    "hint": "Tema: Ungkapan Sopan. Ucapkan 'afwan sebelum melihat jawaban."
  },
  {
    "id": "ungkapan-sopan-4",
    "arabic": "تَفَضَّلْ",
    "transliteration": "tafadhdhal",
    "meaning": "silakan",
    "category": "Ungkapan Sopan",
    "example": "كَلِمَةُ الْيَوْمِ: تَفَضَّلْ",
    "prompt": "Apa arti kata تَفَضَّلْ?",
    "answer": "silakan",
    "hint": "Tema: Ungkapan Sopan. Ucapkan tafadhdhal sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik39Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
