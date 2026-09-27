import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-harakat-fathah",
  "title": "Makharij 6: Harakat Fathah",
  "description": "Melatih bunyi a pendek pada huruf Arab.",
  "topicNumber": 6,
  "focus": "Fathah pendek dan jelas.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "harakat-fathah-1",
    "title": "Ba fathah",
    "letter": "بَ",
    "transliteration": "ba",
    "place": "Mulut terbuka ringan untuk bunyi a pendek.",
    "meaning": "Bunyi ba pendek.",
    "prompt": "Ucapkan بَ dalam kata بَابٌ, lalu rasakan titik keluarnya.",
    "modelWord": "بَابٌ",
    "modelTransliteration": "babun",
    "modelMeaning": "pintu",
    "hint": "Jangan dipanjangkan seperti baa kecuali ada alif. Fokus: Mulut terbuka ringan untuk bunyi a pendek.",
    "contrast": "Jangan dipanjangkan seperti baa kecuali ada alif."
  },
  {
    "id": "harakat-fathah-2",
    "title": "Ta fathah",
    "letter": "تَ",
    "transliteration": "ta",
    "place": "Ujung lidah ringan dengan bunyi a pendek.",
    "meaning": "Bunyi ta pendek.",
    "prompt": "Ucapkan تَ dalam kata تَمْرٌ, lalu rasakan titik keluarnya.",
    "modelWord": "تَمْرٌ",
    "modelTransliteration": "tamrun",
    "modelMeaning": "kurma",
    "hint": "Bedakan dari taa panjang. Fokus: Ujung lidah ringan dengan bunyi a pendek.",
    "contrast": "Bedakan dari taa panjang."
  },
  {
    "id": "harakat-fathah-3",
    "title": "Ja fathah",
    "letter": "جَ",
    "transliteration": "ja",
    "place": "Tengah lidah dengan bunyi a pendek.",
    "meaning": "Bunyi ja pendek.",
    "prompt": "Ucapkan جَ dalam kata جَبَلٌ, lalu rasakan titik keluarnya.",
    "modelWord": "جَبَلٌ",
    "modelTransliteration": "jabalun",
    "modelMeaning": "gunung",
    "hint": "Jangan menambah vokal panjang. Fokus: Tengah lidah dengan bunyi a pendek.",
    "contrast": "Jangan menambah vokal panjang."
  },
  {
    "id": "harakat-fathah-4",
    "title": "Ra fathah",
    "letter": "رَ",
    "transliteration": "ra",
    "place": "Ujung lidah bergetar ringan dengan a pendek.",
    "meaning": "Bunyi ra pendek.",
    "prompt": "Ucapkan رَ dalam kata رَجُلٌ, lalu rasakan titik keluarnya.",
    "modelWord": "رَجُلٌ",
    "modelTransliteration": "rajulun",
    "modelMeaning": "laki-laki",
    "hint": "Getaran cukup singkat. Fokus: Ujung lidah bergetar ringan dengan a pendek.",
    "contrast": "Getaran cukup singkat."
  }
];

export default function ArabicMakharijTopik6Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
