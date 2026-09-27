import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-simple-email",
  "title": "Yuèdú 15: Simple Email",
  "description": "Membaca email pendek dengan sapaan, isi, dan penutup.",
  "topicNumber": 15,
  "focus": "Email pendek.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "simple-email-1",
    "title": "Simple Email 1",
    "focus": "Email",
    "passageHanzi": "小李，你好！明天我去北京。再见！",
    "passagePinyin": "Xiǎo Lǐ, nǐ hǎo! Míngtiān wǒ qù Běijīng. Zàijiàn!",
    "passageMeaning": "Xiao Li, halo! Besok saya pergi ke Beijing. Sampai jumpa!",
    "question": "Ke mana penulis pergi besok?",
    "answer": "北京 / Beijing",
    "hint": "Cari 去.",
    "keywords": [
      "小李",
      "明天",
      "北京"
    ],
    "explanation": "明天我去北京 berarti besok saya pergi ke Beijing."
  },
  {
    "id": "simple-email-2",
    "title": "Simple Email 2",
    "focus": "Email",
    "passageHanzi": "老师，我今天不舒服。对不起。",
    "passagePinyin": "Lǎoshī, wǒ jīntiān bù shūfu. Duìbuqǐ.",
    "passageMeaning": "Guru, hari ini saya tidak enak badan. Maaf.",
    "question": "Kepada siapa pesan ditujukan?",
    "answer": "老师 / guru",
    "hint": "Sapaan muncul di awal.",
    "keywords": [
      "老师",
      "今天",
      "不舒服"
    ],
    "explanation": "Teks diawali dengan 老师, jadi penerimanya guru."
  },
  {
    "id": "simple-email-3",
    "title": "Simple Email 3",
    "focus": "Email",
    "passageHanzi": "妈妈，我在学校。下午回家。",
    "passagePinyin": "Māma, wǒ zài xuéxiào. Xiàwǔ huí jiā.",
    "passageMeaning": "Ibu, saya di sekolah. Sore hari pulang ke rumah.",
    "question": "Kapan ia pulang?",
    "answer": "下午 / sore hari",
    "hint": "Cari 回家.",
    "keywords": [
      "妈妈",
      "学校",
      "下午回家"
    ],
    "explanation": "下午回家 berarti pulang pada sore hari."
  },
  {
    "id": "simple-email-4",
    "title": "Simple Email 4",
    "focus": "Email",
    "passageHanzi": "朋友们，星期六来我家吃饭。",
    "passagePinyin": "Péngyǒumen, xīngqīliù lái wǒ jiā chī fàn.",
    "passageMeaning": "Teman-teman, hari Sabtu datanglah ke rumah saya untuk makan.",
    "question": "Kapan teman-teman diminta datang?",
    "answer": "星期六 / Sabtu",
    "hint": "Cari kata hari.",
    "keywords": [
      "朋友们",
      "星期六",
      "我家",
      "吃饭"
    ],
    "explanation": "星期六 adalah waktu undangan."
  }
];

export default function MandarinYueduTopik15Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
