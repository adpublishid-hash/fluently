import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-benda-di-kelas",
  "title": "Kalam 9: Benda di Kelas",
  "description": "Latihan menyebut benda kelas dan lokasinya.",
  "topicNumber": 9,
  "focus": "Benda kelas dan frasa lokasi",
  "goal": "Bicara tentang buku, pulpen, papan tulis, dan benda sekitar kelas."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "benda-di-kelas-1",
    "title": "Ini buku",
    "situation": "Menunjuk benda di meja",
    "arabic": "هَذَا كِتَابٌ",
    "transliteration": "hadha kitabun",
    "meaning": "ini buku",
    "prompt": "Tunjuk buku dan ucapkan kalimatnya.",
    "modelAnswer": "هَذَا كِتَابٌ",
    "hint": "Hadha untuk benda mudzakkar.",
    "challenge": "Ganti kitab dengan qalam."
  },
  {
    "id": "benda-di-kelas-2",
    "title": "Ini papan tulis",
    "situation": "Menunjuk papan tulis",
    "arabic": "هَذِهِ سَبُّورَةٌ",
    "transliteration": "hadhihi sabburatun",
    "meaning": "ini papan tulis",
    "prompt": "Tunjuk papan tulis dan ucapkan kalimatnya.",
    "modelAnswer": "هَذِهِ سَبُّورَةٌ",
    "hint": "Sabburah adalah papan tulis.",
    "challenge": "Ucapkan huruf shaddah pada sabburah."
  },
  {
    "id": "benda-di-kelas-3",
    "title": "Pulpen di meja",
    "situation": "Menjelaskan lokasi benda",
    "arabic": "الْقَلَمُ عَلَى الطَّاوِلَةِ",
    "transliteration": "al-qalamu ala at-tawilati",
    "meaning": "pulpen di atas meja",
    "prompt": "Katakan pulpen berada di atas meja.",
    "modelAnswer": "الْقَلَمُ عَلَى الطَّاوِلَةِ",
    "hint": "Ala berarti di atas.",
    "challenge": "Ganti meja dengan tas jika bisa."
  },
  {
    "id": "benda-di-kelas-4",
    "title": "Saya punya buku tulis",
    "situation": "Menyebut perlengkapan belajar",
    "arabic": "عِنْدِي دَفْتَرٌ",
    "transliteration": "indi daftarun",
    "meaning": "saya punya buku tulis",
    "prompt": "Katakan kamu punya buku tulis.",
    "modelAnswer": "عِنْدِي دَفْتَرٌ",
    "hint": "Daftar berarti buku tulis.",
    "challenge": "Tambahkan wa qalamun untuk menyebut pulpen juga."
  }
];

export default function ArabicKalamTopik9Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
