import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-making-requests",
  "title": "Kǒuyǔ 18: Making Requests",
  "description": "Melatih meminta bantuan, izin, dan klarifikasi secara sopan.",
  "topicNumber": 18,
  "focus": "Permintaan sopan.",
  "goal": "Gunakan 请, 可以, dan 麻烦你 untuk meminta sesuatu dengan halus."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "making-requests-1",
    "title": "Making Requests 1",
    "scenario": "Request",
    "prompt": "Minta lawan bicara berbicara lebih pelan.",
    "role": "You ask for slower speech.",
    "modelHanzi": "请说慢一点。",
    "modelPinyin": "Qǐng shuō màn yìdiǎn.",
    "modelMeaning": "Tolong bicara sedikit lebih pelan.",
    "starter": "请说...",
    "hint": "慢一点 berarti sedikit lebih pelan.",
    "checklist": [
      "请说 jelas.",
      "慢一点 tidak terpotong.",
      "Nada meminta bantuan."
    ],
    "followUp": "Coba versi 请再说一遍."
  },
  {
    "id": "making-requests-2",
    "title": "Making Requests 2",
    "scenario": "Request",
    "prompt": "Minta izin masuk.",
    "role": "You ask permission.",
    "modelHanzi": "我可以进去吗？",
    "modelPinyin": "Wǒ kěyǐ jìnqù ma?",
    "modelMeaning": "Bolehkah saya masuk?",
    "starter": "我可以...吗？",
    "hint": "可以...吗 meminta izin.",
    "checklist": [
      "可以 jelas.",
      "进去 sebagai aksi.",
      "吗 naik di akhir."
    ],
    "followUp": "Coba ganti 进去 dengan 坐."
  },
  {
    "id": "making-requests-3",
    "title": "Making Requests 3",
    "scenario": "Request",
    "prompt": "Minta bantuan membuka pintu.",
    "role": "You ask for help.",
    "modelHanzi": "麻烦你开门。",
    "modelPinyin": "Máfan nǐ kāi mén.",
    "modelMeaning": "Tolong bantu buka pintu.",
    "starter": "麻烦你...",
    "hint": "麻烦你 adalah pembuka permintaan sopan.",
    "checklist": [
      "麻烦你 jelas.",
      "开门 sebagai aksi.",
      "Nada tidak memerintah keras."
    ],
    "followUp": "Coba tambah 一下: 开一下门."
  },
  {
    "id": "making-requests-4",
    "title": "Making Requests 4",
    "scenario": "Request",
    "prompt": "Minta segelas air dengan sopan.",
    "role": "You request water.",
    "modelHanzi": "请给我一杯水。",
    "modelPinyin": "Qǐng gěi wǒ yì bēi shuǐ.",
    "modelMeaning": "Tolong beri saya segelas air.",
    "starter": "请给我...",
    "hint": "给我 berarti beri saya.",
    "checklist": [
      "请给我 jelas.",
      "一杯水 sebagai objek.",
      "Respons sopan dan lengkap."
    ],
    "followUp": "Coba ganti 水 dengan 茶."
  }
];

export default function MandarinKouyuTopik18Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
