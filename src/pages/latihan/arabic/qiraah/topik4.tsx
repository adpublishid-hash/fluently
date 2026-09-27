import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-keluarga",
  "title": "Qiraah 4: Keluarga",
  "description": "Membaca kalimat tentang anggota keluarga dekat.",
  "topicNumber": 4,
  "focus": "Kenali anggota keluarga dan sifat singkatnya.",
  "goal": "Baca teks keluarga lalu jawab siapa dan bagaimana sifatnya."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "keluarga-1",
    "title": "Ayah bekerja",
    "passage": "أَبِي مُهَنْدِسٌ مَاهِرٌ",
    "transliteration": "abi muhandisun mahirun",
    "meaning": "Ayahku seorang insinyur yang terampil.",
    "focus": "Anggota keluarga",
    "prompt": "Siapa yang dibicarakan?",
    "answer": "Yang dibicarakan adalah ayah, yaitu أَبِي.",
    "hint": "أَبِي berarti ayahku.",
    "keyword": "أَبِي",
    "keywordMeaning": "ayahku"
  },
  {
    "id": "keluarga-2",
    "title": "Ibu baik",
    "passage": "أُمِّي طَبِيبَةٌ رَحِيمَةٌ",
    "transliteration": "ummi tabibatun rahimatun",
    "meaning": "Ibuku dokter yang penyayang.",
    "focus": "Profesi keluarga",
    "prompt": "Apa profesi ibu?",
    "answer": "Profesi ibu adalah dokter, yaitu طَبِيبَةٌ.",
    "hint": "Cari kata profesi setelah أُمِّي.",
    "keyword": "طَبِيبَةٌ",
    "keywordMeaning": "dokter perempuan"
  },
  {
    "id": "keluarga-3",
    "title": "Saudara kecil",
    "passage": "أَخِي صَغِيرٌ وَنَشِيطٌ",
    "transliteration": "akhi saghirun wa nashitun",
    "meaning": "Saudaraku kecil dan aktif.",
    "focus": "Sifat keluarga",
    "prompt": "Sebutkan satu sifat saudara.",
    "answer": "Salah satu sifatnya kecil atau aktif.",
    "hint": "Kata sifat muncul setelah أَخِي.",
    "keyword": "صَغِيرٌ",
    "keywordMeaning": "kecil"
  },
  {
    "id": "keluarga-4",
    "title": "Saudari rajin",
    "passage": "أُخْتِي طَالِبَةٌ مُجْتَهِدَةٌ",
    "transliteration": "ukhti talibatun mujtahidatun",
    "meaning": "Saudariku siswi yang rajin.",
    "focus": "Sifat pelajar",
    "prompt": "Apa sifat saudari dalam teks?",
    "answer": "Saudarinya rajin, yaitu مُجْتَهِدَةٌ.",
    "hint": "Kata terakhir menunjukkan sifat.",
    "keyword": "مُجْتَهِدَةٌ",
    "keywordMeaning": "rajin"
  }
];

export default function ArabicQiraahTopik4Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
