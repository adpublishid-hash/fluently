import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-jumlah-ismiyyah-sederhana",
  "title": "Kitabah 5: Jumlah Ismiyyah Sederhana",
  "description": "Menulis kalimat nominal dasar dengan mubtada dan khabar.",
  "topicNumber": 5,
  "focus": "Pola benda atau orang + keterangan.",
  "goal": "Tulis jumlah ismiyyah pendek dengan susunan yang jelas."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "jumlah-ismiyyah-sederhana-1",
    "title": "Buku baru",
    "modelText": "الْكِتَابُ جَدِيدٌ",
    "transliteration": "al-kitabu jadidun",
    "meaning": "Buku itu baru.",
    "focus": "Mubtada khabar",
    "prompt": "Tulis kalimat buku itu baru.",
    "answer": "الْكِتَابُ جَدِيدٌ",
    "hint": "Benda di awal, sifat setelahnya.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jumlah-ismiyyah-sederhana-2",
    "title": "Rumah besar",
    "modelText": "الْبَيْتُ كَبِيرٌ",
    "transliteration": "al-baytu kabirun",
    "meaning": "Rumah itu besar.",
    "focus": "Sifat ukuran",
    "prompt": "Tulis kalimat rumah itu besar.",
    "answer": "الْبَيْتُ كَبِيرٌ",
    "hint": "Kata كَبِيرٌ berarti besar.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jumlah-ismiyyah-sederhana-3",
    "title": "Guru rajin",
    "modelText": "الْمُعَلِّمُ مُجْتَهِدٌ",
    "transliteration": "al-muallimu mujtahidun",
    "meaning": "Guru itu rajin.",
    "focus": "Sifat orang",
    "prompt": "Tulis kalimat guru itu rajin.",
    "answer": "الْمُعَلِّمُ مُجْتَهِدٌ",
    "hint": "Sifat mengikuti subjek laki-laki.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "jumlah-ismiyyah-sederhana-4",
    "title": "Sekolah dekat",
    "modelText": "الْمَدْرَسَةُ قَرِيبَةٌ",
    "transliteration": "al-madrasatu qaribatun",
    "meaning": "Sekolah itu dekat.",
    "focus": "Sifat feminin",
    "prompt": "Tulis kalimat sekolah itu dekat.",
    "answer": "الْمَدْرَسَةُ قَرِيبَةٌ",
    "hint": "قَرِيبَةٌ dipakai untuk kata feminin.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik5Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
