import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "weekend-plans",
  "title": "Weekend Plans",
  "description": "Percakapan santai tentang rencana akhir pekan.",
  "level": "Social",
  "accent": "Casual native English",
  "goal": "Tangkap rencana, preferensi, dan ajakan.",
  "focus": [
    "thinking of...",
    "sounds good",
    "want to join"
  ],
  "lines": [
    {
      "speaker": "Ava",
      "text": "Do you have any plans this weekend?",
      "note": "Opening topic"
    },
    {
      "speaker": "Ben",
      "text": "Not really. I was thinking of going hiking if the weather is nice.",
      "note": "Tentative plan"
    },
    {
      "speaker": "Ava",
      "text": "That sounds good. Where are you planning to go?",
      "note": "Interest question"
    },
    {
      "speaker": "Ben",
      "text": "Probably Pine Hill. It is close and not too crowded.",
      "note": "Reason"
    },
    {
      "speaker": "Ava",
      "text": "Nice. Let me know, I might join you.",
      "note": "Soft plan"
    }
  ],
  "topicNumber": 11
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "weekend-plans-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Weekend Plans",
    "options": [
      "Weekend Plans",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "weekend-plans-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Ava",
    "options": [
      "Ben",
      "Narrator",
      "Teacher",
      "Ava"
    ]
  },
  {
    "id": "weekend-plans-listening-first-response",
    "level": "Basic",
    "prompt": "What does Ben say near the beginning?",
    "answer": "Not really. I was thinking of going hiking if the weather is nice.",
    "options": [
      "That sounds good. Where are you planning to go?",
      "Nice. Let me know, I might join you.",
      "Not really. I was thinking of going hiking if the weather is nice.",
      "Do you have any plans this weekend?"
    ]
  },
  {
    "id": "weekend-plans-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"That sounds good. Where are you planning to go?\"?",
    "answer": "Ava",
    "options": [
      "Customer service agent",
      "Ava",
      "Ben",
      "Narrator"
    ]
  },
  {
    "id": "weekend-plans-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Weekend Plans\"?",
    "answer": "thinking of...",
    "options": [
      "thinking of...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "weekend-plans-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Nice. Let me know, I might join you.",
    "options": [
      "Do you have any plans this weekend?",
      "Not really. I was thinking of going hiking if the weather is nice.",
      "The speaker cancels the plan.",
      "Nice. Let me know, I might join you."
    ]
  },
  {
    "id": "weekend-plans-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Do you have any plans this weekend?\"?",
    "answer": "Opening topic",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Opening topic",
      "Closing thanks"
    ]
  },
  {
    "id": "weekend-plans-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"That sounds good. Where are you planning to go?\"?",
    "answer": "Probably Pine Hill. It is close and not too crowded.",
    "options": [
      "That sounds good. Where are you planning to go?",
      "Probably Pine Hill. It is close and not too crowded.",
      "Do you have any plans this weekend?",
      "Not really. I was thinking of going hiking if the weather is nice."
    ]
  },
  {
    "id": "weekend-plans-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Tangkap rencana, preferensi, dan ajakan.",
    "options": [
      "Tangkap rencana, preferensi, dan ajakan.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "weekend-plans-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "sounds good",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "sounds good"
    ]
  },
  {
    "id": "weekend-plans-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "want to join",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "want to join",
      "Let me sleep on it"
    ]
  },
  {
    "id": "weekend-plans-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Nice. Let me know, I might join you.\"?",
    "answer": "Soft plan",
    "options": [
      "A topic change",
      "Soft plan",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "weekend-plans-listening-inference",
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

export default function EnglishListeningTopik11Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
