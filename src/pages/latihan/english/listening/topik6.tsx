import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "meeting-update",
  "title": "Project Meeting Update",
  "description": "Update singkat dalam meeting kantor.",
  "level": "Work",
  "accent": "Business English",
  "goal": "Pahami status, deadline, dan blocker.",
  "focus": [
    "quick update",
    "on track",
    "waiting on feedback"
  ],
  "lines": [
    {
      "speaker": "Manager",
      "text": "Could you give us a quick update on the landing page?",
      "note": "Meeting prompt"
    },
    {
      "speaker": "Designer",
      "text": "Sure. The layout is done, and the mobile version is almost finished.",
      "note": "Progress update"
    },
    {
      "speaker": "Manager",
      "text": "Are we still on track for Friday?",
      "note": "Deadline check"
    },
    {
      "speaker": "Designer",
      "text": "Yes, as long as we get feedback by tomorrow morning.",
      "note": "Condition"
    },
    {
      "speaker": "Manager",
      "text": "Okay, I will follow up with the client today.",
      "note": "Next action"
    }
  ],
  "topicNumber": 6
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "meeting-update-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Project Meeting Update",
    "options": [
      "Project Meeting Update",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "meeting-update-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Manager",
    "options": [
      "Designer",
      "Narrator",
      "Teacher",
      "Manager"
    ]
  },
  {
    "id": "meeting-update-listening-first-response",
    "level": "Basic",
    "prompt": "What does Designer say near the beginning?",
    "answer": "Sure. The layout is done, and the mobile version is almost finished.",
    "options": [
      "Are we still on track for Friday?",
      "Okay, I will follow up with the client today.",
      "Sure. The layout is done, and the mobile version is almost finished.",
      "Could you give us a quick update on the landing page?"
    ]
  },
  {
    "id": "meeting-update-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Are we still on track for Friday?\"?",
    "answer": "Manager",
    "options": [
      "Customer service agent",
      "Manager",
      "Designer",
      "Narrator"
    ]
  },
  {
    "id": "meeting-update-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Project Meeting Update\"?",
    "answer": "quick update",
    "options": [
      "quick update",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "meeting-update-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Okay, I will follow up with the client today.",
    "options": [
      "Could you give us a quick update on the landing page?",
      "Sure. The layout is done, and the mobile version is almost finished.",
      "The speaker cancels the plan.",
      "Okay, I will follow up with the client today."
    ]
  },
  {
    "id": "meeting-update-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Could you give us a quick update on the landing page?\"?",
    "answer": "Meeting prompt",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Meeting prompt",
      "Closing thanks"
    ]
  },
  {
    "id": "meeting-update-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Are we still on track for Friday?\"?",
    "answer": "Yes, as long as we get feedback by tomorrow morning.",
    "options": [
      "Are we still on track for Friday?",
      "Yes, as long as we get feedback by tomorrow morning.",
      "Could you give us a quick update on the landing page?",
      "Sure. The layout is done, and the mobile version is almost finished."
    ]
  },
  {
    "id": "meeting-update-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Pahami status, deadline, dan blocker.",
    "options": [
      "Pahami status, deadline, dan blocker.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "meeting-update-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "on track",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "on track"
    ]
  },
  {
    "id": "meeting-update-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "waiting on feedback",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "waiting on feedback",
      "Let me sleep on it"
    ]
  },
  {
    "id": "meeting-update-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Okay, I will follow up with the client today.\"?",
    "answer": "Next action",
    "options": [
      "A topic change",
      "Next action",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "meeting-update-listening-inference",
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

export default function EnglishListeningTopik6Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
