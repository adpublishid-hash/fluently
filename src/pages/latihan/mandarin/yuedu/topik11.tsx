import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-friend-messages",
  "title": "Yuèdú 11: Friend Messages",
  "description": "Membaca pesan singkat dari teman tentang rencana dan lokasi.",
  "topicNumber": 11,
  "focus": "Pesan teman.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "friend-messages-1",
    "title": "Friend Messages 1",
    "focus": "Message",
    "passageHanzi": "小王：我在图书馆。你来吗？",
    "passagePinyin": "Xiǎo Wáng: Wǒ zài túshūguǎn. Nǐ lái ma?",
    "passageMeaning": "Xiao Wang: Saya di perpustakaan. Kamu datang?",
    "question": "Di mana Xiao Wang?",
    "answer": "图书馆 / perpustakaan",
    "hint": "Cari 在.",
    "keywords": [
      "小王",
      "图书馆",
      "来吗"
    ],
    "explanation": "我在图书馆 menyatakan lokasinya."
  },
  {
    "id": "friend-messages-2",
    "title": "Friend Messages 2",
    "focus": "Plan",
    "passageHanzi": "明天我们看电影，好吗？",
    "passagePinyin": "Míngtiān wǒmen kàn diànyǐng, hǎo ma?",
    "passageMeaning": "Besok kita menonton film, oke?",
    "question": "Apa rencananya besok?",
    "answer": "看电影 / menonton film",
    "hint": "Cari 明天.",
    "keywords": [
      "明天",
      "我们",
      "看电影"
    ],
    "explanation": "看电影 adalah aktivitas yang direncanakan."
  },
  {
    "id": "friend-messages-3",
    "title": "Friend Messages 3",
    "focus": "Invitation",
    "passageHanzi": "请你来我家吃饭。",
    "passagePinyin": "Qǐng nǐ lái wǒ jiā chī fàn.",
    "passageMeaning": "Silakan datang ke rumah saya untuk makan.",
    "question": "Di mana ia diundang makan?",
    "answer": "我家 / rumah saya",
    "hint": "Cari 来 setelah 请你.",
    "keywords": [
      "请你",
      "我家",
      "吃饭"
    ],
    "explanation": "来我家吃饭 berarti datang ke rumah saya untuk makan."
  },
  {
    "id": "friend-messages-4",
    "title": "Friend Messages 4",
    "focus": "Reply",
    "passageHanzi": "对不起，我今天很忙。",
    "passagePinyin": "Duìbuqǐ, wǒ jīntiān hěn máng.",
    "passageMeaning": "Maaf, hari ini saya sangat sibuk.",
    "question": "Mengapa ia mungkin menolak?",
    "answer": "很忙 / sangat sibuk",
    "hint": "Cari alasan setelah 今天.",
    "keywords": [
      "对不起",
      "今天",
      "很忙"
    ],
    "explanation": "很忙 menjelaskan alasan tidak bisa."
  }
];

export default function MandarinYueduTopik11Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
