import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-angka-terdengar",
  "title": "Istima 7: Angka Terdengar",
  "description": "Melatih telinga mengenali angka Arab dasar dalam konteks pendek.",
  "topicNumber": 7,
  "focus": "Angka 1 sampai 10",
  "goal": "Dengarkan angka yang disebut dan tulis nilainya."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "angka-terdengar-1",
    "title": "Satu buku",
    "arabic": "عِنْدِي كِتَابٌ وَاحِدٌ",
    "transliteration": "indi kitabun wahidun",
    "meaning": "saya punya satu buku",
    "focus": "Angka",
    "prompt": "Dengarkan. Berapa jumlah buku?",
    "answer": "Satu.",
    "hint": "Angka wahid.",
    "keyword": "وَاحِدٌ"
  },
  {
    "id": "angka-terdengar-2",
    "title": "Dua pulpen",
    "arabic": "عِنْدِي قَلَمَانِ",
    "transliteration": "indi qalamani",
    "meaning": "saya punya dua pulpen",
    "focus": "Angka",
    "prompt": "Dengarkan. Berapa pulpen?",
    "answer": "Dua.",
    "hint": "Bentuk qalamani berarti dua pulpen.",
    "keyword": "قَلَمَانِ"
  },
  {
    "id": "angka-terdengar-3",
    "title": "Tiga siswa",
    "arabic": "فِي الْفَصْلِ ثَلَاثَةُ طُلَّابٍ",
    "transliteration": "fi al-fasli thalathatu tullabin",
    "meaning": "di kelas ada tiga siswa",
    "focus": "Angka",
    "prompt": "Dengarkan. Angka berapa yang terdengar?",
    "answer": "Tiga.",
    "hint": "Terdengar thalathah.",
    "keyword": "ثَلَاثَةُ"
  },
  {
    "id": "angka-terdengar-4",
    "title": "Jam tujuh",
    "arabic": "السَّاعَةُ السَّابِعَةُ",
    "transliteration": "as-saah as-sabiah",
    "meaning": "jam tujuh",
    "focus": "Angka waktu",
    "prompt": "Dengarkan. Jam berapa?",
    "answer": "Jam tujuh.",
    "hint": "Dari akar angka tujuh.",
    "keyword": "السَّابِعَةُ"
  }
];

export default function ArabicIstimaTopik7Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
