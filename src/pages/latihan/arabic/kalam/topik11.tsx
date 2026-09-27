import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-makanan-dan-minuman",
  "title": "Kalam 11: Makanan dan Minuman",
  "description": "Latihan memesan, menyebut suka, dan meminta makanan sederhana.",
  "topicNumber": 11,
  "focus": "Makanan, minuman, dan permintaan",
  "goal": "Gunakan pola uridu, uhibbu, dan ashrabu dalam percakapan."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "makanan-dan-minuman-1",
    "title": "Saya ingin air",
    "situation": "Meminta minuman",
    "arabic": "أُرِيدُ مَاءً",
    "transliteration": "uridu maan",
    "meaning": "saya ingin air",
    "prompt": "Minta air dengan kalimat sederhana.",
    "modelAnswer": "أُرِيدُ مَاءً",
    "hint": "Uridu berarti saya ingin.",
    "challenge": "Tambahkan min fadlika di akhir."
  },
  {
    "id": "makanan-dan-minuman-2",
    "title": "Saya makan roti",
    "situation": "Menceritakan makanan",
    "arabic": "آكُلُ خُبْزًا",
    "transliteration": "akulu khubzan",
    "meaning": "saya makan roti",
    "prompt": "Katakan kamu makan roti.",
    "modelAnswer": "آكُلُ خُبْزًا",
    "hint": "Khubz berarti roti.",
    "challenge": "Ganti roti dengan nasi: aruzz."
  },
  {
    "id": "makanan-dan-minuman-3",
    "title": "Saya suka teh",
    "situation": "Menyebut minuman favorit",
    "arabic": "أُحِبُّ الشَّايَ",
    "transliteration": "uhibbu ash-shaya",
    "meaning": "saya suka teh",
    "prompt": "Katakan kamu suka teh.",
    "modelAnswer": "أُحِبُّ الشَّايَ",
    "hint": "Uhibbu berarti saya suka.",
    "challenge": "Ganti teh dengan kopi: qahwah."
  },
  {
    "id": "makanan-dan-minuman-4",
    "title": "Makanannya enak",
    "situation": "Memberi komentar makanan",
    "arabic": "الطَّعَامُ لَذِيذٌ",
    "transliteration": "at-taamu ladhidhun",
    "meaning": "makanan itu enak",
    "prompt": "Katakan makanannya enak.",
    "modelAnswer": "الطَّعَامُ لَذِيذٌ",
    "hint": "Ladhidh berarti enak.",
    "challenge": "Ucapkan sebagai pujian setelah makan."
  }
];

export default function ArabicKalamTopik11Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
