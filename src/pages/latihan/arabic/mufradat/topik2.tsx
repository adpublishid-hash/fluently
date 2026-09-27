import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-keluarga",
  "title": "Mufradat 2: Keluarga",
  "description": "Kosakata anggota keluarga inti.",
  "topicNumber": 2,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema keluarga.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "keluarga-1",
    "arabic": "أَبٌ",
    "transliteration": "abun",
    "meaning": "ayah",
    "category": "Keluarga",
    "example": "كَلِمَةُ الْيَوْمِ: أَبٌ",
    "prompt": "Apa arti kata أَبٌ?",
    "answer": "ayah",
    "hint": "Tema: Keluarga. Ucapkan abun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-2",
    "arabic": "أُمٌّ",
    "transliteration": "ummun",
    "meaning": "ibu",
    "category": "Keluarga",
    "example": "كَلِمَةُ الْيَوْمِ: أُمٌّ",
    "prompt": "Apa arti kata أُمٌّ?",
    "answer": "ibu",
    "hint": "Tema: Keluarga. Ucapkan ummun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-3",
    "arabic": "أَخٌ",
    "transliteration": "akhun",
    "meaning": "saudara laki-laki",
    "category": "Keluarga",
    "example": "كَلِمَةُ الْيَوْمِ: أَخٌ",
    "prompt": "Apa arti kata أَخٌ?",
    "answer": "saudara laki-laki",
    "hint": "Tema: Keluarga. Ucapkan akhun sebelum melihat jawaban."
  },
  {
    "id": "keluarga-4",
    "arabic": "أُخْتٌ",
    "transliteration": "ukhtun",
    "meaning": "saudara perempuan",
    "category": "Keluarga",
    "example": "كَلِمَةُ الْيَوْمِ: أُخْتٌ",
    "prompt": "Apa arti kata أُخْتٌ?",
    "answer": "saudara perempuan",
    "hint": "Tema: Keluarga. Ucapkan ukhtun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik2Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
