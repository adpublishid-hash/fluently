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
  "id": "history",
  "title": "History & Time",
  "description": "Kosakata sejarah, zaman, dan peristiwa masa lalu.",
  "topicNumber": 21,
  "terms": [
    {
      "word": "Past",
      "meaning": "time before now"
    },
    {
      "word": "Century",
      "meaning": "one hundred years"
    },
    {
      "word": "Empire",
      "meaning": "a group of territories ruled by one power"
    },
    {
      "word": "Ancient",
      "meaning": "from a very long time ago"
    },
    {
      "word": "Revolution",
      "meaning": "a major political or social change"
    },
    {
      "word": "Artifact",
      "meaning": "an object made by people in the past"
    },
    {
      "word": "Chronology",
      "meaning": "the order of events in time"
    },
    {
      "word": "Heritage",
      "meaning": "traditions and history passed down"
    },
    {
      "word": "Civilization",
      "meaning": "an advanced organized society"
    },
    {
      "word": "Archaeology",
      "meaning": "the study of ancient people through objects"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "history-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"time before now\"?",
      "answer": "Past",
      "options": [
        "Past",
        "Ancient",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"one hundred years\"?",
      "answer": "Century",
      "options": [
        "Revolution",
        "Heritage",
        "Past",
        "Century"
      ]
    },
    {
      "id": "history-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a group of territories ruled by one power\"?",
      "answer": "Empire",
      "options": [
        "Civilization",
        "Century",
        "Empire",
        "Artifact"
      ]
    },
    {
      "id": "history-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"from a very long time ago\"?",
      "answer": "Ancient",
      "options": [
        "Empire",
        "Ancient",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a major political or social change\"?",
      "answer": "Revolution",
      "options": [
        "Revolution",
        "Heritage",
        "Past",
        "Ancient"
      ]
    },
    {
      "id": "history-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"an object made by people in the past\"?",
      "answer": "Artifact",
      "options": [
        "Civilization",
        "Century",
        "Revolution",
        "Artifact"
      ]
    },
    {
      "id": "history-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"the order of events in time\"?",
      "answer": "Chronology",
      "options": [
        "Empire",
        "Artifact",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"traditions and history passed down\"?",
      "answer": "Heritage",
      "options": [
        "Chronology",
        "Heritage",
        "Past",
        "Ancient"
      ]
    },
    {
      "id": "history-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"an advanced organized society\"?",
      "answer": "Civilization",
      "options": [
        "Civilization",
        "Century",
        "Revolution",
        "Heritage"
      ]
    },
    {
      "id": "history-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"the study of ancient people through objects\"?",
      "answer": "Archaeology",
      "options": [
        "Empire",
        "Artifact",
        "Civilization",
        "Archaeology"
      ]
    },
    {
      "id": "history-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"from a very long time ago\".",
      "answer": "Ancient",
      "options": [
        "Empire",
        "Chronology",
        "Archaeology",
        "Ancient"
      ]
    },
    {
      "id": "history-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"a major political or social change\".",
      "answer": "Revolution",
      "options": [
        "Heritage",
        "Past",
        "Revolution",
        "Ancient"
      ]
    },
    {
      "id": "history-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"an object made by people in the past\".",
      "answer": "Artifact",
      "options": [
        "Century",
        "Artifact",
        "Revolution",
        "Civilization"
      ]
    },
    {
      "id": "history-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"the order of events in time\".",
      "answer": "Chronology",
      "options": [
        "Chronology",
        "Artifact",
        "Archaeology",
        "Empire"
      ]
    },
    {
      "id": "history-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"traditions and history passed down\".",
      "answer": "Heritage",
      "options": [
        "Chronology",
        "Past",
        "Ancient",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"an advanced organized society\".",
      "answer": "Civilization",
      "options": [
        "Century",
        "Revolution",
        "Civilization",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"the study of ancient people through objects\".",
      "answer": "Archaeology",
      "options": [
        "Artifact",
        "Archaeology",
        "Civilization",
        "Empire"
      ]
    },
    {
      "id": "history-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"time before now\".",
      "answer": "Past",
      "options": [
        "Past",
        "Century",
        "Revolution",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"one hundred years\".",
      "answer": "Century",
      "options": [
        "Empire",
        "Artifact",
        "Civilization",
        "Century"
      ]
    },
    {
      "id": "history-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in History & Time: \"a group of territories ruled by one power\".",
      "answer": "Empire",
      "options": [
        "Chronology",
        "Archaeology",
        "Empire",
        "Ancient"
      ]
    },
    {
      "id": "history-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"the order of events in time\"?",
      "answer": "Chronology",
      "options": [
        "Artifact",
        "Archaeology",
        "Chronology",
        "Empire"
      ]
    },
    {
      "id": "history-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"traditions and history passed down\"?",
      "answer": "Heritage",
      "options": [
        "Past",
        "Heritage",
        "Ancient",
        "Chronology"
      ]
    },
    {
      "id": "history-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"an advanced organized society\"?",
      "answer": "Civilization",
      "options": [
        "Civilization",
        "Revolution",
        "Heritage",
        "Century"
      ]
    },
    {
      "id": "history-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"the study of ancient people through objects\"?",
      "answer": "Archaeology",
      "options": [
        "Artifact",
        "Civilization",
        "Empire",
        "Archaeology"
      ]
    },
    {
      "id": "history-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"time before now\"?",
      "answer": "Past",
      "options": [
        "Century",
        "Revolution",
        "Past",
        "Heritage"
      ]
    },
    {
      "id": "history-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"one hundred years\"?",
      "answer": "Century",
      "options": [
        "Artifact",
        "Century",
        "Civilization",
        "Empire"
      ]
    },
    {
      "id": "history-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"a group of territories ruled by one power\"?",
      "answer": "Empire",
      "options": [
        "Empire",
        "Archaeology",
        "Ancient",
        "Chronology"
      ]
    },
    {
      "id": "history-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"from a very long time ago\"?",
      "answer": "Ancient",
      "options": [
        "Past",
        "Revolution",
        "Heritage",
        "Ancient"
      ]
    },
    {
      "id": "history-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"a major political or social change\"?",
      "answer": "Revolution",
      "options": [
        "Artifact",
        "Civilization",
        "Revolution",
        "Century"
      ]
    },
    {
      "id": "history-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal history & time context, which term best matches: \"an object made by people in the past\"?",
      "answer": "Artifact",
      "options": [
        "Archaeology",
        "Artifact",
        "Empire",
        "Chronology"
      ]
    }
  ],
  "id": [
    {
      "id": "history-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"time before now\"?",
      "answer": "Past",
      "options": [
        "Past",
        "Ancient",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"one hundred years\"?",
      "answer": "Century",
      "options": [
        "Revolution",
        "Heritage",
        "Past",
        "Century"
      ]
    },
    {
      "id": "history-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a group of territories ruled by one power\"?",
      "answer": "Empire",
      "options": [
        "Civilization",
        "Century",
        "Empire",
        "Artifact"
      ]
    },
    {
      "id": "history-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"from a very long time ago\"?",
      "answer": "Ancient",
      "options": [
        "Empire",
        "Ancient",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a major political or social change\"?",
      "answer": "Revolution",
      "options": [
        "Revolution",
        "Heritage",
        "Past",
        "Ancient"
      ]
    },
    {
      "id": "history-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an object made by people in the past\"?",
      "answer": "Artifact",
      "options": [
        "Civilization",
        "Century",
        "Revolution",
        "Artifact"
      ]
    },
    {
      "id": "history-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the order of events in time\"?",
      "answer": "Chronology",
      "options": [
        "Empire",
        "Artifact",
        "Chronology",
        "Archaeology"
      ]
    },
    {
      "id": "history-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"traditions and history passed down\"?",
      "answer": "Heritage",
      "options": [
        "Chronology",
        "Heritage",
        "Past",
        "Ancient"
      ]
    },
    {
      "id": "history-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an advanced organized society\"?",
      "answer": "Civilization",
      "options": [
        "Civilization",
        "Century",
        "Revolution",
        "Heritage"
      ]
    },
    {
      "id": "history-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the study of ancient people through objects\"?",
      "answer": "Archaeology",
      "options": [
        "Empire",
        "Artifact",
        "Civilization",
        "Archaeology"
      ]
    },
    {
      "id": "history-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"from a very long time ago\".",
      "answer": "Ancient",
      "options": [
        "Empire",
        "Chronology",
        "Archaeology",
        "Ancient"
      ]
    },
    {
      "id": "history-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"a major political or social change\".",
      "answer": "Revolution",
      "options": [
        "Heritage",
        "Past",
        "Revolution",
        "Ancient"
      ]
    },
    {
      "id": "history-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"an object made by people in the past\".",
      "answer": "Artifact",
      "options": [
        "Century",
        "Artifact",
        "Revolution",
        "Civilization"
      ]
    },
    {
      "id": "history-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"the order of events in time\".",
      "answer": "Chronology",
      "options": [
        "Chronology",
        "Artifact",
        "Archaeology",
        "Empire"
      ]
    },
    {
      "id": "history-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"traditions and history passed down\".",
      "answer": "Heritage",
      "options": [
        "Chronology",
        "Past",
        "Ancient",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"an advanced organized society\".",
      "answer": "Civilization",
      "options": [
        "Century",
        "Revolution",
        "Civilization",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"the study of ancient people through objects\".",
      "answer": "Archaeology",
      "options": [
        "Artifact",
        "Archaeology",
        "Civilization",
        "Empire"
      ]
    },
    {
      "id": "history-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"time before now\".",
      "answer": "Past",
      "options": [
        "Past",
        "Century",
        "Revolution",
        "Heritage"
      ]
    },
    {
      "id": "history-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"one hundred years\".",
      "answer": "Century",
      "options": [
        "Empire",
        "Artifact",
        "Civilization",
        "Century"
      ]
    },
    {
      "id": "history-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik History & Time: \"a group of territories ruled by one power\".",
      "answer": "Empire",
      "options": [
        "Chronology",
        "Archaeology",
        "Empire",
        "Ancient"
      ]
    },
    {
      "id": "history-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"the order of events in time\"?",
      "answer": "Chronology",
      "options": [
        "Artifact",
        "Archaeology",
        "Chronology",
        "Empire"
      ]
    },
    {
      "id": "history-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"traditions and history passed down\"?",
      "answer": "Heritage",
      "options": [
        "Past",
        "Heritage",
        "Ancient",
        "Chronology"
      ]
    },
    {
      "id": "history-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"an advanced organized society\"?",
      "answer": "Civilization",
      "options": [
        "Civilization",
        "Revolution",
        "Heritage",
        "Century"
      ]
    },
    {
      "id": "history-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"the study of ancient people through objects\"?",
      "answer": "Archaeology",
      "options": [
        "Artifact",
        "Civilization",
        "Empire",
        "Archaeology"
      ]
    },
    {
      "id": "history-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"time before now\"?",
      "answer": "Past",
      "options": [
        "Century",
        "Revolution",
        "Past",
        "Heritage"
      ]
    },
    {
      "id": "history-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"one hundred years\"?",
      "answer": "Century",
      "options": [
        "Artifact",
        "Century",
        "Civilization",
        "Empire"
      ]
    },
    {
      "id": "history-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"a group of territories ruled by one power\"?",
      "answer": "Empire",
      "options": [
        "Empire",
        "Archaeology",
        "Ancient",
        "Chronology"
      ]
    },
    {
      "id": "history-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"from a very long time ago\"?",
      "answer": "Ancient",
      "options": [
        "Past",
        "Revolution",
        "Heritage",
        "Ancient"
      ]
    },
    {
      "id": "history-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"a major political or social change\"?",
      "answer": "Revolution",
      "options": [
        "Artifact",
        "Civilization",
        "Revolution",
        "Century"
      ]
    },
    {
      "id": "history-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks history & time yang lebih formal, istilah mana yang paling sesuai dengan: \"an object made by people in the past\"?",
      "answer": "Artifact",
      "options": [
        "Archaeology",
        "Artifact",
        "Empire",
        "Chronology"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik21Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik21"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
