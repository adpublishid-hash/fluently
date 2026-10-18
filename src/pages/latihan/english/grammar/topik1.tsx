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
  "id": "general-grammar",
  "title": "General Grammar",
  "description": "Kumpulan soal tata bahasa umum untuk semua level.",
  "topicNumber": 1
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "general-grammar-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day."
      ]
    },
    {
      "id": "general-grammar-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "is",
        "do",
        "does",
        "are"
      ]
    },
    {
      "id": "general-grammar-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finishes",
        "am finishing",
        "finished",
        "finish"
      ]
    },
    {
      "id": "general-grammar-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table."
      ]
    },
    {
      "id": "general-grammar-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Do",
        "Are",
        "Is",
        "Does"
      ]
    },
    {
      "id": "general-grammar-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete: My brother ____ two cats.",
      "answer": "has",
      "options": [
        "has",
        "having",
        "have",
        "is having"
      ]
    },
    {
      "id": "general-grammar-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete: We ____ to the park last Sunday.",
      "answer": "went",
      "options": [
        "goes",
        "gone",
        "go",
        "went"
      ]
    },
    {
      "id": "general-grammar-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete: There ____ a cat under the chair.",
      "answer": "is",
      "options": [
        "be",
        "am",
        "is",
        "are"
      ]
    },
    {
      "id": "general-grammar-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete: ____ your sister like pizza?",
      "answer": "Does",
      "options": [
        "Do",
        "Does",
        "Are",
        "Is"
      ]
    },
    {
      "id": "general-grammar-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (General Grammar): Complete: I can ____ very fast.",
      "answer": "swim",
      "options": [
        "swim",
        "swimming",
        "swims",
        "to swim"
      ]
    },
    {
      "id": "general-grammar-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "general-grammar-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "general-grammar-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "general-grammar-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day."
      ]
    },
    {
      "id": "general-grammar-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "is",
        "do",
        "does",
        "are"
      ]
    },
    {
      "id": "general-grammar-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete: By the time we arrived, the film ____.",
      "answer": "had already started",
      "options": [
        "has already started",
        "had already started",
        "was already start",
        "already started"
      ]
    },
    {
      "id": "general-grammar-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete: If I ____ you, I would apologise.",
      "answer": "were",
      "options": [
        "were",
        "had",
        "will be",
        "am"
      ]
    },
    {
      "id": "general-grammar-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete: I look forward to ____ from you.",
      "answer": "hearing",
      "options": [
        "hear",
        "heard",
        "be hearing",
        "hearing"
      ]
    },
    {
      "id": "general-grammar-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Choose the correct reported speech: She said, \"I am tired.\"",
      "answer": "She said that she was tired.",
      "options": [
        "She said that she was tired.",
        "She said that she is being tired.",
        "She said that I am tired.",
        "She told that she was tired."
      ]
    },
    {
      "id": "general-grammar-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (General Grammar): Complete: He has been working here ____ five years.",
      "answer": "for",
      "options": [
        "since",
        "for",
        "from",
        "during"
      ]
    },
    {
      "id": "general-grammar-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "general-grammar-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "general-grammar-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "general-grammar-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "general-grammar-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "general-grammar-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete: Hardly ____ the room when the phone rang.",
      "answer": "had she entered",
      "options": [
        "had she entered",
        "did she enter",
        "she had entered",
        "she entered"
      ]
    },
    {
      "id": "general-grammar-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete: It is essential that every applicant ____ the form by Friday.",
      "answer": "submit",
      "options": [
        "will submit",
        "submitted",
        "submits",
        "submit"
      ]
    },
    {
      "id": "general-grammar-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete: Not only ____ the report late, but it was also incomplete.",
      "answer": "was",
      "options": [
        "it was",
        "had",
        "was",
        "did"
      ]
    },
    {
      "id": "general-grammar-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Complete: Had I known about the delay, I ____ a later train.",
      "answer": "would have taken",
      "options": [
        "would take",
        "would have taken",
        "had taken",
        "will have taken"
      ]
    },
    {
      "id": "general-grammar-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (General Grammar): Choose the sentence with correct subject-verb agreement.",
      "answer": "The quality of the results was impressive.",
      "options": [
        "The quality of the results was impressive.",
        "The quality of the results have been impressive.",
        "The quality of the results were impressive.",
        "The qualities of the result was impressive."
      ]
    }
  ],
  "id": [
    {
      "id": "general-grammar-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day."
      ]
    },
    {
      "id": "general-grammar-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "is",
        "do",
        "does",
        "are"
      ]
    },
    {
      "id": "general-grammar-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finishes",
        "am finishing",
        "finished",
        "finish"
      ]
    },
    {
      "id": "general-grammar-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table."
      ]
    },
    {
      "id": "general-grammar-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Do",
        "Are",
        "Is",
        "Does"
      ]
    },
    {
      "id": "general-grammar-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete: My brother ____ two cats.",
      "answer": "has",
      "options": [
        "has",
        "having",
        "have",
        "is having"
      ]
    },
    {
      "id": "general-grammar-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete: We ____ to the park last Sunday.",
      "answer": "went",
      "options": [
        "goes",
        "gone",
        "go",
        "went"
      ]
    },
    {
      "id": "general-grammar-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete: There ____ a cat under the chair.",
      "answer": "is",
      "options": [
        "be",
        "am",
        "is",
        "are"
      ]
    },
    {
      "id": "general-grammar-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete: ____ your sister like pizza?",
      "answer": "Does",
      "options": [
        "Do",
        "Does",
        "Are",
        "Is"
      ]
    },
    {
      "id": "general-grammar-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (General Grammar): Complete: I can ____ very fast.",
      "answer": "swim",
      "options": [
        "swim",
        "swimming",
        "swims",
        "to swim"
      ]
    },
    {
      "id": "general-grammar-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "general-grammar-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "general-grammar-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "general-grammar-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day."
      ]
    },
    {
      "id": "general-grammar-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "is",
        "do",
        "does",
        "are"
      ]
    },
    {
      "id": "general-grammar-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete: By the time we arrived, the film ____.",
      "answer": "had already started",
      "options": [
        "has already started",
        "had already started",
        "was already start",
        "already started"
      ]
    },
    {
      "id": "general-grammar-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete: If I ____ you, I would apologise.",
      "answer": "were",
      "options": [
        "were",
        "had",
        "will be",
        "am"
      ]
    },
    {
      "id": "general-grammar-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete: I look forward to ____ from you.",
      "answer": "hearing",
      "options": [
        "hear",
        "heard",
        "be hearing",
        "hearing"
      ]
    },
    {
      "id": "general-grammar-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Choose the correct reported speech: She said, \"I am tired.\"",
      "answer": "She said that she was tired.",
      "options": [
        "She said that she was tired.",
        "She said that she is being tired.",
        "She said that I am tired.",
        "She told that she was tired."
      ]
    },
    {
      "id": "general-grammar-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (General Grammar): Complete: He has been working here ____ five years.",
      "answer": "for",
      "options": [
        "since",
        "for",
        "from",
        "during"
      ]
    },
    {
      "id": "general-grammar-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "general-grammar-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "general-grammar-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "general-grammar-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "general-grammar-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "general-grammar-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete: Hardly ____ the room when the phone rang.",
      "answer": "had she entered",
      "options": [
        "had she entered",
        "did she enter",
        "she had entered",
        "she entered"
      ]
    },
    {
      "id": "general-grammar-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete: It is essential that every applicant ____ the form by Friday.",
      "answer": "submit",
      "options": [
        "will submit",
        "submitted",
        "submits",
        "submit"
      ]
    },
    {
      "id": "general-grammar-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete: Not only ____ the report late, but it was also incomplete.",
      "answer": "was",
      "options": [
        "it was",
        "had",
        "was",
        "did"
      ]
    },
    {
      "id": "general-grammar-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Complete: Had I known about the delay, I ____ a later train.",
      "answer": "would have taken",
      "options": [
        "would take",
        "would have taken",
        "had taken",
        "will have taken"
      ]
    },
    {
      "id": "general-grammar-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (General Grammar): Choose the sentence with correct subject-verb agreement.",
      "answer": "The quality of the results was impressive.",
      "options": [
        "The quality of the results was impressive.",
        "The quality of the results have been impressive.",
        "The quality of the results were impressive.",
        "The qualities of the result was impressive."
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishGrammarTopik1Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik1"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
