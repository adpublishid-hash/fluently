import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-warna-terdengar",
  "title": "Istima 8: Warna Terdengar",
  "description": "Menangkap nama warna saat mendengar deskripsi benda.",
  "topicNumber": 8,
  "focus": "Warna dasar",
  "goal": "Dengarkan warna dalam kalimat, lalu tulis benda dan warnanya."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "warna-terdengar-1",
    "title": "Pulpen biru",
    "arabic": "الْقَلَمُ أَزْرَقُ",
    "transliteration": "al-qalamu azraqu",
    "meaning": "pulpen itu biru",
    "focus": "Warna",
    "prompt": "Dengarkan. Apa warna pulpen?",
    "answer": "Biru.",
    "hint": "Azraq berarti biru.",
    "keyword": "أَزْرَقُ"
  },
  {
    "id": "warna-terdengar-2",
    "title": "Buku merah",
    "arabic": "الْكِتَابُ أَحْمَرُ",
    "transliteration": "al-kitabu ahmaru",
    "meaning": "buku itu merah",
    "focus": "Warna",
    "prompt": "Dengarkan. Apa warna buku?",
    "answer": "Merah.",
    "hint": "Ahmar berarti merah.",
    "keyword": "أَحْمَرُ"
  },
  {
    "id": "warna-terdengar-3",
    "title": "Tas hitam",
    "arabic": "الْحَقِيبَةُ سَوْدَاءُ",
    "transliteration": "al-haqibatu sawdau",
    "meaning": "tas itu hitam",
    "focus": "Warna",
    "prompt": "Dengarkan. Benda apa yang hitam?",
    "answer": "Tas.",
    "hint": "Benda disebut di awal.",
    "keyword": "الْحَقِيبَةُ"
  },
  {
    "id": "warna-terdengar-4",
    "title": "Papan putih",
    "arabic": "السَّبُّورَةُ بَيْضَاءُ",
    "transliteration": "as-sabburatu baydau",
    "meaning": "papan tulis itu putih",
    "focus": "Warna",
    "prompt": "Dengarkan. Warna apa yang terdengar?",
    "answer": "Putih.",
    "hint": "Bayda berarti putih untuk muannats.",
    "keyword": "بَيْضَاءُ"
  }
];

export default function ArabicIstimaTopik8Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
