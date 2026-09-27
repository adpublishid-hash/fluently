import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-tempat-umum",
  "title": "Mufradat 14: Tempat Umum",
  "description": "Kosakata lokasi umum di sekitar kota.",
  "topicNumber": 14,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema tempat umum.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "tempat-umum-1",
    "arabic": "مَسْجِدٌ",
    "transliteration": "masjidun",
    "meaning": "masjid",
    "category": "Tempat Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مَسْجِدٌ",
    "prompt": "Apa arti kata مَسْجِدٌ?",
    "answer": "masjid",
    "hint": "Tema: Tempat Umum. Ucapkan masjidun sebelum melihat jawaban."
  },
  {
    "id": "tempat-umum-2",
    "arabic": "مَدْرَسَةٌ",
    "transliteration": "madrasatun",
    "meaning": "sekolah",
    "category": "Tempat Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مَدْرَسَةٌ",
    "prompt": "Apa arti kata مَدْرَسَةٌ?",
    "answer": "sekolah",
    "hint": "Tema: Tempat Umum. Ucapkan madrasatun sebelum melihat jawaban."
  },
  {
    "id": "tempat-umum-3",
    "arabic": "سُوقٌ",
    "transliteration": "suqun",
    "meaning": "pasar",
    "category": "Tempat Umum",
    "example": "كَلِمَةُ الْيَوْمِ: سُوقٌ",
    "prompt": "Apa arti kata سُوقٌ?",
    "answer": "pasar",
    "hint": "Tema: Tempat Umum. Ucapkan suqun sebelum melihat jawaban."
  },
  {
    "id": "tempat-umum-4",
    "arabic": "مُسْتَشْفَى",
    "transliteration": "mustasyfa",
    "meaning": "rumah sakit",
    "category": "Tempat Umum",
    "example": "كَلِمَةُ الْيَوْمِ: مُسْتَشْفَى",
    "prompt": "Apa arti kata مُسْتَشْفَى?",
    "answer": "rumah sakit",
    "hint": "Tema: Tempat Umum. Ucapkan mustasyfa sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik14Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
