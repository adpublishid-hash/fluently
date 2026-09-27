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
  "id": "sports",
  "title": "Sports & Fitness",
  "description": "Kosakata olahraga, pertandingan, dan kebugaran.",
  "topicNumber": 14,
  "terms": [
    {
      "word": "Team",
      "meaning": "a group playing together"
    },
    {
      "word": "Coach",
      "meaning": "a person who trains athletes"
    },
    {
      "word": "Match",
      "meaning": "a sports competition"
    },
    {
      "word": "Score",
      "meaning": "points gained in a game"
    },
    {
      "word": "Tournament",
      "meaning": "a series of competitions"
    },
    {
      "word": "Fitness",
      "meaning": "physical health and strength"
    },
    {
      "word": "Endurance",
      "meaning": "the ability to continue for a long time"
    },
    {
      "word": "Referee",
      "meaning": "a person who enforces rules in a game"
    },
    {
      "word": "Stamina",
      "meaning": "energy to keep doing physical activity"
    },
    {
      "word": "Championship",
      "meaning": "a competition to decide the best player or team"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "sports-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a group playing together\"?",
      "answer": "Team",
      "options": [
        "Team",
        "Score",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a person who trains athletes\"?",
      "answer": "Coach",
      "options": [
        "Tournament",
        "Referee",
        "Team",
        "Coach"
      ]
    },
    {
      "id": "sports-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a sports competition\"?",
      "answer": "Match",
      "options": [
        "Stamina",
        "Coach",
        "Match",
        "Fitness"
      ]
    },
    {
      "id": "sports-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"points gained in a game\"?",
      "answer": "Score",
      "options": [
        "Match",
        "Score",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a series of competitions\"?",
      "answer": "Tournament",
      "options": [
        "Tournament",
        "Referee",
        "Team",
        "Score"
      ]
    },
    {
      "id": "sports-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"physical health and strength\"?",
      "answer": "Fitness",
      "options": [
        "Stamina",
        "Coach",
        "Tournament",
        "Fitness"
      ]
    },
    {
      "id": "sports-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"the ability to continue for a long time\"?",
      "answer": "Endurance",
      "options": [
        "Match",
        "Fitness",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a person who enforces rules in a game\"?",
      "answer": "Referee",
      "options": [
        "Endurance",
        "Referee",
        "Team",
        "Score"
      ]
    },
    {
      "id": "sports-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"energy to keep doing physical activity\"?",
      "answer": "Stamina",
      "options": [
        "Stamina",
        "Coach",
        "Tournament",
        "Referee"
      ]
    },
    {
      "id": "sports-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a competition to decide the best player or team\"?",
      "answer": "Championship",
      "options": [
        "Match",
        "Fitness",
        "Stamina",
        "Championship"
      ]
    },
    {
      "id": "sports-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"points gained in a game\".",
      "answer": "Score",
      "options": [
        "Match",
        "Endurance",
        "Championship",
        "Score"
      ]
    },
    {
      "id": "sports-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a series of competitions\".",
      "answer": "Tournament",
      "options": [
        "Referee",
        "Team",
        "Tournament",
        "Score"
      ]
    },
    {
      "id": "sports-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"physical health and strength\".",
      "answer": "Fitness",
      "options": [
        "Coach",
        "Fitness",
        "Tournament",
        "Stamina"
      ]
    },
    {
      "id": "sports-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"the ability to continue for a long time\".",
      "answer": "Endurance",
      "options": [
        "Endurance",
        "Fitness",
        "Championship",
        "Match"
      ]
    },
    {
      "id": "sports-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a person who enforces rules in a game\".",
      "answer": "Referee",
      "options": [
        "Endurance",
        "Team",
        "Score",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"energy to keep doing physical activity\".",
      "answer": "Stamina",
      "options": [
        "Coach",
        "Tournament",
        "Stamina",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a competition to decide the best player or team\".",
      "answer": "Championship",
      "options": [
        "Fitness",
        "Championship",
        "Stamina",
        "Match"
      ]
    },
    {
      "id": "sports-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a group playing together\".",
      "answer": "Team",
      "options": [
        "Team",
        "Coach",
        "Tournament",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a person who trains athletes\".",
      "answer": "Coach",
      "options": [
        "Match",
        "Fitness",
        "Stamina",
        "Coach"
      ]
    },
    {
      "id": "sports-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Sports & Fitness: \"a sports competition\".",
      "answer": "Match",
      "options": [
        "Endurance",
        "Championship",
        "Match",
        "Score"
      ]
    },
    {
      "id": "sports-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"the ability to continue for a long time\"?",
      "answer": "Endurance",
      "options": [
        "Fitness",
        "Championship",
        "Endurance",
        "Match"
      ]
    },
    {
      "id": "sports-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a person who enforces rules in a game\"?",
      "answer": "Referee",
      "options": [
        "Team",
        "Referee",
        "Score",
        "Endurance"
      ]
    },
    {
      "id": "sports-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"energy to keep doing physical activity\"?",
      "answer": "Stamina",
      "options": [
        "Stamina",
        "Tournament",
        "Referee",
        "Coach"
      ]
    },
    {
      "id": "sports-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a competition to decide the best player or team\"?",
      "answer": "Championship",
      "options": [
        "Fitness",
        "Stamina",
        "Match",
        "Championship"
      ]
    },
    {
      "id": "sports-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a group playing together\"?",
      "answer": "Team",
      "options": [
        "Coach",
        "Tournament",
        "Team",
        "Referee"
      ]
    },
    {
      "id": "sports-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a person who trains athletes\"?",
      "answer": "Coach",
      "options": [
        "Fitness",
        "Coach",
        "Stamina",
        "Match"
      ]
    },
    {
      "id": "sports-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a sports competition\"?",
      "answer": "Match",
      "options": [
        "Match",
        "Championship",
        "Score",
        "Endurance"
      ]
    },
    {
      "id": "sports-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"points gained in a game\"?",
      "answer": "Score",
      "options": [
        "Team",
        "Tournament",
        "Referee",
        "Score"
      ]
    },
    {
      "id": "sports-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"a series of competitions\"?",
      "answer": "Tournament",
      "options": [
        "Fitness",
        "Stamina",
        "Tournament",
        "Coach"
      ]
    },
    {
      "id": "sports-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal sports & fitness context, which term best matches: \"physical health and strength\"?",
      "answer": "Fitness",
      "options": [
        "Championship",
        "Fitness",
        "Match",
        "Endurance"
      ]
    }
  ],
  "id": [
    {
      "id": "sports-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a group playing together\"?",
      "answer": "Team",
      "options": [
        "Team",
        "Score",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who trains athletes\"?",
      "answer": "Coach",
      "options": [
        "Tournament",
        "Referee",
        "Team",
        "Coach"
      ]
    },
    {
      "id": "sports-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a sports competition\"?",
      "answer": "Match",
      "options": [
        "Stamina",
        "Coach",
        "Match",
        "Fitness"
      ]
    },
    {
      "id": "sports-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"points gained in a game\"?",
      "answer": "Score",
      "options": [
        "Match",
        "Score",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a series of competitions\"?",
      "answer": "Tournament",
      "options": [
        "Tournament",
        "Referee",
        "Team",
        "Score"
      ]
    },
    {
      "id": "sports-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"physical health and strength\"?",
      "answer": "Fitness",
      "options": [
        "Stamina",
        "Coach",
        "Tournament",
        "Fitness"
      ]
    },
    {
      "id": "sports-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the ability to continue for a long time\"?",
      "answer": "Endurance",
      "options": [
        "Match",
        "Fitness",
        "Endurance",
        "Championship"
      ]
    },
    {
      "id": "sports-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who enforces rules in a game\"?",
      "answer": "Referee",
      "options": [
        "Endurance",
        "Referee",
        "Team",
        "Score"
      ]
    },
    {
      "id": "sports-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"energy to keep doing physical activity\"?",
      "answer": "Stamina",
      "options": [
        "Stamina",
        "Coach",
        "Tournament",
        "Referee"
      ]
    },
    {
      "id": "sports-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a competition to decide the best player or team\"?",
      "answer": "Championship",
      "options": [
        "Match",
        "Fitness",
        "Stamina",
        "Championship"
      ]
    },
    {
      "id": "sports-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"points gained in a game\".",
      "answer": "Score",
      "options": [
        "Match",
        "Endurance",
        "Championship",
        "Score"
      ]
    },
    {
      "id": "sports-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a series of competitions\".",
      "answer": "Tournament",
      "options": [
        "Referee",
        "Team",
        "Tournament",
        "Score"
      ]
    },
    {
      "id": "sports-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"physical health and strength\".",
      "answer": "Fitness",
      "options": [
        "Coach",
        "Fitness",
        "Tournament",
        "Stamina"
      ]
    },
    {
      "id": "sports-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"the ability to continue for a long time\".",
      "answer": "Endurance",
      "options": [
        "Endurance",
        "Fitness",
        "Championship",
        "Match"
      ]
    },
    {
      "id": "sports-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a person who enforces rules in a game\".",
      "answer": "Referee",
      "options": [
        "Endurance",
        "Team",
        "Score",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"energy to keep doing physical activity\".",
      "answer": "Stamina",
      "options": [
        "Coach",
        "Tournament",
        "Stamina",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a competition to decide the best player or team\".",
      "answer": "Championship",
      "options": [
        "Fitness",
        "Championship",
        "Stamina",
        "Match"
      ]
    },
    {
      "id": "sports-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a group playing together\".",
      "answer": "Team",
      "options": [
        "Team",
        "Coach",
        "Tournament",
        "Referee"
      ]
    },
    {
      "id": "sports-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a person who trains athletes\".",
      "answer": "Coach",
      "options": [
        "Match",
        "Fitness",
        "Stamina",
        "Coach"
      ]
    },
    {
      "id": "sports-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Sports & Fitness: \"a sports competition\".",
      "answer": "Match",
      "options": [
        "Endurance",
        "Championship",
        "Match",
        "Score"
      ]
    },
    {
      "id": "sports-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"the ability to continue for a long time\"?",
      "answer": "Endurance",
      "options": [
        "Fitness",
        "Championship",
        "Endurance",
        "Match"
      ]
    },
    {
      "id": "sports-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who enforces rules in a game\"?",
      "answer": "Referee",
      "options": [
        "Team",
        "Referee",
        "Score",
        "Endurance"
      ]
    },
    {
      "id": "sports-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"energy to keep doing physical activity\"?",
      "answer": "Stamina",
      "options": [
        "Stamina",
        "Tournament",
        "Referee",
        "Coach"
      ]
    },
    {
      "id": "sports-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a competition to decide the best player or team\"?",
      "answer": "Championship",
      "options": [
        "Fitness",
        "Stamina",
        "Match",
        "Championship"
      ]
    },
    {
      "id": "sports-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a group playing together\"?",
      "answer": "Team",
      "options": [
        "Coach",
        "Tournament",
        "Team",
        "Referee"
      ]
    },
    {
      "id": "sports-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who trains athletes\"?",
      "answer": "Coach",
      "options": [
        "Fitness",
        "Coach",
        "Stamina",
        "Match"
      ]
    },
    {
      "id": "sports-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a sports competition\"?",
      "answer": "Match",
      "options": [
        "Match",
        "Championship",
        "Score",
        "Endurance"
      ]
    },
    {
      "id": "sports-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"points gained in a game\"?",
      "answer": "Score",
      "options": [
        "Team",
        "Tournament",
        "Referee",
        "Score"
      ]
    },
    {
      "id": "sports-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"a series of competitions\"?",
      "answer": "Tournament",
      "options": [
        "Fitness",
        "Stamina",
        "Tournament",
        "Coach"
      ]
    },
    {
      "id": "sports-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks sports & fitness yang lebih formal, istilah mana yang paling sesuai dengan: \"physical health and strength\"?",
      "answer": "Fitness",
      "options": [
        "Championship",
        "Fitness",
        "Match",
        "Endurance"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik14Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik14"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
