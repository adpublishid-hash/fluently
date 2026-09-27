import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-pengumuman-pendek",
  "title": "Istima 19: Pengumuman Pendek",
  "description": "Menangkap informasi penting dari pengumuman Arab singkat.",
  "topicNumber": 19,
  "focus": "Pengumuman",
  "goal": "Dengarkan pengumuman lalu tulis waktu, tempat, atau aktivitas utama."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "pengumuman-pendek-1",
    "title": "Rapat pagi",
    "arabic": "الاِجْتِمَاعُ غَدًا صَبَاحًا",
    "transliteration": "al-ijtima ghadan sabahan",
    "meaning": "rapat besok pagi",
    "focus": "Waktu",
    "prompt": "Dengarkan. Kapan rapatnya?",
    "answer": "Besok pagi.",
    "hint": "Ghadan sabahan.",
    "keyword": "غَدًا صَبَاحًا"
  },
  {
    "id": "pengumuman-pendek-2",
    "title": "Kelas libur",
    "arabic": "الدَّرْسُ مُؤَجَّلٌ الْيَوْمَ",
    "transliteration": "ad-darsu muajjalun al-yawma",
    "meaning": "pelajaran ditunda hari ini",
    "focus": "Informasi kelas",
    "prompt": "Dengarkan. Apa yang terjadi pada pelajaran?",
    "answer": "Pelajaran ditunda hari ini.",
    "hint": "Muajjal berarti ditunda.",
    "keyword": "مُؤَجَّلٌ"
  },
  {
    "id": "pengumuman-pendek-3",
    "title": "Di masjid",
    "arabic": "اللِّقَاءُ فِي الْمَسْجِدِ",
    "transliteration": "al-liqau fi al-masjidi",
    "meaning": "pertemuan di masjid",
    "focus": "Tempat",
    "prompt": "Dengarkan. Pertemuan di mana?",
    "answer": "Di masjid.",
    "hint": "Tempat setelah fi.",
    "keyword": "الْمَسْجِدِ"
  },
  {
    "id": "pengumuman-pendek-4",
    "title": "Harap hadir",
    "arabic": "نَرْجُو الْحُضُورَ مُبَكِّرًا",
    "transliteration": "narju al-hudura mubakkiran",
    "meaning": "kami harap hadir lebih awal",
    "focus": "Instruksi pengumuman",
    "prompt": "Dengarkan. Hadirnya kapan?",
    "answer": "Lebih awal.",
    "hint": "Mubakkiran berarti lebih awal.",
    "keyword": "مُبَكِّرًا"
  }
];

export default function ArabicIstimaTopik19Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
