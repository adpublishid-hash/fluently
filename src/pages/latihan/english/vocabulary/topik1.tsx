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
  "id": "general",
  "title": "General Vocabulary",
  "description": "Kata dasar untuk situasi umum sehari-hari.",
  "topicNumber": 1,
  "terms": [
    {
      "word": "Breakfast",
      "meaning": "a meal eaten in the morning"
    },
    {
      "word": "Umbrella",
      "meaning": "an object used to protect you from rain"
    },
    {
      "word": "Uncle",
      "meaning": "your father's or mother's brother"
    },
    {
      "word": "Doctor",
      "meaning": "a person who treats sick people"
    },
    {
      "word": "Cinema",
      "meaning": "a place where people watch movies"
    },
    {
      "word": "Student",
      "meaning": "a person who studies at school"
    },
    {
      "word": "Schedule",
      "meaning": "a plan that shows when things happen"
    },
    {
      "word": "Improve",
      "meaning": "to become better"
    },
    {
      "word": "Confident",
      "meaning": "feeling sure about yourself"
    },
    {
      "word": "Opportunity",
      "meaning": "a good chance to do something"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "general-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a meal eaten in the morning\"?",
      "answer": "Breakfast",
      "options": [
        "Breakfast",
        "Doctor",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"an object used to protect you from rain\"?",
      "answer": "Umbrella",
      "options": [
        "Cinema",
        "Improve",
        "Breakfast",
        "Umbrella"
      ]
    },
    {
      "id": "general-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"your father's or mother's brother\"?",
      "answer": "Uncle",
      "options": [
        "Confident",
        "Umbrella",
        "Uncle",
        "Student"
      ]
    },
    {
      "id": "general-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a person who treats sick people\"?",
      "answer": "Doctor",
      "options": [
        "Uncle",
        "Doctor",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a place where people watch movies\"?",
      "answer": "Cinema",
      "options": [
        "Cinema",
        "Improve",
        "Breakfast",
        "Doctor"
      ]
    },
    {
      "id": "general-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a person who studies at school\"?",
      "answer": "Student",
      "options": [
        "Confident",
        "Umbrella",
        "Cinema",
        "Student"
      ]
    },
    {
      "id": "general-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a plan that shows when things happen\"?",
      "answer": "Schedule",
      "options": [
        "Uncle",
        "Student",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"to become better\"?",
      "answer": "Improve",
      "options": [
        "Schedule",
        "Improve",
        "Breakfast",
        "Doctor"
      ]
    },
    {
      "id": "general-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"feeling sure about yourself\"?",
      "answer": "Confident",
      "options": [
        "Confident",
        "Umbrella",
        "Cinema",
        "Improve"
      ]
    },
    {
      "id": "general-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a good chance to do something\"?",
      "answer": "Opportunity",
      "options": [
        "Uncle",
        "Student",
        "Confident",
        "Opportunity"
      ]
    },
    {
      "id": "general-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a person who treats sick people\".",
      "answer": "Doctor",
      "options": [
        "Uncle",
        "Schedule",
        "Opportunity",
        "Doctor"
      ]
    },
    {
      "id": "general-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a place where people watch movies\".",
      "answer": "Cinema",
      "options": [
        "Improve",
        "Breakfast",
        "Cinema",
        "Doctor"
      ]
    },
    {
      "id": "general-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a person who studies at school\".",
      "answer": "Student",
      "options": [
        "Umbrella",
        "Student",
        "Cinema",
        "Confident"
      ]
    },
    {
      "id": "general-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a plan that shows when things happen\".",
      "answer": "Schedule",
      "options": [
        "Schedule",
        "Student",
        "Opportunity",
        "Uncle"
      ]
    },
    {
      "id": "general-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"to become better\".",
      "answer": "Improve",
      "options": [
        "Schedule",
        "Breakfast",
        "Doctor",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"feeling sure about yourself\".",
      "answer": "Confident",
      "options": [
        "Umbrella",
        "Cinema",
        "Confident",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a good chance to do something\".",
      "answer": "Opportunity",
      "options": [
        "Student",
        "Opportunity",
        "Confident",
        "Uncle"
      ]
    },
    {
      "id": "general-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"a meal eaten in the morning\".",
      "answer": "Breakfast",
      "options": [
        "Breakfast",
        "Umbrella",
        "Cinema",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"an object used to protect you from rain\".",
      "answer": "Umbrella",
      "options": [
        "Uncle",
        "Student",
        "Confident",
        "Umbrella"
      ]
    },
    {
      "id": "general-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in General Vocabulary: \"your father's or mother's brother\".",
      "answer": "Uncle",
      "options": [
        "Schedule",
        "Opportunity",
        "Uncle",
        "Doctor"
      ]
    },
    {
      "id": "general-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a plan that shows when things happen\"?",
      "answer": "Schedule",
      "options": [
        "Student",
        "Opportunity",
        "Schedule",
        "Uncle"
      ]
    },
    {
      "id": "general-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"to become better\"?",
      "answer": "Improve",
      "options": [
        "Breakfast",
        "Improve",
        "Doctor",
        "Schedule"
      ]
    },
    {
      "id": "general-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"feeling sure about yourself\"?",
      "answer": "Confident",
      "options": [
        "Confident",
        "Cinema",
        "Improve",
        "Umbrella"
      ]
    },
    {
      "id": "general-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a good chance to do something\"?",
      "answer": "Opportunity",
      "options": [
        "Student",
        "Confident",
        "Uncle",
        "Opportunity"
      ]
    },
    {
      "id": "general-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a meal eaten in the morning\"?",
      "answer": "Breakfast",
      "options": [
        "Umbrella",
        "Cinema",
        "Breakfast",
        "Improve"
      ]
    },
    {
      "id": "general-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"an object used to protect you from rain\"?",
      "answer": "Umbrella",
      "options": [
        "Student",
        "Umbrella",
        "Confident",
        "Uncle"
      ]
    },
    {
      "id": "general-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"your father's or mother's brother\"?",
      "answer": "Uncle",
      "options": [
        "Uncle",
        "Opportunity",
        "Doctor",
        "Schedule"
      ]
    },
    {
      "id": "general-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a person who treats sick people\"?",
      "answer": "Doctor",
      "options": [
        "Breakfast",
        "Cinema",
        "Improve",
        "Doctor"
      ]
    },
    {
      "id": "general-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a place where people watch movies\"?",
      "answer": "Cinema",
      "options": [
        "Student",
        "Confident",
        "Cinema",
        "Umbrella"
      ]
    },
    {
      "id": "general-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal general vocabulary context, which term best matches: \"a person who studies at school\"?",
      "answer": "Student",
      "options": [
        "Opportunity",
        "Student",
        "Uncle",
        "Schedule"
      ]
    }
  ],
  "id": [
    {
      "id": "general-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a meal eaten in the morning\"?",
      "answer": "Breakfast",
      "options": [
        "Breakfast",
        "Doctor",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an object used to protect you from rain\"?",
      "answer": "Umbrella",
      "options": [
        "Cinema",
        "Improve",
        "Breakfast",
        "Umbrella"
      ]
    },
    {
      "id": "general-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"your father's or mother's brother\"?",
      "answer": "Uncle",
      "options": [
        "Confident",
        "Umbrella",
        "Uncle",
        "Student"
      ]
    },
    {
      "id": "general-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who treats sick people\"?",
      "answer": "Doctor",
      "options": [
        "Uncle",
        "Doctor",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place where people watch movies\"?",
      "answer": "Cinema",
      "options": [
        "Cinema",
        "Improve",
        "Breakfast",
        "Doctor"
      ]
    },
    {
      "id": "general-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who studies at school\"?",
      "answer": "Student",
      "options": [
        "Confident",
        "Umbrella",
        "Cinema",
        "Student"
      ]
    },
    {
      "id": "general-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a plan that shows when things happen\"?",
      "answer": "Schedule",
      "options": [
        "Uncle",
        "Student",
        "Schedule",
        "Opportunity"
      ]
    },
    {
      "id": "general-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to become better\"?",
      "answer": "Improve",
      "options": [
        "Schedule",
        "Improve",
        "Breakfast",
        "Doctor"
      ]
    },
    {
      "id": "general-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"feeling sure about yourself\"?",
      "answer": "Confident",
      "options": [
        "Confident",
        "Umbrella",
        "Cinema",
        "Improve"
      ]
    },
    {
      "id": "general-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a good chance to do something\"?",
      "answer": "Opportunity",
      "options": [
        "Uncle",
        "Student",
        "Confident",
        "Opportunity"
      ]
    },
    {
      "id": "general-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a person who treats sick people\".",
      "answer": "Doctor",
      "options": [
        "Uncle",
        "Schedule",
        "Opportunity",
        "Doctor"
      ]
    },
    {
      "id": "general-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a place where people watch movies\".",
      "answer": "Cinema",
      "options": [
        "Improve",
        "Breakfast",
        "Cinema",
        "Doctor"
      ]
    },
    {
      "id": "general-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a person who studies at school\".",
      "answer": "Student",
      "options": [
        "Umbrella",
        "Student",
        "Cinema",
        "Confident"
      ]
    },
    {
      "id": "general-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a plan that shows when things happen\".",
      "answer": "Schedule",
      "options": [
        "Schedule",
        "Student",
        "Opportunity",
        "Uncle"
      ]
    },
    {
      "id": "general-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"to become better\".",
      "answer": "Improve",
      "options": [
        "Schedule",
        "Breakfast",
        "Doctor",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"feeling sure about yourself\".",
      "answer": "Confident",
      "options": [
        "Umbrella",
        "Cinema",
        "Confident",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a good chance to do something\".",
      "answer": "Opportunity",
      "options": [
        "Student",
        "Opportunity",
        "Confident",
        "Uncle"
      ]
    },
    {
      "id": "general-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"a meal eaten in the morning\".",
      "answer": "Breakfast",
      "options": [
        "Breakfast",
        "Umbrella",
        "Cinema",
        "Improve"
      ]
    },
    {
      "id": "general-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"an object used to protect you from rain\".",
      "answer": "Umbrella",
      "options": [
        "Uncle",
        "Student",
        "Confident",
        "Umbrella"
      ]
    },
    {
      "id": "general-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik General Vocabulary: \"your father's or mother's brother\".",
      "answer": "Uncle",
      "options": [
        "Schedule",
        "Opportunity",
        "Uncle",
        "Doctor"
      ]
    },
    {
      "id": "general-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a plan that shows when things happen\"?",
      "answer": "Schedule",
      "options": [
        "Student",
        "Opportunity",
        "Schedule",
        "Uncle"
      ]
    },
    {
      "id": "general-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"to become better\"?",
      "answer": "Improve",
      "options": [
        "Breakfast",
        "Improve",
        "Doctor",
        "Schedule"
      ]
    },
    {
      "id": "general-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"feeling sure about yourself\"?",
      "answer": "Confident",
      "options": [
        "Confident",
        "Cinema",
        "Improve",
        "Umbrella"
      ]
    },
    {
      "id": "general-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a good chance to do something\"?",
      "answer": "Opportunity",
      "options": [
        "Student",
        "Confident",
        "Uncle",
        "Opportunity"
      ]
    },
    {
      "id": "general-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a meal eaten in the morning\"?",
      "answer": "Breakfast",
      "options": [
        "Umbrella",
        "Cinema",
        "Breakfast",
        "Improve"
      ]
    },
    {
      "id": "general-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"an object used to protect you from rain\"?",
      "answer": "Umbrella",
      "options": [
        "Student",
        "Umbrella",
        "Confident",
        "Uncle"
      ]
    },
    {
      "id": "general-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"your father's or mother's brother\"?",
      "answer": "Uncle",
      "options": [
        "Uncle",
        "Opportunity",
        "Doctor",
        "Schedule"
      ]
    },
    {
      "id": "general-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who treats sick people\"?",
      "answer": "Doctor",
      "options": [
        "Breakfast",
        "Cinema",
        "Improve",
        "Doctor"
      ]
    },
    {
      "id": "general-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a place where people watch movies\"?",
      "answer": "Cinema",
      "options": [
        "Student",
        "Confident",
        "Cinema",
        "Umbrella"
      ]
    },
    {
      "id": "general-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks general vocabulary yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who studies at school\"?",
      "answer": "Student",
      "options": [
        "Opportunity",
        "Student",
        "Uncle",
        "Schedule"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik1Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik1"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
