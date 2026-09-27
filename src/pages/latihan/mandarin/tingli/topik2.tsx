import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-classroom-instructions",
  "title": "Tīnglì 2: Classroom Instructions",
  "description": "Melatih instruksi kelas seperti dengarkan, baca, tulis, dan ulangi.",
  "topicNumber": 2,
  "focus": "Instruksi guru dan respons kelas.",
  "goal": "Dengarkan kata kerja instruksi, tulis tindakan yang diminta, lalu cek transcript."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "classroom-instructions-1",
    "title": "Classroom Instructions 1",
    "focus": "Instruction",
    "audioHanzi": "请听我说。",
    "audioPinyin": "Qǐng tīng wǒ shuō.",
    "audioMeaning": "Tolong dengarkan saya berbicara.",
    "question": "Apa instruksi utama guru?",
    "answer": "听 / dengarkan",
    "hint": "Dengarkan kata kerja setelah 请.",
    "keywords": [
      "请",
      "听",
      "说"
    ],
    "explanation": "听 berarti mendengarkan, jadi instruksinya adalah mendengarkan."
  },
  {
    "id": "classroom-instructions-2",
    "title": "Classroom Instructions 2",
    "focus": "Instruction",
    "audioHanzi": "请看黑板。",
    "audioPinyin": "Qǐng kàn hēibǎn.",
    "audioMeaning": "Tolong lihat papan tulis.",
    "question": "Apa yang harus dilihat siswa?",
    "answer": "黑板 / papan tulis",
    "hint": "Dengarkan benda setelah 看.",
    "keywords": [
      "看",
      "黑板"
    ],
    "explanation": "看 berarti melihat dan 黑板 berarti papan tulis."
  },
  {
    "id": "classroom-instructions-3",
    "title": "Classroom Instructions 3",
    "focus": "Instruction",
    "audioHanzi": "请写你的名字。",
    "audioPinyin": "Qǐng xiě nǐ de míngzi.",
    "audioMeaning": "Tolong tulis namamu.",
    "question": "Apa yang harus ditulis?",
    "answer": "名字 / nama",
    "hint": "Dengarkan objek setelah 写.",
    "keywords": [
      "写",
      "你的",
      "名字"
    ],
    "explanation": "写 berarti menulis, dan yang diminta adalah 名字."
  },
  {
    "id": "classroom-instructions-4",
    "title": "Classroom Instructions 4",
    "focus": "Instruction",
    "audioHanzi": "请再说一遍。",
    "audioPinyin": "Qǐng zài shuō yí biàn.",
    "audioMeaning": "Tolong katakan sekali lagi.",
    "question": "Apa yang diminta guru?",
    "answer": "Mengulang sekali lagi",
    "hint": "Dengarkan frasa 再说一遍.",
    "keywords": [
      "再",
      "说",
      "一遍"
    ],
    "explanation": "再说一遍 berarti mengucapkan atau mengulang sekali lagi."
  }
];

export default function MandarinTingliTopik2Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
