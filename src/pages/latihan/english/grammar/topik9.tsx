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
  "id": "adjectives-adverbs",
  "title": "Adjectives vs. Adverbs",
  "description": "Latihan perbedaan kata sifat (-er/more) dan kata keterangan (-ly).",
  "topicNumber": 9
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "adjectives-adverbs-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluently",
        "fluent",
        "more fluent",
        "fluency"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearly",
        "clearerly",
        "clearness",
        "clear"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "care",
        "more careful",
        "carefully",
        "careful"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluently",
        "fluent",
        "more fluent",
        "fluency"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearly",
        "clearerly",
        "clearness",
        "clear"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "careful",
        "care",
        "more careful",
        "carefully"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluency",
        "fluently",
        "fluent",
        "more fluent"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clear",
        "clearly",
        "clearerly",
        "clearness"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "careful",
        "care",
        "more careful",
        "carefully"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "more fluent",
        "fluency",
        "fluently",
        "fluent"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearness",
        "clear",
        "clearly",
        "clearerly"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "carefully",
        "careful",
        "care",
        "more careful"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "adjectives-adverbs-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluently",
        "fluent",
        "more fluent",
        "fluency"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearly",
        "clearerly",
        "clearness",
        "clear"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "care",
        "more careful",
        "carefully",
        "careful"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluently",
        "fluent",
        "more fluent",
        "fluency"
      ]
    },
    {
      "id": "adjectives-adverbs-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearly",
        "clearerly",
        "clearness",
        "clear"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "careful",
        "care",
        "more careful",
        "carefully"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "fluency",
        "fluently",
        "fluent",
        "more fluent"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clear",
        "clearly",
        "clearerly",
        "clearness"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "careful",
        "care",
        "more careful",
        "carefully"
      ]
    },
    {
      "id": "adjectives-adverbs-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete: She speaks English ____.",
      "answer": "fluently",
      "options": [
        "more fluent",
        "fluency",
        "fluently",
        "fluent"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete: This is a ____ answer.",
      "answer": "clear",
      "options": [
        "clearness",
        "clear",
        "clearly",
        "clearerly"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete: Drive ____ in the rain.",
      "answer": "carefully",
      "options": [
        "carefully",
        "careful",
        "care",
        "more careful"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "adjectives-adverbs-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Adjectives vs. Adverbs): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik9Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik9"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
