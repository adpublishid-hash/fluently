import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-restaurant-ordering",
  "title": "Kǒuyǔ 10: Restaurant Ordering",
  "description": "Melatih memesan makanan, minuman, dan memberi respons di restoran.",
  "topicNumber": 10,
  "focus": "Pesanan makanan dan minuman.",
  "goal": "Ucapkan pesanan dengan kata ukur sederhana dan respons sopan."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "restaurant-ordering-1",
    "title": "Restaurant Ordering 1",
    "scenario": "Restaurant",
    "prompt": "Pesan satu gelas teh.",
    "role": "You order a drink.",
    "modelHanzi": "我要一杯茶。",
    "modelPinyin": "Wǒ yào yì bēi chá.",
    "modelMeaning": "Saya mau segelas teh.",
    "starter": "我要一杯...",
    "hint": "杯 dipakai untuk minuman.",
    "checklist": [
      "我要 jelas.",
      "一杯茶 menjadi objek.",
      "Nada chá naik."
    ],
    "followUp": "Ganti 茶 dengan 水 atau 咖啡."
  },
  {
    "id": "restaurant-ordering-2",
    "title": "Restaurant Ordering 2",
    "scenario": "Restaurant",
    "prompt": "Minta air kepada pelayan.",
    "role": "You ask for water.",
    "modelHanzi": "请给我水。",
    "modelPinyin": "Qǐng gěi wǒ shuǐ.",
    "modelMeaning": "Tolong beri saya air.",
    "starter": "请给我...",
    "hint": "请 membuat permintaan sopan.",
    "checklist": [
      "请 jelas.",
      "给我 terdengar menyatu natural.",
      "水 tidak terlalu pendek."
    ],
    "followUp": "Coba tambahkan 一杯: 请给我一杯水."
  },
  {
    "id": "restaurant-ordering-3",
    "title": "Restaurant Ordering 3",
    "scenario": "Restaurant",
    "prompt": "Katakan makanan ini enak.",
    "role": "You compliment food.",
    "modelHanzi": "这个很好吃。",
    "modelPinyin": "Zhège hěn hǎochī.",
    "modelMeaning": "Ini sangat enak.",
    "starter": "这个很...",
    "hint": "好吃 untuk makanan enak.",
    "checklist": [
      "很好吃 jelas.",
      "Tidak terlalu datar.",
      "Nada ramah."
    ],
    "followUp": "Tambahkan 谢谢 setelah dipuji pelayan."
  },
  {
    "id": "restaurant-ordering-4",
    "title": "Restaurant Ordering 4",
    "scenario": "Restaurant",
    "prompt": "Katakan kamu tidak makan daging.",
    "role": "You state dietary need.",
    "modelHanzi": "我不吃肉。",
    "modelPinyin": "Wǒ bù chī ròu.",
    "modelMeaning": "Saya tidak makan daging.",
    "starter": "我不吃...",
    "hint": "不吃 berarti tidak makan.",
    "checklist": [
      "不吃 jelas.",
      "肉 terdengar ròu.",
      "Kalimat singkat tetapi tegas."
    ],
    "followUp": "Coba tambah 我吃米饭."
  }
];

export default function MandarinKouyuTopik10Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
