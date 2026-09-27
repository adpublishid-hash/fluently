import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-makanan-sederhana",
  "title": "Qiraah 10: Makanan Sederhana",
  "description": "Membaca teks pendek tentang makanan, minuman, dan kesukaan.",
  "topicNumber": 10,
  "focus": "Cari makanan, minuman, dan kata suka dalam teks.",
  "goal": "Pahami pilihan makanan dan minuman dari bacaan Arab singkat."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "makanan-sederhana-1",
    "title": "Suka roti",
    "passage": "أُحِبُّ الْخُبْزَ وَالْجُبْنَ",
    "transliteration": "uhibbu al-khubza wal-jubna",
    "meaning": "Saya suka roti dan keju.",
    "focus": "Kesukaan makanan",
    "prompt": "Apa dua makanan yang disukai?",
    "answer": "Yang disukai adalah roti dan keju.",
    "hint": "Kata setelah أُحِبُّ adalah hal yang disukai.",
    "keyword": "الْخُبْزَ",
    "keywordMeaning": "roti"
  },
  {
    "id": "makanan-sederhana-2",
    "title": "Minum air",
    "passage": "أَشْرَبُ الْمَاءَ بَعْدَ الطَّعَامِ",
    "transliteration": "ashrabu al-maa bada at-taami",
    "meaning": "Saya minum air setelah makan.",
    "focus": "Minuman",
    "prompt": "Apa yang diminum?",
    "answer": "Yang diminum adalah air.",
    "hint": "الْمَاءَ berarti air.",
    "keyword": "الْمَاءَ",
    "keywordMeaning": "air"
  },
  {
    "id": "makanan-sederhana-3",
    "title": "Nasi panas",
    "passage": "الْأَرُزُّ حَارٌّ وَلَذِيذٌ",
    "transliteration": "al-aruzzu harrun wa ladhidhun",
    "meaning": "Nasi itu panas dan lezat.",
    "focus": "Sifat makanan",
    "prompt": "Bagaimana sifat nasi?",
    "answer": "Nasi itu panas dan lezat.",
    "hint": "Dua sifat muncul setelah الْأَرُزُّ.",
    "keyword": "لَذِيذٌ",
    "keywordMeaning": "lezat"
  },
  {
    "id": "makanan-sederhana-4",
    "title": "Teh pagi",
    "passage": "أَشْرَبُ الشَّايَ فِي الصَّبَاحِ",
    "transliteration": "ashrabu ash-shaya fi as-sabahi",
    "meaning": "Saya minum teh pada pagi hari.",
    "focus": "Minuman dan waktu",
    "prompt": "Kapan teh diminum?",
    "answer": "Teh diminum pada pagi hari.",
    "hint": "الصَّبَاح berarti pagi.",
    "keyword": "الشَّايَ",
    "keywordMeaning": "teh"
  }
];

export default function ArabicQiraahTopik10Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
