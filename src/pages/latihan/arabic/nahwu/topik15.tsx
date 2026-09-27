import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-fiil-amr",
  "title": "Nahwu 15: Fiil Amr",
  "description": "Mengenali bentuk perintah Arab yang sering dipakai di kelas.",
  "topicNumber": 15,
  "focus": "Fiil amr digunakan untuk memerintah atau meminta tindakan.",
  "goal": "Terjemahkan fiil amr dan kenali fungsi perintahnya."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "fiil-amr-1",
    "label": "Uktub",
    "rule": "Fiil amr memberi perintah langsung kepada lawan bicara.",
    "arabic": "اُكْتُبْ",
    "transliteration": "uktub",
    "meaning": "tulislah",
    "prompt": "Apa makna اُكْتُبْ?",
    "answer": "Tulislah.",
    "hint": "Dari akar menulis."
  },
  {
    "id": "fiil-amr-2",
    "label": "Iqra",
    "rule": "Fiil amr sering berakhiran sukun dalam bentuk dasar.",
    "arabic": "اِقْرَأْ",
    "transliteration": "iqra",
    "meaning": "bacalah",
    "prompt": "Apa fungsi اِقْرَأْ?",
    "answer": "Perintah untuk membaca.",
    "hint": "Sering terdengar dalam instruksi belajar."
  },
  {
    "id": "fiil-amr-3",
    "label": "Iftah",
    "rule": "Fiil amr dapat langsung diikuti objek.",
    "arabic": "اِفْتَحِ الْكِتَابَ",
    "transliteration": "iftahi al-kitaba",
    "meaning": "bukalah buku itu",
    "prompt": "Apa objek perintahnya?",
    "answer": "الْكِتَابَ adalah objeknya.",
    "hint": "Yang dibuka adalah buku."
  },
  {
    "id": "fiil-amr-4",
    "label": "Ijlis",
    "rule": "Fiil amr dipakai untuk instruksi singkat.",
    "arabic": "اِجْلِسْ",
    "transliteration": "ijlis",
    "meaning": "duduklah",
    "prompt": "Apa makna اِجْلِسْ?",
    "answer": "Duduklah.",
    "hint": "Perintah untuk duduk."
  }
];

export default function ArabicNahwuTopik15Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
