import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-family-reading",
  "title": "Yuèdú 3: Family Reading",
  "description": "Membaca teks pendek tentang anggota keluarga dan relasi sederhana.",
  "topicNumber": 3,
  "focus": "Keluarga dalam teks.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "family-reading-1",
    "title": "Family Reading 1",
    "focus": "Family",
    "passageHanzi": "我家有四个人：爸爸、妈妈、哥哥和我。",
    "passagePinyin": "Wǒ jiā yǒu sì ge rén: bàba, māma, gēge hé wǒ.",
    "passageMeaning": "Keluarga saya ada empat orang: ayah, ibu, kakak laki-laki, dan saya.",
    "question": "Ada berapa orang dalam keluarga?",
    "answer": "四个人 / empat orang",
    "hint": "Cari angka sebelum 个人.",
    "keywords": [
      "我家",
      "四个人",
      "哥哥"
    ],
    "explanation": "四个人 menyatakan jumlah empat orang."
  },
  {
    "id": "family-reading-2",
    "title": "Family Reading 2",
    "focus": "Family",
    "passageHanzi": "妈妈喜欢茶。爸爸喜欢咖啡。",
    "passagePinyin": "Māma xǐhuan chá. Bàba xǐhuan kāfēi.",
    "passageMeaning": "Ibu suka teh. Ayah suka kopi.",
    "question": "Siapa yang suka kopi?",
    "answer": "爸爸 / ayah",
    "hint": "Cari 咖啡.",
    "keywords": [
      "妈妈",
      "茶",
      "爸爸",
      "咖啡"
    ],
    "explanation": "Kalimat kedua menyatakan 爸爸喜欢咖啡."
  },
  {
    "id": "family-reading-3",
    "title": "Family Reading 3",
    "focus": "Possession",
    "passageHanzi": "这是我妹妹的书。书很小。",
    "passagePinyin": "Zhè shì wǒ mèimei de shū. Shū hěn xiǎo.",
    "passageMeaning": "Ini buku adik perempuan saya. Bukunya kecil.",
    "question": "Buku itu milik siapa?",
    "answer": "妹妹 / adik perempuan",
    "hint": "Cari 的 sebelum 书.",
    "keywords": [
      "妹妹的书",
      "书",
      "小"
    ],
    "explanation": "妹妹的书 berarti buku milik adik perempuan."
  },
  {
    "id": "family-reading-4",
    "title": "Family Reading 4",
    "focus": "Description",
    "passageHanzi": "我哥哥很高，也很忙。",
    "passagePinyin": "Wǒ gēge hěn gāo, yě hěn máng.",
    "passageMeaning": "Kakak laki-laki saya tinggi dan juga sibuk.",
    "question": "Dua sifat apa yang disebut?",
    "answer": "高 dan 忙 / tinggi dan sibuk",
    "hint": "Cari kata setelah 很.",
    "keywords": [
      "哥哥",
      "高",
      "忙"
    ],
    "explanation": "很高 dan 很忙 memberi dua deskripsi untuk kakak."
  }
];

export default function MandarinYueduTopik3Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
