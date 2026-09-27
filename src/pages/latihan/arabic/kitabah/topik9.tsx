import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-keluarga-saya",
  "title": "Kitabah 9: Keluarga Saya",
  "description": "Menulis kalimat pendek tentang anggota keluarga.",
  "topicNumber": 9,
  "focus": "Kosakata keluarga dan sifat sederhana.",
  "goal": "Susun kalimat keluarga dengan arti yang jelas."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "keluarga-saya-1",
    "title": "Ayah guru",
    "modelText": "أَبِي مُعَلِّمٌ",
    "transliteration": "abi muallimun",
    "meaning": "Ayahku guru.",
    "focus": "Anggota keluarga",
    "prompt": "Tulis ayahku guru.",
    "answer": "أَبِي مُعَلِّمٌ",
    "hint": "أَبِي berarti ayahku.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "keluarga-saya-2",
    "title": "Ibu dokter",
    "modelText": "أُمِّي طَبِيبَةٌ",
    "transliteration": "ummi tabibatun",
    "meaning": "Ibuku dokter.",
    "focus": "Profesi keluarga",
    "prompt": "Tulis ibuku dokter perempuan.",
    "answer": "أُمِّي طَبِيبَةٌ",
    "hint": "أُمِّي berarti ibuku.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "keluarga-saya-3",
    "title": "Saudaraku kecil",
    "modelText": "أَخِي صَغِيرٌ",
    "transliteration": "akhi saghirun",
    "meaning": "Saudaraku kecil.",
    "focus": "Sifat keluarga",
    "prompt": "Tulis saudaraku kecil.",
    "answer": "أَخِي صَغِيرٌ",
    "hint": "أَخِي berarti saudaraku laki-laki.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "keluarga-saya-4",
    "title": "Saudariku rajin",
    "modelText": "أُخْتِي مُجْتَهِدَةٌ",
    "transliteration": "ukhti mujtahidatun",
    "meaning": "Saudariku rajin.",
    "focus": "Sifat feminin",
    "prompt": "Tulis saudariku rajin.",
    "answer": "أُخْتِي مُجْتَهِدَةٌ",
    "hint": "Gunakan مُجْتَهِدَةٌ untuk perempuan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik9Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
