import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-asal-negara",
  "title": "Istima 4: Asal Negara",
  "description": "Mendengar frasa asal negara dan kota dengan pola min.",
  "topicNumber": 4,
  "focus": "Asal tempat",
  "goal": "Tangkap kata tempat setelah مِنْ dan tulis asal pembicara."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "asal-negara-1",
    "title": "Dari Indonesia",
    "arabic": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "transliteration": "ana min indunisiya",
    "meaning": "saya dari Indonesia",
    "focus": "Negara",
    "prompt": "Dengarkan. Pembicara dari mana?",
    "answer": "Indonesia.",
    "hint": "Tempat muncul setelah min.",
    "keyword": "إِنْدُونِيسِيَا"
  },
  {
    "id": "asal-negara-2",
    "title": "Dari Jakarta",
    "arabic": "هُوَ مِنْ جَاكَرْتَا",
    "transliteration": "huwa min jakarta",
    "meaning": "dia dari Jakarta",
    "focus": "Kota",
    "prompt": "Dengarkan. Kota apa yang terdengar?",
    "answer": "Jakarta.",
    "hint": "Kata setelah min adalah kota.",
    "keyword": "جَاكَرْتَا"
  },
  {
    "id": "asal-negara-3",
    "title": "Tanya asal",
    "arabic": "مِنْ أَيْنَ أَنْتَ؟",
    "transliteration": "min ayna anta?",
    "meaning": "dari mana kamu?",
    "focus": "Pertanyaan asal",
    "prompt": "Dengarkan. Ini pertanyaan tentang apa?",
    "answer": "Tentang asal tempat.",
    "hint": "Ada min ayna.",
    "keyword": "أَيْنَ"
  },
  {
    "id": "asal-negara-4",
    "title": "Dari Malaysia",
    "arabic": "هِيَ مِنْ مَالِيزِيَا",
    "transliteration": "hiya min maliziya",
    "meaning": "dia perempuan dari Malaysia",
    "focus": "Negara",
    "prompt": "Dengarkan. Negara apa yang disebut?",
    "answer": "Malaysia.",
    "hint": "Tempat terakhir dalam kalimat.",
    "keyword": "مَالِيزِيَا"
  }
];

export default function ArabicIstimaTopik4Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
