import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-kasrah",
  "title": "Makharij 7: Kasrah",
  "description": "Melatih bunyi i pendek di bawah huruf.",
  "topicNumber": 7,
  "focus": "Kasrah pendek dan ringan.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "kasrah-1",
    "title": "Bi",
    "letter": "بِ",
    "transliteration": "bi",
    "place": "Bibir menutup lalu bunyi i pendek.",
    "meaning": "Bunyi bi pendek.",
    "prompt": "Ucapkan بِ dalam kata بِسْمِ, lalu rasakan titik keluarnya.",
    "modelWord": "بِسْمِ",
    "modelTransliteration": "bismi",
    "modelMeaning": "dengan nama",
    "hint": "Jangan menjadi bii panjang. Fokus: Bibir menutup lalu bunyi i pendek.",
    "contrast": "Jangan menjadi bii panjang."
  },
  {
    "id": "kasrah-2",
    "title": "Ki",
    "letter": "كِ",
    "transliteration": "ki",
    "place": "Kaf ringan dengan i pendek.",
    "meaning": "Bunyi ki pendek.",
    "prompt": "Ucapkan كِ dalam kata كِتَابٌ, lalu rasakan titik keluarnya.",
    "modelWord": "كِتَابٌ",
    "modelTransliteration": "kitabun",
    "modelMeaning": "buku",
    "hint": "Tetap ringan, tidak seperti qi. Fokus: Kaf ringan dengan i pendek.",
    "contrast": "Tetap ringan, tidak seperti qi."
  },
  {
    "id": "kasrah-3",
    "title": "Mi",
    "letter": "مِ",
    "transliteration": "mi",
    "place": "Bibir tertutup dengan i pendek.",
    "meaning": "Bunyi mi pendek.",
    "prompt": "Ucapkan مِ dalam kata مِنْ, lalu rasakan titik keluarnya.",
    "modelWord": "مِنْ",
    "modelTransliteration": "min",
    "modelMeaning": "dari",
    "hint": "Jaga i tetap pendek. Fokus: Bibir tertutup dengan i pendek.",
    "contrast": "Jaga i tetap pendek."
  },
  {
    "id": "kasrah-4",
    "title": "Li",
    "letter": "لِ",
    "transliteration": "li",
    "place": "Ujung lidah menyentuh gusi atas dengan i pendek.",
    "meaning": "Bunyi li pendek.",
    "prompt": "Ucapkan لِ dalam kata لِسَانٌ, lalu rasakan titik keluarnya.",
    "modelWord": "لِسَانٌ",
    "modelTransliteration": "lisanun",
    "modelMeaning": "lidah",
    "hint": "Jangan menebalkan lam biasa. Fokus: Ujung lidah menyentuh gusi atas dengan i pendek.",
    "contrast": "Jangan menebalkan lam biasa."
  }
];

export default function ArabicMakharijTopik7Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
