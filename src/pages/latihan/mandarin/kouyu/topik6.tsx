import { MandarinKouyuPracticePage, type MandarinKouyuDrill, type MandarinKouyuTopicMaterial } from '../../components/MandarinKouyuPracticePage';

const material: MandarinKouyuTopicMaterial = {
  "id": "mandarin-kouyu-numbers-age-and-quantity",
  "title": "Kǒuyǔ 6: Numbers, Age and Quantity",
  "description": "Melatih berbicara tentang umur, jumlah, nomor, dan benda sehari-hari.",
  "topicNumber": 6,
  "focus": "Angka dalam respons lisan.",
  "goal": "Ucapkan angka dengan jelas dalam konteks umur, jumlah, dan nomor telepon."
};

const drills: MandarinKouyuDrill[] = [
  {
    "id": "numbers-age-and-quantity-1",
    "title": "Numbers, Age and Quantity 1",
    "scenario": "Age",
    "prompt": "Jawab pertanyaan 你几岁？ dengan umur sepuluh tahun.",
    "role": "You answer age.",
    "modelHanzi": "我十岁。",
    "modelPinyin": "Wǒ shí suì.",
    "modelMeaning": "Saya sepuluh tahun.",
    "starter": "我...岁。",
    "hint": "Letakkan angka sebelum 岁.",
    "checklist": [
      "十 terdengar jelas.",
      "岁 tidak terlalu panjang.",
      "Jawaban langsung."
    ],
    "followUp": "Ganti 十 dengan umurmu."
  },
  {
    "id": "numbers-age-and-quantity-2",
    "title": "Numbers, Age and Quantity 2",
    "scenario": "Quantity",
    "prompt": "Katakan kamu punya tiga buku.",
    "role": "You mention quantity.",
    "modelHanzi": "我有三本书。",
    "modelPinyin": "Wǒ yǒu sān běn shū.",
    "modelMeaning": "Saya punya tiga buku.",
    "starter": "我有...本书。",
    "hint": "本 adalah kata ukur untuk buku.",
    "checklist": [
      "三 jelas sebagai angka.",
      "本书 menjadi frasa benda.",
      "有 terdengar setelah 我."
    ],
    "followUp": "Coba angka lain: 一本书, 两本书."
  },
  {
    "id": "numbers-age-and-quantity-3",
    "title": "Numbers, Age and Quantity 3",
    "scenario": "Phone",
    "prompt": "Sebutkan nomor telepon pendek 1234.",
    "role": "You say a short number.",
    "modelHanzi": "我的电话是一二三四。",
    "modelPinyin": "Wǒ de diànhuà shì yī èr sān sì.",
    "modelMeaning": "Nomor telepon saya adalah 1234.",
    "starter": "我的电话是...",
    "hint": "Sebut angka satu per satu.",
    "checklist": [
      "电话 jelas.",
      "Angka tidak digabung terlalu cepat.",
      "四 tidak terdengar seperti 十."
    ],
    "followUp": "Latih dengan nomor berbeda."
  },
  {
    "id": "numbers-age-and-quantity-4",
    "title": "Numbers, Age and Quantity 4",
    "scenario": "Quantity",
    "prompt": "Katakan kelasmu punya delapan siswa.",
    "role": "You describe class size.",
    "modelHanzi": "我们班有八个学生。",
    "modelPinyin": "Wǒmen bān yǒu bā gè xuésheng.",
    "modelMeaning": "Kelas kami punya delapan siswa.",
    "starter": "我们班有...个学生。",
    "hint": "个 dipakai sebagai kata ukur umum.",
    "checklist": [
      "我们班 jelas.",
      "八个学生 terdengar sebagai satu informasi.",
      "Kalimat selesai natural."
    ],
    "followUp": "Ganti 八 dengan jumlah lain."
  }
];

export default function MandarinKouyuTopik6Page() {
  return <MandarinKouyuPracticePage material={material} drills={drills} />;
}
