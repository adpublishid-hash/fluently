import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-time-and-date-reading",
  "title": "Yuèdú 14: Time and Date Reading",
  "description": "Membaca tanggal, jam, dan urutan kegiatan pendek.",
  "topicNumber": 14,
  "focus": "Waktu dan tanggal.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "time-and-date-reading-1",
    "title": "Time and Date Reading 1",
    "focus": "Clock",
    "passageHanzi": "现在九点。中文课十点开始。",
    "passagePinyin": "Xiànzài jiǔ diǎn. Zhōngwén kè shí diǎn kāishǐ.",
    "passageMeaning": "Sekarang jam sembilan. Kelas Mandarin mulai jam sepuluh.",
    "question": "Jam berapa kelas mulai?",
    "answer": "十点 / jam sepuluh",
    "hint": "Cari 开始.",
    "keywords": [
      "现在",
      "九点",
      "十点开始"
    ],
    "explanation": "十点开始 berarti mulai jam sepuluh."
  },
  {
    "id": "time-and-date-reading-2",
    "title": "Time and Date Reading 2",
    "focus": "Date",
    "passageHanzi": "今天是三月五日。",
    "passagePinyin": "Jīntiān shì sān yuè wǔ rì.",
    "passageMeaning": "Hari ini tanggal 5 Maret.",
    "question": "Tanggal berapa hari ini?",
    "answer": "三月五日 / 5 Maret",
    "hint": "Cari 月 dan 日.",
    "keywords": [
      "今天",
      "三月",
      "五日"
    ],
    "explanation": "三月五日 berarti tanggal 5 bulan Maret."
  },
  {
    "id": "time-and-date-reading-3",
    "title": "Time and Date Reading 3",
    "focus": "Sequence",
    "passageHanzi": "早上我上课，下午我回家。",
    "passagePinyin": "Zǎoshang wǒ shàngkè, xiàwǔ wǒ huí jiā.",
    "passageMeaning": "Pagi hari saya masuk kelas, sore hari saya pulang.",
    "question": "Kapan ia pulang?",
    "answer": "下午 / sore hari",
    "hint": "Cari 回家.",
    "keywords": [
      "早上",
      "上课",
      "下午",
      "回家"
    ],
    "explanation": "下午我回家 berarti sore hari saya pulang."
  },
  {
    "id": "time-and-date-reading-4",
    "title": "Time and Date Reading 4",
    "focus": "Day",
    "passageHanzi": "星期五我们没有考试。",
    "passagePinyin": "Xīngqīwǔ wǒmen méiyǒu kǎoshì.",
    "passageMeaning": "Hari Jumat kami tidak ada ujian.",
    "question": "Apakah ada ujian hari Jumat?",
    "answer": "没有 / tidak ada",
    "hint": "Cari 没有.",
    "keywords": [
      "星期五",
      "没有",
      "考试"
    ],
    "explanation": "没有考试 berarti tidak ada ujian."
  }
];

export default function MandarinYueduTopik14Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
