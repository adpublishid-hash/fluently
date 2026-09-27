import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-names-nationality-and-language",
  "title": "Kǒuyǔ 3: Names, Nationality and Language",
  "description": "Melatih tanya-jawab nama, kewarganegaraan, dan bahasa yang digunakan.",
  "topicNumber": 3,
  "focus": "Nama, negara, dan bahasa.",
  "goal": "Jawab pertanyaan umum dengan pola pendek yang natural."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "names-nationality-and-language-1",
    "title": "Names, Nationality and Language 1",
    "scenario": "Name Question",
    "prompt": "Seseorang bertanya 你叫什么名字？ Jawab dengan namamu.",
    "role": "You answer your name.",
    "modelHanzi": "我叫安娜。",
    "modelPinyin": "Wǒ jiào Ānnà.",
    "modelMeaning": "Nama saya Anna.",
    "starter": "我叫...",
    "hint": "Gunakan 我叫, bukan 我是 untuk pola nama ini.",
    "checklist": [
      "Jawaban langsung tanpa pengulangan panjang.",
      "Nama terdengar setelah 叫.",
      "Nada jiào jelas turun."
    ],
    "followUp": "Tambahkan 很高兴认识你 untuk variasi."
  },
  {
    "id": "names-nationality-and-language-2",
    "title": "Names, Nationality and Language 2",
    "scenario": "Nationality",
    "prompt": "Jawab pertanyaan 你是哪国人？",
    "role": "You answer nationality.",
    "modelHanzi": "我是印度尼西亚人。",
    "modelPinyin": "Wǒ shì Yìndùníxīyà rén.",
    "modelMeaning": "Saya orang Indonesia.",
    "starter": "我是...人。",
    "hint": "Tambahkan 人 setelah nama negara.",
    "checklist": [
      "我是 menjadi pembuka.",
      "Nama negara jelas.",
      "人 terdengar ringan di akhir."
    ],
    "followUp": "Coba ganti dengan negara lain jika perlu."
  },
  {
    "id": "names-nationality-and-language-3",
    "title": "Names, Nationality and Language 3",
    "scenario": "Language",
    "prompt": "Katakan kamu bisa sedikit Mandarin.",
    "role": "You describe ability.",
    "modelHanzi": "我会说一点中文。",
    "modelPinyin": "Wǒ huì shuō yìdiǎn Zhōngwén.",
    "modelMeaning": "Saya bisa berbicara sedikit Mandarin.",
    "starter": "我会说一点...",
    "hint": "会说 berarti bisa berbicara.",
    "checklist": [
      "会说 tidak terputus.",
      "一点 memberi makna sedikit.",
      "中文 muncul di akhir."
    ],
    "followUp": "Coba ucapkan lebih natural tanpa terlalu cepat."
  },
  {
    "id": "names-nationality-and-language-4",
    "title": "Names, Nationality and Language 4",
    "scenario": "Ask Back",
    "prompt": "Setelah menjawab asalmu, tanyakan balik asal lawan bicara.",
    "role": "You ask back.",
    "modelHanzi": "我是印度尼西亚人。你呢？",
    "modelPinyin": "Wǒ shì Yìndùníxīyà rén. Nǐ ne?",
    "modelMeaning": "Saya orang Indonesia. Kalau kamu?",
    "starter": "我是...人。你呢？",
    "hint": "你呢 berarti bagaimana dengan kamu.",
    "checklist": [
      "Jawaban dan pertanyaan terpisah jelas.",
      "你呢 terdengar naik sedikit.",
      "Pola cukup singkat untuk percakapan nyata."
    ],
    "followUp": "Latih dengan negara berbeda."
  }
];

export default function MandarinKouyuTopik3Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
