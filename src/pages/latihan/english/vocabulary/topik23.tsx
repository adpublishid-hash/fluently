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
  "id": "money-finance",
  "title": "Money & Finance",
  "description": "Kosakata bank, investasi, dan keuangan.",
  "topicNumber": 23,
  "terms": [
    {
      "word": "Cash",
      "meaning": "money in coins or notes"
    },
    {
      "word": "Bank",
      "meaning": "a place that keeps and lends money"
    },
    {
      "word": "Savings",
      "meaning": "money kept for future use"
    },
    {
      "word": "Debt",
      "meaning": "money owed to someone"
    },
    {
      "word": "Interest",
      "meaning": "extra money paid for borrowing"
    },
    {
      "word": "Investment",
      "meaning": "money put into something to gain profit"
    },
    {
      "word": "Profit",
      "meaning": "money gained after costs"
    },
    {
      "word": "Expense",
      "meaning": "money spent on something"
    },
    {
      "word": "Inflation",
      "meaning": "a rise in general prices"
    },
    {
      "word": "Portfolio",
      "meaning": "a collection of investments"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "money-finance-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"money in coins or notes\"?",
      "answer": "Cash",
      "options": [
        "Cash",
        "Debt",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a place that keeps and lends money\"?",
      "answer": "Bank",
      "options": [
        "Interest",
        "Expense",
        "Cash",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"money kept for future use\"?",
      "answer": "Savings",
      "options": [
        "Inflation",
        "Bank",
        "Savings",
        "Investment"
      ]
    },
    {
      "id": "money-finance-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"money owed to someone\"?",
      "answer": "Debt",
      "options": [
        "Savings",
        "Debt",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"extra money paid for borrowing\"?",
      "answer": "Interest",
      "options": [
        "Interest",
        "Expense",
        "Cash",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"money put into something to gain profit\"?",
      "answer": "Investment",
      "options": [
        "Inflation",
        "Bank",
        "Interest",
        "Investment"
      ]
    },
    {
      "id": "money-finance-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"money gained after costs\"?",
      "answer": "Profit",
      "options": [
        "Savings",
        "Investment",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"money spent on something\"?",
      "answer": "Expense",
      "options": [
        "Profit",
        "Expense",
        "Cash",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a rise in general prices\"?",
      "answer": "Inflation",
      "options": [
        "Inflation",
        "Bank",
        "Interest",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a collection of investments\"?",
      "answer": "Portfolio",
      "options": [
        "Savings",
        "Investment",
        "Inflation",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money owed to someone\".",
      "answer": "Debt",
      "options": [
        "Savings",
        "Profit",
        "Portfolio",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"extra money paid for borrowing\".",
      "answer": "Interest",
      "options": [
        "Expense",
        "Cash",
        "Interest",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money put into something to gain profit\".",
      "answer": "Investment",
      "options": [
        "Bank",
        "Investment",
        "Interest",
        "Inflation"
      ]
    },
    {
      "id": "money-finance-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money gained after costs\".",
      "answer": "Profit",
      "options": [
        "Profit",
        "Investment",
        "Portfolio",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money spent on something\".",
      "answer": "Expense",
      "options": [
        "Profit",
        "Cash",
        "Debt",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"a rise in general prices\".",
      "answer": "Inflation",
      "options": [
        "Bank",
        "Interest",
        "Inflation",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"a collection of investments\".",
      "answer": "Portfolio",
      "options": [
        "Investment",
        "Portfolio",
        "Inflation",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money in coins or notes\".",
      "answer": "Cash",
      "options": [
        "Cash",
        "Bank",
        "Interest",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"a place that keeps and lends money\".",
      "answer": "Bank",
      "options": [
        "Savings",
        "Investment",
        "Inflation",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Money & Finance: \"money kept for future use\".",
      "answer": "Savings",
      "options": [
        "Profit",
        "Portfolio",
        "Savings",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money gained after costs\"?",
      "answer": "Profit",
      "options": [
        "Investment",
        "Portfolio",
        "Profit",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money spent on something\"?",
      "answer": "Expense",
      "options": [
        "Cash",
        "Expense",
        "Debt",
        "Profit"
      ]
    },
    {
      "id": "money-finance-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"a rise in general prices\"?",
      "answer": "Inflation",
      "options": [
        "Inflation",
        "Interest",
        "Expense",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"a collection of investments\"?",
      "answer": "Portfolio",
      "options": [
        "Investment",
        "Inflation",
        "Savings",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money in coins or notes\"?",
      "answer": "Cash",
      "options": [
        "Bank",
        "Interest",
        "Cash",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"a place that keeps and lends money\"?",
      "answer": "Bank",
      "options": [
        "Investment",
        "Bank",
        "Inflation",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money kept for future use\"?",
      "answer": "Savings",
      "options": [
        "Savings",
        "Portfolio",
        "Debt",
        "Profit"
      ]
    },
    {
      "id": "money-finance-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money owed to someone\"?",
      "answer": "Debt",
      "options": [
        "Cash",
        "Interest",
        "Expense",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"extra money paid for borrowing\"?",
      "answer": "Interest",
      "options": [
        "Investment",
        "Inflation",
        "Interest",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal money & finance context, which term best matches: \"money put into something to gain profit\"?",
      "answer": "Investment",
      "options": [
        "Portfolio",
        "Investment",
        "Savings",
        "Profit"
      ]
    }
  ],
  "id": [
    {
      "id": "money-finance-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money in coins or notes\"?",
      "answer": "Cash",
      "options": [
        "Cash",
        "Debt",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place that keeps and lends money\"?",
      "answer": "Bank",
      "options": [
        "Interest",
        "Expense",
        "Cash",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money kept for future use\"?",
      "answer": "Savings",
      "options": [
        "Inflation",
        "Bank",
        "Savings",
        "Investment"
      ]
    },
    {
      "id": "money-finance-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money owed to someone\"?",
      "answer": "Debt",
      "options": [
        "Savings",
        "Debt",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"extra money paid for borrowing\"?",
      "answer": "Interest",
      "options": [
        "Interest",
        "Expense",
        "Cash",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money put into something to gain profit\"?",
      "answer": "Investment",
      "options": [
        "Inflation",
        "Bank",
        "Interest",
        "Investment"
      ]
    },
    {
      "id": "money-finance-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money gained after costs\"?",
      "answer": "Profit",
      "options": [
        "Savings",
        "Investment",
        "Profit",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money spent on something\"?",
      "answer": "Expense",
      "options": [
        "Profit",
        "Expense",
        "Cash",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a rise in general prices\"?",
      "answer": "Inflation",
      "options": [
        "Inflation",
        "Bank",
        "Interest",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a collection of investments\"?",
      "answer": "Portfolio",
      "options": [
        "Savings",
        "Investment",
        "Inflation",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money owed to someone\".",
      "answer": "Debt",
      "options": [
        "Savings",
        "Profit",
        "Portfolio",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"extra money paid for borrowing\".",
      "answer": "Interest",
      "options": [
        "Expense",
        "Cash",
        "Interest",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money put into something to gain profit\".",
      "answer": "Investment",
      "options": [
        "Bank",
        "Investment",
        "Interest",
        "Inflation"
      ]
    },
    {
      "id": "money-finance-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money gained after costs\".",
      "answer": "Profit",
      "options": [
        "Profit",
        "Investment",
        "Portfolio",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money spent on something\".",
      "answer": "Expense",
      "options": [
        "Profit",
        "Cash",
        "Debt",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"a rise in general prices\".",
      "answer": "Inflation",
      "options": [
        "Bank",
        "Interest",
        "Inflation",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"a collection of investments\".",
      "answer": "Portfolio",
      "options": [
        "Investment",
        "Portfolio",
        "Inflation",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money in coins or notes\".",
      "answer": "Cash",
      "options": [
        "Cash",
        "Bank",
        "Interest",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"a place that keeps and lends money\".",
      "answer": "Bank",
      "options": [
        "Savings",
        "Investment",
        "Inflation",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Money & Finance: \"money kept for future use\".",
      "answer": "Savings",
      "options": [
        "Profit",
        "Portfolio",
        "Savings",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money gained after costs\"?",
      "answer": "Profit",
      "options": [
        "Investment",
        "Portfolio",
        "Profit",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money spent on something\"?",
      "answer": "Expense",
      "options": [
        "Cash",
        "Expense",
        "Debt",
        "Profit"
      ]
    },
    {
      "id": "money-finance-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"a rise in general prices\"?",
      "answer": "Inflation",
      "options": [
        "Inflation",
        "Interest",
        "Expense",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"a collection of investments\"?",
      "answer": "Portfolio",
      "options": [
        "Investment",
        "Inflation",
        "Savings",
        "Portfolio"
      ]
    },
    {
      "id": "money-finance-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money in coins or notes\"?",
      "answer": "Cash",
      "options": [
        "Bank",
        "Interest",
        "Cash",
        "Expense"
      ]
    },
    {
      "id": "money-finance-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"a place that keeps and lends money\"?",
      "answer": "Bank",
      "options": [
        "Investment",
        "Bank",
        "Inflation",
        "Savings"
      ]
    },
    {
      "id": "money-finance-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money kept for future use\"?",
      "answer": "Savings",
      "options": [
        "Savings",
        "Portfolio",
        "Debt",
        "Profit"
      ]
    },
    {
      "id": "money-finance-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money owed to someone\"?",
      "answer": "Debt",
      "options": [
        "Cash",
        "Interest",
        "Expense",
        "Debt"
      ]
    },
    {
      "id": "money-finance-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"extra money paid for borrowing\"?",
      "answer": "Interest",
      "options": [
        "Investment",
        "Inflation",
        "Interest",
        "Bank"
      ]
    },
    {
      "id": "money-finance-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks money & finance yang lebih formal, istilah mana yang paling sesuai dengan: \"money put into something to gain profit\"?",
      "answer": "Investment",
      "options": [
        "Portfolio",
        "Investment",
        "Savings",
        "Profit"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik23Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik23"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
