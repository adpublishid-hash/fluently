import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-pinyin-initials-g-k-h",
  "title": "Pīnyīn 11: Pinyin Initials g k h",
  "description": "Melatih bunyi belakang lidah g, k, dan h.",
  "topicNumber": 11,
  "focus": "Initial belakang lidah: g k h.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "pinyin-initials-g-k-h-1",
    "title": "Pinyin Initials g k h 1",
    "hanzi": "哥",
    "pinyin": "gē",
    "tonePattern": "g tanpa aspirasi kuat.",
    "focus": "g tanpa aspirasi kuat.",
    "meaning": "Kakak laki-laki",
    "prompt": "Ucapkan gē dengan belakang lidah, nada datar.",
    "modelWord": "哥",
    "modelPinyin": "gē",
    "modelMeaning": "kakak laki-laki",
    "hint": "Udara keluar ringan.",
    "contrast": "Bedakan dari kē."
  },
  {
    "id": "pinyin-initials-g-k-h-2",
    "title": "Pinyin Initials g k h 2",
    "hanzi": "渴",
    "pinyin": "kě",
    "tonePattern": "k beraspirasi.",
    "focus": "k beraspirasi.",
    "meaning": "Haus",
    "prompt": "Ucapkan kě dengan hembusan jelas.",
    "modelWord": "渴",
    "modelPinyin": "kě",
    "modelMeaning": "haus",
    "hint": "Rasa udara lebih kuat daripada g.",
    "contrast": "Jangan menjadi gě."
  },
  {
    "id": "pinyin-initials-g-k-h-3",
    "title": "Pinyin Initials g k h 3",
    "hanzi": "好",
    "pinyin": "hǎo",
    "tonePattern": "h Mandarin agak gesek dari tenggorokan atas.",
    "focus": "h Mandarin agak gesek dari tenggorokan atas.",
    "meaning": "Baik",
    "prompt": "Ucapkan hǎo tanpa menjadi ha Indonesia penuh.",
    "modelWord": "好",
    "modelPinyin": "hǎo",
    "modelMeaning": "baik",
    "hint": "Gesekan ringan, mulut rileks.",
    "contrast": "Bedakan dari kǎo."
  },
  {
    "id": "pinyin-initials-g-k-h-4",
    "title": "Pinyin Initials g k h 4",
    "hanzi": "喝",
    "pinyin": "hē",
    "tonePattern": "h dengan final e.",
    "focus": "h dengan final e.",
    "meaning": "Minum",
    "prompt": "Ucapkan hē dengan final e Mandarin yang tepat.",
    "modelWord": "喝",
    "modelPinyin": "hē",
    "modelMeaning": "minum",
    "hint": "Vokal e terdengar seperti “e” belakang, bukan “é”.",
    "contrast": "Jangan menjadi he bahasa Indonesia."
  }
];

export default function MandarinPinyinTopik11Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
