import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-keluarga-besar",
  "title": "Mufradat 33: Keluarga Besar",
  "description": "Kosakata kerabat dalam keluarga besar.",
  "topicNumber": 33,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema keluarga besar.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "keluarga-besar-1",
    "arabic": "جَدٌّ",
    "transliteration": "jaddun",
    "meaning": "kakek",
    "category": "Keluarga Besar",
    "example": "كَلِمَةُ الْيَوْمِ: جَدٌّ",
    "prompt": "Apa arti kata جَدٌّ?",
    "answer": "kakek",
    "hint": "Tema: Keluarga Besar. Ucapkan jaddun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-besar-2",
    "arabic": "جَدَّةٌ",
    "transliteration": "jaddatun",
    "meaning": "nenek",
    "category": "Keluarga Besar",
    "example": "كَلِمَةُ الْيَوْمِ: جَدَّةٌ",
    "prompt": "Apa arti kata جَدَّةٌ?",
    "answer": "nenek",
    "hint": "Tema: Keluarga Besar. Ucapkan jaddatun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-besar-3",
    "arabic": "عَمٌّ",
    "transliteration": "'ammun",
    "meaning": "paman dari ayah",
    "category": "Keluarga Besar",
    "example": "كَلِمَةُ الْيَوْمِ: عَمٌّ",
    "prompt": "Apa arti kata عَمٌّ?",
    "answer": "paman dari ayah",
    "hint": "Tema: Keluarga Besar. Ucapkan 'ammun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-besar-4",
    "arabic": "خَالٌ",
    "transliteration": "khalun",
    "meaning": "paman dari ibu",
    "category": "Keluarga Besar",
    "example": "كَلِمَةُ الْيَوْمِ: خَالٌ",
    "prompt": "Apa arti kata خَالٌ?",
    "answer": "paman dari ibu",
    "hint": "Tema: Keluarga Besar. Ucapkan khalun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik33Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
