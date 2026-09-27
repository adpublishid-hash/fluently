import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-menanyakan-kabar",
  "title": "Kalam 4: Menanyakan Kabar",
  "description": "Latihan tanya kabar dan memberi jawaban singkat yang natural.",
  "topicNumber": 4,
  "focus": "Kabar, keadaan, dan respons pendek",
  "goal": "Tanya kabar lalu jawab dengan pilihan keadaan yang sesuai."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "menanyakan-kabar-1",
    "title": "Apa kabar laki-laki",
    "situation": "Menanyakan kabar teman laki-laki",
    "arabic": "كَيْفَ حَالُكَ؟",
    "transliteration": "kayfa haluka?",
    "meaning": "bagaimana kabarmu?",
    "prompt": "Tanyakan kabar kepada teman laki-laki.",
    "modelAnswer": "كَيْفَ حَالُكَ؟",
    "hint": "Haluka untuk lawan bicara laki-laki.",
    "challenge": "Ucapkan dengan intonasi ramah."
  },
  {
    "id": "menanyakan-kabar-2",
    "title": "Apa kabar perempuan",
    "situation": "Menanyakan kabar teman perempuan",
    "arabic": "كَيْفَ حَالُكِ؟",
    "transliteration": "kayfa haluki?",
    "meaning": "bagaimana kabarmu?",
    "prompt": "Tanyakan kabar kepada teman perempuan.",
    "modelAnswer": "كَيْفَ حَالُكِ؟",
    "hint": "Haluki untuk lawan bicara perempuan.",
    "challenge": "Bedakan bunyi ka dan ki."
  },
  {
    "id": "menanyakan-kabar-3",
    "title": "Jawab baik",
    "situation": "Menjawab kabar",
    "arabic": "أَنَا بِخَيْرٍ، الْحَمْدُ لِلّٰهِ",
    "transliteration": "ana bikhayrin alhamdu lillah",
    "meaning": "saya baik, segala puji bagi Allah",
    "prompt": "Jawab bahwa kabarmu baik.",
    "modelAnswer": "أَنَا بِخَيْرٍ، الْحَمْدُ لِلّٰهِ",
    "hint": "Bi khayr berarti baik.",
    "challenge": "Ucapkan dalam satu napas pendek."
  },
  {
    "id": "menanyakan-kabar-4",
    "title": "Jawab lelah",
    "situation": "Menjawab keadaan kurang fit",
    "arabic": "أَنَا تَعْبَانُ قَلِيلًا",
    "transliteration": "ana tabanu qalilan",
    "meaning": "saya sedikit lelah",
    "prompt": "Jawab bahwa kamu sedikit lelah.",
    "modelAnswer": "أَنَا تَعْبَانُ قَلِيلًا",
    "hint": "Taban berarti lelah.",
    "challenge": "Ganti qalilan dengan jiddan jika sangat lelah."
  }
];

export default function ArabicKalamTopik4Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
