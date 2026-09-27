import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-places-and-directions",
  "title": "Yuèdú 6: Places and Directions",
  "description": "Membaca lokasi dan arah sederhana dalam kalimat pendek.",
  "topicNumber": 6,
  "focus": "Tempat dan arah.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "places-and-directions-1",
    "title": "Places and Directions 1",
    "focus": "Location",
    "passageHanzi": "商店在学校旁边。",
    "passagePinyin": "Shāngdiàn zài xuéxiào pángbiān.",
    "passageMeaning": "Toko ada di samping sekolah.",
    "question": "Toko berada di mana?",
    "answer": "学校旁边 / samping sekolah",
    "hint": "Cari setelah 在.",
    "keywords": [
      "商店",
      "学校",
      "旁边"
    ],
    "explanation": "在学校旁边 berarti berada di samping sekolah."
  },
  {
    "id": "places-and-directions-2",
    "title": "Places and Directions 2",
    "focus": "Location",
    "passageHanzi": "医院不远。我们走路去。",
    "passagePinyin": "Yīyuàn bù yuǎn. Wǒmen zǒulù qù.",
    "passageMeaning": "Rumah sakit tidak jauh. Kami pergi berjalan kaki.",
    "question": "Apakah rumah sakit jauh?",
    "answer": "不远 / tidak jauh",
    "hint": "Cari kata negatif 不.",
    "keywords": [
      "医院",
      "不远",
      "走路"
    ],
    "explanation": "不远 secara langsung berarti tidak jauh."
  },
  {
    "id": "places-and-directions-3",
    "title": "Places and Directions 3",
    "focus": "Direction",
    "passageHanzi": "请往左走，再往右走。",
    "passagePinyin": "Qǐng wǎng zuǒ zǒu, zài wǎng yòu zǒu.",
    "passageMeaning": "Silakan jalan ke kiri, lalu ke kanan.",
    "question": "Arah pertama apa?",
    "answer": "左 / kiri",
    "hint": "Cari arah setelah 往 pertama.",
    "keywords": [
      "请",
      "左",
      "右"
    ],
    "explanation": "Arah pertama adalah 往左走."
  },
  {
    "id": "places-and-directions-4",
    "title": "Places and Directions 4",
    "focus": "Place",
    "passageHanzi": "我在图书馆看书。",
    "passagePinyin": "Wǒ zài túshūguǎn kàn shū.",
    "passageMeaning": "Saya membaca buku di perpustakaan.",
    "question": "Di mana ia membaca?",
    "answer": "图书馆 / perpustakaan",
    "hint": "Cari tempat setelah 在.",
    "keywords": [
      "图书馆",
      "看书"
    ],
    "explanation": "在图书馆 menunjukkan tempat aktivitas membaca."
  }
];

export default function MandarinYueduTopik6Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
