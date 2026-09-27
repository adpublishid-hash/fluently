import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "doctor-appointment",
  "title": "Doctor Appointment",
  "description": "Pasien menjelaskan gejala ke dokter.",
  "level": "Health",
  "accent": "Clear native English",
  "goal": "Dengar gejala, durasi, dan saran awal.",
  "focus": [
    "How long have you...",
    "mild fever",
    "take it easy"
  ],
  "lines": [
    {
      "speaker": "Doctor",
      "text": "What seems to be the problem today?",
      "note": "Medical opening"
    },
    {
      "speaker": "Patient",
      "text": "I have had a sore throat and a mild fever since Monday.",
      "note": "Symptoms and duration"
    },
    {
      "speaker": "Doctor",
      "text": "Any coughing or trouble breathing?",
      "note": "Follow-up symptoms"
    },
    {
      "speaker": "Patient",
      "text": "A little coughing, but no trouble breathing.",
      "note": "Contrast detail"
    },
    {
      "speaker": "Doctor",
      "text": "Okay. Drink plenty of fluids and take it easy for a couple of days.",
      "note": "Advice"
    }
  ],
  "topicNumber": 4
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "doctor-appointment-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Doctor Appointment",
    "options": [
      "Doctor Appointment",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "doctor-appointment-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Doctor",
    "options": [
      "Patient",
      "Narrator",
      "Teacher",
      "Doctor"
    ]
  },
  {
    "id": "doctor-appointment-listening-first-response",
    "level": "Basic",
    "prompt": "What does Patient say near the beginning?",
    "answer": "I have had a sore throat and a mild fever since Monday.",
    "options": [
      "Any coughing or trouble breathing?",
      "Okay. Drink plenty of fluids and take it easy for a couple of days.",
      "I have had a sore throat and a mild fever since Monday.",
      "What seems to be the problem today?"
    ]
  },
  {
    "id": "doctor-appointment-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Any coughing or trouble breathing?\"?",
    "answer": "Doctor",
    "options": [
      "Customer service agent",
      "Doctor",
      "Patient",
      "Narrator"
    ]
  },
  {
    "id": "doctor-appointment-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Doctor Appointment\"?",
    "answer": "How long have you...",
    "options": [
      "How long have you...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "doctor-appointment-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Okay. Drink plenty of fluids and take it easy for a couple of days.",
    "options": [
      "What seems to be the problem today?",
      "I have had a sore throat and a mild fever since Monday.",
      "The speaker cancels the plan.",
      "Okay. Drink plenty of fluids and take it easy for a couple of days."
    ]
  },
  {
    "id": "doctor-appointment-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"What seems to be the problem today?\"?",
    "answer": "Medical opening",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Medical opening",
      "Closing thanks"
    ]
  },
  {
    "id": "doctor-appointment-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Any coughing or trouble breathing?\"?",
    "answer": "A little coughing, but no trouble breathing.",
    "options": [
      "Any coughing or trouble breathing?",
      "A little coughing, but no trouble breathing.",
      "What seems to be the problem today?",
      "I have had a sore throat and a mild fever since Monday."
    ]
  },
  {
    "id": "doctor-appointment-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Dengar gejala, durasi, dan saran awal.",
    "options": [
      "Dengar gejala, durasi, dan saran awal.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "doctor-appointment-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "mild fever",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "mild fever"
    ]
  },
  {
    "id": "doctor-appointment-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "take it easy",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "take it easy",
      "Let me sleep on it"
    ]
  },
  {
    "id": "doctor-appointment-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Okay. Drink plenty of fluids and take it easy for a couple of days.\"?",
    "answer": "Advice",
    "options": [
      "A topic change",
      "Advice",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "doctor-appointment-listening-inference",
    "level": "Advanced",
    "prompt": "What should you do first in the recommended practice flow?",
    "answer": "Listen without reading.",
    "options": [
      "Listen without reading.",
      "Translate every word first.",
      "Skip the full conversation.",
      "Only read the transcript silently."
    ]
  }
];

export default function EnglishListeningTopik4Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
