import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-food-and-drink-orders",
  "title": "Tīnglì 7: Food and Drink Orders",
  "description": "Melatih pesanan makanan dan minuman dalam percakapan pendek.",
  "topicNumber": 7,
  "focus": "Makanan, minuman, dan pesanan.",
  "goal": "Dengarkan item yang dipesan, tulis jawabannya, lalu buka transcript untuk cek."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "food-and-drink-orders-1",
    "title": "Food and Drink Orders 1",
    "focus": "Order",
    "audioHanzi": "我要一杯茶。",
    "audioPinyin": "Wǒ yào yì bēi chá.",
    "audioMeaning": "Saya mau secangkir teh.",
    "question": "Apa yang dipesan?",
    "answer": "一杯茶 / secangkir teh",
    "hint": "Dengarkan kata setelah 我要.",
    "keywords": [
      "我要",
      "一杯",
      "茶"
    ],
    "explanation": "一杯茶 berarti secangkir teh."
  },
  {
    "id": "food-and-drink-orders-2",
    "title": "Food and Drink Orders 2",
    "focus": "Order",
    "audioHanzi": "她喜欢吃米饭。",
    "audioPinyin": "Tā xǐhuan chī mǐfàn.",
    "audioMeaning": "Dia suka makan nasi.",
    "question": "Makanan apa yang dia suka?",
    "answer": "米饭 / nasi",
    "hint": "Cari makanan setelah 吃.",
    "keywords": [
      "喜欢",
      "吃",
      "米饭"
    ],
    "explanation": "米饭 berarti nasi."
  },
  {
    "id": "food-and-drink-orders-3",
    "title": "Food and Drink Orders 3",
    "focus": "Order",
    "audioHanzi": "请给我水。",
    "audioPinyin": "Qǐng gěi wǒ shuǐ.",
    "audioMeaning": "Tolong beri saya air.",
    "question": "Apa yang diminta pembicara?",
    "answer": "水 / air",
    "hint": "Dengarkan kata benda terakhir.",
    "keywords": [
      "请",
      "给我",
      "水"
    ],
    "explanation": "水 berarti air."
  },
  {
    "id": "food-and-drink-orders-4",
    "title": "Food and Drink Orders 4",
    "focus": "Order",
    "audioHanzi": "这个苹果很好吃。",
    "audioPinyin": "Zhège píngguǒ hěn hǎochī.",
    "audioMeaning": "Apel ini sangat enak.",
    "question": "Buah apa yang disebut?",
    "answer": "苹果 / apel",
    "hint": "Cari kata setelah 这个.",
    "keywords": [
      "这个",
      "苹果",
      "好吃"
    ],
    "explanation": "苹果 berarti apel."
  }
];

export default function MandarinTingliTopik7Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
