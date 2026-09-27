import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-shopping-notes",
  "title": "Xiězuò 12: Shopping Notes",
  "description": "Melatih catatan belanja pendek tentang harga dan barang.",
  "topicNumber": 12,
  "focus": "Belanja tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "shopping-notes-1",
    "title": "Shopping Notes 1",
    "mode": "Sentence Build",
    "hanzi": "这个很贵。",
    "pinyin": "zhège hěn guì.",
    "meaning": "Ini mahal.",
    "prompt": "Tulis “Ini mahal”.",
    "targetPattern": "这个 + 很 + 贵",
    "modelAnswer": "这个很贵。",
    "modelPinyin": "Zhège hěn guì.",
    "modelMeaning": "Ini mahal.",
    "hint": "贵 berarti mahal.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "shopping-notes-2",
    "title": "Shopping Notes 2",
    "mode": "Sentence Build",
    "hanzi": "那本书很便宜。",
    "pinyin": "nà běn shū hěn piányi.",
    "meaning": "Buku itu murah.",
    "prompt": "Tulis “Buku itu murah”.",
    "targetPattern": "那本书 + 很 + 便宜",
    "modelAnswer": "那本书很便宜。",
    "modelPinyin": "Nà běn shū hěn piányi.",
    "modelMeaning": "Buku itu murah.",
    "hint": "Buku memakai kata ukur 本.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "shopping-notes-3",
    "title": "Shopping Notes 3",
    "mode": "Sentence Build",
    "hanzi": "我没有钱。",
    "pinyin": "wǒ méiyǒu qián.",
    "meaning": "Saya tidak punya uang.",
    "prompt": "Tulis “Saya tidak punya uang”.",
    "targetPattern": "我 + 没有 + 钱",
    "modelAnswer": "我没有钱。",
    "modelPinyin": "Wǒ méiyǒu qián.",
    "modelMeaning": "Saya tidak punya uang.",
    "hint": "Negatif 有 memakai 没有.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "shopping-notes-4",
    "title": "Shopping Notes 4",
    "mode": "Sentence Build",
    "hanzi": "我想买咖啡。",
    "pinyin": "wǒ xiǎng mǎi kāfēi.",
    "meaning": "Saya ingin membeli kopi.",
    "prompt": "Tulis “Saya ingin membeli kopi”.",
    "targetPattern": "我 + 想 + 买 + 咖啡",
    "modelAnswer": "我想买咖啡。",
    "modelPinyin": "Wǒ xiǎng mǎi kāfēi.",
    "modelMeaning": "Saya ingin membeli kopi.",
    "hint": "想 + kata kerja + objek.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik12Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
