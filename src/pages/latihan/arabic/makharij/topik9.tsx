import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-sukun",
  "title": "Makharij 9: Sukun",
  "description": "Melatih huruf mati tanpa vokal setelahnya.",
  "topicNumber": 9,
  "focus": "Bunyi berhenti singkat pada huruf bersukun.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "sukun-1",
    "title": "Lam sukun",
    "letter": "لْ",
    "transliteration": "l",
    "place": "Ujung lidah menahan bunyi tanpa vokal.",
    "meaning": "Lam mati.",
    "prompt": "Ucapkan لْ dalam kata قَلْبٌ, lalu rasakan titik keluarnya.",
    "modelWord": "قَلْبٌ",
    "modelTransliteration": "qalbun",
    "modelMeaning": "hati",
    "hint": "Jangan menambah vokal e atau a setelah lam. Fokus: Ujung lidah menahan bunyi tanpa vokal.",
    "contrast": "Jangan menambah vokal e atau a setelah lam."
  },
  {
    "id": "sukun-2",
    "title": "Mim sukun",
    "letter": "مْ",
    "transliteration": "m",
    "place": "Bibir tertutup tanpa vokal tambahan.",
    "meaning": "Mim mati.",
    "prompt": "Ucapkan مْ dalam kata حَمْدٌ, lalu rasakan titik keluarnya.",
    "modelWord": "حَمْدٌ",
    "modelTransliteration": "hamdun",
    "modelMeaning": "pujian",
    "hint": "Tutup bibir rapi sebelum lanjut. Fokus: Bibir tertutup tanpa vokal tambahan.",
    "contrast": "Tutup bibir rapi sebelum lanjut."
  },
  {
    "id": "sukun-3",
    "title": "Nun sukun",
    "letter": "نْ",
    "transliteration": "n",
    "place": "Ujung lidah dan hidung dengan bunyi mati.",
    "meaning": "Nun mati.",
    "prompt": "Ucapkan نْ dalam kata مِنْ, lalu rasakan titik keluarnya.",
    "modelWord": "مِنْ",
    "modelTransliteration": "min",
    "modelMeaning": "dari",
    "hint": "Jangan menjadi mina jika tidak ada harakat. Fokus: Ujung lidah dan hidung dengan bunyi mati.",
    "contrast": "Jangan menjadi mina jika tidak ada harakat."
  },
  {
    "id": "sukun-4",
    "title": "Ba sukun",
    "letter": "بْ",
    "transliteration": "b",
    "place": "Dua bibir menutup dan berhenti singkat.",
    "meaning": "Ba mati.",
    "prompt": "Ucapkan بْ dalam kata سَبْتٌ, lalu rasakan titik keluarnya.",
    "modelWord": "سَبْتٌ",
    "modelTransliteration": "sabtun",
    "modelMeaning": "Sabtu",
    "hint": "Jangan menambah bunyi bu. Fokus: Dua bibir menutup dan berhenti singkat.",
    "contrast": "Jangan menambah bunyi bu."
  }
];

export default function ArabicMakharijTopik9Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
