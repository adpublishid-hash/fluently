import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-permintaan-maaf",
  "title": "Kalam 6: Permintaan Maaf",
  "description": "Latihan meminta maaf dan memberi alasan pendek.",
  "topicNumber": 6,
  "focus": "Maaf, alasan, dan respons sopan",
  "goal": "Ucapkan maaf dengan alasan sederhana sesuai situasi."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "permintaan-maaf-1",
    "title": "Maaf",
    "situation": "Melakukan kesalahan kecil",
    "arabic": "آسِفٌ",
    "transliteration": "asifun",
    "meaning": "saya minta maaf",
    "prompt": "Minta maaf secara singkat.",
    "modelAnswer": "آسِفٌ",
    "hint": "Asif untuk laki-laki.",
    "challenge": "Jika kamu perempuan, ucapkan آسِفَةٌ."
  },
  {
    "id": "permintaan-maaf-2",
    "title": "Maaf terlambat",
    "situation": "Datang terlambat ke kelas",
    "arabic": "آسِفٌ، أَنَا مُتَأَخِّرٌ",
    "transliteration": "asifun ana mutaakhirun",
    "meaning": "maaf, saya terlambat",
    "prompt": "Minta maaf karena terlambat.",
    "modelAnswer": "آسِفٌ، أَنَا مُتَأَخِّرٌ",
    "hint": "Mutaakhir berarti terlambat.",
    "challenge": "Tambahkan ya ustadhu di awal jika kepada guru."
  },
  {
    "id": "permintaan-maaf-3",
    "title": "Tidak apa-apa",
    "situation": "Menjawab permintaan maaf",
    "arabic": "لَا بَأْسَ",
    "transliteration": "la basa",
    "meaning": "tidak apa-apa",
    "prompt": "Jawab saat teman meminta maaf.",
    "modelAnswer": "لَا بَأْسَ",
    "hint": "Ungkapan pendek untuk memaklumi.",
    "challenge": "Ucapkan lembut, bukan datar."
  },
  {
    "id": "permintaan-maaf-4",
    "title": "Saya lupa",
    "situation": "Memberi alasan sederhana",
    "arabic": "نَسِيتُ الدَّفْتَرَ",
    "transliteration": "nasitu ad-daftara",
    "meaning": "saya lupa buku tulis",
    "prompt": "Katakan bahwa kamu lupa buku tulis.",
    "modelAnswer": "نَسِيتُ الدَّفْتَرَ",
    "hint": "Nasitu berarti saya lupa.",
    "challenge": "Ucapkan setelah frasa maaf."
  }
];

export default function ArabicKalamTopik6Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
