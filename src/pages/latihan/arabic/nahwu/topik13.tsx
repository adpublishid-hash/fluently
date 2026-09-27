import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-fiil-madhi",
  "title": "Nahwu 13: Fiil Madhi",
  "description": "Mengenali kata kerja lampau pada contoh Arab pendek.",
  "topicNumber": 13,
  "focus": "Fiil madhi menunjukkan pekerjaan yang sudah terjadi.",
  "goal": "Tentukan makna lampau dan pelaku tersirat pada fiil madhi."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "fiil-madhi-1",
    "label": "Kataba",
    "rule": "Fiil madhi bentuk dasar sering bermakna dia laki-laki telah melakukan.",
    "arabic": "كَتَبَ",
    "transliteration": "kataba",
    "meaning": "dia telah menulis",
    "prompt": "Apa makna كَتَبَ?",
    "answer": "Dia laki-laki telah menulis.",
    "hint": "Kata kerja lampau."
  },
  {
    "id": "fiil-madhi-2",
    "label": "Qaraa",
    "rule": "Fiil madhi menunjukkan kegiatan yang selesai terjadi.",
    "arabic": "قَرَأَ",
    "transliteration": "qaraa",
    "meaning": "dia telah membaca",
    "prompt": "Apakah قَرَأَ lampau atau sekarang?",
    "answer": "Lampau, karena termasuk fiil madhi.",
    "hint": "Terjemahkan dengan telah membaca."
  },
  {
    "id": "fiil-madhi-3",
    "label": "Dhahaba",
    "rule": "Bentuk madhi dapat dipakai di awal jumlah fiiliyyah.",
    "arabic": "ذَهَبَ عَلِيٌّ",
    "transliteration": "dhahaba aliyun",
    "meaning": "Ali telah pergi",
    "prompt": "Apa fiil madhi pada kalimat ini?",
    "answer": "ذَهَبَ adalah fiil madhi.",
    "hint": "Kegiatan pergi terjadi dulu."
  },
  {
    "id": "fiil-madhi-4",
    "label": "Jalasa",
    "rule": "Fiil madhi biasanya dibaca fathah pada pola dasar tiga huruf.",
    "arabic": "جَلَسَ",
    "transliteration": "jalasa",
    "meaning": "dia telah duduk",
    "prompt": "Apa makna جَلَسَ?",
    "answer": "Dia telah duduk.",
    "hint": "Pola fa-ala."
  }
];

export default function ArabicNahwuTopik13Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
