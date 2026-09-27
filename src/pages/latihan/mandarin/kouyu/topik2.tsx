import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-self-introduction",
  "title": "Kǒuyǔ 2: Self Introduction",
  "description": "Melatih perkenalan diri dasar: nama, asal, identitas, dan bahasa yang dipelajari.",
  "topicNumber": 2,
  "focus": "Perkenalan diri pendek.",
  "goal": "Latih satu respons lengkap, lalu ganti detailnya dengan identitasmu sendiri."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "self-introduction-1",
    "title": "Self Introduction 1",
    "scenario": "Introduction",
    "prompt": "Perkenalkan nama dan identitas sebagai siswa.",
    "role": "You introduce yourself.",
    "modelHanzi": "我叫大卫，我是学生。",
    "modelPinyin": "Wǒ jiào Dàwèi, wǒ shì xuésheng.",
    "modelMeaning": "Nama saya David, saya adalah siswa.",
    "starter": "我叫...，我是...",
    "hint": "Gabungkan 我叫 dan 我是 dalam satu respons.",
    "checklist": [
      "Nama muncul setelah 我叫.",
      "身份/identitas muncul setelah 我是.",
      "Jeda pendek di tengah kalimat."
    ],
    "followUp": "Coba ganti 学生 dengan 老师 jika perlu."
  },
  {
    "id": "self-introduction-2",
    "title": "Self Introduction 2",
    "scenario": "Introduction",
    "prompt": "Katakan kamu berasal dari Indonesia.",
    "role": "You mention your country.",
    "modelHanzi": "我来自印度尼西亚。",
    "modelPinyin": "Wǒ láizì Yìndùníxīyà.",
    "modelMeaning": "Saya berasal dari Indonesia.",
    "starter": "我来自...",
    "hint": "来自 berarti berasal dari.",
    "checklist": [
      "来自 terdengar dua suku kata.",
      "Nama negara tidak dipotong terlalu cepat.",
      "Kalimat selesai dengan intonasi turun."
    ],
    "followUp": "Tambahkan 你呢？ untuk bertanya balik."
  },
  {
    "id": "self-introduction-3",
    "title": "Self Introduction 3",
    "scenario": "Introduction",
    "prompt": "Katakan kamu sedang belajar Mandarin.",
    "role": "You describe your study.",
    "modelHanzi": "我学习中文。",
    "modelPinyin": "Wǒ xuéxí Zhōngwén.",
    "modelMeaning": "Saya belajar bahasa Mandarin.",
    "starter": "我学习...",
    "hint": "中文 adalah bahasa Mandarin.",
    "checklist": [
      "学习 diucapkan xuéxí.",
      "中文 terdengar jelas.",
      "Respons pendek tetapi lengkap."
    ],
    "followUp": "Variasi: 我喜欢学习中文."
  },
  {
    "id": "self-introduction-4",
    "title": "Self Introduction 4",
    "scenario": "Introduction",
    "prompt": "Buat perkenalan mini berisi nama, asal, dan belajar Mandarin.",
    "role": "You give a mini intro.",
    "modelHanzi": "大家好，我叫安娜。我来自印度尼西亚，我学习中文。",
    "modelPinyin": "Dàjiā hǎo, wǒ jiào Ānnà. Wǒ láizì Yìndùníxīyà, wǒ xuéxí Zhōngwén.",
    "modelMeaning": "Halo semuanya, nama saya Anna. Saya dari Indonesia, saya belajar Mandarin.",
    "starter": "大家好，我叫...",
    "hint": "Pecah menjadi dua kalimat agar lebih lancar.",
    "checklist": [
      "Salam pembuka jelas.",
      "Ada nama dan asal.",
      "Kalimat terakhir menyebut 学习中文."
    ],
    "followUp": "Coba ulang tanpa membaca draft."
  }
];

export default function MandarinKouyuTopik2Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
