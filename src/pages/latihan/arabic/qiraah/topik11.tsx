import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-pasar-kecil",
  "title": "Qiraah 11: Pasar Kecil",
  "description": "Membaca kalimat jual beli sederhana di pasar.",
  "topicNumber": 11,
  "focus": "Pahami barang, harga, dan tindakan membeli.",
  "goal": "Temukan barang yang dibeli dan informasi harga dalam teks."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "pasar-kecil-1",
    "title": "Membeli apel",
    "passage": "أَشْتَرِي تُفَّاحًا مِنَ السُّوقِ",
    "transliteration": "ashtari tuffahan mina as-suq",
    "meaning": "Saya membeli apel dari pasar.",
    "focus": "Barang belanja",
    "prompt": "Apa yang dibeli?",
    "answer": "Yang dibeli adalah apel.",
    "hint": "تُفَّاحًا berarti apel.",
    "keyword": "تُفَّاحًا",
    "keywordMeaning": "apel"
  },
  {
    "id": "pasar-kecil-2",
    "title": "Harga murah",
    "passage": "هَذَا الْقَمِيصُ رَخِيصٌ",
    "transliteration": "hadha al-qamisu rakhisun",
    "meaning": "Baju ini murah.",
    "focus": "Harga barang",
    "prompt": "Bagaimana harga baju?",
    "answer": "Harga baju murah.",
    "hint": "رَخِيصٌ berarti murah.",
    "keyword": "رَخِيصٌ",
    "keywordMeaning": "murah"
  },
  {
    "id": "pasar-kecil-3",
    "title": "Penjual baik",
    "passage": "الْبَائِعُ طَيِّبٌ وَصَبُورٌ",
    "transliteration": "al-baiu tayyibun wa saburun",
    "meaning": "Penjual itu baik dan sabar.",
    "focus": "Orang di pasar",
    "prompt": "Siapa yang dideskripsikan?",
    "answer": "Yang dideskripsikan adalah penjual.",
    "hint": "الْبَائِعُ berarti penjual.",
    "keyword": "الْبَائِعُ",
    "keywordMeaning": "penjual"
  },
  {
    "id": "pasar-kecil-4",
    "title": "Uang cukup",
    "passage": "مَعِي عَشَرَةُ رِيَالَاتٍ",
    "transliteration": "maiya asharatu riyalatin",
    "meaning": "Saya membawa sepuluh riyal.",
    "focus": "Uang dan jumlah",
    "prompt": "Berapa uang yang dibawa?",
    "answer": "Uangnya sepuluh riyal.",
    "hint": "عَشَرَةُ berarti sepuluh.",
    "keyword": "عَشَرَةُ",
    "keywordMeaning": "sepuluh"
  }
];

export default function ArabicQiraahTopik11Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
