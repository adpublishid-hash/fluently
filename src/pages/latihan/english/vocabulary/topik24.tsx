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
  "id": "transportation",
  "title": "Transportation & Vehicles",
  "description": "Kosakata kendaraan, lalu lintas, dan perjalanan.",
  "topicNumber": 24,
  "terms": [
    {
      "word": "Bus",
      "meaning": "a large vehicle for passengers"
    },
    {
      "word": "Ticket",
      "meaning": "proof of payment for travel"
    },
    {
      "word": "Station",
      "meaning": "a place where trains or buses stop"
    },
    {
      "word": "Traffic",
      "meaning": "vehicles moving on roads"
    },
    {
      "word": "Commute",
      "meaning": "travel between home and work"
    },
    {
      "word": "Vehicle",
      "meaning": "a machine used for transport"
    },
    {
      "word": "Route",
      "meaning": "the path taken to reach a place"
    },
    {
      "word": "Departure",
      "meaning": "the act of leaving"
    },
    {
      "word": "Congestion",
      "meaning": "too much traffic in one area"
    },
    {
      "word": "Infrastructure",
      "meaning": "basic transport systems and facilities"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "transportation-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a large vehicle for passengers\"?",
      "answer": "Bus",
      "options": [
        "Bus",
        "Traffic",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"proof of payment for travel\"?",
      "answer": "Ticket",
      "options": [
        "Commute",
        "Departure",
        "Bus",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a place where trains or buses stop\"?",
      "answer": "Station",
      "options": [
        "Congestion",
        "Ticket",
        "Station",
        "Vehicle"
      ]
    },
    {
      "id": "transportation-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"vehicles moving on roads\"?",
      "answer": "Traffic",
      "options": [
        "Station",
        "Traffic",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"travel between home and work\"?",
      "answer": "Commute",
      "options": [
        "Commute",
        "Departure",
        "Bus",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a machine used for transport\"?",
      "answer": "Vehicle",
      "options": [
        "Congestion",
        "Ticket",
        "Commute",
        "Vehicle"
      ]
    },
    {
      "id": "transportation-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"the path taken to reach a place\"?",
      "answer": "Route",
      "options": [
        "Station",
        "Vehicle",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"the act of leaving\"?",
      "answer": "Departure",
      "options": [
        "Route",
        "Departure",
        "Bus",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"too much traffic in one area\"?",
      "answer": "Congestion",
      "options": [
        "Congestion",
        "Ticket",
        "Commute",
        "Departure"
      ]
    },
    {
      "id": "transportation-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"basic transport systems and facilities\"?",
      "answer": "Infrastructure",
      "options": [
        "Station",
        "Vehicle",
        "Congestion",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"vehicles moving on roads\".",
      "answer": "Traffic",
      "options": [
        "Station",
        "Route",
        "Infrastructure",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"travel between home and work\".",
      "answer": "Commute",
      "options": [
        "Departure",
        "Bus",
        "Commute",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"a machine used for transport\".",
      "answer": "Vehicle",
      "options": [
        "Ticket",
        "Vehicle",
        "Commute",
        "Congestion"
      ]
    },
    {
      "id": "transportation-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"the path taken to reach a place\".",
      "answer": "Route",
      "options": [
        "Route",
        "Vehicle",
        "Infrastructure",
        "Station"
      ]
    },
    {
      "id": "transportation-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"the act of leaving\".",
      "answer": "Departure",
      "options": [
        "Route",
        "Bus",
        "Traffic",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"too much traffic in one area\".",
      "answer": "Congestion",
      "options": [
        "Ticket",
        "Commute",
        "Congestion",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"basic transport systems and facilities\".",
      "answer": "Infrastructure",
      "options": [
        "Vehicle",
        "Infrastructure",
        "Congestion",
        "Station"
      ]
    },
    {
      "id": "transportation-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"a large vehicle for passengers\".",
      "answer": "Bus",
      "options": [
        "Bus",
        "Ticket",
        "Commute",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"proof of payment for travel\".",
      "answer": "Ticket",
      "options": [
        "Station",
        "Vehicle",
        "Congestion",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Transportation & Vehicles: \"a place where trains or buses stop\".",
      "answer": "Station",
      "options": [
        "Route",
        "Infrastructure",
        "Station",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"the path taken to reach a place\"?",
      "answer": "Route",
      "options": [
        "Vehicle",
        "Infrastructure",
        "Route",
        "Station"
      ]
    },
    {
      "id": "transportation-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"the act of leaving\"?",
      "answer": "Departure",
      "options": [
        "Bus",
        "Departure",
        "Traffic",
        "Route"
      ]
    },
    {
      "id": "transportation-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"too much traffic in one area\"?",
      "answer": "Congestion",
      "options": [
        "Congestion",
        "Commute",
        "Departure",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"basic transport systems and facilities\"?",
      "answer": "Infrastructure",
      "options": [
        "Vehicle",
        "Congestion",
        "Station",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"a large vehicle for passengers\"?",
      "answer": "Bus",
      "options": [
        "Ticket",
        "Commute",
        "Bus",
        "Departure"
      ]
    },
    {
      "id": "transportation-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"proof of payment for travel\"?",
      "answer": "Ticket",
      "options": [
        "Vehicle",
        "Ticket",
        "Congestion",
        "Station"
      ]
    },
    {
      "id": "transportation-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"a place where trains or buses stop\"?",
      "answer": "Station",
      "options": [
        "Station",
        "Infrastructure",
        "Traffic",
        "Route"
      ]
    },
    {
      "id": "transportation-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"vehicles moving on roads\"?",
      "answer": "Traffic",
      "options": [
        "Bus",
        "Commute",
        "Departure",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"travel between home and work\"?",
      "answer": "Commute",
      "options": [
        "Vehicle",
        "Congestion",
        "Commute",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal transportation & vehicles context, which term best matches: \"a machine used for transport\"?",
      "answer": "Vehicle",
      "options": [
        "Infrastructure",
        "Vehicle",
        "Station",
        "Route"
      ]
    }
  ],
  "id": [
    {
      "id": "transportation-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a large vehicle for passengers\"?",
      "answer": "Bus",
      "options": [
        "Bus",
        "Traffic",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"proof of payment for travel\"?",
      "answer": "Ticket",
      "options": [
        "Commute",
        "Departure",
        "Bus",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place where trains or buses stop\"?",
      "answer": "Station",
      "options": [
        "Congestion",
        "Ticket",
        "Station",
        "Vehicle"
      ]
    },
    {
      "id": "transportation-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"vehicles moving on roads\"?",
      "answer": "Traffic",
      "options": [
        "Station",
        "Traffic",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"travel between home and work\"?",
      "answer": "Commute",
      "options": [
        "Commute",
        "Departure",
        "Bus",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a machine used for transport\"?",
      "answer": "Vehicle",
      "options": [
        "Congestion",
        "Ticket",
        "Commute",
        "Vehicle"
      ]
    },
    {
      "id": "transportation-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the path taken to reach a place\"?",
      "answer": "Route",
      "options": [
        "Station",
        "Vehicle",
        "Route",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the act of leaving\"?",
      "answer": "Departure",
      "options": [
        "Route",
        "Departure",
        "Bus",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"too much traffic in one area\"?",
      "answer": "Congestion",
      "options": [
        "Congestion",
        "Ticket",
        "Commute",
        "Departure"
      ]
    },
    {
      "id": "transportation-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"basic transport systems and facilities\"?",
      "answer": "Infrastructure",
      "options": [
        "Station",
        "Vehicle",
        "Congestion",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"vehicles moving on roads\".",
      "answer": "Traffic",
      "options": [
        "Station",
        "Route",
        "Infrastructure",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"travel between home and work\".",
      "answer": "Commute",
      "options": [
        "Departure",
        "Bus",
        "Commute",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"a machine used for transport\".",
      "answer": "Vehicle",
      "options": [
        "Ticket",
        "Vehicle",
        "Commute",
        "Congestion"
      ]
    },
    {
      "id": "transportation-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"the path taken to reach a place\".",
      "answer": "Route",
      "options": [
        "Route",
        "Vehicle",
        "Infrastructure",
        "Station"
      ]
    },
    {
      "id": "transportation-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"the act of leaving\".",
      "answer": "Departure",
      "options": [
        "Route",
        "Bus",
        "Traffic",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"too much traffic in one area\".",
      "answer": "Congestion",
      "options": [
        "Ticket",
        "Commute",
        "Congestion",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"basic transport systems and facilities\".",
      "answer": "Infrastructure",
      "options": [
        "Vehicle",
        "Infrastructure",
        "Congestion",
        "Station"
      ]
    },
    {
      "id": "transportation-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"a large vehicle for passengers\".",
      "answer": "Bus",
      "options": [
        "Bus",
        "Ticket",
        "Commute",
        "Departure"
      ]
    },
    {
      "id": "transportation-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"proof of payment for travel\".",
      "answer": "Ticket",
      "options": [
        "Station",
        "Vehicle",
        "Congestion",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Transportation & Vehicles: \"a place where trains or buses stop\".",
      "answer": "Station",
      "options": [
        "Route",
        "Infrastructure",
        "Station",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"the path taken to reach a place\"?",
      "answer": "Route",
      "options": [
        "Vehicle",
        "Infrastructure",
        "Route",
        "Station"
      ]
    },
    {
      "id": "transportation-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"the act of leaving\"?",
      "answer": "Departure",
      "options": [
        "Bus",
        "Departure",
        "Traffic",
        "Route"
      ]
    },
    {
      "id": "transportation-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"too much traffic in one area\"?",
      "answer": "Congestion",
      "options": [
        "Congestion",
        "Commute",
        "Departure",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"basic transport systems and facilities\"?",
      "answer": "Infrastructure",
      "options": [
        "Vehicle",
        "Congestion",
        "Station",
        "Infrastructure"
      ]
    },
    {
      "id": "transportation-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"a large vehicle for passengers\"?",
      "answer": "Bus",
      "options": [
        "Ticket",
        "Commute",
        "Bus",
        "Departure"
      ]
    },
    {
      "id": "transportation-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"proof of payment for travel\"?",
      "answer": "Ticket",
      "options": [
        "Vehicle",
        "Ticket",
        "Congestion",
        "Station"
      ]
    },
    {
      "id": "transportation-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"a place where trains or buses stop\"?",
      "answer": "Station",
      "options": [
        "Station",
        "Infrastructure",
        "Traffic",
        "Route"
      ]
    },
    {
      "id": "transportation-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"vehicles moving on roads\"?",
      "answer": "Traffic",
      "options": [
        "Bus",
        "Commute",
        "Departure",
        "Traffic"
      ]
    },
    {
      "id": "transportation-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"travel between home and work\"?",
      "answer": "Commute",
      "options": [
        "Vehicle",
        "Congestion",
        "Commute",
        "Ticket"
      ]
    },
    {
      "id": "transportation-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks transportation & vehicles yang lebih formal, istilah mana yang paling sesuai dengan: \"a machine used for transport\"?",
      "answer": "Vehicle",
      "options": [
        "Infrastructure",
        "Vehicle",
        "Station",
        "Route"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik24Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik24"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
