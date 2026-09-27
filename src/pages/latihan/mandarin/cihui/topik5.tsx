import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-days-and-time",
  "title": "Cíhuì 5: Days and Time",
  "description": "Melatih kata waktu dasar untuk membicarakan hari dan saat ini.",
  "topicNumber": 5,
  "focus": "Waktu harian.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "days-and-time-1",
    "title": "Days and Time 1",
    "category": "Time",
    "hanzi": "今天",
    "pinyin": "jīntiān",
    "meaning": "hari ini",
    "prompt": "Ingat arti dan pinyin dari “今天”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "hari ini; jīntiān",
    "exampleSentence": "今天我学习中文。",
    "examplePinyin": "Jīntiān wǒ xuéxí Zhōngwén.",
    "exampleMeaning": "Hari ini saya belajar bahasa Mandarin.",
    "hint": "Petunjuk: kategori kata ini adalah time.",
    "usage": "Diletakkan di awal kalimat atau setelah subjek."
  },
  {
    "id": "days-and-time-2",
    "title": "Days and Time 2",
    "category": "Time",
    "hanzi": "明天",
    "pinyin": "míngtiān",
    "meaning": "besok",
    "prompt": "Ingat arti dan pinyin dari “明天”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "besok; míngtiān",
    "exampleSentence": "明天你去学校吗？",
    "examplePinyin": "Míngtiān nǐ qù xuéxiào ma?",
    "exampleMeaning": "Besok kamu pergi ke sekolah?",
    "hint": "Petunjuk: kategori kata ini adalah time.",
    "usage": "Kata waktu untuk hari setelah hari ini."
  },
  {
    "id": "days-and-time-3",
    "title": "Days and Time 3",
    "category": "Time",
    "hanzi": "昨天",
    "pinyin": "zuótiān",
    "meaning": "kemarin",
    "prompt": "Ingat arti dan pinyin dari “昨天”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kemarin; zuótiān",
    "exampleSentence": "昨天我看电影。",
    "examplePinyin": "Zuótiān wǒ kàn diànyǐng.",
    "exampleMeaning": "Kemarin saya menonton film.",
    "hint": "Petunjuk: kategori kata ini adalah time.",
    "usage": "Kata waktu untuk satu hari sebelum hari ini."
  },
  {
    "id": "days-and-time-4",
    "title": "Days and Time 4",
    "category": "Time",
    "hanzi": "现在",
    "pinyin": "xiànzài",
    "meaning": "sekarang",
    "prompt": "Ingat arti dan pinyin dari “现在”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "sekarang; xiànzài",
    "exampleSentence": "现在我在家。",
    "examplePinyin": "Xiànzài wǒ zài jiā.",
    "exampleMeaning": "Sekarang saya di rumah.",
    "hint": "Petunjuk: kategori kata ini adalah time.",
    "usage": "Menandai waktu saat ini."
  }
];

export default function MandarinCihuiTopik5Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
