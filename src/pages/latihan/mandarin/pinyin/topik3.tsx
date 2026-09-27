import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-3-dipping",
  "title": "Pīnyīn 3: Tone 3 Dipping",
  "description": "Melatih nada ketiga yang rendah dan melengkung turun-naik secara ringan.",
  "topicNumber": 3,
  "focus": "Nada ketiga: rendah, turun sedikit, lalu naik tipis.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-3-dipping-1",
    "title": "Tone 3 Dipping 1",
    "hanzi": "马",
    "pinyin": "mǎ",
    "tonePattern": "Nada 3 rendah.",
    "focus": "Nada 3 rendah.",
    "meaning": "Kuda",
    "prompt": "Ucapkan mǎ dengan suara rendah dan santai.",
    "modelWord": "马",
    "modelPinyin": "mǎ",
    "modelMeaning": "kuda",
    "hint": "Dalam ucapan natural, cukup rendah dan sedikit naik.",
    "contrast": "Jangan naik penuh seperti má."
  },
  {
    "id": "tone-3-dipping-2",
    "title": "Tone 3 Dipping 2",
    "hanzi": "你",
    "pinyin": "nǐ",
    "tonePattern": "Nada 3 pada kata sangat umum.",
    "focus": "Nada 3 pada kata sangat umum.",
    "meaning": "Kamu",
    "prompt": "Ucapkan nǐ rendah, jangan terlalu panjang.",
    "modelWord": "你",
    "modelPinyin": "nǐ",
    "modelMeaning": "kamu",
    "hint": "Pitch utama berada di bawah.",
    "contrast": "Bedakan dari ní yang naik."
  },
  {
    "id": "tone-3-dipping-3",
    "title": "Tone 3 Dipping 3",
    "hanzi": "好",
    "pinyin": "hǎo",
    "tonePattern": "Nada 3 dengan final ao.",
    "focus": "Nada 3 dengan final ao.",
    "meaning": "Baik",
    "prompt": "Ucapkan hǎo rendah dengan sedikit pantulan di akhir.",
    "modelWord": "好",
    "modelPinyin": "hǎo",
    "modelMeaning": "baik",
    "hint": "Jangan menekan tenggorokan.",
    "contrast": "Jangan jatuh tajam seperti hào."
  },
  {
    "id": "tone-3-dipping-4",
    "title": "Tone 3 Dipping 4",
    "hanzi": "我",
    "pinyin": "wǒ",
    "tonePattern": "Nada 3 pada vokal o.",
    "focus": "Nada 3 pada vokal o.",
    "meaning": "Saya",
    "prompt": "Ucapkan wǒ rendah dan jelas tanpa jadi wo datar.",
    "modelWord": "我",
    "modelPinyin": "wǒ",
    "modelMeaning": "saya",
    "hint": "Mulut bulat, pitch rendah.",
    "contrast": "Jangan menjadi wō nada 1."
  }
];

export default function MandarinPinyinTopik3Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
