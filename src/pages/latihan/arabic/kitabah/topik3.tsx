import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-menulis-salam",
  "title": "Kitabah 3: Menulis Salam",
  "description": "Menulis salam, jawaban salam, dan sapaan singkat.",
  "topicNumber": 3,
  "focus": "Ungkapan pembuka dan penutup tulisan.",
  "goal": "Tulis salam Arab dengan ejaan dan urutan kata yang benar."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "menulis-salam-1",
    "title": "Salam lengkap",
    "modelText": "السَّلَامُ عَلَيْكُمْ",
    "transliteration": "as-salamu alaikum",
    "meaning": "Semoga keselamatan atas kalian.",
    "focus": "Salam pembuka",
    "prompt": "Salin salam lengkap untuk membuka pesan.",
    "answer": "السَّلَامُ عَلَيْكُمْ",
    "hint": "Mulai dengan السَّلَامُ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-salam-2",
    "title": "Jawaban salam",
    "modelText": "وَعَلَيْكُمُ السَّلَامُ",
    "transliteration": "wa alaikumu as-salam",
    "meaning": "Dan semoga keselamatan atas kalian.",
    "focus": "Respons salam",
    "prompt": "Tulis jawaban salam yang benar.",
    "answer": "وَعَلَيْكُمُ السَّلَامُ",
    "hint": "Ada huruf و di awal jawaban.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-salam-3",
    "title": "Selamat pagi",
    "modelText": "صَبَاحُ الْخَيْرِ",
    "transliteration": "sabahul khair",
    "meaning": "Selamat pagi.",
    "focus": "Sapaan waktu",
    "prompt": "Tulis sapaan pagi dalam bahasa Arab.",
    "answer": "صَبَاحُ الْخَيْرِ",
    "hint": "Kata الْخَيْرِ diawali alif lam.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "menulis-salam-4",
    "title": "Penutup",
    "modelText": "إِلَى اللِّقَاءِ",
    "transliteration": "ila al-liqa",
    "meaning": "Sampai bertemu.",
    "focus": "Penutup tulisan",
    "prompt": "Tulis penutup singkat setelah pesan.",
    "answer": "إِلَى اللِّقَاءِ",
    "hint": "Perhatikan hamzah pada إِلَى.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik3Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
