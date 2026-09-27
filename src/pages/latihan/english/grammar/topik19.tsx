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
  "id": "conjunctions",
  "title": "Conjunctions (Kata Sambung)",
  "description": "Latihan kata hubung seperti and, but, because, although, dll.",
  "topicNumber": 19
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "conjunctions-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "because",
        "but",
        "although",
        "and"
      ]
    },
    {
      "id": "conjunctions-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "because",
        "so",
        "and",
        "but"
      ]
    },
    {
      "id": "conjunctions-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "So",
        "And",
        "Although",
        "Because"
      ]
    },
    {
      "id": "conjunctions-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "conjunctions-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "conjunctions-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "conjunctions-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "conjunctions-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "conjunctions-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "because",
        "but",
        "although",
        "and"
      ]
    },
    {
      "id": "conjunctions-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "because",
        "so",
        "and",
        "but"
      ]
    },
    {
      "id": "conjunctions-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Because",
        "So",
        "And",
        "Although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conjunctions-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "conjunctions-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "conjunctions-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "conjunctions-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "conjunctions-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "and",
        "because",
        "but",
        "although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "but",
        "because",
        "so",
        "and"
      ]
    },
    {
      "id": "conjunctions-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Because",
        "So",
        "And",
        "Although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conjunctions-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conjunctions-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "conjunctions-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "conjunctions-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "conjunctions-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "although",
        "and",
        "because",
        "but"
      ]
    },
    {
      "id": "conjunctions-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "and",
        "but",
        "because",
        "so"
      ]
    },
    {
      "id": "conjunctions-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Although",
        "Because",
        "So",
        "And"
      ]
    },
    {
      "id": "conjunctions-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "conjunctions-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conjunctions-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "conjunctions-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "because",
        "but",
        "although",
        "and"
      ]
    },
    {
      "id": "conjunctions-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "because",
        "so",
        "and",
        "but"
      ]
    },
    {
      "id": "conjunctions-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "So",
        "And",
        "Although",
        "Because"
      ]
    },
    {
      "id": "conjunctions-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "conjunctions-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "conjunctions-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "conjunctions-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "conjunctions-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "conjunctions-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "because",
        "but",
        "although",
        "and"
      ]
    },
    {
      "id": "conjunctions-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "because",
        "so",
        "and",
        "but"
      ]
    },
    {
      "id": "conjunctions-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Because",
        "So",
        "And",
        "Although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conjunctions-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "conjunctions-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "conjunctions-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "conjunctions-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "conjunctions-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "and",
        "because",
        "but",
        "although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "but",
        "because",
        "so",
        "and"
      ]
    },
    {
      "id": "conjunctions-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Because",
        "So",
        "And",
        "Although"
      ]
    },
    {
      "id": "conjunctions-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "conjunctions-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conjunctions-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "conjunctions-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "conjunctions-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "conjunctions-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete: I stayed home ____ I was sick.",
      "answer": "because",
      "options": [
        "although",
        "and",
        "because",
        "but"
      ]
    },
    {
      "id": "conjunctions-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete: She is tired ____ she keeps working.",
      "answer": "but",
      "options": [
        "and",
        "but",
        "because",
        "so"
      ]
    },
    {
      "id": "conjunctions-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete: ____ it was raining, we went out.",
      "answer": "Although",
      "options": [
        "Although",
        "Because",
        "So",
        "And"
      ]
    },
    {
      "id": "conjunctions-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "conjunctions-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "conjunctions-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Conjunctions (Kata Sambung)): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik19Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik19"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
