import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-invitations-and-responses",
  "title": "Kǒuyǔ 17: Invitations and Responses",
  "description": "Melatih mengajak, menerima, menolak sopan, dan mengatur ulang rencana.",
  "topicNumber": 17,
  "focus": "Ajakan dan respons.",
  "goal": "Gunakan 吧, 好啊, 对不起, dan 很忙 untuk respons ajakan."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "invitations-and-responses-1",
    "title": "Invitations and Responses 1",
    "scenario": "Invitation",
    "prompt": "Tanyakan apakah teman punya waktu hari ini.",
    "role": "You ask availability.",
    "modelHanzi": "你今天有空吗？",
    "modelPinyin": "Nǐ jīntiān yǒu kòng ma?",
    "modelMeaning": "Apakah kamu punya waktu hari ini?",
    "starter": "你今天...吗？",
    "hint": "有空 berarti punya waktu luang.",
    "checklist": [
      "今天 jelas.",
      "有空吗 naik di akhir.",
      "Pertanyaan terdengar ramah."
    ],
    "followUp": "Coba ganti 今天 dengan 明天."
  },
  {
    "id": "invitations-and-responses-2",
    "title": "Invitations and Responses 2",
    "scenario": "Invitation",
    "prompt": "Ajak teman minum kopi.",
    "role": "You invite coffee.",
    "modelHanzi": "我们去喝咖啡吧。",
    "modelPinyin": "Wǒmen qù hē kāfēi ba.",
    "modelMeaning": "Ayo kita pergi minum kopi.",
    "starter": "我们去...吧。",
    "hint": "吧 membuat ajakan natural.",
    "checklist": [
      "喝咖啡 jelas.",
      "吧 ringan di akhir.",
      "Intonasi mengajak."
    ],
    "followUp": "Coba ganti 咖啡 dengan 茶."
  },
  {
    "id": "invitations-and-responses-3",
    "title": "Invitations and Responses 3",
    "scenario": "Accept",
    "prompt": "Terima ajakan dan katakan sampai bertemu sore.",
    "role": "You accept invitation.",
    "modelHanzi": "好啊，下午见。",
    "modelPinyin": "Hǎo a, xiàwǔ jiàn.",
    "modelMeaning": "Baik, sampai bertemu sore.",
    "starter": "好啊，...见。",
    "hint": "下午见 berarti sampai bertemu sore.",
    "checklist": [
      "好啊 terdengar positif.",
      "下午 jelas.",
      "见 sebagai penutup."
    ],
    "followUp": "Coba versi 明天见."
  },
  {
    "id": "invitations-and-responses-4",
    "title": "Invitations and Responses 4",
    "scenario": "Decline",
    "prompt": "Tolak sopan karena kamu sibuk.",
    "role": "You decline politely.",
    "modelHanzi": "对不起，我很忙。",
    "modelPinyin": "Duìbuqǐ, wǒ hěn máng.",
    "modelMeaning": "Maaf, saya sangat sibuk.",
    "starter": "对不起，我...",
    "hint": "对不起 membuat penolakan sopan.",
    "checklist": [
      "对不起 jelas.",
      "很忙 sebagai alasan.",
      "Nada tetap sopan."
    ],
    "followUp": "Tambahkan 下次吧 untuk lain kali."
  }
];

export default function MandarinKouyuTopik17Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
