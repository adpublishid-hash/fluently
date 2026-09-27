import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-adjective-predicate-hen-hao",
  "title": "Yǔfǎ 18: Adjective Predicate 很好",
  "description": "Melatih predikat sifat Mandarin dengan 很 sebelum adjektiva.",
  "topicNumber": 18,
  "focus": "Subjek + 很 + adjektiva.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "adjective-predicate-hen-hao-1",
    "title": "Adjective Predicate 很好 1",
    "pattern": "我 + 很 + 好",
    "hanzi": "我很好。",
    "pinyin": "wǒ hěn hǎo.",
    "meaning": "Saya baik-baik saja.",
    "prompt": "Buat kalimat “saya baik-baik saja”.",
    "answer": "我很好。",
    "modelSentence": "我很好。",
    "modelPinyin": "wǒ hěn hǎo.",
    "modelMeaning": "Saya baik-baik saja.",
    "hint": "很 sering menjadi penghubung sebelum adjektiva.",
    "explanation": "Tidak perlu 是 sebelum 好."
  },
  {
    "id": "adjective-predicate-hen-hao-2",
    "title": "Adjective Predicate 很好 2",
    "pattern": "她 + 很 + 忙",
    "hanzi": "她很忙。",
    "pinyin": "tā hěn máng.",
    "meaning": "Dia sangat/sedang sibuk.",
    "prompt": "Buat kalimat “dia sibuk”.",
    "answer": "她很忙。",
    "modelSentence": "她很忙。",
    "modelPinyin": "tā hěn máng.",
    "modelMeaning": "Dia sibuk.",
    "hint": "忙 adalah adjektiva/predikat sifat.",
    "explanation": "Jangan pakai 是忙."
  },
  {
    "id": "adjective-predicate-hen-hao-3",
    "title": "Adjective Predicate 很好 3",
    "pattern": "这个 + 很 + 贵",
    "hanzi": "这个很贵。",
    "pinyin": "zhè ge hěn guì.",
    "meaning": "Yang ini mahal.",
    "prompt": "Buat kalimat “yang ini mahal”.",
    "answer": "这个很贵。",
    "modelSentence": "这个很贵。",
    "modelPinyin": "zhè ge hěn guì.",
    "modelMeaning": "Yang ini mahal.",
    "hint": "这个 menjadi subjek.",
    "explanation": "很 sebelum 贵 membuat predikat natural."
  },
  {
    "id": "adjective-predicate-hen-hao-4",
    "title": "Adjective Predicate 很好 4",
    "pattern": "今天 + 很 + 热",
    "hanzi": "今天很热。",
    "pinyin": "jīntiān hěn rè.",
    "meaning": "Hari ini panas.",
    "prompt": "Buat kalimat “hari ini panas”.",
    "answer": "今天很热。",
    "modelSentence": "今天很热。",
    "modelPinyin": "jīntiān hěn rè.",
    "modelMeaning": "Hari ini panas.",
    "hint": "Kata waktu bisa menjadi topik/subjek.",
    "explanation": "Predikat sifat tidak memakai 是."
  }
];

export default function MandarinYufaTopik18Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
