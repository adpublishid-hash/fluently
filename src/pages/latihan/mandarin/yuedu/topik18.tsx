import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-question-word-reading",
  "title": "Yuèdú 18: Question Word Reading",
  "description": "Mengenali 什么, 谁, 哪儿, 几, dan 怎么 dari konteks bacaan.",
  "topicNumber": 18,
  "focus": "Kata tanya dalam bacaan.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "question-word-reading-1",
    "title": "Question Word Reading 1",
    "focus": "Question Word",
    "passageHanzi": "这是什么？这是我的书。",
    "passagePinyin": "Zhè shì shénme? Zhè shì wǒ de shū.",
    "passageMeaning": "Ini apa? Ini buku saya.",
    "question": "Jawaban dari pertanyaan itu apa?",
    "answer": "书 / buku",
    "hint": "Kalimat kedua menjawab.",
    "keywords": [
      "什么",
      "我的书"
    ],
    "explanation": "这是我的书 menjawab bahwa benda itu buku."
  },
  {
    "id": "question-word-reading-2",
    "title": "Question Word Reading 2",
    "focus": "Question Word",
    "passageHanzi": "他是谁？他是我哥哥。",
    "passagePinyin": "Tā shì shéi? Tā shì wǒ gēge.",
    "passageMeaning": "Dia siapa? Dia kakak laki-laki saya.",
    "question": "Siapa dia?",
    "answer": "哥哥 / kakak laki-laki",
    "hint": "Cari kalimat setelah pertanyaan.",
    "keywords": [
      "谁",
      "我哥哥"
    ],
    "explanation": "他是我哥哥 berarti dia kakak laki-laki saya."
  },
  {
    "id": "question-word-reading-3",
    "title": "Question Word Reading 3",
    "focus": "Question Word",
    "passageHanzi": "你去哪儿？我去商店。",
    "passagePinyin": "Nǐ qù nǎr? Wǒ qù shāngdiàn.",
    "passageMeaning": "Kamu pergi ke mana? Saya pergi ke toko.",
    "question": "Ke mana ia pergi?",
    "answer": "商店 / toko",
    "hint": "Cari 我去.",
    "keywords": [
      "哪儿",
      "商店"
    ],
    "explanation": "我去商店 menjawab tujuan perginya."
  },
  {
    "id": "question-word-reading-4",
    "title": "Question Word Reading 4",
    "focus": "Question Word",
    "passageHanzi": "你有几本书？我有三本书。",
    "passagePinyin": "Nǐ yǒu jǐ běn shū? Wǒ yǒu sān běn shū.",
    "passageMeaning": "Kamu punya berapa buku? Saya punya tiga buku.",
    "question": "Berapa buku yang dimiliki?",
    "answer": "三本书 / tiga buku",
    "hint": "Cari angka setelah 有.",
    "keywords": [
      "几本书",
      "三本书"
    ],
    "explanation": "三本书 berarti tiga buku."
  }
];

export default function MandarinYueduTopik18Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
