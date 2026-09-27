import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-syllable-ni-hao",
  "title": "Pīnyīn 16: Syllable nǐ hǎo",
  "description": "Melatih salam paling dasar dengan sandhi nada ketiga yang natural.",
  "topicNumber": 16,
  "focus": "nǐ hǎo dalam ucapan natural.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "syllable-ni-hao-1",
    "title": "Syllable nǐ hǎo 1",
    "hanzi": "你好",
    "pinyin": "ní hǎo",
    "tonePattern": "Sandhi 3-3.",
    "focus": "Sandhi 3-3.",
    "meaning": "Halo",
    "prompt": "Ucapkan 你好 sebagai ní hǎo dalam alur natural.",
    "modelWord": "你好",
    "modelPinyin": "ní hǎo",
    "modelMeaning": "halo",
    "hint": "nǐ terdengar naik karena bertemu hǎo.",
    "contrast": "Jangan membaca dua nada rendah penuh."
  },
  {
    "id": "syllable-ni-hao-2",
    "title": "Syllable nǐ hǎo 2",
    "hanzi": "你",
    "pinyin": "nǐ",
    "tonePattern": "Suku kata pertama.",
    "focus": "Suku kata pertama.",
    "meaning": "Kamu",
    "prompt": "Latih nǐ sendiri dengan nada rendah sebelum digabung.",
    "modelWord": "你",
    "modelPinyin": "nǐ",
    "modelMeaning": "kamu",
    "hint": "Pahami bentuk dasar sebelum sandhi.",
    "contrast": "Saat digabung dengan hǎo, bunyinya berubah."
  },
  {
    "id": "syllable-ni-hao-3",
    "title": "Syllable nǐ hǎo 3",
    "hanzi": "好",
    "pinyin": "hǎo",
    "tonePattern": "Suku kata kedua.",
    "focus": "Suku kata kedua.",
    "meaning": "Baik",
    "prompt": "Latih hǎo dengan nada 3 rendah dan jelas.",
    "modelWord": "好",
    "modelPinyin": "hǎo",
    "modelMeaning": "baik",
    "hint": "h terdengar gesek ringan.",
    "contrast": "Jangan menjadi háo nada 2."
  },
  {
    "id": "syllable-ni-hao-4",
    "title": "Syllable nǐ hǎo 4",
    "hanzi": "你好吗",
    "pinyin": "nǐ hǎo ma",
    "tonePattern": "Frasa salam dengan partikel ma.",
    "focus": "Frasa salam dengan partikel ma.",
    "meaning": "Apa kabar?",
    "prompt": "Ucapkan nǐ hǎo ma dengan ma ringan.",
    "modelWord": "你好吗",
    "modelPinyin": "nǐ hǎo ma",
    "modelMeaning": "apa kabar?",
    "hint": "Partikel ma tidak diberi tekanan berat.",
    "contrast": "Jangan membaca ma sebagai mā."
  }
];

export default function MandarinPinyinTopik16Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
