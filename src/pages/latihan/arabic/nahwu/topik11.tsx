import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-naat-manuut",
  "title": "Nahwu 11: Naat dan Manuut",
  "description": "Mengenali sifat dan kata yang disifati dalam frasa Arab.",
  "topicNumber": 11,
  "focus": "Naat mengikuti manuut dalam jenis, jumlah, dan keadaan dasar.",
  "goal": "Tentukan mana manuut dan mana naat pada frasa sederhana."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "naat-manuut-1",
    "label": "Naat Dasar",
    "rule": "Naat adalah sifat, manuut adalah kata benda yang disifati.",
    "arabic": "بَيْتٌ كَبِيرٌ",
    "transliteration": "baytun kabirun",
    "meaning": "rumah besar",
    "prompt": "Mana naatnya?",
    "answer": "كَبِيرٌ adalah naat.",
    "hint": "Sifatnya muncul setelah benda."
  },
  {
    "id": "naat-manuut-2",
    "label": "Muannats",
    "rule": "Naat mengikuti manuut yang muannats.",
    "arabic": "طَالِبَةٌ مُجْتَهِدَةٌ",
    "transliteration": "talibatun mujtahidatun",
    "meaning": "siswi rajin",
    "prompt": "Mana manuutnya?",
    "answer": "طَالِبَةٌ adalah manuut.",
    "hint": "Yang disifati adalah siswi."
  },
  {
    "id": "naat-manuut-3",
    "label": "Marifah",
    "rule": "Jika manuut ber-al, naat biasanya juga ber-al.",
    "arabic": "الْكِتَابُ الْجَدِيدُ",
    "transliteration": "al-kitabu al-jadidu",
    "meaning": "buku yang baru",
    "prompt": "Apa tanda kesesuaian naat di sini?",
    "answer": "Keduanya memakai ال.",
    "hint": "Perhatikan awalan al pada dua kata."
  },
  {
    "id": "naat-manuut-4",
    "label": "Warna",
    "rule": "Warna bisa menjadi naat yang menjelaskan benda.",
    "arabic": "قَلَمٌ أَزْرَقُ",
    "transliteration": "qalamun azraqu",
    "meaning": "pulpen biru",
    "prompt": "Apa kata yang menjadi naat?",
    "answer": "أَزْرَقُ adalah naat.",
    "hint": "Warna menjelaskan pulpen."
  }
];

export default function ArabicNahwuTopik11Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
