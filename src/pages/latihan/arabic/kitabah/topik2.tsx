import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-menyalin-kata-berharakat",
  "title": "Kitabah 2: Menyalin Kata Berharakat",
  "description": "Menyalin kata Arab pendek dengan fathah, kasrah, dhammah, dan sukun.",
  "topicNumber": 2,
  "focus": "Harakat dasar dan posisi tanda baca.",
  "goal": "Salin kata berharakat sambil menjaga tanda vokal tetap tepat."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "menyalin-kata-berharakat-1",
    "title": "Fathah",
    "modelText": "قَلَمٌ",
    "transliteration": "qalamun",
    "meaning": "Sebuah pulpen.",
    "focus": "Fathah dan tanwin",
    "prompt": "Salin قَلَمٌ lengkap dengan tanwin dhammah.",
    "answer": "قَلَمٌ",
    "hint": "Tanwin ada di akhir kata.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menyalin-kata-berharakat-2",
    "title": "Kasrah",
    "modelText": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "Sebuah buku.",
    "focus": "Kasrah awal",
    "prompt": "Tulis كِتَابٌ dan pastikan kasrah di bawah kaf.",
    "answer": "كِتَابٌ",
    "hint": "Kasrah berada di bawah huruf.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menyalin-kata-berharakat-3",
    "title": "Dhammah",
    "modelText": "بُيُوتٌ",
    "transliteration": "buyutun",
    "meaning": "Rumah-rumah.",
    "focus": "Dhammah ganda",
    "prompt": "Salin بُيُوتٌ dengan dhammah yang jelas.",
    "answer": "بُيُوتٌ",
    "hint": "Dhammah mirip wawu kecil di atas huruf.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menyalin-kata-berharakat-4",
    "title": "Sukun",
    "modelText": "مَدْرَسَةٌ",
    "transliteration": "madrasatun",
    "meaning": "Sekolah.",
    "focus": "Sukun tengah",
    "prompt": "Tulis مَدْرَسَةٌ dan letakkan sukun di atas dal.",
    "answer": "مَدْرَسَةٌ",
    "hint": "Sukun menandai huruf mati.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik2Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
