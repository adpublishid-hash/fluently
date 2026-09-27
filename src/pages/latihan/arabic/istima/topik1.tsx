import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-bunyi-pendek-panjang",
  "title": "Istima 1: Bunyi Pendek dan Panjang",
  "description": "Melatih telinga membedakan harakat pendek dan bunyi mad panjang.",
  "topicNumber": 1,
  "focus": "Bunyi vokal pendek dan panjang",
  "goal": "Dengarkan durasi bunyi, lalu tulis kata atau pola yang kamu tangkap."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "bunyi-pendek-panjang-1",
    "title": "Dengar a pendek",
    "arabic": "بَابٌ",
    "transliteration": "babun",
    "meaning": "pintu",
    "focus": "Mad alif",
    "prompt": "Dengarkan. Bunyi panjang apa yang terdengar setelah ba?",
    "answer": "Bunyi aa panjang pada بَابٌ.",
    "hint": "Ada alif setelah ba.",
    "keyword": "بَا"
  },
  {
    "id": "bunyi-pendek-panjang-2",
    "title": "Dengar i pendek",
    "arabic": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "buku",
    "focus": "Kasrah dan mad",
    "prompt": "Dengarkan. Kata apa yang terdengar?",
    "answer": "كِتَابٌ, artinya buku.",
    "hint": "Awalnya ki, lalu taa panjang.",
    "keyword": "كِتَابٌ"
  },
  {
    "id": "bunyi-pendek-panjang-3",
    "title": "Dengar u pendek",
    "arabic": "نُورٌ",
    "transliteration": "nurun",
    "meaning": "cahaya",
    "focus": "Mad waw",
    "prompt": "Dengarkan. Bunyi panjangnya berada di bagian mana?",
    "answer": "Bunyi uu panjang pada نُورٌ.",
    "hint": "Ada waw setelah nun.",
    "keyword": "نُو"
  },
  {
    "id": "bunyi-pendek-panjang-4",
    "title": "Bandingkan pendek",
    "arabic": "قَلَمٌ",
    "transliteration": "qalamun",
    "meaning": "pulpen",
    "focus": "Harakat pendek",
    "prompt": "Dengarkan. Apakah kata ini punya bunyi mad panjang?",
    "answer": "Tidak, قَلَمٌ memakai bunyi pendek.",
    "hint": "Semua vokalnya pendek.",
    "keyword": "قَلَمٌ"
  }
];

export default function ArabicIstimaTopik1Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
