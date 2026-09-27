import { ArabicQiraahPracticePage, type ArabicQiraahDrill, type ArabicQiraahTopicMaterial } from '../../components/ArabicQiraahPracticePage';

const material: ArabicQiraahTopicMaterial = {
  "id": "arabic-qiraah-pekerjaan",
  "title": "Qiraah 18: Pekerjaan",
  "description": "Membaca deskripsi profesi dan tempat kerja sederhana.",
  "topicNumber": 18,
  "focus": "Pahami profesi, tempat kerja, dan kegiatan pekerjaan.",
  "goal": "Identifikasi profesi orang dan aktivitasnya dalam teks."
};

const drills: ArabicQiraahDrill[] = [
  {
    "id": "pekerjaan-1",
    "title": "Guru rajin",
    "passage": "أُمِّي مُعَلِّمَةٌ مُجْتَهِدَةٌ",
    "transliteration": "ummi muallimatun mujtahidatun",
    "meaning": "Ibuku guru yang rajin.",
    "focus": "Profesi keluarga",
    "prompt": "Apa profesi ibu?",
    "answer": "Profesi ibu adalah guru perempuan.",
    "hint": "مُعَلِّمَةٌ berarti guru perempuan.",
    "keyword": "مُعَلِّمَةٌ",
    "keywordMeaning": "guru perempuan"
  },
  {
    "id": "pekerjaan-2",
    "title": "Dokter di klinik",
    "passage": "الطَّبِيبُ يَعْمَلُ فِي الْعِيَادَةِ",
    "transliteration": "at-tabibu yamalu fi al-iyadati",
    "meaning": "Dokter bekerja di klinik.",
    "focus": "Tempat kerja",
    "prompt": "Di mana dokter bekerja?",
    "answer": "Dokter bekerja di klinik.",
    "hint": "فِي menunjukkan lokasi.",
    "keyword": "الْعِيَادَةِ",
    "keywordMeaning": "klinik"
  },
  {
    "id": "pekerjaan-3",
    "title": "Petani menanam",
    "passage": "الْفَلَّاحُ يَزْرَعُ الأَرْزَ",
    "transliteration": "al-fallahu yazrau al-uruzza",
    "meaning": "Petani menanam padi.",
    "focus": "Aktivitas profesi",
    "prompt": "Apa yang ditanam petani?",
    "answer": "Petani menanam padi.",
    "hint": "الأَرْزَ berarti padi/beras.",
    "keyword": "الْفَلَّاحُ",
    "keywordMeaning": "petani"
  },
  {
    "id": "pekerjaan-4",
    "title": "Pedagang di pasar",
    "passage": "التَّاجِرُ فِي السُّوقِ مُبْكِرًا",
    "transliteration": "at-tajiru fi as-suqi mubakkiran",
    "meaning": "Pedagang berada di pasar sejak pagi.",
    "focus": "Profesi pasar",
    "prompt": "Siapa yang berada di pasar?",
    "answer": "Yang berada di pasar adalah pedagang.",
    "hint": "التَّاجِرُ berarti pedagang.",
    "keyword": "التَّاجِرُ",
    "keywordMeaning": "pedagang"
  }
];

export default function ArabicQiraahTopik18Page() {
  return <ArabicQiraahPracticePage material={material} drills={drills} />;
}
