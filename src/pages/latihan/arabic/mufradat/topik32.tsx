import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kesehatan",
  "title": "Mufradat 32: Kesehatan",
  "description": "Kosakata kesehatan dasar.",
  "topicNumber": 32,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kesehatan.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kesehatan-1",
    "arabic": "صِحَّةٌ",
    "transliteration": "shihhatun",
    "meaning": "kesehatan",
    "category": "Kesehatan",
    "example": "كَلِمَةُ الْيَوْمِ: صِحَّةٌ",
    "prompt": "Apa arti kata صِحَّةٌ?",
    "answer": "kesehatan",
    "hint": "Tema: Kesehatan. Ucapkan shihhatun sebelum melihat jawaban."
  },
  {
    "id": "kesehatan-2",
    "arabic": "مَرَضٌ",
    "transliteration": "maradhun",
    "meaning": "sakit",
    "category": "Kesehatan",
    "example": "كَلِمَةُ الْيَوْمِ: مَرَضٌ",
    "prompt": "Apa arti kata مَرَضٌ?",
    "answer": "sakit",
    "hint": "Tema: Kesehatan. Ucapkan maradhun sebelum melihat jawaban."
  },
  {
    "id": "kesehatan-3",
    "arabic": "دَوَاءٌ",
    "transliteration": "dawa un",
    "meaning": "obat",
    "category": "Kesehatan",
    "example": "كَلِمَةُ الْيَوْمِ: دَوَاءٌ",
    "prompt": "Apa arti kata دَوَاءٌ?",
    "answer": "obat",
    "hint": "Tema: Kesehatan. Ucapkan dawa un sebelum melihat jawaban."
  },
  {
    "id": "kesehatan-4",
    "arabic": "أَلَمٌ",
    "transliteration": "alamun",
    "meaning": "nyeri",
    "category": "Kesehatan",
    "example": "كَلِمَةُ الْيَوْمِ: أَلَمٌ",
    "prompt": "Apa arti kata أَلَمٌ?",
    "answer": "nyeri",
    "hint": "Tema: Kesehatan. Ucapkan alamun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik32Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
