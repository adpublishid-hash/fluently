import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "shopping-return",
  "title": "Returning an Item",
  "description": "Mengembalikan barang ke toko.",
  "level": "Daily",
  "accent": "Retail English",
  "goal": "Dengar alasan return, receipt, dan refund.",
  "focus": [
    "return this item",
    "receipt",
    "refund to your card"
  ],
  "lines": [
    {
      "speaker": "Customer",
      "text": "Hi. I would like to return this jacket.",
      "note": "Return request"
    },
    {
      "speaker": "Clerk",
      "text": "No problem. Do you still have the receipt?",
      "note": "Receipt question"
    },
    {
      "speaker": "Customer",
      "text": "Yes, here it is. I bought it two days ago.",
      "note": "Purchase detail"
    },
    {
      "speaker": "Clerk",
      "text": "Was there anything wrong with it?",
      "note": "Reason question"
    },
    {
      "speaker": "Customer",
      "text": "It is just a little too small.",
      "note": "Reason"
    }
  ],
  "topicNumber": 9
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "shopping-return-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Returning an Item",
    "options": [
      "Returning an Item",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "shopping-return-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Customer",
    "options": [
      "Clerk",
      "Narrator",
      "Teacher",
      "Customer"
    ]
  },
  {
    "id": "shopping-return-listening-first-response",
    "level": "Basic",
    "prompt": "What does Clerk say near the beginning?",
    "answer": "No problem. Do you still have the receipt?",
    "options": [
      "Yes, here it is. I bought it two days ago.",
      "It is just a little too small.",
      "No problem. Do you still have the receipt?",
      "Hi. I would like to return this jacket."
    ]
  },
  {
    "id": "shopping-return-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Yes, here it is. I bought it two days ago.\"?",
    "answer": "Customer",
    "options": [
      "Customer service agent",
      "Customer",
      "Clerk",
      "Narrator"
    ]
  },
  {
    "id": "shopping-return-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Returning an Item\"?",
    "answer": "return this item",
    "options": [
      "return this item",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "shopping-return-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "It is just a little too small.",
    "options": [
      "Hi. I would like to return this jacket.",
      "No problem. Do you still have the receipt?",
      "The speaker cancels the plan.",
      "It is just a little too small."
    ]
  },
  {
    "id": "shopping-return-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Hi. I would like to return this jacket.\"?",
    "answer": "Return request",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Return request",
      "Closing thanks"
    ]
  },
  {
    "id": "shopping-return-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Yes, here it is. I bought it two days ago.\"?",
    "answer": "Was there anything wrong with it?",
    "options": [
      "Yes, here it is. I bought it two days ago.",
      "Was there anything wrong with it?",
      "Hi. I would like to return this jacket.",
      "No problem. Do you still have the receipt?"
    ]
  },
  {
    "id": "shopping-return-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Dengar alasan return, receipt, dan refund.",
    "options": [
      "Dengar alasan return, receipt, dan refund.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "shopping-return-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "receipt",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "receipt"
    ]
  },
  {
    "id": "shopping-return-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "refund to your card",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "refund to your card",
      "Let me sleep on it"
    ]
  },
  {
    "id": "shopping-return-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"It is just a little too small.\"?",
    "answer": "Reason",
    "options": [
      "A topic change",
      "Reason",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "shopping-return-listening-inference",
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

export default function EnglishListeningTopik9Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
