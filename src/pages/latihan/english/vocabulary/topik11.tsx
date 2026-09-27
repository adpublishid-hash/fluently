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
  "id": "weather",
  "title": "Weather & Climate",
  "description": "Kosakata tentang cuaca, musim, dan iklim.",
  "topicNumber": 11,
  "terms": [
    {
      "word": "Cloudy",
      "meaning": "covered with clouds"
    },
    {
      "word": "Rainfall",
      "meaning": "the amount of rain that falls"
    },
    {
      "word": "Storm",
      "meaning": "violent weather with wind or rain"
    },
    {
      "word": "Forecast",
      "meaning": "a prediction about future weather"
    },
    {
      "word": "Humidity",
      "meaning": "the amount of water in the air"
    },
    {
      "word": "Temperature",
      "meaning": "how hot or cold something is"
    },
    {
      "word": "Drought",
      "meaning": "a long period with little rain"
    },
    {
      "word": "Climate",
      "meaning": "typical weather in a place over time"
    },
    {
      "word": "Heatwave",
      "meaning": "a period of unusually hot weather"
    },
    {
      "word": "Precipitation",
      "meaning": "rain, snow, or hail falling from the sky"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "weather-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"covered with clouds\"?",
      "answer": "Cloudy",
      "options": [
        "Cloudy",
        "Forecast",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"the amount of rain that falls\"?",
      "answer": "Rainfall",
      "options": [
        "Humidity",
        "Climate",
        "Cloudy",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"violent weather with wind or rain\"?",
      "answer": "Storm",
      "options": [
        "Heatwave",
        "Rainfall",
        "Storm",
        "Temperature"
      ]
    },
    {
      "id": "weather-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a prediction about future weather\"?",
      "answer": "Forecast",
      "options": [
        "Storm",
        "Forecast",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"the amount of water in the air\"?",
      "answer": "Humidity",
      "options": [
        "Humidity",
        "Climate",
        "Cloudy",
        "Forecast"
      ]
    },
    {
      "id": "weather-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"how hot or cold something is\"?",
      "answer": "Temperature",
      "options": [
        "Heatwave",
        "Rainfall",
        "Humidity",
        "Temperature"
      ]
    },
    {
      "id": "weather-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a long period with little rain\"?",
      "answer": "Drought",
      "options": [
        "Storm",
        "Temperature",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"typical weather in a place over time\"?",
      "answer": "Climate",
      "options": [
        "Drought",
        "Climate",
        "Cloudy",
        "Forecast"
      ]
    },
    {
      "id": "weather-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a period of unusually hot weather\"?",
      "answer": "Heatwave",
      "options": [
        "Heatwave",
        "Rainfall",
        "Humidity",
        "Climate"
      ]
    },
    {
      "id": "weather-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"rain, snow, or hail falling from the sky\"?",
      "answer": "Precipitation",
      "options": [
        "Storm",
        "Temperature",
        "Heatwave",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"a prediction about future weather\".",
      "answer": "Forecast",
      "options": [
        "Storm",
        "Drought",
        "Precipitation",
        "Forecast"
      ]
    },
    {
      "id": "weather-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"the amount of water in the air\".",
      "answer": "Humidity",
      "options": [
        "Climate",
        "Cloudy",
        "Humidity",
        "Forecast"
      ]
    },
    {
      "id": "weather-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"how hot or cold something is\".",
      "answer": "Temperature",
      "options": [
        "Rainfall",
        "Temperature",
        "Humidity",
        "Heatwave"
      ]
    },
    {
      "id": "weather-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"a long period with little rain\".",
      "answer": "Drought",
      "options": [
        "Drought",
        "Temperature",
        "Precipitation",
        "Storm"
      ]
    },
    {
      "id": "weather-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"typical weather in a place over time\".",
      "answer": "Climate",
      "options": [
        "Drought",
        "Cloudy",
        "Forecast",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"a period of unusually hot weather\".",
      "answer": "Heatwave",
      "options": [
        "Rainfall",
        "Humidity",
        "Heatwave",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"rain, snow, or hail falling from the sky\".",
      "answer": "Precipitation",
      "options": [
        "Temperature",
        "Precipitation",
        "Heatwave",
        "Storm"
      ]
    },
    {
      "id": "weather-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"covered with clouds\".",
      "answer": "Cloudy",
      "options": [
        "Cloudy",
        "Rainfall",
        "Humidity",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"the amount of rain that falls\".",
      "answer": "Rainfall",
      "options": [
        "Storm",
        "Temperature",
        "Heatwave",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Weather & Climate: \"violent weather with wind or rain\".",
      "answer": "Storm",
      "options": [
        "Drought",
        "Precipitation",
        "Storm",
        "Forecast"
      ]
    },
    {
      "id": "weather-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"a long period with little rain\"?",
      "answer": "Drought",
      "options": [
        "Temperature",
        "Precipitation",
        "Drought",
        "Storm"
      ]
    },
    {
      "id": "weather-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"typical weather in a place over time\"?",
      "answer": "Climate",
      "options": [
        "Cloudy",
        "Climate",
        "Forecast",
        "Drought"
      ]
    },
    {
      "id": "weather-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"a period of unusually hot weather\"?",
      "answer": "Heatwave",
      "options": [
        "Heatwave",
        "Humidity",
        "Climate",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"rain, snow, or hail falling from the sky\"?",
      "answer": "Precipitation",
      "options": [
        "Temperature",
        "Heatwave",
        "Storm",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"covered with clouds\"?",
      "answer": "Cloudy",
      "options": [
        "Rainfall",
        "Humidity",
        "Cloudy",
        "Climate"
      ]
    },
    {
      "id": "weather-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"the amount of rain that falls\"?",
      "answer": "Rainfall",
      "options": [
        "Temperature",
        "Rainfall",
        "Heatwave",
        "Storm"
      ]
    },
    {
      "id": "weather-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"violent weather with wind or rain\"?",
      "answer": "Storm",
      "options": [
        "Storm",
        "Precipitation",
        "Forecast",
        "Drought"
      ]
    },
    {
      "id": "weather-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"a prediction about future weather\"?",
      "answer": "Forecast",
      "options": [
        "Cloudy",
        "Humidity",
        "Climate",
        "Forecast"
      ]
    },
    {
      "id": "weather-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"the amount of water in the air\"?",
      "answer": "Humidity",
      "options": [
        "Temperature",
        "Heatwave",
        "Humidity",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal weather & climate context, which term best matches: \"how hot or cold something is\"?",
      "answer": "Temperature",
      "options": [
        "Precipitation",
        "Temperature",
        "Storm",
        "Drought"
      ]
    }
  ],
  "id": [
    {
      "id": "weather-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"covered with clouds\"?",
      "answer": "Cloudy",
      "options": [
        "Cloudy",
        "Forecast",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the amount of rain that falls\"?",
      "answer": "Rainfall",
      "options": [
        "Humidity",
        "Climate",
        "Cloudy",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"violent weather with wind or rain\"?",
      "answer": "Storm",
      "options": [
        "Heatwave",
        "Rainfall",
        "Storm",
        "Temperature"
      ]
    },
    {
      "id": "weather-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a prediction about future weather\"?",
      "answer": "Forecast",
      "options": [
        "Storm",
        "Forecast",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the amount of water in the air\"?",
      "answer": "Humidity",
      "options": [
        "Humidity",
        "Climate",
        "Cloudy",
        "Forecast"
      ]
    },
    {
      "id": "weather-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"how hot or cold something is\"?",
      "answer": "Temperature",
      "options": [
        "Heatwave",
        "Rainfall",
        "Humidity",
        "Temperature"
      ]
    },
    {
      "id": "weather-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a long period with little rain\"?",
      "answer": "Drought",
      "options": [
        "Storm",
        "Temperature",
        "Drought",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"typical weather in a place over time\"?",
      "answer": "Climate",
      "options": [
        "Drought",
        "Climate",
        "Cloudy",
        "Forecast"
      ]
    },
    {
      "id": "weather-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a period of unusually hot weather\"?",
      "answer": "Heatwave",
      "options": [
        "Heatwave",
        "Rainfall",
        "Humidity",
        "Climate"
      ]
    },
    {
      "id": "weather-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"rain, snow, or hail falling from the sky\"?",
      "answer": "Precipitation",
      "options": [
        "Storm",
        "Temperature",
        "Heatwave",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"a prediction about future weather\".",
      "answer": "Forecast",
      "options": [
        "Storm",
        "Drought",
        "Precipitation",
        "Forecast"
      ]
    },
    {
      "id": "weather-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"the amount of water in the air\".",
      "answer": "Humidity",
      "options": [
        "Climate",
        "Cloudy",
        "Humidity",
        "Forecast"
      ]
    },
    {
      "id": "weather-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"how hot or cold something is\".",
      "answer": "Temperature",
      "options": [
        "Rainfall",
        "Temperature",
        "Humidity",
        "Heatwave"
      ]
    },
    {
      "id": "weather-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"a long period with little rain\".",
      "answer": "Drought",
      "options": [
        "Drought",
        "Temperature",
        "Precipitation",
        "Storm"
      ]
    },
    {
      "id": "weather-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"typical weather in a place over time\".",
      "answer": "Climate",
      "options": [
        "Drought",
        "Cloudy",
        "Forecast",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"a period of unusually hot weather\".",
      "answer": "Heatwave",
      "options": [
        "Rainfall",
        "Humidity",
        "Heatwave",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"rain, snow, or hail falling from the sky\".",
      "answer": "Precipitation",
      "options": [
        "Temperature",
        "Precipitation",
        "Heatwave",
        "Storm"
      ]
    },
    {
      "id": "weather-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"covered with clouds\".",
      "answer": "Cloudy",
      "options": [
        "Cloudy",
        "Rainfall",
        "Humidity",
        "Climate"
      ]
    },
    {
      "id": "weather-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"the amount of rain that falls\".",
      "answer": "Rainfall",
      "options": [
        "Storm",
        "Temperature",
        "Heatwave",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Weather & Climate: \"violent weather with wind or rain\".",
      "answer": "Storm",
      "options": [
        "Drought",
        "Precipitation",
        "Storm",
        "Forecast"
      ]
    },
    {
      "id": "weather-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"a long period with little rain\"?",
      "answer": "Drought",
      "options": [
        "Temperature",
        "Precipitation",
        "Drought",
        "Storm"
      ]
    },
    {
      "id": "weather-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"typical weather in a place over time\"?",
      "answer": "Climate",
      "options": [
        "Cloudy",
        "Climate",
        "Forecast",
        "Drought"
      ]
    },
    {
      "id": "weather-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"a period of unusually hot weather\"?",
      "answer": "Heatwave",
      "options": [
        "Heatwave",
        "Humidity",
        "Climate",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"rain, snow, or hail falling from the sky\"?",
      "answer": "Precipitation",
      "options": [
        "Temperature",
        "Heatwave",
        "Storm",
        "Precipitation"
      ]
    },
    {
      "id": "weather-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"covered with clouds\"?",
      "answer": "Cloudy",
      "options": [
        "Rainfall",
        "Humidity",
        "Cloudy",
        "Climate"
      ]
    },
    {
      "id": "weather-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"the amount of rain that falls\"?",
      "answer": "Rainfall",
      "options": [
        "Temperature",
        "Rainfall",
        "Heatwave",
        "Storm"
      ]
    },
    {
      "id": "weather-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"violent weather with wind or rain\"?",
      "answer": "Storm",
      "options": [
        "Storm",
        "Precipitation",
        "Forecast",
        "Drought"
      ]
    },
    {
      "id": "weather-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"a prediction about future weather\"?",
      "answer": "Forecast",
      "options": [
        "Cloudy",
        "Humidity",
        "Climate",
        "Forecast"
      ]
    },
    {
      "id": "weather-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"the amount of water in the air\"?",
      "answer": "Humidity",
      "options": [
        "Temperature",
        "Heatwave",
        "Humidity",
        "Rainfall"
      ]
    },
    {
      "id": "weather-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks weather & climate yang lebih formal, istilah mana yang paling sesuai dengan: \"how hot or cold something is\"?",
      "answer": "Temperature",
      "options": [
        "Precipitation",
        "Temperature",
        "Storm",
        "Drought"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik11Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik11"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
