import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-mufrad-mutsanna-jamak",
  "title": "Nahwu 6: Mufrad, Mutsanna, dan Jamak",
  "description": "Mengenal jumlah tunggal, dua, dan banyak dalam kata Arab.",
  "topicNumber": 6,
  "focus": "Bentuk kata berubah sesuai jumlah benda atau orang.",
  "goal": "Tentukan apakah contoh termasuk mufrad, mutsanna, atau jamak."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "mufrad-mutsanna-jamak-1",
    "label": "Mufrad",
    "rule": "Mufrad menunjukkan satu benda atau satu orang.",
    "arabic": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "satu buku",
    "prompt": "Bentuk jumlah apa كِتَابٌ?",
    "answer": "Mufrad, karena menunjukkan satu buku.",
    "hint": "Belum ada tanda dua atau banyak."
  },
  {
    "id": "mufrad-mutsanna-jamak-2",
    "label": "Mutsanna",
    "rule": "Mutsanna menunjukkan dua, sering berakhiran ـَانِ atau ـَيْنِ.",
    "arabic": "كِتَابَانِ",
    "transliteration": "kitabani",
    "meaning": "dua buku",
    "prompt": "Bentuk jumlah apa كِتَابَانِ?",
    "answer": "Mutsanna, karena menunjukkan dua buku.",
    "hint": "Perhatikan akhiran ان."
  },
  {
    "id": "mufrad-mutsanna-jamak-3",
    "label": "Jamak",
    "rule": "Jamak menunjukkan tiga atau lebih.",
    "arabic": "كُتُبٌ",
    "transliteration": "kutubun",
    "meaning": "buku-buku",
    "prompt": "Bentuk jumlah apa كُتُبٌ?",
    "answer": "Jamak, karena berarti banyak buku.",
    "hint": "Bentuk katanya berubah dari كتاب."
  },
  {
    "id": "mufrad-mutsanna-jamak-4",
    "label": "Jamak Orang",
    "rule": "Beberapa kata manusia punya bentuk jamak khusus.",
    "arabic": "طُلَّابٌ",
    "transliteration": "tullabun",
    "meaning": "para siswa",
    "prompt": "Bentuk jumlah apa طُلَّابٌ?",
    "answer": "Jamak, karena berarti para siswa.",
    "hint": "Maknanya lebih dari dua."
  }
];

export default function ArabicNahwuTopik6Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
