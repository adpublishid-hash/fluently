import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "airport-security",
  "title": "Airport Security",
  "description": "Instruksi petugas keamanan bandara.",
  "level": "Travel",
  "accent": "Clear public-service English",
  "goal": "Tangkap instruksi singkat dan urutan tindakan.",
  "focus": [
    "boarding pass",
    "take off your jacket",
    "place it in the tray"
  ],
  "lines": [
    {
      "speaker": "Officer",
      "text": "Please have your boarding pass and passport ready.",
      "note": "Preparation instruction"
    },
    {
      "speaker": "Passenger",
      "text": "Sure. Do I need to take my laptop out?",
      "note": "Clarifying question"
    },
    {
      "speaker": "Officer",
      "text": "Yes, please place it in a separate tray.",
      "note": "Specific instruction"
    },
    {
      "speaker": "Passenger",
      "text": "And should I take off my jacket?",
      "note": "Follow-up"
    },
    {
      "speaker": "Officer",
      "text": "Yes, jacket and belt off, please.",
      "note": "Short instruction"
    }
  ],
  "topicNumber": 7
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "airport-security-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Airport Security",
    "options": [
      "Airport Security",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "airport-security-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Officer",
    "options": [
      "Passenger",
      "Narrator",
      "Teacher",
      "Officer"
    ]
  },
  {
    "id": "airport-security-listening-first-response",
    "level": "Basic",
    "prompt": "What does Passenger say near the beginning?",
    "answer": "Sure. Do I need to take my laptop out?",
    "options": [
      "Yes, please place it in a separate tray.",
      "Yes, jacket and belt off, please.",
      "Sure. Do I need to take my laptop out?",
      "Please have your boarding pass and passport ready."
    ]
  },
  {
    "id": "airport-security-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Yes, please place it in a separate tray.\"?",
    "answer": "Officer",
    "options": [
      "Customer service agent",
      "Officer",
      "Passenger",
      "Narrator"
    ]
  },
  {
    "id": "airport-security-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Airport Security\"?",
    "answer": "boarding pass",
    "options": [
      "boarding pass",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "airport-security-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Yes, jacket and belt off, please.",
    "options": [
      "Please have your boarding pass and passport ready.",
      "Sure. Do I need to take my laptop out?",
      "The speaker cancels the plan.",
      "Yes, jacket and belt off, please."
    ]
  },
  {
    "id": "airport-security-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Please have your boarding pass and passport ready.\"?",
    "answer": "Preparation instruction",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Preparation instruction",
      "Closing thanks"
    ]
  },
  {
    "id": "airport-security-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Yes, please place it in a separate tray.\"?",
    "answer": "And should I take off my jacket?",
    "options": [
      "Yes, please place it in a separate tray.",
      "And should I take off my jacket?",
      "Please have your boarding pass and passport ready.",
      "Sure. Do I need to take my laptop out?"
    ]
  },
  {
    "id": "airport-security-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Tangkap instruksi singkat dan urutan tindakan.",
    "options": [
      "Tangkap instruksi singkat dan urutan tindakan.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "airport-security-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "take off your jacket",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "take off your jacket"
    ]
  },
  {
    "id": "airport-security-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "place it in the tray",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "place it in the tray",
      "Let me sleep on it"
    ]
  },
  {
    "id": "airport-security-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Yes, jacket and belt off, please.\"?",
    "answer": "Short instruction",
    "options": [
      "A topic change",
      "Short instruction",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "airport-security-listening-inference",
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

export default function EnglishListeningTopik7Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
