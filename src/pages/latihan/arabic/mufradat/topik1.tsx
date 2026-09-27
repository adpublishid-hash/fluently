import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-salam",
  "title": "Mufradat 1: Salam",
  "description": "Kosakata salam dan sapaan dasar dalam bahasa Arab.",
  "topicNumber": 1,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema salam.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "salam-1",
    "arabic": "السَّلَامُ عَلَيْكُمْ",
    "transliteration": "as-salamu 'alaikum",
    "meaning": "semoga keselamatan atas kalian",
    "category": "Salam",
    "example": "كَلِمَةُ الْيَوْمِ: السَّلَامُ عَلَيْكُمْ",
    "prompt": "Apa arti kata السَّلَامُ عَلَيْكُمْ?",
    "answer": "semoga keselamatan atas kalian",
    "hint": "Tema: Salam. Ucapkan as-salamu 'alaikum sebelum melihat jawaban."
  },
  {
    "id": "salam-2",
    "arabic": "وَعَلَيْكُمُ السَّلَامُ",
    "transliteration": "wa 'alaikumus-salam",
    "meaning": "dan semoga keselamatan atas kalian juga",
    "category": "Salam",
    "example": "كَلِمَةُ الْيَوْمِ: وَعَلَيْكُمُ السَّلَامُ",
    "prompt": "Apa arti kata وَعَلَيْكُمُ السَّلَامُ?",
    "answer": "dan semoga keselamatan atas kalian juga",
    "hint": "Tema: Salam. Ucapkan wa 'alaikumus-salam sebelum melihat jawaban."
  },
  {
    "id": "salam-3",
    "arabic": "مَرْحَبًا",
    "transliteration": "marhaban",
    "meaning": "halo",
    "category": "Salam",
    "example": "كَلِمَةُ الْيَوْمِ: مَرْحَبًا",
    "prompt": "Apa arti kata مَرْحَبًا?",
    "answer": "halo",
    "hint": "Tema: Salam. Ucapkan marhaban sebelum melihat jawaban."
  },
  {
    "id": "salam-4",
    "arabic": "أَهْلًا",
    "transliteration": "ahlan",
    "meaning": "selamat datang",
    "category": "Salam",
    "example": "كَلِمَةُ الْيَوْمِ: أَهْلًا",
    "prompt": "Apa arti kata أَهْلًا?",
    "answer": "selamat datang",
    "hint": "Tema: Salam. Ucapkan ahlan sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik1Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
