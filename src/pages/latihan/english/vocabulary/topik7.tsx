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
  "id": "personality",
  "title": "Personality & Character",
  "description": "Kata sifat tentang sifat, karakter, dan watak.",
  "topicNumber": 7,
  "terms": [
    {
      "word": "Friendly",
      "meaning": "kind and pleasant to others"
    },
    {
      "word": "Honest",
      "meaning": "telling the truth"
    },
    {
      "word": "Patient",
      "meaning": "able to wait calmly"
    },
    {
      "word": "Brave",
      "meaning": "not afraid of danger"
    },
    {
      "word": "Reliable",
      "meaning": "able to be trusted"
    },
    {
      "word": "Generous",
      "meaning": "willing to give or share"
    },
    {
      "word": "Stubborn",
      "meaning": "not willing to change your mind"
    },
    {
      "word": "Ambitious",
      "meaning": "strongly wanting success"
    },
    {
      "word": "Considerate",
      "meaning": "thinking about other people's feelings"
    },
    {
      "word": "Resilient",
      "meaning": "able to recover after difficulty"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "personality-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"kind and pleasant to others\"?",
      "answer": "Friendly",
      "options": [
        "Friendly",
        "Brave",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"telling the truth\"?",
      "answer": "Honest",
      "options": [
        "Reliable",
        "Ambitious",
        "Friendly",
        "Honest"
      ]
    },
    {
      "id": "personality-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"able to wait calmly\"?",
      "answer": "Patient",
      "options": [
        "Considerate",
        "Honest",
        "Patient",
        "Generous"
      ]
    },
    {
      "id": "personality-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"not afraid of danger\"?",
      "answer": "Brave",
      "options": [
        "Patient",
        "Brave",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"able to be trusted\"?",
      "answer": "Reliable",
      "options": [
        "Reliable",
        "Ambitious",
        "Friendly",
        "Brave"
      ]
    },
    {
      "id": "personality-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"willing to give or share\"?",
      "answer": "Generous",
      "options": [
        "Considerate",
        "Honest",
        "Reliable",
        "Generous"
      ]
    },
    {
      "id": "personality-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"not willing to change your mind\"?",
      "answer": "Stubborn",
      "options": [
        "Patient",
        "Generous",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"strongly wanting success\"?",
      "answer": "Ambitious",
      "options": [
        "Stubborn",
        "Ambitious",
        "Friendly",
        "Brave"
      ]
    },
    {
      "id": "personality-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"thinking about other people's feelings\"?",
      "answer": "Considerate",
      "options": [
        "Considerate",
        "Honest",
        "Reliable",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"able to recover after difficulty\"?",
      "answer": "Resilient",
      "options": [
        "Patient",
        "Generous",
        "Considerate",
        "Resilient"
      ]
    },
    {
      "id": "personality-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"not afraid of danger\".",
      "answer": "Brave",
      "options": [
        "Patient",
        "Stubborn",
        "Resilient",
        "Brave"
      ]
    },
    {
      "id": "personality-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"able to be trusted\".",
      "answer": "Reliable",
      "options": [
        "Ambitious",
        "Friendly",
        "Reliable",
        "Brave"
      ]
    },
    {
      "id": "personality-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"willing to give or share\".",
      "answer": "Generous",
      "options": [
        "Honest",
        "Generous",
        "Reliable",
        "Considerate"
      ]
    },
    {
      "id": "personality-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"not willing to change your mind\".",
      "answer": "Stubborn",
      "options": [
        "Stubborn",
        "Generous",
        "Resilient",
        "Patient"
      ]
    },
    {
      "id": "personality-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"strongly wanting success\".",
      "answer": "Ambitious",
      "options": [
        "Stubborn",
        "Friendly",
        "Brave",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"thinking about other people's feelings\".",
      "answer": "Considerate",
      "options": [
        "Honest",
        "Reliable",
        "Considerate",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"able to recover after difficulty\".",
      "answer": "Resilient",
      "options": [
        "Generous",
        "Resilient",
        "Considerate",
        "Patient"
      ]
    },
    {
      "id": "personality-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"kind and pleasant to others\".",
      "answer": "Friendly",
      "options": [
        "Friendly",
        "Honest",
        "Reliable",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"telling the truth\".",
      "answer": "Honest",
      "options": [
        "Patient",
        "Generous",
        "Considerate",
        "Honest"
      ]
    },
    {
      "id": "personality-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Personality & Character: \"able to wait calmly\".",
      "answer": "Patient",
      "options": [
        "Stubborn",
        "Resilient",
        "Patient",
        "Brave"
      ]
    },
    {
      "id": "personality-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"not willing to change your mind\"?",
      "answer": "Stubborn",
      "options": [
        "Generous",
        "Resilient",
        "Stubborn",
        "Patient"
      ]
    },
    {
      "id": "personality-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"strongly wanting success\"?",
      "answer": "Ambitious",
      "options": [
        "Friendly",
        "Ambitious",
        "Brave",
        "Stubborn"
      ]
    },
    {
      "id": "personality-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"thinking about other people's feelings\"?",
      "answer": "Considerate",
      "options": [
        "Considerate",
        "Reliable",
        "Ambitious",
        "Honest"
      ]
    },
    {
      "id": "personality-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"able to recover after difficulty\"?",
      "answer": "Resilient",
      "options": [
        "Generous",
        "Considerate",
        "Patient",
        "Resilient"
      ]
    },
    {
      "id": "personality-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"kind and pleasant to others\"?",
      "answer": "Friendly",
      "options": [
        "Honest",
        "Reliable",
        "Friendly",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"telling the truth\"?",
      "answer": "Honest",
      "options": [
        "Generous",
        "Honest",
        "Considerate",
        "Patient"
      ]
    },
    {
      "id": "personality-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"able to wait calmly\"?",
      "answer": "Patient",
      "options": [
        "Patient",
        "Resilient",
        "Brave",
        "Stubborn"
      ]
    },
    {
      "id": "personality-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"not afraid of danger\"?",
      "answer": "Brave",
      "options": [
        "Friendly",
        "Reliable",
        "Ambitious",
        "Brave"
      ]
    },
    {
      "id": "personality-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"able to be trusted\"?",
      "answer": "Reliable",
      "options": [
        "Generous",
        "Considerate",
        "Reliable",
        "Honest"
      ]
    },
    {
      "id": "personality-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal personality & character context, which term best matches: \"willing to give or share\"?",
      "answer": "Generous",
      "options": [
        "Resilient",
        "Generous",
        "Patient",
        "Stubborn"
      ]
    }
  ],
  "id": [
    {
      "id": "personality-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"kind and pleasant to others\"?",
      "answer": "Friendly",
      "options": [
        "Friendly",
        "Brave",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"telling the truth\"?",
      "answer": "Honest",
      "options": [
        "Reliable",
        "Ambitious",
        "Friendly",
        "Honest"
      ]
    },
    {
      "id": "personality-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"able to wait calmly\"?",
      "answer": "Patient",
      "options": [
        "Considerate",
        "Honest",
        "Patient",
        "Generous"
      ]
    },
    {
      "id": "personality-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"not afraid of danger\"?",
      "answer": "Brave",
      "options": [
        "Patient",
        "Brave",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"able to be trusted\"?",
      "answer": "Reliable",
      "options": [
        "Reliable",
        "Ambitious",
        "Friendly",
        "Brave"
      ]
    },
    {
      "id": "personality-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"willing to give or share\"?",
      "answer": "Generous",
      "options": [
        "Considerate",
        "Honest",
        "Reliable",
        "Generous"
      ]
    },
    {
      "id": "personality-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"not willing to change your mind\"?",
      "answer": "Stubborn",
      "options": [
        "Patient",
        "Generous",
        "Stubborn",
        "Resilient"
      ]
    },
    {
      "id": "personality-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"strongly wanting success\"?",
      "answer": "Ambitious",
      "options": [
        "Stubborn",
        "Ambitious",
        "Friendly",
        "Brave"
      ]
    },
    {
      "id": "personality-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"thinking about other people's feelings\"?",
      "answer": "Considerate",
      "options": [
        "Considerate",
        "Honest",
        "Reliable",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"able to recover after difficulty\"?",
      "answer": "Resilient",
      "options": [
        "Patient",
        "Generous",
        "Considerate",
        "Resilient"
      ]
    },
    {
      "id": "personality-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"not afraid of danger\".",
      "answer": "Brave",
      "options": [
        "Patient",
        "Stubborn",
        "Resilient",
        "Brave"
      ]
    },
    {
      "id": "personality-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"able to be trusted\".",
      "answer": "Reliable",
      "options": [
        "Ambitious",
        "Friendly",
        "Reliable",
        "Brave"
      ]
    },
    {
      "id": "personality-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"willing to give or share\".",
      "answer": "Generous",
      "options": [
        "Honest",
        "Generous",
        "Reliable",
        "Considerate"
      ]
    },
    {
      "id": "personality-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"not willing to change your mind\".",
      "answer": "Stubborn",
      "options": [
        "Stubborn",
        "Generous",
        "Resilient",
        "Patient"
      ]
    },
    {
      "id": "personality-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"strongly wanting success\".",
      "answer": "Ambitious",
      "options": [
        "Stubborn",
        "Friendly",
        "Brave",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"thinking about other people's feelings\".",
      "answer": "Considerate",
      "options": [
        "Honest",
        "Reliable",
        "Considerate",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"able to recover after difficulty\".",
      "answer": "Resilient",
      "options": [
        "Generous",
        "Resilient",
        "Considerate",
        "Patient"
      ]
    },
    {
      "id": "personality-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"kind and pleasant to others\".",
      "answer": "Friendly",
      "options": [
        "Friendly",
        "Honest",
        "Reliable",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"telling the truth\".",
      "answer": "Honest",
      "options": [
        "Patient",
        "Generous",
        "Considerate",
        "Honest"
      ]
    },
    {
      "id": "personality-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Personality & Character: \"able to wait calmly\".",
      "answer": "Patient",
      "options": [
        "Stubborn",
        "Resilient",
        "Patient",
        "Brave"
      ]
    },
    {
      "id": "personality-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"not willing to change your mind\"?",
      "answer": "Stubborn",
      "options": [
        "Generous",
        "Resilient",
        "Stubborn",
        "Patient"
      ]
    },
    {
      "id": "personality-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"strongly wanting success\"?",
      "answer": "Ambitious",
      "options": [
        "Friendly",
        "Ambitious",
        "Brave",
        "Stubborn"
      ]
    },
    {
      "id": "personality-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"thinking about other people's feelings\"?",
      "answer": "Considerate",
      "options": [
        "Considerate",
        "Reliable",
        "Ambitious",
        "Honest"
      ]
    },
    {
      "id": "personality-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"able to recover after difficulty\"?",
      "answer": "Resilient",
      "options": [
        "Generous",
        "Considerate",
        "Patient",
        "Resilient"
      ]
    },
    {
      "id": "personality-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"kind and pleasant to others\"?",
      "answer": "Friendly",
      "options": [
        "Honest",
        "Reliable",
        "Friendly",
        "Ambitious"
      ]
    },
    {
      "id": "personality-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"telling the truth\"?",
      "answer": "Honest",
      "options": [
        "Generous",
        "Honest",
        "Considerate",
        "Patient"
      ]
    },
    {
      "id": "personality-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"able to wait calmly\"?",
      "answer": "Patient",
      "options": [
        "Patient",
        "Resilient",
        "Brave",
        "Stubborn"
      ]
    },
    {
      "id": "personality-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"not afraid of danger\"?",
      "answer": "Brave",
      "options": [
        "Friendly",
        "Reliable",
        "Ambitious",
        "Brave"
      ]
    },
    {
      "id": "personality-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"able to be trusted\"?",
      "answer": "Reliable",
      "options": [
        "Generous",
        "Considerate",
        "Reliable",
        "Honest"
      ]
    },
    {
      "id": "personality-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks personality & character yang lebih formal, istilah mana yang paling sesuai dengan: \"willing to give or share\"?",
      "answer": "Generous",
      "options": [
        "Resilient",
        "Generous",
        "Patient",
        "Stubborn"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik7Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik7"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
