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
  "id": "pronouns-possessives",
  "title": "Pronouns & Possessives",
  "description": "Latihan Subjek, Objek, Kepemilikan (my/mine), dan Reflexive.",
  "topicNumber": 8
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "pronouns-possessives-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "mine",
        "my",
        "me",
        "myself"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "she",
        "hers",
        "herself",
        "her"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "his",
        "he",
        "himself",
        "him"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "mine",
        "my",
        "me",
        "myself"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "she",
        "hers",
        "herself",
        "her"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "him",
        "his",
        "he",
        "himself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "myself",
        "mine",
        "my",
        "me"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "her",
        "she",
        "hers",
        "herself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "him",
        "his",
        "he",
        "himself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "me",
        "myself",
        "mine",
        "my"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "herself",
        "her",
        "she",
        "hers"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "himself",
        "him",
        "his",
        "he"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "pronouns-possessives-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "mine",
        "my",
        "me",
        "myself"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "she",
        "hers",
        "herself",
        "her"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "his",
        "he",
        "himself",
        "him"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "mine",
        "my",
        "me",
        "myself"
      ]
    },
    {
      "id": "pronouns-possessives-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "she",
        "hers",
        "herself",
        "her"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "him",
        "his",
        "he",
        "himself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "myself",
        "mine",
        "my",
        "me"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "her",
        "she",
        "hers",
        "herself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "him",
        "his",
        "he",
        "himself"
      ]
    },
    {
      "id": "pronouns-possessives-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete: This book is ____.",
      "answer": "mine",
      "options": [
        "me",
        "myself",
        "mine",
        "my"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete: I gave ____ a present.",
      "answer": "her",
      "options": [
        "herself",
        "her",
        "she",
        "hers"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete: He fixed the computer by ____.",
      "answer": "himself",
      "options": [
        "himself",
        "him",
        "his",
        "he"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "pronouns-possessives-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Pronouns & Possessives): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik8Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik8"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
