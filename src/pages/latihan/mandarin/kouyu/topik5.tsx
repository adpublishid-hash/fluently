import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-classroom-speaking",
  "title": "Kǒuyǔ 5: Classroom Speaking",
  "description": "Melatih respons lisan saat belajar di kelas Mandarin.",
  "topicNumber": 5,
  "focus": "Instruksi kelas dan respons siswa.",
  "goal": "Jawab instruksi kelas dengan kalimat pendek yang sopan dan jelas."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "classroom-speaking-1",
    "title": "Classroom Speaking 1",
    "scenario": "Classroom",
    "prompt": "Minta guru mengulang sekali lagi.",
    "role": "You ask for repetition.",
    "modelHanzi": "老师，请再说一遍。",
    "modelPinyin": "Lǎoshī, qǐng zài shuō yí biàn.",
    "modelMeaning": "Guru, tolong katakan sekali lagi.",
    "starter": "老师，请...",
    "hint": "请 membuat permintaan terdengar sopan.",
    "checklist": [
      "老师 sebagai panggilan pembuka.",
      "再说一遍 tidak terpotong.",
      "Intonasi meminta bantuan."
    ],
    "followUp": "Coba lebih pendek: 请再说一遍."
  },
  {
    "id": "classroom-speaking-2",
    "title": "Classroom Speaking 2",
    "scenario": "Classroom",
    "prompt": "Katakan kamu belum mengerti.",
    "role": "You express confusion.",
    "modelHanzi": "我不明白。",
    "modelPinyin": "Wǒ bù míngbai.",
    "modelMeaning": "Saya tidak mengerti.",
    "starter": "我不...",
    "hint": "不 sebelum 明白 membuat bentuk negatif.",
    "checklist": [
      "不明白 jelas.",
      "Tidak perlu menambah banyak kata.",
      "Nada tetap sopan."
    ],
    "followUp": "Tambahkan 对不起 di awal jika perlu."
  },
  {
    "id": "classroom-speaking-3",
    "title": "Classroom Speaking 3",
    "scenario": "Classroom",
    "prompt": "Katakan kamu sudah siap.",
    "role": "You confirm readiness.",
    "modelHanzi": "我准备好了。",
    "modelPinyin": "Wǒ zhǔnbèi hǎo le.",
    "modelMeaning": "Saya sudah siap.",
    "starter": "我准备好了。",
    "hint": "好了 menunjukkan keadaan sudah siap.",
    "checklist": [
      "准备 punya bunyi zhǔn.",
      "好了 diucapkan ringan.",
      "Respons percaya diri."
    ],
    "followUp": "Coba ucapkan setelah guru bertanya 准备好了吗？"
  },
  {
    "id": "classroom-speaking-4",
    "title": "Classroom Speaking 4",
    "scenario": "Classroom",
    "prompt": "Minta izin bertanya.",
    "role": "You ask permission.",
    "modelHanzi": "我可以问一个问题吗？",
    "modelPinyin": "Wǒ kěyǐ wèn yí gè wèntí ma?",
    "modelMeaning": "Boleh saya bertanya satu pertanyaan?",
    "starter": "我可以...吗？",
    "hint": "可以...吗 meminta izin.",
    "checklist": [
      "可以 jelas.",
      "问一个问题 tidak terlalu cepat.",
      "吗 naik sedikit di akhir."
    ],
    "followUp": "Coba versi pendek: 可以问问题吗？"
  }
];

export default function MandarinKouyuTopik5Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
