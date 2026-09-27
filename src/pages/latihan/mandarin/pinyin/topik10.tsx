import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-pinyin-initials-d-t-n-l",
  "title": "Pīnyīn 10: Pinyin Initials d t n l",
  "description": "Melatih bunyi ujung lidah d, t, n, dan l.",
  "topicNumber": 10,
  "focus": "Initial lidah depan: d t n l.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "pinyin-initials-d-t-n-l-1",
    "title": "Pinyin Initials d t n l 1",
    "hanzi": "大",
    "pinyin": "dà",
    "tonePattern": "d tanpa aspirasi kuat.",
    "focus": "d tanpa aspirasi kuat.",
    "meaning": "Besar",
    "prompt": "Ucapkan dà dengan lidah menyentuh belakang gigi atas.",
    "modelWord": "大",
    "modelPinyin": "dà",
    "modelMeaning": "besar",
    "hint": "Udara tidak perlu meledak besar.",
    "contrast": "Bedakan dari tà yang beraspirasi."
  },
  {
    "id": "pinyin-initials-d-t-n-l-2",
    "title": "Pinyin Initials d t n l 2",
    "hanzi": "他",
    "pinyin": "tā",
    "tonePattern": "t beraspirasi.",
    "focus": "t beraspirasi.",
    "meaning": "Dia laki-laki",
    "prompt": "Ucapkan tā dengan hembusan udara jelas.",
    "modelWord": "他",
    "modelPinyin": "tā",
    "modelMeaning": "dia laki-laki",
    "hint": "Jaga nada tetap tinggi rata.",
    "contrast": "Jangan menjadi dā."
  },
  {
    "id": "pinyin-initials-d-t-n-l-3",
    "title": "Pinyin Initials d t n l 3",
    "hanzi": "你",
    "pinyin": "nǐ",
    "tonePattern": "n nasal lidah depan.",
    "focus": "n nasal lidah depan.",
    "meaning": "Kamu",
    "prompt": "Ucapkan nǐ dengan suara lewat hidung.",
    "modelWord": "你",
    "modelPinyin": "nǐ",
    "modelMeaning": "kamu",
    "hint": "Awali dengan lidah menempel ringan.",
    "contrast": "Bedakan dari lǐ."
  },
  {
    "id": "pinyin-initials-d-t-n-l-4",
    "title": "Pinyin Initials d t n l 4",
    "hanzi": "来",
    "pinyin": "lái",
    "tonePattern": "l lateral, udara lewat samping lidah.",
    "focus": "l lateral, udara lewat samping lidah.",
    "meaning": "Datang",
    "prompt": "Ucapkan lái dengan l bersih.",
    "modelWord": "来",
    "modelPinyin": "lái",
    "modelMeaning": "datang",
    "hint": "Jangan nasal seperti n.",
    "contrast": "Bedakan dari nái."
  }
];

export default function MandarinPinyinTopik10Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
