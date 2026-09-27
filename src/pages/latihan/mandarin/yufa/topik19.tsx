import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-simple-request-qing",
  "title": "Yǔfǎ 19: Simple Request 请",
  "description": "Melatih permintaan sopan dengan 请 sebelum tindakan.",
  "topicNumber": 19,
  "focus": "请 + kata kerja / 请 + subjek + kata kerja.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "simple-request-qing-1",
    "title": "Simple Request 请 1",
    "pattern": "请 + 坐",
    "hanzi": "请坐。",
    "pinyin": "qǐng zuò.",
    "meaning": "Silakan duduk.",
    "prompt": "Buat kalimat “silakan duduk”.",
    "answer": "请坐。",
    "modelSentence": "请坐。",
    "modelPinyin": "qǐng zuò.",
    "modelMeaning": "Silakan duduk.",
    "hint": "请 membuat perintah lebih sopan.",
    "explanation": "Kata kerja langsung setelah 请."
  },
  {
    "id": "simple-request-qing-2",
    "title": "Simple Request 请 2",
    "pattern": "请 + 喝茶",
    "hanzi": "请喝茶。",
    "pinyin": "qǐng hē chá.",
    "meaning": "Silakan minum teh.",
    "prompt": "Buat kalimat “silakan minum teh”.",
    "answer": "请喝茶。",
    "modelSentence": "请喝茶。",
    "modelPinyin": "qǐng hē chá.",
    "modelMeaning": "Silakan minum teh.",
    "hint": "喝茶 berarti minum teh.",
    "explanation": "Objek tetap setelah kata kerja."
  },
  {
    "id": "simple-request-qing-3",
    "title": "Simple Request 请 3",
    "pattern": "请 + 你 + 写",
    "hanzi": "请你写汉字。",
    "pinyin": "qǐng nǐ xiě Hànzì.",
    "meaning": "Tolong tulis Hanzi.",
    "prompt": "Buat permintaan “tolong kamu tulis Hanzi”.",
    "answer": "请你写汉字。",
    "modelSentence": "请你写汉字。",
    "modelPinyin": "qǐng nǐ xiě Hànzì.",
    "modelMeaning": "Tolong tulis Hanzi.",
    "hint": "Subjek penerima bisa muncul setelah 请.",
    "explanation": "写汉字 berarti menulis Hanzi."
  },
  {
    "id": "simple-request-qing-4",
    "title": "Simple Request 请 4",
    "pattern": "请 + 问",
    "hanzi": "请问，洗手间在哪儿？",
    "pinyin": "qǐng wèn, xǐshǒujiān zài nǎr?",
    "meaning": "Permisi, toilet di mana?",
    "prompt": "Buat pembuka sopan untuk bertanya lokasi toilet.",
    "answer": "请问，洗手间在哪儿？",
    "modelSentence": "请问，洗手间在哪儿？",
    "modelPinyin": "qǐng wèn, xǐshǒujiān zài nǎr?",
    "modelMeaning": "Permisi, toilet di mana?",
    "hint": "请问 dipakai sebelum bertanya.",
    "explanation": "在哪儿 menanyakan lokasi."
  }
];

export default function MandarinYufaTopik19Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
