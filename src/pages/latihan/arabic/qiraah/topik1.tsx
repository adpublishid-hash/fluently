import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-huruf-dan-kata-pendek",
  "title": "Qiraah 1: Huruf dan Kata Pendek",
  "description": "Melatih membaca kata Arab pendek berharakat dengan makna dasar.",
  "topicNumber": 1,
  "focus": "Baca kata pendek dan kenali makna benda dasar.",
  "goal": "Baca teks pendek, temukan kata kunci, lalu jawab makna utamanya."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "huruf-dan-kata-pendek-1",
    "title": "Kata buku",
    "passage": "كِتَابٌ جَدِيدٌ",
    "transliteration": "kitabun jadidun",
    "meaning": "Sebuah buku baru.",
    "focus": "Sifat setelah benda",
    "prompt": "Kata apa yang menunjukkan benda utama?",
    "answer": "Benda utamanya adalah كِتَابٌ, artinya buku.",
    "hint": "Benda utama biasanya muncul sebelum sifat.",
    "keyword": "كِتَابٌ",
    "keywordMeaning": "buku"
  },
  {
    "id": "huruf-dan-kata-pendek-2",
    "title": "Kata rumah",
    "passage": "بَيْتٌ كَبِيرٌ",
    "transliteration": "baytun kabirun",
    "meaning": "Sebuah rumah besar.",
    "focus": "Sifat ukuran",
    "prompt": "Kata mana yang berarti besar?",
    "answer": "Kata yang berarti besar adalah كَبِيرٌ.",
    "hint": "Lihat kata setelah بَيْتٌ.",
    "keyword": "كَبِيرٌ",
    "keywordMeaning": "besar"
  },
  {
    "id": "huruf-dan-kata-pendek-3",
    "title": "Kata pulpen",
    "passage": "قَلَمٌ أَزْرَقُ",
    "transliteration": "qalamun azraqu",
    "meaning": "Sebuah pulpen biru.",
    "focus": "Warna benda",
    "prompt": "Apa warna pulpen dalam teks?",
    "answer": "Warna pulpennya biru, yaitu أَزْرَقُ.",
    "hint": "Kata warna muncul setelah kata benda.",
    "keyword": "أَزْرَقُ",
    "keywordMeaning": "biru"
  },
  {
    "id": "huruf-dan-kata-pendek-4",
    "title": "Kata pintu",
    "passage": "بَابٌ مَفْتُوحٌ",
    "transliteration": "babun maftuhun",
    "meaning": "Sebuah pintu terbuka.",
    "focus": "Keadaan benda",
    "prompt": "Bagaimana keadaan pintu?",
    "answer": "Pintunya terbuka, ditunjukkan oleh مَفْتُوحٌ.",
    "hint": "Cari kata setelah بَابٌ.",
    "keyword": "مَفْتُوحٌ",
    "keywordMeaning": "terbuka"
  }
];

export default function ArabicQiraahTopik1Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
