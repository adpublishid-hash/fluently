import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-shadowing-mini-dialogue",
  "title": "Pīnyīn 19: Shadowing Mini Dialogue",
  "description": "Melatih tiruan pendek untuk salam, nama, dan respons dasar.",
  "topicNumber": 19,
  "focus": "Shadowing dialog pemula.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "shadowing-mini-dialogue-1",
    "title": "Shadowing Mini Dialogue 1",
    "hanzi": "你好！",
    "pinyin": "Nǐ hǎo!",
    "tonePattern": "Salam pembuka.",
    "focus": "Salam pembuka.",
    "meaning": "Halo!",
    "prompt": "Dengarkan lalu tirukan ritme Nǐ hǎo.",
    "modelWord": "你好！",
    "modelPinyin": "Nǐ hǎo!",
    "modelMeaning": "Halo!",
    "hint": "Ucapkan natural, bukan kata per kata kaku.",
    "contrast": "Jangan membaca dua nada 3 penuh."
  },
  {
    "id": "shadowing-mini-dialogue-2",
    "title": "Shadowing Mini Dialogue 2",
    "hanzi": "我叫李华。",
    "pinyin": "Wǒ jiào Lǐ Huá.",
    "tonePattern": "Kalimat perkenalan.",
    "focus": "Kalimat perkenalan.",
    "meaning": "Nama saya Li Hua.",
    "prompt": "Tirukan Wǒ jiào Lǐ Huá dengan jeda pendek setelah wǒ.",
    "modelWord": "我叫李华。",
    "modelPinyin": "Wǒ jiào Lǐ Huá.",
    "modelMeaning": "Nama saya Li Hua.",
    "hint": "Jaga jiào jatuh jelas.",
    "contrast": "Jangan menekan semua suku kata sama berat."
  },
  {
    "id": "shadowing-mini-dialogue-3",
    "title": "Shadowing Mini Dialogue 3",
    "hanzi": "很高兴认识你。",
    "pinyin": "Hěn gāoxìng rènshi nǐ.",
    "tonePattern": "Frasa sopan.",
    "focus": "Frasa sopan.",
    "meaning": "Senang mengenalmu.",
    "prompt": "Tirukan frasa panjang dengan chunk hěn gāoxìng / rènshi nǐ.",
    "modelWord": "很高兴认识你。",
    "modelPinyin": "Hěn gāoxìng rènshi nǐ.",
    "modelMeaning": "Senang mengenalmu.",
    "hint": "Pecah menjadi dua chunk.",
    "contrast": "Jangan membaca terlalu cepat."
  },
  {
    "id": "shadowing-mini-dialogue-4",
    "title": "Shadowing Mini Dialogue 4",
    "hanzi": "再见！",
    "pinyin": "Zàijiàn!",
    "tonePattern": "Penutup dialog.",
    "focus": "Penutup dialog.",
    "meaning": "Sampai jumpa!",
    "prompt": "Ucapkan zàijiàn dengan nada jatuh lalu jatuh.",
    "modelWord": "再见！",
    "modelPinyin": "Zàijiàn!",
    "modelMeaning": "Sampai jumpa!",
    "hint": "Jaga initial j tetap depan.",
    "contrast": "Jangan menjadi zai-gan."
  }
];

export default function MandarinPinyinTopik19Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
