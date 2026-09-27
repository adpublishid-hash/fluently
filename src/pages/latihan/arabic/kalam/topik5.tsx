import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-ucapan-terima-kasih",
  "title": "Kalam 5: Ucapan Terima Kasih",
  "description": "Latihan mengucapkan terima kasih dan meresponsnya.",
  "topicNumber": 5,
  "focus": "Syukur, sopan santun, dan jawaban terima kasih",
  "goal": "Pakai ungkapan sopan setelah menerima bantuan atau hadiah."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "ucapan-terima-kasih-1",
    "title": "Terima kasih",
    "situation": "Menerima bantuan",
    "arabic": "شُكْرًا جَزِيلًا",
    "transliteration": "shukran jazilan",
    "meaning": "terima kasih banyak",
    "prompt": "Ucapkan terima kasih banyak.",
    "modelAnswer": "شُكْرًا جَزِيلًا",
    "hint": "Jazilan berarti banyak.",
    "challenge": "Ucapkan dengan jeda kecil setelah shukran."
  },
  {
    "id": "ucapan-terima-kasih-2",
    "title": "Sama-sama",
    "situation": "Menjawab terima kasih",
    "arabic": "عَفْوًا",
    "transliteration": "afwan",
    "meaning": "sama-sama/maaf",
    "prompt": "Jawab saat seseorang berkata shukran.",
    "modelAnswer": "عَفْوًا",
    "hint": "Afwan bisa berarti sama-sama.",
    "challenge": "Ucapkan pendek dan natural."
  },
  {
    "id": "ucapan-terima-kasih-3",
    "title": "Terima kasih guru",
    "situation": "Berterima kasih kepada guru",
    "arabic": "شُكْرًا يَا أُسْتَاذُ",
    "transliteration": "shukran ya ustadhu",
    "meaning": "terima kasih, wahai guru",
    "prompt": "Ucapkan terima kasih kepada guru laki-laki.",
    "modelAnswer": "شُكْرًا يَا أُسْتَاذُ",
    "hint": "Ya ustadhu untuk memanggil guru laki-laki.",
    "challenge": "Ganti ustadhu menjadi ustadzati untuk guru perempuan."
  },
  {
    "id": "ucapan-terima-kasih-4",
    "title": "Semoga dibalas baik",
    "situation": "Respons lebih religius/sopan",
    "arabic": "جَزَاكَ اللّٰهُ خَيْرًا",
    "transliteration": "jazakallahu khayran",
    "meaning": "semoga Allah membalasmu dengan kebaikan",
    "prompt": "Ucapkan doa singkat setelah dibantu.",
    "modelAnswer": "جَزَاكَ اللّٰهُ خَيْرًا",
    "hint": "Khayran berarti kebaikan.",
    "challenge": "Ucapkan perlahan agar tiap kata jelas."
  }
];

export default function ArabicKalamTopik5Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
