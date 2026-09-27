import { ArabicMufradatPracticePage, type ArabicMufradatDrill, type ArabicMufradatTopicMaterial } from '../../components/ArabicMufradatPracticePage';

const material: ArabicMufradatTopicMaterial = {
  "id": "arabic-mufradat-profesi",
  "title": "Mufradat 15: Profesi",
  "description": "Kosakata pekerjaan dasar.",
  "topicNumber": 15,
  "focus": "Hafalkan arti, pelafalan, dan penggunaan kosakata tema profesi.",
  "goal": "Kenali kata Arab, ucapkan dengan jelas, lalu tulis arti atau contoh pemakaiannya."
};

const drills: ArabicMufradatDrill[] = [
  {
    "id": "profesi-1",
    "arabic": "طَبِيبٌ",
    "transliteration": "thabibun",
    "meaning": "dokter",
    "category": "Profesi",
    "example": "كَلِمَةُ الْيَوْمِ: طَبِيبٌ",
    "prompt": "Apa arti kata طَبِيبٌ?",
    "answer": "dokter",
    "hint": "Tema: Profesi. Ucapkan thabibun sebelum melihat jawaban."
  },
  {
    "id": "profesi-2",
    "arabic": "مُدَرِّسٌ",
    "transliteration": "mudarrisun",
    "meaning": "pengajar",
    "category": "Profesi",
    "example": "كَلِمَةُ الْيَوْمِ: مُدَرِّسٌ",
    "prompt": "Apa arti kata مُدَرِّسٌ?",
    "answer": "pengajar",
    "hint": "Tema: Profesi. Ucapkan mudarrisun sebelum melihat jawaban."
  },
  {
    "id": "profesi-3",
    "arabic": "مُهَنْدِسٌ",
    "transliteration": "muhandisun",
    "meaning": "insinyur",
    "category": "Profesi",
    "example": "كَلِمَةُ الْيَوْمِ: مُهَنْدِسٌ",
    "prompt": "Apa arti kata مُهَنْدِسٌ?",
    "answer": "insinyur",
    "hint": "Tema: Profesi. Ucapkan muhandisun sebelum melihat jawaban."
  },
  {
    "id": "profesi-4",
    "arabic": "تَاجِرٌ",
    "transliteration": "tajirun",
    "meaning": "pedagang",
    "category": "Profesi",
    "example": "كَلِمَةُ الْيَوْمِ: تَاجِرٌ",
    "prompt": "Apa arti kata تَاجِرٌ?",
    "answer": "pedagang",
    "hint": "Tema: Profesi. Ucapkan tajirun sebelum melihat jawaban."
  }
];

export default function ArabicMufradatTopik15Page() {
  return <ArabicMufradatPracticePage material={material} drills={drills} />;
}
