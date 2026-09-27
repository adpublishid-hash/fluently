import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-dhammah",
  "title": "Makharij 8: Dhammah",
  "description": "Melatih bunyi u pendek dengan bibir membulat.",
  "topicNumber": 8,
  "focus": "Dhammah pendek, bibir bulat, dan stabil.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "dhammah-1",
    "title": "Bu",
    "letter": "بُ",
    "transliteration": "bu",
    "place": "Bibir menutup lalu membulat untuk u pendek.",
    "meaning": "Bunyi bu pendek.",
    "prompt": "Ucapkan بُ dalam kata بُرْجٌ, lalu rasakan titik keluarnya.",
    "modelWord": "بُرْجٌ",
    "modelTransliteration": "burjun",
    "modelMeaning": "menara",
    "hint": "Jangan menjadi buu panjang. Fokus: Bibir menutup lalu membulat untuk u pendek.",
    "contrast": "Jangan menjadi buu panjang."
  },
  {
    "id": "dhammah-2",
    "title": "Ku",
    "letter": "كُ",
    "transliteration": "ku",
    "place": "Kaf ringan dengan u pendek.",
    "meaning": "Bunyi ku pendek.",
    "prompt": "Ucapkan كُ dalam kata كُرْسِيٌّ, lalu rasakan titik keluarnya.",
    "modelWord": "كُرْسِيٌّ",
    "modelTransliteration": "kursiyyun",
    "modelMeaning": "kursi",
    "hint": "Bibir bulat tetapi tidak terlalu lama. Fokus: Kaf ringan dengan u pendek.",
    "contrast": "Bibir bulat tetapi tidak terlalu lama."
  },
  {
    "id": "dhammah-3",
    "title": "Mu",
    "letter": "مُ",
    "transliteration": "mu",
    "place": "Mim dengan bibir membulat.",
    "meaning": "Bunyi mu pendek.",
    "prompt": "Ucapkan مُ dalam kata مُسْلِمٌ, lalu rasakan titik keluarnya.",
    "modelWord": "مُسْلِمٌ",
    "modelTransliteration": "muslimun",
    "modelMeaning": "muslim",
    "hint": "Jaga dengung mim tetap pendek. Fokus: Mim dengan bibir membulat.",
    "contrast": "Jaga dengung mim tetap pendek."
  },
  {
    "id": "dhammah-4",
    "title": "Nu",
    "letter": "نُ",
    "transliteration": "nu",
    "place": "Nun dengan u pendek.",
    "meaning": "Bunyi nu pendek.",
    "prompt": "Ucapkan نُ dalam kata نُورٌ, lalu rasakan titik keluarnya.",
    "modelWord": "نُورٌ",
    "modelTransliteration": "nurun",
    "modelMeaning": "cahaya",
    "hint": "Bedakan dari nuu panjang pada mad. Fokus: Nun dengan u pendek.",
    "contrast": "Bedakan dari nuu panjang pada mad."
  }
];

export default function ArabicMakharijTopik8Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
