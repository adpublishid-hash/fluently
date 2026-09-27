import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-time-and-appointments",
  "title": "Kǒuyǔ 8: Time and Appointments",
  "description": "Melatih membuat janji sederhana dengan waktu, hari, dan tempat.",
  "topicNumber": 8,
  "focus": "Waktu, hari, dan janji.",
  "goal": "Gunakan waktu dan tempat untuk membuat respons ajakan yang jelas."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "time-and-appointments-1",
    "title": "Time and Appointments 1",
    "scenario": "Appointment",
    "prompt": "Ajak teman bertemu besok sore.",
    "role": "You invite a friend.",
    "modelHanzi": "我们明天下午见吧。",
    "modelPinyin": "Wǒmen míngtiān xiàwǔ jiàn ba.",
    "modelMeaning": "Ayo kita bertemu besok sore.",
    "starter": "我们...见吧。",
    "hint": "吧 membuat ajakan terdengar natural.",
    "checklist": [
      "明天下午 jelas.",
      "见吧 terdengar sebagai ajakan.",
      "Nada ramah."
    ],
    "followUp": "Tambahkan 在学校 jika ingin tempat."
  },
  {
    "id": "time-and-appointments-2",
    "title": "Time and Appointments 2",
    "scenario": "Appointment",
    "prompt": "Katakan kelas mulai jam delapan.",
    "role": "You state a schedule.",
    "modelHanzi": "中文课八点开始。",
    "modelPinyin": "Zhōngwén kè bā diǎn kāishǐ.",
    "modelMeaning": "Kelas Mandarin mulai jam delapan.",
    "starter": "中文课...开始。",
    "hint": "开始 berarti mulai.",
    "checklist": [
      "中文课 jelas.",
      "八点 sebelum 开始.",
      "Kalimat informatif."
    ],
    "followUp": "Coba ganti 八点 dengan 九点."
  },
  {
    "id": "time-and-appointments-3",
    "title": "Time and Appointments 3",
    "scenario": "Appointment",
    "prompt": "Tanyakan jam berapa sekarang.",
    "role": "You ask the time.",
    "modelHanzi": "现在几点？",
    "modelPinyin": "Xiànzài jǐ diǎn?",
    "modelMeaning": "Sekarang jam berapa?",
    "starter": "现在几点？",
    "hint": "几点 menanyakan jam.",
    "checklist": [
      "现在 jelas.",
      "几点 naik sedikit di akhir.",
      "Pertanyaan pendek."
    ],
    "followUp": "Ulangi seolah sedang bertanya langsung."
  },
  {
    "id": "time-and-appointments-4",
    "title": "Time and Appointments 4",
    "scenario": "Appointment",
    "prompt": "Katakan kamu sibuk hari ini tetapi besok bisa.",
    "role": "You reschedule.",
    "modelHanzi": "我今天很忙，明天可以。",
    "modelPinyin": "Wǒ jīntiān hěn máng, míngtiān kěyǐ.",
    "modelMeaning": "Hari ini saya sibuk, besok bisa.",
    "starter": "我今天...，明天...",
    "hint": "Gunakan kontras waktu 今天 dan 明天.",
    "checklist": [
      "今天很忙 jelas.",
      "Jeda sebelum 明天可以.",
      "可以 terdengar sebagai bisa."
    ],
    "followUp": "Coba tambahkan 对不起 di awal."
  }
];

export default function MandarinKouyuTopik8Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
