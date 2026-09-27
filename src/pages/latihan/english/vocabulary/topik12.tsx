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
  "id": "shopping",
  "title": "Shopping, Fashion & Money",
  "description": "Kosakata belanja, pakaian, uang, dan harga.",
  "topicNumber": 12,
  "terms": [
    {
      "word": "Price",
      "meaning": "the amount of money something costs"
    },
    {
      "word": "Receipt",
      "meaning": "proof that you paid for something"
    },
    {
      "word": "Discount",
      "meaning": "a reduced price"
    },
    {
      "word": "Cashier",
      "meaning": "a person who takes payment in a shop"
    },
    {
      "word": "Refund",
      "meaning": "money returned after buying something"
    },
    {
      "word": "Bargain",
      "meaning": "something bought for a low price"
    },
    {
      "word": "Budget",
      "meaning": "a plan for spending money"
    },
    {
      "word": "Purchase",
      "meaning": "something bought"
    },
    {
      "word": "Installment",
      "meaning": "one payment in a series"
    },
    {
      "word": "Warranty",
      "meaning": "a promise to repair or replace a product"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "shopping-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"the amount of money something costs\"?",
      "answer": "Price",
      "options": [
        "Price",
        "Cashier",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"proof that you paid for something\"?",
      "answer": "Receipt",
      "options": [
        "Refund",
        "Purchase",
        "Price",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a reduced price\"?",
      "answer": "Discount",
      "options": [
        "Installment",
        "Receipt",
        "Discount",
        "Bargain"
      ]
    },
    {
      "id": "shopping-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a person who takes payment in a shop\"?",
      "answer": "Cashier",
      "options": [
        "Discount",
        "Cashier",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"money returned after buying something\"?",
      "answer": "Refund",
      "options": [
        "Refund",
        "Purchase",
        "Price",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"something bought for a low price\"?",
      "answer": "Bargain",
      "options": [
        "Installment",
        "Receipt",
        "Refund",
        "Bargain"
      ]
    },
    {
      "id": "shopping-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a plan for spending money\"?",
      "answer": "Budget",
      "options": [
        "Discount",
        "Bargain",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"something bought\"?",
      "answer": "Purchase",
      "options": [
        "Budget",
        "Purchase",
        "Price",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"one payment in a series\"?",
      "answer": "Installment",
      "options": [
        "Installment",
        "Receipt",
        "Refund",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a promise to repair or replace a product\"?",
      "answer": "Warranty",
      "options": [
        "Discount",
        "Bargain",
        "Installment",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"a person who takes payment in a shop\".",
      "answer": "Cashier",
      "options": [
        "Discount",
        "Budget",
        "Warranty",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"money returned after buying something\".",
      "answer": "Refund",
      "options": [
        "Purchase",
        "Price",
        "Refund",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"something bought for a low price\".",
      "answer": "Bargain",
      "options": [
        "Receipt",
        "Bargain",
        "Refund",
        "Installment"
      ]
    },
    {
      "id": "shopping-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"a plan for spending money\".",
      "answer": "Budget",
      "options": [
        "Budget",
        "Bargain",
        "Warranty",
        "Discount"
      ]
    },
    {
      "id": "shopping-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"something bought\".",
      "answer": "Purchase",
      "options": [
        "Budget",
        "Price",
        "Cashier",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"one payment in a series\".",
      "answer": "Installment",
      "options": [
        "Receipt",
        "Refund",
        "Installment",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"a promise to repair or replace a product\".",
      "answer": "Warranty",
      "options": [
        "Bargain",
        "Warranty",
        "Installment",
        "Discount"
      ]
    },
    {
      "id": "shopping-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"the amount of money something costs\".",
      "answer": "Price",
      "options": [
        "Price",
        "Receipt",
        "Refund",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"proof that you paid for something\".",
      "answer": "Receipt",
      "options": [
        "Discount",
        "Bargain",
        "Installment",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Shopping, Fashion & Money: \"a reduced price\".",
      "answer": "Discount",
      "options": [
        "Budget",
        "Warranty",
        "Discount",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"a plan for spending money\"?",
      "answer": "Budget",
      "options": [
        "Bargain",
        "Warranty",
        "Budget",
        "Discount"
      ]
    },
    {
      "id": "shopping-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"something bought\"?",
      "answer": "Purchase",
      "options": [
        "Price",
        "Purchase",
        "Cashier",
        "Budget"
      ]
    },
    {
      "id": "shopping-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"one payment in a series\"?",
      "answer": "Installment",
      "options": [
        "Installment",
        "Refund",
        "Purchase",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"a promise to repair or replace a product\"?",
      "answer": "Warranty",
      "options": [
        "Bargain",
        "Installment",
        "Discount",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"the amount of money something costs\"?",
      "answer": "Price",
      "options": [
        "Receipt",
        "Refund",
        "Price",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"proof that you paid for something\"?",
      "answer": "Receipt",
      "options": [
        "Bargain",
        "Receipt",
        "Installment",
        "Discount"
      ]
    },
    {
      "id": "shopping-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"a reduced price\"?",
      "answer": "Discount",
      "options": [
        "Discount",
        "Warranty",
        "Cashier",
        "Budget"
      ]
    },
    {
      "id": "shopping-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"a person who takes payment in a shop\"?",
      "answer": "Cashier",
      "options": [
        "Price",
        "Refund",
        "Purchase",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"money returned after buying something\"?",
      "answer": "Refund",
      "options": [
        "Bargain",
        "Installment",
        "Refund",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal shopping, fashion & money context, which term best matches: \"something bought for a low price\"?",
      "answer": "Bargain",
      "options": [
        "Warranty",
        "Bargain",
        "Discount",
        "Budget"
      ]
    }
  ],
  "id": [
    {
      "id": "shopping-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the amount of money something costs\"?",
      "answer": "Price",
      "options": [
        "Price",
        "Cashier",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"proof that you paid for something\"?",
      "answer": "Receipt",
      "options": [
        "Refund",
        "Purchase",
        "Price",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a reduced price\"?",
      "answer": "Discount",
      "options": [
        "Installment",
        "Receipt",
        "Discount",
        "Bargain"
      ]
    },
    {
      "id": "shopping-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who takes payment in a shop\"?",
      "answer": "Cashier",
      "options": [
        "Discount",
        "Cashier",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money returned after buying something\"?",
      "answer": "Refund",
      "options": [
        "Refund",
        "Purchase",
        "Price",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"something bought for a low price\"?",
      "answer": "Bargain",
      "options": [
        "Installment",
        "Receipt",
        "Refund",
        "Bargain"
      ]
    },
    {
      "id": "shopping-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a plan for spending money\"?",
      "answer": "Budget",
      "options": [
        "Discount",
        "Bargain",
        "Budget",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"something bought\"?",
      "answer": "Purchase",
      "options": [
        "Budget",
        "Purchase",
        "Price",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"one payment in a series\"?",
      "answer": "Installment",
      "options": [
        "Installment",
        "Receipt",
        "Refund",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a promise to repair or replace a product\"?",
      "answer": "Warranty",
      "options": [
        "Discount",
        "Bargain",
        "Installment",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"a person who takes payment in a shop\".",
      "answer": "Cashier",
      "options": [
        "Discount",
        "Budget",
        "Warranty",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"money returned after buying something\".",
      "answer": "Refund",
      "options": [
        "Purchase",
        "Price",
        "Refund",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"something bought for a low price\".",
      "answer": "Bargain",
      "options": [
        "Receipt",
        "Bargain",
        "Refund",
        "Installment"
      ]
    },
    {
      "id": "shopping-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"a plan for spending money\".",
      "answer": "Budget",
      "options": [
        "Budget",
        "Bargain",
        "Warranty",
        "Discount"
      ]
    },
    {
      "id": "shopping-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"something bought\".",
      "answer": "Purchase",
      "options": [
        "Budget",
        "Price",
        "Cashier",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"one payment in a series\".",
      "answer": "Installment",
      "options": [
        "Receipt",
        "Refund",
        "Installment",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"a promise to repair or replace a product\".",
      "answer": "Warranty",
      "options": [
        "Bargain",
        "Warranty",
        "Installment",
        "Discount"
      ]
    },
    {
      "id": "shopping-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"the amount of money something costs\".",
      "answer": "Price",
      "options": [
        "Price",
        "Receipt",
        "Refund",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"proof that you paid for something\".",
      "answer": "Receipt",
      "options": [
        "Discount",
        "Bargain",
        "Installment",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Shopping, Fashion & Money: \"a reduced price\".",
      "answer": "Discount",
      "options": [
        "Budget",
        "Warranty",
        "Discount",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"a plan for spending money\"?",
      "answer": "Budget",
      "options": [
        "Bargain",
        "Warranty",
        "Budget",
        "Discount"
      ]
    },
    {
      "id": "shopping-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"something bought\"?",
      "answer": "Purchase",
      "options": [
        "Price",
        "Purchase",
        "Cashier",
        "Budget"
      ]
    },
    {
      "id": "shopping-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"one payment in a series\"?",
      "answer": "Installment",
      "options": [
        "Installment",
        "Refund",
        "Purchase",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"a promise to repair or replace a product\"?",
      "answer": "Warranty",
      "options": [
        "Bargain",
        "Installment",
        "Discount",
        "Warranty"
      ]
    },
    {
      "id": "shopping-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"the amount of money something costs\"?",
      "answer": "Price",
      "options": [
        "Receipt",
        "Refund",
        "Price",
        "Purchase"
      ]
    },
    {
      "id": "shopping-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"proof that you paid for something\"?",
      "answer": "Receipt",
      "options": [
        "Bargain",
        "Receipt",
        "Installment",
        "Discount"
      ]
    },
    {
      "id": "shopping-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"a reduced price\"?",
      "answer": "Discount",
      "options": [
        "Discount",
        "Warranty",
        "Cashier",
        "Budget"
      ]
    },
    {
      "id": "shopping-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who takes payment in a shop\"?",
      "answer": "Cashier",
      "options": [
        "Price",
        "Refund",
        "Purchase",
        "Cashier"
      ]
    },
    {
      "id": "shopping-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"money returned after buying something\"?",
      "answer": "Refund",
      "options": [
        "Bargain",
        "Installment",
        "Refund",
        "Receipt"
      ]
    },
    {
      "id": "shopping-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks shopping, fashion & money yang lebih formal, istilah mana yang paling sesuai dengan: \"something bought for a low price\"?",
      "answer": "Bargain",
      "options": [
        "Warranty",
        "Bargain",
        "Discount",
        "Budget"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik12Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik12"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
