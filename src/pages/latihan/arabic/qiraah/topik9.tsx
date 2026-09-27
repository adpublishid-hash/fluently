import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-warna-dan-benda",
  "title": "Qiraah 9: Warna dan Benda",
  "description": "Membaca deskripsi warna untuk benda di sekitar.",
  "topicNumber": 9,
  "focus": "Hubungkan warna dengan benda yang diterangkan.",
  "goal": "Temukan benda dan warna yang sesuai dari setiap teks."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "warna-dan-benda-1",
    "title": "Buku merah",
    "passage": "الْكِتَابُ أَحْمَرُ",
    "transliteration": "al-kitabu ahmaru",
    "meaning": "Buku itu merah.",
    "focus": "Warna merah",
    "prompt": "Apa warna buku?",
    "answer": "Warna buku adalah merah.",
    "hint": "أَحْمَرُ berarti merah.",
    "keyword": "أَحْمَرُ",
    "keywordMeaning": "merah"
  },
  {
    "id": "warna-dan-benda-2",
    "title": "Tas hitam",
    "passage": "الْحَقِيبَةُ سَوْدَاءُ",
    "transliteration": "al-haqibatu sawdau",
    "meaning": "Tas itu hitam.",
    "focus": "Warna hitam",
    "prompt": "Benda apa yang hitam?",
    "answer": "Yang hitam adalah tas.",
    "hint": "الْحَقِيبَةُ berarti tas.",
    "keyword": "الْحَقِيبَةُ",
    "keywordMeaning": "tas"
  },
  {
    "id": "warna-dan-benda-3",
    "title": "Pintu putih",
    "passage": "الْبَابُ أَبْيَضُ وَنَظِيفٌ",
    "transliteration": "al-babu abyadu wa nazifun",
    "meaning": "Pintu itu putih dan bersih.",
    "focus": "Dua sifat benda",
    "prompt": "Sebutkan warna pintu.",
    "answer": "Pintu berwarna putih.",
    "hint": "أَبْيَضُ berarti putih.",
    "keyword": "أَبْيَضُ",
    "keywordMeaning": "putih"
  },
  {
    "id": "warna-dan-benda-4",
    "title": "Meja cokelat",
    "passage": "الطَّاوِلَةُ بُنِّيَّةٌ وَكَبِيرَةٌ",
    "transliteration": "at-tawilatu bunniyyatun wa kabiratun",
    "meaning": "Meja itu cokelat dan besar.",
    "focus": "Warna dan ukuran",
    "prompt": "Apa benda yang dideskripsikan?",
    "answer": "Benda yang dideskripsikan adalah meja.",
    "hint": "الطَّاوِلَةُ berarti meja.",
    "keyword": "الطَّاوِلَةُ",
    "keywordMeaning": "meja"
  }
];

export default function ArabicQiraahTopik9Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
