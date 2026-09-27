import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-waktu-dan-jam",
  "title": "Kalam 13: Waktu dan Jam",
  "description": "Latihan bertanya jam dan menyebut waktu sederhana.",
  "topicNumber": 13,
  "focus": "Jam, pagi, siang, dan malam",
  "goal": "Tanyakan waktu dan jawab dengan jam sederhana."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "waktu-dan-jam-1",
    "title": "Jam berapa",
    "situation": "Bertanya waktu",
    "arabic": "كَمِ السَّاعَةُ؟",
    "transliteration": "kami as-saah?",
    "meaning": "jam berapa?",
    "prompt": "Tanyakan jam berapa sekarang.",
    "modelAnswer": "كَمِ السَّاعَةُ؟",
    "hint": "As-saah berarti jam.",
    "challenge": "Ucapkan sebagai pertanyaan cepat."
  },
  {
    "id": "waktu-dan-jam-2",
    "title": "Jam tujuh",
    "situation": "Menjawab waktu",
    "arabic": "السَّاعَةُ السَّابِعَةُ",
    "transliteration": "as-saah as-sabiah",
    "meaning": "jam tujuh",
    "prompt": "Jawab bahwa sekarang jam tujuh.",
    "modelAnswer": "السَّاعَةُ السَّابِعَةُ",
    "hint": "Sabiah dari angka tujuh.",
    "challenge": "Ganti dengan jam satu: al-wahidah."
  },
  {
    "id": "waktu-dan-jam-3",
    "title": "Pagi hari",
    "situation": "Menyebut waktu aktivitas",
    "arabic": "أَذْهَبُ صَبَاحًا",
    "transliteration": "adhhabu sabahan",
    "meaning": "saya pergi pagi hari",
    "prompt": "Katakan kamu pergi pagi hari.",
    "modelAnswer": "أَذْهَبُ صَبَاحًا",
    "hint": "Sabahan berarti pagi.",
    "challenge": "Tambahkan tempat tujuan setelah adhhabu."
  },
  {
    "id": "waktu-dan-jam-4",
    "title": "Malam hari",
    "situation": "Menyebut waktu belajar",
    "arabic": "أَدْرُسُ لَيْلًا",
    "transliteration": "adrusu laylan",
    "meaning": "saya belajar malam hari",
    "prompt": "Katakan kamu belajar malam hari.",
    "modelAnswer": "أَدْرُسُ لَيْلًا",
    "hint": "Laylan berarti malam.",
    "challenge": "Ucapkan dalam ritme pendek."
  }
];

export default function ArabicKalamTopik13Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
