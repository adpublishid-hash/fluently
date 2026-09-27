import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-time-word-jintian",
  "title": "Yǔfǎ 14: Time Word 今天",
  "description": "Melatih posisi kata waktu 今天 di awal atau setelah subjek.",
  "topicNumber": 14,
  "focus": "Waktu + subjek + predikat / subjek + waktu + predikat.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "time-word-jintian-1",
    "title": "Time Word 今天 1",
    "pattern": "今天 + 我 + 去",
    "hanzi": "今天我去学校。",
    "pinyin": "jīntiān wǒ qù xuéxiào.",
    "meaning": "Hari ini saya pergi ke sekolah.",
    "prompt": "Buat kalimat dengan 今天 di awal.",
    "answer": "今天我去学校。",
    "modelSentence": "今天我去学校。",
    "modelPinyin": "jīntiān wǒ qù xuéxiào.",
    "modelMeaning": "Hari ini saya pergi ke sekolah.",
    "hint": "Kata waktu boleh di awal kalimat.",
    "explanation": "Tempat tujuan muncul setelah 去."
  },
  {
    "id": "time-word-jintian-2",
    "title": "Time Word 今天 2",
    "pattern": "我 + 今天 + 学习",
    "hanzi": "我今天学习中文。",
    "pinyin": "wǒ jīntiān xuéxí Zhōngwén.",
    "meaning": "Saya belajar Mandarin hari ini.",
    "prompt": "Buat kalimat dengan 今天 setelah subjek.",
    "answer": "我今天学习中文。",
    "modelSentence": "我今天学习中文。",
    "modelPinyin": "wǒ jīntiān xuéxí Zhōngwén.",
    "modelMeaning": "Saya belajar Mandarin hari ini.",
    "hint": "Kata waktu juga bisa setelah subjek.",
    "explanation": "Jangan letakkan 今天 setelah objek."
  },
  {
    "id": "time-word-jintian-3",
    "title": "Time Word 今天 3",
    "pattern": "今天 + 是 + 星期一",
    "hanzi": "今天是星期一。",
    "pinyin": "jīntiān shì xīngqī yī.",
    "meaning": "Hari ini hari Senin.",
    "prompt": "Buat kalimat “hari ini Senin”.",
    "answer": "今天是星期一。",
    "modelSentence": "今天是星期一。",
    "modelPinyin": "jīntiān shì xīngqī yī.",
    "modelMeaning": "Hari ini hari Senin.",
    "hint": "Pakai 是 untuk menyatakan hari/tanggal.",
    "explanation": "星期一 berarti Senin."
  },
  {
    "id": "time-word-jintian-4",
    "title": "Time Word 今天 4",
    "pattern": "你 + 今天 + 忙 + 吗",
    "hanzi": "你今天忙吗？",
    "pinyin": "nǐ jīntiān máng ma?",
    "meaning": "Apakah kamu sibuk hari ini?",
    "prompt": "Buat pertanyaan “apakah kamu sibuk hari ini?”.",
    "answer": "你今天忙吗？",
    "modelSentence": "你今天忙吗？",
    "modelPinyin": "nǐ jīntiān máng ma?",
    "modelMeaning": "Apakah kamu sibuk hari ini?",
    "hint": "今天 berada sebelum predikat 忙.",
    "explanation": "吗 tetap di akhir."
  }
];

export default function MandarinYufaTopik14Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
