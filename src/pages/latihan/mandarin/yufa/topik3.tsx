import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-negation-with-bu",
  "title": "Yǔfǎ 3: Negation with 不",
  "description": "Melatih negasi dasar 不 sebelum kata kerja atau predikat.",
  "topicNumber": 3,
  "focus": "Subjek + 不 + predikat.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "negation-with-bu-1",
    "title": "Negation with 不 1",
    "pattern": "我 + 不 + 是",
    "hanzi": "我不是老师。",
    "pinyin": "wǒ bú shì lǎoshī.",
    "meaning": "Saya bukan guru.",
    "prompt": "Ubah “saya guru” menjadi “saya bukan guru”.",
    "answer": "我不是老师。",
    "modelSentence": "我不是老师。",
    "modelPinyin": "wǒ bú shì lǎoshī.",
    "modelMeaning": "Saya bukan guru.",
    "hint": "Letakkan 不 sebelum 是.",
    "explanation": "不 menyangkal predikat setelahnya."
  },
  {
    "id": "negation-with-bu-2",
    "title": "Negation with 不 2",
    "pattern": "他 + 不 + 去",
    "hanzi": "他不去。",
    "pinyin": "tā bú qù.",
    "meaning": "Dia tidak pergi.",
    "prompt": "Buat kalimat “dia tidak pergi”.",
    "answer": "他不去。",
    "modelSentence": "他不去。",
    "modelPinyin": "tā bú qù.",
    "modelMeaning": "Dia tidak pergi.",
    "hint": "不 berada sebelum kata kerja 去.",
    "explanation": "Sebelum nada 4, 不 sering dibaca bú."
  },
  {
    "id": "negation-with-bu-3",
    "title": "Negation with 不 3",
    "pattern": "我 + 不 + 喜欢",
    "hanzi": "我不喜欢咖啡。",
    "pinyin": "wǒ bù xǐhuan kāfēi.",
    "meaning": "Saya tidak suka kopi.",
    "prompt": "Buat kalimat “saya tidak suka kopi”.",
    "answer": "我不喜欢咖啡。",
    "modelSentence": "我不喜欢咖啡。",
    "modelPinyin": "wǒ bù xǐhuan kāfēi.",
    "modelMeaning": "Saya tidak suka kopi.",
    "hint": "不 langsung sebelum 喜欢.",
    "explanation": "Objek tetap setelah kata kerja."
  },
  {
    "id": "negation-with-bu-4",
    "title": "Negation with 不 4",
    "pattern": "这 + 不 + 是",
    "hanzi": "这不是我的书。",
    "pinyin": "zhè bú shì wǒ de shū.",
    "meaning": "Ini bukan buku saya.",
    "prompt": "Buat kalimat “ini bukan buku saya”.",
    "answer": "这不是我的书。",
    "modelSentence": "这不是我的书。",
    "modelPinyin": "zhè bú shì wǒ de shū.",
    "modelMeaning": "Ini bukan buku saya.",
    "hint": "Gunakan 不是 untuk “bukan”.",
    "explanation": "的 menunjukkan kepemilikan sebelum benda."
  }
];

export default function MandarinYufaTopik3Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
