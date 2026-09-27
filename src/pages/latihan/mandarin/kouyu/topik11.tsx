import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-directions-and-places",
  "title": "Kǒuyǔ 11: Directions and Places",
  "description": "Melatih bertanya dan menjelaskan lokasi tempat umum.",
  "topicNumber": 11,
  "focus": "Tempat dan arah.",
  "goal": "Gunakan 在, 左, 右, 前面, dan 旁边 dalam respons lisan."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "directions-and-places-1",
    "title": "Directions and Places 1",
    "scenario": "Directions",
    "prompt": "Tanyakan di mana bank berada.",
    "role": "You ask location.",
    "modelHanzi": "银行在哪儿？",
    "modelPinyin": "Yínháng zài nǎr?",
    "modelMeaning": "Bank ada di mana?",
    "starter": "...在哪儿？",
    "hint": "在哪儿 menanyakan lokasi.",
    "checklist": [
      "银行 jelas.",
      "在哪儿 naik di akhir.",
      "Pertanyaan pendek."
    ],
    "followUp": "Coba dengan 医院 atau 学校."
  },
  {
    "id": "directions-and-places-2",
    "title": "Directions and Places 2",
    "scenario": "Directions",
    "prompt": "Katakan bank ada di sebelah sekolah.",
    "role": "You give location.",
    "modelHanzi": "银行在学校旁边。",
    "modelPinyin": "Yínháng zài xuéxiào pángbiān.",
    "modelMeaning": "Bank ada di sebelah sekolah.",
    "starter": "银行在...",
    "hint": "在 menunjukkan lokasi.",
    "checklist": [
      "银行在 jelas.",
      "学校旁边 sebagai lokasi.",
      "旁边 tidak terlalu cepat."
    ],
    "followUp": "Coba ganti 旁边 dengan 前面."
  },
  {
    "id": "directions-and-places-3",
    "title": "Directions and Places 3",
    "scenario": "Directions",
    "prompt": "Beri instruksi jalan ke kiri.",
    "role": "You give direction.",
    "modelHanzi": "请往左走。",
    "modelPinyin": "Qǐng wǎng zuǒ zǒu.",
    "modelMeaning": "Silakan jalan ke kiri.",
    "starter": "请往...走。",
    "hint": "往左 berarti ke kiri.",
    "checklist": [
      "请 membuat instruksi sopan.",
      "左 jelas.",
      "走 tidak terlalu keras."
    ],
    "followUp": "Coba versi 往右走."
  },
  {
    "id": "directions-and-places-4",
    "title": "Directions and Places 4",
    "scenario": "Directions",
    "prompt": "Katakan perpustakaan ada di depan.",
    "role": "You describe place.",
    "modelHanzi": "图书馆在前面。",
    "modelPinyin": "Túshūguǎn zài qiánmiàn.",
    "modelMeaning": "Perpustakaan ada di depan.",
    "starter": "图书馆在...",
    "hint": "前面 berarti depan.",
    "checklist": [
      "图书馆 jelas.",
      "在前面 sebagai lokasi.",
      "Intonasi informatif."
    ],
    "followUp": "Coba tambah 不远: 不远，在前面."
  }
];

export default function MandarinKouyuTopik11Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
