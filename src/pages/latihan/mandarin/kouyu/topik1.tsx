import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-greetings-and-polite-responses",
  "title": "Kǒuyǔ 1: Greetings and Polite Responses",
  "description": "Melatih salam, sapaan sopan, dan respons pendek dalam percakapan Mandarin awal.",
  "topicNumber": 1,
  "focus": "Salam, ucapan sopan, dan respons singkat.",
  "goal": "Dengar model, ucapkan responsmu, lalu cek Hanzi, pinyin, arti, dan checklist kelancaran."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "greetings-and-polite-responses-1",
    "title": "Greetings and Polite Responses 1",
    "scenario": "Greeting",
    "prompt": "Teman baru menyapa kamu dengan 你好. Balas dengan salam dan sebutkan nama.",
    "role": "You are the new friend.",
    "modelHanzi": "你好，我叫安娜。",
    "modelPinyin": "Nǐ hǎo, wǒ jiào Ānnà.",
    "modelMeaning": "Halo, nama saya Anna.",
    "starter": "你好，我叫...",
    "hint": "Mulai dari 你好 lalu gunakan 我叫 untuk nama.",
    "checklist": [
      "Salam terdengar jelas.",
      "Nama diucapkan setelah 我叫.",
      "Nada hǎo dan jiào tidak tertukar."
    ],
    "followUp": "Coba ganti 安娜 dengan namamu sendiri."
  },
  {
    "id": "greetings-and-polite-responses-2",
    "title": "Greetings and Polite Responses 2",
    "scenario": "Polite Response",
    "prompt": "Seseorang mengucapkan 谢谢你. Balas dengan sopan.",
    "role": "You answer politely.",
    "modelHanzi": "不客气。",
    "modelPinyin": "Bú kèqi.",
    "modelMeaning": "Sama-sama.",
    "starter": "不客气。",
    "hint": "Jawaban pendek ini cukup untuk situasi sopan.",
    "checklist": [
      "Bu terdengar sebagai bú sebelum kè.",
      "Ritme tiga suku kata stabil.",
      "Tidak perlu menambah kalimat panjang."
    ],
    "followUp": "Ulangi lebih natural dengan senyum dan intonasi turun."
  },
  {
    "id": "greetings-and-polite-responses-3",
    "title": "Greetings and Polite Responses 3",
    "scenario": "Greeting",
    "prompt": "Kamu bertemu guru pada pagi hari. Ucapkan salam yang tepat.",
    "role": "You greet the teacher.",
    "modelHanzi": "老师，早上好。",
    "modelPinyin": "Lǎoshī, zǎoshang hǎo.",
    "modelMeaning": "Guru, selamat pagi.",
    "starter": "老师，早上好。",
    "hint": "Sebut orangnya dulu, lalu salam pagi.",
    "checklist": [
      "老师 terdengar jelas.",
      "早上好 tidak terlalu cepat.",
      "Nada akhir terdengar ramah."
    ],
    "followUp": "Coba variasi: 老师好."
  },
  {
    "id": "greetings-and-polite-responses-4",
    "title": "Greetings and Polite Responses 4",
    "scenario": "Farewell",
    "prompt": "Akhiri percakapan dan katakan sampai bertemu besok.",
    "role": "You close the conversation.",
    "modelHanzi": "再见，明天见。",
    "modelPinyin": "Zàijiàn, míngtiān jiàn.",
    "modelMeaning": "Sampai jumpa, sampai bertemu besok.",
    "starter": "再见，...",
    "hint": "Gunakan 明天见 untuk bertemu besok.",
    "checklist": [
      "再见 diucapkan sebagai zàijiàn.",
      "明天 jelas sebagai waktu.",
      "Kalimat terdengar seperti penutup."
    ],
    "followUp": "Ucapkan sekali normal dan sekali lebih pelan."
  }
];

export default function MandarinKouyuTopik1Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
