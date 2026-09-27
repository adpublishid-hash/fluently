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
  "id": "quantifiers",
  "title": "Quantifiers (Much/Many/Some/Any)",
  "description": "Latihan penggunaan kata penunjuk jumlah.",
  "topicNumber": 5
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "quantifiers-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "much",
        "many",
        "few",
        "several"
      ]
    },
    {
      "id": "quantifiers-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "much",
        "any",
        "little",
        "many"
      ]
    },
    {
      "id": "quantifiers-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "many",
        "few",
        "any",
        "some"
      ]
    },
    {
      "id": "quantifiers-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "quantifiers-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "quantifiers-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "quantifiers-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "quantifiers-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "quantifiers-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "much",
        "many",
        "few",
        "several"
      ]
    },
    {
      "id": "quantifiers-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "much",
        "any",
        "little",
        "many"
      ]
    },
    {
      "id": "quantifiers-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "some",
        "many",
        "few",
        "any"
      ]
    },
    {
      "id": "quantifiers-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "quantifiers-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "quantifiers-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "quantifiers-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "quantifiers-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "quantifiers-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "several",
        "much",
        "many",
        "few"
      ]
    },
    {
      "id": "quantifiers-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "many",
        "much",
        "any",
        "little"
      ]
    },
    {
      "id": "quantifiers-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "some",
        "many",
        "few",
        "any"
      ]
    },
    {
      "id": "quantifiers-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "quantifiers-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "quantifiers-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "quantifiers-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "quantifiers-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "quantifiers-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "few",
        "several",
        "much",
        "many"
      ]
    },
    {
      "id": "quantifiers-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "little",
        "many",
        "much",
        "any"
      ]
    },
    {
      "id": "quantifiers-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "any",
        "some",
        "many",
        "few"
      ]
    },
    {
      "id": "quantifiers-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "quantifiers-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "quantifiers-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "quantifiers-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "much",
        "many",
        "few",
        "several"
      ]
    },
    {
      "id": "quantifiers-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "much",
        "any",
        "little",
        "many"
      ]
    },
    {
      "id": "quantifiers-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "many",
        "few",
        "any",
        "some"
      ]
    },
    {
      "id": "quantifiers-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "quantifiers-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "quantifiers-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "quantifiers-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "quantifiers-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "quantifiers-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "much",
        "many",
        "few",
        "several"
      ]
    },
    {
      "id": "quantifiers-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "much",
        "any",
        "little",
        "many"
      ]
    },
    {
      "id": "quantifiers-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "some",
        "many",
        "few",
        "any"
      ]
    },
    {
      "id": "quantifiers-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "quantifiers-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "quantifiers-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "quantifiers-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "quantifiers-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "quantifiers-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "several",
        "much",
        "many",
        "few"
      ]
    },
    {
      "id": "quantifiers-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "many",
        "much",
        "any",
        "little"
      ]
    },
    {
      "id": "quantifiers-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "some",
        "many",
        "few",
        "any"
      ]
    },
    {
      "id": "quantifiers-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "quantifiers-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "quantifiers-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "quantifiers-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "quantifiers-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "quantifiers-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete: How ____ water do you drink?",
      "answer": "much",
      "options": [
        "few",
        "several",
        "much",
        "many"
      ]
    },
    {
      "id": "quantifiers-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete: I have ____ friends in this city.",
      "answer": "many",
      "options": [
        "little",
        "many",
        "much",
        "any"
      ]
    },
    {
      "id": "quantifiers-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete: We do not have ____ sugar left.",
      "answer": "any",
      "options": [
        "any",
        "some",
        "many",
        "few"
      ]
    },
    {
      "id": "quantifiers-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "quantifiers-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "quantifiers-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Quantifiers (Much/Many/Some/Any)): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik5Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik5"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
