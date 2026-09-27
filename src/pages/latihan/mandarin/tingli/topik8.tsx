import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-shopping-and-prices",
  "title": "Tīnglì 8: Shopping and Prices",
  "description": "Melatih harga, barang, dan frasa belanja dasar dari audio.",
  "topicNumber": 8,
  "focus": "Belanja dan harga.",
  "goal": "Dengarkan nama barang dan angka harga, lalu jawab informasi utamanya."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "shopping-and-prices-1",
    "title": "Shopping and Prices 1",
    "focus": "Price",
    "audioHanzi": "这本书十块钱。",
    "audioPinyin": "Zhè běn shū shí kuài qián.",
    "audioMeaning": "Buku ini sepuluh yuan.",
    "question": "Berapa harga buku?",
    "answer": "十块钱 / sepuluh yuan",
    "hint": "Dengarkan angka sebelum 块钱.",
    "keywords": [
      "书",
      "十",
      "块钱"
    ],
    "explanation": "十块钱 berarti sepuluh yuan."
  },
  {
    "id": "shopping-and-prices-2",
    "title": "Shopping and Prices 2",
    "focus": "Shopping",
    "audioHanzi": "我买两个苹果。",
    "audioPinyin": "Wǒ mǎi liǎng gè píngguǒ.",
    "audioMeaning": "Saya membeli dua apel.",
    "question": "Berapa apel yang dibeli?",
    "answer": "两个苹果 / dua apel",
    "hint": "Cari jumlah sebelum 苹果.",
    "keywords": [
      "买",
      "两个",
      "苹果"
    ],
    "explanation": "两个苹果 berarti dua apel."
  },
  {
    "id": "shopping-and-prices-3",
    "title": "Shopping and Prices 3",
    "focus": "Price",
    "audioHanzi": "这个太贵了。",
    "audioPinyin": "Zhège tài guì le.",
    "audioMeaning": "Ini terlalu mahal.",
    "question": "Apa pendapat pembicara tentang barang itu?",
    "answer": "太贵了 / terlalu mahal",
    "hint": "Dengarkan kata sifat setelah 太.",
    "keywords": [
      "这个",
      "太",
      "贵"
    ],
    "explanation": "太贵了 berarti terlalu mahal."
  },
  {
    "id": "shopping-and-prices-4",
    "title": "Shopping and Prices 4",
    "focus": "Shopping",
    "audioHanzi": "我想买新衣服。",
    "audioPinyin": "Wǒ xiǎng mǎi xīn yīfu.",
    "audioMeaning": "Saya ingin membeli baju baru.",
    "question": "Apa yang ingin dibeli?",
    "answer": "新衣服 / baju baru",
    "hint": "Dengarkan objek setelah 买.",
    "keywords": [
      "想买",
      "新",
      "衣服"
    ],
    "explanation": "新衣服 berarti baju baru."
  }
];

export default function MandarinTingliTopik8Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
