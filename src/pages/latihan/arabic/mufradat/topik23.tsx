import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-alat-tulis",
  "title": "Mufradat 23: Alat Tulis",
  "description": "Kosakata perlengkapan belajar.",
  "topicNumber": 23,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema alat tulis.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "alat-tulis-1",
    "arabic": "قَلَمٌ",
    "transliteration": "qalamun",
    "meaning": "pulpen",
    "category": "Alat Tulis",
    "example": "كَلِمَةُ الْيَوْمِ: قَلَمٌ",
    "prompt": "Apa arti kata قَلَمٌ?",
    "answer": "pulpen",
    "hint": "Tema: Alat Tulis. Ucapkan qalamun sebelum melihat jawaban."
  },
  {
    "id": "alat-tulis-2",
    "arabic": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "buku",
    "category": "Alat Tulis",
    "example": "كَلِمَةُ الْيَوْمِ: كِتَابٌ",
    "prompt": "Apa arti kata كِتَابٌ?",
    "answer": "buku",
    "hint": "Tema: Alat Tulis. Ucapkan kitabun sebelum melihat jawaban."
  },
  {
    "id": "alat-tulis-3",
    "arabic": "دَفْتَرٌ",
    "transliteration": "daftarun",
    "meaning": "buku tulis",
    "category": "Alat Tulis",
    "example": "كَلِمَةُ الْيَوْمِ: دَفْتَرٌ",
    "prompt": "Apa arti kata دَفْتَرٌ?",
    "answer": "buku tulis",
    "hint": "Tema: Alat Tulis. Ucapkan daftarun sebelum melihat jawaban."
  },
  {
    "id": "alat-tulis-4",
    "arabic": "مِمْحَاةٌ",
    "transliteration": "mimhatun",
    "meaning": "penghapus",
    "category": "Alat Tulis",
    "example": "كَلِمَةُ الْيَوْمِ: مِمْحَاةٌ",
    "prompt": "Apa arti kata مِمْحَاةٌ?",
    "answer": "penghapus",
    "hint": "Tema: Alat Tulis. Ucapkan mimhatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik23Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
