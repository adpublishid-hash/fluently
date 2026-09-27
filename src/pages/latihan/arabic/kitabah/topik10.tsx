import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-rutinitas-pagi",
  "title": "Kitabah 10: Rutinitas Pagi",
  "description": "Menulis kegiatan pagi dengan kata kerja sederhana.",
  "topicNumber": 10,
  "focus": "Kata kerja orang pertama dan keterangan waktu.",
  "goal": "Tulis urutan rutinitas pagi dalam kalimat pendek."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "rutinitas-pagi-1",
    "title": "Saya bangun",
    "modelText": "أَسْتَيْقِظُ صَبَاحًا",
    "transliteration": "astayqizhu sabahan",
    "meaning": "Saya bangun pada pagi hari.",
    "focus": "Kegiatan pagi",
    "prompt": "Tulis saya bangun pagi.",
    "answer": "أَسْتَيْقِظُ صَبَاحًا",
    "hint": "صَبَاحًا berarti pada pagi hari.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "rutinitas-pagi-2",
    "title": "Saya berwudu",
    "modelText": "أَتَوَضَّأُ قَبْلَ الصَّلَاةِ",
    "transliteration": "atawaddau qabla as-salati",
    "meaning": "Saya berwudu sebelum salat.",
    "focus": "Rutinitas ibadah",
    "prompt": "Tulis saya berwudu sebelum salat.",
    "answer": "أَتَوَضَّأُ قَبْلَ الصَّلَاةِ",
    "hint": "قَبْلَ berarti sebelum.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "rutinitas-pagi-3",
    "title": "Saya sarapan",
    "modelText": "أَتَنَاوَلُ الْفُطُورَ",
    "transliteration": "atanawalu al-futura",
    "meaning": "Saya sarapan.",
    "focus": "Kegiatan makan",
    "prompt": "Tulis saya sarapan.",
    "answer": "أَتَنَاوَلُ الْفُطُورَ",
    "hint": "الْفُطُورَ berarti sarapan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "rutinitas-pagi-4",
    "title": "Saya pergi sekolah",
    "modelText": "أَذْهَبُ إِلَى الْمَدْرَسَةِ",
    "transliteration": "adhhabu ila al-madrasati",
    "meaning": "Saya pergi ke sekolah.",
    "focus": "Tujuan pagi",
    "prompt": "Tulis saya pergi ke sekolah.",
    "answer": "أَذْهَبُ إِلَى الْمَدْرَسَةِ",
    "hint": "إِلَى menunjukkan tujuan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik10Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
