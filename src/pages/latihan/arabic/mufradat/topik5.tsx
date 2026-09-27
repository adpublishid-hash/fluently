import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-angka-1-20",
  "title": "Mufradat 5: Angka 1-20",
  "description": "Kosakata angka dasar untuk hitungan awal.",
  "topicNumber": 5,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema angka 1-20.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "angka-1-20-1",
    "arabic": "وَاحِدٌ",
    "transliteration": "wahidun",
    "meaning": "satu",
    "category": "Angka 1-20",
    "example": "كَلِمَةُ الْيَوْمِ: وَاحِدٌ",
    "prompt": "Apa arti kata وَاحِدٌ?",
    "answer": "satu",
    "hint": "Tema: Angka 1-20. Ucapkan wahidun sebelum melihat jawaban."
  },
  {
    "id": "angka-1-20-2",
    "arabic": "اِثْنَانِ",
    "transliteration": "itsnani",
    "meaning": "dua",
    "category": "Angka 1-20",
    "example": "كَلِمَةُ الْيَوْمِ: اِثْنَانِ",
    "prompt": "Apa arti kata اِثْنَانِ?",
    "answer": "dua",
    "hint": "Tema: Angka 1-20. Ucapkan itsnani sebelum melihat jawaban."
  },
  {
    "id": "angka-1-20-3",
    "arabic": "ثَلَاثَةٌ",
    "transliteration": "tsalatsatun",
    "meaning": "tiga",
    "category": "Angka 1-20",
    "example": "كَلِمَةُ الْيَوْمِ: ثَلَاثَةٌ",
    "prompt": "Apa arti kata ثَلَاثَةٌ?",
    "answer": "tiga",
    "hint": "Tema: Angka 1-20. Ucapkan tsalatsatun sebelum melihat jawaban."
  },
  {
    "id": "angka-1-20-4",
    "arabic": "عِشْرُونَ",
    "transliteration": "'isyruna",
    "meaning": "dua puluh",
    "category": "Angka 1-20",
    "example": "كَلِمَةُ الْيَوْمِ: عِشْرُونَ",
    "prompt": "Apa arti kata عِشْرُونَ?",
    "answer": "dua puluh",
    "hint": "Tema: Angka 1-20. Ucapkan 'isyruna sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik5Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
