import { ArabicKitabahPracticePage, type ArabicKitabahDrill, type ArabicKitabahTopicMaterial } from '../../components/ArabicKitabahPracticePage';

const material: ArabicKitabahTopicMaterial = {
  "id": "arabic-kitabah-kartu-perkenalan",
  "title": "Kitabah 19: Kartu Perkenalan",
  "description": "Menulis kartu identitas sederhana berisi nama, asal, dan hobi.",
  "topicNumber": 19,
  "focus": "Format data diri singkat.",
  "goal": "Susun kartu perkenalan Arab dengan beberapa informasi dasar."
};

const drills: ArabicKitabahDrill[] = [
  {
    "id": "kartu-perkenalan-1",
    "title": "Nama dan asal",
    "modelText": "اِسْمِي سَارَةُ. أَنَا مِنْ جَاكَرْتَا.",
    "transliteration": "ismi saratu. ana min jakarta.",
    "meaning": "Namaku Sarah. Saya dari Jakarta.",
    "focus": "Kartu identitas",
    "prompt": "Tulis kartu singkat nama Sarah dan asal Jakarta.",
    "answer": "اِسْمِي سَارَةُ. أَنَا مِنْ جَاكَرْتَا.",
    "hint": "Gunakan dua kalimat pendek.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kartu-perkenalan-2",
    "title": "Status dan sekolah",
    "modelText": "أَنَا طَالِبَةٌ. أَدْرُسُ فِي الْمَدْرَسَةِ.",
    "transliteration": "ana talibatun. adrusu fi al-madrasati.",
    "meaning": "Saya siswi. Saya belajar di sekolah.",
    "focus": "Status belajar",
    "prompt": "Tulis kartu status siswi dan tempat belajar.",
    "answer": "أَنَا طَالِبَةٌ. أَدْرُسُ فِي الْمَدْرَسَةِ.",
    "hint": "طَالِبَةٌ untuk perempuan.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kartu-perkenalan-3",
    "title": "Hobi",
    "modelText": "هَوَايَتِي الْقِرَاءَةُ. أُحِبُّ الْكُتُبَ.",
    "transliteration": "hiwayati al-qiraatu. uhibbu al-kutuba.",
    "meaning": "Hobiku membaca. Saya suka buku.",
    "focus": "Hobi diri",
    "prompt": "Tulis kartu hobi membaca.",
    "answer": "هَوَايَتِي الْقِرَاءَةُ. أُحِبُّ الْكُتُبَ.",
    "hint": "هَوَايَتِي berarti hobiku.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  },
  {
    "id": "kartu-perkenalan-4",
    "title": "Kartu lengkap",
    "modelText": "اِسْمِي أَحْمَدُ. أَنَا مِنْ بَانْدُونغ. هَوَايَتِي الرِّيَاضَةُ.",
    "transliteration": "ismi ahmadu. ana min bandung. hiwayati ar-riyadatu.",
    "meaning": "Namaku Ahmad. Saya dari Bandung. Hobiku olahraga.",
    "focus": "Kartu mini",
    "prompt": "Tulis kartu perkenalan tiga kalimat.",
    "answer": "اِسْمِي أَحْمَدُ. أَنَا مِنْ بَانْدُونغ. هَوَايَتِي الرِّيَاضَةُ.",
    "hint": "Urutan: nama, asal, hobi.",
    "checklist": [
      "Tulis dari kanan ke kiri dengan jarak kata jelas.",
      "Periksa bentuk awal, tengah, dan akhir huruf.",
      "Bandingkan hasilmu dengan model sebelum lanjut."
    ]
  }
];

export default function ArabicKitabahTopik19Page() {
  return <ArabicKitabahPracticePage material={material} drills={drills} />;
}
