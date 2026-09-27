import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-question-words-in-audio",
  "title": "Tīnglì 18: Question Words in Audio",
  "description": "Melatih mengenali 谁, 什么, 哪儿, 几, dan 怎么 dari pertanyaan lisan.",
  "topicNumber": 18,
  "focus": "Kata tanya dalam audio.",
  "goal": "Dengarkan kata tanya yang muncul, lalu identifikasi jenis informasi yang diminta."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "question-words-in-audio-1",
    "title": "Question Words in Audio 1",
    "focus": "Question Word",
    "audioHanzi": "你叫什么名字？",
    "audioPinyin": "Nǐ jiào shénme míngzi?",
    "audioMeaning": "Siapa namamu?",
    "question": "Kata tanya apa yang terdengar?",
    "answer": "什么 / apa",
    "hint": "Dengarkan kata sebelum 名字.",
    "keywords": [
      "什么",
      "名字"
    ],
    "explanation": "什么 menanyakan nama dalam pola 叫什么名字."
  },
  {
    "id": "question-words-in-audio-2",
    "title": "Question Words in Audio 2",
    "focus": "Question Word",
    "audioHanzi": "她是谁？",
    "audioPinyin": "Tā shì shéi?",
    "audioMeaning": "Dia siapa?",
    "question": "Apa informasi yang ditanyakan?",
    "answer": "Identitas orang / siapa",
    "hint": "Dengarkan kata tanya di akhir.",
    "keywords": [
      "她",
      "是",
      "谁"
    ],
    "explanation": "谁 berarti siapa."
  },
  {
    "id": "question-words-in-audio-3",
    "title": "Question Words in Audio 3",
    "focus": "Question Word",
    "audioHanzi": "你去哪儿？",
    "audioPinyin": "Nǐ qù nǎr?",
    "audioMeaning": "Kamu pergi ke mana?",
    "question": "Apa yang ditanyakan?",
    "answer": "Tempat tujuan",
    "hint": "Dengarkan 哪儿 setelah 去.",
    "keywords": [
      "去",
      "哪儿"
    ],
    "explanation": "哪儿 menanyakan tempat atau tujuan."
  },
  {
    "id": "question-words-in-audio-4",
    "title": "Question Words in Audio 4",
    "focus": "Question Word",
    "audioHanzi": "现在几点？",
    "audioPinyin": "Xiànzài jǐ diǎn?",
    "audioMeaning": "Sekarang jam berapa?",
    "question": "Kata tanya angka apa yang muncul?",
    "answer": "几 / berapa",
    "hint": "Dengarkan kata sebelum 点.",
    "keywords": [
      "现在",
      "几",
      "点"
    ],
    "explanation": "几点 menanyakan jam."
  }
];

export default function MandarinTingliTopik18Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
