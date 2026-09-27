import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-fiil-mudhari",
  "title": "Nahwu 14: Fiil Mudhari",
  "description": "Mengenali kata kerja sedang atau akan terjadi.",
  "topicNumber": 14,
  "focus": "Fiil mudhari sering diawali ya, ta, alif, atau nun.",
  "goal": "Tentukan makna dan petunjuk awalan pada fiil mudhari."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "fiil-mudhari-1",
    "label": "Ya Mudhari",
    "rule": "Awalan يَ sering menunjukkan dia laki-laki sedang/akan melakukan.",
    "arabic": "يَكْتُبُ",
    "transliteration": "yaktubu",
    "meaning": "dia sedang menulis",
    "prompt": "Apa makna يَكْتُبُ?",
    "answer": "Dia sedang atau akan menulis.",
    "hint": "Awalan ya untuk dia laki-laki."
  },
  {
    "id": "fiil-mudhari-2",
    "label": "Ta Mudhari",
    "rule": "Awalan تَ dapat menunjukkan dia perempuan atau kamu laki-laki sesuai konteks.",
    "arabic": "تَقْرَأُ فَاطِمَةُ",
    "transliteration": "taqrau fatimatu",
    "meaning": "Fatimah membaca",
    "prompt": "Mengapa memakai تَقْرَأُ?",
    "answer": "Karena pelakunya Fatimah yang muannats.",
    "hint": "Ta cocok dengan dia perempuan."
  },
  {
    "id": "fiil-mudhari-3",
    "label": "Alif Mudhari",
    "rule": "Awalan أَ menunjukkan saya dalam fiil mudhari.",
    "arabic": "أَذْهَبُ",
    "transliteration": "adhhabu",
    "meaning": "saya pergi",
    "prompt": "Siapa pelaku tersirat أَذْهَبُ?",
    "answer": "Saya.",
    "hint": "Awalan hamzah/alif untuk orang pertama tunggal."
  },
  {
    "id": "fiil-mudhari-4",
    "label": "Nun Mudhari",
    "rule": "Awalan نَ menunjukkan kami/kita dalam fiil mudhari.",
    "arabic": "نَدْرُسُ",
    "transliteration": "nadrusu",
    "meaning": "kami belajar",
    "prompt": "Siapa pelaku نَدْرُسُ?",
    "answer": "Kami atau kita.",
    "hint": "Awalan nun untuk orang pertama jamak."
  }
];

export default function ArabicNahwuTopik14Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
