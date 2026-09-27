import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-4-falling",
  "title": "Pīnyīn 4: Tone 4 Falling",
  "description": "Melatih nada keempat yang jatuh tegas dari tinggi ke rendah.",
  "topicNumber": 4,
  "focus": "Nada keempat: jatuh pendek dan tegas.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-4-falling-1",
    "title": "Tone 4 Falling 1",
    "hanzi": "骂",
    "pinyin": "mà",
    "tonePattern": "Nada 4 jatuh tajam.",
    "focus": "Nada 4 jatuh tajam.",
    "meaning": "Memarahi",
    "prompt": "Ucapkan mà seperti perintah pendek yang turun.",
    "modelWord": "骂",
    "modelPinyin": "mà",
    "modelMeaning": "memarahi",
    "hint": "Mulai tinggi, turun cepat.",
    "contrast": "Jangan datar seperti mā."
  },
  {
    "id": "tone-4-falling-2",
    "title": "Tone 4 Falling 2",
    "hanzi": "是",
    "pinyin": "shì",
    "tonePattern": "Nada 4 pada kata fungsi.",
    "focus": "Nada 4 pada kata fungsi.",
    "meaning": "Adalah",
    "prompt": "Ucapkan shì singkat, jatuh, dan jelas.",
    "modelWord": "是",
    "modelPinyin": "shì",
    "modelMeaning": "adalah",
    "hint": "Akhir nada turun, bukan melemah saja.",
    "contrast": "Bedakan dari shí yang naik."
  },
  {
    "id": "tone-4-falling-3",
    "title": "Tone 4 Falling 3",
    "hanzi": "去",
    "pinyin": "qù",
    "tonePattern": "Nada 4 dengan vokal ü.",
    "focus": "Nada 4 dengan vokal ü.",
    "meaning": "Pergi",
    "prompt": "Ucapkan qù dengan bibir membulat dan nada jatuh.",
    "modelWord": "去",
    "modelPinyin": "qù",
    "modelMeaning": "pergi",
    "hint": "Jaga q tetap ringan, bukan ch.",
    "contrast": "Jangan menjadi qú yang naik."
  },
  {
    "id": "tone-4-falling-4",
    "title": "Tone 4 Falling 4",
    "hanzi": "看",
    "pinyin": "kàn",
    "tonePattern": "Nada 4 pada final an.",
    "focus": "Nada 4 pada final an.",
    "meaning": "Melihat",
    "prompt": "Ucapkan kàn tegas tapi tidak berteriak.",
    "modelWord": "看",
    "modelPinyin": "kàn",
    "modelMeaning": "melihat",
    "hint": "Nada jatuh cukup pendek.",
    "contrast": "Bedakan dari kān yang datar."
  }
];

export default function MandarinPinyinTopik4Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
