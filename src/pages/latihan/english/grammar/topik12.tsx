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
  "id": "intensifiers",
  "title": "So / Such / Too / Enough",
  "description": "Latihan penggunaan intensifier dan penunjuk kecukupan.",
  "topicNumber": 12
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "intensifiers-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "such",
        "so",
        "too",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "so",
        "such",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "such",
        "so",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "intensifiers-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "intensifiers-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "intensifiers-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "intensifiers-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "intensifiers-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "such",
        "so",
        "too",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "so",
        "such",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "too",
        "such",
        "so",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "intensifiers-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "intensifiers-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "intensifiers-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "intensifiers-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "intensifiers-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "enough",
        "such",
        "so",
        "too"
      ]
    },
    {
      "id": "intensifiers-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "too",
        "so",
        "such",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "too",
        "such",
        "so",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "intensifiers-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "intensifiers-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "intensifiers-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "intensifiers-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "intensifiers-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "too",
        "enough",
        "such",
        "so"
      ]
    },
    {
      "id": "intensifiers-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "enough",
        "too",
        "so",
        "such"
      ]
    },
    {
      "id": "intensifiers-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "enough",
        "too",
        "such",
        "so"
      ]
    },
    {
      "id": "intensifiers-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "intensifiers-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "intensifiers-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "intensifiers-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "such",
        "so",
        "too",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "so",
        "such",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "such",
        "so",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "intensifiers-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "intensifiers-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "intensifiers-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "intensifiers-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "intensifiers-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "such",
        "so",
        "too",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "so",
        "such",
        "enough",
        "too"
      ]
    },
    {
      "id": "intensifiers-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "too",
        "such",
        "so",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "intensifiers-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "intensifiers-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "intensifiers-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "intensifiers-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "intensifiers-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "enough",
        "such",
        "so",
        "too"
      ]
    },
    {
      "id": "intensifiers-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "too",
        "so",
        "such",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "too",
        "such",
        "so",
        "enough"
      ]
    },
    {
      "id": "intensifiers-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "intensifiers-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "intensifiers-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "intensifiers-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "intensifiers-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "intensifiers-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete: It was ____ a beautiful day.",
      "answer": "such",
      "options": [
        "too",
        "enough",
        "such",
        "so"
      ]
    },
    {
      "id": "intensifiers-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete: The coffee is ____ hot to drink.",
      "answer": "too",
      "options": [
        "enough",
        "too",
        "so",
        "such"
      ]
    },
    {
      "id": "intensifiers-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete: She is old ____ to drive.",
      "answer": "enough",
      "options": [
        "enough",
        "too",
        "such",
        "so"
      ]
    },
    {
      "id": "intensifiers-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "intensifiers-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "intensifiers-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (So / Such / Too / Enough): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik12Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik12"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
