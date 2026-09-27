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
  "id": "relative-clauses",
  "title": "Relative Clauses (Who/Which/That)",
  "description": "Latihan menggabungkan kalimat dengan kata hubung relatif.",
  "topicNumber": 11
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "relative-clauses-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "who",
        "which",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "who",
        "where",
        "when",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "who",
        "that",
        "where",
        "which"
      ]
    },
    {
      "id": "relative-clauses-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "relative-clauses-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "relative-clauses-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "relative-clauses-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "relative-clauses-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "who",
        "which",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "who",
        "where",
        "when",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "which",
        "who",
        "that",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "relative-clauses-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "when",
        "who",
        "which",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "that",
        "who",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "which",
        "who",
        "that",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "relative-clauses-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "relative-clauses-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "relative-clauses-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "relative-clauses-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "where",
        "when",
        "who",
        "which"
      ]
    },
    {
      "id": "relative-clauses-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "when",
        "that",
        "who",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "where",
        "which",
        "who",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "relative-clauses-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "relative-clauses-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "relative-clauses-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "who",
        "which",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "who",
        "where",
        "when",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "who",
        "that",
        "where",
        "which"
      ]
    },
    {
      "id": "relative-clauses-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "relative-clauses-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "relative-clauses-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "relative-clauses-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "relative-clauses-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "who",
        "which",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "who",
        "where",
        "when",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "which",
        "who",
        "that",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "relative-clauses-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "when",
        "who",
        "which",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "that",
        "who",
        "where",
        "when"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "which",
        "who",
        "that",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "relative-clauses-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "relative-clauses-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "relative-clauses-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "relative-clauses-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "relative-clauses-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete: The woman ____ teaches us is kind.",
      "answer": "who",
      "options": [
        "where",
        "when",
        "who",
        "which"
      ]
    },
    {
      "id": "relative-clauses-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete: This is the phone ____ I bought yesterday.",
      "answer": "that",
      "options": [
        "when",
        "that",
        "who",
        "where"
      ]
    },
    {
      "id": "relative-clauses-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete: The city ____ I was born is beautiful.",
      "answer": "where",
      "options": [
        "where",
        "which",
        "who",
        "that"
      ]
    },
    {
      "id": "relative-clauses-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "relative-clauses-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "relative-clauses-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Relative Clauses (Who/Which/That)): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik11Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik11"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
