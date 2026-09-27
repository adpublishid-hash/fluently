import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-home-routines",
  "title": "Tīnglì 16: Home Routines",
  "description": "Melatih aktivitas rumah seperti makan, tidur, membersihkan, dan belajar.",
  "topicNumber": 16,
  "focus": "Kegiatan di rumah.",
  "goal": "Dengarkan aktivitas rumah dan waktunya, lalu cek detail lewat transcript."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "home-routines-1",
    "title": "Home Routines 1",
    "focus": "Routine",
    "audioHanzi": "我晚上在家吃饭。",
    "audioPinyin": "Wǒ wǎnshang zài jiā chī fàn.",
    "audioMeaning": "Saya makan malam di rumah.",
    "question": "Di mana pembicara makan?",
    "answer": "在家 / di rumah",
    "hint": "Dengarkan lokasi sebelum 吃饭.",
    "keywords": [
      "晚上",
      "在家",
      "吃饭"
    ],
    "explanation": "在家 berarti di rumah."
  },
  {
    "id": "home-routines-2",
    "title": "Home Routines 2",
    "focus": "Routine",
    "audioHanzi": "妈妈在厨房做饭。",
    "audioPinyin": "Māma zài chúfáng zuò fàn.",
    "audioMeaning": "Ibu memasak di dapur.",
    "question": "Ibu ada di mana?",
    "answer": "厨房 / dapur",
    "hint": "Dengarkan lokasi setelah 在.",
    "keywords": [
      "妈妈",
      "厨房",
      "做饭"
    ],
    "explanation": "厨房 berarti dapur."
  },
  {
    "id": "home-routines-3",
    "title": "Home Routines 3",
    "focus": "Routine",
    "audioHanzi": "我九点睡觉。",
    "audioPinyin": "Wǒ jiǔ diǎn shuìjiào.",
    "audioMeaning": "Saya tidur jam sembilan.",
    "question": "Jam berapa pembicara tidur?",
    "answer": "九点 / jam sembilan",
    "hint": "Dengarkan waktu sebelum 睡觉.",
    "keywords": [
      "九点",
      "睡觉"
    ],
    "explanation": "睡觉 berarti tidur, waktunya 九点."
  },
  {
    "id": "home-routines-4",
    "title": "Home Routines 4",
    "focus": "Routine",
    "audioHanzi": "弟弟在房间看电视。",
    "audioPinyin": "Dìdi zài fángjiān kàn diànshì.",
    "audioMeaning": "Adik laki-laki menonton TV di kamar.",
    "question": "Apa yang dilakukan adik?",
    "answer": "看电视 / menonton TV",
    "hint": "Dengarkan aktivitas setelah tempat.",
    "keywords": [
      "弟弟",
      "房间",
      "看电视"
    ],
    "explanation": "看电视 berarti menonton TV."
  }
];

export default function MandarinTingliTopik16Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
