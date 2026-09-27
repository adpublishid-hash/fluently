import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-mudzakkar-muannats",
  "title": "Nahwu 5: Mudzakkar dan Muannats",
  "description": "Mengenali jenis kata maskulin dan feminin pada kata Arab dasar.",
  "topicNumber": 5,
  "focus": "Jenis kata memengaruhi kata tunjuk, sifat, dan khabar.",
  "goal": "Tentukan apakah kata atau frasa termasuk mudzakkar atau muannats."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "mudzakkar-muannats-1",
    "label": "Mudzakkar",
    "rule": "Mudzakkar adalah bentuk maskulin atau kata yang diperlakukan sebagai maskulin.",
    "arabic": "طَالِبٌ",
    "transliteration": "talibun",
    "meaning": "siswa laki-laki",
    "prompt": "Apakah طَالِبٌ mudzakkar atau muannats?",
    "answer": "Mudzakkar.",
    "hint": "Tidak ada ta marbuthah dan maknanya laki-laki."
  },
  {
    "id": "mudzakkar-muannats-2",
    "label": "Muannats",
    "rule": "Muannats adalah bentuk feminin, sering ditandai ta marbuthah.",
    "arabic": "طَالِبَةٌ",
    "transliteration": "talibatun",
    "meaning": "siswi",
    "prompt": "Apakah طَالِبَةٌ mudzakkar atau muannats?",
    "answer": "Muannats.",
    "hint": "Ada ة di akhir kata."
  },
  {
    "id": "mudzakkar-muannats-3",
    "label": "Sifat Mengikuti",
    "rule": "Sifat biasanya mengikuti jenis kata yang dijelaskan.",
    "arabic": "بِنْتٌ صَغِيرَةٌ",
    "transliteration": "bintun saghiratun",
    "meaning": "anak perempuan kecil",
    "prompt": "Mengapa sifatnya صَغِيرَةٌ?",
    "answer": "Karena بِنْتٌ muannats, maka sifatnya ikut muannats.",
    "hint": "Sifat mendapat ة."
  },
  {
    "id": "mudzakkar-muannats-4",
    "label": "Kata Tunjuk",
    "rule": "هَذَا untuk mudzakkar, هَذِهِ untuk muannats dalam bentuk dekat.",
    "arabic": "هَذِهِ سَيَّارَةٌ",
    "transliteration": "hadhihi sayyaratun",
    "meaning": "ini sebuah mobil",
    "prompt": "Mengapa bukan هَذَا?",
    "answer": "Karena سَيَّارَةٌ muannats.",
    "hint": "Akhiran ة memberi petunjuk."
  }
];

export default function ArabicNahwuTopik5Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
