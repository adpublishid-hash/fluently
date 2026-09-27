import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-menu-reading",
  "title": "Yuèdú 8: Menu Reading",
  "description": "Membaca menu pendek, minuman, dan pilihan makanan dasar.",
  "topicNumber": 8,
  "focus": "Menu makanan.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "menu-reading-1",
    "title": "Menu Reading 1",
    "focus": "Menu",
    "passageHanzi": "今天有米饭、面条和鸡蛋。",
    "passagePinyin": "Jīntiān yǒu mǐfàn, miàntiáo hé jīdàn.",
    "passageMeaning": "Hari ini ada nasi, mi, dan telur.",
    "question": "Ada makanan apa saja?",
    "answer": "米饭、面条、鸡蛋 / nasi, mi, telur",
    "hint": "Daftar makanan dipisahkan dengan koma.",
    "keywords": [
      "米饭",
      "面条",
      "鸡蛋"
    ],
    "explanation": "Ketiga kata setelah 有 adalah pilihan makanan."
  },
  {
    "id": "menu-reading-2",
    "title": "Menu Reading 2",
    "focus": "Drink",
    "passageHanzi": "我不要咖啡。我要一杯水。",
    "passagePinyin": "Wǒ bú yào kāfēi. Wǒ yào yī bēi shuǐ.",
    "passageMeaning": "Saya tidak mau kopi. Saya mau segelas air.",
    "question": "Apa yang dia mau?",
    "answer": "一杯水 / segelas air",
    "hint": "Kalimat kedua positif.",
    "keywords": [
      "不要咖啡",
      "要",
      "一杯水"
    ],
    "explanation": "我要一杯水 berarti saya mau segelas air."
  },
  {
    "id": "menu-reading-3",
    "title": "Menu Reading 3",
    "focus": "Preference",
    "passageHanzi": "弟弟喜欢西瓜，不喜欢香蕉。",
    "passagePinyin": "Dìdi xǐhuan xīguā, bù xǐhuan xiāngjiāo.",
    "passageMeaning": "Adik laki-laki suka semangka, tidak suka pisang.",
    "question": "Buah apa yang disukai adik?",
    "answer": "西瓜 / semangka",
    "hint": "Cari 喜欢 tanpa 不.",
    "keywords": [
      "弟弟",
      "喜欢西瓜",
      "不喜欢香蕉"
    ],
    "explanation": "喜欢西瓜 adalah preferensi positif."
  },
  {
    "id": "menu-reading-4",
    "title": "Menu Reading 4",
    "focus": "Order",
    "passageHanzi": "请给我一碗面。谢谢。",
    "passagePinyin": "Qǐng gěi wǒ yī wǎn miàn. Xièxie.",
    "passageMeaning": "Tolong beri saya semangkuk mi. Terima kasih.",
    "question": "Apa yang dipesan?",
    "answer": "一碗面 / semangkuk mi",
    "hint": "Cari 给我.",
    "keywords": [
      "请",
      "给我",
      "一碗面"
    ],
    "explanation": "一碗面 adalah pesanan yang diminta."
  }
];

export default function MandarinYueduTopik8Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
