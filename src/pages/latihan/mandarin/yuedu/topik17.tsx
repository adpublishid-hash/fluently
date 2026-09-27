import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-home-mini-story",
  "title": "Yuèdú 17: Home Mini Story",
  "description": "Membaca cerita mini tentang kegiatan di rumah.",
  "topicNumber": 17,
  "focus": "Cerita rumah.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "home-mini-story-1",
    "title": "Home Mini Story 1",
    "focus": "Story",
    "passageHanzi": "晚上，爸爸看电视。妈妈看书。我写汉字。",
    "passagePinyin": "Wǎnshang, bàba kàn diànshì. Māma kàn shū. Wǒ xiě Hànzì.",
    "passageMeaning": "Malam hari, ayah menonton TV. Ibu membaca buku. Saya menulis Hanzi.",
    "question": "Siapa yang menulis Hanzi?",
    "answer": "我 / saya",
    "hint": "Cari 写汉字.",
    "keywords": [
      "爸爸",
      "妈妈",
      "我",
      "写汉字"
    ],
    "explanation": "我写汉字 berarti saya menulis Hanzi."
  },
  {
    "id": "home-mini-story-2",
    "title": "Home Mini Story 2",
    "focus": "Story",
    "passageHanzi": "妹妹在房间听音乐。哥哥在客厅喝茶。",
    "passagePinyin": "Mèimei zài fángjiān tīng yīnyuè. Gēge zài kètīng hē chá.",
    "passageMeaning": "Adik perempuan mendengarkan musik di kamar. Kakak laki-laki minum teh di ruang tamu.",
    "question": "Di mana adik perempuan?",
    "answer": "房间 / kamar",
    "hint": "Cari 妹妹.",
    "keywords": [
      "妹妹",
      "房间",
      "哥哥",
      "客厅"
    ],
    "explanation": "妹妹在房间 menyatakan adik perempuan di kamar."
  },
  {
    "id": "home-mini-story-3",
    "title": "Home Mini Story 3",
    "focus": "Story",
    "passageHanzi": "今天家里有客人。我们一起吃饭。",
    "passagePinyin": "Jīntiān jiā lǐ yǒu kèrén. Wǒmen yìqǐ chī fàn.",
    "passageMeaning": "Hari ini ada tamu di rumah. Kami makan bersama.",
    "question": "Siapa yang ada di rumah?",
    "answer": "客人 / tamu",
    "hint": "Cari 家里有.",
    "keywords": [
      "家里",
      "客人",
      "一起吃饭"
    ],
    "explanation": "家里有客人 berarti ada tamu di rumah."
  },
  {
    "id": "home-mini-story-4",
    "title": "Home Mini Story 4",
    "focus": "Story",
    "passageHanzi": "我家的狗很小，也很可爱。",
    "passagePinyin": "Wǒ jiā de gǒu hěn xiǎo, yě hěn kěài.",
    "passageMeaning": "Anjing keluarga saya kecil dan juga lucu.",
    "question": "Bagaimana anjingnya?",
    "answer": "小 dan 可爱 / kecil dan lucu",
    "hint": "Cari kata setelah 很.",
    "keywords": [
      "狗",
      "小",
      "可爱"
    ],
    "explanation": "很小 dan 很可爱 adalah dua deskripsi."
  }
];

export default function MandarinYueduTopik17Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
