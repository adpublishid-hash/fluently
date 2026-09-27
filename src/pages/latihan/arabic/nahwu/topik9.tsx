import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-jumlah-fiiliyyah",
  "title": "Nahwu 9: Jumlah Fiiliyyah",
  "description": "Mengenali kalimat Arab yang dimulai dengan fiil.",
  "topicNumber": 9,
  "focus": "Jumlah fiiliyyah biasanya tersusun dari fiil dan fail.",
  "goal": "Tentukan fiil dan pelaku pada kalimat verbal pendek."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "jumlah-fiiliyyah-1",
    "label": "Fiil Madhi",
    "rule": "Jumlah fiiliyyah dimulai dengan fiil, lalu pelaku.",
    "arabic": "ذَهَبَ الْوَلَدُ",
    "transliteration": "dhahaba al-waladu",
    "meaning": "anak laki-laki itu pergi",
    "prompt": "Apa fiilnya?",
    "answer": "ذَهَبَ adalah fiil.",
    "hint": "Kata pertama adalah kegiatan."
  },
  {
    "id": "jumlah-fiiliyyah-2",
    "label": "Fiil Mudhari",
    "rule": "Fiil mudhari juga bisa memulai jumlah fiiliyyah.",
    "arabic": "يَقْرَأُ الطَّالِبُ",
    "transliteration": "yaqrau at-talibu",
    "meaning": "siswa itu membaca",
    "prompt": "Siapa fail atau pelakunya?",
    "answer": "الطَّالِبُ adalah fail.",
    "hint": "Pelaku muncul setelah kata kerja."
  },
  {
    "id": "jumlah-fiiliyyah-3",
    "label": "Fail Muannats",
    "rule": "Fiil dapat disesuaikan ketika pelakunya muannats.",
    "arabic": "تَكْتُبُ فَاطِمَةُ",
    "transliteration": "taktubu fatimatu",
    "meaning": "Fatimah menulis",
    "prompt": "Mengapa fiilnya تَكْتُبُ?",
    "answer": "Karena pelakunya فَاطِمَةُ yang muannats.",
    "hint": "Awalan ta sering muncul untuk dia perempuan."
  },
  {
    "id": "jumlah-fiiliyyah-4",
    "label": "Fiil Fail",
    "rule": "Kalimat verbal minimum punya kata kerja dan pelaku.",
    "arabic": "جَلَسَ الْمُعَلِّمُ",
    "transliteration": "jalasa al-muallimu",
    "meaning": "guru itu duduk",
    "prompt": "Tentukan fiil dan fail.",
    "answer": "جَلَسَ fiil, الْمُعَلِّمُ fail.",
    "hint": "Kegiatan dulu, pelaku setelahnya."
  }
];

export default function ArabicNahwuTopik9Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
