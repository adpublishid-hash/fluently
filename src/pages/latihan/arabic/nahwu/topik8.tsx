import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-jumlah-ismiyyah",
  "title": "Nahwu 8: Jumlah Ismiyyah",
  "description": "Mengenali kalimat Arab yang dimulai dengan isim atau dhamir.",
  "topicNumber": 8,
  "focus": "Jumlah ismiyyah biasanya terdiri dari mubtada dan khabar.",
  "goal": "Tentukan mengapa kalimat termasuk jumlah ismiyyah."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "jumlah-ismiyyah-1",
    "label": "Awal Isim",
    "rule": "Jumlah ismiyyah dimulai dengan isim sebagai mubtada.",
    "arabic": "الْوَلَدُ مُجْتَهِدٌ",
    "transliteration": "al-waladu mujtahidun",
    "meaning": "anak laki-laki itu rajin",
    "prompt": "Mengapa ini jumlah ismiyyah?",
    "answer": "Karena dimulai dengan isim الْوَلَدُ.",
    "hint": "Lihat kata pertama."
  },
  {
    "id": "jumlah-ismiyyah-2",
    "label": "Khabar Sifat",
    "rule": "Khabar dapat berupa sifat yang menjelaskan mubtada.",
    "arabic": "الْجَوُّ جَمِيلٌ",
    "transliteration": "al-jawwu jamilun",
    "meaning": "cuaca itu indah",
    "prompt": "Apa khabar kalimat ini?",
    "answer": "جَمِيلٌ adalah khabar.",
    "hint": "Kata yang memberi informasi tentang cuaca."
  },
  {
    "id": "jumlah-ismiyyah-3",
    "label": "Kata Tunjuk",
    "rule": "Kata tunjuk dapat menjadi mubtada dalam jumlah ismiyyah.",
    "arabic": "هَذِهِ حَدِيقَةٌ",
    "transliteration": "hadhihi hadiqah",
    "meaning": "ini taman",
    "prompt": "Apa mubtadanya?",
    "answer": "هَذِهِ adalah mubtada.",
    "hint": "Kata tunjuk berada di awal."
  },
  {
    "id": "jumlah-ismiyyah-4",
    "label": "Khabar Syibh Jumlah",
    "rule": "Khabar bisa berupa frasa jar-majrur.",
    "arabic": "الْمُعَلِّمُ فِي الْفَصْلِ",
    "transliteration": "al-muallimu fi al-fasli",
    "meaning": "guru itu di kelas",
    "prompt": "Apa khabarnya?",
    "answer": "فِي الْفَصْلِ adalah khabar berupa frasa tempat.",
    "hint": "Informasi lokasinya berada setelah mubtada."
  }
];

export default function ArabicNahwuTopik8Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
