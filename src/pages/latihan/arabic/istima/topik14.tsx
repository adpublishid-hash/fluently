import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-keluarga-terdengar",
  "title": "Istima 14: Keluarga Terdengar",
  "description": "Menangkap sebutan anggota keluarga dalam kalimat pendek.",
  "topicNumber": 14,
  "focus": "Anggota keluarga",
  "goal": "Dengarkan kata keluarga dan tulis siapa yang disebut."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "keluarga-terdengar-1",
    "title": "Ayah",
    "arabic": "أَبِي مُدَرِّسٌ",
    "transliteration": "abi mudarrisun",
    "meaning": "ayahku guru",
    "focus": "Keluarga",
    "prompt": "Dengarkan. Siapa yang menjadi guru?",
    "answer": "Ayahku.",
    "hint": "Abi berarti ayahku.",
    "keyword": "أَبِي"
  },
  {
    "id": "keluarga-terdengar-2",
    "title": "Ibu",
    "arabic": "أُمِّي فِي الْبَيْتِ",
    "transliteration": "ummi fi al-bayti",
    "meaning": "ibuku di rumah",
    "focus": "Keluarga",
    "prompt": "Dengarkan. Siapa di rumah?",
    "answer": "Ibuku.",
    "hint": "Ummi berarti ibuku.",
    "keyword": "أُمِّي"
  },
  {
    "id": "keluarga-terdengar-3",
    "title": "Saudara laki-laki",
    "arabic": "أَخِي طَالِبٌ",
    "transliteration": "akhi talibun",
    "meaning": "saudara laki-lakiku pelajar",
    "focus": "Keluarga",
    "prompt": "Dengarkan. Siapa yang pelajar?",
    "answer": "Saudara laki-lakiku.",
    "hint": "Akhi berarti saudaraku laki-laki.",
    "keyword": "أَخِي"
  },
  {
    "id": "keluarga-terdengar-4",
    "title": "Saudari",
    "arabic": "أُخْتِي طَبِيبَةٌ",
    "transliteration": "ukhti tabibatun",
    "meaning": "saudariku dokter perempuan",
    "focus": "Keluarga",
    "prompt": "Dengarkan. Profesi saudarinya apa?",
    "answer": "Dokter perempuan.",
    "hint": "Tabibah berarti dokter perempuan.",
    "keyword": "طَبِيبَةٌ"
  }
];

export default function ArabicIstimaTopik14Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
