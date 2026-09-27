import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-sekolah",
  "title": "Qiraah 5: Sekolah",
  "description": "Membaca teks pendek tentang kelas, guru, dan alat belajar.",
  "topicNumber": 5,
  "focus": "Pahami benda dan aktivitas di lingkungan sekolah.",
  "goal": "Cari lokasi, pelaku, dan kegiatan belajar dalam teks."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "sekolah-1",
    "title": "Di kelas",
    "passage": "الطَّلَّابُ فِي الْفَصْلِ",
    "transliteration": "at-tullabu fi al-fasli",
    "meaning": "Para siswa berada di kelas.",
    "focus": "Lokasi sekolah",
    "prompt": "Di mana para siswa?",
    "answer": "Para siswa berada di kelas, yaitu الْفَصْلِ.",
    "hint": "Lokasi muncul setelah فِي.",
    "keyword": "الْفَصْلِ",
    "keywordMeaning": "kelas"
  },
  {
    "id": "sekolah-2",
    "title": "Guru menulis",
    "passage": "الْمُعَلِّمُ يَكْتُبُ عَلَى السَّبُّورَةِ",
    "transliteration": "al-muallimu yaktubu ala as-sabburati",
    "meaning": "Guru menulis di papan tulis.",
    "focus": "Aktivitas guru",
    "prompt": "Apa yang dilakukan guru?",
    "answer": "Guru menulis, ditunjukkan oleh يَكْتُبُ.",
    "hint": "Cari kata kerja setelah subjek.",
    "keyword": "يَكْتُبُ",
    "keywordMeaning": "menulis"
  },
  {
    "id": "sekolah-3",
    "title": "Buku di meja",
    "passage": "الْكِتَابُ عَلَى الطَّاوِلَةِ",
    "transliteration": "al-kitabu ala at-tawilati",
    "meaning": "Buku itu di atas meja.",
    "focus": "Posisi benda",
    "prompt": "Di mana buku berada?",
    "answer": "Buku berada di atas meja.",
    "hint": "عَلَى berarti di atas.",
    "keyword": "الطَّاوِلَةِ",
    "keywordMeaning": "meja"
  },
  {
    "id": "sekolah-4",
    "title": "Pelajaran Arab",
    "passage": "نَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ كُلَّ يَوْمٍ",
    "transliteration": "nadrusu al-lughata al-arabiyyata kulla yawmin",
    "meaning": "Kami belajar bahasa Arab setiap hari.",
    "focus": "Kegiatan belajar",
    "prompt": "Pelajaran apa yang dipelajari?",
    "answer": "Yang dipelajari adalah bahasa Arab.",
    "hint": "Objek belajar muncul setelah نَدْرُسُ.",
    "keyword": "اللُّغَةَ الْعَرَبِيَّةَ",
    "keywordMeaning": "bahasa Arab"
  }
];

export default function ArabicQiraahTopik5Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
