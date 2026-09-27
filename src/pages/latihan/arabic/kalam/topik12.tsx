import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-angka-sederhana",
  "title": "Kalam 12: Angka Sederhana",
  "description": "Latihan memakai angka dalam percakapan harian.",
  "topicNumber": 12,
  "focus": "Angka dasar dan jumlah benda",
  "goal": "Sebutkan jumlah benda atau nomor sederhana dengan percaya diri."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "angka-sederhana-1",
    "title": "Satu buku",
    "situation": "Menghitung benda",
    "arabic": "عِنْدِي كِتَابٌ وَاحِدٌ",
    "transliteration": "indi kitabun wahidun",
    "meaning": "saya punya satu buku",
    "prompt": "Katakan kamu punya satu buku.",
    "modelAnswer": "عِنْدِي كِتَابٌ وَاحِدٌ",
    "hint": "Wahid berarti satu.",
    "challenge": "Ganti buku dengan pulpen."
  },
  {
    "id": "angka-sederhana-2",
    "title": "Dua pulpen",
    "situation": "Menghitung alat tulis",
    "arabic": "عِنْدِي قَلَمَانِ",
    "transliteration": "indi qalamani",
    "meaning": "saya punya dua pulpen",
    "prompt": "Katakan kamu punya dua pulpen.",
    "modelAnswer": "عِنْدِي قَلَمَانِ",
    "hint": "Qalamani berarti dua pulpen.",
    "challenge": "Ulangi qalamani sampai lancar."
  },
  {
    "id": "angka-sederhana-3",
    "title": "Tiga teman",
    "situation": "Menyebut jumlah teman",
    "arabic": "عِنْدِي ثَلَاثَةُ أَصْدِقَاءَ",
    "transliteration": "indi thalathatu asdiqaa",
    "meaning": "saya punya tiga teman",
    "prompt": "Katakan kamu punya tiga teman.",
    "modelAnswer": "عِنْدِي ثَلَاثَةُ أَصْدِقَاءَ",
    "hint": "Thalathah berarti tiga.",
    "challenge": "Ganti angka dengan empat: arbaah."
  },
  {
    "id": "angka-sederhana-4",
    "title": "Nomor saya",
    "situation": "Memberi nomor sederhana",
    "arabic": "رَقْمِي خَمْسَةٌ",
    "transliteration": "raqmi khamsatun",
    "meaning": "nomor saya lima",
    "prompt": "Sebutkan nomor lima sebagai contoh.",
    "modelAnswer": "رَقْمِي خَمْسَةٌ",
    "hint": "Khamsah berarti lima.",
    "challenge": "Ganti lima dengan angka favoritmu."
  }
];

export default function ArabicKalamTopik12Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
