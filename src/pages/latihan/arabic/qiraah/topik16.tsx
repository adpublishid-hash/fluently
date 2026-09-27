import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-arah-sederhana",
  "title": "Qiraah 16: Arah Sederhana",
  "description": "Membaca instruksi arah kanan, kiri, depan, dan belakang.",
  "topicNumber": 16,
  "focus": "Tangkap kata arah dan posisi tempat.",
  "goal": "Baca instruksi arah lalu jawab lokasi atau gerakannya."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "arah-sederhana-1",
    "title": "Belok kanan",
    "passage": "اِذْهَبْ يَمِينًا إِلَى الْمَكْتَبَةِ",
    "transliteration": "idhhab yaminan ila al-maktabati",
    "meaning": "Pergilah ke kanan menuju perpustakaan.",
    "focus": "Arah kanan",
    "prompt": "Ke arah mana harus pergi?",
    "answer": "Harus pergi ke kanan.",
    "hint": "يَمِينًا berarti ke kanan.",
    "keyword": "يَمِينًا",
    "keywordMeaning": "kanan"
  },
  {
    "id": "arah-sederhana-2",
    "title": "Belok kiri",
    "passage": "اِمْشِ شِمَالًا بَعْدَ الْمَسْجِدِ",
    "transliteration": "imshi shimalan bada al-masjidi",
    "meaning": "Berjalanlah ke kiri setelah masjid.",
    "focus": "Arah kiri",
    "prompt": "Kapan belok kiri?",
    "answer": "Belok kiri setelah masjid.",
    "hint": "بَعْدَ berarti setelah.",
    "keyword": "شِمَالًا",
    "keywordMeaning": "kiri"
  },
  {
    "id": "arah-sederhana-3",
    "title": "Di depan sekolah",
    "passage": "الْمَحَلُّ أَمَامَ الْمَدْرَسَةِ",
    "transliteration": "al-mahallu amama al-madrasati",
    "meaning": "Toko berada di depan sekolah.",
    "focus": "Posisi depan",
    "prompt": "Di mana toko berada?",
    "answer": "Toko berada di depan sekolah.",
    "hint": "أَمَامَ berarti di depan.",
    "keyword": "أَمَامَ",
    "keywordMeaning": "di depan"
  },
  {
    "id": "arah-sederhana-4",
    "title": "Di belakang rumah",
    "passage": "الْحَدِيقَةُ خَلْفَ الْبَيْتِ",
    "transliteration": "al-hadiqatu khalfa al-bayti",
    "meaning": "Taman berada di belakang rumah.",
    "focus": "Posisi belakang",
    "prompt": "Apa yang berada di belakang rumah?",
    "answer": "Taman berada di belakang rumah.",
    "hint": "خَلْفَ berarti di belakang.",
    "keyword": "الْحَدِيقَةُ",
    "keywordMeaning": "taman"
  }
];

export default function ArabicQiraahTopik16Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
