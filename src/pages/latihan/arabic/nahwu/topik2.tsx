import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-mubtada-khabar",
  "title": "Nahwu 2: Mubtada dan Khabar",
  "description": "Mengenali subjek dan informasi utama dalam jumlah ismiyyah.",
  "topicNumber": 2,
  "focus": "Mubtada biasanya isim di awal, khabar memberi kabar tentangnya.",
  "goal": "Tentukan mubtada dan khabar pada kalimat nominal sederhana."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "mubtada-khabar-1",
    "label": "Mubtada Khabar",
    "rule": "Mubtada adalah pokok pembicaraan; khabar adalah informasi tentang mubtada.",
    "arabic": "زَيْدٌ طَالِبٌ",
    "transliteration": "zaydun talibun",
    "meaning": "Zaid adalah pelajar",
    "prompt": "Tentukan mubtada dan khabar.",
    "answer": "زَيْدٌ mubtada, طَالِبٌ khabar.",
    "hint": "Kata pertama adalah orang yang dibicarakan."
  },
  {
    "id": "mubtada-khabar-2",
    "label": "Khabar Sifat",
    "rule": "Khabar bisa berupa sifat yang menjelaskan keadaan mubtada.",
    "arabic": "الْبَيْتُ كَبِيرٌ",
    "transliteration": "al-baytu kabirun",
    "meaning": "rumah itu besar",
    "prompt": "Apa khabar pada kalimat ini?",
    "answer": "كَبِيرٌ adalah khabar.",
    "hint": "Kata yang memberi informasi tentang rumah."
  },
  {
    "id": "mubtada-khabar-3",
    "label": "Muannats",
    "rule": "Khabar sering mengikuti jenis mubtada dalam contoh dasar.",
    "arabic": "الطَّالِبَةُ نَشِيطَةٌ",
    "transliteration": "at-talibatu nashitatun",
    "meaning": "siswi itu aktif",
    "prompt": "Tentukan mubtada dan khabar.",
    "answer": "الطَّالِبَةُ mubtada, نَشِيطَةٌ khabar.",
    "hint": "Keduanya berbentuk feminin."
  },
  {
    "id": "mubtada-khabar-4",
    "label": "Khabar Isim",
    "rule": "Khabar tidak selalu sifat; bisa juga isim yang memberi identitas.",
    "arabic": "الْكِتَابُ جَدِيدٌ",
    "transliteration": "al-kitabu jadidun",
    "meaning": "buku itu baru",
    "prompt": "Apa informasi yang diberikan khabar?",
    "answer": "Khabar جَدِيدٌ memberi informasi bahwa buku itu baru.",
    "hint": "Cari kata setelah mubtada."
  }
];

export default function ArabicNahwuTopik2Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
