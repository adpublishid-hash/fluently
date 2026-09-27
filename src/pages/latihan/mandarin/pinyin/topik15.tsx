import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-finals-an-en-ang-eng",
  "title": "Pīnyīn 15: Finals an en ang eng",
  "description": "Melatih nasal depan dan belakang dalam final an, en, ang, dan eng.",
  "topicNumber": 15,
  "focus": "Final nasal: -n dan -ng.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "finals-an-en-ang-eng-1",
    "title": "Finals an en ang eng 1",
    "hanzi": "看",
    "pinyin": "kàn",
    "tonePattern": "an berakhir dengan n depan.",
    "focus": "an berakhir dengan n depan.",
    "meaning": "Melihat",
    "prompt": "Ucapkan kàn dan tutup dengan n ringan.",
    "modelWord": "看",
    "modelPinyin": "kàn",
    "modelMeaning": "melihat",
    "hint": "Lidah menyentuh depan untuk n.",
    "contrast": "Bedakan dari kàng."
  },
  {
    "id": "finals-an-en-ang-eng-2",
    "title": "Finals an en ang eng 2",
    "hanzi": "人",
    "pinyin": "rén",
    "tonePattern": "en berakhir dengan n.",
    "focus": "en berakhir dengan n.",
    "meaning": "Orang",
    "prompt": "Ucapkan rén dengan final en bersih.",
    "modelWord": "人",
    "modelPinyin": "rén",
    "modelMeaning": "orang",
    "hint": "Akhiri di depan mulut.",
    "contrast": "Jangan menjadi réng."
  },
  {
    "id": "finals-an-en-ang-eng-3",
    "title": "Finals an en ang eng 3",
    "hanzi": "忙",
    "pinyin": "máng",
    "tonePattern": "ang berakhir dengan ng belakang.",
    "focus": "ang berakhir dengan ng belakang.",
    "meaning": "Sibuk",
    "prompt": "Ucapkan máng dengan nasal belakang.",
    "modelWord": "忙",
    "modelPinyin": "máng",
    "modelMeaning": "sibuk",
    "hint": "Bagian akhir terasa di belakang lidah.",
    "contrast": "Bedakan dari mán."
  },
  {
    "id": "finals-an-en-ang-eng-4",
    "title": "Finals an en ang eng 4",
    "hanzi": "冷",
    "pinyin": "lěng",
    "tonePattern": "eng berakhir dengan ng.",
    "focus": "eng berakhir dengan ng.",
    "meaning": "Dingin",
    "prompt": "Ucapkan lěng rendah dengan nasal belakang.",
    "modelWord": "冷",
    "modelPinyin": "lěng",
    "modelMeaning": "dingin",
    "hint": "Jangan menutup dengan n depan.",
    "contrast": "Bedakan dari lěn."
  }
];

export default function MandarinPinyinTopik15Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
