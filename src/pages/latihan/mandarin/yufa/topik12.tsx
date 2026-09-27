import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-want-with-xiang",
  "title": "Yǔfǎ 12: Want with 想",
  "description": "Melatih 想 untuk menyatakan keinginan melakukan sesuatu.",
  "topicNumber": 12,
  "focus": "Subjek + 想 + kata kerja/objek.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "want-with-xiang-1",
    "title": "Want with 想 1",
    "pattern": "我 + 想 + 喝水",
    "hanzi": "我想喝水。",
    "pinyin": "wǒ xiǎng hē shuǐ.",
    "meaning": "Saya ingin minum air.",
    "prompt": "Buat kalimat “saya ingin minum air”.",
    "answer": "我想喝水。",
    "modelSentence": "我想喝水。",
    "modelPinyin": "wǒ xiǎng hē shuǐ.",
    "modelMeaning": "Saya ingin minum air.",
    "hint": "想 muncul sebelum kata kerja utama.",
    "explanation": "喝水 berarti minum air."
  },
  {
    "id": "want-with-xiang-2",
    "title": "Want with 想 2",
    "pattern": "你 + 想 + 去 + 吗",
    "hanzi": "你想去吗？",
    "pinyin": "nǐ xiǎng qù ma?",
    "meaning": "Apakah kamu ingin pergi?",
    "prompt": "Buat pertanyaan dengan 想 dan 吗.",
    "answer": "你想去吗？",
    "modelSentence": "你想去吗？",
    "modelPinyin": "nǐ xiǎng qù ma?",
    "modelMeaning": "Apakah kamu ingin pergi?",
    "hint": "吗 tetap paling akhir.",
    "explanation": "想 tidak berubah bentuk."
  },
  {
    "id": "want-with-xiang-3",
    "title": "Want with 想 3",
    "pattern": "他 + 不 + 想 + 学习",
    "hanzi": "他不想学习。",
    "pinyin": "tā bù xiǎng xuéxí.",
    "meaning": "Dia tidak ingin belajar.",
    "prompt": "Buat kalimat negatif “dia tidak ingin belajar”.",
    "answer": "他不想学习。",
    "modelSentence": "他不想学习。",
    "modelPinyin": "tā bù xiǎng xuéxí.",
    "modelMeaning": "Dia tidak ingin belajar.",
    "hint": "不 berada sebelum 想.",
    "explanation": "学习 adalah kata kerja belajar."
  },
  {
    "id": "want-with-xiang-4",
    "title": "Want with 想 4",
    "pattern": "我 + 想 + 买 + 咖啡",
    "hanzi": "我想买咖啡。",
    "pinyin": "wǒ xiǎng mǎi kāfēi.",
    "meaning": "Saya ingin membeli kopi.",
    "prompt": "Buat kalimat “saya ingin membeli kopi”.",
    "answer": "我想买咖啡。",
    "modelSentence": "我想买咖啡。",
    "modelPinyin": "wǒ xiǎng mǎi kāfēi.",
    "modelMeaning": "Saya ingin membeli kopi.",
    "hint": "Urutan: 想 + kata kerja + objek.",
    "explanation": "Objek tidak diletakkan sebelum 买."
  }
];

export default function MandarinYufaTopik12Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
