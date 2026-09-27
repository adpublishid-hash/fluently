import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-idafah-dasar",
  "title": "Nahwu 12: Idafah Dasar",
  "description": "Memahami susunan kepemilikan atau hubungan dua isim.",
  "topicNumber": 12,
  "focus": "Idafah terdiri dari mudhaf dan mudhaf ilayh.",
  "goal": "Tentukan dua bagian idafah dan maknanya."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "idafah-dasar-1",
    "label": "Mudhaf",
    "rule": "Mudhaf adalah isim pertama dalam idafah.",
    "arabic": "كِتَابُ الطَّالِبِ",
    "transliteration": "kitabu at-talibi",
    "meaning": "buku siswa",
    "prompt": "Mana mudhafnya?",
    "answer": "كِتَابُ adalah mudhaf.",
    "hint": "Isim pertama adalah benda yang dimiliki/berhubungan."
  },
  {
    "id": "idafah-dasar-2",
    "label": "Mudhaf Ilayh",
    "rule": "Mudhaf ilayh adalah isim kedua dan biasanya majrur.",
    "arabic": "بَابُ الْبَيْتِ",
    "transliteration": "babu al-bayti",
    "meaning": "pintu rumah",
    "prompt": "Mana mudhaf ilayhnya?",
    "answer": "الْبَيْتِ adalah mudhaf ilayh.",
    "hint": "Isim kedua menjelaskan pemilik atau hubungan."
  },
  {
    "id": "idafah-dasar-3",
    "label": "Hubungan",
    "rule": "Idafah dapat bermakna hubungan, bukan hanya kepemilikan.",
    "arabic": "مُدَرِّسُ اللُّغَةِ",
    "transliteration": "mudarrisu al-lughati",
    "meaning": "guru bahasa",
    "prompt": "Apa makna susunan ini?",
    "answer": "Guru bahasa atau guru untuk bahasa.",
    "hint": "Tidak selalu berarti bahasa memiliki guru."
  },
  {
    "id": "idafah-dasar-4",
    "label": "Tanpa Al Pada Mudhaf",
    "rule": "Dalam idafah dasar, mudhaf tidak memakai ال.",
    "arabic": "اسْمُ الْوَلَدِ",
    "transliteration": "ismu al-waladi",
    "meaning": "nama anak laki-laki itu",
    "prompt": "Mengapa bukan الاسم الولد?",
    "answer": "Karena mudhaf biasanya tidak memakai ال dalam idafah.",
    "hint": "Isim pertama cukup disandarkan ke isim kedua."
  }
];

export default function ArabicNahwuTopik12Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
