import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-lokasi-benda",
  "title": "Istima 13: Lokasi Benda",
  "description": "Memahami posisi benda melalui kata depan Arab dasar.",
  "topicNumber": 13,
  "focus": "Lokasi dan posisi",
  "goal": "Tangkap letak benda setelah mendengar frasa tempat."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "lokasi-benda-1",
    "title": "Pulpen di meja",
    "arabic": "الْقَلَمُ عَلَى الطَّاوِلَةِ",
    "transliteration": "al-qalamu ala at-tawilati",
    "meaning": "pulpen di atas meja",
    "focus": "Posisi",
    "prompt": "Dengarkan. Pulpen berada di mana?",
    "answer": "Di atas meja.",
    "hint": "Ala berarti di atas.",
    "keyword": "عَلَى الطَّاوِلَةِ"
  },
  {
    "id": "lokasi-benda-2",
    "title": "Buku di tas",
    "arabic": "الْكِتَابُ فِي الْحَقِيبَةِ",
    "transliteration": "al-kitabu fi al-haqibati",
    "meaning": "buku di dalam tas",
    "focus": "Posisi",
    "prompt": "Dengarkan. Buku berada di mana?",
    "answer": "Di dalam tas.",
    "hint": "Fi berarti di dalam.",
    "keyword": "فِي الْحَقِيبَةِ"
  },
  {
    "id": "lokasi-benda-3",
    "title": "Kunci dekat pintu",
    "arabic": "الْمِفْتَاحُ قُرْبَ الْبَابِ",
    "transliteration": "al-miftahu qurba al-babi",
    "meaning": "kunci dekat pintu",
    "focus": "Posisi",
    "prompt": "Dengarkan. Kunci dekat apa?",
    "answer": "Dekat pintu.",
    "hint": "Qurba berarti dekat.",
    "keyword": "قُرْبَ الْبَابِ"
  },
  {
    "id": "lokasi-benda-4",
    "title": "Kursi di kelas",
    "arabic": "الْكُرْسِيُّ فِي الْفَصْلِ",
    "transliteration": "al-kursiyyu fi al-fasli",
    "meaning": "kursi di kelas",
    "focus": "Lokasi",
    "prompt": "Dengarkan. Kursi berada di mana?",
    "answer": "Di kelas.",
    "hint": "Lokasi setelah fi.",
    "keyword": "الْفَصْلِ"
  }
];

export default function ArabicIstimaTopik13Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
