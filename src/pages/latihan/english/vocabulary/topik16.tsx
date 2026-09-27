import { VocabularyQuizPage } from '../../components/PracticeQuizPage';

type TopicMaterial = {
  id: string;
  title: string;
  description: string;
  topicNumber: number;
  terms: Array<{ word: string; meaning: string }>;
};

type QuizQuestion = {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  prompt: string;
  answer: string;
  options: string[];
};

const material: TopicMaterial = {
  "id": "law-crime",
  "title": "Law & Crime",
  "description": "Kosakata hukum, pengadilan, dan kriminalitas.",
  "topicNumber": 16,
  "terms": [
    {
      "word": "Law",
      "meaning": "a rule made by government"
    },
    {
      "word": "Crime",
      "meaning": "an illegal act"
    },
    {
      "word": "Judge",
      "meaning": "a person who decides cases in court"
    },
    {
      "word": "Court",
      "meaning": "a place where legal cases are heard"
    },
    {
      "word": "Witness",
      "meaning": "a person who saw an event"
    },
    {
      "word": "Evidence",
      "meaning": "information used to prove something"
    },
    {
      "word": "Verdict",
      "meaning": "a court decision"
    },
    {
      "word": "Sentence",
      "meaning": "a punishment given by a court"
    },
    {
      "word": "Prosecution",
      "meaning": "the side accusing someone in court"
    },
    {
      "word": "Jurisdiction",
      "meaning": "legal authority over an area or case"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "law-crime-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a rule made by government\"?",
      "answer": "Law",
      "options": [
        "Law",
        "Court",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"an illegal act\"?",
      "answer": "Crime",
      "options": [
        "Witness",
        "Sentence",
        "Law",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a person who decides cases in court\"?",
      "answer": "Judge",
      "options": [
        "Prosecution",
        "Crime",
        "Judge",
        "Evidence"
      ]
    },
    {
      "id": "law-crime-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a place where legal cases are heard\"?",
      "answer": "Court",
      "options": [
        "Judge",
        "Court",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a person who saw an event\"?",
      "answer": "Witness",
      "options": [
        "Witness",
        "Sentence",
        "Law",
        "Court"
      ]
    },
    {
      "id": "law-crime-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"information used to prove something\"?",
      "answer": "Evidence",
      "options": [
        "Prosecution",
        "Crime",
        "Witness",
        "Evidence"
      ]
    },
    {
      "id": "law-crime-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a court decision\"?",
      "answer": "Verdict",
      "options": [
        "Judge",
        "Evidence",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a punishment given by a court\"?",
      "answer": "Sentence",
      "options": [
        "Verdict",
        "Sentence",
        "Law",
        "Court"
      ]
    },
    {
      "id": "law-crime-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"the side accusing someone in court\"?",
      "answer": "Prosecution",
      "options": [
        "Prosecution",
        "Crime",
        "Witness",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"legal authority over an area or case\"?",
      "answer": "Jurisdiction",
      "options": [
        "Judge",
        "Evidence",
        "Prosecution",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a place where legal cases are heard\".",
      "answer": "Court",
      "options": [
        "Judge",
        "Verdict",
        "Jurisdiction",
        "Court"
      ]
    },
    {
      "id": "law-crime-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a person who saw an event\".",
      "answer": "Witness",
      "options": [
        "Sentence",
        "Law",
        "Witness",
        "Court"
      ]
    },
    {
      "id": "law-crime-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"information used to prove something\".",
      "answer": "Evidence",
      "options": [
        "Crime",
        "Evidence",
        "Witness",
        "Prosecution"
      ]
    },
    {
      "id": "law-crime-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a court decision\".",
      "answer": "Verdict",
      "options": [
        "Verdict",
        "Evidence",
        "Jurisdiction",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a punishment given by a court\".",
      "answer": "Sentence",
      "options": [
        "Verdict",
        "Law",
        "Court",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"the side accusing someone in court\".",
      "answer": "Prosecution",
      "options": [
        "Crime",
        "Witness",
        "Prosecution",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"legal authority over an area or case\".",
      "answer": "Jurisdiction",
      "options": [
        "Evidence",
        "Jurisdiction",
        "Prosecution",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a rule made by government\".",
      "answer": "Law",
      "options": [
        "Law",
        "Crime",
        "Witness",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"an illegal act\".",
      "answer": "Crime",
      "options": [
        "Judge",
        "Evidence",
        "Prosecution",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Law & Crime: \"a person who decides cases in court\".",
      "answer": "Judge",
      "options": [
        "Verdict",
        "Jurisdiction",
        "Judge",
        "Court"
      ]
    },
    {
      "id": "law-crime-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a court decision\"?",
      "answer": "Verdict",
      "options": [
        "Evidence",
        "Jurisdiction",
        "Verdict",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a punishment given by a court\"?",
      "answer": "Sentence",
      "options": [
        "Law",
        "Sentence",
        "Court",
        "Verdict"
      ]
    },
    {
      "id": "law-crime-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"the side accusing someone in court\"?",
      "answer": "Prosecution",
      "options": [
        "Prosecution",
        "Witness",
        "Sentence",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"legal authority over an area or case\"?",
      "answer": "Jurisdiction",
      "options": [
        "Evidence",
        "Prosecution",
        "Judge",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a rule made by government\"?",
      "answer": "Law",
      "options": [
        "Crime",
        "Witness",
        "Law",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"an illegal act\"?",
      "answer": "Crime",
      "options": [
        "Evidence",
        "Crime",
        "Prosecution",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a person who decides cases in court\"?",
      "answer": "Judge",
      "options": [
        "Judge",
        "Jurisdiction",
        "Court",
        "Verdict"
      ]
    },
    {
      "id": "law-crime-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a place where legal cases are heard\"?",
      "answer": "Court",
      "options": [
        "Law",
        "Witness",
        "Sentence",
        "Court"
      ]
    },
    {
      "id": "law-crime-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"a person who saw an event\"?",
      "answer": "Witness",
      "options": [
        "Evidence",
        "Prosecution",
        "Witness",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal law & crime context, which term best matches: \"information used to prove something\"?",
      "answer": "Evidence",
      "options": [
        "Jurisdiction",
        "Evidence",
        "Judge",
        "Verdict"
      ]
    }
  ],
  "id": [
    {
      "id": "law-crime-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a rule made by government\"?",
      "answer": "Law",
      "options": [
        "Law",
        "Court",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an illegal act\"?",
      "answer": "Crime",
      "options": [
        "Witness",
        "Sentence",
        "Law",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who decides cases in court\"?",
      "answer": "Judge",
      "options": [
        "Prosecution",
        "Crime",
        "Judge",
        "Evidence"
      ]
    },
    {
      "id": "law-crime-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place where legal cases are heard\"?",
      "answer": "Court",
      "options": [
        "Judge",
        "Court",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who saw an event\"?",
      "answer": "Witness",
      "options": [
        "Witness",
        "Sentence",
        "Law",
        "Court"
      ]
    },
    {
      "id": "law-crime-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"information used to prove something\"?",
      "answer": "Evidence",
      "options": [
        "Prosecution",
        "Crime",
        "Witness",
        "Evidence"
      ]
    },
    {
      "id": "law-crime-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a court decision\"?",
      "answer": "Verdict",
      "options": [
        "Judge",
        "Evidence",
        "Verdict",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a punishment given by a court\"?",
      "answer": "Sentence",
      "options": [
        "Verdict",
        "Sentence",
        "Law",
        "Court"
      ]
    },
    {
      "id": "law-crime-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the side accusing someone in court\"?",
      "answer": "Prosecution",
      "options": [
        "Prosecution",
        "Crime",
        "Witness",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"legal authority over an area or case\"?",
      "answer": "Jurisdiction",
      "options": [
        "Judge",
        "Evidence",
        "Prosecution",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a place where legal cases are heard\".",
      "answer": "Court",
      "options": [
        "Judge",
        "Verdict",
        "Jurisdiction",
        "Court"
      ]
    },
    {
      "id": "law-crime-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a person who saw an event\".",
      "answer": "Witness",
      "options": [
        "Sentence",
        "Law",
        "Witness",
        "Court"
      ]
    },
    {
      "id": "law-crime-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"information used to prove something\".",
      "answer": "Evidence",
      "options": [
        "Crime",
        "Evidence",
        "Witness",
        "Prosecution"
      ]
    },
    {
      "id": "law-crime-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a court decision\".",
      "answer": "Verdict",
      "options": [
        "Verdict",
        "Evidence",
        "Jurisdiction",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a punishment given by a court\".",
      "answer": "Sentence",
      "options": [
        "Verdict",
        "Law",
        "Court",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"the side accusing someone in court\".",
      "answer": "Prosecution",
      "options": [
        "Crime",
        "Witness",
        "Prosecution",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"legal authority over an area or case\".",
      "answer": "Jurisdiction",
      "options": [
        "Evidence",
        "Jurisdiction",
        "Prosecution",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a rule made by government\".",
      "answer": "Law",
      "options": [
        "Law",
        "Crime",
        "Witness",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"an illegal act\".",
      "answer": "Crime",
      "options": [
        "Judge",
        "Evidence",
        "Prosecution",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Law & Crime: \"a person who decides cases in court\".",
      "answer": "Judge",
      "options": [
        "Verdict",
        "Jurisdiction",
        "Judge",
        "Court"
      ]
    },
    {
      "id": "law-crime-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a court decision\"?",
      "answer": "Verdict",
      "options": [
        "Evidence",
        "Jurisdiction",
        "Verdict",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a punishment given by a court\"?",
      "answer": "Sentence",
      "options": [
        "Law",
        "Sentence",
        "Court",
        "Verdict"
      ]
    },
    {
      "id": "law-crime-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"the side accusing someone in court\"?",
      "answer": "Prosecution",
      "options": [
        "Prosecution",
        "Witness",
        "Sentence",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"legal authority over an area or case\"?",
      "answer": "Jurisdiction",
      "options": [
        "Evidence",
        "Prosecution",
        "Judge",
        "Jurisdiction"
      ]
    },
    {
      "id": "law-crime-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a rule made by government\"?",
      "answer": "Law",
      "options": [
        "Crime",
        "Witness",
        "Law",
        "Sentence"
      ]
    },
    {
      "id": "law-crime-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"an illegal act\"?",
      "answer": "Crime",
      "options": [
        "Evidence",
        "Crime",
        "Prosecution",
        "Judge"
      ]
    },
    {
      "id": "law-crime-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who decides cases in court\"?",
      "answer": "Judge",
      "options": [
        "Judge",
        "Jurisdiction",
        "Court",
        "Verdict"
      ]
    },
    {
      "id": "law-crime-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a place where legal cases are heard\"?",
      "answer": "Court",
      "options": [
        "Law",
        "Witness",
        "Sentence",
        "Court"
      ]
    },
    {
      "id": "law-crime-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who saw an event\"?",
      "answer": "Witness",
      "options": [
        "Evidence",
        "Prosecution",
        "Witness",
        "Crime"
      ]
    },
    {
      "id": "law-crime-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks law & crime yang lebih formal, istilah mana yang paling sesuai dengan: \"information used to prove something\"?",
      "answer": "Evidence",
      "options": [
        "Jurisdiction",
        "Evidence",
        "Judge",
        "Verdict"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik16Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik16"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
