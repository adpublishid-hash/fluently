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
  "id": "politics",
  "title": "Politics & Government",
  "description": "Kosakata pemerintahan, pemilu, dan kebijakan.",
  "topicNumber": 25,
  "terms": [
    {
      "word": "Vote",
      "meaning": "to choose in an election"
    },
    {
      "word": "Leader",
      "meaning": "a person who guides a group"
    },
    {
      "word": "Election",
      "meaning": "a process of choosing leaders"
    },
    {
      "word": "Policy",
      "meaning": "a plan or rule made by authority"
    },
    {
      "word": "Government",
      "meaning": "the system that runs a country"
    },
    {
      "word": "Citizen",
      "meaning": "a legal member of a country"
    },
    {
      "word": "Campaign",
      "meaning": "organized actions to win support"
    },
    {
      "word": "Democracy",
      "meaning": "government chosen by the people"
    },
    {
      "word": "Legislation",
      "meaning": "laws made by a government"
    },
    {
      "word": "Accountability",
      "meaning": "responsibility for decisions and actions"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "politics-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"to choose in an election\"?",
      "answer": "Vote",
      "options": [
        "Vote",
        "Policy",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a person who guides a group\"?",
      "answer": "Leader",
      "options": [
        "Government",
        "Democracy",
        "Vote",
        "Leader"
      ]
    },
    {
      "id": "politics-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a process of choosing leaders\"?",
      "answer": "Election",
      "options": [
        "Legislation",
        "Leader",
        "Election",
        "Citizen"
      ]
    },
    {
      "id": "politics-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a plan or rule made by authority\"?",
      "answer": "Policy",
      "options": [
        "Election",
        "Policy",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"the system that runs a country\"?",
      "answer": "Government",
      "options": [
        "Government",
        "Democracy",
        "Vote",
        "Policy"
      ]
    },
    {
      "id": "politics-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a legal member of a country\"?",
      "answer": "Citizen",
      "options": [
        "Legislation",
        "Leader",
        "Government",
        "Citizen"
      ]
    },
    {
      "id": "politics-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"organized actions to win support\"?",
      "answer": "Campaign",
      "options": [
        "Election",
        "Citizen",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"government chosen by the people\"?",
      "answer": "Democracy",
      "options": [
        "Campaign",
        "Democracy",
        "Vote",
        "Policy"
      ]
    },
    {
      "id": "politics-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"laws made by a government\"?",
      "answer": "Legislation",
      "options": [
        "Legislation",
        "Leader",
        "Government",
        "Democracy"
      ]
    },
    {
      "id": "politics-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"responsibility for decisions and actions\"?",
      "answer": "Accountability",
      "options": [
        "Election",
        "Citizen",
        "Legislation",
        "Accountability"
      ]
    },
    {
      "id": "politics-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"a plan or rule made by authority\".",
      "answer": "Policy",
      "options": [
        "Election",
        "Campaign",
        "Accountability",
        "Policy"
      ]
    },
    {
      "id": "politics-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"the system that runs a country\".",
      "answer": "Government",
      "options": [
        "Democracy",
        "Vote",
        "Government",
        "Policy"
      ]
    },
    {
      "id": "politics-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"a legal member of a country\".",
      "answer": "Citizen",
      "options": [
        "Leader",
        "Citizen",
        "Government",
        "Legislation"
      ]
    },
    {
      "id": "politics-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"organized actions to win support\".",
      "answer": "Campaign",
      "options": [
        "Campaign",
        "Citizen",
        "Accountability",
        "Election"
      ]
    },
    {
      "id": "politics-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"government chosen by the people\".",
      "answer": "Democracy",
      "options": [
        "Campaign",
        "Vote",
        "Policy",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"laws made by a government\".",
      "answer": "Legislation",
      "options": [
        "Leader",
        "Government",
        "Legislation",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"responsibility for decisions and actions\".",
      "answer": "Accountability",
      "options": [
        "Citizen",
        "Accountability",
        "Legislation",
        "Election"
      ]
    },
    {
      "id": "politics-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"to choose in an election\".",
      "answer": "Vote",
      "options": [
        "Vote",
        "Leader",
        "Government",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"a person who guides a group\".",
      "answer": "Leader",
      "options": [
        "Election",
        "Citizen",
        "Legislation",
        "Leader"
      ]
    },
    {
      "id": "politics-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Politics & Government: \"a process of choosing leaders\".",
      "answer": "Election",
      "options": [
        "Campaign",
        "Accountability",
        "Election",
        "Policy"
      ]
    },
    {
      "id": "politics-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"organized actions to win support\"?",
      "answer": "Campaign",
      "options": [
        "Citizen",
        "Accountability",
        "Campaign",
        "Election"
      ]
    },
    {
      "id": "politics-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"government chosen by the people\"?",
      "answer": "Democracy",
      "options": [
        "Vote",
        "Democracy",
        "Policy",
        "Campaign"
      ]
    },
    {
      "id": "politics-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"laws made by a government\"?",
      "answer": "Legislation",
      "options": [
        "Legislation",
        "Government",
        "Democracy",
        "Leader"
      ]
    },
    {
      "id": "politics-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"responsibility for decisions and actions\"?",
      "answer": "Accountability",
      "options": [
        "Citizen",
        "Legislation",
        "Election",
        "Accountability"
      ]
    },
    {
      "id": "politics-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"to choose in an election\"?",
      "answer": "Vote",
      "options": [
        "Leader",
        "Government",
        "Vote",
        "Democracy"
      ]
    },
    {
      "id": "politics-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"a person who guides a group\"?",
      "answer": "Leader",
      "options": [
        "Citizen",
        "Leader",
        "Legislation",
        "Election"
      ]
    },
    {
      "id": "politics-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"a process of choosing leaders\"?",
      "answer": "Election",
      "options": [
        "Election",
        "Accountability",
        "Policy",
        "Campaign"
      ]
    },
    {
      "id": "politics-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"a plan or rule made by authority\"?",
      "answer": "Policy",
      "options": [
        "Vote",
        "Government",
        "Democracy",
        "Policy"
      ]
    },
    {
      "id": "politics-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"the system that runs a country\"?",
      "answer": "Government",
      "options": [
        "Citizen",
        "Legislation",
        "Government",
        "Leader"
      ]
    },
    {
      "id": "politics-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal politics & government context, which term best matches: \"a legal member of a country\"?",
      "answer": "Citizen",
      "options": [
        "Accountability",
        "Citizen",
        "Election",
        "Campaign"
      ]
    }
  ],
  "id": [
    {
      "id": "politics-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to choose in an election\"?",
      "answer": "Vote",
      "options": [
        "Vote",
        "Policy",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who guides a group\"?",
      "answer": "Leader",
      "options": [
        "Government",
        "Democracy",
        "Vote",
        "Leader"
      ]
    },
    {
      "id": "politics-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a process of choosing leaders\"?",
      "answer": "Election",
      "options": [
        "Legislation",
        "Leader",
        "Election",
        "Citizen"
      ]
    },
    {
      "id": "politics-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a plan or rule made by authority\"?",
      "answer": "Policy",
      "options": [
        "Election",
        "Policy",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the system that runs a country\"?",
      "answer": "Government",
      "options": [
        "Government",
        "Democracy",
        "Vote",
        "Policy"
      ]
    },
    {
      "id": "politics-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a legal member of a country\"?",
      "answer": "Citizen",
      "options": [
        "Legislation",
        "Leader",
        "Government",
        "Citizen"
      ]
    },
    {
      "id": "politics-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"organized actions to win support\"?",
      "answer": "Campaign",
      "options": [
        "Election",
        "Citizen",
        "Campaign",
        "Accountability"
      ]
    },
    {
      "id": "politics-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"government chosen by the people\"?",
      "answer": "Democracy",
      "options": [
        "Campaign",
        "Democracy",
        "Vote",
        "Policy"
      ]
    },
    {
      "id": "politics-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"laws made by a government\"?",
      "answer": "Legislation",
      "options": [
        "Legislation",
        "Leader",
        "Government",
        "Democracy"
      ]
    },
    {
      "id": "politics-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"responsibility for decisions and actions\"?",
      "answer": "Accountability",
      "options": [
        "Election",
        "Citizen",
        "Legislation",
        "Accountability"
      ]
    },
    {
      "id": "politics-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"a plan or rule made by authority\".",
      "answer": "Policy",
      "options": [
        "Election",
        "Campaign",
        "Accountability",
        "Policy"
      ]
    },
    {
      "id": "politics-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"the system that runs a country\".",
      "answer": "Government",
      "options": [
        "Democracy",
        "Vote",
        "Government",
        "Policy"
      ]
    },
    {
      "id": "politics-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"a legal member of a country\".",
      "answer": "Citizen",
      "options": [
        "Leader",
        "Citizen",
        "Government",
        "Legislation"
      ]
    },
    {
      "id": "politics-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"organized actions to win support\".",
      "answer": "Campaign",
      "options": [
        "Campaign",
        "Citizen",
        "Accountability",
        "Election"
      ]
    },
    {
      "id": "politics-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"government chosen by the people\".",
      "answer": "Democracy",
      "options": [
        "Campaign",
        "Vote",
        "Policy",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"laws made by a government\".",
      "answer": "Legislation",
      "options": [
        "Leader",
        "Government",
        "Legislation",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"responsibility for decisions and actions\".",
      "answer": "Accountability",
      "options": [
        "Citizen",
        "Accountability",
        "Legislation",
        "Election"
      ]
    },
    {
      "id": "politics-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"to choose in an election\".",
      "answer": "Vote",
      "options": [
        "Vote",
        "Leader",
        "Government",
        "Democracy"
      ]
    },
    {
      "id": "politics-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"a person who guides a group\".",
      "answer": "Leader",
      "options": [
        "Election",
        "Citizen",
        "Legislation",
        "Leader"
      ]
    },
    {
      "id": "politics-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Politics & Government: \"a process of choosing leaders\".",
      "answer": "Election",
      "options": [
        "Campaign",
        "Accountability",
        "Election",
        "Policy"
      ]
    },
    {
      "id": "politics-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"organized actions to win support\"?",
      "answer": "Campaign",
      "options": [
        "Citizen",
        "Accountability",
        "Campaign",
        "Election"
      ]
    },
    {
      "id": "politics-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"government chosen by the people\"?",
      "answer": "Democracy",
      "options": [
        "Vote",
        "Democracy",
        "Policy",
        "Campaign"
      ]
    },
    {
      "id": "politics-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"laws made by a government\"?",
      "answer": "Legislation",
      "options": [
        "Legislation",
        "Government",
        "Democracy",
        "Leader"
      ]
    },
    {
      "id": "politics-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"responsibility for decisions and actions\"?",
      "answer": "Accountability",
      "options": [
        "Citizen",
        "Legislation",
        "Election",
        "Accountability"
      ]
    },
    {
      "id": "politics-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"to choose in an election\"?",
      "answer": "Vote",
      "options": [
        "Leader",
        "Government",
        "Vote",
        "Democracy"
      ]
    },
    {
      "id": "politics-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who guides a group\"?",
      "answer": "Leader",
      "options": [
        "Citizen",
        "Leader",
        "Legislation",
        "Election"
      ]
    },
    {
      "id": "politics-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"a process of choosing leaders\"?",
      "answer": "Election",
      "options": [
        "Election",
        "Accountability",
        "Policy",
        "Campaign"
      ]
    },
    {
      "id": "politics-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"a plan or rule made by authority\"?",
      "answer": "Policy",
      "options": [
        "Vote",
        "Government",
        "Democracy",
        "Policy"
      ]
    },
    {
      "id": "politics-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"the system that runs a country\"?",
      "answer": "Government",
      "options": [
        "Citizen",
        "Legislation",
        "Government",
        "Leader"
      ]
    },
    {
      "id": "politics-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks politics & government yang lebih formal, istilah mana yang paling sesuai dengan: \"a legal member of a country\"?",
      "answer": "Citizen",
      "options": [
        "Accountability",
        "Citizen",
        "Election",
        "Campaign"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik25Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik25"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
