import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-sekolah",
  "title": "Mufradat 28: Sekolah",
  "description": "Kosakata kegiatan dan elemen sekolah.",
  "topicNumber": 28,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema sekolah.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "sekolah-1",
    "arabic": "دَرْسٌ",
    "transliteration": "darsun",
    "meaning": "pelajaran",
    "category": "Sekolah",
    "example": "كَلِمَةُ الْيَوْمِ: دَرْسٌ",
    "prompt": "Apa arti kata دَرْسٌ?",
    "answer": "pelajaran",
    "hint": "Tema: Sekolah. Ucapkan darsun sebelum melihat jawaban."
  },
  {
    "id": "sekolah-2",
    "arabic": "وَاجِبٌ",
    "transliteration": "wajibun",
    "meaning": "tugas",
    "category": "Sekolah",
    "example": "كَلِمَةُ الْيَوْمِ: وَاجِبٌ",
    "prompt": "Apa arti kata وَاجِبٌ?",
    "answer": "tugas",
    "hint": "Tema: Sekolah. Ucapkan wajibun sebelum melihat jawaban."
  },
  {
    "id": "sekolah-3",
    "arabic": "اِمْتِحَانٌ",
    "transliteration": "imtihanun",
    "meaning": "ujian",
    "category": "Sekolah",
    "example": "كَلِمَةُ الْيَوْمِ: اِمْتِحَانٌ",
    "prompt": "Apa arti kata اِمْتِحَانٌ?",
    "answer": "ujian",
    "hint": "Tema: Sekolah. Ucapkan imtihanun sebelum melihat jawaban."
  },
  {
    "id": "sekolah-4",
    "arabic": "مَادَّةٌ",
    "transliteration": "maddatun",
    "meaning": "mata pelajaran",
    "category": "Sekolah",
    "example": "كَلِمَةُ الْيَوْمِ: مَادَّةٌ",
    "prompt": "Apa arti kata مَادَّةٌ?",
    "answer": "mata pelajaran",
    "hint": "Tema: Sekolah. Ucapkan maddatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik28Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
