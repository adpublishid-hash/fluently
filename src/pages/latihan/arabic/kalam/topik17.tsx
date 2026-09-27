import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-hobi",
  "title": "Kalam 17: Hobi",
  "description": "Latihan menyebut hobi dan alasan sederhana.",
  "topicNumber": 17,
  "focus": "Hobi dan kesukaan",
  "goal": "Bicara tentang kegiatan yang kamu suka dengan kalimat pendek."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "hobi-1",
    "title": "Saya suka membaca",
    "situation": "Menyebut hobi",
    "arabic": "أُحِبُّ الْقِرَاءَةَ",
    "transliteration": "uhibbu al-qiraah",
    "meaning": "saya suka membaca",
    "prompt": "Katakan kamu suka membaca.",
    "modelAnswer": "أُحِبُّ الْقِرَاءَةَ",
    "hint": "Qiraah berarti membaca.",
    "challenge": "Tambahkan fi al-bayt jika di rumah."
  },
  {
    "id": "hobi-2",
    "title": "Hobiku menulis",
    "situation": "Memperkenalkan hobi",
    "arabic": "هِوَايَتِي الْكِتَابَةُ",
    "transliteration": "hiwayati al-kitabah",
    "meaning": "hobiku menulis",
    "prompt": "Katakan hobimu menulis.",
    "modelAnswer": "هِوَايَتِي الْكِتَابَةُ",
    "hint": "Hiwayati berarti hobiku.",
    "challenge": "Ganti menulis dengan menggambar."
  },
  {
    "id": "hobi-3",
    "title": "Saya bermain bola",
    "situation": "Menyebut olahraga",
    "arabic": "أَلْعَبُ كُرَةَ الْقَدَمِ",
    "transliteration": "alabu kurata al-qadami",
    "meaning": "saya bermain sepak bola",
    "prompt": "Katakan kamu bermain sepak bola.",
    "modelAnswer": "أَلْعَبُ كُرَةَ الْقَدَمِ",
    "hint": "Kurah al-qadam berarti sepak bola.",
    "challenge": "Ucapkan tanpa berhenti di tengah idafah."
  },
  {
    "id": "hobi-4",
    "title": "Hobi itu menyenangkan",
    "situation": "Memberi komentar",
    "arabic": "هِوَايَتِي مُفِيدَةٌ وَمُمْتِعَةٌ",
    "transliteration": "hiwayati mufidatun wa mumtiatun",
    "meaning": "hobiku bermanfaat dan menyenangkan",
    "prompt": "Katakan hobimu bermanfaat dan menyenangkan.",
    "modelAnswer": "هِوَايَتِي مُفِيدَةٌ وَمُمْتِعَةٌ",
    "hint": "Mufidah bermanfaat, mumtiah menyenangkan.",
    "challenge": "Ucapkan sebagai kalimat penutup mini speech."
  }
];

export default function ArabicKalamTopik17Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
