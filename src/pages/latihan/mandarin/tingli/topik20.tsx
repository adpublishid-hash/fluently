import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-hsk-1-listening-review",
  "title": "Tīnglì 20: HSK 1 Listening Review",
  "description": "Review Tīnglì HSK 1 dengan gabungan salam, angka, waktu, tempat, dan aktivitas.",
  "topicNumber": 20,
  "focus": "Review audio HSK 1.",
  "goal": "Dengarkan satu audio singkat, tangkap detail utama, lalu cek transcript dan keyword."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "hsk-1-listening-review-1",
    "title": "HSK 1 Listening Review 1",
    "focus": "Review",
    "audioHanzi": "你好，我叫大卫，我是学生。",
    "audioPinyin": "Nǐ hǎo, wǒ jiào Dàwèi, wǒ shì xuésheng.",
    "audioMeaning": "Halo, nama saya David, saya adalah siswa.",
    "question": "Apa identitas David?",
    "answer": "学生 / siswa",
    "hint": "Dengarkan kata setelah 我是.",
    "keywords": [
      "我叫",
      "大卫",
      "学生"
    ],
    "explanation": "我是学生 berarti saya adalah siswa."
  },
  {
    "id": "hsk-1-listening-review-2",
    "title": "HSK 1 Listening Review 2",
    "focus": "Review",
    "audioHanzi": "今天七点我去学校。",
    "audioPinyin": "Jīntiān qī diǎn wǒ qù xuéxiào.",
    "audioMeaning": "Hari ini jam tujuh saya pergi ke sekolah.",
    "question": "Jam berapa pembicara pergi ke sekolah?",
    "answer": "七点 / jam tujuh",
    "hint": "Dengarkan waktu sebelum 去学校.",
    "keywords": [
      "今天",
      "七点",
      "学校"
    ],
    "explanation": "七点 adalah waktu keberangkatan."
  },
  {
    "id": "hsk-1-listening-review-3",
    "title": "HSK 1 Listening Review 3",
    "focus": "Review",
    "audioHanzi": "我有两个朋友，他们喜欢中文。",
    "audioPinyin": "Wǒ yǒu liǎng gè péngyou, tāmen xǐhuan Zhōngwén.",
    "audioMeaning": "Saya punya dua teman, mereka suka bahasa Mandarin.",
    "question": "Berapa teman yang dimiliki pembicara?",
    "answer": "两个朋友 / dua teman",
    "hint": "Dengarkan jumlah sebelum 朋友.",
    "keywords": [
      "两个",
      "朋友",
      "喜欢中文"
    ],
    "explanation": "两个朋友 berarti dua teman."
  },
  {
    "id": "hsk-1-listening-review-4",
    "title": "HSK 1 Listening Review 4",
    "focus": "Review",
    "audioHanzi": "明天不下雨，我们去公园。",
    "audioPinyin": "Míngtiān bù xià yǔ, wǒmen qù gōngyuán.",
    "audioMeaning": "Besok tidak hujan, kami pergi ke taman.",
    "question": "Ke mana mereka pergi besok?",
    "answer": "公园 / taman",
    "hint": "Dengarkan tempat setelah 去.",
    "keywords": [
      "明天",
      "不下雨",
      "公园"
    ],
    "explanation": "去公园 berarti pergi ke taman."
  }
];

export default function MandarinTingliTopik20Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
