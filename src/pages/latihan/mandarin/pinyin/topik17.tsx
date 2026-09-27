import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-syllable-xie-xie",
  "title": "Pīnyīn 17: Syllable xièxie",
  "description": "Melatih x, final ie, dan nada netral dalam ucapan terima kasih.",
  "topicNumber": 17,
  "focus": "xièxie: x ringan dan suku kedua netral.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "syllable-xie-xie-1",
    "title": "Syllable xièxie 1",
    "hanzi": "谢谢",
    "pinyin": "xièxie",
    "tonePattern": "Nada 4 lalu netral.",
    "focus": "Nada 4 lalu netral.",
    "meaning": "Terima kasih",
    "prompt": "Ucapkan xièxie dengan x tipis dan xie kedua ringan.",
    "modelWord": "谢谢",
    "modelPinyin": "xièxie",
    "modelMeaning": "terima kasih",
    "hint": "Senyum tipis membantu bunyi x.",
    "contrast": "Jangan membaca x seperti ks."
  },
  {
    "id": "syllable-xie-xie-2",
    "title": "Syllable xièxie 2",
    "hanzi": "谢",
    "pinyin": "xiè",
    "tonePattern": "x + ie + nada 4.",
    "focus": "x + ie + nada 4.",
    "meaning": "Berterima kasih",
    "prompt": "Latih xiè sendiri dengan nada jatuh.",
    "modelWord": "谢",
    "modelPinyin": "xiè",
    "modelMeaning": "berterima kasih",
    "hint": "Lidah dekat posisi i, udara tipis.",
    "contrast": "Bedakan dari shè."
  },
  {
    "id": "syllable-xie-xie-3",
    "title": "Syllable xièxie 3",
    "hanzi": "小",
    "pinyin": "xiǎo",
    "tonePattern": "x dengan final iao.",
    "focus": "x dengan final iao.",
    "meaning": "Kecil",
    "prompt": "Ucapkan xiǎo rendah tanpa menjadi shao.",
    "modelWord": "小",
    "modelPinyin": "xiǎo",
    "modelMeaning": "kecil",
    "hint": "Bunyi x lebih depan daripada sh.",
    "contrast": "Jangan mengubah x menjadi s."
  },
  {
    "id": "syllable-xie-xie-4",
    "title": "Syllable xièxie 4",
    "hanzi": "不谢",
    "pinyin": "bú xiè",
    "tonePattern": "bú sebelum nada 4.",
    "focus": "bú sebelum nada 4.",
    "meaning": "Tidak perlu terima kasih",
    "prompt": "Ucapkan bú xiè dengan bu berubah naik.",
    "modelWord": "不谢",
    "modelPinyin": "bú xiè",
    "modelMeaning": "tidak perlu berterima kasih",
    "hint": "不 berubah sebelum nada 4.",
    "contrast": "Jangan membaca bù xiè terlalu kaku."
  }
];

export default function MandarinPinyinTopik17Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
