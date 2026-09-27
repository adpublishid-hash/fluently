import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-angka-1-20",
  "title": "Qiraah 8: Angka 1-20",
  "description": "Membaca angka sederhana dalam kalimat Arab harian.",
  "topicNumber": 8,
  "focus": "Kenali angka dan jumlah benda dalam teks.",
  "goal": "Cari angka lalu hubungkan dengan benda yang dihitung."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "angka-1-20-1",
    "title": "Dua buku",
    "passage": "عِنْدِي كِتَابَانِ",
    "transliteration": "indi kitabani",
    "meaning": "Saya punya dua buku.",
    "focus": "Angka dua",
    "prompt": "Berapa buku yang dimiliki?",
    "answer": "Ada dua buku.",
    "hint": "Akhiran انِ menunjukkan dua pada كِتَابَانِ.",
    "keyword": "كِتَابَانِ",
    "keywordMeaning": "dua buku"
  },
  {
    "id": "angka-1-20-2",
    "title": "Tiga pulpen",
    "passage": "عَلَى الْمَكْتَبِ ثَلَاثَةُ أَقْلَامٍ",
    "transliteration": "ala al-maktabi thalathatu aqlamin",
    "meaning": "Di atas meja ada tiga pulpen.",
    "focus": "Angka tiga",
    "prompt": "Berapa pulpen di atas meja?",
    "answer": "Ada tiga pulpen.",
    "hint": "ثَلَاثَةُ berarti tiga.",
    "keyword": "ثَلَاثَةُ",
    "keywordMeaning": "tiga"
  },
  {
    "id": "angka-1-20-3",
    "title": "Sepuluh siswa",
    "passage": "فِي الْفَصْلِ عَشَرَةُ طُلَّابٍ",
    "transliteration": "fi al-fasli asharatu tullabin",
    "meaning": "Di kelas ada sepuluh siswa.",
    "focus": "Angka sepuluh",
    "prompt": "Berapa siswa di kelas?",
    "answer": "Ada sepuluh siswa.",
    "hint": "عَشَرَةُ berarti sepuluh.",
    "keyword": "عَشَرَةُ",
    "keywordMeaning": "sepuluh"
  },
  {
    "id": "angka-1-20-4",
    "title": "Dua puluh hari",
    "passage": "الشَّهْرُ فِيهِ عِشْرُونَ يَوْمًا",
    "transliteration": "ash-shahru fihi ishruna yawman",
    "meaning": "Dalam bulan itu ada dua puluh hari.",
    "focus": "Angka dua puluh",
    "prompt": "Angka berapa yang muncul?",
    "answer": "Angka yang muncul adalah dua puluh.",
    "hint": "عِشْرُونَ berarti dua puluh.",
    "keyword": "عِشْرُونَ",
    "keywordMeaning": "dua puluh"
  }
];

export default function ArabicQiraahTopik8Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
