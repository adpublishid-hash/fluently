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
  "id": "house",
  "title": "House, Home & Chores",
  "description": "Kosakata rumah, ruangan, benda, dan pekerjaan rumah.",
  "topicNumber": 13,
  "terms": [
    {
      "word": "Kitchen",
      "meaning": "a room used for cooking"
    },
    {
      "word": "Bedroom",
      "meaning": "a room used for sleeping"
    },
    {
      "word": "Furniture",
      "meaning": "large movable items in a room"
    },
    {
      "word": "Laundry",
      "meaning": "clothes that need washing"
    },
    {
      "word": "Appliance",
      "meaning": "a machine used in the home"
    },
    {
      "word": "Renovate",
      "meaning": "to repair or improve a building"
    },
    {
      "word": "Mortgage",
      "meaning": "a loan used to buy a house"
    },
    {
      "word": "Tenant",
      "meaning": "a person who rents a place"
    },
    {
      "word": "Household",
      "meaning": "all the people living in one home"
    },
    {
      "word": "Maintenance",
      "meaning": "work done to keep something in good condition"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "house-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a room used for cooking\"?",
      "answer": "Kitchen",
      "options": [
        "Kitchen",
        "Laundry",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a room used for sleeping\"?",
      "answer": "Bedroom",
      "options": [
        "Appliance",
        "Tenant",
        "Kitchen",
        "Bedroom"
      ]
    },
    {
      "id": "house-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"large movable items in a room\"?",
      "answer": "Furniture",
      "options": [
        "Household",
        "Bedroom",
        "Furniture",
        "Renovate"
      ]
    },
    {
      "id": "house-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"clothes that need washing\"?",
      "answer": "Laundry",
      "options": [
        "Furniture",
        "Laundry",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a machine used in the home\"?",
      "answer": "Appliance",
      "options": [
        "Appliance",
        "Tenant",
        "Kitchen",
        "Laundry"
      ]
    },
    {
      "id": "house-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"to repair or improve a building\"?",
      "answer": "Renovate",
      "options": [
        "Household",
        "Bedroom",
        "Appliance",
        "Renovate"
      ]
    },
    {
      "id": "house-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a loan used to buy a house\"?",
      "answer": "Mortgage",
      "options": [
        "Furniture",
        "Renovate",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a person who rents a place\"?",
      "answer": "Tenant",
      "options": [
        "Mortgage",
        "Tenant",
        "Kitchen",
        "Laundry"
      ]
    },
    {
      "id": "house-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"all the people living in one home\"?",
      "answer": "Household",
      "options": [
        "Household",
        "Bedroom",
        "Appliance",
        "Tenant"
      ]
    },
    {
      "id": "house-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"work done to keep something in good condition\"?",
      "answer": "Maintenance",
      "options": [
        "Furniture",
        "Renovate",
        "Household",
        "Maintenance"
      ]
    },
    {
      "id": "house-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"clothes that need washing\".",
      "answer": "Laundry",
      "options": [
        "Furniture",
        "Mortgage",
        "Maintenance",
        "Laundry"
      ]
    },
    {
      "id": "house-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"a machine used in the home\".",
      "answer": "Appliance",
      "options": [
        "Tenant",
        "Kitchen",
        "Appliance",
        "Laundry"
      ]
    },
    {
      "id": "house-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"to repair or improve a building\".",
      "answer": "Renovate",
      "options": [
        "Bedroom",
        "Renovate",
        "Appliance",
        "Household"
      ]
    },
    {
      "id": "house-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"a loan used to buy a house\".",
      "answer": "Mortgage",
      "options": [
        "Mortgage",
        "Renovate",
        "Maintenance",
        "Furniture"
      ]
    },
    {
      "id": "house-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"a person who rents a place\".",
      "answer": "Tenant",
      "options": [
        "Mortgage",
        "Kitchen",
        "Laundry",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"all the people living in one home\".",
      "answer": "Household",
      "options": [
        "Bedroom",
        "Appliance",
        "Household",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"work done to keep something in good condition\".",
      "answer": "Maintenance",
      "options": [
        "Renovate",
        "Maintenance",
        "Household",
        "Furniture"
      ]
    },
    {
      "id": "house-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"a room used for cooking\".",
      "answer": "Kitchen",
      "options": [
        "Kitchen",
        "Bedroom",
        "Appliance",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"a room used for sleeping\".",
      "answer": "Bedroom",
      "options": [
        "Furniture",
        "Renovate",
        "Household",
        "Bedroom"
      ]
    },
    {
      "id": "house-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in House, Home & Chores: \"large movable items in a room\".",
      "answer": "Furniture",
      "options": [
        "Mortgage",
        "Maintenance",
        "Furniture",
        "Laundry"
      ]
    },
    {
      "id": "house-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"a loan used to buy a house\"?",
      "answer": "Mortgage",
      "options": [
        "Renovate",
        "Maintenance",
        "Mortgage",
        "Furniture"
      ]
    },
    {
      "id": "house-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"a person who rents a place\"?",
      "answer": "Tenant",
      "options": [
        "Kitchen",
        "Tenant",
        "Laundry",
        "Mortgage"
      ]
    },
    {
      "id": "house-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"all the people living in one home\"?",
      "answer": "Household",
      "options": [
        "Household",
        "Appliance",
        "Tenant",
        "Bedroom"
      ]
    },
    {
      "id": "house-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"work done to keep something in good condition\"?",
      "answer": "Maintenance",
      "options": [
        "Renovate",
        "Household",
        "Furniture",
        "Maintenance"
      ]
    },
    {
      "id": "house-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"a room used for cooking\"?",
      "answer": "Kitchen",
      "options": [
        "Bedroom",
        "Appliance",
        "Kitchen",
        "Tenant"
      ]
    },
    {
      "id": "house-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"a room used for sleeping\"?",
      "answer": "Bedroom",
      "options": [
        "Renovate",
        "Bedroom",
        "Household",
        "Furniture"
      ]
    },
    {
      "id": "house-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"large movable items in a room\"?",
      "answer": "Furniture",
      "options": [
        "Furniture",
        "Maintenance",
        "Laundry",
        "Mortgage"
      ]
    },
    {
      "id": "house-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"clothes that need washing\"?",
      "answer": "Laundry",
      "options": [
        "Kitchen",
        "Appliance",
        "Tenant",
        "Laundry"
      ]
    },
    {
      "id": "house-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"a machine used in the home\"?",
      "answer": "Appliance",
      "options": [
        "Renovate",
        "Household",
        "Appliance",
        "Bedroom"
      ]
    },
    {
      "id": "house-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal house, home & chores context, which term best matches: \"to repair or improve a building\"?",
      "answer": "Renovate",
      "options": [
        "Maintenance",
        "Renovate",
        "Furniture",
        "Mortgage"
      ]
    }
  ],
  "id": [
    {
      "id": "house-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a room used for cooking\"?",
      "answer": "Kitchen",
      "options": [
        "Kitchen",
        "Laundry",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a room used for sleeping\"?",
      "answer": "Bedroom",
      "options": [
        "Appliance",
        "Tenant",
        "Kitchen",
        "Bedroom"
      ]
    },
    {
      "id": "house-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"large movable items in a room\"?",
      "answer": "Furniture",
      "options": [
        "Household",
        "Bedroom",
        "Furniture",
        "Renovate"
      ]
    },
    {
      "id": "house-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"clothes that need washing\"?",
      "answer": "Laundry",
      "options": [
        "Furniture",
        "Laundry",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a machine used in the home\"?",
      "answer": "Appliance",
      "options": [
        "Appliance",
        "Tenant",
        "Kitchen",
        "Laundry"
      ]
    },
    {
      "id": "house-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to repair or improve a building\"?",
      "answer": "Renovate",
      "options": [
        "Household",
        "Bedroom",
        "Appliance",
        "Renovate"
      ]
    },
    {
      "id": "house-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a loan used to buy a house\"?",
      "answer": "Mortgage",
      "options": [
        "Furniture",
        "Renovate",
        "Mortgage",
        "Maintenance"
      ]
    },
    {
      "id": "house-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who rents a place\"?",
      "answer": "Tenant",
      "options": [
        "Mortgage",
        "Tenant",
        "Kitchen",
        "Laundry"
      ]
    },
    {
      "id": "house-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"all the people living in one home\"?",
      "answer": "Household",
      "options": [
        "Household",
        "Bedroom",
        "Appliance",
        "Tenant"
      ]
    },
    {
      "id": "house-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"work done to keep something in good condition\"?",
      "answer": "Maintenance",
      "options": [
        "Furniture",
        "Renovate",
        "Household",
        "Maintenance"
      ]
    },
    {
      "id": "house-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"clothes that need washing\".",
      "answer": "Laundry",
      "options": [
        "Furniture",
        "Mortgage",
        "Maintenance",
        "Laundry"
      ]
    },
    {
      "id": "house-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"a machine used in the home\".",
      "answer": "Appliance",
      "options": [
        "Tenant",
        "Kitchen",
        "Appliance",
        "Laundry"
      ]
    },
    {
      "id": "house-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"to repair or improve a building\".",
      "answer": "Renovate",
      "options": [
        "Bedroom",
        "Renovate",
        "Appliance",
        "Household"
      ]
    },
    {
      "id": "house-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"a loan used to buy a house\".",
      "answer": "Mortgage",
      "options": [
        "Mortgage",
        "Renovate",
        "Maintenance",
        "Furniture"
      ]
    },
    {
      "id": "house-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"a person who rents a place\".",
      "answer": "Tenant",
      "options": [
        "Mortgage",
        "Kitchen",
        "Laundry",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"all the people living in one home\".",
      "answer": "Household",
      "options": [
        "Bedroom",
        "Appliance",
        "Household",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"work done to keep something in good condition\".",
      "answer": "Maintenance",
      "options": [
        "Renovate",
        "Maintenance",
        "Household",
        "Furniture"
      ]
    },
    {
      "id": "house-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"a room used for cooking\".",
      "answer": "Kitchen",
      "options": [
        "Kitchen",
        "Bedroom",
        "Appliance",
        "Tenant"
      ]
    },
    {
      "id": "house-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"a room used for sleeping\".",
      "answer": "Bedroom",
      "options": [
        "Furniture",
        "Renovate",
        "Household",
        "Bedroom"
      ]
    },
    {
      "id": "house-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik House, Home & Chores: \"large movable items in a room\".",
      "answer": "Furniture",
      "options": [
        "Mortgage",
        "Maintenance",
        "Furniture",
        "Laundry"
      ]
    },
    {
      "id": "house-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"a loan used to buy a house\"?",
      "answer": "Mortgage",
      "options": [
        "Renovate",
        "Maintenance",
        "Mortgage",
        "Furniture"
      ]
    },
    {
      "id": "house-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who rents a place\"?",
      "answer": "Tenant",
      "options": [
        "Kitchen",
        "Tenant",
        "Laundry",
        "Mortgage"
      ]
    },
    {
      "id": "house-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"all the people living in one home\"?",
      "answer": "Household",
      "options": [
        "Household",
        "Appliance",
        "Tenant",
        "Bedroom"
      ]
    },
    {
      "id": "house-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"work done to keep something in good condition\"?",
      "answer": "Maintenance",
      "options": [
        "Renovate",
        "Household",
        "Furniture",
        "Maintenance"
      ]
    },
    {
      "id": "house-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"a room used for cooking\"?",
      "answer": "Kitchen",
      "options": [
        "Bedroom",
        "Appliance",
        "Kitchen",
        "Tenant"
      ]
    },
    {
      "id": "house-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"a room used for sleeping\"?",
      "answer": "Bedroom",
      "options": [
        "Renovate",
        "Bedroom",
        "Household",
        "Furniture"
      ]
    },
    {
      "id": "house-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"large movable items in a room\"?",
      "answer": "Furniture",
      "options": [
        "Furniture",
        "Maintenance",
        "Laundry",
        "Mortgage"
      ]
    },
    {
      "id": "house-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"clothes that need washing\"?",
      "answer": "Laundry",
      "options": [
        "Kitchen",
        "Appliance",
        "Tenant",
        "Laundry"
      ]
    },
    {
      "id": "house-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"a machine used in the home\"?",
      "answer": "Appliance",
      "options": [
        "Renovate",
        "Household",
        "Appliance",
        "Bedroom"
      ]
    },
    {
      "id": "house-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks house, home & chores yang lebih formal, istilah mana yang paling sesuai dengan: \"to repair or improve a building\"?",
      "answer": "Renovate",
      "options": [
        "Maintenance",
        "Renovate",
        "Furniture",
        "Mortgage"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik13Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik13"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
