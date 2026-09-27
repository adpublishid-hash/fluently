import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-kata-tanya",
  "title": "Nahwu 10: Kata Tanya",
  "description": "Memakai kata tanya Arab dasar untuk orang, benda, tempat, dan waktu.",
  "topicNumber": 10,
  "focus": "Kata tanya menentukan jenis informasi yang dicari.",
  "goal": "Pilih makna kata tanya dan fungsi pertanyaannya."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "kata-tanya-1",
    "label": "Man",
    "rule": "مَنْ dipakai untuk bertanya siapa.",
    "arabic": "مَنْ هَذَا؟",
    "transliteration": "man hadha?",
    "meaning": "siapa ini?",
    "prompt": "Apa fungsi مَنْ?",
    "answer": "Bertanya siapa.",
    "hint": "Jawabannya biasanya orang."
  },
  {
    "id": "kata-tanya-2",
    "label": "Ma",
    "rule": "مَا dipakai untuk bertanya apa.",
    "arabic": "مَا هَذَا؟",
    "transliteration": "ma hadha?",
    "meaning": "apa ini?",
    "prompt": "Apa fungsi مَا?",
    "answer": "Bertanya apa.",
    "hint": "Jawabannya benda atau hal."
  },
  {
    "id": "kata-tanya-3",
    "label": "Ayna",
    "rule": "أَيْنَ dipakai untuk bertanya tempat.",
    "arabic": "أَيْنَ الْقَلَمُ؟",
    "transliteration": "ayna al-qalamu?",
    "meaning": "di mana pulpen itu?",
    "prompt": "Apa fungsi أَيْنَ?",
    "answer": "Bertanya tempat atau lokasi.",
    "hint": "Jawaban bisa diawali في atau على."
  },
  {
    "id": "kata-tanya-4",
    "label": "Mata",
    "rule": "مَتَى dipakai untuk bertanya waktu.",
    "arabic": "مَتَى الدَّرْسُ؟",
    "transliteration": "mata ad-darsu?",
    "meaning": "kapan pelajarannya?",
    "prompt": "Apa fungsi مَتَى?",
    "answer": "Bertanya waktu.",
    "hint": "Jawaban bisa berupa jam atau hari."
  }
];

export default function ArabicNahwuTopik10Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
