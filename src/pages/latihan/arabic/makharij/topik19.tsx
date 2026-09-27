import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-waqaf-pendek",
  "title": "Makharij 19: Waqaf Pendek",
  "description": "Melatih berhenti singkat di akhir kata dan kalimat.",
  "topicNumber": 19,
  "focus": "Berhenti tanpa menambah vokal baru.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "waqaf-pendek-1",
    "title": "Waqaf kitab",
    "letter": "كِتَابْ",
    "transliteration": "kitab",
    "place": "Berhenti pada kata kitab.",
    "meaning": "Waqaf akhir kata.",
    "prompt": "Ucapkan كِتَابْ dalam kata هَذَا كِتَابْ, lalu rasakan titik keluarnya.",
    "modelWord": "هَذَا كِتَابْ",
    "modelTransliteration": "hadha kitab",
    "modelMeaning": "ini buku",
    "hint": "Matikan akhir kata saat berhenti. Fokus: Berhenti pada kata kitab.",
    "contrast": "Matikan akhir kata saat berhenti."
  },
  {
    "id": "waqaf-pendek-2",
    "title": "Waqaf salam",
    "letter": "سَلَامْ",
    "transliteration": "salam",
    "place": "Berhenti pada kata salam.",
    "meaning": "Waqaf tanwin.",
    "prompt": "Ucapkan سَلَامْ dalam kata السَّلَامْ, lalu rasakan titik keluarnya.",
    "modelWord": "السَّلَامْ",
    "modelTransliteration": "as-salam",
    "modelMeaning": "salam",
    "hint": "Tanwin tidak dibaca penuh saat waqaf. Fokus: Berhenti pada kata salam.",
    "contrast": "Tanwin tidak dibaca penuh saat waqaf."
  },
  {
    "id": "waqaf-pendek-3",
    "title": "Waqaf rahim",
    "letter": "رَحِيمْ",
    "transliteration": "rahim",
    "place": "Berhenti pada kata rahim.",
    "meaning": "Mad sebelum waqaf.",
    "prompt": "Ucapkan رَحِيمْ dalam kata غَفُورٌ رَحِيمْ, lalu rasakan titik keluarnya.",
    "modelWord": "غَفُورٌ رَحِيمْ",
    "modelTransliteration": "ghafurun rahim",
    "modelMeaning": "Maha Pengampun lagi Penyayang",
    "hint": "Panjang secukupnya, akhir dimatikan. Fokus: Berhenti pada kata rahim.",
    "contrast": "Panjang secukupnya, akhir dimatikan."
  },
  {
    "id": "waqaf-pendek-4",
    "title": "Waqaf kalimat",
    "letter": "نَسْتَعِينْ",
    "transliteration": "nastain",
    "place": "Berhenti di akhir kalimat pendek.",
    "meaning": "Waqaf kalimat.",
    "prompt": "Ucapkan نَسْتَعِينْ dalam kata إِيَّاكَ نَسْتَعِينْ, lalu rasakan titik keluarnya.",
    "modelWord": "إِيَّاكَ نَسْتَعِينْ",
    "modelTransliteration": "iyyaka nastain",
    "modelMeaning": "hanya kepada-Mu kami meminta pertolongan",
    "hint": "Berhenti tenang tanpa menambah a. Fokus: Berhenti di akhir kalimat pendek.",
    "contrast": "Berhenti tenang tanpa menambah a."
  }
];

export default function ArabicMakharijTopik19Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
