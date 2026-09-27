import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-masjid-dan-tempat-umum",
  "title": "Qiraah 12: Masjid dan Tempat Umum",
  "description": "Membaca teks tentang masjid, jalan, toko, dan tempat sekitar.",
  "topicNumber": 12,
  "focus": "Kenali nama tempat dan kegiatan di tempat umum.",
  "goal": "Baca bacaan pendek lalu tentukan tempat dan aktivitasnya."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "masjid-dan-tempat-umum-1",
    "title": "Pergi ke masjid",
    "passage": "أَذْهَبُ إِلَى الْمَسْجِدِ",
    "transliteration": "adhhabu ila al-masjidi",
    "meaning": "Saya pergi ke masjid.",
    "focus": "Tempat ibadah",
    "prompt": "Ke mana orang itu pergi?",
    "answer": "Orang itu pergi ke masjid.",
    "hint": "إِلَى menunjukkan arah tujuan.",
    "keyword": "الْمَسْجِدِ",
    "keywordMeaning": "masjid"
  },
  {
    "id": "masjid-dan-tempat-umum-2",
    "title": "Toko dekat",
    "passage": "الدُّكَّانُ قَرِيبٌ مِنَ الْبَيْتِ",
    "transliteration": "ad-dukkannu qaribun mina al-bayti",
    "meaning": "Toko itu dekat dari rumah.",
    "focus": "Tempat umum",
    "prompt": "Tempat apa yang dekat dari rumah?",
    "answer": "Toko dekat dari rumah.",
    "hint": "الدُّكَّانُ berarti toko.",
    "keyword": "الدُّكَّانُ",
    "keywordMeaning": "toko"
  },
  {
    "id": "masjid-dan-tempat-umum-3",
    "title": "Jalan ramai",
    "passage": "الشَّارِعُ مُزْدَحِمٌ الْيَوْمَ",
    "transliteration": "ash-shariu muzdahimun al-yawma",
    "meaning": "Jalan itu ramai hari ini.",
    "focus": "Kondisi tempat",
    "prompt": "Bagaimana keadaan jalan?",
    "answer": "Jalan sedang ramai.",
    "hint": "مُزْدَحِمٌ berarti ramai/padat.",
    "keyword": "الشَّارِعُ",
    "keywordMeaning": "jalan"
  },
  {
    "id": "masjid-dan-tempat-umum-4",
    "title": "Perpustakaan tenang",
    "passage": "الْمَكْتَبَةُ هَادِئَةٌ وَنَظِيفَةٌ",
    "transliteration": "al-maktabatu hadiatun wa nazifatun",
    "meaning": "Perpustakaan itu tenang dan bersih.",
    "focus": "Tempat belajar",
    "prompt": "Sebutkan satu sifat perpustakaan.",
    "answer": "Perpustakaan tenang atau bersih.",
    "hint": "Kata sifat muncul setelah الْمَكْتَبَةُ.",
    "keyword": "الْمَكْتَبَةُ",
    "keywordMeaning": "perpustakaan"
  }
];

export default function ArabicQiraahTopik12Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
