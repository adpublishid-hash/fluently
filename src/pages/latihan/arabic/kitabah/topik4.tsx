import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-identitas-diri",
  "title": "Kitabah 4: Menulis Identitas Diri",
  "description": "Menulis nama, asal, status pelajar, dan bahasa yang dipelajari.",
  "topicNumber": 4,
  "focus": "Kalimat identitas diri sangat pendek.",
  "goal": "Susun kalimat Arab sederhana tentang diri sendiri."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "identitas-diri-1",
    "title": "Nama saya",
    "modelText": "اِسْمِي أَحْمَدُ",
    "transliteration": "ismi ahmadu",
    "meaning": "Nama saya Ahmad.",
    "focus": "Nama diri",
    "prompt": "Tulis pola nama saya dengan nama Ahmad.",
    "answer": "اِسْمِي أَحْمَدُ",
    "hint": "Pola: اِسْمِي + nama.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "identitas-diri-2",
    "title": "Saya pelajar",
    "modelText": "أَنَا طَالِبٌ",
    "transliteration": "ana talibun",
    "meaning": "Saya seorang pelajar laki-laki.",
    "focus": "Status diri",
    "prompt": "Tulis kalimat saya seorang pelajar.",
    "answer": "أَنَا طَالِبٌ",
    "hint": "Gunakan أَنَا di awal.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "identitas-diri-3",
    "title": "Asal negara",
    "modelText": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "transliteration": "ana min indunisiya",
    "meaning": "Saya dari Indonesia.",
    "focus": "Asal tempat",
    "prompt": "Tulis kalimat saya dari Indonesia.",
    "answer": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "hint": "Tempat asal muncul setelah مِنْ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "identitas-diri-4",
    "title": "Belajar Arab",
    "modelText": "أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ",
    "transliteration": "adrusu al-lughata al-arabiyyah",
    "meaning": "Saya belajar bahasa Arab.",
    "focus": "Kegiatan belajar",
    "prompt": "Tulis kalimat saya belajar bahasa Arab.",
    "answer": "أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ",
    "hint": "Kata kerja أَدْرُسُ berarti saya belajar.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik4Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
