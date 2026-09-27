import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-angka-dalam-kalimat",
  "title": "Kitabah 15: Angka dalam Kalimat",
  "description": "Menulis jumlah benda dengan angka dasar.",
  "topicNumber": 15,
  "focus": "Angka 1-10 dalam kalimat sederhana.",
  "goal": "Tulis angka dan benda dengan urutan yang benar."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "angka-dalam-kalimat-1",
    "title": "Satu buku",
    "modelText": "عِنْدِي كِتَابٌ وَاحِدٌ",
    "transliteration": "indi kitabun wahidun",
    "meaning": "Saya punya satu buku.",
    "focus": "Angka satu",
    "prompt": "Tulis saya punya satu buku.",
    "answer": "عِنْدِي كِتَابٌ وَاحِدٌ",
    "hint": "وَاحِدٌ muncul setelah benda.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "angka-dalam-kalimat-2",
    "title": "Dua pulpen",
    "modelText": "عِنْدِي قَلَمَانِ",
    "transliteration": "indi qalamani",
    "meaning": "Saya punya dua pulpen.",
    "focus": "Angka dua",
    "prompt": "Tulis saya punya dua pulpen.",
    "answer": "عِنْدِي قَلَمَانِ",
    "hint": "Akhiran انِ menunjukkan dua.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "angka-dalam-kalimat-3",
    "title": "Tiga buku",
    "modelText": "عَلَى الطَّاوِلَةِ ثَلَاثَةُ كُتُبٍ",
    "transliteration": "ala at-tawilati thalathatu kutubin",
    "meaning": "Di atas meja ada tiga buku.",
    "focus": "Angka tiga",
    "prompt": "Tulis di atas meja ada tiga buku.",
    "answer": "عَلَى الطَّاوِلَةِ ثَلَاثَةُ كُتُبٍ",
    "hint": "ثَلَاثَةُ berarti tiga.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "angka-dalam-kalimat-4",
    "title": "Lima siswa",
    "modelText": "فِي الْفَصْلِ خَمْسَةُ طُلَّابٍ",
    "transliteration": "fi al-fasli khamsatu tullabin",
    "meaning": "Di kelas ada lima siswa.",
    "focus": "Angka lima",
    "prompt": "Tulis di kelas ada lima siswa.",
    "answer": "فِي الْفَصْلِ خَمْسَةُ طُلَّابٍ",
    "hint": "خَمْسَةُ berarti lima.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik15Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
