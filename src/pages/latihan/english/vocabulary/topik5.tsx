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
  "id": "health-body",
  "title": "Health, Medicine & The Body",
  "description": "Kosakata tubuh, sakit, obat, dan perawatan.",
  "topicNumber": 5,
  "terms": [
    {
      "word": "Symptom",
      "meaning": "a sign that someone may be ill"
    },
    {
      "word": "Medicine",
      "meaning": "something taken to treat illness"
    },
    {
      "word": "Pulse",
      "meaning": "the beat felt from the heart"
    },
    {
      "word": "Injury",
      "meaning": "damage to the body"
    },
    {
      "word": "Prescription",
      "meaning": "written instructions for medicine"
    },
    {
      "word": "Recovery",
      "meaning": "the process of becoming healthy again"
    },
    {
      "word": "Treatment",
      "meaning": "medical care for a problem"
    },
    {
      "word": "Diagnosis",
      "meaning": "identifying an illness"
    },
    {
      "word": "Immune",
      "meaning": "related to the body fighting disease"
    },
    {
      "word": "Therapy",
      "meaning": "treatment to improve health"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "health-body-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a sign that someone may be ill\"?",
      "answer": "Symptom",
      "options": [
        "Symptom",
        "Injury",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"something taken to treat illness\"?",
      "answer": "Medicine",
      "options": [
        "Prescription",
        "Diagnosis",
        "Symptom",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"the beat felt from the heart\"?",
      "answer": "Pulse",
      "options": [
        "Immune",
        "Medicine",
        "Pulse",
        "Recovery"
      ]
    },
    {
      "id": "health-body-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"damage to the body\"?",
      "answer": "Injury",
      "options": [
        "Pulse",
        "Injury",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"written instructions for medicine\"?",
      "answer": "Prescription",
      "options": [
        "Prescription",
        "Diagnosis",
        "Symptom",
        "Injury"
      ]
    },
    {
      "id": "health-body-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"the process of becoming healthy again\"?",
      "answer": "Recovery",
      "options": [
        "Immune",
        "Medicine",
        "Prescription",
        "Recovery"
      ]
    },
    {
      "id": "health-body-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"medical care for a problem\"?",
      "answer": "Treatment",
      "options": [
        "Pulse",
        "Recovery",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"identifying an illness\"?",
      "answer": "Diagnosis",
      "options": [
        "Treatment",
        "Diagnosis",
        "Symptom",
        "Injury"
      ]
    },
    {
      "id": "health-body-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"related to the body fighting disease\"?",
      "answer": "Immune",
      "options": [
        "Immune",
        "Medicine",
        "Prescription",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"treatment to improve health\"?",
      "answer": "Therapy",
      "options": [
        "Pulse",
        "Recovery",
        "Immune",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"damage to the body\".",
      "answer": "Injury",
      "options": [
        "Pulse",
        "Treatment",
        "Therapy",
        "Injury"
      ]
    },
    {
      "id": "health-body-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"written instructions for medicine\".",
      "answer": "Prescription",
      "options": [
        "Diagnosis",
        "Symptom",
        "Prescription",
        "Injury"
      ]
    },
    {
      "id": "health-body-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"the process of becoming healthy again\".",
      "answer": "Recovery",
      "options": [
        "Medicine",
        "Recovery",
        "Prescription",
        "Immune"
      ]
    },
    {
      "id": "health-body-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"medical care for a problem\".",
      "answer": "Treatment",
      "options": [
        "Treatment",
        "Recovery",
        "Therapy",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"identifying an illness\".",
      "answer": "Diagnosis",
      "options": [
        "Treatment",
        "Symptom",
        "Injury",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"related to the body fighting disease\".",
      "answer": "Immune",
      "options": [
        "Medicine",
        "Prescription",
        "Immune",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"treatment to improve health\".",
      "answer": "Therapy",
      "options": [
        "Recovery",
        "Therapy",
        "Immune",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"a sign that someone may be ill\".",
      "answer": "Symptom",
      "options": [
        "Symptom",
        "Medicine",
        "Prescription",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"something taken to treat illness\".",
      "answer": "Medicine",
      "options": [
        "Pulse",
        "Recovery",
        "Immune",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Health, Medicine & The Body: \"the beat felt from the heart\".",
      "answer": "Pulse",
      "options": [
        "Treatment",
        "Therapy",
        "Pulse",
        "Injury"
      ]
    },
    {
      "id": "health-body-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"medical care for a problem\"?",
      "answer": "Treatment",
      "options": [
        "Recovery",
        "Therapy",
        "Treatment",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"identifying an illness\"?",
      "answer": "Diagnosis",
      "options": [
        "Symptom",
        "Diagnosis",
        "Injury",
        "Treatment"
      ]
    },
    {
      "id": "health-body-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"related to the body fighting disease\"?",
      "answer": "Immune",
      "options": [
        "Immune",
        "Prescription",
        "Diagnosis",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"treatment to improve health\"?",
      "answer": "Therapy",
      "options": [
        "Recovery",
        "Immune",
        "Pulse",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"a sign that someone may be ill\"?",
      "answer": "Symptom",
      "options": [
        "Medicine",
        "Prescription",
        "Symptom",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"something taken to treat illness\"?",
      "answer": "Medicine",
      "options": [
        "Recovery",
        "Medicine",
        "Immune",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"the beat felt from the heart\"?",
      "answer": "Pulse",
      "options": [
        "Pulse",
        "Therapy",
        "Injury",
        "Treatment"
      ]
    },
    {
      "id": "health-body-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"damage to the body\"?",
      "answer": "Injury",
      "options": [
        "Symptom",
        "Prescription",
        "Diagnosis",
        "Injury"
      ]
    },
    {
      "id": "health-body-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"written instructions for medicine\"?",
      "answer": "Prescription",
      "options": [
        "Recovery",
        "Immune",
        "Prescription",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal health, medicine & the body context, which term best matches: \"the process of becoming healthy again\"?",
      "answer": "Recovery",
      "options": [
        "Therapy",
        "Recovery",
        "Pulse",
        "Treatment"
      ]
    }
  ],
  "id": [
    {
      "id": "health-body-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a sign that someone may be ill\"?",
      "answer": "Symptom",
      "options": [
        "Symptom",
        "Injury",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"something taken to treat illness\"?",
      "answer": "Medicine",
      "options": [
        "Prescription",
        "Diagnosis",
        "Symptom",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the beat felt from the heart\"?",
      "answer": "Pulse",
      "options": [
        "Immune",
        "Medicine",
        "Pulse",
        "Recovery"
      ]
    },
    {
      "id": "health-body-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"damage to the body\"?",
      "answer": "Injury",
      "options": [
        "Pulse",
        "Injury",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"written instructions for medicine\"?",
      "answer": "Prescription",
      "options": [
        "Prescription",
        "Diagnosis",
        "Symptom",
        "Injury"
      ]
    },
    {
      "id": "health-body-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the process of becoming healthy again\"?",
      "answer": "Recovery",
      "options": [
        "Immune",
        "Medicine",
        "Prescription",
        "Recovery"
      ]
    },
    {
      "id": "health-body-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"medical care for a problem\"?",
      "answer": "Treatment",
      "options": [
        "Pulse",
        "Recovery",
        "Treatment",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"identifying an illness\"?",
      "answer": "Diagnosis",
      "options": [
        "Treatment",
        "Diagnosis",
        "Symptom",
        "Injury"
      ]
    },
    {
      "id": "health-body-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"related to the body fighting disease\"?",
      "answer": "Immune",
      "options": [
        "Immune",
        "Medicine",
        "Prescription",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"treatment to improve health\"?",
      "answer": "Therapy",
      "options": [
        "Pulse",
        "Recovery",
        "Immune",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"damage to the body\".",
      "answer": "Injury",
      "options": [
        "Pulse",
        "Treatment",
        "Therapy",
        "Injury"
      ]
    },
    {
      "id": "health-body-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"written instructions for medicine\".",
      "answer": "Prescription",
      "options": [
        "Diagnosis",
        "Symptom",
        "Prescription",
        "Injury"
      ]
    },
    {
      "id": "health-body-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"the process of becoming healthy again\".",
      "answer": "Recovery",
      "options": [
        "Medicine",
        "Recovery",
        "Prescription",
        "Immune"
      ]
    },
    {
      "id": "health-body-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"medical care for a problem\".",
      "answer": "Treatment",
      "options": [
        "Treatment",
        "Recovery",
        "Therapy",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"identifying an illness\".",
      "answer": "Diagnosis",
      "options": [
        "Treatment",
        "Symptom",
        "Injury",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"related to the body fighting disease\".",
      "answer": "Immune",
      "options": [
        "Medicine",
        "Prescription",
        "Immune",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"treatment to improve health\".",
      "answer": "Therapy",
      "options": [
        "Recovery",
        "Therapy",
        "Immune",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"a sign that someone may be ill\".",
      "answer": "Symptom",
      "options": [
        "Symptom",
        "Medicine",
        "Prescription",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"something taken to treat illness\".",
      "answer": "Medicine",
      "options": [
        "Pulse",
        "Recovery",
        "Immune",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Health, Medicine & The Body: \"the beat felt from the heart\".",
      "answer": "Pulse",
      "options": [
        "Treatment",
        "Therapy",
        "Pulse",
        "Injury"
      ]
    },
    {
      "id": "health-body-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"medical care for a problem\"?",
      "answer": "Treatment",
      "options": [
        "Recovery",
        "Therapy",
        "Treatment",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"identifying an illness\"?",
      "answer": "Diagnosis",
      "options": [
        "Symptom",
        "Diagnosis",
        "Injury",
        "Treatment"
      ]
    },
    {
      "id": "health-body-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"related to the body fighting disease\"?",
      "answer": "Immune",
      "options": [
        "Immune",
        "Prescription",
        "Diagnosis",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"treatment to improve health\"?",
      "answer": "Therapy",
      "options": [
        "Recovery",
        "Immune",
        "Pulse",
        "Therapy"
      ]
    },
    {
      "id": "health-body-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"a sign that someone may be ill\"?",
      "answer": "Symptom",
      "options": [
        "Medicine",
        "Prescription",
        "Symptom",
        "Diagnosis"
      ]
    },
    {
      "id": "health-body-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"something taken to treat illness\"?",
      "answer": "Medicine",
      "options": [
        "Recovery",
        "Medicine",
        "Immune",
        "Pulse"
      ]
    },
    {
      "id": "health-body-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"the beat felt from the heart\"?",
      "answer": "Pulse",
      "options": [
        "Pulse",
        "Therapy",
        "Injury",
        "Treatment"
      ]
    },
    {
      "id": "health-body-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"damage to the body\"?",
      "answer": "Injury",
      "options": [
        "Symptom",
        "Prescription",
        "Diagnosis",
        "Injury"
      ]
    },
    {
      "id": "health-body-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"written instructions for medicine\"?",
      "answer": "Prescription",
      "options": [
        "Recovery",
        "Immune",
        "Prescription",
        "Medicine"
      ]
    },
    {
      "id": "health-body-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks health, medicine & the body yang lebih formal, istilah mana yang paling sesuai dengan: \"the process of becoming healthy again\"?",
      "answer": "Recovery",
      "options": [
        "Therapy",
        "Recovery",
        "Pulse",
        "Treatment"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik5Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik5"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
