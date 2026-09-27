import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-kata-tunjuk",
  "title": "Kitabah 6: Kata Tunjuk",
  "description": "Menulis kalimat dengan هذا dan هذه untuk benda maskulin dan feminin.",
  "topicNumber": 6,
  "focus": "Pemilihan kata tunjuk sesuai jenis kata.",
  "goal": "Pilih kata tunjuk yang tepat lalu tulis kalimat utuh."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "kata-tunjuk-1",
    "title": "Ini buku",
    "modelText": "هَذَا كِتَابٌ",
    "transliteration": "hadha kitabun",
    "meaning": "Ini sebuah buku.",
    "focus": "Kata tunjuk maskulin",
    "prompt": "Tulis ini sebuah buku.",
    "answer": "هَذَا كِتَابٌ",
    "hint": "كِتَابٌ memakai هَذَا.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kata-tunjuk-2",
    "title": "Ini sekolah",
    "modelText": "هَذِهِ مَدْرَسَةٌ",
    "transliteration": "hadhihi madrasatun",
    "meaning": "Ini sebuah sekolah.",
    "focus": "Kata tunjuk feminin",
    "prompt": "Tulis ini sebuah sekolah.",
    "answer": "هَذِهِ مَدْرَسَةٌ",
    "hint": "مَدْرَسَةٌ memakai هَذِهِ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kata-tunjuk-3",
    "title": "Ini pulpen",
    "modelText": "هَذَا قَلَمٌ أَزْرَقُ",
    "transliteration": "hadha qalamun azraqu",
    "meaning": "Ini pulpen biru.",
    "focus": "Tunjuk dan warna",
    "prompt": "Tulis ini pulpen biru.",
    "answer": "هَذَا قَلَمٌ أَزْرَقُ",
    "hint": "Warna muncul setelah benda.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kata-tunjuk-4",
    "title": "Ini tas",
    "modelText": "هَذِهِ حَقِيبَةٌ جَدِيدَةٌ",
    "transliteration": "hadhihi haqibatun jadidatun",
    "meaning": "Ini tas baru.",
    "focus": "Tunjuk feminin",
    "prompt": "Tulis ini tas baru.",
    "answer": "هَذِهِ حَقِيبَةٌ جَدِيدَةٌ",
    "hint": "Gunakan جَدِيدَةٌ untuk tas.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik6Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
