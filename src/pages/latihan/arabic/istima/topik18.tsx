import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-dialog-sekolah",
  "title": "Istima 18: Dialog Sekolah",
  "description": "Mendengar percakapan singkat tentang kelas, guru, dan pelajaran.",
  "topicNumber": 18,
  "focus": "Percakapan sekolah",
  "goal": "Dengarkan konteks sekolah lalu tulis informasi utama yang terdengar."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "dialog-sekolah-1",
    "title": "Guru datang",
    "arabic": "جَاءَ الْمُدَرِّسُ",
    "transliteration": "jaa al-mudarrisu",
    "meaning": "guru telah datang",
    "focus": "Sekolah",
    "prompt": "Dengarkan. Siapa yang datang?",
    "answer": "Guru.",
    "hint": "Al-mudarris berarti guru.",
    "keyword": "الْمُدَرِّسُ"
  },
  {
    "id": "dialog-sekolah-2",
    "title": "Pelajaran Arab",
    "arabic": "الدَّرْسُ الْيَوْمَ عَرَبِيٌّ",
    "transliteration": "ad-darsu al-yawma arabiyyun",
    "meaning": "pelajaran hari ini bahasa Arab",
    "focus": "Pelajaran",
    "prompt": "Dengarkan. Pelajaran hari ini apa?",
    "answer": "Bahasa Arab.",
    "hint": "Kata terakhir arabiyyun.",
    "keyword": "عَرَبِيٌّ"
  },
  {
    "id": "dialog-sekolah-3",
    "title": "Di kelas",
    "arabic": "الطُّلَّابُ فِي الْفَصْلِ",
    "transliteration": "at-tullabu fi al-fasli",
    "meaning": "para siswa di kelas",
    "focus": "Lokasi sekolah",
    "prompt": "Dengarkan. Siswa berada di mana?",
    "answer": "Di kelas.",
    "hint": "Lokasi setelah fi.",
    "keyword": "الْفَصْلِ"
  },
  {
    "id": "dialog-sekolah-4",
    "title": "Ujian mudah",
    "arabic": "الاِمْتِحَانُ سَهْلٌ",
    "transliteration": "al-imtihanu sahlun",
    "meaning": "ujian itu mudah",
    "focus": "Sekolah",
    "prompt": "Dengarkan. Bagaimana ujiannya?",
    "answer": "Mudah.",
    "hint": "Sahlun berarti mudah.",
    "keyword": "سَهْلٌ"
  }
];

export default function ArabicIstimaTopik18Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
