import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-huruf-jar",
  "title": "Nahwu 7: Huruf Jar",
  "description": "Memahami kata depan Arab yang membuat isim setelahnya majrur.",
  "topicNumber": 7,
  "focus": "Huruf jar memberi makna tempat, arah, asal, dan posisi.",
  "goal": "Temukan huruf jar dan isim setelahnya pada frasa pendek."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "huruf-jar-1",
    "label": "Fi",
    "rule": "فِي berarti di/dalam dan diikuti isim majrur.",
    "arabic": "فِي الْبَيْتِ",
    "transliteration": "fi al-bayti",
    "meaning": "di dalam rumah",
    "prompt": "Apa huruf jar pada frasa ini?",
    "answer": "فِي adalah huruf jar.",
    "hint": "Kata pertama memberi makna tempat."
  },
  {
    "id": "huruf-jar-2",
    "label": "Ala",
    "rule": "عَلَى berarti di atas/pada dan diikuti isim majrur.",
    "arabic": "عَلَى الطَّاوِلَةِ",
    "transliteration": "ala at-tawilati",
    "meaning": "di atas meja",
    "prompt": "Apa isim setelah huruf jar?",
    "answer": "الطَّاوِلَةِ adalah isim setelah عَلَى.",
    "hint": "Kata setelah على menjadi majrur."
  },
  {
    "id": "huruf-jar-3",
    "label": "Ila",
    "rule": "إِلَى berarti ke/menuju.",
    "arabic": "إِلَى الْمَدْرَسَةِ",
    "transliteration": "ila al-madrasati",
    "meaning": "ke sekolah",
    "prompt": "Apa makna إِلَى?",
    "answer": "إِلَى berarti ke atau menuju.",
    "hint": "Biasanya menunjukkan arah tujuan."
  },
  {
    "id": "huruf-jar-4",
    "label": "Min",
    "rule": "مِنْ berarti dari dan diikuti isim majrur.",
    "arabic": "مِنَ الْبَيْتِ",
    "transliteration": "mina al-bayti",
    "meaning": "dari rumah",
    "prompt": "Apa fungsi مِنْ?",
    "answer": "Menunjukkan asal atau permulaan: dari.",
    "hint": "Cocok untuk asal tempat."
  }
];

export default function ArabicNahwuTopik7Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
