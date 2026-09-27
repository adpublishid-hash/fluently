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
  "id": "travel-tourism",
  "title": "Travel & Tourism",
  "description": "Kosakata perjalanan, hotel, arah, dan liburan.",
  "topicNumber": 3,
  "terms": [
    {
      "word": "Passport",
      "meaning": "an official document for international travel"
    },
    {
      "word": "Itinerary",
      "meaning": "a planned route or travel schedule"
    },
    {
      "word": "Reservation",
      "meaning": "an arrangement to keep a room or seat"
    },
    {
      "word": "Luggage",
      "meaning": "bags used for travel"
    },
    {
      "word": "Destination",
      "meaning": "the place someone is travelling to"
    },
    {
      "word": "Accommodation",
      "meaning": "a place to stay while travelling"
    },
    {
      "word": "Tourist",
      "meaning": "a person visiting a place for pleasure"
    },
    {
      "word": "Departure",
      "meaning": "the act of leaving for a trip"
    },
    {
      "word": "Landmark",
      "meaning": "a famous or easily recognized place"
    },
    {
      "word": "Excursion",
      "meaning": "a short trip for pleasure or learning"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "travel-tourism-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"an official document for international travel\"?",
      "answer": "Passport",
      "options": [
        "Passport",
        "Luggage",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a planned route or travel schedule\"?",
      "answer": "Itinerary",
      "options": [
        "Destination",
        "Departure",
        "Passport",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"an arrangement to keep a room or seat\"?",
      "answer": "Reservation",
      "options": [
        "Landmark",
        "Itinerary",
        "Reservation",
        "Accommodation"
      ]
    },
    {
      "id": "travel-tourism-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"bags used for travel\"?",
      "answer": "Luggage",
      "options": [
        "Reservation",
        "Luggage",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"the place someone is travelling to\"?",
      "answer": "Destination",
      "options": [
        "Destination",
        "Departure",
        "Passport",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a place to stay while travelling\"?",
      "answer": "Accommodation",
      "options": [
        "Landmark",
        "Itinerary",
        "Destination",
        "Accommodation"
      ]
    },
    {
      "id": "travel-tourism-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a person visiting a place for pleasure\"?",
      "answer": "Tourist",
      "options": [
        "Reservation",
        "Accommodation",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"the act of leaving for a trip\"?",
      "answer": "Departure",
      "options": [
        "Tourist",
        "Departure",
        "Passport",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a famous or easily recognized place\"?",
      "answer": "Landmark",
      "options": [
        "Landmark",
        "Itinerary",
        "Destination",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a short trip for pleasure or learning\"?",
      "answer": "Excursion",
      "options": [
        "Reservation",
        "Accommodation",
        "Landmark",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"bags used for travel\".",
      "answer": "Luggage",
      "options": [
        "Reservation",
        "Tourist",
        "Excursion",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"the place someone is travelling to\".",
      "answer": "Destination",
      "options": [
        "Departure",
        "Passport",
        "Destination",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"a place to stay while travelling\".",
      "answer": "Accommodation",
      "options": [
        "Itinerary",
        "Accommodation",
        "Destination",
        "Landmark"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"a person visiting a place for pleasure\".",
      "answer": "Tourist",
      "options": [
        "Tourist",
        "Accommodation",
        "Excursion",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"the act of leaving for a trip\".",
      "answer": "Departure",
      "options": [
        "Tourist",
        "Passport",
        "Luggage",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"a famous or easily recognized place\".",
      "answer": "Landmark",
      "options": [
        "Itinerary",
        "Destination",
        "Landmark",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"a short trip for pleasure or learning\".",
      "answer": "Excursion",
      "options": [
        "Accommodation",
        "Excursion",
        "Landmark",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"an official document for international travel\".",
      "answer": "Passport",
      "options": [
        "Passport",
        "Itinerary",
        "Destination",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"a planned route or travel schedule\".",
      "answer": "Itinerary",
      "options": [
        "Reservation",
        "Accommodation",
        "Landmark",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Travel & Tourism: \"an arrangement to keep a room or seat\".",
      "answer": "Reservation",
      "options": [
        "Tourist",
        "Excursion",
        "Reservation",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"a person visiting a place for pleasure\"?",
      "answer": "Tourist",
      "options": [
        "Accommodation",
        "Excursion",
        "Tourist",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"the act of leaving for a trip\"?",
      "answer": "Departure",
      "options": [
        "Passport",
        "Departure",
        "Luggage",
        "Tourist"
      ]
    },
    {
      "id": "travel-tourism-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"a famous or easily recognized place\"?",
      "answer": "Landmark",
      "options": [
        "Landmark",
        "Destination",
        "Departure",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"a short trip for pleasure or learning\"?",
      "answer": "Excursion",
      "options": [
        "Accommodation",
        "Landmark",
        "Reservation",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"an official document for international travel\"?",
      "answer": "Passport",
      "options": [
        "Itinerary",
        "Destination",
        "Passport",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"a planned route or travel schedule\"?",
      "answer": "Itinerary",
      "options": [
        "Accommodation",
        "Itinerary",
        "Landmark",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"an arrangement to keep a room or seat\"?",
      "answer": "Reservation",
      "options": [
        "Reservation",
        "Excursion",
        "Luggage",
        "Tourist"
      ]
    },
    {
      "id": "travel-tourism-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"bags used for travel\"?",
      "answer": "Luggage",
      "options": [
        "Passport",
        "Destination",
        "Departure",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"the place someone is travelling to\"?",
      "answer": "Destination",
      "options": [
        "Accommodation",
        "Landmark",
        "Destination",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal travel & tourism context, which term best matches: \"a place to stay while travelling\"?",
      "answer": "Accommodation",
      "options": [
        "Excursion",
        "Accommodation",
        "Reservation",
        "Tourist"
      ]
    }
  ],
  "id": [
    {
      "id": "travel-tourism-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an official document for international travel\"?",
      "answer": "Passport",
      "options": [
        "Passport",
        "Luggage",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a planned route or travel schedule\"?",
      "answer": "Itinerary",
      "options": [
        "Destination",
        "Departure",
        "Passport",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an arrangement to keep a room or seat\"?",
      "answer": "Reservation",
      "options": [
        "Landmark",
        "Itinerary",
        "Reservation",
        "Accommodation"
      ]
    },
    {
      "id": "travel-tourism-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"bags used for travel\"?",
      "answer": "Luggage",
      "options": [
        "Reservation",
        "Luggage",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the place someone is travelling to\"?",
      "answer": "Destination",
      "options": [
        "Destination",
        "Departure",
        "Passport",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place to stay while travelling\"?",
      "answer": "Accommodation",
      "options": [
        "Landmark",
        "Itinerary",
        "Destination",
        "Accommodation"
      ]
    },
    {
      "id": "travel-tourism-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person visiting a place for pleasure\"?",
      "answer": "Tourist",
      "options": [
        "Reservation",
        "Accommodation",
        "Tourist",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the act of leaving for a trip\"?",
      "answer": "Departure",
      "options": [
        "Tourist",
        "Departure",
        "Passport",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a famous or easily recognized place\"?",
      "answer": "Landmark",
      "options": [
        "Landmark",
        "Itinerary",
        "Destination",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a short trip for pleasure or learning\"?",
      "answer": "Excursion",
      "options": [
        "Reservation",
        "Accommodation",
        "Landmark",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"bags used for travel\".",
      "answer": "Luggage",
      "options": [
        "Reservation",
        "Tourist",
        "Excursion",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"the place someone is travelling to\".",
      "answer": "Destination",
      "options": [
        "Departure",
        "Passport",
        "Destination",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"a place to stay while travelling\".",
      "answer": "Accommodation",
      "options": [
        "Itinerary",
        "Accommodation",
        "Destination",
        "Landmark"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"a person visiting a place for pleasure\".",
      "answer": "Tourist",
      "options": [
        "Tourist",
        "Accommodation",
        "Excursion",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"the act of leaving for a trip\".",
      "answer": "Departure",
      "options": [
        "Tourist",
        "Passport",
        "Luggage",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"a famous or easily recognized place\".",
      "answer": "Landmark",
      "options": [
        "Itinerary",
        "Destination",
        "Landmark",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"a short trip for pleasure or learning\".",
      "answer": "Excursion",
      "options": [
        "Accommodation",
        "Excursion",
        "Landmark",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"an official document for international travel\".",
      "answer": "Passport",
      "options": [
        "Passport",
        "Itinerary",
        "Destination",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"a planned route or travel schedule\".",
      "answer": "Itinerary",
      "options": [
        "Reservation",
        "Accommodation",
        "Landmark",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Travel & Tourism: \"an arrangement to keep a room or seat\".",
      "answer": "Reservation",
      "options": [
        "Tourist",
        "Excursion",
        "Reservation",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"a person visiting a place for pleasure\"?",
      "answer": "Tourist",
      "options": [
        "Accommodation",
        "Excursion",
        "Tourist",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"the act of leaving for a trip\"?",
      "answer": "Departure",
      "options": [
        "Passport",
        "Departure",
        "Luggage",
        "Tourist"
      ]
    },
    {
      "id": "travel-tourism-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"a famous or easily recognized place\"?",
      "answer": "Landmark",
      "options": [
        "Landmark",
        "Destination",
        "Departure",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"a short trip for pleasure or learning\"?",
      "answer": "Excursion",
      "options": [
        "Accommodation",
        "Landmark",
        "Reservation",
        "Excursion"
      ]
    },
    {
      "id": "travel-tourism-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"an official document for international travel\"?",
      "answer": "Passport",
      "options": [
        "Itinerary",
        "Destination",
        "Passport",
        "Departure"
      ]
    },
    {
      "id": "travel-tourism-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"a planned route or travel schedule\"?",
      "answer": "Itinerary",
      "options": [
        "Accommodation",
        "Itinerary",
        "Landmark",
        "Reservation"
      ]
    },
    {
      "id": "travel-tourism-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"an arrangement to keep a room or seat\"?",
      "answer": "Reservation",
      "options": [
        "Reservation",
        "Excursion",
        "Luggage",
        "Tourist"
      ]
    },
    {
      "id": "travel-tourism-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"bags used for travel\"?",
      "answer": "Luggage",
      "options": [
        "Passport",
        "Destination",
        "Departure",
        "Luggage"
      ]
    },
    {
      "id": "travel-tourism-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"the place someone is travelling to\"?",
      "answer": "Destination",
      "options": [
        "Accommodation",
        "Landmark",
        "Destination",
        "Itinerary"
      ]
    },
    {
      "id": "travel-tourism-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks travel & tourism yang lebih formal, istilah mana yang paling sesuai dengan: \"a place to stay while travelling\"?",
      "answer": "Accommodation",
      "options": [
        "Excursion",
        "Accommodation",
        "Reservation",
        "Tourist"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik3Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik3"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
