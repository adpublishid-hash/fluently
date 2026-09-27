import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-pairs-1-1-and-1-4",
  "title": "Pīnyīn 6: Tone Pairs 1-1 and 1-4",
  "description": "Melatih pasangan nada dari nada pertama ke nada pertama atau keempat.",
  "topicNumber": 6,
  "focus": "Pasangan nada 1-1 dan 1-4.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-pairs-1-1-and-1-4-1",
    "title": "Tone Pairs 1-1 and 1-4 1",
    "hanzi": "中文",
    "pinyin": "zhōngwén",
    "tonePattern": "Nada 1 lalu nada 2 sebagai pembanding ritme.",
    "focus": "Nada 1 lalu nada 2 sebagai pembanding ritme.",
    "meaning": "Bahasa Mandarin",
    "prompt": "Baca zhōngwén dengan suku pertama rata.",
    "modelWord": "中文",
    "modelPinyin": "zhōngwén",
    "modelMeaning": "Bahasa Mandarin",
    "hint": "Jaga zhōng tetap tinggi sebelum nada kedua naik.",
    "contrast": "Jangan menurunkan zhōng sebelum wén."
  },
  {
    "id": "tone-pairs-1-1-and-1-4-2",
    "title": "Tone Pairs 1-1 and 1-4 2",
    "hanzi": "今天",
    "pinyin": "jīntiān",
    "tonePattern": "Nada 1-1.",
    "focus": "Nada 1-1.",
    "meaning": "Hari ini",
    "prompt": "Ucapkan jīntiān dengan dua nada tinggi rata.",
    "modelWord": "今天",
    "modelPinyin": "jīntiān",
    "modelMeaning": "hari ini",
    "hint": "Kedua suku kata sama-sama stabil.",
    "contrast": "Jangan membuat tiān turun."
  },
  {
    "id": "tone-pairs-1-1-and-1-4-3",
    "title": "Tone Pairs 1-1 and 1-4 3",
    "hanzi": "高兴",
    "pinyin": "gāoxìng",
    "tonePattern": "Nada 1-4.",
    "focus": "Nada 1-4.",
    "meaning": "Senang",
    "prompt": "Ucapkan gāoxìng: gāo rata, xìng jatuh.",
    "modelWord": "高兴",
    "modelPinyin": "gāoxìng",
    "modelMeaning": "senang",
    "hint": "Kontrasnya harus terdengar: garis datar lalu turun.",
    "contrast": "Jangan membuat keduanya datar."
  },
  {
    "id": "tone-pairs-1-1-and-1-4-4",
    "title": "Tone Pairs 1-1 and 1-4 4",
    "hanzi": "生日",
    "pinyin": "shēngrì",
    "tonePattern": "Nada 1-4.",
    "focus": "Nada 1-4.",
    "meaning": "Ulang tahun",
    "prompt": "Ucapkan shēngrì dengan shēng rata lalu rì turun.",
    "modelWord": "生日",
    "modelPinyin": "shēngrì",
    "modelMeaning": "ulang tahun",
    "hint": "Jangan terburu-buru pada rì.",
    "contrast": "Bedakan dari shēngrí yang naik."
  }
];

export default function MandarinPinyinTopik6Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
