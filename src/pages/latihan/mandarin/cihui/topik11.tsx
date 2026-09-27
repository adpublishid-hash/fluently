import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-daily-actions",
  "title": "Cíhuì 11: Daily Actions",
  "description": "Melatih kata kerja harian yang sering menjadi inti kalimat pendek.",
  "topicNumber": 11,
  "focus": "Kata kerja harian.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "daily-actions-1",
    "title": "Daily Actions 1",
    "category": "Verb",
    "hanzi": "吃",
    "pinyin": "chī",
    "meaning": "makan",
    "prompt": "Ingat arti dan pinyin dari “吃”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "makan; chī",
    "exampleSentence": "我吃饭。",
    "examplePinyin": "Wǒ chī fàn.",
    "exampleMeaning": "Saya makan.",
    "hint": "Petunjuk: kategori kata ini adalah verb.",
    "usage": "Kata kerja untuk makan."
  },
  {
    "id": "daily-actions-2",
    "title": "Daily Actions 2",
    "category": "Verb",
    "hanzi": "喝",
    "pinyin": "hē",
    "meaning": "minum",
    "prompt": "Ingat arti dan pinyin dari “喝”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "minum; hē",
    "exampleSentence": "你喝茶吗？",
    "examplePinyin": "Nǐ hē chá ma?",
    "exampleMeaning": "Apakah kamu minum teh?",
    "hint": "Petunjuk: kategori kata ini adalah verb.",
    "usage": "Kata kerja untuk minum."
  },
  {
    "id": "daily-actions-3",
    "title": "Daily Actions 3",
    "category": "Verb",
    "hanzi": "去",
    "pinyin": "qù",
    "meaning": "pergi",
    "prompt": "Ingat arti dan pinyin dari “去”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "pergi; qù",
    "exampleSentence": "我去学校。",
    "examplePinyin": "Wǒ qù xuéxiào.",
    "exampleMeaning": "Saya pergi ke sekolah.",
    "hint": "Petunjuk: kategori kata ini adalah verb.",
    "usage": "Dipakai sebelum tempat tujuan."
  },
  {
    "id": "daily-actions-4",
    "title": "Daily Actions 4",
    "category": "Verb",
    "hanzi": "看",
    "pinyin": "kàn",
    "meaning": "melihat atau menonton",
    "prompt": "Ingat arti dan pinyin dari “看”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "melihat atau menonton; kàn",
    "exampleSentence": "我看电影。",
    "examplePinyin": "Wǒ kàn diànyǐng.",
    "exampleMeaning": "Saya menonton film.",
    "hint": "Petunjuk: kategori kata ini adalah verb.",
    "usage": "Bisa berarti melihat, membaca sekilas, atau menonton."
  }
];

export default function MandarinCihuiTopik11Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
