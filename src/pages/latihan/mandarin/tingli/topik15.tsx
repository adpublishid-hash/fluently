import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-health-and-body",
  "title": "Tīnglì 15: Health and Body",
  "description": "Melatih keluhan tubuh dan saran kesehatan sederhana dari audio.",
  "topicNumber": 15,
  "focus": "Tubuh dan kesehatan.",
  "goal": "Dengarkan bagian tubuh atau kondisi kesehatan, lalu tulis jawabannya."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "health-and-body-1",
    "title": "Health and Body 1",
    "focus": "Health",
    "audioHanzi": "我头疼。",
    "audioPinyin": "Wǒ tóu téng.",
    "audioMeaning": "Kepala saya sakit.",
    "question": "Bagian tubuh mana yang sakit?",
    "answer": "头 / kepala",
    "hint": "Dengarkan kata sebelum 疼.",
    "keywords": [
      "头",
      "疼"
    ],
    "explanation": "头疼 berarti sakit kepala."
  },
  {
    "id": "health-and-body-2",
    "title": "Health and Body 2",
    "focus": "Health",
    "audioHanzi": "她不舒服。",
    "audioPinyin": "Tā bù shūfu.",
    "audioMeaning": "Dia tidak enak badan.",
    "question": "Bagaimana kondisi dia?",
    "answer": "不舒服 / tidak enak badan",
    "hint": "Dengarkan frasa negasi.",
    "keywords": [
      "不",
      "舒服"
    ],
    "explanation": "不舒服 berarti tidak nyaman atau tidak enak badan."
  },
  {
    "id": "health-and-body-3",
    "title": "Health and Body 3",
    "focus": "Health",
    "audioHanzi": "请多喝水。",
    "audioPinyin": "Qǐng duō hē shuǐ.",
    "audioMeaning": "Tolong minum lebih banyak air.",
    "question": "Apa sarannya?",
    "answer": "多喝水 / minum lebih banyak air",
    "hint": "Dengarkan frasa setelah 请.",
    "keywords": [
      "多",
      "喝",
      "水"
    ],
    "explanation": "多喝水 berarti minum air lebih banyak."
  },
  {
    "id": "health-and-body-4",
    "title": "Health and Body 4",
    "focus": "Health",
    "audioHanzi": "医生说要休息。",
    "audioPinyin": "Yīshēng shuō yào xiūxi.",
    "audioMeaning": "Dokter bilang harus istirahat.",
    "question": "Apa yang harus dilakukan?",
    "answer": "休息 / istirahat",
    "hint": "Dengarkan kata setelah 要.",
    "keywords": [
      "医生",
      "要",
      "休息"
    ],
    "explanation": "要休息 berarti harus istirahat."
  }
];

export default function MandarinTingliTopik15Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
