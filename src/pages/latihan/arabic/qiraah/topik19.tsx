import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-undangan-pendek",
  "title": "Qiraah 19: Undangan Pendek",
  "description": "Membaca undangan sederhana, waktu, tempat, dan ajakan.",
  "topicNumber": 19,
  "focus": "Pahami siapa, kapan, dan di mana acara berlangsung.",
  "goal": "Temukan detail penting dari teks undangan pendek."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "undangan-pendek-1",
    "title": "Undangan makan",
    "passage": "أَدْعُوكَ إِلَى الطَّعَامِ فِي بَيْتِي",
    "transliteration": "aduka ila at-taami fi bayti",
    "meaning": "Saya mengundangmu makan di rumahku.",
    "focus": "Ajakan makan",
    "prompt": "Ke mana orang itu diundang?",
    "answer": "Dia diundang makan di rumah pembicara.",
    "hint": "أَدْعُوكَ berarti aku mengundangmu.",
    "keyword": "أَدْعُوكَ",
    "keywordMeaning": "aku mengundangmu"
  },
  {
    "id": "undangan-pendek-2",
    "title": "Waktu acara",
    "passage": "الْحَفْلَةُ يَوْمَ الْجُمُعَةِ",
    "transliteration": "al-haflatu yawma al-jumuati",
    "meaning": "Pesta itu pada hari Jumat.",
    "focus": "Hari acara",
    "prompt": "Kapan pesta berlangsung?",
    "answer": "Pesta berlangsung pada hari Jumat.",
    "hint": "يَوْمَ الْجُمُعَةِ berarti hari Jumat.",
    "keyword": "الْجُمُعَةِ",
    "keywordMeaning": "Jumat"
  },
  {
    "id": "undangan-pendek-3",
    "title": "Tempat bertemu",
    "passage": "نَلْتَقِي أَمَامَ الْمَسْجِدِ",
    "transliteration": "naltaqi amama al-masjidi",
    "meaning": "Kita bertemu di depan masjid.",
    "focus": "Tempat pertemuan",
    "prompt": "Di mana mereka bertemu?",
    "answer": "Mereka bertemu di depan masjid.",
    "hint": "أَمَامَ berarti di depan.",
    "keyword": "نَلْتَقِي",
    "keywordMeaning": "kita bertemu"
  },
  {
    "id": "undangan-pendek-4",
    "title": "Balasan hadir",
    "passage": "نَعَمْ، أَحْضُرُ إِنْ شَاءَ اللّٰهُ",
    "transliteration": "naam ahduru in shaa allah",
    "meaning": "Ya, saya hadir insya Allah.",
    "focus": "Respons undangan",
    "prompt": "Apakah orang itu akan hadir?",
    "answer": "Ya, dia akan hadir insya Allah.",
    "hint": "نَعَمْ berarti ya.",
    "keyword": "أَحْضُرُ",
    "keywordMeaning": "saya hadir"
  }
];

export default function ArabicQiraahTopik19Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
