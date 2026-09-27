import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-huruf-tipis",
  "title": "Makharij 5: Huruf Tipis",
  "description": "Melatih huruf tarqiq agar tidak terdengar terlalu berat.",
  "topicNumber": 5,
  "focus": "Huruf tipis seperti sin, ta, dal, kaf, dan ya.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "huruf-tipis-1",
    "title": "Sin",
    "letter": "س",
    "transliteration": "sin",
    "place": "Ujung lidah dekat gigi dengan aliran udara tipis.",
    "meaning": "Bunyi s ringan.",
    "prompt": "Ucapkan س dalam kata سَمَكٌ, lalu rasakan titik keluarnya.",
    "modelWord": "سَمَكٌ",
    "modelTransliteration": "samakun",
    "modelMeaning": "ikan",
    "hint": "Jangan ditebalkan seperti ص. Fokus: Ujung lidah dekat gigi dengan aliran udara tipis.",
    "contrast": "Jangan ditebalkan seperti ص."
  },
  {
    "id": "huruf-tipis-2",
    "title": "Ta tipis",
    "letter": "ت",
    "transliteration": "ta",
    "place": "Ujung lidah menyentuh gigi atas dengan bunyi ringan.",
    "meaning": "Ta tipis.",
    "prompt": "Ucapkan ت dalam kata تِينٌ, lalu rasakan titik keluarnya.",
    "modelWord": "تِينٌ",
    "modelTransliteration": "tinun",
    "modelMeaning": "buah tin",
    "hint": "Jangan berubah menjadi ط. Fokus: Ujung lidah menyentuh gigi atas dengan bunyi ringan.",
    "contrast": "Jangan berubah menjadi ط."
  },
  {
    "id": "huruf-tipis-3",
    "title": "Kaf",
    "letter": "ك",
    "transliteration": "kaf",
    "place": "Tengah lidah menyentuh langit-langit.",
    "meaning": "Kaf ringan.",
    "prompt": "Ucapkan ك dalam kata كِتَابٌ, lalu rasakan titik keluarnya.",
    "modelWord": "كِتَابٌ",
    "modelTransliteration": "kitabun",
    "modelMeaning": "buku",
    "hint": "Bedakan dari ق yang keluar lebih belakang. Fokus: Tengah lidah menyentuh langit-langit.",
    "contrast": "Bedakan dari ق yang keluar lebih belakang."
  },
  {
    "id": "huruf-tipis-4",
    "title": "Ya",
    "letter": "ي",
    "transliteration": "ya",
    "place": "Tengah lidah dengan suara ringan.",
    "meaning": "Bunyi y atau mad ii.",
    "prompt": "Ucapkan ي dalam kata يَدٌ, lalu rasakan titik keluarnya.",
    "modelWord": "يَدٌ",
    "modelTransliteration": "yadun",
    "modelMeaning": "tangan",
    "hint": "Jangan ditekan terlalu berat. Fokus: Tengah lidah dengan suara ringan.",
    "contrast": "Jangan ditekan terlalu berat."
  }
];

export default function ArabicMakharijTopik5Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
