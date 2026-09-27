import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-hobbies-reading",
  "title": "Yuèdú 12: Hobbies Reading",
  "description": "Membaca minat dan aktivitas santai dalam teks pendek.",
  "topicNumber": 12,
  "focus": "Hobi dan minat.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "hobbies-reading-1",
    "title": "Hobbies Reading 1",
    "focus": "Hobby",
    "passageHanzi": "我喜欢音乐，也喜欢运动。",
    "passagePinyin": "Wǒ xǐhuan yīnyuè, yě xǐhuan yùndòng.",
    "passageMeaning": "Saya suka musik, juga suka olahraga.",
    "question": "Dua hobi apa yang disebut?",
    "answer": "音乐 dan 运动 / musik dan olahraga",
    "hint": "Cari kata setelah 喜欢.",
    "keywords": [
      "喜欢",
      "音乐",
      "运动"
    ],
    "explanation": "Dua objek 喜欢 adalah 音乐 dan 运动."
  },
  {
    "id": "hobbies-reading-2",
    "title": "Hobbies Reading 2",
    "focus": "Preference",
    "passageHanzi": "她不喜欢电影。她喜欢书法。",
    "passagePinyin": "Tā bù xǐhuan diànyǐng. Tā xǐhuan shūfǎ.",
    "passageMeaning": "Dia tidak suka film. Dia suka kaligrafi.",
    "question": "Apa yang dia suka?",
    "answer": "书法 / kaligrafi",
    "hint": "Kalimat pertama negatif.",
    "keywords": [
      "不喜欢电影",
      "喜欢书法"
    ],
    "explanation": "Kalimat positifnya adalah 她喜欢书法."
  },
  {
    "id": "hobbies-reading-3",
    "title": "Hobbies Reading 3",
    "focus": "Activity",
    "passageHanzi": "星期天我和朋友打篮球。",
    "passagePinyin": "Xīngqītiān wǒ hé péngyǒu dǎ lánqiú.",
    "passageMeaning": "Hari Minggu saya bermain basket dengan teman.",
    "question": "Dengan siapa ia bermain basket?",
    "answer": "朋友 / teman",
    "hint": "Cari 和.",
    "keywords": [
      "星期天",
      "朋友",
      "打篮球"
    ],
    "explanation": "和朋友 berarti bersama teman."
  },
  {
    "id": "hobbies-reading-4",
    "title": "Hobbies Reading 4",
    "focus": "Reading",
    "passageHanzi": "晚上我喜欢看书，不看电视。",
    "passagePinyin": "Wǎnshang wǒ xǐhuan kàn shū, bú kàn diànshì.",
    "passageMeaning": "Malam hari saya suka membaca buku, tidak menonton TV.",
    "question": "Aktivitas apa yang disukai malam hari?",
    "answer": "看书 / membaca buku",
    "hint": "Cari 喜欢.",
    "keywords": [
      "晚上",
      "喜欢看书",
      "不看电视"
    ],
    "explanation": "喜欢看书 adalah aktivitas yang disukai."
  }
];

export default function MandarinYueduTopik12Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
