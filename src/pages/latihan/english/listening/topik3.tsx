import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "job-interview",
  "title": "Job Interview Small Talk",
  "description": "Pembuka interview sebelum pertanyaan utama.",
  "level": "Professional",
  "accent": "Natural workplace English",
  "goal": "Kenali sapaan, respon sopan, dan transisi interview.",
  "focus": [
    "Thanks for coming in",
    "I appreciate the opportunity",
    "walk me through"
  ],
  "lines": [
    {
      "speaker": "Interviewer",
      "text": "Thanks for coming in today. Did you find the office okay?",
      "note": "Small talk"
    },
    {
      "speaker": "Candidate",
      "text": "Yes, absolutely. The directions were very clear.",
      "note": "Positive response"
    },
    {
      "speaker": "Interviewer",
      "text": "Great. Before we begin, would you like some water?",
      "note": "Offer"
    },
    {
      "speaker": "Candidate",
      "text": "No, thank you. I am all set.",
      "note": "Polite refusal"
    },
    {
      "speaker": "Interviewer",
      "text": "Perfect. Could you walk me through your recent experience?",
      "note": "Interview transition"
    }
  ],
  "topicNumber": 3
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "job-interview-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Job Interview Small Talk",
    "options": [
      "Job Interview Small Talk",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "job-interview-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Interviewer",
    "options": [
      "Candidate",
      "Narrator",
      "Teacher",
      "Interviewer"
    ]
  },
  {
    "id": "job-interview-listening-first-response",
    "level": "Basic",
    "prompt": "What does Candidate say near the beginning?",
    "answer": "Yes, absolutely. The directions were very clear.",
    "options": [
      "Great. Before we begin, would you like some water?",
      "Perfect. Could you walk me through your recent experience?",
      "Yes, absolutely. The directions were very clear.",
      "Thanks for coming in today. Did you find the office okay?"
    ]
  },
  {
    "id": "job-interview-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"Great. Before we begin, would you like some water?\"?",
    "answer": "Interviewer",
    "options": [
      "Customer service agent",
      "Interviewer",
      "Candidate",
      "Narrator"
    ]
  },
  {
    "id": "job-interview-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Job Interview Small Talk\"?",
    "answer": "Thanks for coming in",
    "options": [
      "Thanks for coming in",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "job-interview-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "Perfect. Could you walk me through your recent experience?",
    "options": [
      "Thanks for coming in today. Did you find the office okay?",
      "Yes, absolutely. The directions were very clear.",
      "The speaker cancels the plan.",
      "Perfect. Could you walk me through your recent experience?"
    ]
  },
  {
    "id": "job-interview-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"Thanks for coming in today. Did you find the office okay?\"?",
    "answer": "Small talk",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Small talk",
      "Closing thanks"
    ]
  },
  {
    "id": "job-interview-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"Great. Before we begin, would you like some water?\"?",
    "answer": "No, thank you. I am all set.",
    "options": [
      "Great. Before we begin, would you like some water?",
      "No, thank you. I am all set.",
      "Thanks for coming in today. Did you find the office okay?",
      "Yes, absolutely. The directions were very clear."
    ]
  },
  {
    "id": "job-interview-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Kenali sapaan, respon sopan, dan transisi interview.",
    "options": [
      "Kenali sapaan, respon sopan, dan transisi interview.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "job-interview-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "I appreciate the opportunity",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "I appreciate the opportunity"
    ]
  },
  {
    "id": "job-interview-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "walk me through",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "walk me through",
      "Let me sleep on it"
    ]
  },
  {
    "id": "job-interview-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"Perfect. Could you walk me through your recent experience?\"?",
    "answer": "Interview transition",
    "options": [
      "A topic change",
      "Interview transition",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "job-interview-listening-inference",
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

export default function EnglishListeningTopik3Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
