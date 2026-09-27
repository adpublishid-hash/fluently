import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-name-sentences-with-jiao",
  "title": "Yǔfǎ 4: Name Sentences with 叫",
  "description": "Melatih pola memperkenalkan nama dengan kata kerja 叫.",
  "topicNumber": 4,
  "focus": "Subjek + 叫 + nama.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "name-sentences-with-jiao-1",
    "title": "Name Sentences with 叫 1",
    "pattern": "我 + 叫 + 名字",
    "hanzi": "我叫安娜。",
    "pinyin": "wǒ jiào Ānnà.",
    "meaning": "Nama saya Anna.",
    "prompt": "Buat kalimat “nama saya Anna”.",
    "answer": "我叫安娜。",
    "modelSentence": "我叫安娜。",
    "modelPinyin": "wǒ jiào Ānnà.",
    "modelMeaning": "Nama saya Anna.",
    "hint": "叫 berarti dipanggil/bernama.",
    "explanation": "Tidak perlu memakai 是 untuk pola nama ini."
  },
  {
    "id": "name-sentences-with-jiao-2",
    "title": "Name Sentences with 叫 2",
    "pattern": "你 + 叫 + 什么",
    "hanzi": "你叫什么？",
    "pinyin": "nǐ jiào shénme?",
    "meaning": "Siapa namamu?",
    "prompt": "Tulis pertanyaan “siapa namamu?”.",
    "answer": "你叫什么？",
    "modelSentence": "你叫什么？",
    "modelPinyin": "nǐ jiào shénme?",
    "modelMeaning": "Siapa namamu?",
    "hint": "什么 berada di posisi informasi yang ditanyakan.",
    "explanation": "Mandarin tidak memindahkan kata tanya ke awal."
  },
  {
    "id": "name-sentences-with-jiao-3",
    "title": "Name Sentences with 叫 3",
    "pattern": "他 + 叫 + 王明",
    "hanzi": "他叫王明。",
    "pinyin": "tā jiào Wáng Míng.",
    "meaning": "Namanya Wang Ming.",
    "prompt": "Buat kalimat “namanya Wang Ming”.",
    "answer": "他叫王明。",
    "modelSentence": "他叫王明。",
    "modelPinyin": "tā jiào Wáng Míng.",
    "modelMeaning": "Namanya Wang Ming.",
    "hint": "Nama keluarga Mandarin biasanya di depan.",
    "explanation": "叫 langsung diikuti nama."
  },
  {
    "id": "name-sentences-with-jiao-4",
    "title": "Name Sentences with 叫 4",
    "pattern": "她 + 叫 + 李华",
    "hanzi": "她叫李华。",
    "pinyin": "tā jiào Lǐ Huá.",
    "meaning": "Namanya Li Hua.",
    "prompt": "Buat kalimat untuk nama perempuan Li Hua.",
    "answer": "她叫李华。",
    "modelSentence": "她叫李华。",
    "modelPinyin": "tā jiào Lǐ Huá.",
    "modelMeaning": "Namanya Li Hua.",
    "hint": "Gunakan 她 untuk dia perempuan.",
    "explanation": "Pola sama: subjek + 叫 + nama."
  }
];

export default function MandarinYufaTopik4Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
