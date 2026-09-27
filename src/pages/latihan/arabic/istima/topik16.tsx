import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-arah-sederhana",
  "title": "Istima 16: Arah Sederhana",
  "description": "Menangkap arah kanan, kiri, depan, dan belakang.",
  "topicNumber": 16,
  "focus": "Arah dan posisi",
  "goal": "Dengarkan instruksi arah dan tulis arah yang diminta."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "arah-sederhana-1",
    "title": "Ke kanan",
    "arabic": "اِذْهَبْ إِلَى الْيَمِينِ",
    "transliteration": "idhhab ila al-yamini",
    "meaning": "pergilah ke kanan",
    "focus": "Arah",
    "prompt": "Dengarkan. Ke arah mana?",
    "answer": "Ke kanan.",
    "hint": "Al-yamin berarti kanan.",
    "keyword": "الْيَمِينِ"
  },
  {
    "id": "arah-sederhana-2",
    "title": "Ke kiri",
    "arabic": "اِذْهَبْ إِلَى الْيَسَارِ",
    "transliteration": "idhhab ila al-yasari",
    "meaning": "pergilah ke kiri",
    "focus": "Arah",
    "prompt": "Dengarkan. Ke arah mana?",
    "answer": "Ke kiri.",
    "hint": "Al-yasar berarti kiri.",
    "keyword": "الْيَسَارِ"
  },
  {
    "id": "arah-sederhana-3",
    "title": "Di depan",
    "arabic": "الْمَدْرَسَةُ أَمَامَ الْبَيْتِ",
    "transliteration": "al-madrasatu amama al-bayti",
    "meaning": "sekolah di depan rumah",
    "focus": "Posisi",
    "prompt": "Dengarkan. Sekolah berada di mana?",
    "answer": "Di depan rumah.",
    "hint": "Amama berarti di depan.",
    "keyword": "أَمَامَ"
  },
  {
    "id": "arah-sederhana-4",
    "title": "Di belakang",
    "arabic": "الْحَدِيقَةُ خَلْفَ الْمَسْجِدِ",
    "transliteration": "al-hadiqatu khalfa al-masjidi",
    "meaning": "taman di belakang masjid",
    "focus": "Posisi",
    "prompt": "Dengarkan. Taman berada di mana?",
    "answer": "Di belakang masjid.",
    "hint": "Khalfa berarti di belakang.",
    "keyword": "خَلْفَ"
  }
];

export default function ArabicIstimaTopik16Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
