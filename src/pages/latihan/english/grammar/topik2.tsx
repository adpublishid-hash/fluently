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
  "id": "be-auxiliary",
  "title": "Mastering \"To Be\" & Auxiliary Verbs",
  "description": "Latihan fokus pada Do/Does/Did vs Is/Am/Are/Was/Were.",
  "topicNumber": 2
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "be-auxiliary-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "is",
        "are",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Was",
        "Do",
        "Does",
        "Were"
      ]
    },
    {
      "id": "be-auxiliary-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "are",
        "was",
        "does",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "be-auxiliary-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "be-auxiliary-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "is",
        "are",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Was",
        "Do",
        "Does",
        "Were"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "is",
        "are",
        "was",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "does",
        "is",
        "are",
        "do"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Were",
        "Was",
        "Do",
        "Does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "is",
        "are",
        "was",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "do",
        "does",
        "is",
        "are"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Does",
        "Were",
        "Was",
        "Do"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "does",
        "is",
        "are",
        "was"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "be-auxiliary-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "is",
        "are",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Was",
        "Do",
        "Does",
        "Were"
      ]
    },
    {
      "id": "be-auxiliary-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "are",
        "was",
        "does",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "be-auxiliary-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "be-auxiliary-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "is",
        "are",
        "do",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Was",
        "Do",
        "Does",
        "Were"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "is",
        "are",
        "was",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "does",
        "is",
        "are",
        "do"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Were",
        "Was",
        "Do",
        "Does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "is",
        "are",
        "was",
        "does"
      ]
    },
    {
      "id": "be-auxiliary-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete: She ____ a teacher.",
      "answer": "is",
      "options": [
        "do",
        "does",
        "is",
        "are"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete: ____ they at home yesterday?",
      "answer": "Were",
      "options": [
        "Does",
        "Were",
        "Was",
        "Do"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete: He ____ not like coffee.",
      "answer": "does",
      "options": [
        "does",
        "is",
        "are",
        "was"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "be-auxiliary-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "be-auxiliary-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Mastering \"To Be\" & Auxiliary Verbs): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik2Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik2"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
