import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-urutan-kata",
  "title": "Nahwu 18: Urutan Kata",
  "description": "Melatih susunan kata dalam jumlah ismiyyah dan fiiliyyah.",
  "topicNumber": 18,
  "focus": "Bahasa Arab punya pola awal isim dan pola awal fiil.",
  "goal": "Identifikasi pola urutan kata dan fungsi setiap bagian utama."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "urutan-kata-1",
    "label": "Isim Lokasi",
    "rule": "Jumlah ismiyyah dapat berupa mubtada lalu keterangan tempat.",
    "arabic": "الْوَلَدُ فِي الْبَيْتِ",
    "transliteration": "al-waladu fi al-bayti",
    "meaning": "anak laki-laki itu di rumah",
    "prompt": "Apa pola urutan kalimat ini?",
    "answer": "Mubtada lalu khabar berupa frasa tempat.",
    "hint": "Diawali isim الْوَلَدُ."
  },
  {
    "id": "urutan-kata-2",
    "label": "Fiil Fail Maful",
    "rule": "Jumlah fiiliyyah dasar dapat berurutan fiil, fail, lalu objek.",
    "arabic": "يَفْتَحُ الْمُعَلِّمُ الْبَابَ",
    "transliteration": "yaftahu al-muallimu al-baba",
    "meaning": "guru itu membuka pintu",
    "prompt": "Apa objek kalimat ini?",
    "answer": "الْبَابَ adalah objek.",
    "hint": "Yang dibuka adalah pintu."
  },
  {
    "id": "urutan-kata-3",
    "label": "Fiil Muannats",
    "rule": "Fiil di awal bisa menyesuaikan pelaku muannats.",
    "arabic": "قَرَأَتْ فَاطِمَةُ الدَّرْسَ",
    "transliteration": "qaraat fatimatu ad-darsa",
    "meaning": "Fatimah membaca pelajaran",
    "prompt": "Apa fiilnya?",
    "answer": "قَرَأَتْ adalah fiil.",
    "hint": "Kata pertama menunjukkan kegiatan lampau."
  },
  {
    "id": "urutan-kata-4",
    "label": "Mubtada Tempat",
    "rule": "Keterangan tempat dapat menjadi khabar setelah mubtada.",
    "arabic": "الْقَلَمُ عَلَى الْمَكْتَبِ",
    "transliteration": "al-qalamu ala al-maktabi",
    "meaning": "pulpen itu di atas meja",
    "prompt": "Apa khabarnya?",
    "answer": "عَلَى الْمَكْتَبِ adalah khabar.",
    "hint": "Informasi posisi pulpen."
  }
];

export default function ArabicNahwuTopik18Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
