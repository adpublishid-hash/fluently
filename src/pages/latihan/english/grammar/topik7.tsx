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
  "id": "tenses",
  "title": "The 12 Tenses Challenge",
  "description": "Uji pemahamanmu tentang 12 tenses dasar Bahasa Inggris.",
  "topicNumber": 7
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "tenses-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "was cooking",
        "cook",
        "have cooked",
        "am cook"
      ]
    },
    {
      "id": "tenses-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "lives",
        "lived",
        "is living",
        "has lived"
      ]
    },
    {
      "id": "tenses-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrives",
        "have arrived",
        "will arrive",
        "arrived"
      ]
    },
    {
      "id": "tenses-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "tenses-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "tenses-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "tenses-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "tenses-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "tenses-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "was cooking",
        "cook",
        "have cooked",
        "am cook"
      ]
    },
    {
      "id": "tenses-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "lives",
        "lived",
        "is living",
        "has lived"
      ]
    },
    {
      "id": "tenses-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrived",
        "arrives",
        "have arrived",
        "will arrive"
      ]
    },
    {
      "id": "tenses-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "tenses-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "tenses-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "tenses-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "tenses-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "tenses-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "am cook",
        "was cooking",
        "cook",
        "have cooked"
      ]
    },
    {
      "id": "tenses-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "has lived",
        "lives",
        "lived",
        "is living"
      ]
    },
    {
      "id": "tenses-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrived",
        "arrives",
        "have arrived",
        "will arrive"
      ]
    },
    {
      "id": "tenses-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "tenses-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "tenses-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "tenses-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "tenses-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "tenses-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "have cooked",
        "am cook",
        "was cooking",
        "cook"
      ]
    },
    {
      "id": "tenses-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "is living",
        "has lived",
        "lives",
        "lived"
      ]
    },
    {
      "id": "tenses-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "will arrive",
        "arrived",
        "arrives",
        "have arrived"
      ]
    },
    {
      "id": "tenses-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "tenses-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "tenses-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "tenses-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "was cooking",
        "cook",
        "have cooked",
        "am cook"
      ]
    },
    {
      "id": "tenses-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "lives",
        "lived",
        "is living",
        "has lived"
      ]
    },
    {
      "id": "tenses-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrives",
        "have arrived",
        "will arrive",
        "arrived"
      ]
    },
    {
      "id": "tenses-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "tenses-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "tenses-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "tenses-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "tenses-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "tenses-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "was cooking",
        "cook",
        "have cooked",
        "am cook"
      ]
    },
    {
      "id": "tenses-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "lives",
        "lived",
        "is living",
        "has lived"
      ]
    },
    {
      "id": "tenses-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrived",
        "arrives",
        "have arrived",
        "will arrive"
      ]
    },
    {
      "id": "tenses-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "tenses-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "tenses-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "tenses-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "tenses-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "tenses-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "am cook",
        "was cooking",
        "cook",
        "have cooked"
      ]
    },
    {
      "id": "tenses-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "has lived",
        "lives",
        "lived",
        "is living"
      ]
    },
    {
      "id": "tenses-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "arrived",
        "arrives",
        "have arrived",
        "will arrive"
      ]
    },
    {
      "id": "tenses-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "tenses-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "tenses-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "tenses-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "tenses-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "tenses-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete: I ____ dinner when you called.",
      "answer": "was cooking",
      "options": [
        "have cooked",
        "am cook",
        "was cooking",
        "cook"
      ]
    },
    {
      "id": "tenses-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete: She ____ in Bali since 2020.",
      "answer": "has lived",
      "options": [
        "is living",
        "has lived",
        "lives",
        "lived"
      ]
    },
    {
      "id": "tenses-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete: They ____ tomorrow morning.",
      "answer": "will arrive",
      "options": [
        "will arrive",
        "arrived",
        "arrives",
        "have arrived"
      ]
    },
    {
      "id": "tenses-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "tenses-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "tenses-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (The 12 Tenses Challenge): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik7Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik7"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
