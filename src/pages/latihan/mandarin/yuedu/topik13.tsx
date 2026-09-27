import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-health-reading",
  "title": "Yuèdú 13: Health Reading",
  "description": "Membaca keluhan tubuh, dokter, dan saran sederhana.",
  "topicNumber": 13,
  "focus": "Kesehatan dalam teks.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "health-reading-1",
    "title": "Health Reading 1",
    "focus": "Symptom",
    "passageHanzi": "我头疼。我要去医院。",
    "passagePinyin": "Wǒ tóu téng. Wǒ yào qù yīyuàn.",
    "passageMeaning": "Kepala saya sakit. Saya ingin pergi ke rumah sakit.",
    "question": "Bagian tubuh apa yang sakit?",
    "answer": "头 / kepala",
    "hint": "Cari 疼.",
    "keywords": [
      "头疼",
      "医院"
    ],
    "explanation": "头疼 berarti sakit kepala."
  },
  {
    "id": "health-reading-2",
    "title": "Health Reading 2",
    "focus": "Doctor",
    "passageHanzi": "医生说：请多喝水。",
    "passagePinyin": "Yīshēng shuō: qǐng duō hē shuǐ.",
    "passageMeaning": "Dokter berkata: mohon banyak minum air.",
    "question": "Apa saran dokter?",
    "answer": "多喝水 / banyak minum air",
    "hint": "Cari 请.",
    "keywords": [
      "医生",
      "请",
      "多喝水"
    ],
    "explanation": "请多喝水 adalah saran yang diberikan dokter."
  },
  {
    "id": "health-reading-3",
    "title": "Health Reading 3",
    "focus": "Body",
    "passageHanzi": "他的手很冷。",
    "passagePinyin": "Tā de shǒu hěn lěng.",
    "passageMeaning": "Tangannya sangat dingin.",
    "question": "Bagian tubuh apa yang dingin?",
    "answer": "手 / tangan",
    "hint": "Cari 的 sebelum bagian tubuh.",
    "keywords": [
      "他的",
      "手",
      "冷"
    ],
    "explanation": "他的手 berarti tangannya."
  },
  {
    "id": "health-reading-4",
    "title": "Health Reading 4",
    "focus": "Rest",
    "passageHanzi": "今天我不去学校。我在家休息。",
    "passagePinyin": "Jīntiān wǒ bú qù xuéxiào. Wǒ zài jiā xiūxi.",
    "passageMeaning": "Hari ini saya tidak pergi ke sekolah. Saya beristirahat di rumah.",
    "question": "Apa yang ia lakukan di rumah?",
    "answer": "休息 / beristirahat",
    "hint": "Cari 在家.",
    "keywords": [
      "不去学校",
      "在家",
      "休息"
    ],
    "explanation": "在家休息 berarti beristirahat di rumah."
  }
];

export default function MandarinYueduTopik13Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
