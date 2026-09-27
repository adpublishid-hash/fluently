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
  "id": "modal-verbs",
  "title": "Modal Verbs",
  "description": "Latihan Can, Should, Must, May, dan bentuk lampaunya.",
  "topicNumber": 15
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "modal-verbs-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "must",
        "can",
        "may",
        "would"
      ]
    },
    {
      "id": "modal-verbs-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Must",
        "Should",
        "Have",
        "May"
      ]
    },
    {
      "id": "modal-verbs-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "may",
        "will",
        "should",
        "can"
      ]
    },
    {
      "id": "modal-verbs-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "modal-verbs-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "modal-verbs-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "modal-verbs-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "modal-verbs-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "must",
        "can",
        "may",
        "would"
      ]
    },
    {
      "id": "modal-verbs-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Must",
        "Should",
        "Have",
        "May"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "can",
        "may",
        "will",
        "should"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "modal-verbs-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "would",
        "must",
        "can",
        "may"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "May",
        "Must",
        "Should",
        "Have"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "can",
        "may",
        "will",
        "should"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "modal-verbs-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "modal-verbs-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "modal-verbs-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "modal-verbs-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "may",
        "would",
        "must",
        "can"
      ]
    },
    {
      "id": "modal-verbs-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Have",
        "May",
        "Must",
        "Should"
      ]
    },
    {
      "id": "modal-verbs-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "should",
        "can",
        "may",
        "will"
      ]
    },
    {
      "id": "modal-verbs-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "modal-verbs-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "modal-verbs-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "modal-verbs-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "must",
        "can",
        "may",
        "would"
      ]
    },
    {
      "id": "modal-verbs-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Must",
        "Should",
        "Have",
        "May"
      ]
    },
    {
      "id": "modal-verbs-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "may",
        "will",
        "should",
        "can"
      ]
    },
    {
      "id": "modal-verbs-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "modal-verbs-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "modal-verbs-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "modal-verbs-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "modal-verbs-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "must",
        "can",
        "may",
        "would"
      ]
    },
    {
      "id": "modal-verbs-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Must",
        "Should",
        "Have",
        "May"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "can",
        "may",
        "will",
        "should"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "modal-verbs-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "would",
        "must",
        "can",
        "may"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "May",
        "Must",
        "Should",
        "Have"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "can",
        "may",
        "will",
        "should"
      ]
    },
    {
      "id": "modal-verbs-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "modal-verbs-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "modal-verbs-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "modal-verbs-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "modal-verbs-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "modal-verbs-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete: You ____ wear a helmet.",
      "answer": "must",
      "options": [
        "may",
        "would",
        "must",
        "can"
      ]
    },
    {
      "id": "modal-verbs-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete: ____ I borrow your pen?",
      "answer": "May",
      "options": [
        "Have",
        "May",
        "Must",
        "Should"
      ]
    },
    {
      "id": "modal-verbs-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete: You ____ see a doctor if you feel worse.",
      "answer": "should",
      "options": [
        "should",
        "can",
        "may",
        "will"
      ]
    },
    {
      "id": "modal-verbs-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "modal-verbs-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "modal-verbs-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Modal Verbs): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik15Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik15"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
