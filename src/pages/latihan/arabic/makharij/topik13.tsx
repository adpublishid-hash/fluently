import { ArabicMakharijPracticePage, type ArabicMakharijDrill, type ArabicMakharijTopicMaterial } from '../../components/ArabicMakharijPracticePage';

const material: ArabicMakharijTopicMaterial = {
  "id": "arabic-makharij-ain-dan-ha",
  "title": "Makharij 13: Ain dan Ha",
  "description": "Membedakan ع، ح، ه agar tidak tertukar.",
  "topicNumber": 13,
  "focus": "Kontras tenggorokan tengah dan ha ringan.",
  "goal": "Dengarkan model, ucapkan pelan, lalu nilai apakah bunyimu sudah jelas dan stabil."
};

const drills: ArabicMakharijDrill[] = [
  {
    "id": "ain-dan-ha-1",
    "title": "Ain kuat",
    "letter": "ع",
    "transliteration": "ain",
    "place": "Tenggorokan tengah dengan suara tertahan.",
    "meaning": "Ain khas Arab.",
    "prompt": "Ucapkan ع dalam kata عَيْنٌ, lalu rasakan titik keluarnya.",
    "modelWord": "عَيْنٌ",
    "modelTransliteration": "ainun",
    "modelMeaning": "mata",
    "hint": "Jangan seperti hamzah biasa. Fokus: Tenggorokan tengah dengan suara tertahan.",
    "contrast": "Jangan seperti hamzah biasa."
  },
  {
    "id": "ain-dan-ha-2",
    "title": "Ha kuat",
    "letter": "ح",
    "transliteration": "ha",
    "place": "Tenggorokan tengah dengan napas kuat.",
    "meaning": "Ha tanpa titik yang kering.",
    "prompt": "Ucapkan ح dalam kata حَقٌّ, lalu rasakan titik keluarnya.",
    "modelWord": "حَقٌّ",
    "modelTransliteration": "haqqun",
    "modelMeaning": "kebenaran",
    "hint": "Bedakan dari ه yang lebih ringan. Fokus: Tenggorokan tengah dengan napas kuat.",
    "contrast": "Bedakan dari ه yang lebih ringan."
  },
  {
    "id": "ain-dan-ha-3",
    "title": "Ha ringan",
    "letter": "ه",
    "transliteration": "ha ringan",
    "place": "Tenggorokan bawah dengan napas lembut.",
    "meaning": "Ha ringan.",
    "prompt": "Ucapkan ه dalam kata هُدًى, lalu rasakan titik keluarnya.",
    "modelWord": "هُدًى",
    "modelTransliteration": "hudan",
    "modelMeaning": "petunjuk",
    "hint": "Jangan ditekan seperti ح. Fokus: Tenggorokan bawah dengan napas lembut.",
    "contrast": "Jangan ditekan seperti ح."
  },
  {
    "id": "ain-dan-ha-4",
    "title": "Pasangan halqi",
    "letter": "ع ح ه",
    "transliteration": "ain ha ha",
    "place": "Latihan kontras tiga huruf tenggorokan.",
    "meaning": "Kontras halqi.",
    "prompt": "Ucapkan ع ح ه dalam kata عَلِمَ حَامِدٌ هُنَا, lalu rasakan titik keluarnya.",
    "modelWord": "عَلِمَ حَامِدٌ هُنَا",
    "modelTransliteration": "alima hamidun huna",
    "modelMeaning": "Hamid tahu di sini",
    "hint": "Ucapkan tiap huruf dari titik yang berbeda. Fokus: Latihan kontras tiga huruf tenggorokan.",
    "contrast": "Ucapkan tiap huruf dari titik yang berbeda."
  }
];

export default function ArabicMakharijTopik13Page() {
  return <ArabicMakharijPracticePage material={material} drills={drills} />;
}
