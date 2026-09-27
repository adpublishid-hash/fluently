import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-reading-connectors",
  "title": "Yuèdú 19: Reading Connectors",
  "description": "Membaca konektor dasar seperti 和, 也, 但是, dan 所以.",
  "topicNumber": 19,
  "focus": "Konektor sederhana.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "reading-connectors-1",
    "title": "Reading Connectors 1",
    "focus": "Connector",
    "passageHanzi": "我喜欢茶和咖啡。",
    "passagePinyin": "Wǒ xǐhuan chá hé kāfēi.",
    "passageMeaning": "Saya suka teh dan kopi.",
    "question": "Konektor apa yang berarti “dan”?",
    "answer": "和",
    "hint": "Kata di antara dua benda.",
    "keywords": [
      "茶",
      "和",
      "咖啡"
    ],
    "explanation": "和 menghubungkan dua kata benda."
  },
  {
    "id": "reading-connectors-2",
    "title": "Reading Connectors 2",
    "focus": "Connector",
    "passageHanzi": "他是学生，也学习中文。",
    "passagePinyin": "Tā shì xuésheng, yě xuéxí Zhōngwén.",
    "passageMeaning": "Dia pelajar, juga belajar Mandarin.",
    "question": "Kata apa yang berarti “juga”?",
    "answer": "也",
    "hint": "Cari sebelum 学习中文.",
    "keywords": [
      "学生",
      "也",
      "中文"
    ],
    "explanation": "也 berarti juga."
  },
  {
    "id": "reading-connectors-3",
    "title": "Reading Connectors 3",
    "focus": "Connector",
    "passageHanzi": "我想去学校，但是今天很忙。",
    "passagePinyin": "Wǒ xiǎng qù xuéxiào, dànshì jīntiān hěn máng.",
    "passageMeaning": "Saya ingin pergi ke sekolah, tetapi hari ini sangat sibuk.",
    "question": "Mengapa ia mungkin tidak pergi?",
    "answer": "今天很忙 / hari ini sibuk",
    "hint": "Cari setelah 但是.",
    "keywords": [
      "想去",
      "但是",
      "很忙"
    ],
    "explanation": "Tetapi setelahnya muncul alasan 今天很忙."
  },
  {
    "id": "reading-connectors-4",
    "title": "Reading Connectors 4",
    "focus": "Connector",
    "passageHanzi": "下雨，所以我不出门。",
    "passagePinyin": "Xià yǔ, suǒyǐ wǒ bù chū mén.",
    "passageMeaning": "Hujan, jadi saya tidak keluar rumah.",
    "question": "Apa akibat dari hujan?",
    "answer": "不出门 / tidak keluar rumah",
    "hint": "Cari setelah 所以.",
    "keywords": [
      "下雨",
      "所以",
      "不出门"
    ],
    "explanation": "所以 menandai akibat, yaitu 不出门."
  }
];

export default function MandarinYueduTopik19Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
