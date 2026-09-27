import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-read-name-slowly",
  "title": "Pīnyīn 18: Read Name Slowly",
  "description": "Melatih membaca nama Mandarin pelan dengan nada dan suku kata terpisah jelas.",
  "topicNumber": 18,
  "focus": "Nama Mandarin: suku kata dan nada.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "read-name-slowly-1",
    "title": "Read Name Slowly 1",
    "hanzi": "王明",
    "pinyin": "Wáng Míng",
    "tonePattern": "Nada 2-2.",
    "focus": "Nada 2-2.",
    "meaning": "Nama orang",
    "prompt": "Ucapkan Wáng Míng pelan dengan dua nada naik.",
    "modelWord": "王明",
    "modelPinyin": "Wáng Míng",
    "modelMeaning": "nama orang",
    "hint": "Pisahkan dua suku kata tanpa jeda terlalu panjang.",
    "contrast": "Jangan datarkan nada kedua."
  },
  {
    "id": "read-name-slowly-2",
    "title": "Read Name Slowly 2",
    "hanzi": "李华",
    "pinyin": "Lǐ Huá",
    "tonePattern": "Nada 3-2.",
    "focus": "Nada 3-2.",
    "meaning": "Nama orang",
    "prompt": "Ucapkan Lǐ Huá dengan Lǐ rendah dan Huá naik.",
    "modelWord": "李华",
    "modelPinyin": "Lǐ Huá",
    "modelMeaning": "nama orang",
    "hint": "Nama keluarga dulu, lalu nama diri.",
    "contrast": "Jangan membalik urutan."
  },
  {
    "id": "read-name-slowly-3",
    "title": "Read Name Slowly 3",
    "hanzi": "张伟",
    "pinyin": "Zhāng Wěi",
    "tonePattern": "Nada 1-3.",
    "focus": "Nada 1-3.",
    "meaning": "Nama orang",
    "prompt": "Ucapkan Zhāng Wěi dengan Zhang datar dan Wei rendah.",
    "modelWord": "张伟",
    "modelPinyin": "Zhāng Wěi",
    "modelMeaning": "nama orang",
    "hint": "zh retrofleks, bukan z biasa.",
    "contrast": "Jangan membaca Zhang seperti jang Indonesia."
  },
  {
    "id": "read-name-slowly-4",
    "title": "Read Name Slowly 4",
    "hanzi": "马丽",
    "pinyin": "Mǎ Lì",
    "tonePattern": "Nada 3-4.",
    "focus": "Nada 3-4.",
    "meaning": "Nama orang",
    "prompt": "Ucapkan Mǎ Lì dengan ma rendah lalu li jatuh.",
    "modelWord": "马丽",
    "modelPinyin": "Mǎ Lì",
    "modelMeaning": "nama orang",
    "hint": "Kontras rendah lalu jatuh harus jelas.",
    "contrast": "Jangan membuat Lì naik."
  }
];

export default function MandarinPinyinTopik18Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
