import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-dialog-mini",
  "title": "Kitabah 18: Dialog Mini",
  "description": "Menulis dialog sangat pendek berisi tanya jawab harian.",
  "topicNumber": 18,
  "focus": "Format dialog dua baris dan respons singkat.",
  "goal": "Tulis percakapan Arab pendek dengan pertanyaan dan jawaban."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "dialog-mini-1",
    "title": "Nama",
    "modelText": "مَا اسْمُكَ؟ اِسْمِي عُمَرُ.",
    "transliteration": "ma ismuka? ismi umaru.",
    "meaning": "Siapa namamu? Namaku Umar.",
    "focus": "Dialog nama",
    "prompt": "Tulis dialog mini tentang nama.",
    "answer": "مَا اسْمُكَ؟ اِسْمِي عُمَرُ.",
    "hint": "Pertanyaan dulu, lalu jawaban.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dialog-mini-2",
    "title": "Kabar",
    "modelText": "كَيْفَ حَالُكَ؟ أَنَا بِخَيْرٍ.",
    "transliteration": "kayfa haluka? ana bikhayrin.",
    "meaning": "Bagaimana kabarmu? Saya baik.",
    "focus": "Dialog kabar",
    "prompt": "Tulis dialog mini tentang kabar.",
    "answer": "كَيْفَ حَالُكَ؟ أَنَا بِخَيْرٍ.",
    "hint": "Jawaban pendek cukup.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dialog-mini-3",
    "title": "Asal",
    "modelText": "مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ إِنْدُونِيسِيَا.",
    "transliteration": "min ayna anta? ana min indunisiya.",
    "meaning": "Dari mana kamu? Saya dari Indonesia.",
    "focus": "Dialog asal",
    "prompt": "Tulis dialog mini tentang asal negara.",
    "answer": "مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنْ إِنْدُونِيسِيَا.",
    "hint": "Gunakan مِنْ untuk asal.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "dialog-mini-4",
    "title": "Lokasi buku",
    "modelText": "أَيْنَ الْكِتَابُ؟ الْكِتَابُ عَلَى الطَّاوِلَةِ.",
    "transliteration": "ayna al-kitabu? al-kitabu ala at-tawilati.",
    "meaning": "Di mana buku? Buku di atas meja.",
    "focus": "Dialog lokasi",
    "prompt": "Tulis dialog mini tentang lokasi buku.",
    "answer": "أَيْنَ الْكِتَابُ؟ الْكِتَابُ عَلَى الطَّاوِلَةِ.",
    "hint": "Jawab dengan lokasi lengkap.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik18Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
