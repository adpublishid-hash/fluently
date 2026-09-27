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
  "id": "geography",
  "title": "Geography & Landscapes",
  "description": "Kosakata alam, peta, negara, dan bentang lahan.",
  "topicNumber": 22,
  "terms": [
    {
      "word": "River",
      "meaning": "a large natural flow of water"
    },
    {
      "word": "Mountain",
      "meaning": "a very high area of land"
    },
    {
      "word": "Island",
      "meaning": "land surrounded by water"
    },
    {
      "word": "Desert",
      "meaning": "a very dry area of land"
    },
    {
      "word": "Valley",
      "meaning": "low land between hills or mountains"
    },
    {
      "word": "Coast",
      "meaning": "land next to the sea"
    },
    {
      "word": "Continent",
      "meaning": "one of the world's large land areas"
    },
    {
      "word": "Latitude",
      "meaning": "distance north or south of the equator"
    },
    {
      "word": "Topography",
      "meaning": "the physical shape of land"
    },
    {
      "word": "Archipelago",
      "meaning": "a group of islands"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "geography-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a large natural flow of water\"?",
      "answer": "River",
      "options": [
        "River",
        "Desert",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a very high area of land\"?",
      "answer": "Mountain",
      "options": [
        "Valley",
        "Latitude",
        "River",
        "Mountain"
      ]
    },
    {
      "id": "geography-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"land surrounded by water\"?",
      "answer": "Island",
      "options": [
        "Topography",
        "Mountain",
        "Island",
        "Coast"
      ]
    },
    {
      "id": "geography-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a very dry area of land\"?",
      "answer": "Desert",
      "options": [
        "Island",
        "Desert",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"low land between hills or mountains\"?",
      "answer": "Valley",
      "options": [
        "Valley",
        "Latitude",
        "River",
        "Desert"
      ]
    },
    {
      "id": "geography-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"land next to the sea\"?",
      "answer": "Coast",
      "options": [
        "Topography",
        "Mountain",
        "Valley",
        "Coast"
      ]
    },
    {
      "id": "geography-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"one of the world's large land areas\"?",
      "answer": "Continent",
      "options": [
        "Island",
        "Coast",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"distance north or south of the equator\"?",
      "answer": "Latitude",
      "options": [
        "Continent",
        "Latitude",
        "River",
        "Desert"
      ]
    },
    {
      "id": "geography-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"the physical shape of land\"?",
      "answer": "Topography",
      "options": [
        "Topography",
        "Mountain",
        "Valley",
        "Latitude"
      ]
    },
    {
      "id": "geography-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a group of islands\"?",
      "answer": "Archipelago",
      "options": [
        "Island",
        "Coast",
        "Topography",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"a very dry area of land\".",
      "answer": "Desert",
      "options": [
        "Island",
        "Continent",
        "Archipelago",
        "Desert"
      ]
    },
    {
      "id": "geography-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"low land between hills or mountains\".",
      "answer": "Valley",
      "options": [
        "Latitude",
        "River",
        "Valley",
        "Desert"
      ]
    },
    {
      "id": "geography-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"land next to the sea\".",
      "answer": "Coast",
      "options": [
        "Mountain",
        "Coast",
        "Valley",
        "Topography"
      ]
    },
    {
      "id": "geography-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"one of the world's large land areas\".",
      "answer": "Continent",
      "options": [
        "Continent",
        "Coast",
        "Archipelago",
        "Island"
      ]
    },
    {
      "id": "geography-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"distance north or south of the equator\".",
      "answer": "Latitude",
      "options": [
        "Continent",
        "River",
        "Desert",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"the physical shape of land\".",
      "answer": "Topography",
      "options": [
        "Mountain",
        "Valley",
        "Topography",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"a group of islands\".",
      "answer": "Archipelago",
      "options": [
        "Coast",
        "Archipelago",
        "Topography",
        "Island"
      ]
    },
    {
      "id": "geography-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"a large natural flow of water\".",
      "answer": "River",
      "options": [
        "River",
        "Mountain",
        "Valley",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"a very high area of land\".",
      "answer": "Mountain",
      "options": [
        "Island",
        "Coast",
        "Topography",
        "Mountain"
      ]
    },
    {
      "id": "geography-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Geography & Landscapes: \"land surrounded by water\".",
      "answer": "Island",
      "options": [
        "Continent",
        "Archipelago",
        "Island",
        "Desert"
      ]
    },
    {
      "id": "geography-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"one of the world's large land areas\"?",
      "answer": "Continent",
      "options": [
        "Coast",
        "Archipelago",
        "Continent",
        "Island"
      ]
    },
    {
      "id": "geography-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"distance north or south of the equator\"?",
      "answer": "Latitude",
      "options": [
        "River",
        "Latitude",
        "Desert",
        "Continent"
      ]
    },
    {
      "id": "geography-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"the physical shape of land\"?",
      "answer": "Topography",
      "options": [
        "Topography",
        "Valley",
        "Latitude",
        "Mountain"
      ]
    },
    {
      "id": "geography-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"a group of islands\"?",
      "answer": "Archipelago",
      "options": [
        "Coast",
        "Topography",
        "Island",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"a large natural flow of water\"?",
      "answer": "River",
      "options": [
        "Mountain",
        "Valley",
        "River",
        "Latitude"
      ]
    },
    {
      "id": "geography-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"a very high area of land\"?",
      "answer": "Mountain",
      "options": [
        "Coast",
        "Mountain",
        "Topography",
        "Island"
      ]
    },
    {
      "id": "geography-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"land surrounded by water\"?",
      "answer": "Island",
      "options": [
        "Island",
        "Archipelago",
        "Desert",
        "Continent"
      ]
    },
    {
      "id": "geography-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"a very dry area of land\"?",
      "answer": "Desert",
      "options": [
        "River",
        "Valley",
        "Latitude",
        "Desert"
      ]
    },
    {
      "id": "geography-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"low land between hills or mountains\"?",
      "answer": "Valley",
      "options": [
        "Coast",
        "Topography",
        "Valley",
        "Mountain"
      ]
    },
    {
      "id": "geography-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal geography & landscapes context, which term best matches: \"land next to the sea\"?",
      "answer": "Coast",
      "options": [
        "Archipelago",
        "Coast",
        "Island",
        "Continent"
      ]
    }
  ],
  "id": [
    {
      "id": "geography-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a large natural flow of water\"?",
      "answer": "River",
      "options": [
        "River",
        "Desert",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a very high area of land\"?",
      "answer": "Mountain",
      "options": [
        "Valley",
        "Latitude",
        "River",
        "Mountain"
      ]
    },
    {
      "id": "geography-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"land surrounded by water\"?",
      "answer": "Island",
      "options": [
        "Topography",
        "Mountain",
        "Island",
        "Coast"
      ]
    },
    {
      "id": "geography-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a very dry area of land\"?",
      "answer": "Desert",
      "options": [
        "Island",
        "Desert",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"low land between hills or mountains\"?",
      "answer": "Valley",
      "options": [
        "Valley",
        "Latitude",
        "River",
        "Desert"
      ]
    },
    {
      "id": "geography-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"land next to the sea\"?",
      "answer": "Coast",
      "options": [
        "Topography",
        "Mountain",
        "Valley",
        "Coast"
      ]
    },
    {
      "id": "geography-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"one of the world's large land areas\"?",
      "answer": "Continent",
      "options": [
        "Island",
        "Coast",
        "Continent",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"distance north or south of the equator\"?",
      "answer": "Latitude",
      "options": [
        "Continent",
        "Latitude",
        "River",
        "Desert"
      ]
    },
    {
      "id": "geography-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the physical shape of land\"?",
      "answer": "Topography",
      "options": [
        "Topography",
        "Mountain",
        "Valley",
        "Latitude"
      ]
    },
    {
      "id": "geography-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a group of islands\"?",
      "answer": "Archipelago",
      "options": [
        "Island",
        "Coast",
        "Topography",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"a very dry area of land\".",
      "answer": "Desert",
      "options": [
        "Island",
        "Continent",
        "Archipelago",
        "Desert"
      ]
    },
    {
      "id": "geography-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"low land between hills or mountains\".",
      "answer": "Valley",
      "options": [
        "Latitude",
        "River",
        "Valley",
        "Desert"
      ]
    },
    {
      "id": "geography-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"land next to the sea\".",
      "answer": "Coast",
      "options": [
        "Mountain",
        "Coast",
        "Valley",
        "Topography"
      ]
    },
    {
      "id": "geography-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"one of the world's large land areas\".",
      "answer": "Continent",
      "options": [
        "Continent",
        "Coast",
        "Archipelago",
        "Island"
      ]
    },
    {
      "id": "geography-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"distance north or south of the equator\".",
      "answer": "Latitude",
      "options": [
        "Continent",
        "River",
        "Desert",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"the physical shape of land\".",
      "answer": "Topography",
      "options": [
        "Mountain",
        "Valley",
        "Topography",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"a group of islands\".",
      "answer": "Archipelago",
      "options": [
        "Coast",
        "Archipelago",
        "Topography",
        "Island"
      ]
    },
    {
      "id": "geography-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"a large natural flow of water\".",
      "answer": "River",
      "options": [
        "River",
        "Mountain",
        "Valley",
        "Latitude"
      ]
    },
    {
      "id": "geography-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"a very high area of land\".",
      "answer": "Mountain",
      "options": [
        "Island",
        "Coast",
        "Topography",
        "Mountain"
      ]
    },
    {
      "id": "geography-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Geography & Landscapes: \"land surrounded by water\".",
      "answer": "Island",
      "options": [
        "Continent",
        "Archipelago",
        "Island",
        "Desert"
      ]
    },
    {
      "id": "geography-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"one of the world's large land areas\"?",
      "answer": "Continent",
      "options": [
        "Coast",
        "Archipelago",
        "Continent",
        "Island"
      ]
    },
    {
      "id": "geography-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"distance north or south of the equator\"?",
      "answer": "Latitude",
      "options": [
        "River",
        "Latitude",
        "Desert",
        "Continent"
      ]
    },
    {
      "id": "geography-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"the physical shape of land\"?",
      "answer": "Topography",
      "options": [
        "Topography",
        "Valley",
        "Latitude",
        "Mountain"
      ]
    },
    {
      "id": "geography-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"a group of islands\"?",
      "answer": "Archipelago",
      "options": [
        "Coast",
        "Topography",
        "Island",
        "Archipelago"
      ]
    },
    {
      "id": "geography-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"a large natural flow of water\"?",
      "answer": "River",
      "options": [
        "Mountain",
        "Valley",
        "River",
        "Latitude"
      ]
    },
    {
      "id": "geography-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"a very high area of land\"?",
      "answer": "Mountain",
      "options": [
        "Coast",
        "Mountain",
        "Topography",
        "Island"
      ]
    },
    {
      "id": "geography-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"land surrounded by water\"?",
      "answer": "Island",
      "options": [
        "Island",
        "Archipelago",
        "Desert",
        "Continent"
      ]
    },
    {
      "id": "geography-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"a very dry area of land\"?",
      "answer": "Desert",
      "options": [
        "River",
        "Valley",
        "Latitude",
        "Desert"
      ]
    },
    {
      "id": "geography-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"low land between hills or mountains\"?",
      "answer": "Valley",
      "options": [
        "Coast",
        "Topography",
        "Valley",
        "Mountain"
      ]
    },
    {
      "id": "geography-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks geography & landscapes yang lebih formal, istilah mana yang paling sesuai dengan: \"land next to the sea\"?",
      "answer": "Coast",
      "options": [
        "Archipelago",
        "Coast",
        "Island",
        "Continent"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik22Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik22"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
