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
  "id": "technology-social",
  "title": "Technology & Social Media",
  "description": "Kosakata internet, perangkat, dan media sosial.",
  "topicNumber": 6,
  "terms": [
    {
      "word": "Device",
      "meaning": "a piece of electronic equipment"
    },
    {
      "word": "Password",
      "meaning": "a secret code used to access an account"
    },
    {
      "word": "Upload",
      "meaning": "to send a file to the internet"
    },
    {
      "word": "Download",
      "meaning": "to get a file from the internet"
    },
    {
      "word": "Notification",
      "meaning": "a message alert from an app"
    },
    {
      "word": "Algorithm",
      "meaning": "a set of rules used by software"
    },
    {
      "word": "Privacy",
      "meaning": "control over personal information"
    },
    {
      "word": "Platform",
      "meaning": "an online service where people interact"
    },
    {
      "word": "Streaming",
      "meaning": "watching or listening online in real time"
    },
    {
      "word": "Encryption",
      "meaning": "protecting data by turning it into code"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "technology-social-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a piece of electronic equipment\"?",
      "answer": "Device",
      "options": [
        "Device",
        "Download",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a secret code used to access an account\"?",
      "answer": "Password",
      "options": [
        "Notification",
        "Platform",
        "Device",
        "Password"
      ]
    },
    {
      "id": "technology-social-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"to send a file to the internet\"?",
      "answer": "Upload",
      "options": [
        "Streaming",
        "Password",
        "Upload",
        "Algorithm"
      ]
    },
    {
      "id": "technology-social-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"to get a file from the internet\"?",
      "answer": "Download",
      "options": [
        "Upload",
        "Download",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a message alert from an app\"?",
      "answer": "Notification",
      "options": [
        "Notification",
        "Platform",
        "Device",
        "Download"
      ]
    },
    {
      "id": "technology-social-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a set of rules used by software\"?",
      "answer": "Algorithm",
      "options": [
        "Streaming",
        "Password",
        "Notification",
        "Algorithm"
      ]
    },
    {
      "id": "technology-social-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"control over personal information\"?",
      "answer": "Privacy",
      "options": [
        "Upload",
        "Algorithm",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"an online service where people interact\"?",
      "answer": "Platform",
      "options": [
        "Privacy",
        "Platform",
        "Device",
        "Download"
      ]
    },
    {
      "id": "technology-social-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"watching or listening online in real time\"?",
      "answer": "Streaming",
      "options": [
        "Streaming",
        "Password",
        "Notification",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"protecting data by turning it into code\"?",
      "answer": "Encryption",
      "options": [
        "Upload",
        "Algorithm",
        "Streaming",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"to get a file from the internet\".",
      "answer": "Download",
      "options": [
        "Upload",
        "Privacy",
        "Encryption",
        "Download"
      ]
    },
    {
      "id": "technology-social-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"a message alert from an app\".",
      "answer": "Notification",
      "options": [
        "Platform",
        "Device",
        "Notification",
        "Download"
      ]
    },
    {
      "id": "technology-social-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"a set of rules used by software\".",
      "answer": "Algorithm",
      "options": [
        "Password",
        "Algorithm",
        "Notification",
        "Streaming"
      ]
    },
    {
      "id": "technology-social-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"control over personal information\".",
      "answer": "Privacy",
      "options": [
        "Privacy",
        "Algorithm",
        "Encryption",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"an online service where people interact\".",
      "answer": "Platform",
      "options": [
        "Privacy",
        "Device",
        "Download",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"watching or listening online in real time\".",
      "answer": "Streaming",
      "options": [
        "Password",
        "Notification",
        "Streaming",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"protecting data by turning it into code\".",
      "answer": "Encryption",
      "options": [
        "Algorithm",
        "Encryption",
        "Streaming",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"a piece of electronic equipment\".",
      "answer": "Device",
      "options": [
        "Device",
        "Password",
        "Notification",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"a secret code used to access an account\".",
      "answer": "Password",
      "options": [
        "Upload",
        "Algorithm",
        "Streaming",
        "Password"
      ]
    },
    {
      "id": "technology-social-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Technology & Social Media: \"to send a file to the internet\".",
      "answer": "Upload",
      "options": [
        "Privacy",
        "Encryption",
        "Upload",
        "Download"
      ]
    },
    {
      "id": "technology-social-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"control over personal information\"?",
      "answer": "Privacy",
      "options": [
        "Algorithm",
        "Encryption",
        "Privacy",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"an online service where people interact\"?",
      "answer": "Platform",
      "options": [
        "Device",
        "Platform",
        "Download",
        "Privacy"
      ]
    },
    {
      "id": "technology-social-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"watching or listening online in real time\"?",
      "answer": "Streaming",
      "options": [
        "Streaming",
        "Notification",
        "Platform",
        "Password"
      ]
    },
    {
      "id": "technology-social-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"protecting data by turning it into code\"?",
      "answer": "Encryption",
      "options": [
        "Algorithm",
        "Streaming",
        "Upload",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"a piece of electronic equipment\"?",
      "answer": "Device",
      "options": [
        "Password",
        "Notification",
        "Device",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"a secret code used to access an account\"?",
      "answer": "Password",
      "options": [
        "Algorithm",
        "Password",
        "Streaming",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"to send a file to the internet\"?",
      "answer": "Upload",
      "options": [
        "Upload",
        "Encryption",
        "Download",
        "Privacy"
      ]
    },
    {
      "id": "technology-social-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"to get a file from the internet\"?",
      "answer": "Download",
      "options": [
        "Device",
        "Notification",
        "Platform",
        "Download"
      ]
    },
    {
      "id": "technology-social-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"a message alert from an app\"?",
      "answer": "Notification",
      "options": [
        "Algorithm",
        "Streaming",
        "Notification",
        "Password"
      ]
    },
    {
      "id": "technology-social-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal technology & social media context, which term best matches: \"a set of rules used by software\"?",
      "answer": "Algorithm",
      "options": [
        "Encryption",
        "Algorithm",
        "Upload",
        "Privacy"
      ]
    }
  ],
  "id": [
    {
      "id": "technology-social-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a piece of electronic equipment\"?",
      "answer": "Device",
      "options": [
        "Device",
        "Download",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a secret code used to access an account\"?",
      "answer": "Password",
      "options": [
        "Notification",
        "Platform",
        "Device",
        "Password"
      ]
    },
    {
      "id": "technology-social-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to send a file to the internet\"?",
      "answer": "Upload",
      "options": [
        "Streaming",
        "Password",
        "Upload",
        "Algorithm"
      ]
    },
    {
      "id": "technology-social-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to get a file from the internet\"?",
      "answer": "Download",
      "options": [
        "Upload",
        "Download",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a message alert from an app\"?",
      "answer": "Notification",
      "options": [
        "Notification",
        "Platform",
        "Device",
        "Download"
      ]
    },
    {
      "id": "technology-social-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a set of rules used by software\"?",
      "answer": "Algorithm",
      "options": [
        "Streaming",
        "Password",
        "Notification",
        "Algorithm"
      ]
    },
    {
      "id": "technology-social-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"control over personal information\"?",
      "answer": "Privacy",
      "options": [
        "Upload",
        "Algorithm",
        "Privacy",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an online service where people interact\"?",
      "answer": "Platform",
      "options": [
        "Privacy",
        "Platform",
        "Device",
        "Download"
      ]
    },
    {
      "id": "technology-social-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"watching or listening online in real time\"?",
      "answer": "Streaming",
      "options": [
        "Streaming",
        "Password",
        "Notification",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"protecting data by turning it into code\"?",
      "answer": "Encryption",
      "options": [
        "Upload",
        "Algorithm",
        "Streaming",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"to get a file from the internet\".",
      "answer": "Download",
      "options": [
        "Upload",
        "Privacy",
        "Encryption",
        "Download"
      ]
    },
    {
      "id": "technology-social-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"a message alert from an app\".",
      "answer": "Notification",
      "options": [
        "Platform",
        "Device",
        "Notification",
        "Download"
      ]
    },
    {
      "id": "technology-social-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"a set of rules used by software\".",
      "answer": "Algorithm",
      "options": [
        "Password",
        "Algorithm",
        "Notification",
        "Streaming"
      ]
    },
    {
      "id": "technology-social-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"control over personal information\".",
      "answer": "Privacy",
      "options": [
        "Privacy",
        "Algorithm",
        "Encryption",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"an online service where people interact\".",
      "answer": "Platform",
      "options": [
        "Privacy",
        "Device",
        "Download",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"watching or listening online in real time\".",
      "answer": "Streaming",
      "options": [
        "Password",
        "Notification",
        "Streaming",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"protecting data by turning it into code\".",
      "answer": "Encryption",
      "options": [
        "Algorithm",
        "Encryption",
        "Streaming",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"a piece of electronic equipment\".",
      "answer": "Device",
      "options": [
        "Device",
        "Password",
        "Notification",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"a secret code used to access an account\".",
      "answer": "Password",
      "options": [
        "Upload",
        "Algorithm",
        "Streaming",
        "Password"
      ]
    },
    {
      "id": "technology-social-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Technology & Social Media: \"to send a file to the internet\".",
      "answer": "Upload",
      "options": [
        "Privacy",
        "Encryption",
        "Upload",
        "Download"
      ]
    },
    {
      "id": "technology-social-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"control over personal information\"?",
      "answer": "Privacy",
      "options": [
        "Algorithm",
        "Encryption",
        "Privacy",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"an online service where people interact\"?",
      "answer": "Platform",
      "options": [
        "Device",
        "Platform",
        "Download",
        "Privacy"
      ]
    },
    {
      "id": "technology-social-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"watching or listening online in real time\"?",
      "answer": "Streaming",
      "options": [
        "Streaming",
        "Notification",
        "Platform",
        "Password"
      ]
    },
    {
      "id": "technology-social-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"protecting data by turning it into code\"?",
      "answer": "Encryption",
      "options": [
        "Algorithm",
        "Streaming",
        "Upload",
        "Encryption"
      ]
    },
    {
      "id": "technology-social-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"a piece of electronic equipment\"?",
      "answer": "Device",
      "options": [
        "Password",
        "Notification",
        "Device",
        "Platform"
      ]
    },
    {
      "id": "technology-social-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"a secret code used to access an account\"?",
      "answer": "Password",
      "options": [
        "Algorithm",
        "Password",
        "Streaming",
        "Upload"
      ]
    },
    {
      "id": "technology-social-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"to send a file to the internet\"?",
      "answer": "Upload",
      "options": [
        "Upload",
        "Encryption",
        "Download",
        "Privacy"
      ]
    },
    {
      "id": "technology-social-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"to get a file from the internet\"?",
      "answer": "Download",
      "options": [
        "Device",
        "Notification",
        "Platform",
        "Download"
      ]
    },
    {
      "id": "technology-social-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"a message alert from an app\"?",
      "answer": "Notification",
      "options": [
        "Algorithm",
        "Streaming",
        "Notification",
        "Password"
      ]
    },
    {
      "id": "technology-social-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks technology & social media yang lebih formal, istilah mana yang paling sesuai dengan: \"a set of rules used by software\"?",
      "answer": "Algorithm",
      "options": [
        "Encryption",
        "Algorithm",
        "Upload",
        "Privacy"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik6Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik6"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
