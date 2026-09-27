import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-neutral-tone",
  "title": "Pīnyīn 5: Neutral Tone",
  "description": "Melatih nada netral yang ringan, pendek, dan mengikuti nada sebelumnya.",
  "topicNumber": 5,
  "focus": "Nada netral: ringan dan tidak ditekankan.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "neutral-tone-1",
    "title": "Neutral Tone 1",
    "hanzi": "妈妈",
    "pinyin": "māma",
    "tonePattern": "Suku kata kedua netral.",
    "focus": "Suku kata kedua netral.",
    "meaning": "Ibu",
    "prompt": "Ucapkan māma: mā jelas, ma kedua ringan.",
    "modelWord": "妈妈",
    "modelPinyin": "māma",
    "modelMeaning": "ibu",
    "hint": "Suku kata kedua lebih pendek.",
    "contrast": "Jangan membaca mā mā dua nada 1 penuh."
  },
  {
    "id": "neutral-tone-2",
    "title": "Neutral Tone 2",
    "hanzi": "爸爸",
    "pinyin": "bàba",
    "tonePattern": "Nada 4 lalu netral.",
    "focus": "Nada 4 lalu netral.",
    "meaning": "Ayah",
    "prompt": "Ucapkan bàba dengan ba kedua ringan.",
    "modelWord": "爸爸",
    "modelPinyin": "bàba",
    "modelMeaning": "ayah",
    "hint": "Turunkan energi setelah suku kata pertama.",
    "contrast": "Jangan menjadikannya bà bà."
  },
  {
    "id": "neutral-tone-3",
    "title": "Neutral Tone 3",
    "hanzi": "谢谢",
    "pinyin": "xièxie",
    "tonePattern": "Nada 4 lalu netral.",
    "focus": "Nada 4 lalu netral.",
    "meaning": "Terima kasih",
    "prompt": "Ucapkan xièxie dengan xie kedua pendek.",
    "modelWord": "谢谢",
    "modelPinyin": "xièxie",
    "modelMeaning": "terima kasih",
    "hint": "Suku kata kedua jangan diberi tekanan baru.",
    "contrast": "Bedakan dari dua nada 4 penuh."
  },
  {
    "id": "neutral-tone-4",
    "title": "Neutral Tone 4",
    "hanzi": "什么",
    "pinyin": "shénme",
    "tonePattern": "Nada 2 lalu netral.",
    "focus": "Nada 2 lalu netral.",
    "meaning": "Apa",
    "prompt": "Ucapkan shénme dengan me ringan.",
    "modelWord": "什么",
    "modelPinyin": "shénme",
    "modelMeaning": "apa",
    "hint": "Kata kedua seperti ekor pendek.",
    "contrast": "Jangan membaca me sebagai nada berat."
  }
];

export default function MandarinPinyinTopik5Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
