import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-nationality-with-shi-ren",
  "title": "Yǔfǎ 5: Nationality with 是...人",
  "description": "Melatih pola menyebut kewarganegaraan dengan 是 + negara + 人.",
  "topicNumber": 5,
  "focus": "Subjek + 是 + negara + 人.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "nationality-with-shi-ren-1",
    "title": "Nationality with 是...人 1",
    "pattern": "我 + 是 + 印尼人",
    "hanzi": "我是印尼人。",
    "pinyin": "wǒ shì Yìnní rén.",
    "meaning": "Saya orang Indonesia.",
    "prompt": "Buat kalimat “saya orang Indonesia”.",
    "answer": "我是印尼人。",
    "modelSentence": "我是印尼人。",
    "modelPinyin": "wǒ shì Yìnní rén.",
    "modelMeaning": "Saya orang Indonesia.",
    "hint": "Negara + 人 berarti orang dari negara itu.",
    "explanation": "是 dipakai untuk identitas kebangsaan."
  },
  {
    "id": "nationality-with-shi-ren-2",
    "title": "Nationality with 是...人 2",
    "pattern": "你 + 是 + 中国人 + 吗",
    "hanzi": "你是中国人吗？",
    "pinyin": "nǐ shì Zhōngguó rén ma?",
    "meaning": "Apakah kamu orang China?",
    "prompt": "Buat pertanyaan kebangsaan dengan 吗.",
    "answer": "你是中国人吗？",
    "modelSentence": "你是中国人吗？",
    "modelPinyin": "nǐ shì Zhōngguó rén ma?",
    "modelMeaning": "Apakah kamu orang China?",
    "hint": "Tambahkan 吗 di akhir kalimat.",
    "explanation": "Urutan negara + 人 tetap menyatu."
  },
  {
    "id": "nationality-with-shi-ren-3",
    "title": "Nationality with 是...人 3",
    "pattern": "他 + 不 + 是 + 美国人",
    "hanzi": "他不是美国人。",
    "pinyin": "tā bú shì Měiguó rén.",
    "meaning": "Dia bukan orang Amerika.",
    "prompt": "Buat kalimat negatif kebangsaan.",
    "answer": "他不是美国人。",
    "modelSentence": "他不是美国人。",
    "modelPinyin": "tā bú shì Měiguó rén.",
    "modelMeaning": "Dia bukan orang Amerika.",
    "hint": "Negasi 是 menjadi 不是.",
    "explanation": "不 berada sebelum 是."
  },
  {
    "id": "nationality-with-shi-ren-4",
    "title": "Nationality with 是...人 4",
    "pattern": "她 + 是 + 日本人",
    "hanzi": "她是日本人。",
    "pinyin": "tā shì Rìběn rén.",
    "meaning": "Dia orang Jepang.",
    "prompt": "Buat kalimat “dia orang Jepang”.",
    "answer": "她是日本人。",
    "modelSentence": "她是日本人。",
    "modelPinyin": "tā shì Rìběn rén.",
    "modelMeaning": "Dia orang Jepang.",
    "hint": "Gunakan 她 untuk dia perempuan.",
    "explanation": "人 menandai orang/kewarganegaraan."
  }
];

export default function MandarinYufaTopik5Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
