import { VocabularyQuizPage } from '../../components/PracticeQuizPage';

type TopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  terms: Array<{ word: string; meaning: string }>;
};

type QuizQuestion = {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  prompt: string;
  answer: string;
  options: string[];
};

const material: TopicMaterial = {
  "id": "business-office",
  "title": "Business & Office English",
  "description": "Kata kerja kantor, meeting, dan email.",
  "topicNumber": 2,
  "terms": [
    {
      "word": "Meeting",
      "meaning": "a formal discussion at work"
    },
    {
      "word": "Deadline",
      "meaning": "the latest time something must be finished"
    },
    {
      "word": "Client",
      "meaning": "a customer who uses professional services"
    },
    {
      "word": "Invoice",
      "meaning": "a document requesting payment"
    },
    {
      "word": "Negotiate",
      "meaning": "to discuss terms before reaching agreement"
    },
    {
      "word": "Revenue",
      "meaning": "money earned by a company"
    },
    {
      "word": "Proposal",
      "meaning": "a suggested plan for business"
    },
    {
      "word": "Colleague",
      "meaning": "a person you work with"
    },
    {
      "word": "Strategy",
      "meaning": "a plan for achieving a goal"
    },
    {
      "word": "Productivity",
      "meaning": "the ability to complete useful work efficiently"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "business-office-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a formal discussion at work\"?",
      "answer": "Meeting",
      "options": [
        "Meeting",
        "Invoice",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"the latest time something must be finished\"?",
      "answer": "Deadline",
      "options": [
        "Negotiate",
        "Colleague",
        "Meeting",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a customer who uses professional services\"?",
      "answer": "Client",
      "options": [
        "Strategy",
        "Deadline",
        "Client",
        "Revenue"
      ]
    },
    {
      "id": "business-office-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a document requesting payment\"?",
      "answer": "Invoice",
      "options": [
        "Client",
        "Invoice",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"to discuss terms before reaching agreement\"?",
      "answer": "Negotiate",
      "options": [
        "Negotiate",
        "Colleague",
        "Meeting",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"money earned by a company\"?",
      "answer": "Revenue",
      "options": [
        "Strategy",
        "Deadline",
        "Negotiate",
        "Revenue"
      ]
    },
    {
      "id": "business-office-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a suggested plan for business\"?",
      "answer": "Proposal",
      "options": [
        "Client",
        "Revenue",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a person you work with\"?",
      "answer": "Colleague",
      "options": [
        "Proposal",
        "Colleague",
        "Meeting",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a plan for achieving a goal\"?",
      "answer": "Strategy",
      "options": [
        "Strategy",
        "Deadline",
        "Negotiate",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"the ability to complete useful work efficiently\"?",
      "answer": "Productivity",
      "options": [
        "Client",
        "Revenue",
        "Strategy",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a document requesting payment\".",
      "answer": "Invoice",
      "options": [
        "Client",
        "Proposal",
        "Productivity",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"to discuss terms before reaching agreement\".",
      "answer": "Negotiate",
      "options": [
        "Colleague",
        "Meeting",
        "Negotiate",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"money earned by a company\".",
      "answer": "Revenue",
      "options": [
        "Deadline",
        "Revenue",
        "Negotiate",
        "Strategy"
      ]
    },
    {
      "id": "business-office-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a suggested plan for business\".",
      "answer": "Proposal",
      "options": [
        "Proposal",
        "Revenue",
        "Productivity",
        "Client"
      ]
    },
    {
      "id": "business-office-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a person you work with\".",
      "answer": "Colleague",
      "options": [
        "Proposal",
        "Meeting",
        "Invoice",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a plan for achieving a goal\".",
      "answer": "Strategy",
      "options": [
        "Deadline",
        "Negotiate",
        "Strategy",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"the ability to complete useful work efficiently\".",
      "answer": "Productivity",
      "options": [
        "Revenue",
        "Productivity",
        "Strategy",
        "Client"
      ]
    },
    {
      "id": "business-office-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a formal discussion at work\".",
      "answer": "Meeting",
      "options": [
        "Meeting",
        "Deadline",
        "Negotiate",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"the latest time something must be finished\".",
      "answer": "Deadline",
      "options": [
        "Client",
        "Revenue",
        "Strategy",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Business & Office English: \"a customer who uses professional services\".",
      "answer": "Client",
      "options": [
        "Proposal",
        "Productivity",
        "Client",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a suggested plan for business\"?",
      "answer": "Proposal",
      "options": [
        "Revenue",
        "Productivity",
        "Proposal",
        "Client"
      ]
    },
    {
      "id": "business-office-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a person you work with\"?",
      "answer": "Colleague",
      "options": [
        "Meeting",
        "Colleague",
        "Invoice",
        "Proposal"
      ]
    },
    {
      "id": "business-office-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a plan for achieving a goal\"?",
      "answer": "Strategy",
      "options": [
        "Strategy",
        "Negotiate",
        "Colleague",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"the ability to complete useful work efficiently\"?",
      "answer": "Productivity",
      "options": [
        "Revenue",
        "Strategy",
        "Client",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a formal discussion at work\"?",
      "answer": "Meeting",
      "options": [
        "Deadline",
        "Negotiate",
        "Meeting",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"the latest time something must be finished\"?",
      "answer": "Deadline",
      "options": [
        "Revenue",
        "Deadline",
        "Strategy",
        "Client"
      ]
    },
    {
      "id": "business-office-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a customer who uses professional services\"?",
      "answer": "Client",
      "options": [
        "Client",
        "Productivity",
        "Invoice",
        "Proposal"
      ]
    },
    {
      "id": "business-office-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"a document requesting payment\"?",
      "answer": "Invoice",
      "options": [
        "Meeting",
        "Negotiate",
        "Colleague",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"to discuss terms before reaching agreement\"?",
      "answer": "Negotiate",
      "options": [
        "Revenue",
        "Strategy",
        "Negotiate",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal business & office english context, which term best matches: \"money earned by a company\"?",
      "answer": "Revenue",
      "options": [
        "Productivity",
        "Revenue",
        "Client",
        "Proposal"
      ]
    }
  ],
  "id": [
    {
      "id": "business-office-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a formal discussion at work\"?",
      "answer": "Meeting",
      "options": [
        "Meeting",
        "Invoice",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the latest time something must be finished\"?",
      "answer": "Deadline",
      "options": [
        "Negotiate",
        "Colleague",
        "Meeting",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a customer who uses professional services\"?",
      "answer": "Client",
      "options": [
        "Strategy",
        "Deadline",
        "Client",
        "Revenue"
      ]
    },
    {
      "id": "business-office-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a document requesting payment\"?",
      "answer": "Invoice",
      "options": [
        "Client",
        "Invoice",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to discuss terms before reaching agreement\"?",
      "answer": "Negotiate",
      "options": [
        "Negotiate",
        "Colleague",
        "Meeting",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money earned by a company\"?",
      "answer": "Revenue",
      "options": [
        "Strategy",
        "Deadline",
        "Negotiate",
        "Revenue"
      ]
    },
    {
      "id": "business-office-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a suggested plan for business\"?",
      "answer": "Proposal",
      "options": [
        "Client",
        "Revenue",
        "Proposal",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person you work with\"?",
      "answer": "Colleague",
      "options": [
        "Proposal",
        "Colleague",
        "Meeting",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a plan for achieving a goal\"?",
      "answer": "Strategy",
      "options": [
        "Strategy",
        "Deadline",
        "Negotiate",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the ability to complete useful work efficiently\"?",
      "answer": "Productivity",
      "options": [
        "Client",
        "Revenue",
        "Strategy",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a document requesting payment\".",
      "answer": "Invoice",
      "options": [
        "Client",
        "Proposal",
        "Productivity",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"to discuss terms before reaching agreement\".",
      "answer": "Negotiate",
      "options": [
        "Colleague",
        "Meeting",
        "Negotiate",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"money earned by a company\".",
      "answer": "Revenue",
      "options": [
        "Deadline",
        "Revenue",
        "Negotiate",
        "Strategy"
      ]
    },
    {
      "id": "business-office-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a suggested plan for business\".",
      "answer": "Proposal",
      "options": [
        "Proposal",
        "Revenue",
        "Productivity",
        "Client"
      ]
    },
    {
      "id": "business-office-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a person you work with\".",
      "answer": "Colleague",
      "options": [
        "Proposal",
        "Meeting",
        "Invoice",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a plan for achieving a goal\".",
      "answer": "Strategy",
      "options": [
        "Deadline",
        "Negotiate",
        "Strategy",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"the ability to complete useful work efficiently\".",
      "answer": "Productivity",
      "options": [
        "Revenue",
        "Productivity",
        "Strategy",
        "Client"
      ]
    },
    {
      "id": "business-office-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a formal discussion at work\".",
      "answer": "Meeting",
      "options": [
        "Meeting",
        "Deadline",
        "Negotiate",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"the latest time something must be finished\".",
      "answer": "Deadline",
      "options": [
        "Client",
        "Revenue",
        "Strategy",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Business & Office English: \"a customer who uses professional services\".",
      "answer": "Client",
      "options": [
        "Proposal",
        "Productivity",
        "Client",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a suggested plan for business\"?",
      "answer": "Proposal",
      "options": [
        "Revenue",
        "Productivity",
        "Proposal",
        "Client"
      ]
    },
    {
      "id": "business-office-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a person you work with\"?",
      "answer": "Colleague",
      "options": [
        "Meeting",
        "Colleague",
        "Invoice",
        "Proposal"
      ]
    },
    {
      "id": "business-office-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a plan for achieving a goal\"?",
      "answer": "Strategy",
      "options": [
        "Strategy",
        "Negotiate",
        "Colleague",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"the ability to complete useful work efficiently\"?",
      "answer": "Productivity",
      "options": [
        "Revenue",
        "Strategy",
        "Client",
        "Productivity"
      ]
    },
    {
      "id": "business-office-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a formal discussion at work\"?",
      "answer": "Meeting",
      "options": [
        "Deadline",
        "Negotiate",
        "Meeting",
        "Colleague"
      ]
    },
    {
      "id": "business-office-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"the latest time something must be finished\"?",
      "answer": "Deadline",
      "options": [
        "Revenue",
        "Deadline",
        "Strategy",
        "Client"
      ]
    },
    {
      "id": "business-office-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a customer who uses professional services\"?",
      "answer": "Client",
      "options": [
        "Client",
        "Productivity",
        "Invoice",
        "Proposal"
      ]
    },
    {
      "id": "business-office-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"a document requesting payment\"?",
      "answer": "Invoice",
      "options": [
        "Meeting",
        "Negotiate",
        "Colleague",
        "Invoice"
      ]
    },
    {
      "id": "business-office-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"to discuss terms before reaching agreement\"?",
      "answer": "Negotiate",
      "options": [
        "Revenue",
        "Strategy",
        "Negotiate",
        "Deadline"
      ]
    },
    {
      "id": "business-office-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks business & office english yang lebih formal, istilah mana yang paling sesuai dengan: \"money earned by a company\"?",
      "answer": "Revenue",
      "options": [
        "Productivity",
        "Revenue",
        "Client",
        "Proposal"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik2Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik2"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
