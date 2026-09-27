import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-phone-numbers-and-dates",
  "title": "Tīnglì 11: Phone Numbers and Dates",
  "description": "Melatih nomor telepon, tanggal, dan hari dari audio pendek.",
  "topicNumber": 11,
  "focus": "Nomor, tanggal, dan hari.",
  "goal": "Dengarkan deretan angka atau tanggal, lalu jawab detail yang diminta."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "phone-numbers-and-dates-1",
    "title": "Phone Numbers and Dates 1",
    "focus": "Phone",
    "audioHanzi": "他的电话是五六七八。",
    "audioPinyin": "Tā de diànhuà shì wǔ liù qī bā.",
    "audioMeaning": "Nomor teleponnya adalah lima enam tujuh delapan.",
    "question": "Nomor apa yang disebut?",
    "answer": "五六七八 / 5678",
    "hint": "Dengarkan angka setelah 是.",
    "keywords": [
      "电话",
      "五",
      "六",
      "七",
      "八"
    ],
    "explanation": "Nomor yang terdengar adalah 五六七八."
  },
  {
    "id": "phone-numbers-and-dates-2",
    "title": "Phone Numbers and Dates 2",
    "focus": "Date",
    "audioHanzi": "今天是星期一。",
    "audioPinyin": "Jīntiān shì xīngqī yī.",
    "audioMeaning": "Hari ini hari Senin.",
    "question": "Hari apa hari ini?",
    "answer": "星期一 / Senin",
    "hint": "Dengarkan hari setelah 是.",
    "keywords": [
      "今天",
      "星期一"
    ],
    "explanation": "星期一 berarti hari Senin."
  },
  {
    "id": "phone-numbers-and-dates-3",
    "title": "Phone Numbers and Dates 3",
    "focus": "Date",
    "audioHanzi": "我的生日是六月一号。",
    "audioPinyin": "Wǒ de shēngrì shì liù yuè yī hào.",
    "audioMeaning": "Ulang tahun saya tanggal satu Juni.",
    "question": "Kapan ulang tahunnya?",
    "answer": "六月一号 / 1 Juni",
    "hint": "Dengarkan bulan dan tanggal setelah 是.",
    "keywords": [
      "生日",
      "六月",
      "一号"
    ],
    "explanation": "六月一号 berarti tanggal satu Juni."
  },
  {
    "id": "phone-numbers-and-dates-4",
    "title": "Phone Numbers and Dates 4",
    "focus": "Schedule",
    "audioHanzi": "星期天我不工作。",
    "audioPinyin": "Xīngqītiān wǒ bù gōngzuò.",
    "audioMeaning": "Hari Minggu saya tidak bekerja.",
    "question": "Apa yang tidak dilakukan pada hari Minggu?",
    "answer": "不工作 / tidak bekerja",
    "hint": "Dengarkan negasi 不 sebelum kata kerja.",
    "keywords": [
      "星期天",
      "不",
      "工作"
    ],
    "explanation": "不工作 berarti tidak bekerja."
  }
];

export default function MandarinTingliTopik11Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
