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
  "id": "gerunds-infinitives",
  "title": "Gerunds vs. Infinitives",
  "description": "Latihan kapan pakai V-ing dan kapan pakai to V1.",
  "topicNumber": 17
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "gerunds-infinitives-Basic-0",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listening to",
        "to listen",
        "listen to",
        "listened to"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-1",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studying",
        "study",
        "studied",
        "to study"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-2",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "be",
        "been",
        "being",
        "to be"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-3",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-4",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-5",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-6",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-7",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-8",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listening to",
        "to listen",
        "listen to",
        "listened to"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-9",
      "level": "Basic",
      "prompt": "Basic grammar check (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studying",
        "study",
        "studied",
        "to study"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "to be",
        "be",
        "been",
        "being"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listened to",
        "listening to",
        "to listen",
        "listen to"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "to study",
        "studying",
        "study",
        "studied"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "to be",
        "be",
        "been",
        "being"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best structure (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-0",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-1",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-2",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-3",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-4",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listen to",
        "listened to",
        "listening to",
        "to listen"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-5",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studied",
        "to study",
        "studying",
        "study"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-6",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "being",
        "to be",
        "be",
        "been"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-7",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-8",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-9",
      "level": "Advanced",
      "prompt": "Formal grammar accuracy (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
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
      "id": "gerunds-infinitives-Basic-0",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listening to",
        "to listen",
        "listen to",
        "listened to"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-1",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studying",
        "study",
        "studied",
        "to study"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-2",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "be",
        "been",
        "being",
        "to be"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-3",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day.",
        "She going to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-4",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "are",
        "is",
        "do",
        "does"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-5",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finish",
        "finishes",
        "am finishing",
        "finished"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-6",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table.",
        "There is many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-7",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Does",
        "Do",
        "Are",
        "Is"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-8",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listening to",
        "to listen",
        "listen to",
        "listened to"
      ]
    },
    {
      "id": "gerunds-infinitives-Basic-9",
      "level": "Basic",
      "prompt": "Cek grammar dasar (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studying",
        "study",
        "studied",
        "to study"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "to be",
        "be",
        "been",
        "being"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "does",
        "are",
        "is",
        "do"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "finished",
        "finish",
        "finishes",
        "am finishing"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table.",
        "There are many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Is",
        "Does",
        "Do",
        "Are"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listened to",
        "listening to",
        "to listen",
        "listen to"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "to study",
        "studying",
        "study",
        "studied"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "to be",
        "be",
        "been",
        "being"
      ]
    },
    {
      "id": "gerunds-infinitives-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih struktur terbaik (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day.",
        "She go to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-0",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-1",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
      "answer": "finished",
      "options": [
        "am finishing",
        "finished",
        "finish",
        "finishes"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-2",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Which option is grammatically correct?",
      "answer": "There are many books on the table.",
      "options": [
        "There are many books on the table.",
        "There is many books on the table.",
        "There are much books on the table.",
        "There be many books on the table."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-3",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete the question: ____ you speak English?",
      "answer": "Do",
      "options": [
        "Are",
        "Is",
        "Does",
        "Do"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-4",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete: I enjoy ____ music.",
      "answer": "listening to",
      "options": [
        "listen to",
        "listened to",
        "listening to",
        "to listen"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-5",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete: She decided ____ abroad.",
      "answer": "to study",
      "options": [
        "studied",
        "to study",
        "studying",
        "study"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-6",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete: He avoided ____ late.",
      "answer": "being",
      "options": [
        "being",
        "to be",
        "be",
        "been"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-7",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Choose the correct sentence.",
      "answer": "She goes to school every day.",
      "options": [
        "She go to school every day.",
        "She going to school every day.",
        "She gone to school every day.",
        "She goes to school every day."
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-8",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Complete the sentence: They ____ watching a movie now.",
      "answer": "are",
      "options": [
        "do",
        "does",
        "are",
        "is"
      ]
    },
    {
      "id": "gerunds-infinitives-Advanced-9",
      "level": "Advanced",
      "prompt": "Akurasi grammar formal (Gerunds vs. Infinitives): Choose the correct past form: I ____ my homework yesterday.",
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

export default function EnglishGrammarTopik17Page() {
  return (
    <VocabularyQuizPage
      key="english-grammar-topik17"
      topicId={material.id}
      skillId="grammar"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Grammar"
      backPath="/latihan/english/grammar"
    />
  );
}
