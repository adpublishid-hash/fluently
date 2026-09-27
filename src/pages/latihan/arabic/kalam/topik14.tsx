import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-arah-sederhana",
  "title": "Kalam 14: Arah Sederhana",
  "description": "Latihan meminta dan memberi arah kanan, kiri, depan, dan belakang.",
  "topicNumber": 14,
  "focus": "Arah dan lokasi",
  "goal": "Gunakan frasa arah untuk bertanya dan memberi petunjuk sederhana."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "arah-sederhana-1",
    "title": "Di mana masjid",
    "situation": "Bertanya lokasi",
    "arabic": "أَيْنَ الْمَسْجِدُ؟",
    "transliteration": "ayna al-masjidu?",
    "meaning": "di mana masjid?",
    "prompt": "Tanyakan lokasi masjid.",
    "modelAnswer": "أَيْنَ الْمَسْجِدُ؟",
    "hint": "Ayna berarti di mana.",
    "challenge": "Ganti masjid dengan madrasah."
  },
  {
    "id": "arah-sederhana-2",
    "title": "Ke kanan",
    "situation": "Memberi arah",
    "arabic": "اِذْهَبْ إِلَى الْيَمِينِ",
    "transliteration": "idhhab ila al-yamini",
    "meaning": "pergilah ke kanan",
    "prompt": "Katakan pergi ke kanan.",
    "modelAnswer": "اِذْهَبْ إِلَى الْيَمِينِ",
    "hint": "Al-yamin berarti kanan.",
    "challenge": "Ucapkan seperti memberi instruksi jalan."
  },
  {
    "id": "arah-sederhana-3",
    "title": "Ke kiri",
    "situation": "Memberi arah alternatif",
    "arabic": "اِذْهَبْ إِلَى الْيَسَارِ",
    "transliteration": "idhhab ila al-yasari",
    "meaning": "pergilah ke kiri",
    "prompt": "Katakan pergi ke kiri.",
    "modelAnswer": "اِذْهَبْ إِلَى الْيَسَارِ",
    "hint": "Al-yasar berarti kiri.",
    "challenge": "Bandingkan dengan al-yamin."
  },
  {
    "id": "arah-sederhana-4",
    "title": "Di depan rumah",
    "situation": "Menjelaskan lokasi",
    "arabic": "الْمَسْجِدُ أَمَامَ الْبَيْتِ",
    "transliteration": "al-masjidu amama al-bayti",
    "meaning": "masjid di depan rumah",
    "prompt": "Katakan masjid di depan rumah.",
    "modelAnswer": "الْمَسْجِدُ أَمَامَ الْبَيْتِ",
    "hint": "Amama berarti di depan.",
    "challenge": "Ganti amama dengan khalfa."
  }
];

export default function ArabicKalamTopik14Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
