import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-phone-conversation",
  "title": "Kǒuyǔ 15: Phone Conversation",
  "description": "Melatih pembuka telepon, meminta bicara dengan seseorang, dan meninggalkan pesan.",
  "topicNumber": 15,
  "focus": "Telepon dan pesan singkat.",
  "goal": "Latih respons telepon pendek dengan 喂, 请问, dan 留言."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "phone-conversation-1",
    "title": "Phone Conversation 1",
    "scenario": "Phone",
    "prompt": "Jawab telepon dengan halo.",
    "role": "You answer a call.",
    "modelHanzi": "喂，你好。",
    "modelPinyin": "Wéi, nǐ hǎo.",
    "modelMeaning": "Halo.",
    "starter": "喂，你好。",
    "hint": "喂 dipakai saat menjawab telepon.",
    "checklist": [
      "喂 terdengar naik.",
      "你好 jelas.",
      "Respons tidak terlalu datar."
    ],
    "followUp": "Tambahkan 请问 jika bertanya."
  },
  {
    "id": "phone-conversation-2",
    "title": "Phone Conversation 2",
    "scenario": "Phone",
    "prompt": "Minta bicara dengan Wang laoshi.",
    "role": "You ask for someone.",
    "modelHanzi": "请问，王老师在吗？",
    "modelPinyin": "Qǐngwèn, Wáng lǎoshī zài ma?",
    "modelMeaning": "Permisi, apakah Guru Wang ada?",
    "starter": "请问，...在吗？",
    "hint": "在吗 menanyakan apakah orangnya ada.",
    "checklist": [
      "请问 sopan.",
      "王老师 jelas.",
      "在吗 naik di akhir."
    ],
    "followUp": "Coba ganti nama orang."
  },
  {
    "id": "phone-conversation-3",
    "title": "Phone Conversation 3",
    "scenario": "Phone",
    "prompt": "Katakan dia sedang sibuk.",
    "role": "You explain availability.",
    "modelHanzi": "他现在很忙。",
    "modelPinyin": "Tā xiànzài hěn máng.",
    "modelMeaning": "Dia sekarang sangat sibuk.",
    "starter": "他现在...",
    "hint": "现在 menunjukkan sekarang.",
    "checklist": [
      "现在 jelas.",
      "很忙 sebagai keadaan.",
      "Kalimat sopan dan pendek."
    ],
    "followUp": "Tambahkan 请等一下 jika perlu."
  },
  {
    "id": "phone-conversation-4",
    "title": "Phone Conversation 4",
    "scenario": "Phone",
    "prompt": "Minta lawan bicara meninggalkan pesan.",
    "role": "You ask for a message.",
    "modelHanzi": "请留言。",
    "modelPinyin": "Qǐng liúyán.",
    "modelMeaning": "Silakan tinggalkan pesan.",
    "starter": "请...",
    "hint": "留言 berarti meninggalkan pesan.",
    "checklist": [
      "请 membuat sopan.",
      "留言 diucapkan liúyán.",
      "Instruksi pendek."
    ],
    "followUp": "Coba versi 请给我留言."
  }
];

export default function MandarinKouyuTopik15Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
