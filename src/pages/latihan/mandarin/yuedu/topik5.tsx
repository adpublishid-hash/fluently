import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-daily-schedule",
  "title": "Yuèdú 5: Daily Schedule",
  "description": "Membaca jadwal singkat tentang pagi, siang, sore, dan malam.",
  "topicNumber": 5,
  "focus": "Jadwal harian.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "daily-schedule-1",
    "title": "Daily Schedule 1",
    "focus": "Morning",
    "passageHanzi": "我早上七点起床。八点去学校。",
    "passagePinyin": "Wǒ zǎoshang qī diǎn qǐchuáng. Bā diǎn qù xuéxiào.",
    "passageMeaning": "Saya bangun jam tujuh pagi. Jam delapan pergi ke sekolah.",
    "question": "Jam berapa ia pergi ke sekolah?",
    "answer": "八点 / jam delapan",
    "hint": "Cari 去学校.",
    "keywords": [
      "早上",
      "七点",
      "八点",
      "学校"
    ],
    "explanation": "八点去学校 berarti pergi ke sekolah jam delapan."
  },
  {
    "id": "daily-schedule-2",
    "title": "Daily Schedule 2",
    "focus": "Afternoon",
    "passageHanzi": "下午我学习中文。晚上我看电影。",
    "passagePinyin": "Xiàwǔ wǒ xuéxí Zhōngwén. Wǎnshang wǒ kàn diànyǐng.",
    "passageMeaning": "Sore hari saya belajar Mandarin. Malam hari saya menonton film.",
    "question": "Kapan ia belajar Mandarin?",
    "answer": "下午 / sore hari",
    "hint": "Cari 学习中文.",
    "keywords": [
      "下午",
      "学习中文",
      "晚上",
      "电影"
    ],
    "explanation": "学习中文 muncul setelah 下午."
  },
  {
    "id": "daily-schedule-3",
    "title": "Daily Schedule 3",
    "focus": "Routine",
    "passageHanzi": "每天我喝水，也喝茶。",
    "passagePinyin": "Měitiān wǒ hē shuǐ, yě hē chá.",
    "passageMeaning": "Setiap hari saya minum air, juga minum teh.",
    "question": "Minuman apa saja yang disebut?",
    "answer": "水 dan 茶 / air dan teh",
    "hint": "Cari kata setelah 喝.",
    "keywords": [
      "每天",
      "喝水",
      "喝茶"
    ],
    "explanation": "Dua objek setelah 喝 adalah 水 dan 茶."
  },
  {
    "id": "daily-schedule-4",
    "title": "Daily Schedule 4",
    "focus": "Weekend",
    "passageHanzi": "星期六我不去学校。我在家休息。",
    "passagePinyin": "Xīngqīliù wǒ bú qù xuéxiào. Wǒ zài jiā xiūxi.",
    "passageMeaning": "Sabtu saya tidak pergi ke sekolah. Saya beristirahat di rumah.",
    "question": "Di mana ia beristirahat?",
    "answer": "家 / di rumah",
    "hint": "Cari 休息.",
    "keywords": [
      "星期六",
      "不去学校",
      "在家",
      "休息"
    ],
    "explanation": "我在家休息 berarti saya beristirahat di rumah."
  }
];

export default function MandarinYueduTopik5Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
