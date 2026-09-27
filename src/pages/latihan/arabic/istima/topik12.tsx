import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-jam-sederhana",
  "title": "Istima 12: Jam Sederhana",
  "description": "Menangkap waktu sederhana dari audio Arab pendek.",
  "topicNumber": 12,
  "focus": "Waktu dan jam",
  "goal": "Dengarkan kalimat waktu dan tulis jam atau bagian hari yang disebut."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "jam-sederhana-1",
    "title": "Jam satu",
    "arabic": "السَّاعَةُ الوَاحِدَةُ",
    "transliteration": "as-saah al-wahidah",
    "meaning": "jam satu",
    "focus": "Jam",
    "prompt": "Dengarkan. Jam berapa?",
    "answer": "Jam satu.",
    "hint": "Al-wahidah berarti pertama/satu.",
    "keyword": "الوَاحِدَةُ"
  },
  {
    "id": "jam-sederhana-2",
    "title": "Jam empat",
    "arabic": "السَّاعَةُ الرَّابِعَةُ",
    "transliteration": "as-saah ar-rabiah",
    "meaning": "jam empat",
    "focus": "Jam",
    "prompt": "Dengarkan. Angka jam berapa?",
    "answer": "Jam empat.",
    "hint": "Rabi ah dari angka empat.",
    "keyword": "الرَّابِعَةُ"
  },
  {
    "id": "jam-sederhana-3",
    "title": "Pagi",
    "arabic": "أَذْهَبُ صَبَاحًا",
    "transliteration": "adhhabu sabahan",
    "meaning": "saya pergi pada pagi hari",
    "focus": "Bagian hari",
    "prompt": "Dengarkan. Kapan pembicara pergi?",
    "answer": "Pagi hari.",
    "hint": "Sabahan berarti pagi.",
    "keyword": "صَبَاحًا"
  },
  {
    "id": "jam-sederhana-4",
    "title": "Malam",
    "arabic": "أَدْرُسُ لَيْلًا",
    "transliteration": "adrusu laylan",
    "meaning": "saya belajar pada malam hari",
    "focus": "Bagian hari",
    "prompt": "Dengarkan. Kapan pembicara belajar?",
    "answer": "Malam hari.",
    "hint": "Laylan berarti malam.",
    "keyword": "لَيْلًا"
  }
];

export default function ArabicIstimaTopik12Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
