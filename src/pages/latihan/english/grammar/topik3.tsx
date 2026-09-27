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
  "id": "nouns-articles",
  "title": "Nouns & Articles (A/An/The)",
  "description": "Latihan Countable/Uncountable Nouns dan penggunaan artikel.",
  "topicNumber": 3
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "nouns-articles-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "an",
        "a",
        "the",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "A",
        "An",
        "-",
        "The"
      ]
    },
    {
      "id": "nouns-articles-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "many information",
        "a few information",
        "some information",
        "an information"
      ]
    },
    {
      "id": "nouns-articles-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "nouns-articles-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "nouns-articles-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "nouns-articles-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "nouns-articles-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "an",
        "a",
        "the",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "A",
        "An",
        "-",
        "The"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "an information",
        "many information",
        "a few information",
        "some information"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "nouns-articles-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "-",
        "an",
        "a",
        "the"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "The",
        "A",
        "An",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "an information",
        "many information",
        "a few information",
        "some information"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "nouns-articles-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "nouns-articles-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "nouns-articles-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "nouns-articles-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "the",
        "-",
        "an",
        "a"
      ]
    },
    {
      "id": "nouns-articles-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "-",
        "The",
        "A",
        "An"
      ]
    },
    {
      "id": "nouns-articles-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "some information",
        "an information",
        "many information",
        "a few information"
      ]
    },
    {
      "id": "nouns-articles-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "nouns-articles-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "nouns-articles-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "nouns-articles-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "an",
        "a",
        "the",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "A",
        "An",
        "-",
        "The"
      ]
    },
    {
      "id": "nouns-articles-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "many information",
        "a few information",
        "some information",
        "an information"
      ]
    },
    {
      "id": "nouns-articles-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "nouns-articles-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "nouns-articles-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "nouns-articles-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "nouns-articles-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "an",
        "a",
        "the",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "A",
        "An",
        "-",
        "The"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "an information",
        "many information",
        "a few information",
        "some information"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "nouns-articles-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "-",
        "an",
        "a",
        "the"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "The",
        "A",
        "An",
        "-"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "an information",
        "many information",
        "a few information",
        "some information"
      ]
    },
    {
      "id": "nouns-articles-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "nouns-articles-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "nouns-articles-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "nouns-articles-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "nouns-articles-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "nouns-articles-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Complete: I saw ____ elephant at the zoo.",
      "answer": "an",
      "options": [
        "the",
        "-",
        "an",
        "a"
      ]
    },
    {
      "id": "nouns-articles-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Complete: ____ sun rises in the east.",
      "answer": "The",
      "options": [
        "-",
        "The",
        "A",
        "An"
      ]
    },
    {
      "id": "nouns-articles-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Choose the correct phrase.",
      "answer": "some information",
      "options": [
        "some information",
        "an information",
        "many information",
        "a few information"
      ]
    },
    {
      "id": "nouns-articles-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "nouns-articles-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "nouns-articles-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Nouns & Articles (A/An/The)): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik3Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik3"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
