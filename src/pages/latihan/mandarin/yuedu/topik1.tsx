import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-greetings-and-signs",
  "title": "Yuèdú 1: Greetings and Signs",
  "description": "Membaca salam pendek, tanda sederhana, dan respons sopan sehari-hari.",
  "topicNumber": 1,
  "focus": "Salam dan tanda pendek.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "greetings-and-signs-1",
    "title": "Greetings and Signs 1",
    "focus": "Greeting",
    "passageHanzi": "你好！我叫安娜。",
    "passagePinyin": "Nǐ hǎo! Wǒ jiào Ānnà.",
    "passageMeaning": "Halo! Nama saya Anna.",
    "question": "Siapa nama orang dalam teks?",
    "answer": "安娜 / Anna",
    "hint": "Cari kata setelah 叫.",
    "keywords": [
      "你好",
      "我叫",
      "安娜"
    ],
    "explanation": "叫 memperkenalkan nama, jadi nama yang muncul setelahnya adalah 安娜."
  },
  {
    "id": "greetings-and-signs-2",
    "title": "Greetings and Signs 2",
    "focus": "Greeting",
    "passageHanzi": "老师好！学生们好！",
    "passagePinyin": "Lǎoshī hǎo! Xuéshengmen hǎo!",
    "passageMeaning": "Halo guru! Halo para murid!",
    "question": "Siapa yang disapa lebih dulu?",
    "answer": "老师 / guru",
    "hint": "Baca salam pertama.",
    "keywords": [
      "老师",
      "学生们",
      "好"
    ],
    "explanation": "Kalimat pertama adalah 老师好, jadi guru disapa terlebih dulu."
  },
  {
    "id": "greetings-and-signs-3",
    "title": "Greetings and Signs 3",
    "focus": "Polite Sign",
    "passageHanzi": "请进。谢谢。",
    "passagePinyin": "Qǐng jìn. Xièxie.",
    "passageMeaning": "Silakan masuk. Terima kasih.",
    "question": "Instruksi sopan apa yang muncul?",
    "answer": "请进 / silakan masuk",
    "hint": "请 membuat instruksi sopan.",
    "keywords": [
      "请",
      "进",
      "谢谢"
    ],
    "explanation": "请进 berarti silakan masuk, sedangkan 谢谢 berarti terima kasih."
  },
  {
    "id": "greetings-and-signs-4",
    "title": "Greetings and Signs 4",
    "focus": "Farewell",
    "passageHanzi": "再见，明天见！",
    "passagePinyin": "Zàijiàn, míngtiān jiàn!",
    "passageMeaning": "Sampai jumpa, sampai bertemu besok!",
    "question": "Kapan mereka akan bertemu lagi?",
    "answer": "明天 / besok",
    "hint": "Cari kata waktu.",
    "keywords": [
      "再见",
      "明天",
      "见"
    ],
    "explanation": "明天 berarti besok, dan 明天见 berarti sampai bertemu besok."
  }
];

export default function MandarinYueduTopik1Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
