import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-basic-adjectives",
  "title": "Cíhuì 13: Basic Adjectives",
  "description": "Melatih kata sifat dasar untuk menilai benda, orang, dan jumlah.",
  "topicNumber": 13,
  "focus": "Kata sifat dasar.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "basic-adjectives-1",
    "title": "Basic Adjectives 1",
    "category": "Adjective",
    "hanzi": "好",
    "pinyin": "hǎo",
    "meaning": "baik atau bagus",
    "prompt": "Ingat arti dan pinyin dari “好”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "baik atau bagus; hǎo",
    "exampleSentence": "这个很好。",
    "examplePinyin": "Zhège hěn hǎo.",
    "exampleMeaning": "Ini sangat bagus.",
    "hint": "Petunjuk: kategori kata ini adalah adjective.",
    "usage": "Kata sifat paling umum untuk baik, bagus, atau oke."
  },
  {
    "id": "basic-adjectives-2",
    "title": "Basic Adjectives 2",
    "category": "Adjective",
    "hanzi": "大",
    "pinyin": "dà",
    "meaning": "besar",
    "prompt": "Ingat arti dan pinyin dari “大”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "besar; dà",
    "exampleSentence": "这个学校很大。",
    "examplePinyin": "Zhège xuéxiào hěn dà.",
    "exampleMeaning": "Sekolah ini besar.",
    "hint": "Petunjuk: kategori kata ini adalah adjective.",
    "usage": "Menjelaskan ukuran besar."
  },
  {
    "id": "basic-adjectives-3",
    "title": "Basic Adjectives 3",
    "category": "Adjective",
    "hanzi": "小",
    "pinyin": "xiǎo",
    "meaning": "kecil",
    "prompt": "Ingat arti dan pinyin dari “小”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kecil; xiǎo",
    "exampleSentence": "我的家很小。",
    "examplePinyin": "Wǒ de jiā hěn xiǎo.",
    "exampleMeaning": "Rumah saya kecil.",
    "hint": "Petunjuk: kategori kata ini adalah adjective.",
    "usage": "Menjelaskan ukuran kecil."
  },
  {
    "id": "basic-adjectives-4",
    "title": "Basic Adjectives 4",
    "category": "Adjective",
    "hanzi": "多",
    "pinyin": "duō",
    "meaning": "banyak",
    "prompt": "Ingat arti dan pinyin dari “多”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "banyak; duō",
    "exampleSentence": "这里人很多。",
    "examplePinyin": "Zhèlǐ rén hěn duō.",
    "exampleMeaning": "Di sini orangnya banyak.",
    "hint": "Petunjuk: kategori kata ini adalah adjective.",
    "usage": "Menjelaskan jumlah banyak."
  }
];

export default function MandarinCihuiTopik13Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
