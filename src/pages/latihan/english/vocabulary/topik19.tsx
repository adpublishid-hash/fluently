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
  "id": "animals",
  "title": "Animals & Wildlife",
  "description": "Kosakata hewan, habitat, dan alam liar.",
  "topicNumber": 19,
  "terms": [
    {
      "word": "Pet",
      "meaning": "an animal kept at home"
    },
    {
      "word": "Bird",
      "meaning": "an animal with feathers and wings"
    },
    {
      "word": "Predator",
      "meaning": "an animal that hunts other animals"
    },
    {
      "word": "Prey",
      "meaning": "an animal hunted by another animal"
    },
    {
      "word": "Species",
      "meaning": "a group of similar living things"
    },
    {
      "word": "Habitat",
      "meaning": "the natural home of an animal"
    },
    {
      "word": "Migration",
      "meaning": "movement of animals from one area to another"
    },
    {
      "word": "Extinct",
      "meaning": "no longer existing as a species"
    },
    {
      "word": "Conservation",
      "meaning": "protecting wildlife and nature"
    },
    {
      "word": "Nocturnal",
      "meaning": "active at night"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "animals-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"an animal kept at home\"?",
      "answer": "Pet",
      "options": [
        "Pet",
        "Prey",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"an animal with feathers and wings\"?",
      "answer": "Bird",
      "options": [
        "Species",
        "Extinct",
        "Pet",
        "Bird"
      ]
    },
    {
      "id": "animals-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"an animal that hunts other animals\"?",
      "answer": "Predator",
      "options": [
        "Conservation",
        "Bird",
        "Predator",
        "Habitat"
      ]
    },
    {
      "id": "animals-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"an animal hunted by another animal\"?",
      "answer": "Prey",
      "options": [
        "Predator",
        "Prey",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a group of similar living things\"?",
      "answer": "Species",
      "options": [
        "Species",
        "Extinct",
        "Pet",
        "Prey"
      ]
    },
    {
      "id": "animals-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"the natural home of an animal\"?",
      "answer": "Habitat",
      "options": [
        "Conservation",
        "Bird",
        "Species",
        "Habitat"
      ]
    },
    {
      "id": "animals-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"movement of animals from one area to another\"?",
      "answer": "Migration",
      "options": [
        "Predator",
        "Habitat",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"no longer existing as a species\"?",
      "answer": "Extinct",
      "options": [
        "Migration",
        "Extinct",
        "Pet",
        "Prey"
      ]
    },
    {
      "id": "animals-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"protecting wildlife and nature\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Bird",
        "Species",
        "Extinct"
      ]
    },
    {
      "id": "animals-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"active at night\"?",
      "answer": "Nocturnal",
      "options": [
        "Predator",
        "Habitat",
        "Conservation",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"an animal hunted by another animal\".",
      "answer": "Prey",
      "options": [
        "Predator",
        "Migration",
        "Nocturnal",
        "Prey"
      ]
    },
    {
      "id": "animals-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"a group of similar living things\".",
      "answer": "Species",
      "options": [
        "Extinct",
        "Pet",
        "Species",
        "Prey"
      ]
    },
    {
      "id": "animals-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"the natural home of an animal\".",
      "answer": "Habitat",
      "options": [
        "Bird",
        "Habitat",
        "Species",
        "Conservation"
      ]
    },
    {
      "id": "animals-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"movement of animals from one area to another\".",
      "answer": "Migration",
      "options": [
        "Migration",
        "Habitat",
        "Nocturnal",
        "Predator"
      ]
    },
    {
      "id": "animals-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"no longer existing as a species\".",
      "answer": "Extinct",
      "options": [
        "Migration",
        "Pet",
        "Prey",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"protecting wildlife and nature\".",
      "answer": "Conservation",
      "options": [
        "Bird",
        "Species",
        "Conservation",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"active at night\".",
      "answer": "Nocturnal",
      "options": [
        "Habitat",
        "Nocturnal",
        "Conservation",
        "Predator"
      ]
    },
    {
      "id": "animals-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"an animal kept at home\".",
      "answer": "Pet",
      "options": [
        "Pet",
        "Bird",
        "Species",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"an animal with feathers and wings\".",
      "answer": "Bird",
      "options": [
        "Predator",
        "Habitat",
        "Conservation",
        "Bird"
      ]
    },
    {
      "id": "animals-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Animals & Wildlife: \"an animal that hunts other animals\".",
      "answer": "Predator",
      "options": [
        "Migration",
        "Nocturnal",
        "Predator",
        "Prey"
      ]
    },
    {
      "id": "animals-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"movement of animals from one area to another\"?",
      "answer": "Migration",
      "options": [
        "Habitat",
        "Nocturnal",
        "Migration",
        "Predator"
      ]
    },
    {
      "id": "animals-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"no longer existing as a species\"?",
      "answer": "Extinct",
      "options": [
        "Pet",
        "Extinct",
        "Prey",
        "Migration"
      ]
    },
    {
      "id": "animals-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"protecting wildlife and nature\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Species",
        "Extinct",
        "Bird"
      ]
    },
    {
      "id": "animals-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"active at night\"?",
      "answer": "Nocturnal",
      "options": [
        "Habitat",
        "Conservation",
        "Predator",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"an animal kept at home\"?",
      "answer": "Pet",
      "options": [
        "Bird",
        "Species",
        "Pet",
        "Extinct"
      ]
    },
    {
      "id": "animals-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"an animal with feathers and wings\"?",
      "answer": "Bird",
      "options": [
        "Habitat",
        "Bird",
        "Conservation",
        "Predator"
      ]
    },
    {
      "id": "animals-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"an animal that hunts other animals\"?",
      "answer": "Predator",
      "options": [
        "Predator",
        "Nocturnal",
        "Prey",
        "Migration"
      ]
    },
    {
      "id": "animals-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"an animal hunted by another animal\"?",
      "answer": "Prey",
      "options": [
        "Pet",
        "Species",
        "Extinct",
        "Prey"
      ]
    },
    {
      "id": "animals-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"a group of similar living things\"?",
      "answer": "Species",
      "options": [
        "Habitat",
        "Conservation",
        "Species",
        "Bird"
      ]
    },
    {
      "id": "animals-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal animals & wildlife context, which term best matches: \"the natural home of an animal\"?",
      "answer": "Habitat",
      "options": [
        "Nocturnal",
        "Habitat",
        "Predator",
        "Migration"
      ]
    }
  ],
  "id": [
    {
      "id": "animals-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an animal kept at home\"?",
      "answer": "Pet",
      "options": [
        "Pet",
        "Prey",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an animal with feathers and wings\"?",
      "answer": "Bird",
      "options": [
        "Species",
        "Extinct",
        "Pet",
        "Bird"
      ]
    },
    {
      "id": "animals-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an animal that hunts other animals\"?",
      "answer": "Predator",
      "options": [
        "Conservation",
        "Bird",
        "Predator",
        "Habitat"
      ]
    },
    {
      "id": "animals-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an animal hunted by another animal\"?",
      "answer": "Prey",
      "options": [
        "Predator",
        "Prey",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a group of similar living things\"?",
      "answer": "Species",
      "options": [
        "Species",
        "Extinct",
        "Pet",
        "Prey"
      ]
    },
    {
      "id": "animals-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the natural home of an animal\"?",
      "answer": "Habitat",
      "options": [
        "Conservation",
        "Bird",
        "Species",
        "Habitat"
      ]
    },
    {
      "id": "animals-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"movement of animals from one area to another\"?",
      "answer": "Migration",
      "options": [
        "Predator",
        "Habitat",
        "Migration",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"no longer existing as a species\"?",
      "answer": "Extinct",
      "options": [
        "Migration",
        "Extinct",
        "Pet",
        "Prey"
      ]
    },
    {
      "id": "animals-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"protecting wildlife and nature\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Bird",
        "Species",
        "Extinct"
      ]
    },
    {
      "id": "animals-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"active at night\"?",
      "answer": "Nocturnal",
      "options": [
        "Predator",
        "Habitat",
        "Conservation",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"an animal hunted by another animal\".",
      "answer": "Prey",
      "options": [
        "Predator",
        "Migration",
        "Nocturnal",
        "Prey"
      ]
    },
    {
      "id": "animals-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"a group of similar living things\".",
      "answer": "Species",
      "options": [
        "Extinct",
        "Pet",
        "Species",
        "Prey"
      ]
    },
    {
      "id": "animals-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"the natural home of an animal\".",
      "answer": "Habitat",
      "options": [
        "Bird",
        "Habitat",
        "Species",
        "Conservation"
      ]
    },
    {
      "id": "animals-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"movement of animals from one area to another\".",
      "answer": "Migration",
      "options": [
        "Migration",
        "Habitat",
        "Nocturnal",
        "Predator"
      ]
    },
    {
      "id": "animals-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"no longer existing as a species\".",
      "answer": "Extinct",
      "options": [
        "Migration",
        "Pet",
        "Prey",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"protecting wildlife and nature\".",
      "answer": "Conservation",
      "options": [
        "Bird",
        "Species",
        "Conservation",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"active at night\".",
      "answer": "Nocturnal",
      "options": [
        "Habitat",
        "Nocturnal",
        "Conservation",
        "Predator"
      ]
    },
    {
      "id": "animals-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"an animal kept at home\".",
      "answer": "Pet",
      "options": [
        "Pet",
        "Bird",
        "Species",
        "Extinct"
      ]
    },
    {
      "id": "animals-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"an animal with feathers and wings\".",
      "answer": "Bird",
      "options": [
        "Predator",
        "Habitat",
        "Conservation",
        "Bird"
      ]
    },
    {
      "id": "animals-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Animals & Wildlife: \"an animal that hunts other animals\".",
      "answer": "Predator",
      "options": [
        "Migration",
        "Nocturnal",
        "Predator",
        "Prey"
      ]
    },
    {
      "id": "animals-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"movement of animals from one area to another\"?",
      "answer": "Migration",
      "options": [
        "Habitat",
        "Nocturnal",
        "Migration",
        "Predator"
      ]
    },
    {
      "id": "animals-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"no longer existing as a species\"?",
      "answer": "Extinct",
      "options": [
        "Pet",
        "Extinct",
        "Prey",
        "Migration"
      ]
    },
    {
      "id": "animals-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"protecting wildlife and nature\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Species",
        "Extinct",
        "Bird"
      ]
    },
    {
      "id": "animals-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"active at night\"?",
      "answer": "Nocturnal",
      "options": [
        "Habitat",
        "Conservation",
        "Predator",
        "Nocturnal"
      ]
    },
    {
      "id": "animals-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"an animal kept at home\"?",
      "answer": "Pet",
      "options": [
        "Bird",
        "Species",
        "Pet",
        "Extinct"
      ]
    },
    {
      "id": "animals-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"an animal with feathers and wings\"?",
      "answer": "Bird",
      "options": [
        "Habitat",
        "Bird",
        "Conservation",
        "Predator"
      ]
    },
    {
      "id": "animals-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"an animal that hunts other animals\"?",
      "answer": "Predator",
      "options": [
        "Predator",
        "Nocturnal",
        "Prey",
        "Migration"
      ]
    },
    {
      "id": "animals-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"an animal hunted by another animal\"?",
      "answer": "Prey",
      "options": [
        "Pet",
        "Species",
        "Extinct",
        "Prey"
      ]
    },
    {
      "id": "animals-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"a group of similar living things\"?",
      "answer": "Species",
      "options": [
        "Habitat",
        "Conservation",
        "Species",
        "Bird"
      ]
    },
    {
      "id": "animals-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks animals & wildlife yang lebih formal, istilah mana yang paling sesuai dengan: \"the natural home of an animal\"?",
      "answer": "Habitat",
      "options": [
        "Nocturnal",
        "Habitat",
        "Predator",
        "Migration"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik19Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik19"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
