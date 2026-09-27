import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-family-conversations",
  "title": "Kǒuyǔ 4: Family Conversations",
  "description": "Melatih percakapan tentang keluarga, anggota keluarga, dan jumlah orang di rumah.",
  "topicNumber": 4,
  "focus": "Keluarga dan relasi.",
  "goal": "Ucapkan informasi keluarga dengan pola 有, 是, dan 的."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "family-conversations-1",
    "title": "Family Conversations 1",
    "scenario": "Family",
    "prompt": "Katakan keluargamu ada empat orang.",
    "role": "You describe family size.",
    "modelHanzi": "我家有四口人。",
    "modelPinyin": "Wǒ jiā yǒu sì kǒu rén.",
    "modelMeaning": "Keluarga saya ada empat orang.",
    "starter": "我家有...口人。",
    "hint": "口 dipakai untuk jumlah anggota keluarga.",
    "checklist": [
      "我家 terdengar sebagai satu frasa.",
      "Angka jelas sebelum 口人.",
      "Kalimat tidak terlalu cepat."
    ],
    "followUp": "Ganti 四 dengan jumlah keluargamu."
  },
  {
    "id": "family-conversations-2",
    "title": "Family Conversations 2",
    "scenario": "Family",
    "prompt": "Perkenalkan ibumu secara sederhana.",
    "role": "You introduce your mother.",
    "modelHanzi": "这是我的妈妈。",
    "modelPinyin": "Zhè shì wǒ de māma.",
    "modelMeaning": "Ini ibu saya.",
    "starter": "这是我的...",
    "hint": "Gunakan 这是 untuk memperkenalkan orang dekat.",
    "checklist": [
      "这 dan 是 tidak menyatu terlalu kabur.",
      "我的 jelas sebelum anggota keluarga.",
      "妈妈 bernada ringan."
    ],
    "followUp": "Tambahkan 她很好 untuk variasi."
  },
  {
    "id": "family-conversations-3",
    "title": "Family Conversations 3",
    "scenario": "Family Job",
    "prompt": "Katakan ayahmu adalah dokter.",
    "role": "You describe a parent job.",
    "modelHanzi": "我爸爸是医生。",
    "modelPinyin": "Wǒ bàba shì yīshēng.",
    "modelMeaning": "Ayah saya adalah dokter.",
    "starter": "我爸爸是...",
    "hint": "Pola pekerjaan sederhana: orang + 是 + pekerjaan.",
    "checklist": [
      "爸爸 jelas.",
      "是 menjadi penghubung.",
      "医生 diucapkan yīshēng."
    ],
    "followUp": "Ganti 医生 dengan 老师 atau 学生."
  },
  {
    "id": "family-conversations-4",
    "title": "Family Conversations 4",
    "scenario": "Sibling",
    "prompt": "Katakan kamu punya seorang kakak laki-laki.",
    "role": "You mention a sibling.",
    "modelHanzi": "我有一个哥哥。",
    "modelPinyin": "Wǒ yǒu yí gè gēge.",
    "modelMeaning": "Saya punya seorang kakak laki-laki.",
    "starter": "我有一个...",
    "hint": "有 menunjukkan punya/ada.",
    "checklist": [
      "一个 terdengar ringan.",
      "哥哥 tidak tertukar dengan 弟弟.",
      "Kalimat selesai dengan tenang."
    ],
    "followUp": "Coba variasi: 我没有哥哥."
  }
];

export default function MandarinKouyuTopik4Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
