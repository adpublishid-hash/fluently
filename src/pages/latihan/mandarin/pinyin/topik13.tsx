import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-finals-i-u-u-umlaut",
  "title": "Pīnyīn 13: Finals i u ü",
  "description": "Melatih final i, u, dan ü, termasuk posisi bibir untuk ü.",
  "topicNumber": 13,
  "focus": "Final i, u, dan ü.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "finals-i-u-u-umlaut-1",
    "title": "Finals i u ü 1",
    "hanzi": "你",
    "pinyin": "nǐ",
    "tonePattern": "Final i terang.",
    "focus": "Final i terang.",
    "meaning": "Kamu",
    "prompt": "Ucapkan nǐ dengan i pendek dan jelas.",
    "modelWord": "你",
    "modelPinyin": "nǐ",
    "modelMeaning": "kamu",
    "hint": "Jangan mengubah i menjadi e.",
    "contrast": "Bedakan dari nǔ."
  },
  {
    "id": "finals-i-u-u-umlaut-2",
    "title": "Finals i u ü 2",
    "hanzi": "不",
    "pinyin": "bù",
    "tonePattern": "Final u dengan bibir bulat.",
    "focus": "Final u dengan bibir bulat.",
    "meaning": "Tidak",
    "prompt": "Ucapkan bù pendek dengan nada jatuh.",
    "modelWord": "不",
    "modelPinyin": "bù",
    "modelMeaning": "tidak",
    "hint": "Bibir bulat sampai akhir.",
    "contrast": "Bedakan dari bì."
  },
  {
    "id": "finals-i-u-u-umlaut-3",
    "title": "Finals i u ü 3",
    "hanzi": "女",
    "pinyin": "nǚ",
    "tonePattern": "Final ü: bibir u, lidah i.",
    "focus": "Final ü: bibir u, lidah i.",
    "meaning": "Perempuan",
    "prompt": "Ucapkan nǚ dengan bibir bulat dan lidah maju.",
    "modelWord": "女",
    "modelPinyin": "nǚ",
    "modelMeaning": "perempuan",
    "hint": "Mulai dari i lalu bulatkan bibir.",
    "contrast": "Bedakan dari nǔ."
  },
  {
    "id": "finals-i-u-u-umlaut-4",
    "title": "Finals i u ü 4",
    "hanzi": "去",
    "pinyin": "qù",
    "tonePattern": "ü setelah q ditulis u.",
    "focus": "ü setelah q ditulis u.",
    "meaning": "Pergi",
    "prompt": "Ucapkan qù sebagai qǜ walau ditulis qu.",
    "modelWord": "去",
    "modelPinyin": "qù",
    "modelMeaning": "pergi",
    "hint": "Setelah j q x, u sebenarnya ü.",
    "contrast": "Jangan membaca seperti ku."
  }
];

export default function MandarinPinyinTopik13Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
