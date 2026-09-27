import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-belanja",
  "title": "Mufradat 22: Belanja",
  "description": "Kosakata jual beli dan harga.",
  "topicNumber": 22,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema belanja.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "belanja-1",
    "arabic": "شِرَاءٌ",
    "transliteration": "syira un",
    "meaning": "membeli",
    "category": "Belanja",
    "example": "كَلِمَةُ الْيَوْمِ: شِرَاءٌ",
    "prompt": "Apa arti kata شِرَاءٌ?",
    "answer": "membeli",
    "hint": "Tema: Belanja. Ucapkan syira un sebelum melihat jawaban."
  },
  {
    "id": "belanja-2",
    "arabic": "بَيْعٌ",
    "transliteration": "bai'un",
    "meaning": "menjual",
    "category": "Belanja",
    "example": "كَلِمَةُ الْيَوْمِ: بَيْعٌ",
    "prompt": "Apa arti kata بَيْعٌ?",
    "answer": "menjual",
    "hint": "Tema: Belanja. Ucapkan bai'un sebelum melihat jawaban."
  },
  {
    "id": "belanja-3",
    "arabic": "سِعْرٌ",
    "transliteration": "si'run",
    "meaning": "harga",
    "category": "Belanja",
    "example": "كَلِمَةُ الْيَوْمِ: سِعْرٌ",
    "prompt": "Apa arti kata سِعْرٌ?",
    "answer": "harga",
    "hint": "Tema: Belanja. Ucapkan si'run sebelum melihat jawaban."
  },
  {
    "id": "belanja-4",
    "arabic": "نُقُودٌ",
    "transliteration": "nuqudun",
    "meaning": "uang",
    "category": "Belanja",
    "example": "كَلِمَةُ الْيَوْمِ: نُقُودٌ",
    "prompt": "Apa arti kata نُقُودٌ?",
    "answer": "uang",
    "hint": "Tema: Belanja. Ucapkan nuqudun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik22Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
