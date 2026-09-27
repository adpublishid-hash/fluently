import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-transportasi",
  "title": "Kalam 16: Transportasi",
  "description": "Latihan bicara tentang kendaraan dan perjalanan singkat.",
  "topicNumber": 16,
  "focus": "Kendaraan dan tujuan perjalanan",
  "goal": "Sebutkan kendaraan yang dipakai dan tujuan perjalanan."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "transportasi-1",
    "title": "Saya naik bus",
    "situation": "Berangkat ke sekolah",
    "arabic": "أَرْكَبُ الْحَافِلَةَ",
    "transliteration": "arkabu al-hafilata",
    "meaning": "saya naik bus",
    "prompt": "Katakan kamu naik bus.",
    "modelAnswer": "أَرْكَبُ الْحَافِلَةَ",
    "hint": "Hafilah berarti bus.",
    "challenge": "Ganti bus dengan sayyarah."
  },
  {
    "id": "transportasi-2",
    "title": "Ke sekolah dengan mobil",
    "situation": "Menyebut kendaraan",
    "arabic": "أَذْهَبُ إِلَى الْمَدْرَسَةِ بِالسَّيَّارَةِ",
    "transliteration": "adhhabu ila al-madrasati bis-sayyarati",
    "meaning": "saya pergi ke sekolah dengan mobil",
    "prompt": "Katakan kamu pergi ke sekolah dengan mobil.",
    "modelAnswer": "أَذْهَبُ إِلَى الْمَدْرَسَةِ بِالسَّيَّارَةِ",
    "hint": "Bi berarti dengan.",
    "challenge": "Ucapkan panjang tapi tetap jelas."
  },
  {
    "id": "transportasi-3",
    "title": "Di mana stasiun",
    "situation": "Mencari transportasi",
    "arabic": "أَيْنَ الْمَحَطَّةُ؟",
    "transliteration": "ayna al-mahattatu?",
    "meaning": "di mana stasiun?",
    "prompt": "Tanyakan lokasi stasiun.",
    "modelAnswer": "أَيْنَ الْمَحَطَّةُ؟",
    "hint": "Mahattah berarti stasiun.",
    "challenge": "Ganti stasiun dengan bandara."
  },
  {
    "id": "transportasi-4",
    "title": "Saya pulang sekarang",
    "situation": "Mengakhiri perjalanan",
    "arabic": "أَرْجِعُ إِلَى الْبَيْتِ الآنَ",
    "transliteration": "arjiu ila al-bayti al-ana",
    "meaning": "saya pulang ke rumah sekarang",
    "prompt": "Katakan kamu pulang sekarang.",
    "modelAnswer": "أَرْجِعُ إِلَى الْبَيْتِ الآنَ",
    "hint": "Al-an berarti sekarang.",
    "challenge": "Ucapkan dengan ritme percakapan."
  }
];

export default function ArabicKalamTopik16Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
