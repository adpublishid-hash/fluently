import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-keluarga-dekat",
  "title": "Kalam 8: Keluarga Dekat",
  "description": "Latihan berbicara tentang ayah, ibu, saudara, dan saudari.",
  "topicNumber": 8,
  "focus": "Anggota keluarga inti",
  "goal": "Sebutkan anggota keluarga dan informasi singkat tentang mereka."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "keluarga-dekat-1",
    "title": "Ini ayahku",
    "situation": "Memperkenalkan keluarga",
    "arabic": "هَذَا أَبِي",
    "transliteration": "hadha abi",
    "meaning": "ini ayahku",
    "prompt": "Perkenalkan ayahmu.",
    "modelAnswer": "هَذَا أَبِي",
    "hint": "Abi berarti ayahku.",
    "challenge": "Tambahkan profesi ayahmu jika bisa."
  },
  {
    "id": "keluarga-dekat-2",
    "title": "Ini ibuku",
    "situation": "Memperkenalkan ibu",
    "arabic": "هَذِهِ أُمِّي",
    "transliteration": "hadhihi ummi",
    "meaning": "ini ibuku",
    "prompt": "Perkenalkan ibumu.",
    "modelAnswer": "هَذِهِ أُمِّي",
    "hint": "Hadhihi untuk muannats.",
    "challenge": "Ucapkan hadhihi dengan hi yang jelas."
  },
  {
    "id": "keluarga-dekat-3",
    "title": "Saudaraku pelajar",
    "situation": "Menceritakan saudara laki-laki",
    "arabic": "أَخِي طَالِبٌ",
    "transliteration": "akhi talibun",
    "meaning": "saudara laki-lakiku pelajar",
    "prompt": "Sebutkan saudara laki-lakimu seorang pelajar.",
    "modelAnswer": "أَخِي طَالِبٌ",
    "hint": "Akhi berarti saudara laki-lakiku.",
    "challenge": "Ganti talib dengan profesi lain."
  },
  {
    "id": "keluarga-dekat-4",
    "title": "Saya punya saudari",
    "situation": "Menyebut saudari",
    "arabic": "عِنْدِي أُخْتٌ",
    "transliteration": "indi ukhtun",
    "meaning": "saya punya saudari",
    "prompt": "Katakan bahwa kamu punya saudari.",
    "modelAnswer": "عِنْدِي أُخْتٌ",
    "hint": "Indi berarti saya punya.",
    "challenge": "Tambahkan nama saudari setelah kalimat ini."
  }
];

export default function ArabicKalamTopik8Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
