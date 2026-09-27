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
  "id": "family",
  "title": "Family & Relationships",
  "description": "Kosakata keluarga, hubungan, dan relasi sosial.",
  "topicNumber": 26,
  "terms": [
    {
      "word": "Parent",
      "meaning": "a mother or father"
    },
    {
      "word": "Sibling",
      "meaning": "a brother or sister"
    },
    {
      "word": "Cousin",
      "meaning": "a child of your aunt or uncle"
    },
    {
      "word": "Marriage",
      "meaning": "a legal relationship between partners"
    },
    {
      "word": "Relative",
      "meaning": "a member of your family"
    },
    {
      "word": "Supportive",
      "meaning": "helpful and encouraging"
    },
    {
      "word": "Conflict",
      "meaning": "a serious disagreement"
    },
    {
      "word": "Relationship",
      "meaning": "a connection between people"
    },
    {
      "word": "Commitment",
      "meaning": "a strong promise or responsibility"
    },
    {
      "word": "Reconciliation",
      "meaning": "repairing a damaged relationship"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "family-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a mother or father\"?",
      "answer": "Parent",
      "options": [
        "Parent",
        "Marriage",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a brother or sister\"?",
      "answer": "Sibling",
      "options": [
        "Relative",
        "Relationship",
        "Parent",
        "Sibling"
      ]
    },
    {
      "id": "family-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a child of your aunt or uncle\"?",
      "answer": "Cousin",
      "options": [
        "Commitment",
        "Sibling",
        "Cousin",
        "Supportive"
      ]
    },
    {
      "id": "family-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a legal relationship between partners\"?",
      "answer": "Marriage",
      "options": [
        "Cousin",
        "Marriage",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a member of your family\"?",
      "answer": "Relative",
      "options": [
        "Relative",
        "Relationship",
        "Parent",
        "Marriage"
      ]
    },
    {
      "id": "family-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"helpful and encouraging\"?",
      "answer": "Supportive",
      "options": [
        "Commitment",
        "Sibling",
        "Relative",
        "Supportive"
      ]
    },
    {
      "id": "family-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a serious disagreement\"?",
      "answer": "Conflict",
      "options": [
        "Cousin",
        "Supportive",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a connection between people\"?",
      "answer": "Relationship",
      "options": [
        "Conflict",
        "Relationship",
        "Parent",
        "Marriage"
      ]
    },
    {
      "id": "family-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a strong promise or responsibility\"?",
      "answer": "Commitment",
      "options": [
        "Commitment",
        "Sibling",
        "Relative",
        "Relationship"
      ]
    },
    {
      "id": "family-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"repairing a damaged relationship\"?",
      "answer": "Reconciliation",
      "options": [
        "Cousin",
        "Supportive",
        "Commitment",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a legal relationship between partners\".",
      "answer": "Marriage",
      "options": [
        "Cousin",
        "Conflict",
        "Reconciliation",
        "Marriage"
      ]
    },
    {
      "id": "family-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a member of your family\".",
      "answer": "Relative",
      "options": [
        "Relationship",
        "Parent",
        "Relative",
        "Marriage"
      ]
    },
    {
      "id": "family-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"helpful and encouraging\".",
      "answer": "Supportive",
      "options": [
        "Sibling",
        "Supportive",
        "Relative",
        "Commitment"
      ]
    },
    {
      "id": "family-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a serious disagreement\".",
      "answer": "Conflict",
      "options": [
        "Conflict",
        "Supportive",
        "Reconciliation",
        "Cousin"
      ]
    },
    {
      "id": "family-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a connection between people\".",
      "answer": "Relationship",
      "options": [
        "Conflict",
        "Parent",
        "Marriage",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a strong promise or responsibility\".",
      "answer": "Commitment",
      "options": [
        "Sibling",
        "Relative",
        "Commitment",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"repairing a damaged relationship\".",
      "answer": "Reconciliation",
      "options": [
        "Supportive",
        "Reconciliation",
        "Commitment",
        "Cousin"
      ]
    },
    {
      "id": "family-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a mother or father\".",
      "answer": "Parent",
      "options": [
        "Parent",
        "Sibling",
        "Relative",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a brother or sister\".",
      "answer": "Sibling",
      "options": [
        "Cousin",
        "Supportive",
        "Commitment",
        "Sibling"
      ]
    },
    {
      "id": "family-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Family & Relationships: \"a child of your aunt or uncle\".",
      "answer": "Cousin",
      "options": [
        "Conflict",
        "Reconciliation",
        "Cousin",
        "Marriage"
      ]
    },
    {
      "id": "family-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a serious disagreement\"?",
      "answer": "Conflict",
      "options": [
        "Supportive",
        "Reconciliation",
        "Conflict",
        "Cousin"
      ]
    },
    {
      "id": "family-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a connection between people\"?",
      "answer": "Relationship",
      "options": [
        "Parent",
        "Relationship",
        "Marriage",
        "Conflict"
      ]
    },
    {
      "id": "family-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a strong promise or responsibility\"?",
      "answer": "Commitment",
      "options": [
        "Commitment",
        "Relative",
        "Relationship",
        "Sibling"
      ]
    },
    {
      "id": "family-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"repairing a damaged relationship\"?",
      "answer": "Reconciliation",
      "options": [
        "Supportive",
        "Commitment",
        "Cousin",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a mother or father\"?",
      "answer": "Parent",
      "options": [
        "Sibling",
        "Relative",
        "Parent",
        "Relationship"
      ]
    },
    {
      "id": "family-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a brother or sister\"?",
      "answer": "Sibling",
      "options": [
        "Supportive",
        "Sibling",
        "Commitment",
        "Cousin"
      ]
    },
    {
      "id": "family-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a child of your aunt or uncle\"?",
      "answer": "Cousin",
      "options": [
        "Cousin",
        "Reconciliation",
        "Marriage",
        "Conflict"
      ]
    },
    {
      "id": "family-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a legal relationship between partners\"?",
      "answer": "Marriage",
      "options": [
        "Parent",
        "Relative",
        "Relationship",
        "Marriage"
      ]
    },
    {
      "id": "family-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"a member of your family\"?",
      "answer": "Relative",
      "options": [
        "Supportive",
        "Commitment",
        "Relative",
        "Sibling"
      ]
    },
    {
      "id": "family-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal family & relationships context, which term best matches: \"helpful and encouraging\"?",
      "answer": "Supportive",
      "options": [
        "Reconciliation",
        "Supportive",
        "Cousin",
        "Conflict"
      ]
    }
  ],
  "id": [
    {
      "id": "family-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a mother or father\"?",
      "answer": "Parent",
      "options": [
        "Parent",
        "Marriage",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a brother or sister\"?",
      "answer": "Sibling",
      "options": [
        "Relative",
        "Relationship",
        "Parent",
        "Sibling"
      ]
    },
    {
      "id": "family-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a child of your aunt or uncle\"?",
      "answer": "Cousin",
      "options": [
        "Commitment",
        "Sibling",
        "Cousin",
        "Supportive"
      ]
    },
    {
      "id": "family-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a legal relationship between partners\"?",
      "answer": "Marriage",
      "options": [
        "Cousin",
        "Marriage",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a member of your family\"?",
      "answer": "Relative",
      "options": [
        "Relative",
        "Relationship",
        "Parent",
        "Marriage"
      ]
    },
    {
      "id": "family-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"helpful and encouraging\"?",
      "answer": "Supportive",
      "options": [
        "Commitment",
        "Sibling",
        "Relative",
        "Supportive"
      ]
    },
    {
      "id": "family-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a serious disagreement\"?",
      "answer": "Conflict",
      "options": [
        "Cousin",
        "Supportive",
        "Conflict",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a connection between people\"?",
      "answer": "Relationship",
      "options": [
        "Conflict",
        "Relationship",
        "Parent",
        "Marriage"
      ]
    },
    {
      "id": "family-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a strong promise or responsibility\"?",
      "answer": "Commitment",
      "options": [
        "Commitment",
        "Sibling",
        "Relative",
        "Relationship"
      ]
    },
    {
      "id": "family-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"repairing a damaged relationship\"?",
      "answer": "Reconciliation",
      "options": [
        "Cousin",
        "Supportive",
        "Commitment",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a legal relationship between partners\".",
      "answer": "Marriage",
      "options": [
        "Cousin",
        "Conflict",
        "Reconciliation",
        "Marriage"
      ]
    },
    {
      "id": "family-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a member of your family\".",
      "answer": "Relative",
      "options": [
        "Relationship",
        "Parent",
        "Relative",
        "Marriage"
      ]
    },
    {
      "id": "family-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"helpful and encouraging\".",
      "answer": "Supportive",
      "options": [
        "Sibling",
        "Supportive",
        "Relative",
        "Commitment"
      ]
    },
    {
      "id": "family-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a serious disagreement\".",
      "answer": "Conflict",
      "options": [
        "Conflict",
        "Supportive",
        "Reconciliation",
        "Cousin"
      ]
    },
    {
      "id": "family-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a connection between people\".",
      "answer": "Relationship",
      "options": [
        "Conflict",
        "Parent",
        "Marriage",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a strong promise or responsibility\".",
      "answer": "Commitment",
      "options": [
        "Sibling",
        "Relative",
        "Commitment",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"repairing a damaged relationship\".",
      "answer": "Reconciliation",
      "options": [
        "Supportive",
        "Reconciliation",
        "Commitment",
        "Cousin"
      ]
    },
    {
      "id": "family-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a mother or father\".",
      "answer": "Parent",
      "options": [
        "Parent",
        "Sibling",
        "Relative",
        "Relationship"
      ]
    },
    {
      "id": "family-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a brother or sister\".",
      "answer": "Sibling",
      "options": [
        "Cousin",
        "Supportive",
        "Commitment",
        "Sibling"
      ]
    },
    {
      "id": "family-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Family & Relationships: \"a child of your aunt or uncle\".",
      "answer": "Cousin",
      "options": [
        "Conflict",
        "Reconciliation",
        "Cousin",
        "Marriage"
      ]
    },
    {
      "id": "family-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a serious disagreement\"?",
      "answer": "Conflict",
      "options": [
        "Supportive",
        "Reconciliation",
        "Conflict",
        "Cousin"
      ]
    },
    {
      "id": "family-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a connection between people\"?",
      "answer": "Relationship",
      "options": [
        "Parent",
        "Relationship",
        "Marriage",
        "Conflict"
      ]
    },
    {
      "id": "family-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a strong promise or responsibility\"?",
      "answer": "Commitment",
      "options": [
        "Commitment",
        "Relative",
        "Relationship",
        "Sibling"
      ]
    },
    {
      "id": "family-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"repairing a damaged relationship\"?",
      "answer": "Reconciliation",
      "options": [
        "Supportive",
        "Commitment",
        "Cousin",
        "Reconciliation"
      ]
    },
    {
      "id": "family-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a mother or father\"?",
      "answer": "Parent",
      "options": [
        "Sibling",
        "Relative",
        "Parent",
        "Relationship"
      ]
    },
    {
      "id": "family-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a brother or sister\"?",
      "answer": "Sibling",
      "options": [
        "Supportive",
        "Sibling",
        "Commitment",
        "Cousin"
      ]
    },
    {
      "id": "family-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a child of your aunt or uncle\"?",
      "answer": "Cousin",
      "options": [
        "Cousin",
        "Reconciliation",
        "Marriage",
        "Conflict"
      ]
    },
    {
      "id": "family-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a legal relationship between partners\"?",
      "answer": "Marriage",
      "options": [
        "Parent",
        "Relative",
        "Relationship",
        "Marriage"
      ]
    },
    {
      "id": "family-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"a member of your family\"?",
      "answer": "Relative",
      "options": [
        "Supportive",
        "Commitment",
        "Relative",
        "Sibling"
      ]
    },
    {
      "id": "family-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks family & relationships yang lebih formal, istilah mana yang paling sesuai dengan: \"helpful and encouraging\"?",
      "answer": "Supportive",
      "options": [
        "Reconciliation",
        "Supportive",
        "Cousin",
        "Conflict"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik26Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik26"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
