import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-kata-kelas",
  "title": "Istima 5: Kata Kelas",
  "description": "Menangkap kosakata benda kelas dari audio pendek.",
  "topicNumber": 5,
  "focus": "Benda di kelas",
  "goal": "Dengarkan kata benda kelas dan tulis benda yang terdengar."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "kata-kelas-1",
    "title": "Buku",
    "arabic": "هَذَا كِتَابٌ",
    "transliteration": "hadha kitabun",
    "meaning": "ini buku",
    "focus": "Benda kelas",
    "prompt": "Dengarkan. Benda apa yang disebut?",
    "answer": "كِتَابٌ, buku.",
    "hint": "Terdengar ki-taab.",
    "keyword": "كِتَابٌ"
  },
  {
    "id": "kata-kelas-2",
    "title": "Pulpen",
    "arabic": "هَذَا قَلَمٌ",
    "transliteration": "hadha qalamun",
    "meaning": "ini pulpen",
    "focus": "Benda kelas",
    "prompt": "Dengarkan. Benda apa yang disebut?",
    "answer": "قَلَمٌ, pulpen.",
    "hint": "Terdengar qa-la-mun.",
    "keyword": "قَلَمٌ"
  },
  {
    "id": "kata-kelas-3",
    "title": "Papan tulis",
    "arabic": "هَذِهِ سَبُّورَةٌ",
    "transliteration": "hadhihi sabburatun",
    "meaning": "ini papan tulis",
    "focus": "Benda kelas",
    "prompt": "Dengarkan. Apa arti kata terakhir?",
    "answer": "Papan tulis.",
    "hint": "Kata terakhir adalah sabburah.",
    "keyword": "سَبُّورَةٌ"
  },
  {
    "id": "kata-kelas-4",
    "title": "Kursi",
    "arabic": "الْكُرْسِيُّ فِي الْفَصْلِ",
    "transliteration": "al-kursiyyu fi al-fasli",
    "meaning": "kursi itu di kelas",
    "focus": "Lokasi kelas",
    "prompt": "Dengarkan. Benda apa yang ada di kelas?",
    "answer": "Kursi.",
    "hint": "Kata benda muncul di awal.",
    "keyword": "الْكُرْسِيُّ"
  }
];

export default function ArabicIstimaTopik5Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
