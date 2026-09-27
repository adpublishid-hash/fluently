import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-apa-kabar",
  "title": "Istima 11: Apa Kabar",
  "description": "Mendengar tanya kabar dan respons singkat dalam percakapan.",
  "topicNumber": 11,
  "focus": "Tanya kabar",
  "goal": "Dengarkan pertanyaan atau jawaban kabar, lalu tulis makna komunikasinya."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "apa-kabar-1",
    "title": "Tanya kabar",
    "arabic": "كَيْفَ حَالُكَ؟",
    "transliteration": "kayfa haluka?",
    "meaning": "bagaimana kabarmu?",
    "focus": "Pertanyaan kabar",
    "prompt": "Dengarkan. Pertanyaan ini menanyakan apa?",
    "answer": "Menanyakan kabar.",
    "hint": "Kayfa haluka.",
    "keyword": "حَالُكَ"
  },
  {
    "id": "apa-kabar-2",
    "title": "Kabar baik",
    "arabic": "أَنَا بِخَيْرٍ",
    "transliteration": "ana bikhayrin",
    "meaning": "saya baik-baik saja",
    "focus": "Jawaban kabar",
    "prompt": "Dengarkan. Bagaimana keadaan pembicara?",
    "answer": "Baik-baik saja.",
    "hint": "Bi khayr berarti baik.",
    "keyword": "بِخَيْرٍ"
  },
  {
    "id": "apa-kabar-3",
    "title": "Alhamdulillah",
    "arabic": "بِخَيْرٍ، الْحَمْدُ لِلّٰهِ",
    "transliteration": "bikhayrin alhamdu lillah",
    "meaning": "baik, segala puji bagi Allah",
    "focus": "Jawaban kabar",
    "prompt": "Dengarkan. Kata syukur apa yang terdengar?",
    "answer": "الْحَمْدُ لِلّٰهِ.",
    "hint": "Muncul setelah bikhayr.",
    "keyword": "الْحَمْدُ"
  },
  {
    "id": "apa-kabar-4",
    "title": "Saya lelah",
    "arabic": "أَنَا تَعْبَانُ قَلِيلًا",
    "transliteration": "ana tabanu qalilan",
    "meaning": "saya sedikit lelah",
    "focus": "Keadaan",
    "prompt": "Dengarkan. Pembicara merasa apa?",
    "answer": "Sedikit lelah.",
    "hint": "Taban berarti lelah.",
    "keyword": "تَعْبَانُ"
  }
];

export default function ArabicIstimaTopik11Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
