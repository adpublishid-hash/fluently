import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-makanan-minuman",
  "title": "Istima 10: Makanan dan Minuman",
  "description": "Mendengar pilihan makanan dan minuman dalam kalimat harian.",
  "topicNumber": 10,
  "focus": "Makanan dan minuman",
  "goal": "Tangkap kata makanan atau minuman yang disebut dalam audio."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "makanan-minuman-1",
    "title": "Saya makan roti",
    "arabic": "أَنَا آكُلُ خُبْزًا",
    "transliteration": "ana akulu khubzan",
    "meaning": "saya makan roti",
    "focus": "Makanan",
    "prompt": "Dengarkan. Apa yang dimakan?",
    "answer": "Roti.",
    "hint": "Khubz berarti roti.",
    "keyword": "خُبْزًا"
  },
  {
    "id": "makanan-minuman-2",
    "title": "Saya minum air",
    "arabic": "أَشْرَبُ مَاءً",
    "transliteration": "ashrabu maan",
    "meaning": "saya minum air",
    "focus": "Minuman",
    "prompt": "Dengarkan. Apa yang diminum?",
    "answer": "Air.",
    "hint": "Maa berarti air.",
    "keyword": "مَاءً"
  },
  {
    "id": "makanan-minuman-3",
    "title": "Teh panas",
    "arabic": "الشَّايُ سَاخِنٌ",
    "transliteration": "ash-shayu sakhinun",
    "meaning": "teh itu panas",
    "focus": "Minuman",
    "prompt": "Dengarkan. Minuman apa yang disebut?",
    "answer": "Teh.",
    "hint": "Kata pertama adalah ash-shay.",
    "keyword": "الشَّايُ"
  },
  {
    "id": "makanan-minuman-4",
    "title": "Nasi enak",
    "arabic": "الأَرُزُّ لَذِيذٌ",
    "transliteration": "al-aruzzu ladhidhun",
    "meaning": "nasi itu enak",
    "focus": "Makanan",
    "prompt": "Dengarkan. Makanan apa yang disebut?",
    "answer": "Nasi.",
    "hint": "Al-aruzz berarti nasi.",
    "keyword": "الأَرُزُّ"
  }
];

export default function ArabicIstimaTopik10Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
