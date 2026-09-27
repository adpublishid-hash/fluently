import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-hobbies-and-interests",
  "title": "Cíhuì 18: Hobbies and Interests",
  "description": "Melatih kosakata minat untuk membicarakan aktivitas santai.",
  "topicNumber": 18,
  "focus": "Hobi dan minat.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "hobbies-and-interests-1",
    "title": "Hobbies and Interests 1",
    "category": "Hobby",
    "hanzi": "音乐",
    "pinyin": "yīnyuè",
    "meaning": "musik",
    "prompt": "Ingat arti dan pinyin dari “音乐”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "musik; yīnyuè",
    "exampleSentence": "我喜欢音乐。",
    "examplePinyin": "Wǒ xǐhuan yīnyuè.",
    "exampleMeaning": "Saya suka musik.",
    "hint": "Petunjuk: kategori kata ini adalah hobby.",
    "usage": "Topik musik secara umum."
  },
  {
    "id": "hobbies-and-interests-2",
    "title": "Hobbies and Interests 2",
    "category": "Hobby",
    "hanzi": "电影",
    "pinyin": "diànyǐng",
    "meaning": "film",
    "prompt": "Ingat arti dan pinyin dari “电影”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "film; diànyǐng",
    "exampleSentence": "我们看电影。",
    "examplePinyin": "Wǒmen kàn diànyǐng.",
    "exampleMeaning": "Kami menonton film.",
    "hint": "Petunjuk: kategori kata ini adalah hobby.",
    "usage": "Film atau bioskop dalam percakapan umum."
  },
  {
    "id": "hobbies-and-interests-3",
    "title": "Hobbies and Interests 3",
    "category": "Hobby",
    "hanzi": "运动",
    "pinyin": "yùndòng",
    "meaning": "olahraga",
    "prompt": "Ingat arti dan pinyin dari “运动”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "olahraga; yùndòng",
    "exampleSentence": "他喜欢运动。",
    "examplePinyin": "Tā xǐhuan yùndòng.",
    "exampleMeaning": "Dia suka olahraga.",
    "hint": "Petunjuk: kategori kata ini adalah hobby.",
    "usage": "Aktivitas fisik atau olahraga."
  },
  {
    "id": "hobbies-and-interests-4",
    "title": "Hobbies and Interests 4",
    "category": "Hobby",
    "hanzi": "书法",
    "pinyin": "shūfǎ",
    "meaning": "kaligrafi",
    "prompt": "Ingat arti dan pinyin dari “书法”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kaligrafi; shūfǎ",
    "exampleSentence": "我学习书法。",
    "examplePinyin": "Wǒ xuéxí shūfǎ.",
    "exampleMeaning": "Saya belajar kaligrafi.",
    "hint": "Petunjuk: kategori kata ini adalah hobby.",
    "usage": "Seni menulis Hanzi dengan indah."
  }
];

export default function MandarinCihuiTopik18Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
