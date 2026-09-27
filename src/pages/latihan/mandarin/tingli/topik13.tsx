import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-school-announcements",
  "title": "Tīnglì 13: School Announcements",
  "description": "Melatih pengumuman singkat tentang kelas, ruang, dan kegiatan sekolah.",
  "topicNumber": 13,
  "focus": "Pengumuman sekolah.",
  "goal": "Dengarkan informasi waktu, tempat, atau kegiatan dari pengumuman pendek."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "school-announcements-1",
    "title": "School Announcements 1",
    "focus": "Announcement",
    "audioHanzi": "中文课八点开始。",
    "audioPinyin": "Zhōngwén kè bā diǎn kāishǐ.",
    "audioMeaning": "Kelas Mandarin mulai jam delapan.",
    "question": "Jam berapa kelas mulai?",
    "answer": "八点 / jam delapan",
    "hint": "Dengarkan waktu sebelum 开始.",
    "keywords": [
      "中文课",
      "八点",
      "开始"
    ],
    "explanation": "八点开始 berarti mulai jam delapan."
  },
  {
    "id": "school-announcements-2",
    "title": "School Announcements 2",
    "focus": "Announcement",
    "audioHanzi": "请到三号教室。",
    "audioPinyin": "Qǐng dào sān hào jiàoshì.",
    "audioMeaning": "Silakan datang ke ruang kelas nomor tiga.",
    "question": "Ke ruang kelas nomor berapa?",
    "answer": "三号教室 / ruang kelas nomor tiga",
    "hint": "Dengarkan angka sebelum 号教室.",
    "keywords": [
      "请到",
      "三号",
      "教室"
    ],
    "explanation": "三号教室 berarti ruang kelas nomor tiga."
  },
  {
    "id": "school-announcements-3",
    "title": "School Announcements 3",
    "focus": "Announcement",
    "audioHanzi": "今天没有考试。",
    "audioPinyin": "Jīntiān méiyǒu kǎoshì.",
    "audioMeaning": "Hari ini tidak ada ujian.",
    "question": "Apa yang tidak ada hari ini?",
    "answer": "考试 / ujian",
    "hint": "Dengarkan kata setelah 没有.",
    "keywords": [
      "今天",
      "没有",
      "考试"
    ],
    "explanation": "没有考试 berarti tidak ada ujian."
  },
  {
    "id": "school-announcements-4",
    "title": "School Announcements 4",
    "focus": "Announcement",
    "audioHanzi": "老师在办公室。",
    "audioPinyin": "Lǎoshī zài bàngōngshì.",
    "audioMeaning": "Guru ada di kantor.",
    "question": "Guru ada di mana?",
    "answer": "办公室 / kantor",
    "hint": "Dengarkan lokasi setelah 在.",
    "keywords": [
      "老师",
      "在",
      "办公室"
    ],
    "explanation": "办公室 berarti kantor."
  }
];

export default function MandarinTingliTopik13Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
