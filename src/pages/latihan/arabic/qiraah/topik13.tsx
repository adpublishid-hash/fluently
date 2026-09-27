import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-cuaca",
  "title": "Qiraah 13: Cuaca",
  "description": "Membaca kalimat tentang cuaca, panas, dingin, dan hujan.",
  "topicNumber": 13,
  "focus": "Pahami kata cuaca dan kondisi hari ini.",
  "goal": "Cari informasi cuaca dari teks Arab singkat."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "cuaca-1",
    "title": "Hari panas",
    "passage": "الْجَوُّ حَارٌّ الْيَوْمَ",
    "transliteration": "al-jawwu harrun al-yawma",
    "meaning": "Cuaca panas hari ini.",
    "focus": "Cuaca panas",
    "prompt": "Bagaimana cuaca hari ini?",
    "answer": "Cuaca hari ini panas.",
    "hint": "حَارٌّ berarti panas.",
    "keyword": "حَارٌّ",
    "keywordMeaning": "panas"
  },
  {
    "id": "cuaca-2",
    "title": "Hujan turun",
    "passage": "الْمَطَرُ يَنْزِلُ فِي الصَّبَاحِ",
    "transliteration": "al-mataru yanzilu fi as-sabahi",
    "meaning": "Hujan turun pada pagi hari.",
    "focus": "Hujan",
    "prompt": "Kapan hujan turun?",
    "answer": "Hujan turun pada pagi hari.",
    "hint": "الصَّبَاح berarti pagi.",
    "keyword": "الْمَطَرُ",
    "keywordMeaning": "hujan"
  },
  {
    "id": "cuaca-3",
    "title": "Malam dingin",
    "passage": "اللَّيْلُ بَارِدٌ فِي الْجَبَلِ",
    "transliteration": "al-laylu baridun fi al-jabali",
    "meaning": "Malam dingin di gunung.",
    "focus": "Cuaca dingin",
    "prompt": "Di mana malam terasa dingin?",
    "answer": "Malam terasa dingin di gunung.",
    "hint": "الْجَبَل berarti gunung.",
    "keyword": "بَارِدٌ",
    "keywordMeaning": "dingin"
  },
  {
    "id": "cuaca-4",
    "title": "Langit cerah",
    "passage": "السَّمَاءُ صَافِيَةٌ بَعْدَ الْمَطَرِ",
    "transliteration": "as-samau safiyatun bada al-matari",
    "meaning": "Langit cerah setelah hujan.",
    "focus": "Kondisi langit",
    "prompt": "Bagaimana keadaan langit?",
    "answer": "Langit cerah setelah hujan.",
    "hint": "صَافِيَةٌ berarti cerah/jernih.",
    "keyword": "السَّمَاءُ",
    "keywordMeaning": "langit"
  }
];

export default function ArabicQiraahTopik13Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
