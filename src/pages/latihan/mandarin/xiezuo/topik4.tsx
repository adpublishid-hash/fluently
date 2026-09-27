import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-name-and-identity-sentences",
  "title": "Xiězuò 4: Name and Identity Sentences",
  "description": "Melatih kalimat identitas dasar memakai 叫 dan 是.",
  "topicNumber": 4,
  "focus": "Identitas tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "name-and-identity-sentences-1",
    "title": "Name and Identity Sentences 1",
    "mode": "Sentence Build",
    "hanzi": "我叫安娜。",
    "pinyin": "wǒ jiào Ānnà.",
    "meaning": "Saya bernama Anna.",
    "prompt": "Tulis kalimat “Saya bernama Anna” memakai 叫.",
    "targetPattern": "我 + 叫 + nama",
    "modelAnswer": "我叫安娜。",
    "modelPinyin": "Wǒ jiào Ānnà.",
    "modelMeaning": "Saya bernama Anna.",
    "hint": "叫 dipakai untuk menyebut nama.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "name-and-identity-sentences-2",
    "title": "Name and Identity Sentences 2",
    "mode": "Sentence Build",
    "hanzi": "我是老师。",
    "pinyin": "wǒ shì lǎoshī.",
    "meaning": "Saya guru.",
    "prompt": "Tulis “Saya guru” memakai 是.",
    "targetPattern": "我 + 是 + identitas",
    "modelAnswer": "我是老师。",
    "modelPinyin": "Wǒ shì lǎoshī.",
    "modelMeaning": "Saya guru.",
    "hint": "是 menghubungkan subjek dan identitas.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "name-and-identity-sentences-3",
    "title": "Name and Identity Sentences 3",
    "mode": "Sentence Build",
    "hanzi": "他是医生。",
    "pinyin": "tā shì yīshēng.",
    "meaning": "Dia dokter.",
    "prompt": "Tulis “Dia dokter”.",
    "targetPattern": "他 + 是 + 医生",
    "modelAnswer": "他是医生。",
    "modelPinyin": "Tā shì yīshēng.",
    "modelMeaning": "Dia dokter.",
    "hint": "Dokter ditulis 医生.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "name-and-identity-sentences-4",
    "title": "Name and Identity Sentences 4",
    "mode": "Sentence Build",
    "hanzi": "她是学生。",
    "pinyin": "tā shì xuésheng.",
    "meaning": "Dia pelajar.",
    "prompt": "Tulis “Dia pelajar” dengan subjek perempuan.",
    "targetPattern": "她 + 是 + 学生",
    "modelAnswer": "她是学生。",
    "modelPinyin": "Tā shì xuésheng.",
    "modelMeaning": "Dia pelajar.",
    "hint": "Gunakan 她 untuk dia perempuan.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik4Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
