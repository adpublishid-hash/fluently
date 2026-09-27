import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-lam-jalalah",
  "title": "Makharij 18: Lam Jalalah",
  "description": "Melatih lam pada lafaz Allah dalam kondisi tebal dan tipis.",
  "topicNumber": 18,
  "focus": "Lam jalalah setelah fathah, dhammah, dan kasrah.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "lam-jalalah-1",
    "title": "Lam tebal",
    "letter": "اللّٰهُ",
    "transliteration": "allahu",
    "place": "Lam jalalah setelah fathah atau dhammah.",
    "meaning": "Lam tebal.",
    "prompt": "Ucapkan اللّٰهُ dalam kata قَالَ اللّٰهُ, lalu rasakan titik keluarnya.",
    "modelWord": "قَالَ اللّٰهُ",
    "modelTransliteration": "qala allahu",
    "modelMeaning": "Allah berfirman",
    "hint": "Lam terasa penuh setelah fathah. Fokus: Lam jalalah setelah fathah atau dhammah.",
    "contrast": "Lam terasa penuh setelah fathah."
  },
  {
    "id": "lam-jalalah-2",
    "title": "Lam tipis",
    "letter": "لِلّٰهِ",
    "transliteration": "lillahi",
    "place": "Lam jalalah setelah kasrah.",
    "meaning": "Lam tipis.",
    "prompt": "Ucapkan لِلّٰهِ dalam kata الْحَمْدُ لِلّٰهِ, lalu rasakan titik keluarnya.",
    "modelWord": "الْحَمْدُ لِلّٰهِ",
    "modelTransliteration": "alhamdu lillahi",
    "modelMeaning": "segala puji bagi Allah",
    "hint": "Lam menjadi tipis setelah kasrah. Fokus: Lam jalalah setelah kasrah.",
    "contrast": "Lam menjadi tipis setelah kasrah."
  },
  {
    "id": "lam-jalalah-3",
    "title": "Bismillah",
    "letter": "بِسْمِ اللّٰهِ",
    "transliteration": "bismillahi",
    "place": "Lam jalalah setelah kasrah pada bismi.",
    "meaning": "Lam tipis.",
    "prompt": "Ucapkan بِسْمِ اللّٰهِ dalam kata بِسْمِ اللّٰهِ, lalu rasakan titik keluarnya.",
    "modelWord": "بِسْمِ اللّٰهِ",
    "modelTransliteration": "bismillahi",
    "modelMeaning": "dengan nama Allah",
    "hint": "Jangan menebalkan lam setelah kasrah. Fokus: Lam jalalah setelah kasrah pada bismi.",
    "contrast": "Jangan menebalkan lam setelah kasrah."
  },
  {
    "id": "lam-jalalah-4",
    "title": "Allahu akbar",
    "letter": "اللّٰهُ أَكْبَرُ",
    "transliteration": "allahu akbar",
    "place": "Lam jalalah di awal dibaca penuh.",
    "meaning": "Lam tebal awal.",
    "prompt": "Ucapkan اللّٰهُ أَكْبَرُ dalam kata اللّٰهُ أَكْبَرُ, lalu rasakan titik keluarnya.",
    "modelWord": "اللّٰهُ أَكْبَرُ",
    "modelTransliteration": "allahu akbar",
    "modelMeaning": "Allah Mahabesar",
    "hint": "Jaga lam jelas sebelum ha. Fokus: Lam jalalah di awal dibaca penuh.",
    "contrast": "Jaga lam jelas sebelum ha."
  }
];

export default function ArabicMakharijTopik18Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
