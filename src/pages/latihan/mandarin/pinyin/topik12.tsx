import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-finals-a-o-e",
  "title": "Pīnyīn 12: Finals a o e",
  "description": "Melatih final dasar a, o, dan e sebagai inti suku kata Mandarin.",
  "topicNumber": 12,
  "focus": "Final tunggal: a o e.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "finals-a-o-e-1",
    "title": "Finals a o e 1",
    "hanzi": "妈",
    "pinyin": "mā",
    "tonePattern": "Final a terbuka.",
    "focus": "Final a terbuka.",
    "meaning": "Ibu",
    "prompt": "Ucapkan mā dengan mulut terbuka santai.",
    "modelWord": "妈",
    "modelPinyin": "mā",
    "modelMeaning": "ibu",
    "hint": "Jaga a tetap bersih, bukan ə.",
    "contrast": "Bedakan dari mō."
  },
  {
    "id": "finals-a-o-e-2",
    "title": "Finals a o e 2",
    "hanzi": "我",
    "pinyin": "wǒ",
    "tonePattern": "Final o bulat.",
    "focus": "Final o bulat.",
    "meaning": "Saya",
    "prompt": "Ucapkan wǒ dengan bibir membulat.",
    "modelWord": "我",
    "modelPinyin": "wǒ",
    "modelMeaning": "saya",
    "hint": "Bibir bulat dari awal.",
    "contrast": "Jangan menjadi wa."
  },
  {
    "id": "finals-a-o-e-3",
    "title": "Finals a o e 3",
    "hanzi": "哥",
    "pinyin": "gē",
    "tonePattern": "Final e Mandarin.",
    "focus": "Final e Mandarin.",
    "meaning": "Kakak laki-laki",
    "prompt": "Ucapkan gē dengan vokal belakang, bukan e Indonesia biasa.",
    "modelWord": "哥",
    "modelPinyin": "gē",
    "modelMeaning": "kakak laki-laki",
    "hint": "Mulut tidak terlalu lebar.",
    "contrast": "Bedakan dari ge Indonesia."
  },
  {
    "id": "finals-a-o-e-4",
    "title": "Finals a o e 4",
    "hanzi": "喝",
    "pinyin": "hē",
    "tonePattern": "Final e setelah h.",
    "focus": "Final e setelah h.",
    "meaning": "Minum",
    "prompt": "Ucapkan hē dengan gesekan h dan final e stabil.",
    "modelWord": "喝",
    "modelPinyin": "hē",
    "modelMeaning": "minum",
    "hint": "Jangan mengubah e menjadi ei.",
    "contrast": "Bedakan dari hēi."
  }
];

export default function MandarinPinyinTopik12Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
