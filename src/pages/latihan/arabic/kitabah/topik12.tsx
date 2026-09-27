import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-jawaban-ya-tidak",
  "title": "Kitabah 12: Jawaban Ya/Tidak",
  "description": "Menulis jawaban singkat memakai نعم dan لا.",
  "topicNumber": 12,
  "focus": "Respons afirmasi dan negasi sederhana.",
  "goal": "Tulis jawaban singkat yang sesuai dengan pertanyaan."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "jawaban-ya-tidak-1",
    "title": "Ya saya pelajar",
    "modelText": "نَعَمْ، أَنَا طَالِبٌ",
    "transliteration": "naam ana talibun",
    "meaning": "Ya, saya seorang pelajar.",
    "focus": "Jawaban ya",
    "prompt": "Tulis ya, saya seorang pelajar.",
    "answer": "نَعَمْ، أَنَا طَالِبٌ",
    "hint": "نَعَمْ berarti ya.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jawaban-ya-tidak-2",
    "title": "Tidak saya bukan guru",
    "modelText": "لَا، أَنَا لَسْتُ مُعَلِّمًا",
    "transliteration": "la ana lastu mualliman",
    "meaning": "Tidak, saya bukan guru.",
    "focus": "Jawaban tidak",
    "prompt": "Tulis tidak, saya bukan guru.",
    "answer": "لَا، أَنَا لَسْتُ مُعَلِّمًا",
    "hint": "لَسْتُ berarti saya bukan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jawaban-ya-tidak-3",
    "title": "Ya buku baru",
    "modelText": "نَعَمْ، الْكِتَابُ جَدِيدٌ",
    "transliteration": "naam al-kitabu jadidun",
    "meaning": "Ya, buku itu baru.",
    "focus": "Konfirmasi benda",
    "prompt": "Tulis ya, buku itu baru.",
    "answer": "نَعَمْ، الْكِتَابُ جَدِيدٌ",
    "hint": "Letakkan koma Arab setelah نَعَمْ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jawaban-ya-tidak-4",
    "title": "Tidak rumah jauh",
    "modelText": "لَا، الْبَيْتُ قَرِيبٌ",
    "transliteration": "la al-baytu qaribun",
    "meaning": "Tidak, rumah itu dekat.",
    "focus": "Koreksi informasi",
    "prompt": "Tulis tidak, rumah itu dekat.",
    "answer": "لَا، الْبَيْتُ قَرِيبٌ",
    "hint": "قَرِيبٌ berarti dekat.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik12Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
