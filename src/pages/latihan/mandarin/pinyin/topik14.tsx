import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-finals-ai-ei-ao-ou",
  "title": "Pīnyīn 14: Finals ai ei ao ou",
  "description": "Melatih diftong dasar ai, ei, ao, dan ou dengan transisi vokal jelas.",
  "topicNumber": 14,
  "focus": "Final diftong: ai ei ao ou.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "finals-ai-ei-ao-ou-1",
    "title": "Finals ai ei ao ou 1",
    "hanzi": "来",
    "pinyin": "lái",
    "tonePattern": "ai bergerak dari a ke i.",
    "focus": "ai bergerak dari a ke i.",
    "meaning": "Datang",
    "prompt": "Ucapkan lái dengan transisi ai jelas.",
    "modelWord": "来",
    "modelPinyin": "lái",
    "modelMeaning": "datang",
    "hint": "Jangan berhenti di la.",
    "contrast": "Bedakan dari lēi."
  },
  {
    "id": "finals-ai-ei-ao-ou-2",
    "title": "Finals ai ei ao ou 2",
    "hanzi": "妹",
    "pinyin": "mèi",
    "tonePattern": "ei bergerak dari e ke i.",
    "focus": "ei bergerak dari e ke i.",
    "meaning": "Adik perempuan",
    "prompt": "Ucapkan mèi dengan nada jatuh dan final ei.",
    "modelWord": "妹",
    "modelPinyin": "mèi",
    "modelMeaning": "adik perempuan",
    "hint": "Akhiri dengan sentuhan i.",
    "contrast": "Jangan menjadi mai."
  },
  {
    "id": "finals-ai-ei-ao-ou-3",
    "title": "Finals ai ei ao ou 3",
    "hanzi": "好",
    "pinyin": "hǎo",
    "tonePattern": "ao bergerak dari a ke o.",
    "focus": "ao bergerak dari a ke o.",
    "meaning": "Baik",
    "prompt": "Ucapkan hǎo dengan diftong penuh.",
    "modelWord": "好",
    "modelPinyin": "hǎo",
    "modelMeaning": "baik",
    "hint": "Jangan hilangkan bagian o.",
    "contrast": "Bedakan dari hǎ."
  },
  {
    "id": "finals-ai-ei-ao-ou-4",
    "title": "Finals ai ei ao ou 4",
    "hanzi": "口",
    "pinyin": "kǒu",
    "tonePattern": "ou bergerak dari o ke u.",
    "focus": "ou bergerak dari o ke u.",
    "meaning": "Mulut",
    "prompt": "Ucapkan kǒu dengan bibir membulat di akhir.",
    "modelWord": "口",
    "modelPinyin": "kǒu",
    "modelMeaning": "mulut",
    "hint": "Akhiri dengan u ringan.",
    "contrast": "Jangan menjadi ko."
  }
];

export default function MandarinPinyinTopik14Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
