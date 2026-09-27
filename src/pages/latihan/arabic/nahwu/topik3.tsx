import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-kata-tunjuk",
  "title": "Nahwu 3: Kata Tunjuk",
  "description": "Memakai hadza, hadzihi, dzalika, dan tilka sesuai benda yang ditunjuk.",
  "topicNumber": 3,
  "focus": "Kata tunjuk berubah menurut dekat/jauh dan mudzakkar/muannats.",
  "goal": "Pilih kata tunjuk yang sesuai dengan benda pada kalimat."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "kata-tunjuk-1",
    "label": "Hadza",
    "rule": "هَذَا dipakai untuk menunjuk benda dekat yang mudzakkar.",
    "arabic": "هَذَا كِتَابٌ",
    "transliteration": "hadha kitabun",
    "meaning": "ini sebuah buku",
    "prompt": "Mengapa memakai هَذَا?",
    "answer": "Karena كِتَابٌ mudzakkar dan dekat.",
    "hint": "Kitab dianggap mudzakkar."
  },
  {
    "id": "kata-tunjuk-2",
    "label": "Hadzihi",
    "rule": "هَذِهِ dipakai untuk menunjuk benda dekat yang muannats.",
    "arabic": "هَذِهِ مَدْرَسَةٌ",
    "transliteration": "hadhihi madrasatun",
    "meaning": "ini sebuah sekolah",
    "prompt": "Mengapa memakai هَذِهِ?",
    "answer": "Karena مَدْرَسَةٌ muannats dan dekat.",
    "hint": "Akhiran ta marbuthah sering menandai muannats."
  },
  {
    "id": "kata-tunjuk-3",
    "label": "Dzalika",
    "rule": "ذَلِكَ dipakai untuk menunjuk benda jauh yang mudzakkar.",
    "arabic": "ذَلِكَ بَابٌ",
    "transliteration": "dhalika babun",
    "meaning": "itu sebuah pintu",
    "prompt": "Kata tunjuk apa yang dipakai untuk بَابٌ yang jauh?",
    "answer": "ذَلِكَ, karena بَابٌ mudzakkar dan jauh.",
    "hint": "Jauh + mudzakkar."
  },
  {
    "id": "kata-tunjuk-4",
    "label": "Tilka",
    "rule": "تِلْكَ dipakai untuk menunjuk benda jauh yang muannats.",
    "arabic": "تِلْكَ حَقِيبَةٌ",
    "transliteration": "tilka haqibatun",
    "meaning": "itu sebuah tas",
    "prompt": "Mengapa memakai تِلْكَ?",
    "answer": "Karena حَقِيبَةٌ muannats dan jauh.",
    "hint": "Jauh + muannats."
  }
];

export default function ArabicNahwuTopik3Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
