import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-benda-di-kelas",
  "title": "Kitabah 8: Benda di Kelas",
  "description": "Menulis kalimat tentang benda kelas dan posisinya.",
  "topicNumber": 8,
  "focus": "Kosakata kelas dan kata depan dasar.",
  "goal": "Tulis kalimat lokasi benda dengan في dan على."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "benda-di-kelas-1",
    "title": "Pulpen di tas",
    "modelText": "الْقَلَمُ فِي الْحَقِيبَةِ",
    "transliteration": "al-qalamu fi al-haqibati",
    "meaning": "Pulpen di dalam tas.",
    "focus": "Lokasi dalam",
    "prompt": "Tulis pulpen di dalam tas.",
    "answer": "الْقَلَمُ فِي الْحَقِيبَةِ",
    "hint": "فِي berarti di dalam.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "benda-di-kelas-2",
    "title": "Buku di meja",
    "modelText": "الْكِتَابُ عَلَى الطَّاوِلَةِ",
    "transliteration": "al-kitabu ala at-tawilati",
    "meaning": "Buku di atas meja.",
    "focus": "Lokasi atas",
    "prompt": "Tulis buku di atas meja.",
    "answer": "الْكِتَابُ عَلَى الطَّاوِلَةِ",
    "hint": "عَلَى berarti di atas.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "benda-di-kelas-3",
    "title": "Papan tulis besar",
    "modelText": "السَّبُّورَةُ كَبِيرَةٌ",
    "transliteration": "as-sabburatu kabiratun",
    "meaning": "Papan tulis itu besar.",
    "focus": "Benda kelas",
    "prompt": "Tulis papan tulis itu besar.",
    "answer": "السَّبُّورَةُ كَبِيرَةٌ",
    "hint": "Gunakan sifat feminin كَبِيرَةٌ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "benda-di-kelas-4",
    "title": "Kursi di kelas",
    "modelText": "الْكُرْسِيُّ فِي الْفَصْلِ",
    "transliteration": "al-kursiyyu fi al-fasli",
    "meaning": "Kursi berada di kelas.",
    "focus": "Lokasi kelas",
    "prompt": "Tulis kursi berada di kelas.",
    "answer": "الْكُرْسِيُّ فِي الْفَصْلِ",
    "hint": "الْفَصْلِ berarti kelas.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik8Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
