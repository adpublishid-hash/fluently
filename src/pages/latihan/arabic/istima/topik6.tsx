import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-kata-rumah",
  "title": "Istima 6: Kata Rumah",
  "description": "Mendengar kata rumah, kamar, pintu, dan dapur dalam kalimat pendek.",
  "topicNumber": 6,
  "focus": "Benda dan ruang rumah",
  "goal": "Tangkap lokasi atau benda rumah dari audio Arab sederhana."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "kata-rumah-1",
    "title": "Rumah besar",
    "arabic": "هَذَا بَيْتٌ كَبِيرٌ",
    "transliteration": "hadha baytun kabirun",
    "meaning": "ini rumah besar",
    "focus": "Rumah",
    "prompt": "Dengarkan. Benda utama apa yang disebut?",
    "answer": "بَيْتٌ, rumah.",
    "hint": "Kata setelah hadha.",
    "keyword": "بَيْتٌ"
  },
  {
    "id": "kata-rumah-2",
    "title": "Kamar",
    "arabic": "الْغُرْفَةُ نَظِيفَةٌ",
    "transliteration": "al-ghurfatu nazifatun",
    "meaning": "kamar itu bersih",
    "focus": "Ruang rumah",
    "prompt": "Dengarkan. Ruangan apa yang disebut?",
    "answer": "الْغُرْفَةُ, kamar.",
    "hint": "Kata pertama adalah ruangan.",
    "keyword": "الْغُرْفَةُ"
  },
  {
    "id": "kata-rumah-3",
    "title": "Pintu",
    "arabic": "الْبَابُ مَفْتُوحٌ",
    "transliteration": "al-babu maftuhun",
    "meaning": "pintu itu terbuka",
    "focus": "Benda rumah",
    "prompt": "Dengarkan. Apa yang terbuka?",
    "answer": "Pintu.",
    "hint": "Kata pertama: al-bab.",
    "keyword": "الْبَابُ"
  },
  {
    "id": "kata-rumah-4",
    "title": "Dapur",
    "arabic": "أُمِّي فِي الْمَطْبَخِ",
    "transliteration": "ummi fi al-matbakhi",
    "meaning": "ibuku di dapur",
    "focus": "Lokasi rumah",
    "prompt": "Dengarkan. Ibu berada di mana?",
    "answer": "Di dapur.",
    "hint": "Lokasi setelah fi.",
    "keyword": "الْمَطْبَخِ"
  }
];

export default function ArabicIstimaTopik6Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
