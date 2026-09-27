import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "restaurant-complaint",
  "title": "Restaurant Complaint",
  "description": "Komplain sopan tentang pesanan restoran.",
  "level": "Daily",
  "accent": "Polite native English",
  "goal": "Kenali komplain halus dan solusi layanan.",
  "focus": [
    "I am sorry, but...",
    "I ordered...",
    "I will fix that"
  ],
  "lines": [
    {
      "speaker": "Customer",
      "text": "Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta.",
      "note": "Polite complaint"
    },
    {
      "speaker": "Server",
      "text": "Oh, I apologize. Let me check that right away.",
      "note": "Apology"
    },
    {
      "speaker": "Customer",
      "text": "No worries. I just wanted to make sure.",
      "note": "Softening phrase"
    },
    {
      "speaker": "Server",
      "text": "You are right. I will bring the correct dish out as soon as possible.",
      "note": "Solution"
    },
    {
      "speaker": "Customer",
      "text": "Thank you. I appreciate it.",
      "note": "Closing"
    }
  ],
  "topicNumber": 8
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "restaurant-complaint-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Restaurant Complaint",
    "options": [
      "Restaurant Complaint",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "restaurant-complaint-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Customer",
    "options": [
      "Server",
      "Narrator",
      "Teacher",
      "Customer"
    ]
  },
  {
    "id": "restaurant-complaint-listening-first-response",
    "level": "Basic",
    "prompt": "What does Server say near the beginning?",
    "answer": "Oh, I apologize. Let me check that right away.",
    "options": [
      "No worries. I just wanted to make sure.",
      "Thank you. I appreciate it.",
      "Oh, I apologize. Let me check that right away.",
      "Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta."
    ]
  },
  {
    "id": "restaurant-complaint-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"No worries. I just wanted to make sure.\"?",
    "answer": "Customer",
    "options": [
      "Customer service agent",
      "Customer",
      "Server",
      "Narrator"
    ]
  },
  {
    "id": "restaurant-complaint-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Restaurant Complaint\"?",
    "answer": "I am sorry, but...",
    "options": [
      "I am sorry, but...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "restaurant-complaint-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Thank you. I appreciate it.",
    "options": [
      "Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta.",
      "Oh, I apologize. Let me check that right away.",
      "The speaker cancels the plan.",
      "Thank you. I appreciate it."
    ]
  },
  {
    "id": "restaurant-complaint-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta.\"?",
    "answer": "Polite complaint",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Polite complaint",
      "Closing thanks"
    ]
  },
  {
    "id": "restaurant-complaint-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"No worries. I just wanted to make sure.\"?",
    "answer": "You are right. I will bring the correct dish out as soon as possible.",
    "options": [
      "No worries. I just wanted to make sure.",
      "You are right. I will bring the correct dish out as soon as possible.",
      "Excuse me. I am sorry, but I ordered the grilled chicken, not the pasta.",
      "Oh, I apologize. Let me check that right away."
    ]
  },
  {
    "id": "restaurant-complaint-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Kenali komplain halus dan solusi layanan.",
    "options": [
      "Kenali komplain halus dan solusi layanan.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "restaurant-complaint-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "I ordered...",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "I ordered..."
    ]
  },
  {
    "id": "restaurant-complaint-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "I will fix that",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "I will fix that",
      "Let me sleep on it"
    ]
  },
  {
    "id": "restaurant-complaint-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Thank you. I appreciate it.\"?",
    "answer": "Closing",
    "options": [
      "A topic change",
      "Closing",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "restaurant-complaint-listening-inference",
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

export default function EnglishListeningTopik8Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
