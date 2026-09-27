import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-places-and-directions",
  "title": "Tīnglì 6: Places and Directions",
  "description": "Melatih tempat umum, lokasi, dan arah sederhana dalam audio.",
  "topicNumber": 6,
  "focus": "Tempat dan arah.",
  "goal": "Tangkap nama tempat dan arah yang disebut, lalu bandingkan dengan transcript."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "places-and-directions-1",
    "title": "Places and Directions 1",
    "focus": "Place",
    "audioHanzi": "银行在学校旁边。",
    "audioPinyin": "Yínháng zài xuéxiào pángbiān.",
    "audioMeaning": "Bank ada di sebelah sekolah.",
    "question": "Di mana bank berada?",
    "answer": "学校旁边 / sebelah sekolah",
    "hint": "Dengarkan frasa setelah 在.",
    "keywords": [
      "银行",
      "学校",
      "旁边"
    ],
    "explanation": "在 menunjukkan lokasi, dan lokasinya 学校旁边."
  },
  {
    "id": "places-and-directions-2",
    "title": "Places and Directions 2",
    "focus": "Direction",
    "audioHanzi": "请往左走。",
    "audioPinyin": "Qǐng wǎng zuǒ zǒu.",
    "audioMeaning": "Silakan jalan ke kiri.",
    "question": "Arah mana yang disebut?",
    "answer": "左 / kiri",
    "hint": "Dengarkan kata arah setelah 往.",
    "keywords": [
      "往",
      "左",
      "走"
    ],
    "explanation": "左 berarti kiri."
  },
  {
    "id": "places-and-directions-3",
    "title": "Places and Directions 3",
    "focus": "Place",
    "audioHanzi": "我在图书馆学习。",
    "audioPinyin": "Wǒ zài túshūguǎn xuéxí.",
    "audioMeaning": "Saya belajar di perpustakaan.",
    "question": "Di mana pembicara belajar?",
    "answer": "图书馆 / perpustakaan",
    "hint": "Dengarkan tempat setelah 在.",
    "keywords": [
      "在",
      "图书馆",
      "学习"
    ],
    "explanation": "图书馆 berarti perpustakaan."
  },
  {
    "id": "places-and-directions-4",
    "title": "Places and Directions 4",
    "focus": "Direction",
    "audioHanzi": "医院在前面。",
    "audioPinyin": "Yīyuàn zài qiánmiàn.",
    "audioMeaning": "Rumah sakit ada di depan.",
    "question": "Rumah sakit ada di mana?",
    "answer": "前面 / depan",
    "hint": "Dengarkan lokasi setelah 在.",
    "keywords": [
      "医院",
      "在",
      "前面"
    ],
    "explanation": "前面 berarti bagian depan."
  }
];

export default function MandarinTingliTopik6Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
