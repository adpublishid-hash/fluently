import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-makharij-tenggorokan",
  "title": "Makharij 1: Makharij Tenggorokan",
  "description": "Melatih huruf halqi yang keluar dari area tenggorokan.",
  "topicNumber": 1,
  "focus": "Hamzah, ha, ain, ha tebal, ghain, dan kha.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "makharij-tenggorokan-1",
    "title": "Hamzah jelas",
    "letter": "ء",
    "transliteration": "hamzah",
    "place": "Pangkal tenggorokan dengan hentakan suara pendek.",
    "meaning": "Bunyi putus yang keluar jelas.",
    "prompt": "Ucapkan ء dalam kata أَبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "أَبٌ",
    "modelTransliteration": "abun",
    "modelMeaning": "ayah",
    "hint": "Bedakan dari ع yang terasa lebih dalam dan mengalir. Fokus: Pangkal tenggorokan dengan hentakan suara pendek.",
    "contrast": "Bedakan dari ع yang terasa lebih dalam dan mengalir."
  },
  {
    "id": "makharij-tenggorokan-2",
    "title": "Ha lembut",
    "letter": "ه",
    "transliteration": "ha",
    "place": "Tenggorokan bagian bawah dengan napas ringan.",
    "meaning": "Ha ringan tanpa tekanan kasar.",
    "prompt": "Ucapkan ه dalam kata هُوَ, lalu rasakan titik keluarnya.",
    "modelWord": "هُوَ",
    "modelTransliteration": "huwa",
    "modelMeaning": "dia laki-laki",
    "hint": "Bedakan dari ح yang lebih kuat dan kering. Fokus: Tenggorokan bagian bawah dengan napas ringan.",
    "contrast": "Bedakan dari ح yang lebih kuat dan kering."
  },
  {
    "id": "makharij-tenggorokan-3",
    "title": "Ain",
    "letter": "ع",
    "transliteration": "ain",
    "place": "Tenggorokan bagian tengah dengan suara tertahan.",
    "meaning": "Bunyi khas yang tidak sama dengan a biasa.",
    "prompt": "Ucapkan ع dalam kata عِلْمٌ, lalu rasakan titik keluarnya.",
    "modelWord": "عِلْمٌ",
    "modelTransliteration": "ilmun",
    "modelMeaning": "ilmu",
    "hint": "Jangan diganti hamzah atau vokal a biasa. Fokus: Tenggorokan bagian tengah dengan suara tertahan.",
    "contrast": "Jangan diganti hamzah atau vokal a biasa."
  },
  {
    "id": "makharij-tenggorokan-4",
    "title": "Kha",
    "letter": "خ",
    "transliteration": "kha",
    "place": "Tenggorokan bagian atas dengan gesekan jelas.",
    "meaning": "Bunyi kha tebal seperti udara bergesek.",
    "prompt": "Ucapkan خ dalam kata خَيْرٌ, lalu rasakan titik keluarnya.",
    "modelWord": "خَيْرٌ",
    "modelTransliteration": "khayrun",
    "modelMeaning": "kebaikan",
    "hint": "Bedakan dari غ yang bersuara lebih berat. Fokus: Tenggorokan bagian atas dengan gesekan jelas.",
    "contrast": "Bedakan dari غ yang bersuara lebih berat."
  }
];

export default function ArabicMakharijTopik1Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
