import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-tasydid",
  "title": "Makharij 10: Tasydid",
  "description": "Melatih huruf ganda agar ditekan sebentar lalu dilepas.",
  "topicNumber": 10,
  "focus": "Tekanan tasydid pada huruf Arab.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "tasydid-1",
    "title": "Lam tasydid",
    "letter": "لّ",
    "transliteration": "ll",
    "place": "Ujung lidah menahan lam dua ketukan.",
    "meaning": "Lam ganda.",
    "prompt": "Ucapkan لّ dalam kata اللّٰهُ, lalu rasakan titik keluarnya.",
    "modelWord": "اللّٰهُ",
    "modelTransliteration": "allahu",
    "modelMeaning": "Allah",
    "hint": "Tahan lam sebentar sebelum vokal. Fokus: Ujung lidah menahan lam dua ketukan.",
    "contrast": "Tahan lam sebentar sebelum vokal."
  },
  {
    "id": "tasydid-2",
    "title": "Mim tasydid",
    "letter": "مّ",
    "transliteration": "mm",
    "place": "Dua bibir menahan mim dengan dengung.",
    "meaning": "Mim ganda.",
    "prompt": "Ucapkan مّ dalam kata أُمِّي, lalu rasakan titik keluarnya.",
    "modelWord": "أُمِّي",
    "modelTransliteration": "ummi",
    "modelMeaning": "ibuku",
    "hint": "Jangan terlalu cepat melewati mim. Fokus: Dua bibir menahan mim dengan dengung.",
    "contrast": "Jangan terlalu cepat melewati mim."
  },
  {
    "id": "tasydid-3",
    "title": "Nun tasydid",
    "letter": "نّ",
    "transliteration": "nn",
    "place": "Nun ganda dengan dengung jelas.",
    "meaning": "Nun ganda.",
    "prompt": "Ucapkan نّ dalam kata إِنَّ, lalu rasakan titik keluarnya.",
    "modelWord": "إِنَّ",
    "modelTransliteration": "inna",
    "modelMeaning": "sesungguhnya",
    "hint": "Dengungkan dengan stabil. Fokus: Nun ganda dengan dengung jelas.",
    "contrast": "Dengungkan dengan stabil."
  },
  {
    "id": "tasydid-4",
    "title": "Ra tasydid",
    "letter": "رّ",
    "transliteration": "rr",
    "place": "Ujung lidah bergetar lebih kuat.",
    "meaning": "Ra ganda.",
    "prompt": "Ucapkan رّ dalam kata مُدَرِّسٌ, lalu rasakan titik keluarnya.",
    "modelWord": "مُدَرِّسٌ",
    "modelTransliteration": "mudarrisun",
    "modelMeaning": "guru",
    "hint": "Jaga getaran tidak berlebihan. Fokus: Ujung lidah bergetar lebih kuat.",
    "contrast": "Jaga getaran tidak berlebihan."
  }
];

export default function ArabicMakharijTopik10Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
