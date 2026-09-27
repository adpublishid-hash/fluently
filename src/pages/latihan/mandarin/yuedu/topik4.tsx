import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-classroom-reading",
  "title": "Yuèdú 4: Classroom Reading",
  "description": "Membaca catatan dan instruksi kelas yang sering muncul di level awal.",
  "topicNumber": 4,
  "focus": "Bacaan kelas.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "classroom-reading-1",
    "title": "Classroom Reading 1",
    "focus": "Instruction",
    "passageHanzi": "请打开书。请写名字。",
    "passagePinyin": "Qǐng dǎkāi shū. Qǐng xiě míngzi.",
    "passageMeaning": "Silakan buka buku. Silakan tulis nama.",
    "question": "Apa yang harus ditulis?",
    "answer": "名字 / nama",
    "hint": "Cari kata setelah 写.",
    "keywords": [
      "请",
      "书",
      "写名字"
    ],
    "explanation": "请写名字 berarti silakan tulis nama."
  },
  {
    "id": "classroom-reading-2",
    "title": "Classroom Reading 2",
    "focus": "Object",
    "passageHanzi": "桌子上有一本书和两支笔。",
    "passagePinyin": "Zhuōzi shàng yǒu yī běn shū hé liǎng zhī bǐ.",
    "passageMeaning": "Di atas meja ada satu buku dan dua pena.",
    "question": "Ada berapa pena?",
    "answer": "两支笔 / dua pena",
    "hint": "Cari kata ukur 支.",
    "keywords": [
      "桌子上",
      "一本书",
      "两支笔"
    ],
    "explanation": "两支笔 berarti dua pena."
  },
  {
    "id": "classroom-reading-3",
    "title": "Classroom Reading 3",
    "focus": "Role",
    "passageHanzi": "老师在教室。学生在学校。",
    "passagePinyin": "Lǎoshī zài jiàoshì. Xuésheng zài xuéxiào.",
    "passageMeaning": "Guru ada di kelas. Pelajar ada di sekolah.",
    "question": "Di mana guru berada?",
    "answer": "教室 / ruang kelas",
    "hint": "Cari kalimat yang dimulai dengan 老师.",
    "keywords": [
      "老师",
      "教室",
      "学生",
      "学校"
    ],
    "explanation": "老师在教室 menyatakan guru berada di ruang kelas."
  },
  {
    "id": "classroom-reading-4",
    "title": "Classroom Reading 4",
    "focus": "Class Notice",
    "passageHanzi": "今天有中文课。请不要迟到。",
    "passagePinyin": "Jīntiān yǒu Zhōngwén kè. Qǐng bú yào chídào.",
    "passageMeaning": "Hari ini ada kelas Mandarin. Mohon jangan terlambat.",
    "question": "Kelas apa yang ada hari ini?",
    "answer": "中文课 / kelas Mandarin",
    "hint": "Cari kata 课.",
    "keywords": [
      "今天",
      "中文课",
      "不要迟到"
    ],
    "explanation": "中文课 berarti kelas Mandarin."
  }
];

export default function MandarinYueduTopik4Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
