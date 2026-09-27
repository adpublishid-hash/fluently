import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-waktu-harian",
  "title": "Qiraah 7: Waktu Harian",
  "description": "Membaca kalimat tentang pagi, siang, malam, dan rutinitas.",
  "topicNumber": 7,
  "focus": "Tangkap kata waktu dan kegiatan harian.",
  "goal": "Identifikasi kapan kegiatan dilakukan dalam teks pendek."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "waktu-harian-1",
    "title": "Pagi belajar",
    "passage": "أَدْرُسُ فِي الصَّبَاحِ",
    "transliteration": "adrusu fi as-sabahi",
    "meaning": "Saya belajar pada pagi hari.",
    "focus": "Waktu pagi",
    "prompt": "Kapan kegiatan belajar dilakukan?",
    "answer": "Belajar dilakukan pada pagi hari.",
    "hint": "الصَّبَاح berarti pagi.",
    "keyword": "الصَّبَاحِ",
    "keywordMeaning": "pagi"
  },
  {
    "id": "waktu-harian-2",
    "title": "Siang makan",
    "passage": "نَأْكُلُ فِي الظُّهْرِ",
    "transliteration": "nakulu fi azh-zhuhri",
    "meaning": "Kami makan pada siang hari.",
    "focus": "Waktu siang",
    "prompt": "Apa kegiatan dalam teks?",
    "answer": "Kegiatannya makan.",
    "hint": "Kata kerja نَأْكُلُ berarti kami makan.",
    "keyword": "نَأْكُلُ",
    "keywordMeaning": "kami makan"
  },
  {
    "id": "waktu-harian-3",
    "title": "Malam tidur",
    "passage": "أَنَامُ فِي اللَّيْلِ",
    "transliteration": "anamu fi al-layli",
    "meaning": "Saya tidur pada malam hari.",
    "focus": "Waktu malam",
    "prompt": "Kapan orang itu tidur?",
    "answer": "Orang itu tidur pada malam hari.",
    "hint": "اللَّيْل berarti malam.",
    "keyword": "اللَّيْلِ",
    "keywordMeaning": "malam"
  },
  {
    "id": "waktu-harian-4",
    "title": "Setiap hari",
    "passage": "أَقْرَأُ كِتَابًا كُلَّ يَوْمٍ",
    "transliteration": "aqrau kitaban kulla yawmin",
    "meaning": "Saya membaca buku setiap hari.",
    "focus": "Frekuensi harian",
    "prompt": "Seberapa sering dia membaca?",
    "answer": "Dia membaca setiap hari.",
    "hint": "كُلَّ يَوْمٍ berarti setiap hari.",
    "keyword": "كُلَّ يَوْمٍ",
    "keywordMeaning": "setiap hari"
  }
];

export default function ArabicQiraahTopik7Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
