import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-paragraf-3-kalimat",
  "title": "Kitabah 17: Paragraf 3 Kalimat",
  "description": "Menulis paragraf mini berisi tiga kalimat terhubung.",
  "topicNumber": 17,
  "focus": "Kalimat berurutan tentang satu topik.",
  "goal": "Gabungkan tiga kalimat pendek menjadi paragraf sederhana."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "paragraf-3-kalimat-1",
    "title": "Tentang diri",
    "modelText": "اِسْمِي عَلِيٌّ. أَنَا طَالِبٌ. أَدْرُسُ الْعَرَبِيَّةَ.",
    "transliteration": "ismi aliyyun. ana talibun. adrusu al-arabiyyah.",
    "meaning": "Namaku Ali. Saya pelajar. Saya belajar bahasa Arab.",
    "focus": "Paragraf identitas",
    "prompt": "Tulis paragraf tiga kalimat tentang Ali.",
    "answer": "اِسْمِي عَلِيٌّ. أَنَا طَالِبٌ. أَدْرُسُ الْعَرَبِيَّةَ.",
    "hint": "Pisahkan tiap kalimat dengan titik.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "paragraf-3-kalimat-2",
    "title": "Tentang keluarga",
    "modelText": "أُسْرَتِي صَغِيرَةٌ. أَبِي مُعَلِّمٌ. أُمِّي طَبِيبَةٌ.",
    "transliteration": "usrati saghiratun. abi muallimun. ummi tabibatun.",
    "meaning": "Keluargaku kecil. Ayahku guru. Ibuku dokter.",
    "focus": "Paragraf keluarga",
    "prompt": "Tulis paragraf tiga kalimat tentang keluarga.",
    "answer": "أُسْرَتِي صَغِيرَةٌ. أَبِي مُعَلِّمٌ. أُمِّي طَبِيبَةٌ.",
    "hint": "Mulai dengan topik keluarga.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "paragraf-3-kalimat-3",
    "title": "Tentang sekolah",
    "modelText": "مَدْرَسَتِي كَبِيرَةٌ. فِي الْفَصْلِ طُلَّابٌ. نَدْرُسُ كُلَّ يَوْمٍ.",
    "transliteration": "madrasati kabiratun. fi al-fasli tullabun. nadrusu kulla yawmin.",
    "meaning": "Sekolahku besar. Di kelas ada siswa. Kami belajar setiap hari.",
    "focus": "Paragraf sekolah",
    "prompt": "Tulis paragraf tiga kalimat tentang sekolah.",
    "answer": "مَدْرَسَتِي كَبِيرَةٌ. فِي الْفَصْلِ طُلَّابٌ. نَدْرُسُ كُلَّ يَوْمٍ.",
    "hint": "Gunakan satu tema yang sama.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "paragraf-3-kalimat-4",
    "title": "Tentang rumah",
    "modelText": "بَيْتِي جَمِيلٌ. فِي بَيْتِي غُرْفَةٌ. أَجْلِسُ مَعَ أُسْرَتِي.",
    "transliteration": "bayti jamilun. fi bayti ghurfatun. ajlisu maa usrati.",
    "meaning": "Rumahku indah. Di rumahku ada kamar. Saya duduk bersama keluargaku.",
    "focus": "Paragraf rumah",
    "prompt": "Tulis paragraf tiga kalimat tentang rumah.",
    "answer": "بَيْتِي جَمِيلٌ. فِي بَيْتِي غُرْفَةٌ. أَجْلِسُ مَعَ أُسْرَتِي.",
    "hint": "Ulang kata kunci boleh untuk pemula.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik17Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
