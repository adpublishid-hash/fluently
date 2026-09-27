import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-menulis-huruf-sambung",
  "title": "Kitabah 1: Menulis Huruf Sambung",
  "description": "Melatih bentuk huruf Arab ketika berdiri sendiri dan tersambung.",
  "topicNumber": 1,
  "focus": "Bentuk huruf awal, tengah, akhir, dan terpisah.",
  "goal": "Salin kata pendek dan perhatikan perubahan bentuk hurufnya."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "menulis-huruf-sambung-1",
    "title": "Ba Ta Tha",
    "modelText": "بَتَثَ",
    "transliteration": "ba ta tha",
    "meaning": "Rangkaian huruf ba, ta, dan tha.",
    "focus": "Huruf sambung awal",
    "prompt": "Salin rangkaian huruf بَتَثَ tiga kali.",
    "answer": "بَتَثَ",
    "hint": "Perhatikan titik: satu, dua, lalu tiga titik.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-huruf-sambung-2",
    "title": "Jim Ha Kha",
    "modelText": "جَحَخَ",
    "transliteration": "ja ha kha",
    "meaning": "Rangkaian huruf jim, ha, dan kha.",
    "focus": "Huruf tengah",
    "prompt": "Tulis ulang جَحَخَ dan jaga bentuk lengkungnya.",
    "answer": "جَحَخَ",
    "hint": "Jim dan kha punya titik, ha tidak punya titik.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-huruf-sambung-3",
    "title": "Sin Syin",
    "modelText": "سَشَسَ",
    "transliteration": "sa sya sa",
    "meaning": "Latihan sin dan syin.",
    "focus": "Bedakan titik",
    "prompt": "Salin سَشَسَ tanpa mencampur titik syin.",
    "answer": "سَشَسَ",
    "hint": "Syin memiliki tiga titik di atas.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-huruf-sambung-4",
    "title": "Kata pendek",
    "modelText": "كَتَبَ",
    "transliteration": "kataba",
    "meaning": "Dia telah menulis.",
    "focus": "Kata tersambung",
    "prompt": "Salin kata كَتَبَ dengan harakat lengkap.",
    "answer": "كَتَبَ",
    "hint": "Huruf kaf, ta, dan ba tersambung rapi.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik1Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
