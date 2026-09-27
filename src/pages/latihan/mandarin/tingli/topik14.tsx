import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-friend-invitations",
  "title": "Tīnglì 14: Friend Invitations",
  "description": "Melatih ajakan teman, waktu bertemu, dan respons singkat.",
  "topicNumber": 14,
  "focus": "Ajakan dan rencana teman.",
  "goal": "Tangkap ajakan, waktu, dan respons utama dari audio percakapan pendek."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "friend-invitations-1",
    "title": "Friend Invitations 1",
    "focus": "Invitation",
    "audioHanzi": "你今天有空吗？",
    "audioPinyin": "Nǐ jīntiān yǒu kòng ma?",
    "audioMeaning": "Apakah kamu ada waktu hari ini?",
    "question": "Apa yang ditanyakan?",
    "answer": "Apakah ada waktu hari ini",
    "hint": "Dengarkan kata 有空吗.",
    "keywords": [
      "今天",
      "有空",
      "吗"
    ],
    "explanation": "有空吗 menanyakan apakah seseorang punya waktu luang."
  },
  {
    "id": "friend-invitations-2",
    "title": "Friend Invitations 2",
    "focus": "Invitation",
    "audioHanzi": "我们去喝咖啡吧。",
    "audioPinyin": "Wǒmen qù hē kāfēi ba.",
    "audioMeaning": "Ayo kita pergi minum kopi.",
    "question": "Apa ajakannya?",
    "answer": "喝咖啡 / minum kopi",
    "hint": "Dengarkan aktivitas setelah 去.",
    "keywords": [
      "我们",
      "去",
      "喝咖啡"
    ],
    "explanation": "喝咖啡 berarti minum kopi."
  },
  {
    "id": "friend-invitations-3",
    "title": "Friend Invitations 3",
    "focus": "Response",
    "audioHanzi": "好啊，下午见。",
    "audioPinyin": "Hǎo a, xiàwǔ jiàn.",
    "audioMeaning": "Baik, sampai bertemu sore.",
    "question": "Kapan mereka bertemu?",
    "answer": "下午 / sore",
    "hint": "Dengarkan kata waktu sebelum 见.",
    "keywords": [
      "好啊",
      "下午",
      "见"
    ],
    "explanation": "下午见 berarti sampai bertemu sore."
  },
  {
    "id": "friend-invitations-4",
    "title": "Friend Invitations 4",
    "focus": "Invitation",
    "audioHanzi": "对不起，我很忙。",
    "audioPinyin": "Duìbuqǐ, wǒ hěn máng.",
    "audioMeaning": "Maaf, saya sangat sibuk.",
    "question": "Mengapa pembicara menolak?",
    "answer": "很忙 / sangat sibuk",
    "hint": "Dengarkan alasan setelah 我.",
    "keywords": [
      "对不起",
      "很",
      "忙"
    ],
    "explanation": "很忙 berarti sangat sibuk."
  }
];

export default function MandarinTingliTopik14Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
