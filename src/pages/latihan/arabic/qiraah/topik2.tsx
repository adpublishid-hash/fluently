import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-salam-tertulis",
  "title": "Qiraah 2: Salam Tertulis",
  "description": "Membaca salam, respons, dan sapaan pendek dalam teks Arab.",
  "topicNumber": 2,
  "focus": "Pahami ungkapan pembuka dan penutup tertulis.",
  "goal": "Baca salam tertulis lalu bedakan sapaan, respons, dan doa singkat."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "salam-tertulis-1",
    "title": "Salam pembuka",
    "passage": "السَّلَامُ عَلَيْكُمْ يَا أَحْمَدُ",
    "transliteration": "as-salamu alaikum ya ahmadu",
    "meaning": "Semoga keselamatan atasmu, wahai Ahmad.",
    "focus": "Salam pembuka",
    "prompt": "Siapa yang disapa dalam teks?",
    "answer": "Yang disapa adalah Ahmad, ditunjukkan oleh يَا أَحْمَدُ.",
    "hint": "Kata يَا sering dipakai untuk memanggil.",
    "keyword": "أَحْمَدُ",
    "keywordMeaning": "Ahmad"
  },
  {
    "id": "salam-tertulis-2",
    "title": "Jawaban salam",
    "passage": "وَعَلَيْكُمُ السَّلَامُ يَا فَاطِمَةُ",
    "transliteration": "wa alaikumu as-salamu ya fatimatu",
    "meaning": "Dan semoga keselamatan atasmu, wahai Fatimah.",
    "focus": "Respons salam",
    "prompt": "Kalimat ini termasuk salam atau jawaban salam?",
    "answer": "Ini jawaban salam karena dimulai dengan وَعَلَيْكُمُ السَّلَامُ.",
    "hint": "Perhatikan awalan وَعَلَيْكُمُ.",
    "keyword": "وَعَلَيْكُمُ",
    "keywordMeaning": "dan atas kalian"
  },
  {
    "id": "salam-tertulis-3",
    "title": "Sapaan pagi",
    "passage": "صَبَاحُ الْخَيْرِ يَا صَدِيقِي",
    "transliteration": "sabahul khairi ya sadiqi",
    "meaning": "Selamat pagi, wahai temanku.",
    "focus": "Sapaan waktu",
    "prompt": "Sapaan waktu apa yang muncul?",
    "answer": "Sapaan waktunya adalah صَبَاحُ الْخَيْرِ, yaitu selamat pagi.",
    "hint": "صَبَاح berarti pagi.",
    "keyword": "صَبَاحُ",
    "keywordMeaning": "pagi"
  },
  {
    "id": "salam-tertulis-4",
    "title": "Penutup pendek",
    "passage": "إِلَى اللِّقَاءِ يَا أُسْتَاذُ",
    "transliteration": "ila al-liqai ya ustadhu",
    "meaning": "Sampai bertemu lagi, wahai guru.",
    "focus": "Penutup percakapan",
    "prompt": "Apa fungsi kalimat إِلَى اللِّقَاءِ?",
    "answer": "Fungsinya menutup percakapan: sampai bertemu lagi.",
    "hint": "Ungkapan ini sering muncul di akhir dialog.",
    "keyword": "إِلَى اللِّقَاءِ",
    "keywordMeaning": "sampai bertemu"
  }
];

export default function ArabicQiraahTopik2Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
