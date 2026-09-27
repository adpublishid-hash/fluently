import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-1-high-flat",
  "title": "Pīnyīn 1: Tone 1 High Flat",
  "description": "Melatih nada pertama yang tinggi, datar, dan stabil tanpa naik turun.",
  "topicNumber": 1,
  "focus": "Nada pertama: tinggi dan rata.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-1-high-flat-1",
    "title": "Tone 1 High Flat 1",
    "hanzi": "妈",
    "pinyin": "mā",
    "tonePattern": "Nada 1 tetap tinggi dari awal sampai akhir.",
    "focus": "Nada 1 tetap tinggi dari awal sampai akhir.",
    "meaning": "Ibu",
    "prompt": "Ucapkan mā dengan pitch tinggi rata selama satu ketukan.",
    "modelWord": "妈",
    "modelPinyin": "mā",
    "modelMeaning": "ibu",
    "hint": "Jangan biarkan nada turun di akhir.",
    "contrast": "Bedakan dari mà yang jatuh tajam."
  },
  {
    "id": "tone-1-high-flat-2",
    "title": "Tone 1 High Flat 2",
    "hanzi": "书",
    "pinyin": "shū",
    "tonePattern": "Nada 1 panjang pendek stabil.",
    "focus": "Nada 1 panjang pendek stabil.",
    "meaning": "Buku",
    "prompt": "Ucapkan shū dengan suara rata dan tidak bergetar.",
    "modelWord": "书",
    "modelPinyin": "shū",
    "modelMeaning": "buku",
    "hint": "Bayangkan garis lurus di bagian atas.",
    "contrast": "Jangan menjadi shú yang naik."
  },
  {
    "id": "tone-1-high-flat-3",
    "title": "Tone 1 High Flat 3",
    "hanzi": "天",
    "pinyin": "tiān",
    "tonePattern": "Nada 1 pada final -ian.",
    "focus": "Nada 1 pada final -ian.",
    "meaning": "Langit/hari",
    "prompt": "Ucapkan tiān tanpa menekan bagian akhir terlalu berat.",
    "modelWord": "天",
    "modelPinyin": "tiān",
    "modelMeaning": "langit; hari",
    "hint": "Jaga vokal tetap terang dan datar.",
    "contrast": "Bedakan dari tián yang naik."
  },
  {
    "id": "tone-1-high-flat-4",
    "title": "Tone 1 High Flat 4",
    "hanzi": "高",
    "pinyin": "gāo",
    "tonePattern": "Nada 1 dengan final ao.",
    "focus": "Nada 1 dengan final ao.",
    "meaning": "Tinggi",
    "prompt": "Ucapkan gāo dengan nada tinggi rata dan mulut tetap terbuka.",
    "modelWord": "高",
    "modelPinyin": "gāo",
    "modelMeaning": "tinggi",
    "hint": "Pitch tidak perlu keras, cukup stabil.",
    "contrast": "Jangan jatuh seperti gào."
  }
];

export default function MandarinPinyinTopik1Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
