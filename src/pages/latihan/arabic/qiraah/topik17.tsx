import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-kesehatan-dasar",
  "title": "Qiraah 17: Kesehatan Dasar",
  "description": "Membaca teks pendek tentang sakit, sehat, obat, dan dokter.",
  "topicNumber": 17,
  "focus": "Kenali kondisi tubuh dan tindakan sederhana.",
  "goal": "Baca bacaan kesehatan lalu temukan keluhan dan solusi."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "kesehatan-dasar-1",
    "title": "Saya sakit",
    "passage": "أَنَا مَرِيضٌ الْيَوْمَ",
    "transliteration": "ana maridun al-yawma",
    "meaning": "Saya sakit hari ini.",
    "focus": "Kondisi tubuh",
    "prompt": "Bagaimana kondisi orang itu?",
    "answer": "Orang itu sakit hari ini.",
    "hint": "مَرِيضٌ berarti sakit.",
    "keyword": "مَرِيضٌ",
    "keywordMeaning": "sakit"
  },
  {
    "id": "kesehatan-dasar-2",
    "title": "Minum obat",
    "passage": "أَشْرَبُ الدَّوَاءَ بَعْدَ الطَّعَامِ",
    "transliteration": "ashrabu ad-dawaa bada at-taami",
    "meaning": "Saya minum obat setelah makan.",
    "focus": "Obat",
    "prompt": "Kapan obat diminum?",
    "answer": "Obat diminum setelah makan.",
    "hint": "بَعْدَ الطَّعَامِ berarti setelah makan.",
    "keyword": "الدَّوَاءَ",
    "keywordMeaning": "obat"
  },
  {
    "id": "kesehatan-dasar-3",
    "title": "Dokter datang",
    "passage": "الطَّبِيبُ فِي الْمُسْتَشْفَى",
    "transliteration": "at-tabibu fi al-mustashfa",
    "meaning": "Dokter berada di rumah sakit.",
    "focus": "Tempat kesehatan",
    "prompt": "Di mana dokter berada?",
    "answer": "Dokter berada di rumah sakit.",
    "hint": "الْمُسْتَشْفَى berarti rumah sakit.",
    "keyword": "الْمُسْتَشْفَى",
    "keywordMeaning": "rumah sakit"
  },
  {
    "id": "kesehatan-dasar-4",
    "title": "Kepala sakit",
    "passage": "رَأْسِي يُؤْلِمُنِي قَلِيلًا",
    "transliteration": "rasi yulimuni qalilan",
    "meaning": "Kepalaku sedikit sakit.",
    "focus": "Keluhan ringan",
    "prompt": "Bagian tubuh apa yang sakit?",
    "answer": "Bagian yang sakit adalah kepala.",
    "hint": "رَأْسِي berarti kepalaku.",
    "keyword": "رَأْسِي",
    "keywordMeaning": "kepalaku"
  }
];

export default function ArabicQiraahTopik17Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
