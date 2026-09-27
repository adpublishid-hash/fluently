import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-mad-asli",
  "title": "Makharij 11: Mad Asli",
  "description": "Melatih panjang dua harakat pada alif, waw, dan ya mad.",
  "topicNumber": 11,
  "focus": "Panjang suara stabil tanpa berlebihan.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "mad-asli-1",
    "title": "Alif mad",
    "letter": "ا",
    "transliteration": "aa",
    "place": "Mulut terbuka dengan suara panjang dua harakat.",
    "meaning": "Bunyi aa panjang.",
    "prompt": "Ucapkan ا dalam kata بَابٌ, lalu rasakan titik keluarnya.",
    "modelWord": "بَابٌ",
    "modelTransliteration": "babun",
    "modelMeaning": "pintu",
    "hint": "Bedakan بَ pendek dan بَا panjang. Fokus: Mulut terbuka dengan suara panjang dua harakat.",
    "contrast": "Bedakan بَ pendek dan بَا panjang."
  },
  {
    "id": "mad-asli-2",
    "title": "Waw mad",
    "letter": "و",
    "transliteration": "uu",
    "place": "Bibir membulat dengan suara panjang dua harakat.",
    "meaning": "Bunyi uu panjang.",
    "prompt": "Ucapkan و dalam kata نُورٌ, lalu rasakan titik keluarnya.",
    "modelWord": "نُورٌ",
    "modelTransliteration": "nurun",
    "modelMeaning": "cahaya",
    "hint": "Jangan terlalu pendek seperti نُ. Fokus: Bibir membulat dengan suara panjang dua harakat.",
    "contrast": "Jangan terlalu pendek seperti نُ."
  },
  {
    "id": "mad-asli-3",
    "title": "Ya mad",
    "letter": "ي",
    "transliteration": "ii",
    "place": "Mulut melebar ringan dengan suara panjang dua harakat.",
    "meaning": "Bunyi ii panjang.",
    "prompt": "Ucapkan ي dalam kata فِيلٌ, lalu rasakan titik keluarnya.",
    "modelWord": "فِيلٌ",
    "modelTransliteration": "filun",
    "modelMeaning": "gajah",
    "hint": "Bedakan فِ pendek dan فِي panjang. Fokus: Mulut melebar ringan dengan suara panjang dua harakat.",
    "contrast": "Bedakan فِ pendek dan فِي panjang."
  },
  {
    "id": "mad-asli-4",
    "title": "Mad stabil",
    "letter": "ا و ي",
    "transliteration": "mad",
    "place": "Panjang suara dua harakat secara seimbang.",
    "meaning": "Latihan semua mad.",
    "prompt": "Ucapkan ا و ي dalam kata قَالُوا فِي, lalu rasakan titik keluarnya.",
    "modelWord": "قَالُوا فِي",
    "modelTransliteration": "qalu fi",
    "modelMeaning": "mereka berkata di",
    "hint": "Panjang tidak perlu dibuat lebih dari dua harakat. Fokus: Panjang suara dua harakat secara seimbang.",
    "contrast": "Panjang tidak perlu dibuat lebih dari dua harakat."
  }
];

export default function ArabicMakharijTopik11Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
