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
  "id": "prepositions-time-place",
  "title": "Prepositions of Time & Place",
  "description": "Latihan fokus pada penggunaan preposisi waktu dan tempat.",
  "topicNumber": 4
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "prepositions-time-place-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "on",
        "in",
        "at",
        "by"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "on",
        "at",
        "to",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "in",
        "from",
        "at",
        "on"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "on",
        "in",
        "at",
        "by"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "on",
        "at",
        "to",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "on",
        "in",
        "from",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "by",
        "on",
        "in",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "in",
        "on",
        "at",
        "to"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "on",
        "in",
        "from",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "at",
        "by",
        "on",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "to",
        "in",
        "on",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "at",
        "on",
        "in",
        "from"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "prepositions-time-place-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "on",
        "in",
        "at",
        "by"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "on",
        "at",
        "to",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "in",
        "from",
        "at",
        "on"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "on",
        "in",
        "at",
        "by"
      ]
    },
    {
      "id": "prepositions-time-place-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "on",
        "at",
        "to",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "on",
        "in",
        "from",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "by",
        "on",
        "in",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "in",
        "on",
        "at",
        "to"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "on",
        "in",
        "from",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete: The meeting is ____ Monday.",
      "answer": "on",
      "options": [
        "at",
        "by",
        "on",
        "in"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete: She lives ____ Jakarta.",
      "answer": "in",
      "options": [
        "to",
        "in",
        "on",
        "at"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete: I wake up ____ 6 a.m.",
      "answer": "at",
      "options": [
        "at",
        "on",
        "in",
        "from"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "prepositions-time-place-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Prepositions of Time & Place): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik4Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik4"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
