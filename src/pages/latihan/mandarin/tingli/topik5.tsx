import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-time-and-daily-schedule",
  "title": "Tīnglì 5: Time and Daily Schedule",
  "description": "Melatih waktu, jadwal, dan kegiatan harian dari audio singkat.",
  "topicNumber": 5,
  "focus": "Waktu dan rutinitas.",
  "goal": "Dengarkan kata waktu seperti 今天, 明天, 早上, dan tulis kegiatan utamanya."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "time-and-daily-schedule-1",
    "title": "Time and Daily Schedule 1",
    "focus": "Schedule",
    "audioHanzi": "我早上七点起床。",
    "audioPinyin": "Wǒ zǎoshang qī diǎn qǐchuáng.",
    "audioMeaning": "Saya bangun jam tujuh pagi.",
    "question": "Jam berapa pembicara bangun?",
    "answer": "早上七点 / jam tujuh pagi",
    "hint": "Dengarkan waktu sebelum 起床.",
    "keywords": [
      "早上",
      "七点",
      "起床"
    ],
    "explanation": "起床 adalah bangun tidur, waktunya 早上七点."
  },
  {
    "id": "time-and-daily-schedule-2",
    "title": "Time and Daily Schedule 2",
    "focus": "Schedule",
    "audioHanzi": "今天下午我学习中文。",
    "audioPinyin": "Jīntiān xiàwǔ wǒ xuéxí Zhōngwén.",
    "audioMeaning": "Sore ini saya belajar bahasa Mandarin.",
    "question": "Kapan pembicara belajar Mandarin?",
    "answer": "今天下午 / sore ini",
    "hint": "Dengarkan kata waktu di awal.",
    "keywords": [
      "今天",
      "下午",
      "学习中文"
    ],
    "explanation": "今天下午 berarti sore ini."
  },
  {
    "id": "time-and-daily-schedule-3",
    "title": "Time and Daily Schedule 3",
    "focus": "Schedule",
    "audioHanzi": "明天晚上我们看电影。",
    "audioPinyin": "Míngtiān wǎnshang wǒmen kàn diànyǐng.",
    "audioMeaning": "Besok malam kami menonton film.",
    "question": "Apa kegiatan besok malam?",
    "answer": "看电影 / menonton film",
    "hint": "Cari kata kerja setelah 我们.",
    "keywords": [
      "明天晚上",
      "看",
      "电影"
    ],
    "explanation": "看电影 berarti menonton film."
  },
  {
    "id": "time-and-daily-schedule-4",
    "title": "Time and Daily Schedule 4",
    "focus": "Schedule",
    "audioHanzi": "现在我去学校。",
    "audioPinyin": "Xiànzài wǒ qù xuéxiào.",
    "audioMeaning": "Sekarang saya pergi ke sekolah.",
    "question": "Ke mana pembicara pergi?",
    "answer": "学校 / sekolah",
    "hint": "Dengarkan tempat setelah 去.",
    "keywords": [
      "现在",
      "去",
      "学校"
    ],
    "explanation": "去学校 berarti pergi ke sekolah."
  }
];

export default function MandarinTingliTopik5Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
