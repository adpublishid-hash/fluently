import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-huruf-bibir",
  "title": "Makharij 2: Huruf Bibir",
  "description": "Melatih huruf yang keluar dari bibir dan sekitarnya.",
  "topicNumber": 2,
  "focus": "Ba, mim, waw, dan fa.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "huruf-bibir-1",
    "title": "Ba",
    "letter": "ب",
    "transliteration": "ba",
    "place": "Dua bibir bertemu rapat lalu terbuka.",
    "meaning": "Bunyi letupan bibir ringan.",
    "prompt": "Ucapkan ب dalam kata بَابٌ, lalu rasakan titik keluarnya.",
    "modelWord": "بَابٌ",
    "modelTransliteration": "babun",
    "modelMeaning": "pintu",
    "hint": "Jangan mirip ف yang memakai bibir bawah dan gigi atas. Fokus: Dua bibir bertemu rapat lalu terbuka.",
    "contrast": "Jangan mirip ف yang memakai bibir bawah dan gigi atas."
  },
  {
    "id": "huruf-bibir-2",
    "title": "Mim",
    "letter": "م",
    "transliteration": "mim",
    "place": "Dua bibir bertemu dengan dengung ringan.",
    "meaning": "Bunyi nasal dari bibir.",
    "prompt": "Ucapkan م dalam kata مَاءٌ, lalu rasakan titik keluarnya.",
    "modelWord": "مَاءٌ",
    "modelTransliteration": "maun",
    "modelMeaning": "air",
    "hint": "Tahan dengung sebentar tanpa berubah menjadi ba. Fokus: Dua bibir bertemu dengan dengung ringan.",
    "contrast": "Tahan dengung sebentar tanpa berubah menjadi ba."
  },
  {
    "id": "huruf-bibir-3",
    "title": "Waw",
    "letter": "و",
    "transliteration": "waw",
    "place": "Dua bibir membulat tanpa menutup penuh.",
    "meaning": "Bunyi w atau mad uu.",
    "prompt": "Ucapkan و dalam kata وَلَدٌ, lalu rasakan titik keluarnya.",
    "modelWord": "وَلَدٌ",
    "modelTransliteration": "waladun",
    "modelMeaning": "anak laki-laki",
    "hint": "Bibir membulat, bukan menekan seperti ba. Fokus: Dua bibir membulat tanpa menutup penuh.",
    "contrast": "Bibir membulat, bukan menekan seperti ba."
  },
  {
    "id": "huruf-bibir-4",
    "title": "Fa",
    "letter": "ف",
    "transliteration": "fa",
    "place": "Bibir bawah menyentuh gigi atas.",
    "meaning": "Bunyi gesek ringan.",
    "prompt": "Ucapkan ف dalam kata فَمٌ, lalu rasakan titik keluarnya.",
    "modelWord": "فَمٌ",
    "modelTransliteration": "famun",
    "modelMeaning": "mulut",
    "hint": "Jangan dibunyikan seperti pa atau ba. Fokus: Bibir bawah menyentuh gigi atas.",
    "contrast": "Jangan dibunyikan seperti pa atau ba."
  }
];

export default function ArabicMakharijTopik2Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
