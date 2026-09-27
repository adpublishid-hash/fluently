import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-salam-terdengar",
  "title": "Istima 2: Salam Terdengar",
  "description": "Menangkap salam, jawaban salam, dan sapaan Arab sederhana.",
  "topicNumber": 2,
  "focus": "Salam dan sapaan",
  "goal": "Dengarkan frasa sapaan, lalu tulis makna atau responsnya."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "salam-terdengar-1",
    "title": "Salam awal",
    "arabic": "السَّلَامُ عَلَيْكُمْ",
    "transliteration": "as-salamu alaikum",
    "meaning": "semoga keselamatan atas kalian",
    "focus": "Salam",
    "prompt": "Dengarkan. Frasa salam apa yang terdengar?",
    "answer": "السَّلَامُ عَلَيْكُمْ.",
    "hint": "Frasa dimulai dengan as-salamu.",
    "keyword": "السَّلَامُ"
  },
  {
    "id": "salam-terdengar-2",
    "title": "Jawab salam",
    "arabic": "وَعَلَيْكُمُ السَّلَامُ",
    "transliteration": "wa alaikumus-salam",
    "meaning": "dan semoga keselamatan atas kalian juga",
    "focus": "Jawaban salam",
    "prompt": "Dengarkan. Ini salam awal atau jawaban salam?",
    "answer": "Jawaban salam.",
    "hint": "Ada awalan wa alaikum.",
    "keyword": "وَعَلَيْكُمُ"
  },
  {
    "id": "salam-terdengar-3",
    "title": "Sapaan halo",
    "arabic": "مَرْحَبًا يَا أَحْمَدُ",
    "transliteration": "marhaban ya ahmadu",
    "meaning": "halo Ahmad",
    "focus": "Sapaan nama",
    "prompt": "Dengarkan. Nama siapa yang disebut?",
    "answer": "أَحْمَدُ.",
    "hint": "Nama muncul setelah يَا.",
    "keyword": "أَحْمَدُ"
  },
  {
    "id": "salam-terdengar-4",
    "title": "Selamat datang",
    "arabic": "أَهْلًا وَسَهْلًا",
    "transliteration": "ahlan wa sahlan",
    "meaning": "selamat datang",
    "focus": "Ungkapan sopan",
    "prompt": "Dengarkan. Apa arti ungkapan ini?",
    "answer": "Selamat datang.",
    "hint": "Ungkapan ini sering untuk menyambut orang.",
    "keyword": "أَهْلًا"
  }
];

export default function ArabicIstimaTopik2Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
