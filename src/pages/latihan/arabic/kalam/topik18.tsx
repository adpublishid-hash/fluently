import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-cuaca",
  "title": "Kalam 18: Cuaca",
  "description": "Latihan bicara tentang cuaca hari ini.",
  "topicNumber": 18,
  "focus": "Cuaca, panas, dingin, dan hujan",
  "goal": "Tanya dan jelaskan cuaca dengan frasa sederhana."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "cuaca-1",
    "title": "Bagaimana cuaca",
    "situation": "Membuka obrolan ringan",
    "arabic": "كَيْفَ الْجَوُّ الْيَوْمَ؟",
    "transliteration": "kayfa al-jawwu al-yawma?",
    "meaning": "bagaimana cuaca hari ini?",
    "prompt": "Tanyakan cuaca hari ini.",
    "modelAnswer": "كَيْفَ الْجَوُّ الْيَوْمَ؟",
    "hint": "Al-jaww berarti cuaca.",
    "challenge": "Ucapkan sebagai small talk."
  },
  {
    "id": "cuaca-2",
    "title": "Cuaca panas",
    "situation": "Menjelaskan cuaca",
    "arabic": "الْجَوُّ حَارٌّ",
    "transliteration": "al-jawwu harrun",
    "meaning": "cuaca panas",
    "prompt": "Katakan cuaca panas.",
    "modelAnswer": "الْجَوُّ حَارٌّ",
    "hint": "Harrun berarti panas.",
    "challenge": "Tambahkan jiddan jika sangat panas."
  },
  {
    "id": "cuaca-3",
    "title": "Cuaca dingin",
    "situation": "Menjelaskan cuaca dingin",
    "arabic": "الْجَوُّ بَارِدٌ",
    "transliteration": "al-jawwu baridun",
    "meaning": "cuaca dingin",
    "prompt": "Katakan cuaca dingin.",
    "modelAnswer": "الْجَوُّ بَارِدٌ",
    "hint": "Barid berarti dingin.",
    "challenge": "Bandingkan harrun dan baridun."
  },
  {
    "id": "cuaca-4",
    "title": "Hujan turun",
    "situation": "Melihat hujan",
    "arabic": "الْمَطَرُ يَنْزِلُ",
    "transliteration": "al-mataru yanzilu",
    "meaning": "hujan turun",
    "prompt": "Katakan hujan sedang turun.",
    "modelAnswer": "الْمَطَرُ يَنْزِلُ",
    "hint": "Matar berarti hujan.",
    "challenge": "Ucapkan sambil menunjuk keluar."
  }
];

export default function ArabicKalamTopik18Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
