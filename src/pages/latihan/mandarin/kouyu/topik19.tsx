import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-mini-storytelling",
  "title": "Kǒuyǔ 19: Mini Storytelling",
  "description": "Melatih menceritakan kegiatan pendek dengan urutan waktu dan konektor dasar.",
  "topicNumber": 19,
  "focus": "Cerita mini dan konektor.",
  "goal": "Ucapkan 2 kalimat pendek dengan 今天, 然后, 但是, atau 所以."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "mini-storytelling-1",
    "title": "Mini Storytelling 1",
    "scenario": "Story",
    "prompt": "Ceritakan pagi ini kamu belajar lalu minum teh.",
    "role": "You tell a mini routine.",
    "modelHanzi": "今天早上我学习中文，然后喝茶。",
    "modelPinyin": "Jīntiān zǎoshang wǒ xuéxí Zhōngwén, ránhòu hē chá.",
    "modelMeaning": "Pagi ini saya belajar Mandarin, lalu minum teh.",
    "starter": "今天早上...然后...",
    "hint": "然后 berarti lalu/kemudian.",
    "checklist": [
      "今天早上 jelas.",
      "然后 menghubungkan aktivitas.",
      "Dua aktivitas terdengar terpisah."
    ],
    "followUp": "Coba ganti 喝茶 dengan 吃饭."
  },
  {
    "id": "mini-storytelling-2",
    "title": "Mini Storytelling 2",
    "scenario": "Story",
    "prompt": "Ceritakan kamu ingin pergi tetapi sibuk.",
    "role": "You use contrast.",
    "modelHanzi": "我想去，但是我很忙。",
    "modelPinyin": "Wǒ xiǎng qù, dànshì wǒ hěn máng.",
    "modelMeaning": "Saya ingin pergi, tetapi saya sibuk.",
    "starter": "我想...但是...",
    "hint": "但是 memberi kontras.",
    "checklist": [
      "想去 jelas.",
      "但是 sebagai penghubung.",
      "很忙 sebagai alasan."
    ],
    "followUp": "Coba tambah 今天."
  },
  {
    "id": "mini-storytelling-3",
    "title": "Mini Storytelling 3",
    "scenario": "Story",
    "prompt": "Ceritakan hujan, jadi kamu di rumah.",
    "role": "You give reason and result.",
    "modelHanzi": "下雨了，所以我在家。",
    "modelPinyin": "Xià yǔ le, suǒyǐ wǒ zài jiā.",
    "modelMeaning": "Hujan, jadi saya di rumah.",
    "starter": "...所以...",
    "hint": "所以 menunjukkan akibat.",
    "checklist": [
      "下雨了 sebagai sebab.",
      "所以 jelas.",
      "在家 sebagai akibat."
    ],
    "followUp": "Coba variasi: 所以我看书."
  },
  {
    "id": "mini-storytelling-4",
    "title": "Mini Storytelling 4",
    "scenario": "Story",
    "prompt": "Ceritakan tentang keluarga dan hobi dalam dua kalimat.",
    "role": "You make a mini self story.",
    "modelHanzi": "我家有四口人。我喜欢听音乐。",
    "modelPinyin": "Wǒ jiā yǒu sì kǒu rén. Wǒ xǐhuan tīng yīnyuè.",
    "modelMeaning": "Keluarga saya ada empat orang. Saya suka mendengarkan musik.",
    "starter": "我家有...。我喜欢...",
    "hint": "Pecah cerita menjadi dua kalimat pendek.",
    "checklist": [
      "Kalimat keluarga jelas.",
      "Kalimat hobi jelas.",
      "Jeda di antara dua kalimat."
    ],
    "followUp": "Coba ganti jumlah dan hobi sesuai dirimu."
  }
];

export default function MandarinKouyuTopik19Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
