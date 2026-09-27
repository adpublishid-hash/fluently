import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-hsk-1-pronunciation-review",
  "title": "Pīnyīn 20: HSK 1 Pronunciation Review",
  "description": "Menggabungkan nada, initial-final, sandhi, dan shadowing dasar HSK 1.",
  "topicNumber": 20,
  "focus": "Review Pīnyīn HSK 1.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "hsk-1-pronunciation-review-1",
    "title": "HSK 1 Pronunciation Review 1",
    "hanzi": "我是学生",
    "pinyin": "wǒ shì xuésheng",
    "tonePattern": "Nada campuran dan x.",
    "focus": "Nada campuran dan x.",
    "meaning": "Saya pelajar",
    "prompt": "Ucapkan wǒ shì xuésheng dengan ritme kalimat pendek.",
    "modelWord": "我是学生",
    "modelPinyin": "wǒ shì xuésheng",
    "modelMeaning": "Saya pelajar",
    "hint": "Tekankan kata isi, bukan semua suku kata.",
    "contrast": "Jangan membaca xue seperti ksue."
  },
  {
    "id": "hsk-1-pronunciation-review-2",
    "title": "HSK 1 Pronunciation Review 2",
    "hanzi": "我很好",
    "pinyin": "wǒ hěn hǎo",
    "tonePattern": "Sandhi nada 3.",
    "focus": "Sandhi nada 3.",
    "meaning": "Saya baik-baik saja",
    "prompt": "Ucapkan wó hén hǎo secara natural.",
    "modelWord": "我很好",
    "modelPinyin": "wó hén hǎo",
    "modelMeaning": "Saya baik-baik saja",
    "hint": "Dua nada 3 pertama berubah naik.",
    "contrast": "Jangan membaca semua nada 3 penuh."
  },
  {
    "id": "hsk-1-pronunciation-review-3",
    "title": "HSK 1 Pronunciation Review 3",
    "hanzi": "你去哪儿？",
    "pinyin": "nǐ qù nǎr?",
    "tonePattern": "q + ü dan nada tanya.",
    "focus": "q + ü dan nada tanya.",
    "meaning": "Kamu pergi ke mana?",
    "prompt": "Ucapkan nǐ qù nǎr dengan qù jatuh jelas.",
    "modelWord": "你去哪儿？",
    "modelPinyin": "nǐ qù nǎr?",
    "modelMeaning": "Kamu pergi ke mana?",
    "hint": "qù memakai bunyi ü walau ditulis u.",
    "contrast": "Jangan membaca qù seperti ku."
  },
  {
    "id": "hsk-1-pronunciation-review-4",
    "title": "HSK 1 Pronunciation Review 4",
    "hanzi": "谢谢，再见",
    "pinyin": "xièxie, zàijiàn",
    "tonePattern": "Netral tone dan dua nada 4.",
    "focus": "Netral tone dan dua nada 4.",
    "meaning": "Terima kasih, sampai jumpa",
    "prompt": "Ucapkan penutup ini dengan xie kedua ringan.",
    "modelWord": "谢谢，再见",
    "modelPinyin": "xièxie, zàijiàn",
    "modelMeaning": "Terima kasih, sampai jumpa",
    "hint": "Beri jeda kecil setelah xièxie.",
    "contrast": "Jangan memberi tekanan berat pada xie kedua."
  }
];

export default function MandarinPinyinTopik20Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
