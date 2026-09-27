import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "class-discussion",
  "title": "Class Discussion",
  "description": "Diskusi kelas tentang tugas kelompok.",
  "level": "Academic",
  "accent": "Campus English",
  "goal": "Tangkap opini, pembagian tugas, dan deadline.",
  "focus": [
    "I can handle...",
    "due next week",
    "sounds fair"
  ],
  "lines": [
    {
      "speaker": "Student A",
      "text": "We need to divide the presentation into three parts.",
      "note": "Task planning"
    },
    {
      "speaker": "Student B",
      "text": "I can handle the introduction and background research.",
      "note": "Offering task"
    },
    {
      "speaker": "Student C",
      "text": "Great. I will prepare the examples and visuals.",
      "note": "Taking role"
    },
    {
      "speaker": "Student A",
      "text": "Then I will do the conclusion and edit the slides.",
      "note": "Remaining role"
    },
    {
      "speaker": "Student B",
      "text": "Sounds fair. Let us finish the first draft by Friday.",
      "note": "Deadline"
    }
  ],
  "topicNumber": 14
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "class-discussion-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Class Discussion",
    "options": [
      "Class Discussion",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "class-discussion-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Student A",
    "options": [
      "Student B",
      "Student C",
      "Narrator",
      "Student A"
    ]
  },
  {
    "id": "class-discussion-listening-first-response",
    "level": "Basic",
    "prompt": "What does Student B say near the beginning?",
    "answer": "I can handle the introduction and background research.",
    "options": [
      "Great. I will prepare the examples and visuals.",
      "Sounds fair. Let us finish the first draft by Friday.",
      "I can handle the introduction and background research.",
      "We need to divide the presentation into three parts."
    ]
  },
  {
    "id": "class-discussion-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Great. I will prepare the examples and visuals.\"?",
    "answer": "Student C",
    "options": [
      "Narrator",
      "Student C",
      "Student A",
      "Student B"
    ]
  },
  {
    "id": "class-discussion-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Class Discussion\"?",
    "answer": "I can handle...",
    "options": [
      "I can handle...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "class-discussion-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Sounds fair. Let us finish the first draft by Friday.",
    "options": [
      "We need to divide the presentation into three parts.",
      "I can handle the introduction and background research.",
      "The speaker cancels the plan.",
      "Sounds fair. Let us finish the first draft by Friday."
    ]
  },
  {
    "id": "class-discussion-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"We need to divide the presentation into three parts.\"?",
    "answer": "Task planning",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Task planning",
      "Closing thanks"
    ]
  },
  {
    "id": "class-discussion-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Great. I will prepare the examples and visuals.\"?",
    "answer": "Then I will do the conclusion and edit the slides.",
    "options": [
      "Great. I will prepare the examples and visuals.",
      "Then I will do the conclusion and edit the slides.",
      "We need to divide the presentation into three parts.",
      "I can handle the introduction and background research."
    ]
  },
  {
    "id": "class-discussion-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Tangkap opini, pembagian tugas, dan deadline.",
    "options": [
      "Tangkap opini, pembagian tugas, dan deadline.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "class-discussion-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "due next week",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "due next week"
    ]
  },
  {
    "id": "class-discussion-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "sounds fair",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "sounds fair",
      "Let me sleep on it"
    ]
  },
  {
    "id": "class-discussion-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Sounds fair. Let us finish the first draft by Friday.\"?",
    "answer": "Deadline",
    "options": [
      "A topic change",
      "Deadline",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "class-discussion-listening-inference",
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

export default function EnglishListeningTopik14Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
