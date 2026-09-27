import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "coffee-order",
  "title": "Ordering Coffee",
  "description": "Percakapan cepat saat memesan minuman di cafe.",
  "level": "Daily",
  "accent": "Natural American",
  "goal": "Tangkap pesanan, pilihan ukuran, dan klarifikasi singkat.",
  "focus": [
    "Could I get...",
    "Would you like...",
    "That comes to..."
  ],
  "lines": [
    {
      "speaker": "Barista",
      "text": "Hi there. What can I get started for you?",
      "note": "Opening service question"
    },
    {
      "speaker": "Customer",
      "text": "Could I get a medium latte with oat milk, please?",
      "note": "Polite order"
    },
    {
      "speaker": "Barista",
      "text": "Sure. Would you like that hot or iced?",
      "note": "Choice question"
    },
    {
      "speaker": "Customer",
      "text": "Iced, please. And could you make it half sweet?",
      "note": "Extra request"
    },
    {
      "speaker": "Barista",
      "text": "Absolutely. That comes to five fifty.",
      "note": "Price phrase"
    }
  ],
  "topicNumber": 1
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "coffee-order-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Ordering Coffee",
    "options": [
      "Ordering Coffee",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "coffee-order-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Barista",
    "options": [
      "Customer",
      "Narrator",
      "Teacher",
      "Barista"
    ]
  },
  {
    "id": "coffee-order-listening-first-response",
    "level": "Basic",
    "prompt": "What does Customer say near the beginning?",
    "answer": "Could I get a medium latte with oat milk, please?",
    "options": [
      "Sure. Would you like that hot or iced?",
      "Absolutely. That comes to five fifty.",
      "Could I get a medium latte with oat milk, please?",
      "Hi there. What can I get started for you?"
    ]
  },
  {
    "id": "coffee-order-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Sure. Would you like that hot or iced?\"?",
    "answer": "Barista",
    "options": [
      "Customer service agent",
      "Barista",
      "Customer",
      "Narrator"
    ]
  },
  {
    "id": "coffee-order-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Ordering Coffee\"?",
    "answer": "Could I get...",
    "options": [
      "Could I get...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "coffee-order-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Absolutely. That comes to five fifty.",
    "options": [
      "Hi there. What can I get started for you?",
      "Could I get a medium latte with oat milk, please?",
      "The speaker cancels the plan.",
      "Absolutely. That comes to five fifty."
    ]
  },
  {
    "id": "coffee-order-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Hi there. What can I get started for you?\"?",
    "answer": "Opening service question",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Opening service question",
      "Closing thanks"
    ]
  },
  {
    "id": "coffee-order-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Sure. Would you like that hot or iced?\"?",
    "answer": "Iced, please. And could you make it half sweet?",
    "options": [
      "Sure. Would you like that hot or iced?",
      "Iced, please. And could you make it half sweet?",
      "Hi there. What can I get started for you?",
      "Could I get a medium latte with oat milk, please?"
    ]
  },
  {
    "id": "coffee-order-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Tangkap pesanan, pilihan ukuran, dan klarifikasi singkat.",
    "options": [
      "Tangkap pesanan, pilihan ukuran, dan klarifikasi singkat.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "coffee-order-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "Would you like...",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "Would you like..."
    ]
  },
  {
    "id": "coffee-order-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "That comes to...",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "That comes to...",
      "Let me sleep on it"
    ]
  },
  {
    "id": "coffee-order-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Absolutely. That comes to five fifty.\"?",
    "answer": "Price phrase",
    "options": [
      "A topic change",
      "Price phrase",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "coffee-order-listening-inference",
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

export default function EnglishListeningTopik1Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
