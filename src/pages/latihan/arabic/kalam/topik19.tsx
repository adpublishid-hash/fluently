import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-janji-bertemu",
  "title": "Kalam 19: Janji Bertemu",
  "description": "Latihan membuat janji bertemu dengan waktu dan tempat sederhana.",
  "topicNumber": 19,
  "focus": "Janji, tempat, dan waktu",
  "goal": "Susun kalimat janji bertemu memakai mata, ayna, dan ila al-liqa."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "janji-bertemu-1",
    "title": "Kapan bertemu",
    "situation": "Mengatur jadwal",
    "arabic": "مَتَى نَلْتَقِي؟",
    "transliteration": "mata naltaqi?",
    "meaning": "kapan kita bertemu?",
    "prompt": "Tanyakan kapan kalian bertemu.",
    "modelAnswer": "مَتَى نَلْتَقِي؟",
    "hint": "Mata berarti kapan.",
    "challenge": "Ucapkan sebagai pertanyaan natural."
  },
  {
    "id": "janji-bertemu-2",
    "title": "Besok pagi",
    "situation": "Menjawab waktu bertemu",
    "arabic": "نَلْتَقِي غَدًا صَبَاحًا",
    "transliteration": "naltaqi ghadan sabahan",
    "meaning": "kita bertemu besok pagi",
    "prompt": "Katakan kalian bertemu besok pagi.",
    "modelAnswer": "نَلْتَقِي غَدًا صَبَاحًا",
    "hint": "Ghadan berarti besok.",
    "challenge": "Tambahkan insya Allah jika ingin."
  },
  {
    "id": "janji-bertemu-3",
    "title": "Di sekolah",
    "situation": "Menentukan tempat",
    "arabic": "نَلْتَقِي فِي الْمَدْرَسَةِ",
    "transliteration": "naltaqi fi al-madrasati",
    "meaning": "kita bertemu di sekolah",
    "prompt": "Katakan tempat bertemu di sekolah.",
    "modelAnswer": "نَلْتَقِي فِي الْمَدْرَسَةِ",
    "hint": "Fi menunjukkan lokasi.",
    "challenge": "Ganti sekolah dengan masjid."
  },
  {
    "id": "janji-bertemu-4",
    "title": "Sampai jumpa",
    "situation": "Menutup janji",
    "arabic": "إِلَى اللِّقَاءِ غَدًا",
    "transliteration": "ila al-liqa ghadan",
    "meaning": "sampai jumpa besok",
    "prompt": "Tutup percakapan janji bertemu.",
    "modelAnswer": "إِلَى اللِّقَاءِ غَدًا",
    "hint": "Ila al-liqa berarti sampai jumpa.",
    "challenge": "Ucapkan dengan nada yakin."
  }
];

export default function ArabicKalamTopik19Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
