import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-izin-dan-permisi",
  "title": "Kalam 7: Izin dan Permisi",
  "description": "Latihan meminta izin masuk, keluar, atau berbicara.",
  "topicNumber": 7,
  "focus": "Permisi dan izin sederhana",
  "goal": "Gunakan frasa izin yang sopan di kelas atau percakapan harian."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "izin-dan-permisi-1",
    "title": "Permisi",
    "situation": "Lewat di depan orang",
    "arabic": "مِنْ فَضْلِكَ",
    "transliteration": "min fadlika",
    "meaning": "tolong/permisi",
    "prompt": "Ucapkan permisi dengan sopan.",
    "modelAnswer": "مِنْ فَضْلِكَ",
    "hint": "Untuk lawan bicara laki-laki.",
    "challenge": "Untuk perempuan, ganti menjadi min fadliki."
  },
  {
    "id": "izin-dan-permisi-2",
    "title": "Boleh masuk?",
    "situation": "Mengetuk pintu kelas",
    "arabic": "هَلْ أَدْخُلُ؟",
    "transliteration": "hal adkhulu?",
    "meaning": "bolehkah saya masuk?",
    "prompt": "Minta izin masuk ruangan.",
    "modelAnswer": "هَلْ أَدْخُلُ؟",
    "hint": "Hal membuat pertanyaan ya/tidak.",
    "challenge": "Tambahkan ya ustadhu jika kepada guru."
  },
  {
    "id": "izin-dan-permisi-3",
    "title": "Boleh keluar?",
    "situation": "Minta izin keluar sebentar",
    "arabic": "هَلْ أَخْرُجُ؟",
    "transliteration": "hal akhruju?",
    "meaning": "bolehkah saya keluar?",
    "prompt": "Minta izin keluar kelas.",
    "modelAnswer": "هَلْ أَخْرُجُ؟",
    "hint": "Akhruju berarti saya keluar.",
    "challenge": "Ucapkan cepat tetapi tetap jelas."
  },
  {
    "id": "izin-dan-permisi-4",
    "title": "Silakan",
    "situation": "Memberi izin",
    "arabic": "تَفَضَّلْ",
    "transliteration": "tafaddal",
    "meaning": "silakan",
    "prompt": "Berikan izin kepada teman.",
    "modelAnswer": "تَفَضَّلْ",
    "hint": "Frasa sopan untuk mempersilakan.",
    "challenge": "Ucapkan dengan gerakan tangan natural."
  }
];

export default function ArabicKalamTopik7Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
