import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-connectors-and-contrast",
  "title": "Tīnglì 19: Connectors and Contrast",
  "description": "Melatih konektor dasar seperti 和, 也, 但是, dan 所以 dalam audio.",
  "topicNumber": 19,
  "focus": "Konektor dan hubungan ide.",
  "goal": "Dengarkan penghubung kalimat dan simpulkan hubungan antaride."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "connectors-and-contrast-1",
    "title": "Connectors and Contrast 1",
    "focus": "Connector",
    "audioHanzi": "我喜欢茶和咖啡。",
    "audioPinyin": "Wǒ xǐhuan chá hé kāfēi.",
    "audioMeaning": "Saya suka teh dan kopi.",
    "question": "Dua minuman apa yang disukai?",
    "answer": "茶和咖啡 / teh dan kopi",
    "hint": "Dengarkan kata sebelum dan sesudah 和.",
    "keywords": [
      "茶",
      "和",
      "咖啡"
    ],
    "explanation": "和 menghubungkan dua benda: 茶 dan 咖啡."
  },
  {
    "id": "connectors-and-contrast-2",
    "title": "Connectors and Contrast 2",
    "focus": "Connector",
    "audioHanzi": "他也学习中文。",
    "audioPinyin": "Tā yě xuéxí Zhōngwén.",
    "audioMeaning": "Dia juga belajar Mandarin.",
    "question": "Kata apa yang berarti juga?",
    "answer": "也",
    "hint": "Dengarkan kata sebelum 学习.",
    "keywords": [
      "也",
      "学习中文"
    ],
    "explanation": "也 berarti juga."
  },
  {
    "id": "connectors-and-contrast-3",
    "title": "Connectors and Contrast 3",
    "focus": "Contrast",
    "audioHanzi": "我想去，但是我很忙。",
    "audioPinyin": "Wǒ xiǎng qù, dànshì wǒ hěn máng.",
    "audioMeaning": "Saya ingin pergi, tetapi saya sibuk.",
    "question": "Mengapa pembicara mungkin tidak pergi?",
    "answer": "很忙 / sibuk",
    "hint": "Dengarkan alasan setelah 但是.",
    "keywords": [
      "想去",
      "但是",
      "很忙"
    ],
    "explanation": "但是 memperkenalkan kontras, alasannya adalah sibuk."
  },
  {
    "id": "connectors-and-contrast-4",
    "title": "Connectors and Contrast 4",
    "focus": "Result",
    "audioHanzi": "下雨了，所以我在家。",
    "audioPinyin": "Xià yǔ le, suǒyǐ wǒ zài jiā.",
    "audioMeaning": "Hujan, jadi saya di rumah.",
    "question": "Mengapa pembicara di rumah?",
    "answer": "下雨了 / hujan",
    "hint": "Dengarkan sebab sebelum 所以.",
    "keywords": [
      "下雨",
      "所以",
      "在家"
    ],
    "explanation": "所以 menandai akibat; sebabnya adalah hujan."
  }
];

export default function MandarinTingliTopik19Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
