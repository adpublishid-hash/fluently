import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-basic-word-order-wo-shi",
  "title": "Yǔfǎ 1: Basic Word Order: 我 + 是 + ...",
  "description": "Melatih urutan dasar SVO dalam kalimat identitas sederhana.",
  "topicNumber": 1,
  "focus": "Subjek + 是 + identitas.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "basic-word-order-wo-shi-1",
    "title": "Basic Word Order: 我 + 是 + ... 1",
    "pattern": "我 + 是 + 学生",
    "hanzi": "我是学生。",
    "pinyin": "wǒ shì xuésheng.",
    "meaning": "Saya pelajar.",
    "prompt": "Ubah “saya pelajar” menjadi kalimat Mandarin lengkap.",
    "answer": "我是学生。",
    "modelSentence": "我是学生。",
    "modelPinyin": "wǒ shì xuésheng.",
    "modelMeaning": "Saya pelajar.",
    "hint": "Mulai dengan 我, lalu 是, lalu identitas.",
    "explanation": "是 menghubungkan subjek dengan identitas atau kategori."
  },
  {
    "id": "basic-word-order-wo-shi-2",
    "title": "Basic Word Order: 我 + 是 + ... 2",
    "pattern": "你 + 是 + 老师",
    "hanzi": "你是老师。",
    "pinyin": "nǐ shì lǎoshī.",
    "meaning": "Kamu guru.",
    "prompt": "Susun kalimat “kamu guru”.",
    "answer": "你是老师。",
    "modelSentence": "你是老师。",
    "modelPinyin": "nǐ shì lǎoshī.",
    "modelMeaning": "Kamu guru.",
    "hint": "Subjek 你 tetap di depan.",
    "explanation": "Mandarin tidak memakai “to be” yang berubah bentuk."
  },
  {
    "id": "basic-word-order-wo-shi-3",
    "title": "Basic Word Order: 我 + 是 + ... 3",
    "pattern": "他 + 是 + 医生",
    "hanzi": "他是医生。",
    "pinyin": "tā shì yīshēng.",
    "meaning": "Dia dokter.",
    "prompt": "Buat kalimat “dia dokter” memakai 是.",
    "answer": "他是医生。",
    "modelSentence": "他是医生。",
    "modelPinyin": "tā shì yīshēng.",
    "modelMeaning": "Dia dokter.",
    "hint": "Pakai 他 untuk dia laki-laki.",
    "explanation": "Predikat identitas langsung setelah 是."
  },
  {
    "id": "basic-word-order-wo-shi-4",
    "title": "Basic Word Order: 我 + 是 + ... 4",
    "pattern": "她 + 是 + 朋友",
    "hanzi": "她是朋友。",
    "pinyin": "tā shì péngyǒu.",
    "meaning": "Dia teman.",
    "prompt": "Buat kalimat “dia teman” dengan subjek perempuan.",
    "answer": "她是朋友。",
    "modelSentence": "她是朋友。",
    "modelPinyin": "tā shì péngyǒu.",
    "modelMeaning": "Dia teman.",
    "hint": "她 dan 他 sama-sama dibaca tā.",
    "explanation": "Hanzi subjek berubah, pelafalan tetap sama."
  }
];

export default function MandarinYufaTopik1Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
