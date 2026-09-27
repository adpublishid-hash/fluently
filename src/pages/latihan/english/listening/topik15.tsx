import { ListeningPracticePage, type ListeningQuestion, type ListeningTopicMaterial } from '../../components/ListeningPracticePage';

const material: ListeningTopicMaterial = {
  "id": "news-briefing",
  "title": "Short News Briefing",
  "description": "Mendengar ringkasan berita singkat.",
  "level": "Media",
  "accent": "Broadcast-style English",
  "goal": "Dengar topik utama, angka, dan dampak.",
  "focus": [
    "according to...",
    "expected to",
    "as a result"
  ],
  "lines": [
    {
      "speaker": "Anchor",
      "text": "According to city officials, the new bus route will start next Monday.",
      "note": "Source phrase"
    },
    {
      "speaker": "Reporter",
      "text": "The route is expected to reduce travel time by about fifteen minutes.",
      "note": "Expected impact"
    },
    {
      "speaker": "Anchor",
      "text": "How many neighborhoods will it serve?",
      "note": "Detail question"
    },
    {
      "speaker": "Reporter",
      "text": "It will connect five neighborhoods with the central station.",
      "note": "Number detail"
    },
    {
      "speaker": "Anchor",
      "text": "As a result, commuters should have more options during rush hour.",
      "note": "Conclusion"
    }
  ],
  "topicNumber": 15
};

const quizQuestions: ListeningQuestion[] = [
  {
    "id": "news-briefing-listening-main-idea",
    "level": "Basic",
    "prompt": "What is the main situation in this conversation?",
    "answer": "Short News Briefing",
    "options": [
      "Short News Briefing",
      "A weather report",
      "A sports interview",
      "A school announcement"
    ]
  },
  {
    "id": "news-briefing-listening-speakers",
    "level": "Basic",
    "prompt": "Who speaks first in the conversation?",
    "answer": "Anchor",
    "options": [
      "Reporter",
      "Narrator",
      "Teacher",
      "Anchor"
    ]
  },
  {
    "id": "news-briefing-listening-first-response",
    "level": "Basic",
    "prompt": "What does Reporter say near the beginning?",
    "answer": "The route is expected to reduce travel time by about fifteen minutes.",
    "options": [
      "How many neighborhoods will it serve?",
      "As a result, commuters should have more options during rush hour.",
      "The route is expected to reduce travel time by about fifteen minutes.",
      "According to city officials, the new bus route will start next Monday."
    ]
  },
  {
    "id": "news-briefing-listening-third-speaker",
    "level": "Basic",
    "prompt": "Who says: \"How many neighborhoods will it serve?\"?",
    "answer": "Anchor",
    "options": [
      "Customer service agent",
      "Anchor",
      "Reporter",
      "Narrator"
    ]
  },
  {
    "id": "news-briefing-listening-focus-1",
    "level": "Intermediate",
    "prompt": "Which phrase is one of the focus chunks for \"Short News Briefing\"?",
    "answer": "according to...",
    "options": [
      "according to...",
      "by the way",
      "as soon as possible",
      "never mind"
    ]
  },
  {
    "id": "news-briefing-listening-detail",
    "level": "Intermediate",
    "prompt": "Which line appears in the conversation?",
    "answer": "As a result, commuters should have more options during rush hour.",
    "options": [
      "According to city officials, the new bus route will start next Monday.",
      "The route is expected to reduce travel time by about fifteen minutes.",
      "The speaker cancels the plan.",
      "As a result, commuters should have more options during rush hour."
    ]
  },
  {
    "id": "news-briefing-listening-note",
    "level": "Intermediate",
    "prompt": "What is the function of this line: \"According to city officials, the new bus route will start next Monday.\"?",
    "answer": "Source phrase",
    "options": [
      "Price disagreement",
      "A grammar correction",
      "Source phrase",
      "Closing thanks"
    ]
  },
  {
    "id": "news-briefing-listening-sequence",
    "level": "Intermediate",
    "prompt": "What comes right after: \"How many neighborhoods will it serve?\"?",
    "answer": "It will connect five neighborhoods with the central station.",
    "options": [
      "How many neighborhoods will it serve?",
      "It will connect five neighborhoods with the central station.",
      "According to city officials, the new bus route will start next Monday.",
      "The route is expected to reduce travel time by about fifteen minutes."
    ]
  },
  {
    "id": "news-briefing-listening-purpose",
    "level": "Intermediate",
    "prompt": "What listening goal matches this topic?",
    "answer": "Dengar topik utama, angka, dan dampak.",
    "options": [
      "Dengar topik utama, angka, dan dampak.",
      "Memorize random word lists only.",
      "Practice silent reading without audio.",
      "Focus only on spelling rules."
    ]
  },
  {
    "id": "news-briefing-listening-focus-2",
    "level": "Advanced",
    "prompt": "Listen for natural chunks. Which chunk should you shadow in this topic?",
    "answer": "expected to",
    "options": [
      "I have no idea",
      "That is impossible",
      "See you next year",
      "expected to"
    ]
  },
  {
    "id": "news-briefing-listening-focus-3",
    "level": "Advanced",
    "prompt": "Which phrase is useful for native-speed recognition in this conversation?",
    "answer": "as a result",
    "options": [
      "It depends on the weather",
      "That sounds impossible",
      "as a result",
      "Let me sleep on it"
    ]
  },
  {
    "id": "news-briefing-listening-final-function",
    "level": "Advanced",
    "prompt": "What is the function of the final line: \"As a result, commuters should have more options during rush hour.\"?",
    "answer": "Conclusion",
    "options": [
      "A topic change",
      "Conclusion",
      "Opening service question",
      "A disagreement"
    ]
  },
  {
    "id": "news-briefing-listening-inference",
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

export default function EnglishListeningTopik15Page() {
  return (
    <ListeningPracticePage
      topic={material}
      questions={quizQuestions}
      backPath="/latihan/english/listening"
    />
  );
}
