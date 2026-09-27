import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-hsk-1-grammar-review",
  "title": "Yǔfǎ 20: HSK 1 Grammar Review",
  "description": "Menggabungkan pola 是, 有, 不, 吗, kata tanya, dan kata waktu dasar.",
  "topicNumber": 20,
  "focus": "Review pola Yǔfǎ HSK 1.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "hsk-1-grammar-review-1",
    "title": "HSK 1 Grammar Review 1",
    "pattern": "我 + 今天 + 不 + 去",
    "hanzi": "我今天不去学校。",
    "pinyin": "wǒ jīntiān bú qù xuéxiào.",
    "meaning": "Hari ini saya tidak pergi ke sekolah.",
    "prompt": "Gabungkan kata waktu, negasi, dan kata kerja.",
    "answer": "我今天不去学校。",
    "modelSentence": "我今天不去学校。",
    "modelPinyin": "wǒ jīntiān bú qù xuéxiào.",
    "modelMeaning": "Hari ini saya tidak pergi ke sekolah.",
    "hint": "今天 bisa setelah subjek sebelum 不去.",
    "explanation": "Urutan dasar tetap subjek + waktu + predikat."
  },
  {
    "id": "hsk-1-grammar-review-2",
    "title": "HSK 1 Grammar Review 2",
    "pattern": "你 + 有 + 几 + 本 + 书",
    "hanzi": "你有几本书？",
    "pinyin": "nǐ yǒu jǐ běn shū?",
    "meaning": "Kamu punya berapa buku?",
    "prompt": "Buat pertanyaan jumlah memakai 有 dan 几.",
    "answer": "你有几本书？",
    "modelSentence": "你有几本书？",
    "modelPinyin": "nǐ yǒu jǐ běn shū?",
    "modelMeaning": "Kamu punya berapa buku?",
    "hint": "几本书 menjadi objek 有.",
    "explanation": "Kata ukur 本 wajib untuk buku."
  },
  {
    "id": "hsk-1-grammar-review-3",
    "title": "HSK 1 Grammar Review 3",
    "pattern": "这 + 不 + 是 + 我的",
    "hanzi": "这不是我的手机。",
    "pinyin": "zhè bú shì wǒ de shǒujī.",
    "meaning": "Ini bukan ponsel saya.",
    "prompt": "Gabungkan kata tunjuk, negasi 是, dan kepemilikan.",
    "answer": "这不是我的手机。",
    "modelSentence": "这不是我的手机。",
    "modelPinyin": "zhè bú shì wǒ de shǒujī.",
    "modelMeaning": "Ini bukan ponsel saya.",
    "hint": "不是 menyangkal identitas benda.",
    "explanation": "我的手机 berarti ponsel saya."
  },
  {
    "id": "hsk-1-grammar-review-4",
    "title": "HSK 1 Grammar Review 4",
    "pattern": "请问 + 在哪儿",
    "hanzi": "请问，老师在哪儿？",
    "pinyin": "qǐng wèn, lǎoshī zài nǎr?",
    "meaning": "Permisi, guru ada di mana?",
    "prompt": "Buat pertanyaan sopan tentang lokasi guru.",
    "answer": "请问，老师在哪儿？",
    "modelSentence": "请问，老师在哪儿？",
    "modelPinyin": "qǐng wèn, lǎoshī zài nǎr?",
    "modelMeaning": "Permisi, guru ada di mana?",
    "hint": "请问 membuka pertanyaan sopan.",
    "explanation": "在哪儿 menanyakan lokasi orang/benda."
  }
];

export default function MandarinYufaTopik20Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
