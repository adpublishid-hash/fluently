import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-nama-dan-asal",
  "title": "Qiraah 3: Nama dan Asal",
  "description": "Membaca teks singkat tentang nama, asal negara, dan kota.",
  "topicNumber": 3,
  "focus": "Cari nama orang dan tempat asal dalam kalimat.",
  "goal": "Temukan identitas orang dalam teks Arab sederhana."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "nama-dan-asal-1",
    "title": "Nama saya",
    "passage": "اِسْمِي عَلِيٌّ وَأَنَا طَالِبٌ",
    "transliteration": "ismi aliyyun wa ana talibun",
    "meaning": "Nama saya Ali dan saya seorang pelajar.",
    "focus": "Identitas nama",
    "prompt": "Siapa nama orang dalam teks?",
    "answer": "Namanya Ali, ditunjukkan oleh اِسْمِي عَلِيٌّ.",
    "hint": "Kata setelah اِسْمِي adalah nama.",
    "keyword": "عَلِيٌّ",
    "keywordMeaning": "Ali"
  },
  {
    "id": "nama-dan-asal-2",
    "title": "Asal Indonesia",
    "passage": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "transliteration": "ana min indunisiya",
    "meaning": "Saya dari Indonesia.",
    "focus": "Asal negara",
    "prompt": "Dari negara mana orang ini?",
    "answer": "Orang ini dari Indonesia, yaitu إِنْدُونِيسِيَا.",
    "hint": "Tempat asal muncul setelah مِنْ.",
    "keyword": "إِنْدُونِيسِيَا",
    "keywordMeaning": "Indonesia"
  },
  {
    "id": "nama-dan-asal-3",
    "title": "Kota asal",
    "passage": "سَارَةُ مِنْ جَاكَرْتَا",
    "transliteration": "saratu min jakarta",
    "meaning": "Sarah dari Jakarta.",
    "focus": "Asal kota",
    "prompt": "Sarah berasal dari mana?",
    "answer": "Sarah berasal dari Jakarta.",
    "hint": "Cari kata setelah مِنْ.",
    "keyword": "جَاكَرْتَا",
    "keywordMeaning": "Jakarta"
  },
  {
    "id": "nama-dan-asal-4",
    "title": "Teman baru",
    "passage": "هَذَا صَدِيقِي عُمَرُ مِنْ مَالِيزِيَا",
    "transliteration": "hadha sadiqi umaru min maliziya",
    "meaning": "Ini temanku Umar dari Malaysia.",
    "focus": "Identitas teman",
    "prompt": "Siapa nama teman dalam teks?",
    "answer": "Nama temannya Umar, asalnya Malaysia.",
    "hint": "Nama muncul setelah صَدِيقِي.",
    "keyword": "عُمَرُ",
    "keywordMeaning": "Umar"
  }
];

export default function ArabicQiraahTopik3Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
