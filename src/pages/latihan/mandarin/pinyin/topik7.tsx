import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-pairs-2-2-and-2-4",
  "title": "Pīnyīn 7: Tone Pairs 2-2 and 2-4",
  "description": "Melatih pasangan nada naik-naik dan naik-jatuh dalam kata sehari-hari.",
  "topicNumber": 7,
  "focus": "Pasangan nada 2-2 dan 2-4.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-pairs-2-2-and-2-4-1",
    "title": "Tone Pairs 2-2 and 2-4 1",
    "hanzi": "朋友",
    "pinyin": "péngyǒu",
    "tonePattern": "Nada 2 lalu nada 3.",
    "focus": "Nada 2 lalu nada 3.",
    "meaning": "Teman",
    "prompt": "Ucapkan péngyǒu dengan péng naik dan yǒu rendah.",
    "modelWord": "朋友",
    "modelPinyin": "péngyǒu",
    "modelMeaning": "teman",
    "hint": "Jangan biarkan péng datar.",
    "contrast": "Bedakan dari pēngyǒu."
  },
  {
    "id": "tone-pairs-2-2-and-2-4-2",
    "title": "Tone Pairs 2-2 and 2-4 2",
    "hanzi": "学习",
    "pinyin": "xuéxí",
    "tonePattern": "Nada 2-2.",
    "focus": "Nada 2-2.",
    "meaning": "Belajar",
    "prompt": "Ucapkan xuéxí dengan dua gerakan naik.",
    "modelWord": "学习",
    "modelPinyin": "xuéxí",
    "modelMeaning": "belajar",
    "hint": "Naik kedua jangan terlalu tinggi sampai berteriak.",
    "contrast": "Jangan jatuh di xí."
  },
  {
    "id": "tone-pairs-2-2-and-2-4-3",
    "title": "Tone Pairs 2-2 and 2-4 3",
    "hanzi": "没事",
    "pinyin": "méi shì",
    "tonePattern": "Nada 2-4.",
    "focus": "Nada 2-4.",
    "meaning": "Tidak apa-apa",
    "prompt": "Ucapkan méi shì: méi naik, shì turun.",
    "modelWord": "没事",
    "modelPinyin": "méi shì",
    "modelMeaning": "tidak apa-apa",
    "hint": "Rasakan arah naik lalu jatuh.",
    "contrast": "Jangan membuat shì naik."
  },
  {
    "id": "tone-pairs-2-2-and-2-4-4",
    "title": "Tone Pairs 2-2 and 2-4 4",
    "hanzi": "不客气",
    "pinyin": "bú kèqi",
    "tonePattern": "Sandhi bu sebelum nada 4.",
    "focus": "Sandhi bu sebelum nada 4.",
    "meaning": "Sama-sama",
    "prompt": "Ucapkan bú kèqi dengan bú naik sebelum kè.",
    "modelWord": "不客气",
    "modelPinyin": "bú kèqi",
    "modelMeaning": "sama-sama",
    "hint": "不 berubah menjadi bú sebelum nada 4.",
    "contrast": "Jangan membaca bù kèqi dalam ujaran natural."
  }
];

export default function MandarinPinyinTopik7Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
