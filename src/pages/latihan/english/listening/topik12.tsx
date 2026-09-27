import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "apartment-viewing",
  "title": "Apartment Viewing",
  "description": "Melihat apartemen dan bertanya fasilitas.",
  "level": "Housing",
  "accent": "Natural city English",
  "goal": "Dengar harga sewa, fasilitas, dan aturan.",
  "focus": [
    "utilities included",
    "laundry room",
    "move in"
  ],
  "lines": [
    {
      "speaker": "Agent",
      "text": "This is a one-bedroom apartment with a lot of natural light.",
      "note": "Description"
    },
    {
      "speaker": "Renter",
      "text": "It looks nice. Are utilities included in the rent?",
      "note": "Cost question"
    },
    {
      "speaker": "Agent",
      "text": "Water is included, but electricity and internet are separate.",
      "note": "Details"
    },
    {
      "speaker": "Renter",
      "text": "Got it. Is there a laundry room in the building?",
      "note": "Facilities"
    },
    {
      "speaker": "Agent",
      "text": "Yes, it is on the first floor, next to the mailboxes.",
      "note": "Location detail"
    }
  ],
  "topicNumber": 12
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "apartment-viewing-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Apartment Viewing",
    "options": [
      "Apartment Viewing",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "apartment-viewing-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Agent",
    "options": [
      "Renter",
      "Narrator",
      "Teacher",
      "Agent"
    ]
  },
  {
    "id": "apartment-viewing-listening-first-response",
    "level": "Basic",
    "prompt": "What does Renter say near the beginning?",
    "answer": "It looks nice. Are utilities included in the rent?",
    "options": [
      "Water is included, but electricity and internet are separate.",
      "Yes, it is on the first floor, next to the mailboxes.",
      "It looks nice. Are utilities included in the rent?",
      "This is a one-bedroom apartment with a lot of natural light."
    ]
  },
  {
    "id": "apartment-viewing-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Water is included, but electricity and internet are separate.\"?",
    "answer": "Agent",
    "options": [
      "Customer service agent",
      "Agent",
      "Renter",
      "Narrator"
    ]
  },
  {
    "id": "apartment-viewing-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Apartment Viewing\"?",
    "answer": "utilities included",
    "options": [
      "utilities included",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "apartment-viewing-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Yes, it is on the first floor, next to the mailboxes.",
    "options": [
      "This is a one-bedroom apartment with a lot of natural light.",
      "It looks nice. Are utilities included in the rent?",
      "The speaker cancels the plan.",
      "Yes, it is on the first floor, next to the mailboxes."
    ]
  },
  {
    "id": "apartment-viewing-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"This is a one-bedroom apartment with a lot of natural light.\"?",
    "answer": "Description",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Description",
      "Closing thanks"
    ]
  },
  {
    "id": "apartment-viewing-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Water is included, but electricity and internet are separate.\"?",
    "answer": "Got it. Is there a laundry room in the building?",
    "options": [
      "Water is included, but electricity and internet are separate.",
      "Got it. Is there a laundry room in the building?",
      "This is a one-bedroom apartment with a lot of natural light.",
      "It looks nice. Are utilities included in the rent?"
    ]
  },
  {
    "id": "apartment-viewing-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Dengar harga sewa, fasilitas, dan aturan.",
    "options": [
      "Dengar harga sewa, fasilitas, dan aturan.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "apartment-viewing-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "laundry room",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "laundry room"
    ]
  },
  {
    "id": "apartment-viewing-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "move in",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "move in",
      "Let me sleep on it"
    ]
  },
  {
    "id": "apartment-viewing-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Yes, it is on the first floor, next to the mailboxes.\"?",
    "answer": "Location detail",
    "options": [
      "A topic change",
      "Location detail",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "apartment-viewing-listening-inference",
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

export default function EnglishListeningTopik12Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
