import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-review-tulisan-pemula",
  "title": "Kitabah 20: Review Tulisan Pemula",
  "description": "Menggabungkan salam, identitas, lokasi, dan paragraf pendek.",
  "topicNumber": 20,
  "focus": "Review pola tulisan pemula dalam satu sesi.",
  "goal": "Tulis ulang berbagai pola dasar secara mandiri."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "review-tulisan-pemula-1",
    "title": "Review salam",
    "modelText": "السَّلَامُ عَلَيْكُمْ. اِسْمِي عَلِيٌّ.",
    "transliteration": "as-salamu alaikum. ismi aliyyun.",
    "meaning": "Assalamu alaikum. Namaku Ali.",
    "focus": "Salam dan nama",
    "prompt": "Tulis salam lalu perkenalkan nama Ali.",
    "answer": "السَّلَامُ عَلَيْكُمْ. اِسْمِي عَلِيٌّ.",
    "hint": "Gabungkan dua pola awal.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "review-tulisan-pemula-2",
    "title": "Review sekolah",
    "modelText": "أَنَا طَالِبٌ. أَدْرُسُ فِي الْمَدْرَسَةِ.",
    "transliteration": "ana talibun. adrusu fi al-madrasati.",
    "meaning": "Saya pelajar. Saya belajar di sekolah.",
    "focus": "Identitas dan tempat",
    "prompt": "Tulis saya pelajar dan belajar di sekolah.",
    "answer": "أَنَا طَالِبٌ. أَدْرُسُ فِي الْمَدْرَسَةِ.",
    "hint": "Gunakan فِي untuk tempat.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "review-tulisan-pemula-3",
    "title": "Review benda",
    "modelText": "هَذَا كِتَابٌ جَدِيدٌ عَلَى الطَّاوِلَةِ.",
    "transliteration": "hadha kitabun jadidun ala at-tawilati.",
    "meaning": "Ini buku baru di atas meja.",
    "focus": "Tunjuk dan lokasi",
    "prompt": "Tulis ini buku baru di atas meja.",
    "answer": "هَذَا كِتَابٌ جَدِيدٌ عَلَى الطَّاوِلَةِ.",
    "hint": "Mulai dengan هَذَا.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "review-tulisan-pemula-4",
    "title": "Review paragraf",
    "modelText": "أُسْرَتِي صَغِيرَةٌ. بَيْتِي قَرِيبٌ. أَذْهَبُ إِلَى الْمَدْرَسَةِ صَبَاحًا.",
    "transliteration": "usrati saghiratun. bayti qaribun. adhhabu ila al-madrasati sabahan.",
    "meaning": "Keluargaku kecil. Rumahku dekat. Saya pergi ke sekolah pagi hari.",
    "focus": "Paragraf review",
    "prompt": "Tulis paragraf review tiga kalimat.",
    "answer": "أُسْرَتِي صَغِيرَةٌ. بَيْتِي قَرِيبٌ. أَذْهَبُ إِلَى الْمَدْرَسَةِ صَبَاحًا.",
    "hint": "Jaga tiap kalimat tetap pendek.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik20Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
