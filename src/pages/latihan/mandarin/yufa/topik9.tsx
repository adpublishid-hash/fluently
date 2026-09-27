import { MandarinYufaPracticePage, type MandarinYufaDrill, type MandarinYufaTopicMaterial } from '../../components/MandarinYufaPracticePage';

const material: MandarinYufaTopicMaterial = {
  "id": "mandarin-yufa-this-and-that-zhe-na",
  "title": "Yǔfǎ 9: This and That: 这 / 那",
  "description": "Melatih kata tunjuk 这 dan 那 dalam frasa dan kalimat sederhana.",
  "topicNumber": 9,
  "focus": "这/那 + 是 + benda.",
  "goal": "Baca pola, susun jawaban Mandarin, lalu cek apakah urutan kata dan partikel sudah tepat."
};

const drills: MandarinYufaDrill[] = [
  {
    "id": "this-and-that-zhe-na-1",
    "title": "This and That: 这 / 那 1",
    "pattern": "这 + 是 + 书",
    "hanzi": "这是书。",
    "pinyin": "zhè shì shū.",
    "meaning": "Ini buku.",
    "prompt": "Buat kalimat “ini buku”.",
    "answer": "这是书。",
    "modelSentence": "这是书。",
    "modelPinyin": "zhè shì shū.",
    "modelMeaning": "Ini buku.",
    "hint": "这 berarti ini.",
    "explanation": "Pola identifikasi memakai 是."
  },
  {
    "id": "this-and-that-zhe-na-2",
    "title": "This and That: 这 / 那 2",
    "pattern": "那 + 是 + 椅子",
    "hanzi": "那是椅子。",
    "pinyin": "nà shì yǐzi.",
    "meaning": "Itu kursi.",
    "prompt": "Buat kalimat “itu kursi”.",
    "answer": "那是椅子。",
    "modelSentence": "那是椅子。",
    "modelPinyin": "nà shì yǐzi.",
    "modelMeaning": "Itu kursi.",
    "hint": "那 berarti itu.",
    "explanation": "Tidak perlu kata tambahan untuk “adalah”."
  },
  {
    "id": "this-and-that-zhe-na-3",
    "title": "This and That: 这 / 那 3",
    "pattern": "这个 + 是 + 我的",
    "hanzi": "这个是我的。",
    "pinyin": "zhè ge shì wǒ de.",
    "meaning": "Yang ini milik saya.",
    "prompt": "Buat kalimat “yang ini milik saya”.",
    "answer": "这个是我的。",
    "modelSentence": "这个是我的。",
    "modelPinyin": "zhè ge shì wǒ de.",
    "modelMeaning": "Yang ini milik saya.",
    "hint": "我的 bisa berdiri sebagai “milik saya”.",
    "explanation": "这个 mengacu benda spesifik dekat pembicara."
  },
  {
    "id": "this-and-that-zhe-na-4",
    "title": "This and That: 这 / 那 4",
    "pattern": "那个 + 不是 + 你的",
    "hanzi": "那个不是你的。",
    "pinyin": "nà ge bú shì nǐ de.",
    "meaning": "Yang itu bukan milikmu.",
    "prompt": "Buat kalimat “yang itu bukan milikmu”.",
    "answer": "那个不是你的。",
    "modelSentence": "那个不是你的。",
    "modelPinyin": "nà ge bú shì nǐ de.",
    "modelMeaning": "Yang itu bukan milikmu.",
    "hint": "Negasi 是 menjadi 不是.",
    "explanation": "你的 dapat berdiri sebagai “milikmu”."
  }
];

export default function MandarinYufaTopik9Page() {
  return <MandarinYufaPracticePage material={material} drills={drills} />;
}
