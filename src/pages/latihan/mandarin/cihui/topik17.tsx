import { MandarinCihuiPracticePage, type MandarinCihuiDrill, type MandarinCihuiTopicMaterial } from '../../components/MandarinCihuiPracticePage';

const material: MandarinCihuiTopicMaterial = {
  "id": "mandarin-cihui-body-and-health",
  "title": "Cíhuì 17: Body and Health",
  "description": "Melatih bagian tubuh dan kata kesehatan yang paling sering dipakai.",
  "topicNumber": 17,
  "focus": "Tubuh dan kesehatan.",
  "goal": "Recall Hanzi, pinyin, arti, dan contoh pemakaian sebelum membuka answer bank."
};

const drills: MandarinCihuiDrill[] = [
  {
    "id": "body-and-health-1",
    "title": "Body and Health 1",
    "category": "Body",
    "hanzi": "头",
    "pinyin": "tóu",
    "meaning": "kepala",
    "prompt": "Ingat arti dan pinyin dari “头”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "kepala; tóu",
    "exampleSentence": "我头疼。",
    "examplePinyin": "Wǒ tóu téng.",
    "exampleMeaning": "Kepala saya sakit.",
    "hint": "Petunjuk: kategori kata ini adalah body.",
    "usage": "Bagian tubuh kepala."
  },
  {
    "id": "body-and-health-2",
    "title": "Body and Health 2",
    "category": "Body",
    "hanzi": "手",
    "pinyin": "shǒu",
    "meaning": "tangan",
    "prompt": "Ingat arti dan pinyin dari “手”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "tangan; shǒu",
    "exampleSentence": "他的手很大。",
    "examplePinyin": "Tā de shǒu hěn dà.",
    "exampleMeaning": "Tangannya besar.",
    "hint": "Petunjuk: kategori kata ini adalah body.",
    "usage": "Bagian tubuh tangan."
  },
  {
    "id": "body-and-health-3",
    "title": "Body and Health 3",
    "category": "Body",
    "hanzi": "眼睛",
    "pinyin": "yǎnjing",
    "meaning": "mata",
    "prompt": "Ingat arti dan pinyin dari “眼睛”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "mata; yǎnjing",
    "exampleSentence": "她的眼睛很漂亮。",
    "examplePinyin": "Tā de yǎnjing hěn piàoliang.",
    "exampleMeaning": "Matanya cantik.",
    "hint": "Petunjuk: kategori kata ini adalah body.",
    "usage": "Bagian tubuh mata."
  },
  {
    "id": "body-and-health-4",
    "title": "Body and Health 4",
    "category": "Health",
    "hanzi": "医生",
    "pinyin": "yīshēng",
    "meaning": "dokter",
    "prompt": "Ingat arti dan pinyin dari “医生”. Tulis jawabanmu sebelum membuka answer bank.",
    "answer": "dokter; yīshēng",
    "exampleSentence": "医生在医院。",
    "examplePinyin": "Yīshēng zài yīyuàn.",
    "exampleMeaning": "Dokter ada di rumah sakit.",
    "hint": "Petunjuk: kategori kata ini adalah health.",
    "usage": "Profesi dokter atau tenaga medis."
  }
];

export default function MandarinCihuiTopik17Page() {
  return <MandarinCihuiPracticePage material={material} drills={drills} />;
}
