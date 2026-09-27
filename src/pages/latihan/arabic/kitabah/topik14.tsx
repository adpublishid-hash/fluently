import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-deskripsi-warna",
  "title": "Kitabah 14: Deskripsi Warna",
  "description": "Menulis warna benda dengan kesesuaian sederhana.",
  "topicNumber": 14,
  "focus": "Warna sebagai sifat setelah benda.",
  "goal": "Tulis kalimat benda + warna secara rapi."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "deskripsi-warna-1",
    "title": "Pulpen biru",
    "modelText": "الْقَلَمُ أَزْرَقُ",
    "transliteration": "al-qalamu azraqu",
    "meaning": "Pulpen itu biru.",
    "focus": "Warna maskulin",
    "prompt": "Tulis pulpen itu biru.",
    "answer": "الْقَلَمُ أَزْرَقُ",
    "hint": "أَزْرَقُ berarti biru.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "deskripsi-warna-2",
    "title": "Tas hitam",
    "modelText": "الْحَقِيبَةُ سَوْدَاءُ",
    "transliteration": "al-haqibatu sawdau",
    "meaning": "Tas itu hitam.",
    "focus": "Warna feminin",
    "prompt": "Tulis tas itu hitam.",
    "answer": "الْحَقِيبَةُ سَوْدَاءُ",
    "hint": "سَوْدَاءُ berarti hitam.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "deskripsi-warna-3",
    "title": "Buku merah",
    "modelText": "الْكِتَابُ أَحْمَرُ",
    "transliteration": "al-kitabu ahmaru",
    "meaning": "Buku itu merah.",
    "focus": "Warna benda",
    "prompt": "Tulis buku itu merah.",
    "answer": "الْكِتَابُ أَحْمَرُ",
    "hint": "أَحْمَرُ berarti merah.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "deskripsi-warna-4",
    "title": "Papan putih",
    "modelText": "السَّبُّورَةُ بَيْضَاءُ",
    "transliteration": "as-sabburatu baydau",
    "meaning": "Papan tulis itu putih.",
    "focus": "Warna feminin",
    "prompt": "Tulis papan tulis itu putih.",
    "answer": "السَّبُّورَةُ بَيْضَاءُ",
    "hint": "بَيْضَاءُ untuk benda feminin.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik14Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
