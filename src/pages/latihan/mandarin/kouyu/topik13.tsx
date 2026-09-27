import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-hobbies-and-preferences",
  "title": "Kǒuyǔ 13: Hobbies and Preferences",
  "description": "Melatih menyatakan suka, tidak suka, hobi, dan aktivitas akhir pekan.",
  "topicNumber": 13,
  "focus": "Hobi dan preferensi.",
  "goal": "Gunakan 喜欢, 不喜欢, dan aktivitas sederhana dalam respons lisan."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "hobbies-and-preferences-1",
    "title": "Hobbies and Preferences 1",
    "scenario": "Hobby",
    "prompt": "Katakan kamu suka mendengarkan musik.",
    "role": "You say your hobby.",
    "modelHanzi": "我喜欢听音乐。",
    "modelPinyin": "Wǒ xǐhuan tīng yīnyuè.",
    "modelMeaning": "Saya suka mendengarkan musik.",
    "starter": "我喜欢...",
    "hint": "喜欢 diikuti aktivitas.",
    "checklist": [
      "喜欢 terdengar ringan.",
      "听音乐 jelas.",
      "Kalimat natural."
    ],
    "followUp": "Coba ganti dengan 看书."
  },
  {
    "id": "hobbies-and-preferences-2",
    "title": "Hobbies and Preferences 2",
    "scenario": "Hobby",
    "prompt": "Katakan kamu membaca buku pada akhir pekan.",
    "role": "You describe weekend hobby.",
    "modelHanzi": "我周末看书。",
    "modelPinyin": "Wǒ zhōumò kàn shū.",
    "modelMeaning": "Saya membaca buku pada akhir pekan.",
    "starter": "我周末...",
    "hint": "周末 berarti akhir pekan.",
    "checklist": [
      "周末 jelas.",
      "看书 sebagai aktivitas.",
      "Respons pendek."
    ],
    "followUp": "Tambahkan 在家 jika mau."
  },
  {
    "id": "hobbies-and-preferences-3",
    "title": "Hobbies and Preferences 3",
    "scenario": "Hobby",
    "prompt": "Ajak teman bermain basket bersama.",
    "role": "You invite activity.",
    "modelHanzi": "我们一起打篮球吧。",
    "modelPinyin": "Wǒmen yìqǐ dǎ lánqiú ba.",
    "modelMeaning": "Ayo kita bermain basket bersama.",
    "starter": "我们一起...吧。",
    "hint": "一起 berarti bersama.",
    "checklist": [
      "一起 jelas.",
      "打篮球 tidak terpotong.",
      "吧 membuat ajakan."
    ],
    "followUp": "Coba ganti 篮球 dengan 足球."
  },
  {
    "id": "hobbies-and-preferences-4",
    "title": "Hobbies and Preferences 4",
    "scenario": "Preference",
    "prompt": "Katakan dia tidak suka bernyanyi.",
    "role": "You describe dislike.",
    "modelHanzi": "他不喜欢唱歌。",
    "modelPinyin": "Tā bù xǐhuan chànggē.",
    "modelMeaning": "Dia tidak suka bernyanyi.",
    "starter": "他不喜欢...",
    "hint": "不喜欢 berarti tidak suka.",
    "checklist": [
      "不喜欢 jelas.",
      "唱歌 terdengar chànggē.",
      "Subjek 他 tidak hilang."
    ],
    "followUp": "Coba versi 我不喜欢唱歌."
  }
];

export default function MandarinKouyuTopik13Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
