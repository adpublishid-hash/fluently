import { ArabicKalamPracticePage, type ArabicKalamDrill, type ArabicKalamTopicMaterial } from '../../components/ArabicKalamPracticePage';

const material: ArabicKalamTopicMaterial = {
  "id": "arabic-kalam-salam-dan-sapaan",
  "title": "Kalam 1: Salam dan Sapaan",
  "description": "Latihan membuka percakapan dengan salam dan sapaan sederhana.",
  "topicNumber": 1,
  "focus": "Salam, sapaan, dan respons awal",
  "goal": "Dengarkan model, tirukan, lalu jawab seolah kamu sedang menyapa teman."
};

const drills: ArabicKalamDrill[] = [
  {
    "id": "salam-dan-sapaan-1",
    "title": "Mulai dengan salam",
    "situation": "Menyapa teman baru",
    "arabic": "السَّلَامُ عَلَيْكُمْ",
    "transliteration": "as-salamu alaikum",
    "meaning": "semoga keselamatan atas kalian",
    "prompt": "Ucapkan salam saat bertemu teman baru.",
    "modelAnswer": "السَّلَامُ عَلَيْكُمْ",
    "hint": "Mulai dari as-salamu, lalu lanjut alaikum.",
    "challenge": "Ucapkan tanpa melihat teks sebanyak 3 kali."
  },
  {
    "id": "salam-dan-sapaan-2",
    "title": "Jawab salam",
    "situation": "Teman menyapamu lebih dulu",
    "arabic": "وَعَلَيْكُمُ السَّلَامُ",
    "transliteration": "wa alaikumus-salam",
    "meaning": "dan semoga keselamatan atas kalian juga",
    "prompt": "Jawab salam temanmu dengan benar.",
    "modelAnswer": "وَعَلَيْكُمُ السَّلَامُ",
    "hint": "Jawaban dimulai dengan wa.",
    "challenge": "Tambahkan senyum dan jeda natural setelah jawaban."
  },
  {
    "id": "salam-dan-sapaan-3",
    "title": "Sapaan ringan",
    "situation": "Bertemu teman di kelas",
    "arabic": "مَرْحَبًا يَا صَدِيقِي",
    "transliteration": "marhaban ya sadiqi",
    "meaning": "halo temanku",
    "prompt": "Sapa teman dekat dengan frasa santai.",
    "modelAnswer": "مَرْحَبًا يَا صَدِيقِي",
    "hint": "Ya sadiqi berarti wahai temanku.",
    "challenge": "Ganti sadiqi dengan nama temanmu."
  },
  {
    "id": "salam-dan-sapaan-4",
    "title": "Penutup ramah",
    "situation": "Mengakhiri percakapan singkat",
    "arabic": "إِلَى اللِّقَاءِ، مَعَ السَّلَامَةِ",
    "transliteration": "ila al-liqa, maa as-salamah",
    "meaning": "sampai jumpa, semoga selamat",
    "prompt": "Tutup percakapan dengan sopan.",
    "modelAnswer": "إِلَى اللِّقَاءِ، مَعَ السَّلَامَةِ",
    "hint": "Ila al-liqa berarti sampai jumpa.",
    "challenge": "Ucapkan sebagai satu kalimat dengan intonasi turun di akhir."
  }
];

export default function ArabicKalamTopik1Page() {
  return <ArabicKalamPracticePage material={material} drills={drills} />;
}
