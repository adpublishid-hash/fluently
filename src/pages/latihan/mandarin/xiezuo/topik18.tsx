import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-short-dialogue-writing",
  "title": "Xiězuò 18: Short Dialogue Writing",
  "description": "Melatih menulis dialog pendek untuk salam, nama, dan pertanyaan dasar.",
  "topicNumber": 18,
  "focus": "Dialog pendek.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "short-dialogue-writing-1",
    "title": "Short Dialogue Writing 1",
    "mode": "Dialogue Line",
    "hanzi": "你好！",
    "pinyin": "nǐ hǎo!",
    "meaning": "Halo!",
    "prompt": "Tulis pembuka dialog “Halo!”",
    "targetPattern": "你好！",
    "modelAnswer": "你好！",
    "modelPinyin": "Nǐ hǎo!",
    "modelMeaning": "Halo!",
    "hint": "Gunakan tanda seru untuk salam singkat.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "short-dialogue-writing-2",
    "title": "Short Dialogue Writing 2",
    "mode": "Dialogue Line",
    "hanzi": "你叫什么名字？",
    "pinyin": "nǐ jiào shénme míngzi?",
    "meaning": "Siapa namamu?",
    "prompt": "Tulis pertanyaan “Siapa namamu?”",
    "targetPattern": "你 + 叫 + 什么 + 名字",
    "modelAnswer": "你叫什么名字？",
    "modelPinyin": "Nǐ jiào shénme míngzi?",
    "modelMeaning": "Siapa namamu?",
    "hint": "名字 berarti nama.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "short-dialogue-writing-3",
    "title": "Short Dialogue Writing 3",
    "mode": "Dialogue Line",
    "hanzi": "我叫大卫。",
    "pinyin": "wǒ jiào Dàwèi.",
    "meaning": "Nama saya David.",
    "prompt": "Tulis jawaban “Nama saya David”.",
    "targetPattern": "我 + 叫 + 大卫",
    "modelAnswer": "我叫大卫。",
    "modelPinyin": "Wǒ jiào Dàwèi.",
    "modelMeaning": "Nama saya David.",
    "hint": "Gunakan 叫 untuk nama.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "short-dialogue-writing-4",
    "title": "Short Dialogue Writing 4",
    "mode": "Dialogue Line",
    "hanzi": "很高兴认识你。",
    "pinyin": "hěn gāoxìng rènshi nǐ.",
    "meaning": "Senang mengenalmu.",
    "prompt": "Tulis “Senang mengenalmu”.",
    "targetPattern": "很高兴 + 认识 + 你",
    "modelAnswer": "很高兴认识你。",
    "modelPinyin": "Hěn gāoxìng rènshi nǐ.",
    "modelMeaning": "Senang mengenalmu.",
    "hint": "Frasa ini umum saat berkenalan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik18Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
