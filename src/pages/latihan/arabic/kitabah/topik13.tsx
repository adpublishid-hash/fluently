import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-preposisi-dasar",
  "title": "Kitabah 13: Preposisi Dasar",
  "description": "Menulis kalimat dengan في، على، من، إلى.",
  "topicNumber": 13,
  "focus": "Huruf jar untuk lokasi dan arah.",
  "goal": "Gunakan preposisi Arab yang tepat dalam kalimat pendek."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "preposisi-dasar-1",
    "title": "Di rumah",
    "modelText": "أَنَا فِي الْبَيْتِ",
    "transliteration": "ana fi al-bayti",
    "meaning": "Saya di rumah.",
    "focus": "في lokasi",
    "prompt": "Tulis saya di rumah.",
    "answer": "أَنَا فِي الْبَيْتِ",
    "hint": "Kata setelah فِي berharakat kasrah.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "preposisi-dasar-2",
    "title": "Di atas meja",
    "modelText": "الْقَلَمُ عَلَى الطَّاوِلَةِ",
    "transliteration": "al-qalamu ala at-tawilati",
    "meaning": "Pulpen di atas meja.",
    "focus": "على posisi",
    "prompt": "Tulis pulpen di atas meja.",
    "answer": "الْقَلَمُ عَلَى الطَّاوِلَةِ",
    "hint": "عَلَى berarti di atas.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "preposisi-dasar-3",
    "title": "Dari sekolah",
    "modelText": "أَرْجِعُ مِنَ الْمَدْرَسَةِ",
    "transliteration": "arjiu mina al-madrasati",
    "meaning": "Saya pulang dari sekolah.",
    "focus": "من asal",
    "prompt": "Tulis saya pulang dari sekolah.",
    "answer": "أَرْجِعُ مِنَ الْمَدْرَسَةِ",
    "hint": "مِنَ berarti dari.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "preposisi-dasar-4",
    "title": "Ke masjid",
    "modelText": "أَذْهَبُ إِلَى الْمَسْجِدِ",
    "transliteration": "adhhabu ila al-masjidi",
    "meaning": "Saya pergi ke masjid.",
    "focus": "إلى tujuan",
    "prompt": "Tulis saya pergi ke masjid.",
    "answer": "أَذْهَبُ إِلَى الْمَسْجِدِ",
    "hint": "إِلَى berarti ke.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik13Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
