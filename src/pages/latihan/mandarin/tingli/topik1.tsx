import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-greetings-and-names",
  "title": "Tīnglì 1: Greetings and Names",
  "description": "Melatih mendengar salam, nama, dan respons sopan yang sangat sering muncul.",
  "topicNumber": 1,
  "focus": "Salam, nama, dan respons pendek.",
  "goal": "Dengarkan audio tanpa melihat transcript, tangkap nama atau respons utama, lalu cek pinyin dan arti."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "greetings-and-names-1",
    "title": "Greetings and Names 1",
    "focus": "Greeting",
    "audioHanzi": "你好！我叫安娜。",
    "audioPinyin": "Nǐ hǎo! Wǒ jiào Ānnà.",
    "audioMeaning": "Halo! Nama saya Anna.",
    "question": "Siapa nama pembicara?",
    "answer": "安娜 / Anna",
    "hint": "Dengarkan kata setelah 我叫.",
    "keywords": [
      "你好",
      "我叫",
      "安娜"
    ],
    "explanation": "我叫 memperkenalkan nama, jadi nama yang kamu cari adalah 安娜."
  },
  {
    "id": "greetings-and-names-2",
    "title": "Greetings and Names 2",
    "focus": "Greeting",
    "audioHanzi": "早上好，老师。",
    "audioPinyin": "Zǎoshang hǎo, lǎoshī.",
    "audioMeaning": "Selamat pagi, guru.",
    "question": "Kepada siapa salam itu diucapkan?",
    "answer": "老师 / guru",
    "hint": "Dengarkan kata sapaan setelah salam pagi.",
    "keywords": [
      "早上好",
      "老师"
    ],
    "explanation": "Kata 老师 berarti guru, jadi salam ditujukan kepada guru."
  },
  {
    "id": "greetings-and-names-3",
    "title": "Greetings and Names 3",
    "focus": "Polite Response",
    "audioHanzi": "谢谢你。不客气。",
    "audioPinyin": "Xièxie nǐ. Bú kèqi.",
    "audioMeaning": "Terima kasih. Sama-sama.",
    "question": "Respons apa yang terdengar setelah 谢谢你?",
    "answer": "不客气 / sama-sama",
    "hint": "Dengarkan frasa setelah jeda.",
    "keywords": [
      "谢谢你",
      "不客气"
    ],
    "explanation": "不客气 adalah respons sopan setelah seseorang mengucapkan terima kasih."
  },
  {
    "id": "greetings-and-names-4",
    "title": "Greetings and Names 4",
    "focus": "Farewell",
    "audioHanzi": "再见，明天见。",
    "audioPinyin": "Zàijiàn, míngtiān jiàn.",
    "audioMeaning": "Sampai jumpa, sampai bertemu besok.",
    "question": "Kapan mereka akan bertemu lagi?",
    "answer": "明天 / besok",
    "hint": "Cari kata waktu dalam audio.",
    "keywords": [
      "再见",
      "明天",
      "见"
    ],
    "explanation": "明天 berarti besok, jadi mereka akan bertemu lagi besok."
  }
];

export default function MandarinTingliTopik1Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
