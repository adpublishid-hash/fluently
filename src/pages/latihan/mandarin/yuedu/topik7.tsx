import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-shopping-receipts",
  "title": "Yuèdú 7: Shopping Receipts",
  "description": "Membaca informasi belanja sederhana tentang barang, harga, dan jumlah.",
  "topicNumber": 7,
  "focus": "Belanja dan harga.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "shopping-receipts-1",
    "title": "Shopping Receipts 1",
    "focus": "Price",
    "passageHanzi": "苹果三块钱。香蕉五块钱。",
    "passagePinyin": "Píngguǒ sān kuài qián. Xiāngjiāo wǔ kuài qián.",
    "passageMeaning": "Apel tiga yuan. Pisang lima yuan.",
    "question": "Mana yang lebih mahal?",
    "answer": "香蕉 / pisang",
    "hint": "Bandingkan 三 dan 五.",
    "keywords": [
      "苹果",
      "三块钱",
      "香蕉",
      "五块钱"
    ],
    "explanation": "五 lebih besar dari 三, jadi pisang lebih mahal."
  },
  {
    "id": "shopping-receipts-2",
    "title": "Shopping Receipts 2",
    "focus": "Quantity",
    "passageHanzi": "我买两个苹果和一杯茶。",
    "passagePinyin": "Wǒ mǎi liǎng ge píngguǒ hé yī bēi chá.",
    "passageMeaning": "Saya membeli dua apel dan satu cangkir teh.",
    "question": "Berapa apel yang dibeli?",
    "answer": "两个 / dua",
    "hint": "Cari 苹果.",
    "keywords": [
      "买",
      "两个苹果",
      "一杯茶"
    ],
    "explanation": "两个苹果 berarti dua apel."
  },
  {
    "id": "shopping-receipts-3",
    "title": "Shopping Receipts 3",
    "focus": "Price",
    "passageHanzi": "这本书很贵，那支笔很便宜。",
    "passagePinyin": "Zhè běn shū hěn guì, nà zhī bǐ hěn piányi.",
    "passageMeaning": "Buku ini mahal, pena itu murah.",
    "question": "Barang apa yang murah?",
    "answer": "笔 / pena",
    "hint": "Cari 便宜.",
    "keywords": [
      "书",
      "贵",
      "笔",
      "便宜"
    ],
    "explanation": "便宜 muncul setelah 那支笔."
  },
  {
    "id": "shopping-receipts-4",
    "title": "Shopping Receipts 4",
    "focus": "Need",
    "passageHanzi": "我没有钱，所以不买咖啡。",
    "passagePinyin": "Wǒ méiyǒu qián, suǒyǐ bù mǎi kāfēi.",
    "passageMeaning": "Saya tidak punya uang, jadi tidak membeli kopi.",
    "question": "Mengapa ia tidak membeli kopi?",
    "answer": "没有钱 / tidak punya uang",
    "hint": "Cari kata 所以.",
    "keywords": [
      "没有钱",
      "所以",
      "不买咖啡"
    ],
    "explanation": "Alasan sebelum 所以 adalah 没有钱."
  }
];

export default function MandarinYueduTopik7Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
