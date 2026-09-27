import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-measure-word-ge",
  "title": "Yǔfǎ 8: Measure Word 个",
  "description": "Melatih kata ukur umum 个 setelah angka atau 这/那.",
  "topicNumber": 8,
  "focus": "Angka/这/那 + 个 + benda.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "measure-word-ge-1",
    "title": "Measure Word 个 1",
    "pattern": "一 + 个 + 学生",
    "hanzi": "一个学生。",
    "pinyin": "yí ge xuésheng.",
    "meaning": "Seorang pelajar.",
    "prompt": "Susun frasa “seorang pelajar”.",
    "answer": "一个学生。",
    "modelSentence": "一个学生。",
    "modelPinyin": "yí ge xuésheng.",
    "modelMeaning": "Seorang pelajar.",
    "hint": "个 berada antara angka dan benda.",
    "explanation": "Mandarin butuh kata ukur untuk banyak benda."
  },
  {
    "id": "measure-word-ge-2",
    "title": "Measure Word 个 2",
    "pattern": "这 + 个 + 人",
    "hanzi": "这个人是老师。",
    "pinyin": "zhè ge rén shì lǎoshī.",
    "meaning": "Orang ini guru.",
    "prompt": "Buat kalimat “orang ini guru”.",
    "answer": "这个人是老师。",
    "modelSentence": "这个人是老师。",
    "modelPinyin": "zhè ge rén shì lǎoshī.",
    "modelMeaning": "Orang ini guru.",
    "hint": "这个 berarti “ini yang satu ini”.",
    "explanation": "Setelah frasa benda, lanjutkan predikat."
  },
  {
    "id": "measure-word-ge-3",
    "title": "Measure Word 个 3",
    "pattern": "那 + 个 + 朋友",
    "hanzi": "那个朋友很好。",
    "pinyin": "nà ge péngyǒu hěn hǎo.",
    "meaning": "Teman itu baik.",
    "prompt": "Buat kalimat “teman itu baik”.",
    "answer": "那个朋友很好。",
    "modelSentence": "那个朋友很好。",
    "modelPinyin": "nà ge péngyǒu hěn hǎo.",
    "modelMeaning": "Teman itu baik.",
    "hint": "那个 berarti “yang itu”.",
    "explanation": "很好 menjadi predikat sifat."
  },
  {
    "id": "measure-word-ge-4",
    "title": "Measure Word 个 4",
    "pattern": "三 + 个 + 苹果",
    "hanzi": "我有三个苹果。",
    "pinyin": "wǒ yǒu sān ge píngguǒ.",
    "meaning": "Saya punya tiga apel.",
    "prompt": "Buat kalimat “saya punya tiga apel”.",
    "answer": "我有三个苹果。",
    "modelSentence": "我有三个苹果。",
    "modelPinyin": "wǒ yǒu sān ge píngguǒ.",
    "modelMeaning": "Saya punya tiga apel.",
    "hint": "苹果 bisa memakai 个 dalam level dasar.",
    "explanation": "Urutan: angka + 个 + benda."
  }
];

export default function MandarinYufaTopik8Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
