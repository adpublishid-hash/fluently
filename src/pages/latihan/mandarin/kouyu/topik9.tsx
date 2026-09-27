import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-shopping-dialogue",
  "title": "Kǒuyǔ 9: Shopping Dialogue",
  "description": "Melatih tanya harga, membeli barang, dan memberi pendapat saat belanja.",
  "topicNumber": 9,
  "focus": "Belanja dan harga.",
  "goal": "Latih dialog belanja pendek dengan 多少钱, 我要, dan 太贵了."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "shopping-dialogue-1",
    "title": "Shopping Dialogue 1",
    "scenario": "Shopping",
    "prompt": "Tanyakan harga buku ini.",
    "role": "You ask the price.",
    "modelHanzi": "这本书多少钱？",
    "modelPinyin": "Zhè běn shū duōshao qián?",
    "modelMeaning": "Buku ini berapa harganya?",
    "starter": "这本...多少钱？",
    "hint": "多少钱 menanyakan harga.",
    "checklist": [
      "这本书 jelas.",
      "多少钱 naik di akhir.",
      "本 dipakai untuk buku."
    ],
    "followUp": "Coba ganti 书 dengan 衣服."
  },
  {
    "id": "shopping-dialogue-2",
    "title": "Shopping Dialogue 2",
    "scenario": "Shopping",
    "prompt": "Katakan kamu ingin membeli dua apel.",
    "role": "You buy fruit.",
    "modelHanzi": "我要买两个苹果。",
    "modelPinyin": "Wǒ yào mǎi liǎng gè píngguǒ.",
    "modelMeaning": "Saya mau membeli dua apel.",
    "starter": "我要买...",
    "hint": "买 berarti membeli.",
    "checklist": [
      "我要买 jelas.",
      "两个苹果 sebagai objek.",
      "liǎng untuk dua benda."
    ],
    "followUp": "Coba versi 一个苹果."
  },
  {
    "id": "shopping-dialogue-3",
    "title": "Shopping Dialogue 3",
    "scenario": "Shopping",
    "prompt": "Katakan barang ini terlalu mahal.",
    "role": "You react to price.",
    "modelHanzi": "这个太贵了。",
    "modelPinyin": "Zhège tài guì le.",
    "modelMeaning": "Ini terlalu mahal.",
    "starter": "这个太...了。",
    "hint": "太...了 menekankan terlalu.",
    "checklist": [
      "这个 jelas.",
      "贵 terdengar turun.",
      "了 ringan di akhir."
    ],
    "followUp": "Tambahkan 有没有便宜一点的？ saat lebih lanjut."
  },
  {
    "id": "shopping-dialogue-4",
    "title": "Shopping Dialogue 4",
    "scenario": "Shopping",
    "prompt": "Katakan kamu mau baju baru.",
    "role": "You state what you want.",
    "modelHanzi": "我想买新衣服。",
    "modelPinyin": "Wǒ xiǎng mǎi xīn yīfu.",
    "modelMeaning": "Saya ingin membeli baju baru.",
    "starter": "我想买...",
    "hint": "想买 berarti ingin membeli.",
    "checklist": [
      "想买 tidak terputus.",
      "新衣服 jelas.",
      "Kalimat terdengar sebagai keinginan."
    ],
    "followUp": "Coba tambahkan 今天."
  }
];

export default function MandarinKouyuTopik9Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
