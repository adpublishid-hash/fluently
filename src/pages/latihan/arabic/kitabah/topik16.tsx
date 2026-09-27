import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-pesan-pendek",
  "title": "Kitabah 16: Pesan Pendek",
  "description": "Menulis pesan singkat untuk teman atau guru.",
  "topicNumber": 16,
  "focus": "Pembuka, isi, dan penutup pesan sederhana.",
  "goal": "Tulis pesan Arab singkat yang sopan dan jelas."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "pesan-pendek-1",
    "title": "Pesan izin",
    "modelText": "يَا أُسْتَاذُ، أَسْتَأْذِنُ الْآنَ",
    "transliteration": "ya ustadhu asta-dhinu al-ana",
    "meaning": "Wahai guru, saya izin sekarang.",
    "focus": "Izin singkat",
    "prompt": "Tulis pesan izin singkat untuk guru.",
    "answer": "يَا أُسْتَاذُ، أَسْتَأْذِنُ الْآنَ",
    "hint": "Mulai dengan panggilan يَا أُسْتَاذُ.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "pesan-pendek-2",
    "title": "Pesan terima kasih",
    "modelText": "شُكْرًا يَا صَدِيقِي",
    "transliteration": "shukran ya sadiqi",
    "meaning": "Terima kasih, temanku.",
    "focus": "Ucapan terima kasih",
    "prompt": "Tulis pesan terima kasih untuk teman.",
    "answer": "شُكْرًا يَا صَدِيقِي",
    "hint": "صَدِيقِي berarti temanku.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "pesan-pendek-3",
    "title": "Pesan hadir",
    "modelText": "أَنَا أَحْضُرُ غَدًا إِنْ شَاءَ اللّٰهُ",
    "transliteration": "ana ahduru ghadan in shaa allah",
    "meaning": "Saya hadir besok insya Allah.",
    "focus": "Konfirmasi hadir",
    "prompt": "Tulis saya hadir besok insya Allah.",
    "answer": "أَنَا أَحْضُرُ غَدًا إِنْ شَاءَ اللّٰهُ",
    "hint": "غَدًا berarti besok.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "pesan-pendek-4",
    "title": "Pesan belajar",
    "modelText": "نَدْرُسُ مَعًا بَعْدَ الظُّهْرِ",
    "transliteration": "nadrusu maan bada azh-zhuhri",
    "meaning": "Kita belajar bersama setelah zuhur.",
    "focus": "Janji belajar",
    "prompt": "Tulis kita belajar bersama setelah zuhur.",
    "answer": "نَدْرُسُ مَعًا بَعْدَ الظُّهْرِ",
    "hint": "مَعًا berarti bersama.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik16Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
