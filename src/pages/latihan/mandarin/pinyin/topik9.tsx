import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-pinyin-initials-b-p-m-f",
  "title": "Pīnyīn 9: Pinyin Initials b p m f",
  "description": "Melatih bunyi bibir b, p, m, dan f dalam pīnyīn Mandarin.",
  "topicNumber": 9,
  "focus": "Initial bibir: b p m f.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "pinyin-initials-b-p-m-f-1",
    "title": "Pinyin Initials b p m f 1",
    "hanzi": "八",
    "pinyin": "bā",
    "tonePattern": "b tidak sekuat b Indonesia, dekat p tanpa aspirasi.",
    "focus": "b tidak sekuat b Indonesia, dekat p tanpa aspirasi.",
    "meaning": "Delapan",
    "prompt": "Ucapkan bā pendek dan jelas.",
    "modelWord": "八",
    "modelPinyin": "bā",
    "modelMeaning": "delapan",
    "hint": "Jangan meledakkan udara terlalu besar.",
    "contrast": "Bedakan dari pā yang beraspirasi."
  },
  {
    "id": "pinyin-initials-b-p-m-f-2",
    "title": "Pinyin Initials b p m f 2",
    "hanzi": "怕",
    "pinyin": "pà",
    "tonePattern": "p beraspirasi dengan hembusan udara.",
    "focus": "p beraspirasi dengan hembusan udara.",
    "meaning": "Takut",
    "prompt": "Ucapkan pà dengan udara keluar jelas.",
    "modelWord": "怕",
    "modelPinyin": "pà",
    "modelMeaning": "takut",
    "hint": "Letakkan tangan di depan mulut untuk rasa udara.",
    "contrast": "Bedakan dari bà tanpa hembusan kuat."
  },
  {
    "id": "pinyin-initials-b-p-m-f-3",
    "title": "Pinyin Initials b p m f 3",
    "hanzi": "妈",
    "pinyin": "mā",
    "tonePattern": "m nasal bibir tertutup.",
    "focus": "m nasal bibir tertutup.",
    "meaning": "Ibu",
    "prompt": "Ucapkan mā dengan bibir tertutup dulu.",
    "modelWord": "妈",
    "modelPinyin": "mā",
    "modelMeaning": "ibu",
    "hint": "Biarkan suara keluar lewat hidung saat m.",
    "contrast": "Jangan menjadi ba atau pa."
  },
  {
    "id": "pinyin-initials-b-p-m-f-4",
    "title": "Pinyin Initials b p m f 4",
    "hanzi": "饭",
    "pinyin": "fàn",
    "tonePattern": "f memakai bibir bawah dan gigi atas.",
    "focus": "f memakai bibir bawah dan gigi atas.",
    "meaning": "Nasi/makanan",
    "prompt": "Ucapkan fàn dengan gesekan ringan.",
    "modelWord": "饭",
    "modelPinyin": "fàn",
    "modelMeaning": "nasi; makanan",
    "hint": "Jangan gigit bibir terlalu keras.",
    "contrast": "Bedakan dari huan/wan."
  }
];

export default function MandarinPinyinTopik9Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
