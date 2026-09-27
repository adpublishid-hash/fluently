import { VocabularyQuizPage } from '../../components/PracticeQuizPage';

type TopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
};

type QuizQuestion = {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  prompt: string;
  answer: string;
  options: string[];
};

const material: TopicMaterial = {
  "id": "comparison",
  "title": "Degrees of Comparison",
  "description": "Latihan Comparative dan Superlative (Better/Best, More/Most).",
  "topicNumber": 6
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "comparison-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "more interesting",
        "most interesting",
        "interestingest",
        "interestinger"
      ]
    },
    {
      "id": "comparison-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "better",
        "gooder",
        "more good",
        "best"
      ]
    },
    {
      "id": "comparison-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "more heavy",
        "heavyer",
        "heavier",
        "heaviest"
      ]
    },
    {
      "id": "comparison-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "comparison-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "comparison-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "comparison-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "comparison-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "comparison-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "more interesting",
        "most interesting",
        "interestingest",
        "interestinger"
      ]
    },
    {
      "id": "comparison-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "better",
        "gooder",
        "more good",
        "best"
      ]
    },
    {
      "id": "comparison-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heaviest",
        "more heavy",
        "heavyer",
        "heavier"
      ]
    },
    {
      "id": "comparison-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "comparison-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "comparison-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "comparison-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "comparison-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "comparison-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "interestinger",
        "more interesting",
        "most interesting",
        "interestingest"
      ]
    },
    {
      "id": "comparison-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "best",
        "better",
        "gooder",
        "more good"
      ]
    },
    {
      "id": "comparison-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heaviest",
        "more heavy",
        "heavyer",
        "heavier"
      ]
    },
    {
      "id": "comparison-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "comparison-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "comparison-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "comparison-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "comparison-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "comparison-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "interestingest",
        "interestinger",
        "more interesting",
        "most interesting"
      ]
    },
    {
      "id": "comparison-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "more good",
        "best",
        "better",
        "gooder"
      ]
    },
    {
      "id": "comparison-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heavier",
        "heaviest",
        "more heavy",
        "heavyer"
      ]
    },
    {
      "id": "comparison-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "comparison-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "comparison-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    }
  ],
  "id": [
    {
      "id": "comparison-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "more interesting",
        "most interesting",
        "interestingest",
        "interestinger"
      ]
    },
    {
      "id": "comparison-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "better",
        "gooder",
        "more good",
        "best"
      ]
    },
    {
      "id": "comparison-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "more heavy",
        "heavyer",
        "heavier",
        "heaviest"
      ]
    },
    {
      "id": "comparison-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "comparison-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "comparison-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "comparison-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "comparison-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "comparison-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "more interesting",
        "most interesting",
        "interestingest",
        "interestinger"
      ]
    },
    {
      "id": "comparison-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "better",
        "gooder",
        "more good",
        "best"
      ]
    },
    {
      "id": "comparison-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heaviest",
        "more heavy",
        "heavyer",
        "heavier"
      ]
    },
    {
      "id": "comparison-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "comparison-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "comparison-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "comparison-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "comparison-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "comparison-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "interestinger",
        "more interesting",
        "most interesting",
        "interestingest"
      ]
    },
    {
      "id": "comparison-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "best",
        "better",
        "gooder",
        "more good"
      ]
    },
    {
      "id": "comparison-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heaviest",
        "more heavy",
        "heavyer",
        "heavier"
      ]
    },
    {
      "id": "comparison-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "comparison-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "comparison-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "comparison-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "comparison-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "comparison-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete: This book is ____ than that one.",
      "answer": "more interesting",
      "options": [
        "interestingest",
        "interestinger",
        "more interesting",
        "most interesting"
      ]
    },
    {
      "id": "comparison-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete: She is the ____ student in class.",
      "answer": "best",
      "options": [
        "more good",
        "best",
        "better",
        "gooder"
      ]
    },
    {
      "id": "comparison-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete: My bag is ____ than yours.",
      "answer": "heavier",
      "options": [
        "heavier",
        "heaviest",
        "more heavy",
        "heavyer"
      ]
    },
    {
      "id": "comparison-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "comparison-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "comparison-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Degrees of Comparison): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishGrammarTopik6Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik6"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
