import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-aktivitas-harian",
  "title": "Kalam 10: Aktivitas Harian",
  "description": "Latihan berbicara tentang rutinitas pagi, belajar, dan tidur.",
  "topicNumber": 10,
  "focus": "Rutinitas dengan fiil mudhari",
  "goal": "Sebutkan aktivitas harian dengan kalimat pendek."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "aktivitas-harian-1",
    "title": "Saya bangun pagi",
    "situation": "Menceritakan rutinitas pagi",
    "arabic": "أَسْتَيْقِظُ صَبَاحًا",
    "transliteration": "astayqizu sabahan",
    "meaning": "saya bangun pagi",
    "prompt": "Katakan kamu bangun pagi.",
    "modelAnswer": "أَسْتَيْقِظُ صَبَاحًا",
    "hint": "Sabahan berarti pagi hari.",
    "challenge": "Tambahkan jam bangunmu."
  },
  {
    "id": "aktivitas-harian-2",
    "title": "Saya pergi sekolah",
    "situation": "Menceritakan tujuan harian",
    "arabic": "أَذْهَبُ إِلَى الْمَدْرَسَةِ",
    "transliteration": "adhhabu ila al-madrasati",
    "meaning": "saya pergi ke sekolah",
    "prompt": "Katakan kamu pergi ke sekolah.",
    "modelAnswer": "أَذْهَبُ إِلَى الْمَدْرَسَةِ",
    "hint": "Ila berarti ke.",
    "challenge": "Ganti sekolah dengan kantor jika perlu."
  },
  {
    "id": "aktivitas-harian-3",
    "title": "Saya belajar Arab",
    "situation": "Menyebut kegiatan belajar",
    "arabic": "أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ",
    "transliteration": "adrusu al-lughata al-arabiyyata",
    "meaning": "saya belajar bahasa Arab",
    "prompt": "Katakan kamu belajar bahasa Arab.",
    "modelAnswer": "أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ",
    "hint": "Adrusu berarti saya belajar.",
    "challenge": "Ucapkan al-arabiyyah tanpa terburu-buru."
  },
  {
    "id": "aktivitas-harian-4",
    "title": "Saya tidur malam",
    "situation": "Menceritakan rutinitas malam",
    "arabic": "أَنَامُ لَيْلًا",
    "transliteration": "anamu laylan",
    "meaning": "saya tidur malam",
    "prompt": "Katakan kamu tidur pada malam hari.",
    "modelAnswer": "أَنَامُ لَيْلًا",
    "hint": "Laylan berarti malam.",
    "challenge": "Tambahkan setelah belajar jika bisa."
  }
];

export default function ArabicKalamTopik10Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
