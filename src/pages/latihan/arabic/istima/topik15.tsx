import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-hobi-terdengar",
  "title": "Istima 15: Hobi Terdengar",
  "description": "Mendengar aktivitas hobi dan kesukaan sederhana.",
  "topicNumber": 15,
  "focus": "Hobi dan kegiatan",
  "goal": "Tangkap hobi atau aktivitas yang disukai dari audio."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "hobi-terdengar-1",
    "title": "Membaca",
    "arabic": "أُحِبُّ الْقِرَاءَةَ",
    "transliteration": "uhibbu al-qiraah",
    "meaning": "saya suka membaca",
    "focus": "Hobi",
    "prompt": "Dengarkan. Apa hobi yang disukai?",
    "answer": "Membaca.",
    "hint": "Al-qiraah berarti membaca.",
    "keyword": "الْقِرَاءَةَ"
  },
  {
    "id": "hobi-terdengar-2",
    "title": "Sepak bola",
    "arabic": "أَلْعَبُ كُرَةَ الْقَدَمِ",
    "transliteration": "alabu kurata al-qadami",
    "meaning": "saya bermain sepak bola",
    "focus": "Hobi",
    "prompt": "Dengarkan. Olahraga apa yang disebut?",
    "answer": "Sepak bola.",
    "hint": "Kurah al-qadam.",
    "keyword": "كُرَةَ الْقَدَمِ"
  },
  {
    "id": "hobi-terdengar-3",
    "title": "Menulis",
    "arabic": "هِوَايَتِي الْكِتَابَةُ",
    "transliteration": "hiwayati al-kitabah",
    "meaning": "hobiku menulis",
    "focus": "Hobi",
    "prompt": "Dengarkan. Apa hobinya?",
    "answer": "Menulis.",
    "hint": "Al-kitabah berarti menulis.",
    "keyword": "الْكِتَابَةُ"
  },
  {
    "id": "hobi-terdengar-4",
    "title": "Menggambar",
    "arabic": "أُحِبُّ الرَّسْمَ",
    "transliteration": "uhibbu ar-rasma",
    "meaning": "saya suka menggambar",
    "focus": "Hobi",
    "prompt": "Dengarkan. Aktivitas apa yang disukai?",
    "answer": "Menggambar.",
    "hint": "Ar-rasm berarti menggambar.",
    "keyword": "الرَّسْمَ"
  }
];

export default function ArabicIstimaTopik15Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
