import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-asal-negara",
  "title": "Kalam 3: Asal Negara",
  "description": "Latihan menyebut asal negara atau kota dengan pola ana min.",
  "topicNumber": 3,
  "focus": "Asal tempat dan pertanyaan min ayna",
  "goal": "Jawab asal tempat dengan kalimat pendek dan jelas."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "asal-negara-1",
    "title": "Saya dari Indonesia",
    "situation": "Menjawab asal negara",
    "arabic": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "transliteration": "ana min indunisiya",
    "meaning": "saya dari Indonesia",
    "prompt": "Jawab asal negaramu.",
    "modelAnswer": "أَنَا مِنْ إِنْدُونِيسِيَا",
    "hint": "Pola: ana min + tempat.",
    "challenge": "Ganti tempat dengan kota asalmu."
  },
  {
    "id": "asal-negara-2",
    "title": "Tanya asal",
    "situation": "Bertanya asal teman",
    "arabic": "مِنْ أَيْنَ أَنْتَ؟",
    "transliteration": "min ayna anta?",
    "meaning": "dari mana kamu?",
    "prompt": "Tanyakan asal kepada teman laki-laki.",
    "modelAnswer": "مِنْ أَيْنَ أَنْتَ؟",
    "hint": "Min ayna berarti dari mana.",
    "challenge": "Ucapkan tanpa jeda antara min dan ayna."
  },
  {
    "id": "asal-negara-3",
    "title": "Dia dari Jakarta",
    "situation": "Menceritakan asal orang lain",
    "arabic": "هُوَ مِنْ جَاكَرْتَا",
    "transliteration": "huwa min jakarta",
    "meaning": "dia laki-laki dari Jakarta",
    "prompt": "Sebutkan asal seorang teman laki-laki.",
    "modelAnswer": "هُوَ مِنْ جَاكَرْتَا",
    "hint": "Huwa untuk dia laki-laki.",
    "challenge": "Ganti Jakarta dengan kota lain."
  },
  {
    "id": "asal-negara-4",
    "title": "Dia perempuan dari Malaysia",
    "situation": "Menceritakan asal teman perempuan",
    "arabic": "هِيَ مِنْ مَالِيزِيَا",
    "transliteration": "hiya min maliziya",
    "meaning": "dia perempuan dari Malaysia",
    "prompt": "Sebutkan asal seorang teman perempuan.",
    "modelAnswer": "هِيَ مِنْ مَالِيزِيَا",
    "hint": "Hiya untuk dia perempuan.",
    "challenge": "Ucapkan hiya dan min dengan ritme stabil."
  }
];

export default function ArabicKalamTopik3Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
