import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-possession-with-de",
  "title": "Yǔfǎ 6: Possession with 的",
  "description": "Melatih kepemilikan dengan 的 sebelum benda.",
  "topicNumber": 6,
  "focus": "Pemilik + 的 + benda.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "possession-with-de-1",
    "title": "Possession with 的 1",
    "pattern": "我 + 的 + 书",
    "hanzi": "这是我的书。",
    "pinyin": "zhè shì wǒ de shū.",
    "meaning": "Ini buku saya.",
    "prompt": "Buat kalimat “ini buku saya”.",
    "answer": "这是我的书。",
    "modelSentence": "这是我的书。",
    "modelPinyin": "zhè shì wǒ de shū.",
    "modelMeaning": "Ini buku saya.",
    "hint": "我的 berarti “milik saya”.",
    "explanation": "的 menghubungkan pemilik dan benda."
  },
  {
    "id": "possession-with-de-2",
    "title": "Possession with 的 2",
    "pattern": "你 + 的 + 老师",
    "hanzi": "你的老师很好。",
    "pinyin": "nǐ de lǎoshī hěn hǎo.",
    "meaning": "Gurumu sangat baik.",
    "prompt": "Buat kalimat “gurumu baik”.",
    "answer": "你的老师很好。",
    "modelSentence": "你的老师很好。",
    "modelPinyin": "nǐ de lǎoshī hěn hǎo.",
    "modelMeaning": "Gurumu sangat baik.",
    "hint": "Pemilik muncul sebelum 的.",
    "explanation": "Adjektiva Mandarin sering memakai 很 sebagai penghubung."
  },
  {
    "id": "possession-with-de-3",
    "title": "Possession with 的 3",
    "pattern": "他 + 的 + 朋友",
    "hanzi": "他的朋友是学生。",
    "pinyin": "tā de péngyǒu shì xuésheng.",
    "meaning": "Temannya pelajar.",
    "prompt": "Buat kalimat “temannya pelajar”.",
    "answer": "他的朋友是学生。",
    "modelSentence": "他的朋友是学生。",
    "modelPinyin": "tā de péngyǒu shì xuésheng.",
    "modelMeaning": "Temannya pelajar.",
    "hint": "他的朋友 menjadi subjek utuh.",
    "explanation": "Setelah subjek, pakai 是 untuk identitas."
  },
  {
    "id": "possession-with-de-4",
    "title": "Possession with 的 4",
    "pattern": "妈妈 + 的 + 手机",
    "hanzi": "这是妈妈的手机。",
    "pinyin": "zhè shì māma de shǒujī.",
    "meaning": "Ini ponsel ibu.",
    "prompt": "Buat kalimat “ini ponsel ibu”.",
    "answer": "这是妈妈的手机。",
    "modelSentence": "这是妈妈的手机。",
    "modelPinyin": "zhè shì māma de shǒujī.",
    "modelMeaning": "Ini ponsel ibu.",
    "hint": "Nama pemilik bisa langsung sebelum 的.",
    "explanation": "Benda milik muncul setelah 的."
  }
];

export default function MandarinYufaTopik6Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
