import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-review-pelafalan-pemula",
  "title": "Makharij 20: Review Pelafalan Pemula",
  "description": "Menggabungkan huruf halqi, tebal-tipis, mad, dan waqaf.",
  "topicNumber": 20,
  "focus": "Review Makharij dasar pemula.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "review-pelafalan-pemula-1",
    "title": "Review halqi",
    "letter": "ع ح ه",
    "transliteration": "ain ha ha",
    "place": "Tiga bunyi tenggorokan yang sering tertukar.",
    "meaning": "Kontras halqi.",
    "prompt": "Ucapkan ع ح ه dalam kata عِلْمٌ حَسَنٌ هُنَا, lalu rasakan titik keluarnya.",
    "modelWord": "عِلْمٌ حَسَنٌ هُنَا",
    "modelTransliteration": "ilmun hasanun huna",
    "modelMeaning": "ilmu yang baik di sini",
    "hint": "Jaga ع، ح، ه tetap berbeda. Fokus: Tiga bunyi tenggorokan yang sering tertukar.",
    "contrast": "Jaga ع، ح، ه tetap berbeda."
  },
  {
    "id": "review-pelafalan-pemula-2",
    "title": "Review tebal tipis",
    "letter": "ق ك ص س",
    "transliteration": "qaf kaf shad sin",
    "place": "Pasangan tebal dan tipis.",
    "meaning": "Kontras utama.",
    "prompt": "Ucapkan ق ك ص س dalam kata قَلْبٌ كَبِيرٌ وَصَبْرٌ سَهْلٌ, lalu rasakan titik keluarnya.",
    "modelWord": "قَلْبٌ كَبِيرٌ وَصَبْرٌ سَهْلٌ",
    "modelTransliteration": "qalbun kabirun wa shabrun sahlun",
    "modelMeaning": "hati besar dan sabar itu mudah",
    "hint": "Jangan meratakan semua bunyi. Fokus: Pasangan tebal dan tipis.",
    "contrast": "Jangan meratakan semua bunyi."
  },
  {
    "id": "review-pelafalan-pemula-3",
    "title": "Review mad",
    "letter": "ا و ي",
    "transliteration": "aa uu ii",
    "place": "Mad asli dua harakat.",
    "meaning": "Panjang suara.",
    "prompt": "Ucapkan ا و ي dalam kata قَالُوا فِي بَيْتٍ, lalu rasakan titik keluarnya.",
    "modelWord": "قَالُوا فِي بَيْتٍ",
    "modelTransliteration": "qalu fi baytin",
    "modelMeaning": "mereka berkata di sebuah rumah",
    "hint": "Panjang mad stabil dua harakat. Fokus: Mad asli dua harakat.",
    "contrast": "Panjang mad stabil dua harakat."
  },
  {
    "id": "review-pelafalan-pemula-4",
    "title": "Review waqaf",
    "letter": "قَلْبْ",
    "transliteration": "qalb",
    "place": "Berhenti pada akhir kata.",
    "meaning": "Waqaf pendek.",
    "prompt": "Ucapkan قَلْبْ dalam kata هَذَا قَلْبْ, lalu rasakan titik keluarnya.",
    "modelWord": "هَذَا قَلْبْ",
    "modelTransliteration": "hadha qalb",
    "modelMeaning": "ini hati",
    "hint": "Akhir kata dimatikan saat berhenti. Fokus: Berhenti pada akhir kata.",
    "contrast": "Akhir kata dimatikan saat berhenti."
  }
];

export default function ArabicMakharijTopik20Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
