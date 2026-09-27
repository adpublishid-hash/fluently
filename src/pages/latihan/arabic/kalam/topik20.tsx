import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-review-dialog-pemula",
  "title": "Kalam 20: Review Dialog Pemula",
  "description": "Menggabungkan salam, perkenalan, asal, kabar, dan penutup.",
  "topicNumber": 20,
  "focus": "Dialog pemula lengkap",
  "goal": "Latih respons percakapan mini dari awal sampai akhir."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "review-dialog-pemula-1",
    "title": "Dialog pembuka",
    "situation": "Mulai percakapan",
    "arabic": "السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟",
    "transliteration": "as-salamu alaikum kayfa haluka?",
    "meaning": "salam, bagaimana kabarmu?",
    "prompt": "Buka dialog dengan salam dan tanya kabar.",
    "modelAnswer": "السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟",
    "hint": "Gabungkan salam dan kayfa haluka.",
    "challenge": "Ucapkan tanpa membaca setelah mendengar model."
  },
  {
    "id": "review-dialog-pemula-2",
    "title": "Jawab dan nama",
    "situation": "Menjawab perkenalan",
    "arabic": "أَنَا بِخَيْرٍ، اِسْمِي عَلِيٌّ",
    "transliteration": "ana bikhayrin ismi aliyun",
    "meaning": "saya baik, nama saya Ali",
    "prompt": "Jawab kabar dan sebutkan nama.",
    "modelAnswer": "أَنَا بِخَيْرٍ، اِسْمِي عَلِيٌّ",
    "hint": "Pakai ana bikhayr lalu ismi.",
    "challenge": "Ganti Ali dengan namamu."
  },
  {
    "id": "review-dialog-pemula-3",
    "title": "Asal dan hobi",
    "situation": "Melanjutkan obrolan",
    "arabic": "أَنَا مِنْ إِنْدُونِيسِيَا، أُحِبُّ الْقِرَاءَةَ",
    "transliteration": "ana min indunisiya uhibbu al-qiraah",
    "meaning": "saya dari Indonesia, saya suka membaca",
    "prompt": "Sebutkan asal dan hobi dalam satu respons.",
    "modelAnswer": "أَنَا مِنْ إِنْدُونِيسِيَا، أُحِبُّ الْقِرَاءَةَ",
    "hint": "Gabungkan ana min dan uhibbu.",
    "challenge": "Ganti hobi dengan hobimu sendiri."
  },
  {
    "id": "review-dialog-pemula-4",
    "title": "Tutup dialog",
    "situation": "Mengakhiri percakapan",
    "arabic": "شُكْرًا، إِلَى اللِّقَاءِ",
    "transliteration": "shukran ila al-liqa",
    "meaning": "terima kasih, sampai jumpa",
    "prompt": "Tutup dialog dengan terima kasih dan sampai jumpa.",
    "modelAnswer": "شُكْرًا، إِلَى اللِّقَاءِ",
    "hint": "Pakai shukran lalu ila al-liqa.",
    "challenge": "Ucapkan seperti benar-benar selesai berbicara."
  }
];

export default function ArabicKalamTopik20Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
