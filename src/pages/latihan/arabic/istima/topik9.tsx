import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-instruksi-kelas",
  "title": "Istima 9: Instruksi Kelas",
  "description": "Memahami perintah guru yang sering terdengar di kelas Arab.",
  "topicNumber": 9,
  "focus": "Perintah kelas",
  "goal": "Dengarkan instruksi, lalu tulis tindakan yang harus dilakukan."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "instruksi-kelas-1",
    "title": "Bukalah buku",
    "arabic": "اِفْتَحِ الْكِتَابَ",
    "transliteration": "iftahi al-kitaba",
    "meaning": "bukalah buku",
    "focus": "Instruksi",
    "prompt": "Dengarkan. Apa yang harus dibuka?",
    "answer": "Buku.",
    "hint": "Objeknya al-kitab.",
    "keyword": "الْكِتَابَ"
  },
  {
    "id": "instruksi-kelas-2",
    "title": "Tulislah",
    "arabic": "اُكْتُبْ فِي الدَّفْتَرِ",
    "transliteration": "uktub fi ad-daftari",
    "meaning": "tulislah di buku tulis",
    "focus": "Instruksi",
    "prompt": "Dengarkan. Tindakannya apa?",
    "answer": "Menulis.",
    "hint": "Uktub berarti tulislah.",
    "keyword": "اُكْتُبْ"
  },
  {
    "id": "instruksi-kelas-3",
    "title": "Bacalah",
    "arabic": "اِقْرَأِ الدَّرْسَ",
    "transliteration": "iqrai ad-darsa",
    "meaning": "bacalah pelajaran",
    "focus": "Instruksi",
    "prompt": "Dengarkan. Apa yang harus dibaca?",
    "answer": "Pelajaran.",
    "hint": "Objeknya ad-dars.",
    "keyword": "الدَّرْسَ"
  },
  {
    "id": "instruksi-kelas-4",
    "title": "Dengarkan",
    "arabic": "اِسْمَعْ جَيِّدًا",
    "transliteration": "isma jayyidan",
    "meaning": "dengarkan baik-baik",
    "focus": "Instruksi",
    "prompt": "Dengarkan. Instruksi ini meminta apa?",
    "answer": "Mendengarkan baik-baik.",
    "hint": "Isma berarti dengarkan.",
    "keyword": "اِسْمَعْ"
  }
];

export default function ArabicIstimaTopik9Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
