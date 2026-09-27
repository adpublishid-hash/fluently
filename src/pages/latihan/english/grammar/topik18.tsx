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
  "id": "conditionals",
  "title": "Conditional Sentences",
  "description": "Latihan pengandaian (jika... maka...) Type 0, 1, 2, & 3.",
  "topicNumber": 18
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "conditionals-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "will stay",
        "stayed",
        "would stay",
        "stay"
      ]
    },
    {
      "id": "conditionals-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "will read",
        "read",
        "have read",
        "would read"
      ]
    },
    {
      "id": "conditionals-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "would boil",
        "boiled",
        "boils",
        "will boil"
      ]
    },
    {
      "id": "conditionals-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "conditionals-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "conditionals-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "conditionals-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "conditionals-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "conditionals-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "will stay",
        "stayed",
        "would stay",
        "stay"
      ]
    },
    {
      "id": "conditionals-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "will read",
        "read",
        "have read",
        "would read"
      ]
    },
    {
      "id": "conditionals-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "will boil",
        "would boil",
        "boiled",
        "boils"
      ]
    },
    {
      "id": "conditionals-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conditionals-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "conditionals-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "conditionals-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "conditionals-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "conditionals-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "stay",
        "will stay",
        "stayed",
        "would stay"
      ]
    },
    {
      "id": "conditionals-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "would read",
        "will read",
        "read",
        "have read"
      ]
    },
    {
      "id": "conditionals-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "will boil",
        "would boil",
        "boiled",
        "boils"
      ]
    },
    {
      "id": "conditionals-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conditionals-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conditionals-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "conditionals-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "conditionals-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "conditionals-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "would stay",
        "stay",
        "will stay",
        "stayed"
      ]
    },
    {
      "id": "conditionals-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "have read",
        "would read",
        "will read",
        "read"
      ]
    },
    {
      "id": "conditionals-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "boils",
        "will boil",
        "would boil",
        "boiled"
      ]
    },
    {
      "id": "conditionals-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "conditionals-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conditionals-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "conditionals-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "will stay",
        "stayed",
        "would stay",
        "stay"
      ]
    },
    {
      "id": "conditionals-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "will read",
        "read",
        "have read",
        "would read"
      ]
    },
    {
      "id": "conditionals-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "would boil",
        "boiled",
        "boils",
        "will boil"
      ]
    },
    {
      "id": "conditionals-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "conditionals-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "conditionals-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "conditionals-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "conditionals-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "conditionals-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "will stay",
        "stayed",
        "would stay",
        "stay"
      ]
    },
    {
      "id": "conditionals-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "will read",
        "read",
        "have read",
        "would read"
      ]
    },
    {
      "id": "conditionals-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "will boil",
        "would boil",
        "boiled",
        "boils"
      ]
    },
    {
      "id": "conditionals-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conditionals-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "conditionals-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "conditionals-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "conditionals-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "conditionals-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "stay",
        "will stay",
        "stayed",
        "would stay"
      ]
    },
    {
      "id": "conditionals-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "would read",
        "will read",
        "read",
        "have read"
      ]
    },
    {
      "id": "conditionals-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "will boil",
        "would boil",
        "boiled",
        "boils"
      ]
    },
    {
      "id": "conditionals-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conditionals-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conditionals-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "conditionals-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "conditionals-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "conditionals-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete: If it rains, we ____ at home.",
      "answer": "will stay",
      "options": [
        "would stay",
        "stay",
        "will stay",
        "stayed"
      ]
    },
    {
      "id": "conditionals-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete: If I had more time, I ____ more books.",
      "answer": "would read",
      "options": [
        "have read",
        "would read",
        "will read",
        "read"
      ]
    },
    {
      "id": "conditionals-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete: If water reaches 100°C, it ____.",
      "answer": "boils",
      "options": [
        "boils",
        "will boil",
        "would boil",
        "boiled"
      ]
    },
    {
      "id": "conditionals-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "conditionals-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conditionals-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conditional Sentences): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik18Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik18"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
