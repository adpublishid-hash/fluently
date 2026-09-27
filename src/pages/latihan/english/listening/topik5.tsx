import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "directions",
  "title": "Asking for Directions",
  "description": "Minta arah ke stasiun dan memahami instruksi.",
  "level": "Travel",
  "accent": "Everyday English",
  "goal": "Tangkap belokan, jarak, dan landmark.",
  "focus": [
    "go straight",
    "turn left",
    "you cannot miss it"
  ],
  "lines": [
    {
      "speaker": "Traveler",
      "text": "Excuse me. Is there a train station nearby?",
      "note": "Polite interruption"
    },
    {
      "speaker": "Local",
      "text": "Yes. Go straight for two blocks, then turn left at the bakery.",
      "note": "Directions"
    },
    {
      "speaker": "Traveler",
      "text": "At the bakery, turn left. Got it.",
      "note": "Confirming detail"
    },
    {
      "speaker": "Local",
      "text": "After that, you will see the station across from the park.",
      "note": "Landmark"
    },
    {
      "speaker": "Traveler",
      "text": "Thanks. That is really helpful.",
      "note": "Closing thanks"
    }
  ],
  "topicNumber": 5
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "directions-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Asking for Directions",
    "options": [
      "Asking for Directions",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "directions-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Traveler",
    "options": [
      "Local",
      "Narrator",
      "Teacher",
      "Traveler"
    ]
  },
  {
    "id": "directions-listening-first-response",
    "level": "Basic",
    "prompt": "What does Local say near the beginning?",
    "answer": "Yes. Go straight for two blocks, then turn left at the bakery.",
    "options": [
      "At the bakery, turn left. Got it.",
      "Thanks. That is really helpful.",
      "Yes. Go straight for two blocks, then turn left at the bakery.",
      "Excuse me. Is there a train station nearby?"
    ]
  },
  {
    "id": "directions-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"At the bakery, turn left. Got it.\"?",
    "answer": "Traveler",
    "options": [
      "Customer service agent",
      "Traveler",
      "Local",
      "Narrator"
    ]
  },
  {
    "id": "directions-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Asking for Directions\"?",
    "answer": "go straight",
    "options": [
      "go straight",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "directions-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Thanks. That is really helpful.",
    "options": [
      "Excuse me. Is there a train station nearby?",
      "Yes. Go straight for two blocks, then turn left at the bakery.",
      "The speaker cancels the plan.",
      "Thanks. That is really helpful."
    ]
  },
  {
    "id": "directions-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Excuse me. Is there a train station nearby?\"?",
    "answer": "Polite interruption",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Polite interruption",
      "Closing thanks"
    ]
  },
  {
    "id": "directions-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"At the bakery, turn left. Got it.\"?",
    "answer": "After that, you will see the station across from the park.",
    "options": [
      "At the bakery, turn left. Got it.",
      "After that, you will see the station across from the park.",
      "Excuse me. Is there a train station nearby?",
      "Yes. Go straight for two blocks, then turn left at the bakery."
    ]
  },
  {
    "id": "directions-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Tangkap belokan, jarak, dan landmark.",
    "options": [
      "Tangkap belokan, jarak, dan landmark.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "directions-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "turn left",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "turn left"
    ]
  },
  {
    "id": "directions-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "you cannot miss it",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "you cannot miss it",
      "Let me sleep on it"
    ]
  },
  {
    "id": "directions-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Thanks. That is really helpful.\"?",
    "answer": "Closing thanks",
    "options": [
      "A topic change",
      "Closing thanks",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "directions-listening-inference",
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

export default function EnglishListeningTopik5Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
