import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-greetings-and-polite-words",
  "title": "Cíhuì 1: Greetings and Polite Words",
  "description": "Melatih salam, ucapan terima kasih, pamit, dan permintaan maaf dasar.",
  "topicNumber": 1,
  "focus": "Salam dan kesopanan harian.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "greetings-and-polite-words-1",
    "title": "Greetings and Polite Words 1",
    "category": "Greeting",
    "hanzi": "你好",
    "pinyin": "nǐ hǎo",
    "meaning": "halo",
    "prompt": "Ingat arti dan pinyin dari “你好”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "halo; nǐ hǎo",
    "exampleSentence": "你好，我是学生。",
    "examplePinyin": "Nǐ hǎo, wǒ shì xuésheng.",
    "exampleMeaning": "Halo, saya pelajar.",
    "hint": "Petunjuk: kategori kata ini adalah greeting.",
    "usage": "Dipakai saat menyapa orang secara umum dan netral."
  },
  {
    "id": "greetings-and-polite-words-2",
    "title": "Greetings and Polite Words 2",
    "category": "Polite word",
    "hanzi": "谢谢",
    "pinyin": "xièxie",
    "meaning": "terima kasih",
    "prompt": "Ingat arti dan pinyin dari “谢谢”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "terima kasih; xièxie",
    "exampleSentence": "谢谢你。",
    "examplePinyin": "Xièxie nǐ.",
    "exampleMeaning": "Terima kasih kepadamu.",
    "hint": "Petunjuk: kategori kata ini adalah polite word.",
    "usage": "Dipakai setelah menerima bantuan, hadiah, atau informasi."
  },
  {
    "id": "greetings-and-polite-words-3",
    "title": "Greetings and Polite Words 3",
    "category": "Farewell",
    "hanzi": "再见",
    "pinyin": "zàijiàn",
    "meaning": "sampai jumpa",
    "prompt": "Ingat arti dan pinyin dari “再见”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "sampai jumpa; zàijiàn",
    "exampleSentence": "老师，再见。",
    "examplePinyin": "Lǎoshī, zàijiàn.",
    "exampleMeaning": "Guru, sampai jumpa.",
    "hint": "Petunjuk: kategori kata ini adalah farewell.",
    "usage": "Dipakai saat berpamitan dalam percakapan biasa."
  },
  {
    "id": "greetings-and-polite-words-4",
    "title": "Greetings and Polite Words 4",
    "category": "Apology",
    "hanzi": "对不起",
    "pinyin": "duìbuqǐ",
    "meaning": "maaf",
    "prompt": "Ingat arti dan pinyin dari “对不起”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "maaf; duìbuqǐ",
    "exampleSentence": "对不起，我来晚了。",
    "examplePinyin": "Duìbuqǐ, wǒ lái wǎn le.",
    "exampleMeaning": "Maaf, saya datang terlambat.",
    "hint": "Petunjuk: kategori kata ini adalah apology.",
    "usage": "Dipakai ketika meminta maaf atas kesalahan atau gangguan."
  }
];

export default function MandarinCihuiTopik1Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
