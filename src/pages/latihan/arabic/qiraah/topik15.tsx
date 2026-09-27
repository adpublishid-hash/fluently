import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-transportasi",
  "title": "Qiraah 15: Transportasi",
  "description": "Membaca teks tentang kendaraan dan perjalanan pendek.",
  "topicNumber": 15,
  "focus": "Pahami kendaraan dan tujuan perjalanan.",
  "goal": "Tentukan kendaraan yang digunakan dan tujuan perjalanannya."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "transportasi-1",
    "title": "Naik bus",
    "passage": "أَرْكَبُ الْحَافِلَةَ إِلَى الْمَدْرَسَةِ",
    "transliteration": "arkabu al-hafilata ila al-madrasati",
    "meaning": "Saya naik bus ke sekolah.",
    "focus": "Kendaraan umum",
    "prompt": "Kendaraan apa yang digunakan?",
    "answer": "Kendaraannya bus.",
    "hint": "الْحَافِلَةَ berarti bus.",
    "keyword": "الْحَافِلَةَ",
    "keywordMeaning": "bus"
  },
  {
    "id": "transportasi-2",
    "title": "Mobil ayah",
    "passage": "سَيَّارَةُ أَبِي جَدِيدَةٌ",
    "transliteration": "sayyaratu abi jadidatun",
    "meaning": "Mobil ayahku baru.",
    "focus": "Kendaraan pribadi",
    "prompt": "Mobil siapa yang baru?",
    "answer": "Mobil ayah yang baru.",
    "hint": "أَبِي berarti ayahku.",
    "keyword": "سَيَّارَةُ",
    "keywordMeaning": "mobil"
  },
  {
    "id": "transportasi-3",
    "title": "Stasiun dekat",
    "passage": "الْمَحَطَّةُ قَرِيبَةٌ مِنْ بَيْتِي",
    "transliteration": "al-mahattatu qaribatun min bayti",
    "meaning": "Stasiun dekat dari rumahku.",
    "focus": "Tempat transportasi",
    "prompt": "Apa yang dekat dari rumah?",
    "answer": "Stasiun dekat dari rumah.",
    "hint": "الْمَحَطَّةُ berarti stasiun.",
    "keyword": "الْمَحَطَّةُ",
    "keywordMeaning": "stasiun"
  },
  {
    "id": "transportasi-4",
    "title": "Pesawat pagi",
    "passage": "الطَّائِرَةُ تُسَافِرُ فِي الصَّبَاحِ",
    "transliteration": "at-tairatu tusafiru fi as-sabahi",
    "meaning": "Pesawat berangkat pada pagi hari.",
    "focus": "Jadwal kendaraan",
    "prompt": "Kapan pesawat berangkat?",
    "answer": "Pesawat berangkat pada pagi hari.",
    "hint": "الصَّبَاح berarti pagi.",
    "keyword": "الطَّائِرَةُ",
    "keywordMeaning": "pesawat"
  }
];

export default function ArabicQiraahTopik15Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
