import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-huruf-lidah-depan",
  "title": "Makharij 3: Huruf Lidah Depan",
  "description": "Melatih huruf yang banyak memakai ujung lidah.",
  "topicNumber": 3,
  "focus": "Ta, dal, tsa, dzal, sin, dan nun.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "huruf-lidah-depan-1",
    "title": "Ta",
    "letter": "ت",
    "transliteration": "ta",
    "place": "Ujung lidah menyentuh pangkal gigi atas.",
    "meaning": "Letupan tipis dari ujung lidah.",
    "prompt": "Ucapkan ت dalam kata تَمْرٌ, lalu rasakan titik keluarnya.",
    "modelWord": "تَمْرٌ",
    "modelTransliteration": "tamrun",
    "modelMeaning": "kurma",
    "hint": "Bedakan dari ط yang lebih tebal. Fokus: Ujung lidah menyentuh pangkal gigi atas.",
    "contrast": "Bedakan dari ط yang lebih tebal."
  },
  {
    "id": "huruf-lidah-depan-2",
    "title": "Dal",
    "letter": "د",
    "transliteration": "dal",
    "place": "Ujung lidah menyentuh pangkal gigi atas.",
    "meaning": "Letupan bersuara yang tipis.",
    "prompt": "Ucapkan د dalam kata دَرْسٌ, lalu rasakan titik keluarnya.",
    "modelWord": "دَرْسٌ",
    "modelTransliteration": "darsun",
    "modelMeaning": "pelajaran",
    "hint": "Bedakan dari ض yang lebih berat. Fokus: Ujung lidah menyentuh pangkal gigi atas.",
    "contrast": "Bedakan dari ض yang lebih berat."
  },
  {
    "id": "huruf-lidah-depan-3",
    "title": "Tsa",
    "letter": "ث",
    "transliteration": "tsa",
    "place": "Ujung lidah dekat tepi gigi atas.",
    "meaning": "Bunyi tipis dengan aliran udara.",
    "prompt": "Ucapkan ث dalam kata ثَوْبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "ثَوْبٌ",
    "modelTransliteration": "thawbun",
    "modelMeaning": "pakaian",
    "hint": "Jangan diganti s biasa. Fokus: Ujung lidah dekat tepi gigi atas.",
    "contrast": "Jangan diganti s biasa."
  },
  {
    "id": "huruf-lidah-depan-4",
    "title": "Nun",
    "letter": "ن",
    "transliteration": "nun",
    "place": "Ujung lidah dengan dengung hidung.",
    "meaning": "Bunyi n yang stabil.",
    "prompt": "Ucapkan ن dalam kata نُورٌ, lalu rasakan titik keluarnya.",
    "modelWord": "نُورٌ",
    "modelTransliteration": "nurun",
    "modelMeaning": "cahaya",
    "hint": "Jaga dengungnya pendek dan jelas. Fokus: Ujung lidah dengan dengung hidung.",
    "contrast": "Jaga dengungnya pendek dan jelas."
  }
];

export default function ArabicMakharijTopik3Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
