import { MandarinTingliPracticePage, type MandarinTingliDrill, type MandarinTingliTopicMaterial } from '../../components/MandarinTingliPracticePage';

const material: MandarinTingliTopicMaterial = {
  "id": "mandarin-tingli-family-introductions",
  "title": "Tīnglì 4: Family Introductions",
  "description": "Melatih anggota keluarga dan hubungan sederhana dari kalimat lisan.",
  "topicNumber": 4,
  "focus": "Keluarga dan relasi.",
  "goal": "Dengarkan kata keluarga utama, jawab siapa yang dibicarakan, lalu cek arti."
};

const drills: MandarinTingliDrill[] = [
  {
    "id": "family-introductions-1",
    "title": "Family Introductions 1",
    "focus": "Family",
    "audioHanzi": "这是我的妈妈。",
    "audioPinyin": "Zhè shì wǒ de māma.",
    "audioMeaning": "Ini ibu saya.",
    "question": "Siapa yang diperkenalkan?",
    "answer": "妈妈 / ibu",
    "hint": "Dengarkan kata keluarga di akhir audio.",
    "keywords": [
      "这",
      "我的",
      "妈妈"
    ],
    "explanation": "妈妈 berarti ibu, jadi yang diperkenalkan adalah ibu."
  },
  {
    "id": "family-introductions-2",
    "title": "Family Introductions 2",
    "focus": "Family",
    "audioHanzi": "我爸爸是医生。",
    "audioPinyin": "Wǒ bàba shì yīshēng.",
    "audioMeaning": "Ayah saya adalah dokter.",
    "question": "Apa pekerjaan ayah?",
    "answer": "医生 / dokter",
    "hint": "Cari kata setelah 是.",
    "keywords": [
      "爸爸",
      "是",
      "医生"
    ],
    "explanation": "医生 berarti dokter, jadi pekerjaan ayah adalah dokter."
  },
  {
    "id": "family-introductions-3",
    "title": "Family Introductions 3",
    "focus": "Family",
    "audioHanzi": "她有一个哥哥。",
    "audioPinyin": "Tā yǒu yí gè gēge.",
    "audioMeaning": "Dia punya seorang kakak laki-laki.",
    "question": "Dia punya siapa?",
    "answer": "哥哥 / kakak laki-laki",
    "hint": "Dengarkan kata setelah 一个.",
    "keywords": [
      "有",
      "一个",
      "哥哥"
    ],
    "explanation": "哥哥 berarti kakak laki-laki."
  },
  {
    "id": "family-introductions-4",
    "title": "Family Introductions 4",
    "focus": "Family",
    "audioHanzi": "我家有四口人。",
    "audioPinyin": "Wǒ jiā yǒu sì kǒu rén.",
    "audioMeaning": "Keluarga saya ada empat orang.",
    "question": "Ada berapa orang di keluarga?",
    "answer": "四口人 / empat orang",
    "hint": "Dengarkan angka sebelum 口人.",
    "keywords": [
      "我家",
      "四",
      "口人"
    ],
    "explanation": "四口人 berarti empat anggota keluarga."
  }
];

export default function MandarinTingliTopik4Page() {
  return <MandarinTingliPracticePage material={material} drills={drills} />;
}
