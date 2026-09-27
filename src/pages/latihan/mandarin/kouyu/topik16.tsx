import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-health-and-doctor",
  "title": "Kǒuyǔ 16: Health and Doctor",
  "description": "Melatih keluhan kesehatan, saran sederhana, dan percakapan dokter.",
  "topicNumber": 16,
  "focus": "Kesehatan dan tubuh.",
  "goal": "Ucapkan keluhan pendek dan saran dasar dengan jelas."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "health-and-doctor-1",
    "title": "Health and Doctor 1",
    "scenario": "Health",
    "prompt": "Katakan kepalamu sakit.",
    "role": "You describe symptom.",
    "modelHanzi": "我头疼。",
    "modelPinyin": "Wǒ tóu téng.",
    "modelMeaning": "Kepala saya sakit.",
    "starter": "我...疼。",
    "hint": "疼 berarti sakit.",
    "checklist": [
      "头 jelas.",
      "疼 tidak terlalu panjang.",
      "Keluhan singkat."
    ],
    "followUp": "Coba ganti 头 dengan 肚子 jika sudah tahu."
  },
  {
    "id": "health-and-doctor-2",
    "title": "Health and Doctor 2",
    "scenario": "Health",
    "prompt": "Katakan kamu tidak enak badan.",
    "role": "You feel unwell.",
    "modelHanzi": "我不舒服。",
    "modelPinyin": "Wǒ bù shūfu.",
    "modelMeaning": "Saya tidak enak badan.",
    "starter": "我不...",
    "hint": "不舒服 adalah frasa umum.",
    "checklist": [
      "不舒服 jelas.",
      "Suara tetap tenang.",
      "Kalimat selesai natural."
    ],
    "followUp": "Tambahkan 今天 di awal."
  },
  {
    "id": "health-and-doctor-3",
    "title": "Health and Doctor 3",
    "scenario": "Health Advice",
    "prompt": "Sarankan teman minum lebih banyak air.",
    "role": "You give advice.",
    "modelHanzi": "请多喝水。",
    "modelPinyin": "Qǐng duō hē shuǐ.",
    "modelMeaning": "Tolong minum lebih banyak air.",
    "starter": "请多...",
    "hint": "多喝水 berarti minum lebih banyak air.",
    "checklist": [
      "请 sopan.",
      "多喝水 jelas.",
      "Nada memberi saran."
    ],
    "followUp": "Coba tambah 好好休息."
  },
  {
    "id": "health-and-doctor-4",
    "title": "Health and Doctor 4",
    "scenario": "Doctor",
    "prompt": "Katakan dokter meminta kamu istirahat.",
    "role": "You report advice.",
    "modelHanzi": "医生说我要休息。",
    "modelPinyin": "Yīshēng shuō wǒ yào xiūxi.",
    "modelMeaning": "Dokter bilang saya harus istirahat.",
    "starter": "医生说我...",
    "hint": "要 berarti harus/perlu.",
    "checklist": [
      "医生说 jelas.",
      "我要休息 sebagai isi saran.",
      "Kalimat informatif."
    ],
    "followUp": "Coba versi 医生说多喝水."
  }
];

export default function MandarinKouyuTopik16Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
