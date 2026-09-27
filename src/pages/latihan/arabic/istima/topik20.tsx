import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-cerita-audio-mini",
  "title": "Istima 20: Cerita Audio Mini",
  "description": "Memahami cerita sangat pendek tentang rutinitas sehari-hari.",
  "topicNumber": 20,
  "focus": "Cerita pendek",
  "goal": "Dengarkan cerita mini dan tulis tokoh, tempat, atau aktivitas utamanya."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "cerita-audio-mini-1",
    "title": "Ali pagi hari",
    "arabic": "يَسْتَيْقِظُ عَلِيٌّ صَبَاحًا",
    "transliteration": "yastayqizu aliyun sabahan",
    "meaning": "Ali bangun pagi",
    "focus": "Tokoh dan waktu",
    "prompt": "Dengarkan. Siapa yang bangun pagi?",
    "answer": "Ali.",
    "hint": "Nama muncul setelah fiil.",
    "keyword": "عَلِيٌّ"
  },
  {
    "id": "cerita-audio-mini-2",
    "title": "Pergi sekolah",
    "arabic": "يَذْهَبُ إِلَى الْمَدْرَسَةِ",
    "transliteration": "yadhhabu ila al-madrasati",
    "meaning": "dia pergi ke sekolah",
    "focus": "Aktivitas",
    "prompt": "Dengarkan. Dia pergi ke mana?",
    "answer": "Ke sekolah.",
    "hint": "Tujuan setelah ila.",
    "keyword": "الْمَدْرَسَةِ"
  },
  {
    "id": "cerita-audio-mini-3",
    "title": "Membaca buku",
    "arabic": "يَقْرَأُ كِتَابًا جَدِيدًا",
    "transliteration": "yaqrau kitaban jadidan",
    "meaning": "dia membaca buku baru",
    "focus": "Aktivitas",
    "prompt": "Dengarkan. Apa yang dibaca?",
    "answer": "Buku baru.",
    "hint": "Kitaban jadidan.",
    "keyword": "كِتَابًا"
  },
  {
    "id": "cerita-audio-mini-4",
    "title": "Pulang malam",
    "arabic": "يَرْجِعُ إِلَى الْبَيْتِ لَيْلًا",
    "transliteration": "yarjiu ila al-bayti laylan",
    "meaning": "dia pulang ke rumah malam hari",
    "focus": "Akhir cerita",
    "prompt": "Dengarkan. Kapan dia pulang?",
    "answer": "Malam hari.",
    "hint": "Laylan berarti malam.",
    "keyword": "لَيْلًا"
  }
];

export default function ArabicIstimaTopik20Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
