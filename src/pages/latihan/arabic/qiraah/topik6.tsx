import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-rumah",
  "title": "Qiraah 6: Rumah",
  "description": "Membaca deskripsi rumah, ruangan, dan posisi benda.",
  "topicNumber": 6,
  "focus": "Pahami bagian rumah dan kata depan sederhana.",
  "goal": "Baca deskripsi rumah lalu temukan ruangan dan letak benda."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "rumah-1",
    "title": "Rumah besar",
    "passage": "بَيْتُنَا كَبِيرٌ وَجَمِيلٌ",
    "transliteration": "baytuna kabirun wa jamilun",
    "meaning": "Rumah kami besar dan indah.",
    "focus": "Deskripsi rumah",
    "prompt": "Sebutkan dua sifat rumah.",
    "answer": "Rumah itu besar dan indah.",
    "hint": "Dua sifat muncul setelah بَيْتُنَا.",
    "keyword": "كَبِيرٌ",
    "keywordMeaning": "besar"
  },
  {
    "id": "rumah-2",
    "title": "Kamar tidur",
    "passage": "غُرْفَةُ النَّوْمِ نَظِيفَةٌ",
    "transliteration": "ghurfatu an-nawmi nazifatun",
    "meaning": "Kamar tidur itu bersih.",
    "focus": "Ruangan rumah",
    "prompt": "Ruangan apa yang disebut?",
    "answer": "Ruangan yang disebut adalah kamar tidur.",
    "hint": "غُرْفَةُ النَّوْمِ berarti kamar tidur.",
    "keyword": "غُرْفَةُ النَّوْمِ",
    "keywordMeaning": "kamar tidur"
  },
  {
    "id": "rumah-3",
    "title": "Dapur kecil",
    "passage": "الْمَطْبَخُ صَغِيرٌ وَلَكِنْ مُرَتَّبٌ",
    "transliteration": "al-matbakhu saghirun walakin murattabun",
    "meaning": "Dapur itu kecil tetapi rapi.",
    "focus": "Kontras sederhana",
    "prompt": "Bagaimana keadaan dapur?",
    "answer": "Dapur kecil tetapi rapi.",
    "hint": "وَلَكِنْ berarti tetapi.",
    "keyword": "الْمَطْبَخُ",
    "keywordMeaning": "dapur"
  },
  {
    "id": "rumah-4",
    "title": "Kursi di ruang tamu",
    "passage": "الْكُرْسِيُّ فِي غُرْفَةِ الْجُلُوسِ",
    "transliteration": "al-kursiyyu fi ghurfati al-julusi",
    "meaning": "Kursi berada di ruang tamu.",
    "focus": "Lokasi benda",
    "prompt": "Di mana kursi berada?",
    "answer": "Kursi berada di ruang tamu.",
    "hint": "Lokasi muncul setelah فِي.",
    "keyword": "غُرْفَةِ الْجُلُوسِ",
    "keywordMeaning": "ruang tamu"
  }
];

export default function ArabicQiraahTopik6Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
