import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-self-introduction",
  "title": "Yuèdú 2: Self Introduction",
  "description": "Membaca perkenalan diri pendek tentang nama, asal, dan identitas.",
  "topicNumber": 2,
  "focus": "Perkenalan diri.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "self-introduction-1",
    "title": "Self Introduction 1",
    "focus": "Name",
    "passageHanzi": "我叫大卫。我是学生。",
    "passagePinyin": "Wǒ jiào Dàwèi. Wǒ shì xuésheng.",
    "passageMeaning": "Nama saya David. Saya pelajar.",
    "question": "Apa identitas David?",
    "answer": "学生 / pelajar",
    "hint": "Cari kalimat dengan 是.",
    "keywords": [
      "我叫",
      "大卫",
      "学生"
    ],
    "explanation": "Kalimat 我是学生 berarti saya pelajar."
  },
  {
    "id": "self-introduction-2",
    "title": "Self Introduction 2",
    "focus": "Nationality",
    "passageHanzi": "她是印度尼西亚人。她学习中文。",
    "passagePinyin": "Tā shì Yìndùníxīyà rén. Tā xuéxí Zhōngwén.",
    "passageMeaning": "Dia orang Indonesia. Dia belajar Mandarin.",
    "question": "Dari mana dia berasal?",
    "answer": "印度尼西亚 / Indonesia",
    "hint": "Negara + 人 berarti orang dari negara itu.",
    "keywords": [
      "她",
      "印度尼西亚人",
      "中文"
    ],
    "explanation": "印度尼西亚人 berarti orang Indonesia."
  },
  {
    "id": "self-introduction-3",
    "title": "Self Introduction 3",
    "focus": "Language",
    "passageHanzi": "我说英语，也说一点中文。",
    "passagePinyin": "Wǒ shuō Yīngyǔ, yě shuō yìdiǎn Zhōngwén.",
    "passageMeaning": "Saya berbicara bahasa Inggris, juga sedikit Mandarin.",
    "question": "Bahasa apa yang bisa ia ucapkan sedikit?",
    "answer": "中文 / Mandarin",
    "hint": "Cari kata 一点.",
    "keywords": [
      "英语",
      "一点",
      "中文"
    ],
    "explanation": "一点中文 berarti sedikit bahasa Mandarin."
  },
  {
    "id": "self-introduction-4",
    "title": "Self Introduction 4",
    "focus": "Job",
    "passageHanzi": "他不是老师。他是医生。",
    "passagePinyin": "Tā bú shì lǎoshī. Tā shì yīshēng.",
    "passageMeaning": "Dia bukan guru. Dia dokter.",
    "question": "Apa pekerjaannya?",
    "answer": "医生 / dokter",
    "hint": "Kalimat pertama negatif.",
    "keywords": [
      "不是",
      "老师",
      "医生"
    ],
    "explanation": "Bacaan menolak guru lalu menyatakan 他是医生."
  }
];

export default function MandarinYueduTopik2Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
