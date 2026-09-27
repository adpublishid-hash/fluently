import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "tech-support",
  "title": "Tech Support",
  "description": "Percakapan support saat aplikasi bermasalah.",
  "level": "Technology",
  "accent": "Support English",
  "goal": "Pahami problem, troubleshooting, dan solusi.",
  "focus": [
    "restart the app",
    "clear the cache",
    "try again"
  ],
  "lines": [
    {
      "speaker": "User",
      "text": "Hi. The app keeps freezing when I open the dashboard.",
      "note": "Problem report"
    },
    {
      "speaker": "Support",
      "text": "Thanks for letting us know. Have you tried restarting the app?",
      "note": "First troubleshooting step"
    },
    {
      "speaker": "User",
      "text": "Yes, but the same thing happened again.",
      "note": "Result"
    },
    {
      "speaker": "Support",
      "text": "Okay. Please clear the cache and sign in again.",
      "note": "Instruction"
    },
    {
      "speaker": "User",
      "text": "All right. I will try that now.",
      "note": "Action"
    }
  ],
  "topicNumber": 13
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "tech-support-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Tech Support",
    "options": [
      "Tech Support",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "tech-support-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "User",
    "options": [
      "Support",
      "Narrator",
      "Teacher",
      "User"
    ]
  },
  {
    "id": "tech-support-listening-first-response",
    "level": "Basic",
    "prompt": "What does Support say near the beginning?",
    "answer": "Thanks for letting us know. Have you tried restarting the app?",
    "options": [
      "Yes, but the same thing happened again.",
      "All right. I will try that now.",
      "Thanks for letting us know. Have you tried restarting the app?",
      "Hi. The app keeps freezing when I open the dashboard."
    ]
  },
  {
    "id": "tech-support-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Yes, but the same thing happened again.\"?",
    "answer": "User",
    "options": [
      "Customer service agent",
      "User",
      "Support",
      "Narrator"
    ]
  },
  {
    "id": "tech-support-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Tech Support\"?",
    "answer": "restart the app",
    "options": [
      "restart the app",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "tech-support-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "All right. I will try that now.",
    "options": [
      "Hi. The app keeps freezing when I open the dashboard.",
      "Thanks for letting us know. Have you tried restarting the app?",
      "The speaker cancels the plan.",
      "All right. I will try that now."
    ]
  },
  {
    "id": "tech-support-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Hi. The app keeps freezing when I open the dashboard.\"?",
    "answer": "Problem report",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Problem report",
      "Closing thanks"
    ]
  },
  {
    "id": "tech-support-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Yes, but the same thing happened again.\"?",
    "answer": "Okay. Please clear the cache and sign in again.",
    "options": [
      "Yes, but the same thing happened again.",
      "Okay. Please clear the cache and sign in again.",
      "Hi. The app keeps freezing when I open the dashboard.",
      "Thanks for letting us know. Have you tried restarting the app?"
    ]
  },
  {
    "id": "tech-support-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Pahami problem, troubleshooting, dan solusi.",
    "options": [
      "Pahami problem, troubleshooting, dan solusi.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "tech-support-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "clear the cache",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "clear the cache"
    ]
  },
  {
    "id": "tech-support-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "try again",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "try again",
      "Let me sleep on it"
    ]
  },
  {
    "id": "tech-support-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"All right. I will try that now.\"?",
    "answer": "Action",
    "options": [
      "A topic change",
      "Action",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "tech-support-listening-inference",
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

export default function EnglishListeningTopik13Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
