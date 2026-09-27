import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-classroom-words",
  "title": "Cíhuì 7: Classroom Words",
  "description": "Melatih kata benda dan peran yang sering dipakai di kelas.",
  "topicNumber": 7,
  "focus": "Kelas dan belajar.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "classroom-words-1",
    "title": "Classroom Words 1",
    "category": "Classroom",
    "hanzi": "书",
    "pinyin": "shū",
    "meaning": "buku",
    "prompt": "Ingat arti dan pinyin dari “书”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "buku; shū",
    "exampleSentence": "这是我的书。",
    "examplePinyin": "Zhè shì wǒ de shū.",
    "exampleMeaning": "Ini buku saya.",
    "hint": "Petunjuk: kategori kata ini adalah classroom.",
    "usage": "Benda bacaan atau buku pelajaran."
  },
  {
    "id": "classroom-words-2",
    "title": "Classroom Words 2",
    "category": "Classroom",
    "hanzi": "笔",
    "pinyin": "bǐ",
    "meaning": "pena",
    "prompt": "Ingat arti dan pinyin dari “笔”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "pena; bǐ",
    "exampleSentence": "我有一支笔。",
    "examplePinyin": "Wǒ yǒu yī zhī bǐ.",
    "exampleMeaning": "Saya punya sebuah pena.",
    "hint": "Petunjuk: kategori kata ini adalah classroom.",
    "usage": "Alat tulis, sering memakai kata ukur 支."
  },
  {
    "id": "classroom-words-3",
    "title": "Classroom Words 3",
    "category": "Classroom",
    "hanzi": "老师",
    "pinyin": "lǎoshī",
    "meaning": "guru",
    "prompt": "Ingat arti dan pinyin dari “老师”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "guru; lǎoshī",
    "exampleSentence": "老师很好。",
    "examplePinyin": "Lǎoshī hěn hǎo.",
    "exampleMeaning": "Guru sangat baik.",
    "hint": "Petunjuk: kategori kata ini adalah classroom.",
    "usage": "Sebutan untuk guru atau pengajar."
  },
  {
    "id": "classroom-words-4",
    "title": "Classroom Words 4",
    "category": "Classroom",
    "hanzi": "学生",
    "pinyin": "xuésheng",
    "meaning": "pelajar",
    "prompt": "Ingat arti dan pinyin dari “学生”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "pelajar; xuésheng",
    "exampleSentence": "我是学生。",
    "examplePinyin": "Wǒ shì xuésheng.",
    "exampleMeaning": "Saya pelajar.",
    "hint": "Petunjuk: kategori kata ini adalah classroom.",
    "usage": "Orang yang belajar di sekolah atau kelas."
  }
];

export default function MandarinCihuiTopik7Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
