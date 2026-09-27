import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-ra-tafkhim",
  "title": "Makharij 17: Ra Tafkhim",
  "description": "Melatih ra yang dibaca tebal dalam kondisi tertentu.",
  "topicNumber": 17,
  "focus": "Ra tebal saat fathah, dhammah, atau sukun setelah fathah.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "ra-tafkhim-1",
    "title": "Ra fathah",
    "letter": "رَ",
    "transliteration": "ra",
    "place": "Ujung lidah bergetar dengan ruang mulut penuh.",
    "meaning": "Ra tebal dengan fathah.",
    "prompt": "Ucapkan رَ dalam kata رَبٌّ, lalu rasakan titik keluarnya.",
    "modelWord": "رَبٌّ",
    "modelTransliteration": "rabbun",
    "modelMeaning": "Tuhan",
    "hint": "Jangan terlalu tipis seperti ri. Fokus: Ujung lidah bergetar dengan ruang mulut penuh.",
    "contrast": "Jangan terlalu tipis seperti ri."
  },
  {
    "id": "ra-tafkhim-2",
    "title": "Ra dhammah",
    "letter": "رُ",
    "transliteration": "ru",
    "place": "Ra dengan dhammah dibaca tebal.",
    "meaning": "Ra tebal dengan dhammah.",
    "prompt": "Ucapkan رُ dalam kata رُوحٌ, lalu rasakan titik keluarnya.",
    "modelWord": "رُوحٌ",
    "modelTransliteration": "ruhun",
    "modelMeaning": "ruh",
    "hint": "Bibir membulat dan ra tetap penuh. Fokus: Ra dengan dhammah dibaca tebal.",
    "contrast": "Bibir membulat dan ra tetap penuh."
  },
  {
    "id": "ra-tafkhim-3",
    "title": "Ra sukun tebal",
    "letter": "رْ",
    "transliteration": "r",
    "place": "Ra mati setelah fathah cenderung tebal.",
    "meaning": "Ra sukun tebal.",
    "prompt": "Ucapkan رْ dalam kata أَرْضٌ, lalu rasakan titik keluarnya.",
    "modelWord": "أَرْضٌ",
    "modelTransliteration": "ardhun",
    "modelMeaning": "bumi",
    "hint": "Tahan getaran singkat. Fokus: Ra mati setelah fathah cenderung tebal.",
    "contrast": "Tahan getaran singkat."
  },
  {
    "id": "ra-tafkhim-4",
    "title": "Ra kontras",
    "letter": "رَ رِ",
    "transliteration": "ra ri",
    "place": "Membedakan ra tebal dan ra tipis.",
    "meaning": "Kontras ra.",
    "prompt": "Ucapkan رَ رِ dalam kata رَبِّي, lalu rasakan titik keluarnya.",
    "modelWord": "رَبِّي",
    "modelTransliteration": "rabbi",
    "modelMeaning": "Tuhanku",
    "hint": "Ra pertama lebih penuh daripada ri. Fokus: Membedakan ra tebal dan ra tipis.",
    "contrast": "Ra pertama lebih penuh daripada ri."
  }
];

export default function ArabicMakharijTopik17Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
