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
  "id": "active-passive",
  "title": "Active vs. Passive Voice",
  "description": "Latihan mengubah kalimat aktif menjadi pasif (di-/ter-).",
  "topicNumber": 16
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "active-passive-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter.",
        "The letter wrote Ana."
      ]
    },
    {
      "id": "active-passive-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "cleans",
        "cleaned",
        "is cleaning",
        "is cleaned"
      ]
    },
    {
      "id": "active-passive-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "made",
        "makes",
        "was made",
        "is made"
      ]
    },
    {
      "id": "active-passive-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "active-passive-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "active-passive-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "active-passive-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "active-passive-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "active-passive-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter.",
        "The letter wrote Ana."
      ]
    },
    {
      "id": "active-passive-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "cleans",
        "cleaned",
        "is cleaning",
        "is cleaned"
      ]
    },
    {
      "id": "active-passive-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "is made",
        "made",
        "makes",
        "was made"
      ]
    },
    {
      "id": "active-passive-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "active-passive-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "active-passive-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "active-passive-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "active-passive-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "active-passive-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter wrote Ana.",
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter."
      ]
    },
    {
      "id": "active-passive-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "is cleaned",
        "cleans",
        "cleaned",
        "is cleaning"
      ]
    },
    {
      "id": "active-passive-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "is made",
        "made",
        "makes",
        "was made"
      ]
    },
    {
      "id": "active-passive-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "active-passive-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "active-passive-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "active-passive-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "active-passive-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "active-passive-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "Ana was writing the letter.",
        "The letter wrote Ana.",
        "The letter was written by Ana.",
        "Ana wrote the letter."
      ]
    },
    {
      "id": "active-passive-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "is cleaning",
        "is cleaned",
        "cleans",
        "cleaned"
      ]
    },
    {
      "id": "active-passive-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "was made",
        "is made",
        "made",
        "makes"
      ]
    },
    {
      "id": "active-passive-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "active-passive-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "active-passive-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "active-passive-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter.",
        "The letter wrote Ana."
      ]
    },
    {
      "id": "active-passive-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "cleans",
        "cleaned",
        "is cleaning",
        "is cleaned"
      ]
    },
    {
      "id": "active-passive-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "made",
        "makes",
        "was made",
        "is made"
      ]
    },
    {
      "id": "active-passive-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "active-passive-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "active-passive-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "active-passive-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "active-passive-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "active-passive-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter.",
        "The letter wrote Ana."
      ]
    },
    {
      "id": "active-passive-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "cleans",
        "cleaned",
        "is cleaning",
        "is cleaned"
      ]
    },
    {
      "id": "active-passive-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "is made",
        "made",
        "makes",
        "was made"
      ]
    },
    {
      "id": "active-passive-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "active-passive-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "active-passive-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "active-passive-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "active-passive-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "active-passive-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "The letter wrote Ana.",
        "The letter was written by Ana.",
        "Ana wrote the letter.",
        "Ana was writing the letter."
      ]
    },
    {
      "id": "active-passive-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "is cleaned",
        "cleans",
        "cleaned",
        "is cleaning"
      ]
    },
    {
      "id": "active-passive-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "is made",
        "made",
        "makes",
        "was made"
      ]
    },
    {
      "id": "active-passive-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "active-passive-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "active-passive-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "active-passive-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "active-passive-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "active-passive-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Choose the passive sentence.",
      "answer": "The letter was written by Ana.",
      "options": [
        "Ana was writing the letter.",
        "The letter wrote Ana.",
        "The letter was written by Ana.",
        "Ana wrote the letter."
      ]
    },
    {
      "id": "active-passive-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Complete: The room ____ every day.",
      "answer": "is cleaned",
      "options": [
        "is cleaning",
        "is cleaned",
        "cleans",
        "cleaned"
      ]
    },
    {
      "id": "active-passive-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Complete: The cake ____ by my mother yesterday.",
      "answer": "was made",
      "options": [
        "was made",
        "is made",
        "made",
        "makes"
      ]
    },
    {
      "id": "active-passive-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "active-passive-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "active-passive-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Active vs. Passive Voice): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik16Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik16"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
