import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "phone-call",
  "title": "Making a Phone Call",
  "description": "Telepon kantor dan meninggalkan pesan.",
  "level": "Work",
  "accent": "Phone English",
  "goal": "Pahami pembuka telepon, unavailable, dan pesan.",
  "focus": [
    "speaking",
    "not available",
    "leave a message"
  ],
  "lines": [
    {
      "speaker": "Assistant",
      "text": "Good morning, GreenTech Solutions. This is Maya speaking.",
      "note": "Phone greeting"
    },
    {
      "speaker": "Caller",
      "text": "Hi Maya. Could I speak with Mr. Allen, please?",
      "note": "Request"
    },
    {
      "speaker": "Assistant",
      "text": "I am sorry, he is not available at the moment.",
      "note": "Unavailable phrase"
    },
    {
      "speaker": "Caller",
      "text": "Could I leave a message?",
      "note": "Message request"
    },
    {
      "speaker": "Assistant",
      "text": "Of course. I will make sure he gets it.",
      "note": "Confirmation"
    }
  ],
  "topicNumber": 10
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "phone-call-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Making a Phone Call",
    "options": [
      "Making a Phone Call",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "phone-call-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Assistant",
    "options": [
      "Caller",
      "Narrator",
      "Teacher",
      "Assistant"
    ]
  },
  {
    "id": "phone-call-listening-first-response",
    "level": "Basic",
    "prompt": "What does Caller say near the beginning?",
    "answer": "Hi Maya. Could I speak with Mr. Allen, please?",
    "options": [
      "I am sorry, he is not available at the moment.",
      "Of course. I will make sure he gets it.",
      "Hi Maya. Could I speak with Mr. Allen, please?",
      "Good morning, GreenTech Solutions. This is Maya speaking."
    ]
  },
  {
    "id": "phone-call-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"I am sorry, he is not available at the moment.\"?",
    "answer": "Assistant",
    "options": [
      "Customer service agent",
      "Assistant",
      "Caller",
      "Narrator"
    ]
  },
  {
    "id": "phone-call-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Making a Phone Call\"?",
    "answer": "speaking",
    "options": [
      "speaking",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "phone-call-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Of course. I will make sure he gets it.",
    "options": [
      "Good morning, GreenTech Solutions. This is Maya speaking.",
      "Hi Maya. Could I speak with Mr. Allen, please?",
      "The speaker cancels the plan.",
      "Of course. I will make sure he gets it."
    ]
  },
  {
    "id": "phone-call-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Good morning, GreenTech Solutions. This is Maya speaking.\"?",
    "answer": "Phone greeting",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Phone greeting",
      "Closing thanks"
    ]
  },
  {
    "id": "phone-call-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"I am sorry, he is not available at the moment.\"?",
    "answer": "Could I leave a message?",
    "options": [
      "I am sorry, he is not available at the moment.",
      "Could I leave a message?",
      "Good morning, GreenTech Solutions. This is Maya speaking.",
      "Hi Maya. Could I speak with Mr. Allen, please?"
    ]
  },
  {
    "id": "phone-call-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Pahami pembuka telepon, unavailable, dan pesan.",
    "options": [
      "Pahami pembuka telepon, unavailable, dan pesan.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "phone-call-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "not available",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "not available"
    ]
  },
  {
    "id": "phone-call-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "leave a message",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "leave a message",
      "Let me sleep on it"
    ]
  },
  {
    "id": "phone-call-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Of course. I will make sure he gets it.\"?",
    "answer": "Confirmation",
    "options": [
      "A topic change",
      "Confirmation",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "phone-call-listening-inference",
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

export default function EnglishListeningTopik10Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
