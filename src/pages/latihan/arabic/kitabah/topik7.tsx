import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-dhamir-dasar",
  "title": "Kitabah 7: Dhamir Dasar",
  "description": "Menulis kalimat pendek memakai kata ganti dasar.",
  "topicNumber": 7,
  "focus": "أنا، أنت، هو، هي dalam kalimat sederhana.",
  "goal": "Gunakan dhamir yang sesuai dengan makna kalimat."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "dhamir-dasar-1",
    "title": "Saya pelajar",
    "modelText": "أَنَا طَالِبٌ",
    "transliteration": "ana talibun",
    "meaning": "Saya seorang pelajar.",
    "focus": "Dhamir saya",
    "prompt": "Tulis saya seorang pelajar.",
    "answer": "أَنَا طَالِبٌ",
    "hint": "أَنَا berarti saya.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dhamir-dasar-2",
    "title": "Kamu guru",
    "modelText": "أَنْتَ مُعَلِّمٌ",
    "transliteration": "anta muallimun",
    "meaning": "Kamu guru laki-laki.",
    "focus": "Dhamir kamu",
    "prompt": "Tulis kamu guru laki-laki.",
    "answer": "أَنْتَ مُعَلِّمٌ",
    "hint": "أَنْتَ untuk kamu laki-laki.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dhamir-dasar-3",
    "title": "Dia laki-laki dokter",
    "modelText": "هُوَ طَبِيبٌ",
    "transliteration": "huwa tabibun",
    "meaning": "Dia seorang dokter laki-laki.",
    "focus": "Dhamir dia laki-laki",
    "prompt": "Tulis dia dokter laki-laki.",
    "answer": "هُوَ طَبِيبٌ",
    "hint": "هُوَ berarti dia laki-laki.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dhamir-dasar-4",
    "title": "Dia perempuan siswi",
    "modelText": "هِيَ طَالِبَةٌ",
    "transliteration": "hiya talibatun",
    "meaning": "Dia seorang siswi.",
    "focus": "Dhamir dia perempuan",
    "prompt": "Tulis dia seorang siswi.",
    "answer": "هِيَ طَالِبَةٌ",
    "hint": "هِيَ berarti dia perempuan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik7Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
