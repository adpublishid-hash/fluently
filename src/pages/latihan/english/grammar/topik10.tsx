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
  "id": "question-tags",
  "title": "Question Tags",
  "description": "Latihan membuat pertanyaan penegas di akhir kalimat.",
  "topicNumber": 10
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "question-tags-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "aren't you",
        "are you",
        "don't you",
        "weren't you"
      ]
    },
    {
      "id": "question-tags-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "isn't she",
        "does she",
        "didn't she",
        "doesn't she"
      ]
    },
    {
      "id": "question-tags-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "do they",
        "are they",
        "did they",
        "didn't they"
      ]
    },
    {
      "id": "question-tags-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "question-tags-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "question-tags-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "question-tags-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "question-tags-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "question-tags-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "aren't you",
        "are you",
        "don't you",
        "weren't you"
      ]
    },
    {
      "id": "question-tags-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "isn't she",
        "does she",
        "didn't she",
        "doesn't she"
      ]
    },
    {
      "id": "question-tags-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "didn't they",
        "do they",
        "are they",
        "did they"
      ]
    },
    {
      "id": "question-tags-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "question-tags-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "question-tags-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "question-tags-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "question-tags-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "question-tags-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "weren't you",
        "aren't you",
        "are you",
        "don't you"
      ]
    },
    {
      "id": "question-tags-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "doesn't she",
        "isn't she",
        "does she",
        "didn't she"
      ]
    },
    {
      "id": "question-tags-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "didn't they",
        "do they",
        "are they",
        "did they"
      ]
    },
    {
      "id": "question-tags-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "question-tags-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "question-tags-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "question-tags-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "question-tags-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "question-tags-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "don't you",
        "weren't you",
        "aren't you",
        "are you"
      ]
    },
    {
      "id": "question-tags-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "didn't she",
        "doesn't she",
        "isn't she",
        "does she"
      ]
    },
    {
      "id": "question-tags-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "did they",
        "didn't they",
        "do they",
        "are they"
      ]
    },
    {
      "id": "question-tags-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "question-tags-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "question-tags-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "question-tags-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "aren't you",
        "are you",
        "don't you",
        "weren't you"
      ]
    },
    {
      "id": "question-tags-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "isn't she",
        "does she",
        "didn't she",
        "doesn't she"
      ]
    },
    {
      "id": "question-tags-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "do they",
        "are they",
        "did they",
        "didn't they"
      ]
    },
    {
      "id": "question-tags-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "question-tags-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "question-tags-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "question-tags-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "question-tags-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "question-tags-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "aren't you",
        "are you",
        "don't you",
        "weren't you"
      ]
    },
    {
      "id": "question-tags-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "isn't she",
        "does she",
        "didn't she",
        "doesn't she"
      ]
    },
    {
      "id": "question-tags-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "didn't they",
        "do they",
        "are they",
        "did they"
      ]
    },
    {
      "id": "question-tags-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "question-tags-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "question-tags-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "question-tags-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "question-tags-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "question-tags-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "weren't you",
        "aren't you",
        "are you",
        "don't you"
      ]
    },
    {
      "id": "question-tags-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "doesn't she",
        "isn't she",
        "does she",
        "didn't she"
      ]
    },
    {
      "id": "question-tags-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "didn't they",
        "do they",
        "are they",
        "did they"
      ]
    },
    {
      "id": "question-tags-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "question-tags-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "question-tags-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "question-tags-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "question-tags-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "question-tags-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete: You are tired, ____?",
      "answer": "aren't you",
      "options": [
        "don't you",
        "weren't you",
        "aren't you",
        "are you"
      ]
    },
    {
      "id": "question-tags-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete: She likes tea, ____?",
      "answer": "doesn't she",
      "options": [
        "didn't she",
        "doesn't she",
        "isn't she",
        "does she"
      ]
    },
    {
      "id": "question-tags-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete: They did not come, ____?",
      "answer": "did they",
      "options": [
        "did they",
        "didn't they",
        "do they",
        "are they"
      ]
    },
    {
      "id": "question-tags-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "question-tags-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "question-tags-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Question Tags): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik10Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik10"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
