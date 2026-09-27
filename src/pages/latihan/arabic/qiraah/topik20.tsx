import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-cerita-mini",
  "title": "Qiraah 20: Cerita Mini",
  "description": "Membaca cerita sangat pendek berisi urutan kegiatan harian.",
  "topicNumber": 20,
  "focus": "Pahami urutan peristiwa dan ide utama cerita.",
  "goal": "Baca cerita mini lalu jawab tokoh, tempat, dan kegiatan utama."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "cerita-mini-1",
    "title": "Pagi Ahmad",
    "passage": "اِسْمُهُ أَحْمَدُ. يَسْكُنُ فِي جَاكَرْتَا. يَدْرُسُ كُلَّ صَبَاحٍ.",
    "transliteration": "ismuhu ahmadu. yaskunu fi jakarta. yadrusu kulla sabahin.",
    "meaning": "Namanya Ahmad. Ia tinggal di Jakarta. Ia belajar setiap pagi.",
    "focus": "Tokoh dan rutinitas",
    "prompt": "Siapa tokoh cerita dan apa rutinitasnya?",
    "answer": "Tokohnya Ahmad, rutinitasnya belajar setiap pagi.",
    "hint": "Cari nama di kalimat pertama.",
    "keyword": "أَحْمَدُ",
    "keywordMeaning": "Ahmad"
  },
  {
    "id": "cerita-mini-2",
    "title": "Fatimah di sekolah",
    "passage": "فَاطِمَةُ طَالِبَةٌ. تَذْهَبُ إِلَى الْمَدْرَسَةِ. تَقْرَأُ كِتَابًا جَدِيدًا.",
    "transliteration": "fatimatu talibatun. tadhhabu ila al-madrasati. taqrau kitaban jadidan.",
    "meaning": "Fatimah seorang siswi. Ia pergi ke sekolah. Ia membaca buku baru.",
    "focus": "Tokoh dan tempat",
    "prompt": "Ke mana Fatimah pergi?",
    "answer": "Fatimah pergi ke sekolah.",
    "hint": "Tempat tujuan muncul setelah إِلَى.",
    "keyword": "الْمَدْرَسَةِ",
    "keywordMeaning": "sekolah"
  },
  {
    "id": "cerita-mini-3",
    "title": "Keluarga kecil",
    "passage": "عِنْدِي أُسْرَةٌ صَغِيرَةٌ. أَبِي مُعَلِّمٌ. أُمِّي طَبِيبَةٌ.",
    "transliteration": "indi usratun saghiratun. abi muallimun. ummi tabibatun.",
    "meaning": "Saya punya keluarga kecil. Ayahku guru. Ibuku dokter.",
    "focus": "Keluarga dan profesi",
    "prompt": "Apa profesi ayah dan ibu?",
    "answer": "Ayah guru, ibu dokter.",
    "hint": "Profesi muncul setelah أَبِي dan أُمِّي.",
    "keyword": "أُسْرَةٌ",
    "keywordMeaning": "keluarga"
  },
  {
    "id": "cerita-mini-4",
    "title": "Hari libur",
    "passage": "الْيَوْمَ عُطْلَةٌ. أَذْهَبُ إِلَى الْحَدِيقَةِ. أَلْعَبُ مَعَ أَصْدِقَائِي.",
    "transliteration": "al-yawma utlatun. adhhabu ila al-hadiqati. alabu maa asdiqai.",
    "meaning": "Hari ini libur. Saya pergi ke taman. Saya bermain bersama teman-temanku.",
    "focus": "Urutan kegiatan",
    "prompt": "Apa kegiatan setelah pergi ke taman?",
    "answer": "Setelah pergi ke taman, dia bermain bersama teman-temannya.",
    "hint": "Kalimat terakhir menunjukkan kegiatan.",
    "keyword": "الْحَدِيقَةِ",
    "keywordMeaning": "taman"
  }
];

export default function ArabicQiraahTopik20Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
