import { ArabicIstimaPracticePage, type ArabicIstimaDrill, type ArabicIstimaTopicMaterial } from '../../components/ArabicIstimaPracticePage';

const material: ArabicIstimaTopicMaterial = {
  "id": "arabic-istima-dialog-pasar",
  "title": "Istima 17: Dialog Pasar",
  "description": "Mendengar frasa jual beli, harga, dan permintaan sederhana.",
  "topicNumber": 17,
  "focus": "Percakapan pasar",
  "goal": "Tangkap barang, harga, atau permintaan dari dialog pendek."
};

const drills: ArabicIstimaDrill[] = [
  {
    "id": "dialog-pasar-1",
    "title": "Tanya harga",
    "arabic": "بِكَمْ هَذَا؟",
    "transliteration": "bikam hadha?",
    "meaning": "berapa harga ini?",
    "focus": "Harga",
    "prompt": "Dengarkan. Pertanyaan ini menanyakan apa?",
    "answer": "Harga barang.",
    "hint": "Bikam berarti berapa harga.",
    "keyword": "بِكَمْ"
  },
  {
    "id": "dialog-pasar-2",
    "title": "Harga lima",
    "arabic": "هَذَا بِخَمْسَةِ آلَافٍ",
    "transliteration": "hadha bikhamsati alafin",
    "meaning": "ini lima ribu",
    "focus": "Harga",
    "prompt": "Dengarkan. Berapa harganya?",
    "answer": "Lima ribu.",
    "hint": "Khamsah berarti lima.",
    "keyword": "خَمْسَةِ"
  },
  {
    "id": "dialog-pasar-3",
    "title": "Saya mau apel",
    "arabic": "أُرِيدُ تُفَّاحًا",
    "transliteration": "uridu tuffahan",
    "meaning": "saya ingin apel",
    "focus": "Permintaan",
    "prompt": "Dengarkan. Pembicara ingin membeli apa?",
    "answer": "Apel.",
    "hint": "Tuffah berarti apel.",
    "keyword": "تُفَّاحًا"
  },
  {
    "id": "dialog-pasar-4",
    "title": "Terima kasih",
    "arabic": "شُكْرًا، إِلَى اللِّقَاءِ",
    "transliteration": "shukran ila al-liqai",
    "meaning": "terima kasih, sampai jumpa",
    "focus": "Penutup dialog",
    "prompt": "Dengarkan. Ungkapan terima kasih apa yang terdengar?",
    "answer": "شُكْرًا.",
    "hint": "Kata pertama adalah terima kasih.",
    "keyword": "شُكْرًا"
  }
];

export default function ArabicIstimaTopik17Page() {
  return <ArabicIstimaPracticePage material={material} drills={drills} />;
}
