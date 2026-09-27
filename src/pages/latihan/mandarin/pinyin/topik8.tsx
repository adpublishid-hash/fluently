import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-third-tone-sandhi-basics",
  "title": "Pīnyīn 8: Third Tone Sandhi Basics",
  "description": "Melatih perubahan nada ketiga saat bertemu nada ketiga lain.",
  "topicNumber": 8,
  "focus": "Nada 3 + nada 3 menjadi 2 + 3.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "third-tone-sandhi-basics-1",
    "title": "Third Tone Sandhi Basics 1",
    "hanzi": "你好",
    "pinyin": "ní hǎo",
    "tonePattern": "nǐ berubah terdengar seperti ní sebelum hǎo.",
    "focus": "nǐ berubah terdengar seperti ní sebelum hǎo.",
    "meaning": "Halo",
    "prompt": "Ucapkan ní hǎo, bukan nǐ hǎo penuh.",
    "modelWord": "你好",
    "modelPinyin": "ní hǎo",
    "modelMeaning": "halo",
    "hint": "Suku kata pertama naik, kedua tetap rendah.",
    "contrast": "Jangan membaca dua nada 3 penuh."
  },
  {
    "id": "third-tone-sandhi-basics-2",
    "title": "Third Tone Sandhi Basics 2",
    "hanzi": "很好",
    "pinyin": "hén hǎo",
    "tonePattern": "hěn berubah seperti hén sebelum hǎo.",
    "focus": "hěn berubah seperti hén sebelum hǎo.",
    "meaning": "Sangat baik",
    "prompt": "Ucapkan hén hǎo dengan hén naik natural.",
    "modelWord": "很好",
    "modelPinyin": "hén hǎo",
    "modelMeaning": "sangat baik",
    "hint": "Ini aturan sandhi, tulisannya tetap hěn hǎo.",
    "contrast": "Jangan memaksa hěn rendah penuh."
  },
  {
    "id": "third-tone-sandhi-basics-3",
    "title": "Third Tone Sandhi Basics 3",
    "hanzi": "我有",
    "pinyin": "wó yǒu",
    "tonePattern": "wǒ berubah naik sebelum yǒu.",
    "focus": "wǒ berubah naik sebelum yǒu.",
    "meaning": "Saya punya",
    "prompt": "Ucapkan wó yǒu dengan transisi halus.",
    "modelWord": "我有",
    "modelPinyin": "wó yǒu",
    "modelMeaning": "saya punya",
    "hint": "Fokus perubahan suara, bukan ejaan.",
    "contrast": "Jangan mengubah hanzi atau makna."
  },
  {
    "id": "third-tone-sandhi-basics-4",
    "title": "Third Tone Sandhi Basics 4",
    "hanzi": "可以",
    "pinyin": "kěyǐ",
    "tonePattern": "Nada 3 berurutan dalam satu kata.",
    "focus": "Nada 3 berurutan dalam satu kata.",
    "meaning": "Boleh/bisa",
    "prompt": "Ucapkan kéyǐ dalam alur natural.",
    "modelWord": "可以",
    "modelPinyin": "kéyǐ",
    "modelMeaning": "boleh; bisa",
    "hint": "Suku pertama naik, suku kedua rendah.",
    "contrast": "Jangan membaca kě yǐ terpisah penuh."
  }
];

export default function MandarinPinyinTopik8Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
