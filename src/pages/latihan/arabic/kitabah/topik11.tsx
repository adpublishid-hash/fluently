import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-kalimat-tanya",
  "title": "Kitabah 11: Kalimat Tanya",
  "description": "Menulis pertanyaan dasar dengan من، ما، أين، كيف.",
  "topicNumber": 11,
  "focus": "Kata tanya paling sering dipakai.",
  "goal": "Tulis kalimat tanya pendek dan tanda tanya Arab."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "kalimat-tanya-1",
    "title": "Siapa namamu",
    "modelText": "مَا اسْمُكَ؟",
    "transliteration": "ma ismuka?",
    "meaning": "Siapa namamu?",
    "focus": "Tanya nama",
    "prompt": "Tulis pertanyaan siapa namamu.",
    "answer": "مَا اسْمُكَ؟",
    "hint": "Gunakan مَا untuk menanyakan nama.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kalimat-tanya-2",
    "title": "Di mana buku",
    "modelText": "أَيْنَ الْكِتَابُ؟",
    "transliteration": "ayna al-kitabu?",
    "meaning": "Di mana buku itu?",
    "focus": "Tanya lokasi",
    "prompt": "Tulis pertanyaan di mana buku itu.",
    "answer": "أَيْنَ الْكِتَابُ؟",
    "hint": "أَيْنَ berarti di mana.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kalimat-tanya-3",
    "title": "Bagaimana kabar",
    "modelText": "كَيْفَ حَالُكَ؟",
    "transliteration": "kayfa haluka?",
    "meaning": "Bagaimana kabarmu?",
    "focus": "Tanya kabar",
    "prompt": "Tulis pertanyaan bagaimana kabarmu.",
    "answer": "كَيْفَ حَالُكَ؟",
    "hint": "كَيْفَ berarti bagaimana.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kalimat-tanya-4",
    "title": "Siapa guru",
    "modelText": "مَنْ هُوَ الْمُعَلِّمُ؟",
    "transliteration": "man huwa al-muallimu?",
    "meaning": "Siapa guru itu?",
    "focus": "Tanya orang",
    "prompt": "Tulis pertanyaan siapa guru itu.",
    "answer": "مَنْ هُوَ الْمُعَلِّمُ؟",
    "hint": "مَنْ berarti siapa.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik11Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
