import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-hobbies-and-free-time",
  "title": "Tīnglì 12: Hobbies and Free Time",
  "description": "Melatih hobi, minat, dan aktivitas santai dari audio sederhana.",
  "topicNumber": 12,
  "focus": "Hobi dan waktu luang.",
  "goal": "Dengarkan aktivitas yang disukai, lalu jawab hobi atau rencananya."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "hobbies-and-free-time-1",
    "title": "Hobbies and Free Time 1",
    "focus": "Hobby",
    "audioHanzi": "我喜欢听音乐。",
    "audioPinyin": "Wǒ xǐhuan tīng yīnyuè.",
    "audioMeaning": "Saya suka mendengarkan musik.",
    "question": "Apa hobi pembicara?",
    "answer": "听音乐 / mendengarkan musik",
    "hint": "Cari aktivitas setelah 喜欢.",
    "keywords": [
      "喜欢",
      "听",
      "音乐"
    ],
    "explanation": "听音乐 berarti mendengarkan musik."
  },
  {
    "id": "hobbies-and-free-time-2",
    "title": "Hobbies and Free Time 2",
    "focus": "Hobby",
    "audioHanzi": "她周末看书。",
    "audioPinyin": "Tā zhōumò kàn shū.",
    "audioMeaning": "Dia membaca buku pada akhir pekan.",
    "question": "Kapan dia membaca?",
    "answer": "周末 / akhir pekan",
    "hint": "Dengarkan kata waktu sebelum 看书.",
    "keywords": [
      "周末",
      "看书"
    ],
    "explanation": "周末 berarti akhir pekan."
  },
  {
    "id": "hobbies-and-free-time-3",
    "title": "Hobbies and Free Time 3",
    "focus": "Hobby",
    "audioHanzi": "我们一起打篮球。",
    "audioPinyin": "Wǒmen yìqǐ dǎ lánqiú.",
    "audioMeaning": "Kami bermain basket bersama.",
    "question": "Olahraga apa yang dilakukan?",
    "answer": "篮球 / basket",
    "hint": "Dengarkan objek setelah 打.",
    "keywords": [
      "一起",
      "打",
      "篮球"
    ],
    "explanation": "打篮球 berarti bermain basket."
  },
  {
    "id": "hobbies-and-free-time-4",
    "title": "Hobbies and Free Time 4",
    "focus": "Hobby",
    "audioHanzi": "他不喜欢唱歌。",
    "audioPinyin": "Tā bù xǐhuan chànggē.",
    "audioMeaning": "Dia tidak suka bernyanyi.",
    "question": "Apa yang tidak dia suka?",
    "answer": "唱歌 / bernyanyi",
    "hint": "Dengarkan aktivitas setelah 不喜欢.",
    "keywords": [
      "不喜欢",
      "唱歌"
    ],
    "explanation": "不喜欢唱歌 berarti tidak suka bernyanyi."
  }
];

export default function MandarinTingliTopik12Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
