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
  "id": "participles",
  "title": "Participles (-ed vs -ing)",
  "description": "Latihan membedakan Bored vs Boring, Excited vs Exciting.",
  "topicNumber": 13
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "participles-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interested",
        "interesting",
        "interest",
        "interests"
      ]
    },
    {
      "id": "participles-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bored",
        "bore",
        "bores",
        "boring"
      ]
    },
    {
      "id": "participles-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "excite",
        "excitement",
        "excited",
        "exciting"
      ]
    },
    {
      "id": "participles-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "participles-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "participles-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "participles-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "participles-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "participles-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interested",
        "interesting",
        "interest",
        "interests"
      ]
    },
    {
      "id": "participles-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bored",
        "bore",
        "bores",
        "boring"
      ]
    },
    {
      "id": "participles-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "exciting",
        "excite",
        "excitement",
        "excited"
      ]
    },
    {
      "id": "participles-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "participles-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "participles-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "participles-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "participles-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "participles-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interests",
        "interested",
        "interesting",
        "interest"
      ]
    },
    {
      "id": "participles-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "boring",
        "bored",
        "bore",
        "bores"
      ]
    },
    {
      "id": "participles-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "exciting",
        "excite",
        "excitement",
        "excited"
      ]
    },
    {
      "id": "participles-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "participles-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "participles-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "participles-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "participles-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "participles-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interest",
        "interests",
        "interested",
        "interesting"
      ]
    },
    {
      "id": "participles-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bores",
        "boring",
        "bored",
        "bore"
      ]
    },
    {
      "id": "participles-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "excited",
        "exciting",
        "excite",
        "excitement"
      ]
    },
    {
      "id": "participles-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "participles-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "participles-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "participles-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interested",
        "interesting",
        "interest",
        "interests"
      ]
    },
    {
      "id": "participles-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bored",
        "bore",
        "bores",
        "boring"
      ]
    },
    {
      "id": "participles-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "excite",
        "excitement",
        "excited",
        "exciting"
      ]
    },
    {
      "id": "participles-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "participles-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "participles-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "participles-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "participles-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "participles-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interested",
        "interesting",
        "interest",
        "interests"
      ]
    },
    {
      "id": "participles-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bored",
        "bore",
        "bores",
        "boring"
      ]
    },
    {
      "id": "participles-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "exciting",
        "excite",
        "excitement",
        "excited"
      ]
    },
    {
      "id": "participles-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "participles-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "participles-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "participles-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "participles-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "participles-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interests",
        "interested",
        "interesting",
        "interest"
      ]
    },
    {
      "id": "participles-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "boring",
        "bored",
        "bore",
        "bores"
      ]
    },
    {
      "id": "participles-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "exciting",
        "excite",
        "excitement",
        "excited"
      ]
    },
    {
      "id": "participles-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "participles-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "participles-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "participles-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "participles-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "participles-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete: I am ____ in science.",
      "answer": "interested",
      "options": [
        "interest",
        "interests",
        "interested",
        "interesting"
      ]
    },
    {
      "id": "participles-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete: The movie was very ____.",
      "answer": "boring",
      "options": [
        "bores",
        "boring",
        "bored",
        "bore"
      ]
    },
    {
      "id": "participles-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete: The children were ____ by the story.",
      "answer": "excited",
      "options": [
        "excited",
        "exciting",
        "excite",
        "excitement"
      ]
    },
    {
      "id": "participles-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "participles-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "participles-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Participles (-ed vs -ing)): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik13Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik13"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
