import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-dhamir-munfashil",
  "title": "Nahwu 4: Dhamir Munfashil",
  "description": "Menghafal kata ganti terpisah untuk membuat kalimat sederhana.",
  "topicNumber": 4,
  "focus": "Dhamir munfashil dapat menjadi mubtada dalam jumlah ismiyyah.",
  "goal": "Cocokkan dhamir dengan makna dan contoh kalimatnya."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "dhamir-munfashil-1",
    "label": "Ana",
    "rule": "أَنَا berarti saya dan dapat menjadi mubtada.",
    "arabic": "أَنَا طَالِبٌ",
    "transliteration": "ana talibun",
    "meaning": "saya seorang pelajar",
    "prompt": "Apa arti أَنَا?",
    "answer": "أَنَا berarti saya.",
    "hint": "Dipakai untuk orang pertama tunggal."
  },
  {
    "id": "dhamir-munfashil-2",
    "label": "Anta",
    "rule": "أَنْتَ berarti kamu laki-laki.",
    "arabic": "أَنْتَ مُدَرِّسٌ",
    "transliteration": "anta mudarrisun",
    "meaning": "kamu seorang guru laki-laki",
    "prompt": "Untuk siapa أَنْتَ dipakai?",
    "answer": "Untuk kamu laki-laki.",
    "hint": "Perhatikan fathah di akhir dhamir."
  },
  {
    "id": "dhamir-munfashil-3",
    "label": "Anti",
    "rule": "أَنْتِ berarti kamu perempuan.",
    "arabic": "أَنْتِ طَالِبَةٌ",
    "transliteration": "anti talibatun",
    "meaning": "kamu seorang siswi",
    "prompt": "Untuk siapa أَنْتِ dipakai?",
    "answer": "Untuk kamu perempuan.",
    "hint": "Kasrah di akhir membedakan dari أَنْتَ."
  },
  {
    "id": "dhamir-munfashil-4",
    "label": "Huwa Hiya",
    "rule": "هُوَ untuk dia laki-laki, هِيَ untuk dia perempuan.",
    "arabic": "هُوَ طَبِيبٌ وَهِيَ طَبِيبَةٌ",
    "transliteration": "huwa tabibun wa hiya tabibatun",
    "meaning": "dia laki-laki dokter dan dia perempuan dokter",
    "prompt": "Bedakan هُوَ dan هِيَ.",
    "answer": "هُوَ untuk dia laki-laki, هِيَ untuk dia perempuan.",
    "hint": "Cocokkan dengan mudzakkar dan muannats."
  }
];

export default function ArabicNahwuTopik4Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
