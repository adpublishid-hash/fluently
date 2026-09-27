import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-berbelanja-ringan",
  "title": "Kalam 15: Berbelanja Ringan",
  "description": "Latihan bertanya harga, meminta barang, dan menutup transaksi.",
  "topicNumber": 15,
  "focus": "Belanja, harga, dan permintaan",
  "goal": "Buat percakapan belanja sederhana dengan frasa pendek."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "berbelanja-ringan-1",
    "title": "Berapa harga ini",
    "situation": "Menanyakan harga barang",
    "arabic": "بِكَمْ هَذَا؟",
    "transliteration": "bikam hadha?",
    "meaning": "berapa harga ini?",
    "prompt": "Tanyakan harga sebuah barang.",
    "modelAnswer": "بِكَمْ هَذَا؟",
    "hint": "Bikam berarti berapa harga.",
    "challenge": "Tunjuk benda nyata saat mengucapkan."
  },
  {
    "id": "berbelanja-ringan-2",
    "title": "Saya ingin apel",
    "situation": "Meminta barang di pasar",
    "arabic": "أُرِيدُ تُفَّاحًا",
    "transliteration": "uridu tuffahan",
    "meaning": "saya ingin apel",
    "prompt": "Katakan kamu ingin apel.",
    "modelAnswer": "أُرِيدُ تُفَّاحًا",
    "hint": "Tuffah berarti apel.",
    "challenge": "Ganti apel dengan air atau roti."
  },
  {
    "id": "berbelanja-ringan-3",
    "title": "Ini mahal",
    "situation": "Merespons harga",
    "arabic": "هَذَا غَالٍ",
    "transliteration": "hadha ghalin",
    "meaning": "ini mahal",
    "prompt": "Katakan barang ini mahal.",
    "modelAnswer": "هَذَا غَالٍ",
    "hint": "Ghalin berarti mahal.",
    "challenge": "Ucapkan dengan ekspresi heran."
  },
  {
    "id": "berbelanja-ringan-4",
    "title": "Saya ambil ini",
    "situation": "Memutuskan membeli",
    "arabic": "آخُذُ هَذَا",
    "transliteration": "akhudhu hadha",
    "meaning": "saya ambil ini",
    "prompt": "Katakan kamu mengambil barang ini.",
    "modelAnswer": "آخُذُ هَذَا",
    "hint": "Akhudhu berarti saya mengambil.",
    "challenge": "Tambahkan shukran setelahnya."
  }
];

export default function ArabicKalamTopik15Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
