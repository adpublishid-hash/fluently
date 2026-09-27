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
  "id": "used-to",
  "title": "Used to / Be used to",
  "description": "Latihan kebiasaan masa lalu dan adaptasi kebiasaan.",
  "topicNumber": 14
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "used-to-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used to",
        "am used to",
        "use to",
        "used"
      ]
    },
    {
      "id": "used-to-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wake up",
        "woke up",
        "wakes up",
        "waking up"
      ]
    },
    {
      "id": "used-to-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "are used to",
        "using to",
        "use to",
        "used to"
      ]
    },
    {
      "id": "used-to-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "used-to-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "used-to-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "used-to-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "used-to-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "used-to-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used to",
        "am used to",
        "use to",
        "used"
      ]
    },
    {
      "id": "used-to-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wake up",
        "woke up",
        "wakes up",
        "waking up"
      ]
    },
    {
      "id": "used-to-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "used to",
        "are used to",
        "using to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "used-to-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "used-to-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "used-to-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "used-to-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "used-to-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used",
        "used to",
        "am used to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "waking up",
        "wake up",
        "woke up",
        "wakes up"
      ]
    },
    {
      "id": "used-to-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "used to",
        "are used to",
        "using to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "used-to-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "used-to-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "used-to-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "used-to-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "used-to-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "use to",
        "used",
        "used to",
        "am used to"
      ]
    },
    {
      "id": "used-to-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wakes up",
        "waking up",
        "wake up",
        "woke up"
      ]
    },
    {
      "id": "used-to-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "use to",
        "used to",
        "are used to",
        "using to"
      ]
    },
    {
      "id": "used-to-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "used-to-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "used-to-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "used-to-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used to",
        "am used to",
        "use to",
        "used"
      ]
    },
    {
      "id": "used-to-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wake up",
        "woke up",
        "wakes up",
        "waking up"
      ]
    },
    {
      "id": "used-to-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "are used to",
        "using to",
        "use to",
        "used to"
      ]
    },
    {
      "id": "used-to-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "used-to-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "used-to-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "used-to-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "used-to-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "used-to-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used to",
        "am used to",
        "use to",
        "used"
      ]
    },
    {
      "id": "used-to-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wake up",
        "woke up",
        "wakes up",
        "waking up"
      ]
    },
    {
      "id": "used-to-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "used to",
        "are used to",
        "using to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "used-to-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "used-to-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "used-to-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "used-to-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "used-to-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "used",
        "used to",
        "am used to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "waking up",
        "wake up",
        "woke up",
        "wakes up"
      ]
    },
    {
      "id": "used-to-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "used to",
        "are used to",
        "using to",
        "use to"
      ]
    },
    {
      "id": "used-to-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "used-to-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "used-to-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "used-to-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "used-to-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "used-to-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete: I ____ play football every weekend.",
      "answer": "used to",
      "options": [
        "use to",
        "used",
        "used to",
        "am used to"
      ]
    },
    {
      "id": "used-to-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete: She is used to ____ early.",
      "answer": "waking up",
      "options": [
        "wakes up",
        "waking up",
        "wake up",
        "woke up"
      ]
    },
    {
      "id": "used-to-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete: Did you ____ live here?",
      "answer": "use to",
      "options": [
        "use to",
        "used to",
        "are used to",
        "using to"
      ]
    },
    {
      "id": "used-to-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "used-to-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "used-to-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Used to / Be used to): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik14Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik14"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
