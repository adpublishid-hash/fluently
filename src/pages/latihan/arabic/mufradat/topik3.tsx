import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-kelas",
  "title": "Mufradat 3: Kelas",
  "description": "Kosakata benda dan orang di kelas.",
  "topicNumber": 3,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema kelas.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "kelas-1",
    "arabic": "فَصْلٌ",
    "transliteration": "fashlun",
    "meaning": "kelas",
    "category": "Kelas",
    "example": "كَلِمَةُ الْيَوْمِ: فَصْلٌ",
    "prompt": "Apa arti kata فَصْلٌ?",
    "answer": "kelas",
    "hint": "Tema: Kelas. Ucapkan fashlun sebelum melihat jawaban."
  },
  {
    "id": "kelas-2",
    "arabic": "طَالِبٌ",
    "transliteration": "thalibun",
    "meaning": "siswa laki-laki",
    "category": "Kelas",
    "example": "كَلِمَةُ الْيَوْمِ: طَالِبٌ",
    "prompt": "Apa arti kata طَالِبٌ?",
    "answer": "siswa laki-laki",
    "hint": "Tema: Kelas. Ucapkan thalibun sebelum melihat jawaban."
  },
  {
    "id": "kelas-3",
    "arabic": "مُعَلِّمٌ",
    "transliteration": "mu'allimun",
    "meaning": "guru laki-laki",
    "category": "Kelas",
    "example": "كَلِمَةُ الْيَوْمِ: مُعَلِّمٌ",
    "prompt": "Apa arti kata مُعَلِّمٌ?",
    "answer": "guru laki-laki",
    "hint": "Tema: Kelas. Ucapkan mu'allimun sebelum melihat jawaban."
  },
  {
    "id": "kelas-4",
    "arabic": "سَبُّورَةٌ",
    "transliteration": "sabburatun",
    "meaning": "papan tulis",
    "category": "Kelas",
    "example": "كَلِمَةُ الْيَوْمِ: سَبُّورَةٌ",
    "prompt": "Apa arti kata سَبُّورَةٌ?",
    "answer": "papan tulis",
    "hint": "Tema: Kelas. Ucapkan sabburatun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik3Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
