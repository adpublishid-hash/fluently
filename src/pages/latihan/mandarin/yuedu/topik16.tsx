import { MandarinYueduPracticePage, type MandarinYueduDrill, type MandarinYueduTopicMaterial } from '../../components/MandarinYueduPracticePage';

const material: MandarinYueduTopicMaterial = {
  "id": "mandarin-yuedu-school-announcements",
  "title": "Yuèdú 16: School Announcements",
  "description": "Membaca pengumuman sekolah singkat tentang kelas dan kegiatan.",
  "topicNumber": 16,
  "focus": "Pengumuman sekolah.",
  "goal": "Baca Hanzi dulu, cari keyword, jawab pertanyaan, lalu cek arti dan penjelasannya."
};

const drills: MandarinYueduDrill[] = [
  {
    "id": "school-announcements-1",
    "title": "School Announcements 1",
    "focus": "Announcement",
    "passageHanzi": "明天没有中文课。老师不在学校。",
    "passagePinyin": "Míngtiān méiyǒu Zhōngwén kè. Lǎoshī bú zài xuéxiào.",
    "passageMeaning": "Besok tidak ada kelas Mandarin. Guru tidak berada di sekolah.",
    "question": "Apakah besok ada kelas Mandarin?",
    "answer": "没有 / tidak ada",
    "hint": "Cari 没有中文课.",
    "keywords": [
      "明天",
      "没有中文课",
      "老师"
    ],
    "explanation": "没有中文课 berarti tidak ada kelas Mandarin."
  },
  {
    "id": "school-announcements-2",
    "title": "School Announcements 2",
    "focus": "Announcement",
    "passageHanzi": "请学生八点到教室。",
    "passagePinyin": "Qǐng xuésheng bā diǎn dào jiàoshì.",
    "passageMeaning": "Mohon siswa datang ke kelas jam delapan.",
    "question": "Jam berapa siswa harus datang?",
    "answer": "八点 / jam delapan",
    "hint": "Cari angka sebelum 到.",
    "keywords": [
      "学生",
      "八点",
      "教室"
    ],
    "explanation": "八点到教室 berarti tiba di kelas jam delapan."
  },
  {
    "id": "school-announcements-3",
    "title": "School Announcements 3",
    "focus": "Announcement",
    "passageHanzi": "今天考试。请带笔。",
    "passagePinyin": "Jīntiān kǎoshì. Qǐng dài bǐ.",
    "passageMeaning": "Hari ini ujian. Mohon bawa pena.",
    "question": "Apa yang harus dibawa?",
    "answer": "笔 / pena",
    "hint": "Cari 请带.",
    "keywords": [
      "今天",
      "考试",
      "带笔"
    ],
    "explanation": "请带笔 berarti mohon bawa pena."
  },
  {
    "id": "school-announcements-4",
    "title": "School Announcements 4",
    "focus": "Announcement",
    "passageHanzi": "图书馆星期天不开门。",
    "passagePinyin": "Túshūguǎn xīngqītiān bù kāi mén.",
    "passageMeaning": "Perpustakaan tidak buka pada hari Minggu.",
    "question": "Kapan perpustakaan tidak buka?",
    "answer": "星期天 / Minggu",
    "hint": "Cari 不开门.",
    "keywords": [
      "图书馆",
      "星期天",
      "不开门"
    ],
    "explanation": "星期天不开门 berarti tidak buka pada hari Minggu."
  }
];

export default function MandarinYueduTopik16Page() {
  return <MandarinYueduPracticePage material={material} drills={drills} />;
}
