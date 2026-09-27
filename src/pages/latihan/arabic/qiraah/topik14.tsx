import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-hobi",
  "title": "Qiraah 14: Hobi",
  "description": "Membaca bacaan pendek tentang hobi dan kegiatan waktu luang.",
  "topicNumber": 14,
  "focus": "Kenali kata suka dan aktivitas hobi.",
  "goal": "Temukan hobi orang dalam teks dan alasannya jika ada."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "hobi-1",
    "title": "Suka membaca",
    "passage": "أُحِبُّ الْقِرَاءَةَ فِي الْمَسَاءِ",
    "transliteration": "uhibbu al-qiraata fi al-masai",
    "meaning": "Saya suka membaca pada sore hari.",
    "focus": "Hobi membaca",
    "prompt": "Apa hobi dalam teks?",
    "answer": "Hobinya membaca.",
    "hint": "الْقِرَاءَةَ berarti membaca.",
    "keyword": "الْقِرَاءَةَ",
    "keywordMeaning": "membaca"
  },
  {
    "id": "hobi-2",
    "title": "Bermain bola",
    "passage": "أَلْعَبُ كُرَةَ الْقَدَمِ مَعَ أَصْدِقَائِي",
    "transliteration": "alabu kurata al-qadami maa asdiqai",
    "meaning": "Saya bermain sepak bola bersama teman-temanku.",
    "focus": "Olahraga",
    "prompt": "Dengan siapa dia bermain?",
    "answer": "Dia bermain bersama teman-temannya.",
    "hint": "مَعَ berarti bersama.",
    "keyword": "أَصْدِقَائِي",
    "keywordMeaning": "teman-temanku"
  },
  {
    "id": "hobi-3",
    "title": "Menggambar",
    "passage": "تَرْسُمُ فَاطِمَةُ صُورَةً جَمِيلَةً",
    "transliteration": "tarsumu fatimatu suratan jamilatan",
    "meaning": "Fatimah menggambar gambar yang indah.",
    "focus": "Aktivitas seni",
    "prompt": "Apa yang dilakukan Fatimah?",
    "answer": "Fatimah menggambar.",
    "hint": "Kata kerja تَرْسُمُ berarti menggambar.",
    "keyword": "تَرْسُمُ",
    "keywordMeaning": "menggambar"
  },
  {
    "id": "hobi-4",
    "title": "Mendengar pelajaran",
    "passage": "أَسْمَعُ دَرْسًا عَرَبِيًّا كُلَّ لَيْلَةٍ",
    "transliteration": "asmau darsan arabiyyan kulla laylatin",
    "meaning": "Saya mendengar pelajaran Arab setiap malam.",
    "focus": "Hobi belajar",
    "prompt": "Seberapa sering dia mendengar pelajaran?",
    "answer": "Dia mendengar pelajaran setiap malam.",
    "hint": "كُلَّ لَيْلَةٍ berarti setiap malam.",
    "keyword": "كُلَّ لَيْلَةٍ",
    "keywordMeaning": "setiap malam"
  }
];

export default function ArabicQiraahTopik14Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
