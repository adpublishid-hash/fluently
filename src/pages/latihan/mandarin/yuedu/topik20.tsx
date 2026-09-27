import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-hsk-1-reading-review",
  "title": "Yuèdú 20: HSK 1 Reading Review",
  "description": "Review Yuèdú HSK 1 dengan teks gabungan tentang diri, keluarga, kelas, dan kegiatan.",
  "topicNumber": 20,
  "focus": "Review bacaan HSK 1.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "hsk-1-reading-review-1",
    "title": "HSK 1 Reading Review 1",
    "focus": "Review",
    "passageHanzi": "我叫安娜。我是学生。我每天学习中文。",
    "passagePinyin": "Wǒ jiào Ānnà. Wǒ shì xuésheng. Wǒ měitiān xuéxí Zhōngwén.",
    "passageMeaning": "Saya bernama Anna. Saya pelajar. Saya belajar Mandarin setiap hari.",
    "question": "Apa yang dipelajari Anna setiap hari?",
    "answer": "中文 / Mandarin",
    "hint": "Cari 每天学习.",
    "keywords": [
      "安娜",
      "学生",
      "每天",
      "中文"
    ],
    "explanation": "每天学习中文 berarti belajar Mandarin setiap hari."
  },
  {
    "id": "hsk-1-reading-review-2",
    "title": "HSK 1 Reading Review 2",
    "focus": "Review",
    "passageHanzi": "我家有三个人。爸爸、妈妈和我都喜欢看书。",
    "passagePinyin": "Wǒ jiā yǒu sān ge rén. Bàba, māma hé wǒ dōu xǐhuan kàn shū.",
    "passageMeaning": "Keluarga saya ada tiga orang. Ayah, ibu, dan saya semuanya suka membaca buku.",
    "question": "Berapa orang dalam keluarga?",
    "answer": "三个人 / tiga orang",
    "hint": "Cari 我家有.",
    "keywords": [
      "我家",
      "三个人",
      "都喜欢看书"
    ],
    "explanation": "我家有三个人 menyatakan jumlah keluarga."
  },
  {
    "id": "hsk-1-reading-review-3",
    "title": "HSK 1 Reading Review 3",
    "focus": "Review",
    "passageHanzi": "今天八点有中文课。请带书和笔。",
    "passagePinyin": "Jīntiān bā diǎn yǒu Zhōngwén kè. Qǐng dài shū hé bǐ.",
    "passageMeaning": "Hari ini jam delapan ada kelas Mandarin. Mohon bawa buku dan pena.",
    "question": "Apa yang harus dibawa?",
    "answer": "书和笔 / buku dan pena",
    "hint": "Cari 请带.",
    "keywords": [
      "八点",
      "中文课",
      "书和笔"
    ],
    "explanation": "请带书和笔 berarti mohon bawa buku dan pena."
  },
  {
    "id": "hsk-1-reading-review-4",
    "title": "HSK 1 Reading Review 4",
    "focus": "Review",
    "passageHanzi": "明天我和朋友去商店。我们想买苹果。",
    "passagePinyin": "Míngtiān wǒ hé péngyǒu qù shāngdiàn. Wǒmen xiǎng mǎi píngguǒ.",
    "passageMeaning": "Besok saya dan teman pergi ke toko. Kami ingin membeli apel.",
    "question": "Apa yang ingin mereka beli?",
    "answer": "苹果 / apel",
    "hint": "Cari 想买.",
    "keywords": [
      "明天",
      "朋友",
      "商店",
      "买苹果"
    ],
    "explanation": "想买苹果 berarti ingin membeli apel."
  }
];

export default function MandarinYueduTopik20Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
