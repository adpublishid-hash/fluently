import { MandarinPinyinPracticePage, type MandarinPinyinDrill, type MandarinPinyinTopicMaterial } from '../../components/MandarinPinyinPracticePage';

const material: MandarinPinyinTopicMaterial = {
  "id": "mandarin-pinyin-tone-2-rising",
  "title": "Pīnyīn 2: Tone 2 Rising",
  "description": "Melatih nada kedua yang naik seperti intonasi bertanya singkat.",
  "topicNumber": 2,
  "focus": "Nada kedua: naik dari tengah ke tinggi.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah nada dan pīnyīn sudah jelas."
};

const drills: MandarinPinyinDrill[] = [
  {
    "id": "tone-2-rising-1",
    "title": "Tone 2 Rising 1",
    "hanzi": "麻",
    "pinyin": "má",
    "tonePattern": "Nada 2 naik jelas.",
    "focus": "Nada 2 naik jelas.",
    "meaning": "Rami/kebas",
    "prompt": "Ucapkan má mulai dari pitch tengah lalu naik.",
    "modelWord": "麻",
    "modelPinyin": "má",
    "modelMeaning": "rami; kebas",
    "hint": "Rasakan seperti bertanya “hah?”.",
    "contrast": "Jangan datar seperti mā."
  },
  {
    "id": "tone-2-rising-2",
    "title": "Tone 2 Rising 2",
    "hanzi": "十",
    "pinyin": "shí",
    "tonePattern": "Nada 2 pada final -i.",
    "focus": "Nada 2 pada final -i.",
    "meaning": "Sepuluh",
    "prompt": "Ucapkan shí dengan kenaikan yang halus, bukan teriak.",
    "modelWord": "十",
    "modelPinyin": "shí",
    "modelMeaning": "sepuluh",
    "hint": "Mulai sedang, selesai lebih tinggi.",
    "contrast": "Jangan turun seperti shì."
  },
  {
    "id": "tone-2-rising-3",
    "title": "Tone 2 Rising 3",
    "hanzi": "来",
    "pinyin": "lái",
    "tonePattern": "Nada 2 pada diftong ai.",
    "focus": "Nada 2 pada diftong ai.",
    "meaning": "Datang",
    "prompt": "Ucapkan lái dengan arah naik sampai akhir vokal.",
    "modelWord": "来",
    "modelPinyin": "lái",
    "modelMeaning": "datang",
    "hint": "Bagian akhir harus terasa lebih tinggi.",
    "contrast": "Bedakan dari lāi yang datar."
  },
  {
    "id": "tone-2-rising-4",
    "title": "Tone 2 Rising 4",
    "hanzi": "明",
    "pinyin": "míng",
    "tonePattern": "Nada 2 dengan nasal akhir.",
    "focus": "Nada 2 dengan nasal akhir.",
    "meaning": "Terang; nama",
    "prompt": "Ucapkan míng dengan naik sebelum bunyi -ng selesai.",
    "modelWord": "明",
    "modelPinyin": "míng",
    "modelMeaning": "terang; nama",
    "hint": "Jangan tahan nasal terlalu lama.",
    "contrast": "Jangan menjadi mìng yang jatuh."
  }
];

export default function MandarinPinyinTopik2Page() {
  return <MandarinPinyinPracticePage material={material} drills={drills} />;
}
