import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-location-with-zai",
  "title": "Yǔfǎ 15: Location with 在",
  "description": "Melatih 在 untuk menyatakan lokasi seseorang atau benda.",
  "topicNumber": 15,
  "focus": "Subjek + 在 + tempat.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "location-with-zai-1",
    "title": "Location with 在 1",
    "pattern": "我 + 在 + 学校",
    "hanzi": "我在学校。",
    "pinyin": "wǒ zài xuéxiào.",
    "meaning": "Saya di sekolah.",
    "prompt": "Buat kalimat “saya di sekolah”.",
    "answer": "我在学校。",
    "modelSentence": "我在学校。",
    "modelPinyin": "wǒ zài xuéxiào.",
    "modelMeaning": "Saya di sekolah.",
    "hint": "在 menunjukkan berada di lokasi.",
    "explanation": "Tidak perlu 是 sebelum 在."
  },
  {
    "id": "location-with-zai-2",
    "title": "Location with 在 2",
    "pattern": "书 + 在 + 桌子上",
    "hanzi": "书在桌子上。",
    "pinyin": "shū zài zhuōzi shàng.",
    "meaning": "Buku ada di atas meja.",
    "prompt": "Buat kalimat lokasi buku.",
    "answer": "书在桌子上。",
    "modelSentence": "书在桌子上。",
    "modelPinyin": "shū zài zhuōzi shàng.",
    "modelMeaning": "Buku ada di atas meja.",
    "hint": "上 berarti di atas.",
    "explanation": "Tempat lengkap muncul setelah 在."
  },
  {
    "id": "location-with-zai-3",
    "title": "Location with 在 3",
    "pattern": "你 + 在 + 哪儿",
    "hanzi": "你在哪儿？",
    "pinyin": "nǐ zài nǎr?",
    "meaning": "Kamu di mana?",
    "prompt": "Buat pertanyaan “kamu di mana?”.",
    "answer": "你在哪儿？",
    "modelSentence": "你在哪儿？",
    "modelPinyin": "nǐ zài nǎr?",
    "modelMeaning": "Kamu di mana?",
    "hint": "哪儿 berada di posisi tempat.",
    "explanation": "Kata tanya tidak perlu dipindah ke awal."
  },
  {
    "id": "location-with-zai-4",
    "title": "Location with 在 4",
    "pattern": "他 + 不 + 在 + 家",
    "hanzi": "他不在家。",
    "pinyin": "tā bú zài jiā.",
    "meaning": "Dia tidak di rumah.",
    "prompt": "Buat kalimat negatif “dia tidak di rumah”.",
    "answer": "他不在家。",
    "modelSentence": "他不在家。",
    "modelPinyin": "tā bú zài jiā.",
    "modelMeaning": "Dia tidak di rumah.",
    "hint": "不 berada sebelum 在.",
    "explanation": "家 berarti rumah."
  }
];

export default function MandarinYufaTopik15Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
