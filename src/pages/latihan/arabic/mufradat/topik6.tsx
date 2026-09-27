import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-warna",
  "title": "Mufradat 6: Warna",
  "description": "Kosakata warna paling sering digunakan.",
  "topicNumber": 6,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema warna.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "warna-1",
    "arabic": "أَبْيَضُ",
    "transliteration": "abyadhu",
    "meaning": "putih",
    "category": "Warna",
    "example": "كَلِمَةُ الْيَوْمِ: أَبْيَضُ",
    "prompt": "Apa arti kata أَبْيَضُ?",
    "answer": "putih",
    "hint": "Tema: Warna. Ucapkan abyadhu sebelum melihat jawaban."
  },
  {
    "id": "warna-2",
    "arabic": "أَسْوَدُ",
    "transliteration": "aswadu",
    "meaning": "hitam",
    "category": "Warna",
    "example": "كَلِمَةُ الْيَوْمِ: أَسْوَدُ",
    "prompt": "Apa arti kata أَسْوَدُ?",
    "answer": "hitam",
    "hint": "Tema: Warna. Ucapkan aswadu sebelum melihat jawaban."
  },
  {
    "id": "warna-3",
    "arabic": "أَحْمَرُ",
    "transliteration": "ahmaru",
    "meaning": "merah",
    "category": "Warna",
    "example": "كَلِمَةُ الْيَوْمِ: أَحْمَرُ",
    "prompt": "Apa arti kata أَحْمَرُ?",
    "answer": "merah",
    "hint": "Tema: Warna. Ucapkan ahmaru sebelum melihat jawaban."
  },
  {
    "id": "warna-4",
    "arabic": "أَزْرَقُ",
    "transliteration": "azraqu",
    "meaning": "biru",
    "category": "Warna",
    "example": "كَلِمَةُ الْيَوْمِ: أَزْرَقُ",
    "prompt": "Apa arti kata أَزْرَقُ?",
    "answer": "biru",
    "hint": "Tema: Warna. Ucapkan azraqu sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik6Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
