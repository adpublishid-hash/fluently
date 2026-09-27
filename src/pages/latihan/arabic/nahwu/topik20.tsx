import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-review-nahwu-pemula",
  "title": "Nahwu 20: Review Nahwu Pemula",
  "description": "Mengulang kaidah inti dari topik nahwu pemula dalam kalimat campuran.",
  "topicNumber": 20,
  "focus": "Gabungkan kata tunjuk, naat, idafah, jumlah fiiliyyah, dan negasi.",
  "goal": "Analisis kalimat pendek dengan beberapa kaidah sekaligus."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "review-nahwu-pemula-1",
    "label": "Tunjuk dan Naat",
    "rule": "Kata tunjuk dapat menjadi mubtada, lalu isim dan sifat memberi informasi.",
    "arabic": "هَذَا طَالِبٌ مُجْتَهِدٌ",
    "transliteration": "hadha talibun mujtahidun",
    "meaning": "ini siswa yang rajin",
    "prompt": "Apa naat pada kalimat ini?",
    "answer": "مُجْتَهِدٌ adalah naat untuk طَالِبٌ.",
    "hint": "Sifat rajin menjelaskan siswa."
  },
  {
    "id": "review-nahwu-pemula-2",
    "label": "Fiiliyyah dan Jar",
    "rule": "Jumlah fiiliyyah bisa diikuti huruf jar untuk arah atau tempat.",
    "arabic": "ذَهَبَتْ فَاطِمَةُ إِلَى الْمَدْرَسَةِ",
    "transliteration": "dhahabat fatimatu ila al-madrasati",
    "meaning": "Fatimah pergi ke sekolah",
    "prompt": "Apa huruf jar pada kalimat ini?",
    "answer": "إِلَى adalah huruf jar.",
    "hint": "Menunjukkan arah tujuan."
  },
  {
    "id": "review-nahwu-pemula-3",
    "label": "Idafah Khabar",
    "rule": "Susunan idafah bisa menjadi mubtada, lalu diikuti khabar.",
    "arabic": "كِتَابُ الْمُعَلِّمِ جَدِيدٌ",
    "transliteration": "kitabu al-muallimi jadidun",
    "meaning": "buku guru itu baru",
    "prompt": "Apa khabar kalimat ini?",
    "answer": "جَدِيدٌ adalah khabar.",
    "hint": "Yang baru adalah buku guru."
  },
  {
    "id": "review-nahwu-pemula-4",
    "label": "Negasi Mudhari",
    "rule": "لَا meniadakan fiil mudhari dalam kalimat sekarang.",
    "arabic": "لَا أَكْتُبُ الآنَ",
    "transliteration": "la aktubu al-ana",
    "meaning": "saya tidak menulis sekarang",
    "prompt": "Apa fiil mudhari pada kalimat ini?",
    "answer": "أَكْتُبُ adalah fiil mudhari.",
    "hint": "Awalan أَ menunjukkan saya."
  }
];

export default function ArabicNahwuTopik20Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
