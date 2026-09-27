import { ArabicNahwuPracticePage, type ArabicNahwuDrill, type ArabicNahwuTopicMaterial } from '../../components/ArabicNahwuPracticePage';

const material: ArabicNahwuTopicMaterial = {
  "id": "arabic-nahwu-isim-fiil",
  "title": "Nahwu 1: Isim dan Fiil",
  "description": "Membedakan kata benda, kata kerja, dan huruf dasar dalam kalimat Arab.",
  "topicNumber": 1,
  "focus": "Kenali jenis kata sebelum masuk ke susunan kalimat.",
  "goal": "Baca contoh Arab, sebutkan jenis katanya, lalu tulis alasan singkat."
};

const drills: ArabicNahwuDrill[] = [
  {
    "id": "isim-fiil-1",
    "label": "Isim",
    "rule": "Isim adalah kata yang menunjukkan benda, orang, tempat, sifat, atau nama tanpa waktu.",
    "arabic": "كِتَابٌ",
    "transliteration": "kitabun",
    "meaning": "sebuah buku",
    "prompt": "Jenis kata apakah كِتَابٌ?",
    "answer": "Isim, karena menunjukkan benda.",
    "hint": "Buku adalah nama benda dan tidak mengandung waktu."
  },
  {
    "id": "isim-fiil-2",
    "label": "Fiil",
    "rule": "Fiil adalah kata kerja yang menunjukkan peristiwa dan biasanya terkait waktu.",
    "arabic": "كَتَبَ",
    "transliteration": "kataba",
    "meaning": "dia telah menulis",
    "prompt": "Jenis kata apakah كَتَبَ?",
    "answer": "Fiil, karena menunjukkan pekerjaan pada waktu lampau.",
    "hint": "Ada makna kegiatan: menulis."
  },
  {
    "id": "isim-fiil-3",
    "label": "Harf",
    "rule": "Harf adalah kata bantu yang maknanya lengkap ketika tersambung dengan kata lain.",
    "arabic": "فِي",
    "transliteration": "fi",
    "meaning": "di/dalam",
    "prompt": "Jenis kata apakah فِي?",
    "answer": "Harf, karena menjadi kata bantu untuk menunjukkan tempat.",
    "hint": "Biasanya muncul sebelum isim seperti فِي الْبَيْتِ."
  },
  {
    "id": "isim-fiil-4",
    "label": "Bedakan Kata",
    "rule": "Dalam satu kalimat, isim dan fiil bisa muncul bersama dengan fungsi berbeda.",
    "arabic": "الطَّالِبُ يَكْتُبُ",
    "transliteration": "at-talibu yaktubu",
    "meaning": "siswa itu sedang menulis",
    "prompt": "Mana isim dan mana fiil dalam kalimat ini?",
    "answer": "الطَّالِبُ adalah isim, يَكْتُبُ adalah fiil.",
    "hint": "Cari pelaku dan kegiatannya."
  }
];

export default function ArabicNahwuTopik1Page() {
  return <ArabicNahwuPracticePage material={material} drills={drills} />;
}
