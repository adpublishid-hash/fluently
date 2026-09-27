import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-travel-and-hotel",
  "title": "Tīnglì 17: Travel and Hotel",
  "description": "Melatih audio perjalanan sederhana tentang hotel, kamar, dan tujuan.",
  "topicNumber": 17,
  "focus": "Perjalanan dan hotel.",
  "goal": "Tangkap tempat tujuan, kamar, atau kebutuhan perjalanan dari audio."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "travel-and-hotel-1",
    "title": "Travel and Hotel 1",
    "focus": "Travel",
    "audioHanzi": "我们去北京旅游。",
    "audioPinyin": "Wǒmen qù Běijīng lǚyóu.",
    "audioMeaning": "Kami pergi wisata ke Beijing.",
    "question": "Ke kota mana mereka pergi?",
    "answer": "北京 / Beijing",
    "hint": "Dengarkan kota setelah 去.",
    "keywords": [
      "去",
      "北京",
      "旅游"
    ],
    "explanation": "北京 adalah tujuan perjalanan."
  },
  {
    "id": "travel-and-hotel-2",
    "title": "Travel and Hotel 2",
    "focus": "Hotel",
    "audioHanzi": "我要一个房间。",
    "audioPinyin": "Wǒ yào yí gè fángjiān.",
    "audioMeaning": "Saya mau satu kamar.",
    "question": "Apa yang diminta?",
    "answer": "一个房间 / satu kamar",
    "hint": "Dengarkan objek setelah 我要.",
    "keywords": [
      "我要",
      "一个",
      "房间"
    ],
    "explanation": "一个房间 berarti satu kamar."
  },
  {
    "id": "travel-and-hotel-3",
    "title": "Travel and Hotel 3",
    "focus": "Travel",
    "audioHanzi": "出租车在门口。",
    "audioPinyin": "Chūzūchē zài ménkǒu.",
    "audioMeaning": "Taksi ada di pintu masuk.",
    "question": "Taksi ada di mana?",
    "answer": "门口 / pintu masuk",
    "hint": "Dengarkan lokasi setelah 在.",
    "keywords": [
      "出租车",
      "在",
      "门口"
    ],
    "explanation": "门口 berarti area pintu masuk."
  },
  {
    "id": "travel-and-hotel-4",
    "title": "Travel and Hotel 4",
    "focus": "Hotel",
    "audioHanzi": "早餐在一楼。",
    "audioPinyin": "Zǎocān zài yī lóu.",
    "audioMeaning": "Sarapan ada di lantai satu.",
    "question": "Sarapan ada di lantai berapa?",
    "answer": "一楼 / lantai satu",
    "hint": "Dengarkan lokasi setelah 在.",
    "keywords": [
      "早餐",
      "一楼"
    ],
    "explanation": "一楼 berarti lantai satu."
  }
];

export default function MandarinTingliTopik17Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
