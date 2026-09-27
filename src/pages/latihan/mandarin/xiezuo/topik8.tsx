import { MandarinXiezuoPracticePage, type MandarinXiezuoDrill, type MandarinXiezuoTopicMaterial } from '../../components/MandarinXiezuoPracticePage';

const material: MandarinXiezuoTopicMaterial = {
  "id": "mandarin-xiezuo-location-with-zai",
  "title": "Xiězuò 8: Location with 在",
  "description": "Melatih kalimat lokasi dengan 在 dan tempat umum.",
  "topicNumber": 8,
  "focus": "Lokasi tertulis.",
  "goal": "Tulis jawabanmu dulu, lalu bandingkan dengan model Hanzi, pinyin, dan arti."
};

const drills: MandarinXiezuoDrill[] = [
  {
    "id": "location-with-zai-1",
    "title": "Location with 在 1",
    "mode": "Sentence Build",
    "hanzi": "我在学校。",
    "pinyin": "wǒ zài xuéxiào.",
    "meaning": "Saya di sekolah.",
    "prompt": "Tulis “Saya di sekolah”.",
    "targetPattern": "我 + 在 + 学校",
    "modelAnswer": "我在学校。",
    "modelPinyin": "Wǒ zài xuéxiào.",
    "modelMeaning": "Saya di sekolah.",
    "hint": "Lokasi setelah 在.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "location-with-zai-2",
    "title": "Location with 在 2",
    "mode": "Sentence Build",
    "hanzi": "她在家。",
    "pinyin": "tā zài jiā.",
    "meaning": "Dia di rumah.",
    "prompt": "Tulis “Dia di rumah” dengan subjek perempuan.",
    "targetPattern": "她 + 在 + 家",
    "modelAnswer": "她在家。",
    "modelPinyin": "Tā zài jiā.",
    "modelMeaning": "Dia di rumah.",
    "hint": "家 berarti rumah.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "location-with-zai-3",
    "title": "Location with 在 3",
    "mode": "Sentence Build",
    "hanzi": "医生在医院。",
    "pinyin": "yīshēng zài yīyuàn.",
    "meaning": "Dokter ada di rumah sakit.",
    "prompt": "Tulis “Dokter ada di rumah sakit”.",
    "targetPattern": "医生 + 在 + 医院",
    "modelAnswer": "医生在医院。",
    "modelPinyin": "Yīshēng zài yīyuàn.",
    "modelMeaning": "Dokter ada di rumah sakit.",
    "hint": "医院 berarti rumah sakit.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  },
  {
    "id": "location-with-zai-4",
    "title": "Location with 在 4",
    "mode": "Sentence Build",
    "hanzi": "老师在教室。",
    "pinyin": "lǎoshī zài jiàoshì.",
    "meaning": "Guru ada di kelas.",
    "prompt": "Tulis “Guru ada di kelas”.",
    "targetPattern": "老师 + 在 + 教室",
    "modelAnswer": "老师在教室。",
    "modelPinyin": "Lǎoshī zài jiàoshì.",
    "modelMeaning": "Guru ada di kelas.",
    "hint": "教室 berarti ruang kelas.",
    "checklist": [
      "Urutan kata sesuai pola target.",
      "Hanzi utama ditulis lengkap tanpa tertukar.",
      "Pinyin dan arti cocok dengan kalimat model."
    ]
  }
];

export default function MandarinXiezuoTopik8Page() {
  return <MandarinXiezuoPracticePage material={material} drills={drills} />;
}
