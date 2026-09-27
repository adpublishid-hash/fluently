import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "hotel-check-in",
  "title": "Hotel Check-in",
  "description": "Dialog resepsionis dan tamu saat check-in.",
  "level": "Travel",
  "accent": "Native service English",
  "goal": "Pahami nama reservasi, dokumen, dan instruksi kamar.",
  "focus": [
    "reservation under...",
    "photo ID",
    "elevator is on your left"
  ],
  "lines": [
    {
      "speaker": "Receptionist",
      "text": "Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?",
      "note": "Greeting and request"
    },
    {
      "speaker": "Guest",
      "text": "Yes, it should be under Daniel Park.",
      "note": "Reservation name"
    },
    {
      "speaker": "Receptionist",
      "text": "Great. May I see a photo ID and a credit card for incidentals?",
      "note": "Common check-in phrase"
    },
    {
      "speaker": "Guest",
      "text": "Of course. Also, is breakfast included?",
      "note": "Follow-up question"
    },
    {
      "speaker": "Receptionist",
      "text": "Yes. It is served from six thirty to ten on the second floor.",
      "note": "Time detail"
    }
  ],
  "topicNumber": 2
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "hotel-check-in-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Hotel Check-in",
    "options": [
      "Hotel Check-in",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "hotel-check-in-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Receptionist",
    "options": [
      "Guest",
      "Narrator",
      "Teacher",
      "Receptionist"
    ]
  },
  {
    "id": "hotel-check-in-listening-first-response",
    "level": "Basic",
    "prompt": "What does Guest say near the beginning?",
    "answer": "Yes, it should be under Daniel Park.",
    "options": [
      "Great. May I see a photo ID and a credit card for incidentals?",
      "Yes. It is served from six thirty to ten on the second floor.",
      "Yes, it should be under Daniel Park.",
      "Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?"
    ]
  },
  {
    "id": "hotel-check-in-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Great. May I see a photo ID and a credit card for incidentals?\"?",
    "answer": "Receptionist",
    "options": [
      "Customer service agent",
      "Receptionist",
      "Guest",
      "Narrator"
    ]
  },
  {
    "id": "hotel-check-in-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Hotel Check-in\"?",
    "answer": "reservation under...",
    "options": [
      "reservation under...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "hotel-check-in-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Yes. It is served from six thirty to ten on the second floor.",
    "options": [
      "Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?",
      "Yes, it should be under Daniel Park.",
      "The speaker cancels the plan.",
      "Yes. It is served from six thirty to ten on the second floor."
    ]
  },
  {
    "id": "hotel-check-in-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?\"?",
    "answer": "Greeting and request",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Greeting and request",
      "Closing thanks"
    ]
  },
  {
    "id": "hotel-check-in-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Great. May I see a photo ID and a credit card for incidentals?\"?",
    "answer": "Of course. Also, is breakfast included?",
    "options": [
      "Great. May I see a photo ID and a credit card for incidentals?",
      "Of course. Also, is breakfast included?",
      "Good evening. Welcome to Blue Harbor Hotel. Do you have a reservation?",
      "Yes, it should be under Daniel Park."
    ]
  },
  {
    "id": "hotel-check-in-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Pahami nama reservasi, dokumen, dan instruksi kamar.",
    "options": [
      "Pahami nama reservasi, dokumen, dan instruksi kamar.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "hotel-check-in-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "photo ID",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "photo ID"
    ]
  },
  {
    "id": "hotel-check-in-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "elevator is on your left",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "elevator is on your left",
      "Let me sleep on it"
    ]
  },
  {
    "id": "hotel-check-in-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Yes. It is served from six thirty to ten on the second floor.\"?",
    "answer": "Time detail",
    "options": [
      "A topic change",
      "Time detail",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "hotel-check-in-listening-inference",
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

export default function EnglishListeningTopik2Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
