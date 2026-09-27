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
  "id": "environment",
  "title": "Environment & Nature",
  "description": "Kosakata alam, cuaca, lingkungan, dan energi.",
  "topicNumber": 10,
  "terms": [
    {
      "word": "Forest",
      "meaning": "a large area with many trees"
    },
    {
      "word": "Pollution",
      "meaning": "harmful substances in air, water, or soil"
    },
    {
      "word": "Recycle",
      "meaning": "to use waste materials again"
    },
    {
      "word": "Wildlife",
      "meaning": "animals living in nature"
    },
    {
      "word": "Conservation",
      "meaning": "protecting nature and resources"
    },
    {
      "word": "Ecosystem",
      "meaning": "living things and their environment"
    },
    {
      "word": "Renewable",
      "meaning": "able to be naturally replaced"
    },
    {
      "word": "Habitat",
      "meaning": "the natural home of an animal or plant"
    },
    {
      "word": "Biodiversity",
      "meaning": "the variety of living things"
    },
    {
      "word": "Sustainability",
      "meaning": "using resources without harming the future"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "environment-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a large area with many trees\"?",
      "answer": "Forest",
      "options": [
        "Forest",
        "Wildlife",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"harmful substances in air, water, or soil\"?",
      "answer": "Pollution",
      "options": [
        "Conservation",
        "Habitat",
        "Forest",
        "Pollution"
      ]
    },
    {
      "id": "environment-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"to use waste materials again\"?",
      "answer": "Recycle",
      "options": [
        "Biodiversity",
        "Pollution",
        "Recycle",
        "Ecosystem"
      ]
    },
    {
      "id": "environment-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"animals living in nature\"?",
      "answer": "Wildlife",
      "options": [
        "Recycle",
        "Wildlife",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"protecting nature and resources\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Habitat",
        "Forest",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"living things and their environment\"?",
      "answer": "Ecosystem",
      "options": [
        "Biodiversity",
        "Pollution",
        "Conservation",
        "Ecosystem"
      ]
    },
    {
      "id": "environment-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"able to be naturally replaced\"?",
      "answer": "Renewable",
      "options": [
        "Recycle",
        "Ecosystem",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"the natural home of an animal or plant\"?",
      "answer": "Habitat",
      "options": [
        "Renewable",
        "Habitat",
        "Forest",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"the variety of living things\"?",
      "answer": "Biodiversity",
      "options": [
        "Biodiversity",
        "Pollution",
        "Conservation",
        "Habitat"
      ]
    },
    {
      "id": "environment-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"using resources without harming the future\"?",
      "answer": "Sustainability",
      "options": [
        "Recycle",
        "Ecosystem",
        "Biodiversity",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"animals living in nature\".",
      "answer": "Wildlife",
      "options": [
        "Recycle",
        "Renewable",
        "Sustainability",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"protecting nature and resources\".",
      "answer": "Conservation",
      "options": [
        "Habitat",
        "Forest",
        "Conservation",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"living things and their environment\".",
      "answer": "Ecosystem",
      "options": [
        "Pollution",
        "Ecosystem",
        "Conservation",
        "Biodiversity"
      ]
    },
    {
      "id": "environment-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"able to be naturally replaced\".",
      "answer": "Renewable",
      "options": [
        "Renewable",
        "Ecosystem",
        "Sustainability",
        "Recycle"
      ]
    },
    {
      "id": "environment-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"the natural home of an animal or plant\".",
      "answer": "Habitat",
      "options": [
        "Renewable",
        "Forest",
        "Wildlife",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"the variety of living things\".",
      "answer": "Biodiversity",
      "options": [
        "Pollution",
        "Conservation",
        "Biodiversity",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"using resources without harming the future\".",
      "answer": "Sustainability",
      "options": [
        "Ecosystem",
        "Sustainability",
        "Biodiversity",
        "Recycle"
      ]
    },
    {
      "id": "environment-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"a large area with many trees\".",
      "answer": "Forest",
      "options": [
        "Forest",
        "Pollution",
        "Conservation",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"harmful substances in air, water, or soil\".",
      "answer": "Pollution",
      "options": [
        "Recycle",
        "Ecosystem",
        "Biodiversity",
        "Pollution"
      ]
    },
    {
      "id": "environment-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Environment & Nature: \"to use waste materials again\".",
      "answer": "Recycle",
      "options": [
        "Renewable",
        "Sustainability",
        "Recycle",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"able to be naturally replaced\"?",
      "answer": "Renewable",
      "options": [
        "Ecosystem",
        "Sustainability",
        "Renewable",
        "Recycle"
      ]
    },
    {
      "id": "environment-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"the natural home of an animal or plant\"?",
      "answer": "Habitat",
      "options": [
        "Forest",
        "Habitat",
        "Wildlife",
        "Renewable"
      ]
    },
    {
      "id": "environment-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"the variety of living things\"?",
      "answer": "Biodiversity",
      "options": [
        "Biodiversity",
        "Conservation",
        "Habitat",
        "Pollution"
      ]
    },
    {
      "id": "environment-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"using resources without harming the future\"?",
      "answer": "Sustainability",
      "options": [
        "Ecosystem",
        "Biodiversity",
        "Recycle",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"a large area with many trees\"?",
      "answer": "Forest",
      "options": [
        "Pollution",
        "Conservation",
        "Forest",
        "Habitat"
      ]
    },
    {
      "id": "environment-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"harmful substances in air, water, or soil\"?",
      "answer": "Pollution",
      "options": [
        "Ecosystem",
        "Pollution",
        "Biodiversity",
        "Recycle"
      ]
    },
    {
      "id": "environment-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"to use waste materials again\"?",
      "answer": "Recycle",
      "options": [
        "Recycle",
        "Sustainability",
        "Wildlife",
        "Renewable"
      ]
    },
    {
      "id": "environment-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"animals living in nature\"?",
      "answer": "Wildlife",
      "options": [
        "Forest",
        "Conservation",
        "Habitat",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"protecting nature and resources\"?",
      "answer": "Conservation",
      "options": [
        "Ecosystem",
        "Biodiversity",
        "Conservation",
        "Pollution"
      ]
    },
    {
      "id": "environment-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal environment & nature context, which term best matches: \"living things and their environment\"?",
      "answer": "Ecosystem",
      "options": [
        "Sustainability",
        "Ecosystem",
        "Recycle",
        "Renewable"
      ]
    }
  ],
  "id": [
    {
      "id": "environment-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a large area with many trees\"?",
      "answer": "Forest",
      "options": [
        "Forest",
        "Wildlife",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"harmful substances in air, water, or soil\"?",
      "answer": "Pollution",
      "options": [
        "Conservation",
        "Habitat",
        "Forest",
        "Pollution"
      ]
    },
    {
      "id": "environment-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to use waste materials again\"?",
      "answer": "Recycle",
      "options": [
        "Biodiversity",
        "Pollution",
        "Recycle",
        "Ecosystem"
      ]
    },
    {
      "id": "environment-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"animals living in nature\"?",
      "answer": "Wildlife",
      "options": [
        "Recycle",
        "Wildlife",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"protecting nature and resources\"?",
      "answer": "Conservation",
      "options": [
        "Conservation",
        "Habitat",
        "Forest",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"living things and their environment\"?",
      "answer": "Ecosystem",
      "options": [
        "Biodiversity",
        "Pollution",
        "Conservation",
        "Ecosystem"
      ]
    },
    {
      "id": "environment-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"able to be naturally replaced\"?",
      "answer": "Renewable",
      "options": [
        "Recycle",
        "Ecosystem",
        "Renewable",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the natural home of an animal or plant\"?",
      "answer": "Habitat",
      "options": [
        "Renewable",
        "Habitat",
        "Forest",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the variety of living things\"?",
      "answer": "Biodiversity",
      "options": [
        "Biodiversity",
        "Pollution",
        "Conservation",
        "Habitat"
      ]
    },
    {
      "id": "environment-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"using resources without harming the future\"?",
      "answer": "Sustainability",
      "options": [
        "Recycle",
        "Ecosystem",
        "Biodiversity",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"animals living in nature\".",
      "answer": "Wildlife",
      "options": [
        "Recycle",
        "Renewable",
        "Sustainability",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"protecting nature and resources\".",
      "answer": "Conservation",
      "options": [
        "Habitat",
        "Forest",
        "Conservation",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"living things and their environment\".",
      "answer": "Ecosystem",
      "options": [
        "Pollution",
        "Ecosystem",
        "Conservation",
        "Biodiversity"
      ]
    },
    {
      "id": "environment-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"able to be naturally replaced\".",
      "answer": "Renewable",
      "options": [
        "Renewable",
        "Ecosystem",
        "Sustainability",
        "Recycle"
      ]
    },
    {
      "id": "environment-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"the natural home of an animal or plant\".",
      "answer": "Habitat",
      "options": [
        "Renewable",
        "Forest",
        "Wildlife",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"the variety of living things\".",
      "answer": "Biodiversity",
      "options": [
        "Pollution",
        "Conservation",
        "Biodiversity",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"using resources without harming the future\".",
      "answer": "Sustainability",
      "options": [
        "Ecosystem",
        "Sustainability",
        "Biodiversity",
        "Recycle"
      ]
    },
    {
      "id": "environment-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"a large area with many trees\".",
      "answer": "Forest",
      "options": [
        "Forest",
        "Pollution",
        "Conservation",
        "Habitat"
      ]
    },
    {
      "id": "environment-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"harmful substances in air, water, or soil\".",
      "answer": "Pollution",
      "options": [
        "Recycle",
        "Ecosystem",
        "Biodiversity",
        "Pollution"
      ]
    },
    {
      "id": "environment-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Environment & Nature: \"to use waste materials again\".",
      "answer": "Recycle",
      "options": [
        "Renewable",
        "Sustainability",
        "Recycle",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"able to be naturally replaced\"?",
      "answer": "Renewable",
      "options": [
        "Ecosystem",
        "Sustainability",
        "Renewable",
        "Recycle"
      ]
    },
    {
      "id": "environment-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"the natural home of an animal or plant\"?",
      "answer": "Habitat",
      "options": [
        "Forest",
        "Habitat",
        "Wildlife",
        "Renewable"
      ]
    },
    {
      "id": "environment-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"the variety of living things\"?",
      "answer": "Biodiversity",
      "options": [
        "Biodiversity",
        "Conservation",
        "Habitat",
        "Pollution"
      ]
    },
    {
      "id": "environment-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"using resources without harming the future\"?",
      "answer": "Sustainability",
      "options": [
        "Ecosystem",
        "Biodiversity",
        "Recycle",
        "Sustainability"
      ]
    },
    {
      "id": "environment-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"a large area with many trees\"?",
      "answer": "Forest",
      "options": [
        "Pollution",
        "Conservation",
        "Forest",
        "Habitat"
      ]
    },
    {
      "id": "environment-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"harmful substances in air, water, or soil\"?",
      "answer": "Pollution",
      "options": [
        "Ecosystem",
        "Pollution",
        "Biodiversity",
        "Recycle"
      ]
    },
    {
      "id": "environment-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"to use waste materials again\"?",
      "answer": "Recycle",
      "options": [
        "Recycle",
        "Sustainability",
        "Wildlife",
        "Renewable"
      ]
    },
    {
      "id": "environment-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"animals living in nature\"?",
      "answer": "Wildlife",
      "options": [
        "Forest",
        "Conservation",
        "Habitat",
        "Wildlife"
      ]
    },
    {
      "id": "environment-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"protecting nature and resources\"?",
      "answer": "Conservation",
      "options": [
        "Ecosystem",
        "Biodiversity",
        "Conservation",
        "Pollution"
      ]
    },
    {
      "id": "environment-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks environment & nature yang lebih formal, istilah mana yang paling sesuai dengan: \"living things and their environment\"?",
      "answer": "Ecosystem",
      "options": [
        "Sustainability",
        "Ecosystem",
        "Recycle",
        "Renewable"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik10Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik10"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
