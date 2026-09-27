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
  "id": "media",
  "title": "Media & Journalism",
  "description": "Kosakata berita, koran, laporan, dan penyiaran.",
  "topicNumber": 17,
  "terms": [
    {
      "word": "News",
      "meaning": "new information about events"
    },
    {
      "word": "Headline",
      "meaning": "the title of a news story"
    },
    {
      "word": "Reporter",
      "meaning": "a person who gathers news"
    },
    {
      "word": "Interview",
      "meaning": "a formal question-and-answer conversation"
    },
    {
      "word": "Broadcast",
      "meaning": "to send a program by TV, radio, or internet"
    },
    {
      "word": "Article",
      "meaning": "a written piece in a newspaper or website"
    },
    {
      "word": "Source",
      "meaning": "where information comes from"
    },
    {
      "word": "Editorial",
      "meaning": "an opinion article from a publication"
    },
    {
      "word": "Censorship",
      "meaning": "control over what can be published"
    },
    {
      "word": "Investigative",
      "meaning": "involving deep research to uncover facts"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "media-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"new information about events\"?",
      "answer": "News",
      "options": [
        "News",
        "Interview",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"the title of a news story\"?",
      "answer": "Headline",
      "options": [
        "Broadcast",
        "Editorial",
        "News",
        "Headline"
      ]
    },
    {
      "id": "media-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a person who gathers news\"?",
      "answer": "Reporter",
      "options": [
        "Censorship",
        "Headline",
        "Reporter",
        "Article"
      ]
    },
    {
      "id": "media-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a formal question-and-answer conversation\"?",
      "answer": "Interview",
      "options": [
        "Reporter",
        "Interview",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"to send a program by TV, radio, or internet\"?",
      "answer": "Broadcast",
      "options": [
        "Broadcast",
        "Editorial",
        "News",
        "Interview"
      ]
    },
    {
      "id": "media-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a written piece in a newspaper or website\"?",
      "answer": "Article",
      "options": [
        "Censorship",
        "Headline",
        "Broadcast",
        "Article"
      ]
    },
    {
      "id": "media-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"where information comes from\"?",
      "answer": "Source",
      "options": [
        "Reporter",
        "Article",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"an opinion article from a publication\"?",
      "answer": "Editorial",
      "options": [
        "Source",
        "Editorial",
        "News",
        "Interview"
      ]
    },
    {
      "id": "media-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"control over what can be published\"?",
      "answer": "Censorship",
      "options": [
        "Censorship",
        "Headline",
        "Broadcast",
        "Editorial"
      ]
    },
    {
      "id": "media-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"involving deep research to uncover facts\"?",
      "answer": "Investigative",
      "options": [
        "Reporter",
        "Article",
        "Censorship",
        "Investigative"
      ]
    },
    {
      "id": "media-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"a formal question-and-answer conversation\".",
      "answer": "Interview",
      "options": [
        "Reporter",
        "Source",
        "Investigative",
        "Interview"
      ]
    },
    {
      "id": "media-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"to send a program by TV, radio, or internet\".",
      "answer": "Broadcast",
      "options": [
        "Editorial",
        "News",
        "Broadcast",
        "Interview"
      ]
    },
    {
      "id": "media-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"a written piece in a newspaper or website\".",
      "answer": "Article",
      "options": [
        "Headline",
        "Article",
        "Broadcast",
        "Censorship"
      ]
    },
    {
      "id": "media-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"where information comes from\".",
      "answer": "Source",
      "options": [
        "Source",
        "Article",
        "Investigative",
        "Reporter"
      ]
    },
    {
      "id": "media-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"an opinion article from a publication\".",
      "answer": "Editorial",
      "options": [
        "Source",
        "News",
        "Interview",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"control over what can be published\".",
      "answer": "Censorship",
      "options": [
        "Headline",
        "Broadcast",
        "Censorship",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"involving deep research to uncover facts\".",
      "answer": "Investigative",
      "options": [
        "Article",
        "Investigative",
        "Censorship",
        "Reporter"
      ]
    },
    {
      "id": "media-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"new information about events\".",
      "answer": "News",
      "options": [
        "News",
        "Headline",
        "Broadcast",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"the title of a news story\".",
      "answer": "Headline",
      "options": [
        "Reporter",
        "Article",
        "Censorship",
        "Headline"
      ]
    },
    {
      "id": "media-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Media & Journalism: \"a person who gathers news\".",
      "answer": "Reporter",
      "options": [
        "Source",
        "Investigative",
        "Reporter",
        "Interview"
      ]
    },
    {
      "id": "media-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"where information comes from\"?",
      "answer": "Source",
      "options": [
        "Article",
        "Investigative",
        "Source",
        "Reporter"
      ]
    },
    {
      "id": "media-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"an opinion article from a publication\"?",
      "answer": "Editorial",
      "options": [
        "News",
        "Editorial",
        "Interview",
        "Source"
      ]
    },
    {
      "id": "media-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"control over what can be published\"?",
      "answer": "Censorship",
      "options": [
        "Censorship",
        "Broadcast",
        "Editorial",
        "Headline"
      ]
    },
    {
      "id": "media-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"involving deep research to uncover facts\"?",
      "answer": "Investigative",
      "options": [
        "Article",
        "Censorship",
        "Reporter",
        "Investigative"
      ]
    },
    {
      "id": "media-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"new information about events\"?",
      "answer": "News",
      "options": [
        "Headline",
        "Broadcast",
        "News",
        "Editorial"
      ]
    },
    {
      "id": "media-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"the title of a news story\"?",
      "answer": "Headline",
      "options": [
        "Article",
        "Headline",
        "Censorship",
        "Reporter"
      ]
    },
    {
      "id": "media-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"a person who gathers news\"?",
      "answer": "Reporter",
      "options": [
        "Reporter",
        "Investigative",
        "Interview",
        "Source"
      ]
    },
    {
      "id": "media-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"a formal question-and-answer conversation\"?",
      "answer": "Interview",
      "options": [
        "News",
        "Broadcast",
        "Editorial",
        "Interview"
      ]
    },
    {
      "id": "media-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"to send a program by TV, radio, or internet\"?",
      "answer": "Broadcast",
      "options": [
        "Article",
        "Censorship",
        "Broadcast",
        "Headline"
      ]
    },
    {
      "id": "media-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal media & journalism context, which term best matches: \"a written piece in a newspaper or website\"?",
      "answer": "Article",
      "options": [
        "Investigative",
        "Article",
        "Reporter",
        "Source"
      ]
    }
  ],
  "id": [
    {
      "id": "media-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"new information about events\"?",
      "answer": "News",
      "options": [
        "News",
        "Interview",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the title of a news story\"?",
      "answer": "Headline",
      "options": [
        "Broadcast",
        "Editorial",
        "News",
        "Headline"
      ]
    },
    {
      "id": "media-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who gathers news\"?",
      "answer": "Reporter",
      "options": [
        "Censorship",
        "Headline",
        "Reporter",
        "Article"
      ]
    },
    {
      "id": "media-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a formal question-and-answer conversation\"?",
      "answer": "Interview",
      "options": [
        "Reporter",
        "Interview",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"to send a program by TV, radio, or internet\"?",
      "answer": "Broadcast",
      "options": [
        "Broadcast",
        "Editorial",
        "News",
        "Interview"
      ]
    },
    {
      "id": "media-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a written piece in a newspaper or website\"?",
      "answer": "Article",
      "options": [
        "Censorship",
        "Headline",
        "Broadcast",
        "Article"
      ]
    },
    {
      "id": "media-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"where information comes from\"?",
      "answer": "Source",
      "options": [
        "Reporter",
        "Article",
        "Source",
        "Investigative"
      ]
    },
    {
      "id": "media-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an opinion article from a publication\"?",
      "answer": "Editorial",
      "options": [
        "Source",
        "Editorial",
        "News",
        "Interview"
      ]
    },
    {
      "id": "media-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"control over what can be published\"?",
      "answer": "Censorship",
      "options": [
        "Censorship",
        "Headline",
        "Broadcast",
        "Editorial"
      ]
    },
    {
      "id": "media-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"involving deep research to uncover facts\"?",
      "answer": "Investigative",
      "options": [
        "Reporter",
        "Article",
        "Censorship",
        "Investigative"
      ]
    },
    {
      "id": "media-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"a formal question-and-answer conversation\".",
      "answer": "Interview",
      "options": [
        "Reporter",
        "Source",
        "Investigative",
        "Interview"
      ]
    },
    {
      "id": "media-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"to send a program by TV, radio, or internet\".",
      "answer": "Broadcast",
      "options": [
        "Editorial",
        "News",
        "Broadcast",
        "Interview"
      ]
    },
    {
      "id": "media-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"a written piece in a newspaper or website\".",
      "answer": "Article",
      "options": [
        "Headline",
        "Article",
        "Broadcast",
        "Censorship"
      ]
    },
    {
      "id": "media-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"where information comes from\".",
      "answer": "Source",
      "options": [
        "Source",
        "Article",
        "Investigative",
        "Reporter"
      ]
    },
    {
      "id": "media-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"an opinion article from a publication\".",
      "answer": "Editorial",
      "options": [
        "Source",
        "News",
        "Interview",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"control over what can be published\".",
      "answer": "Censorship",
      "options": [
        "Headline",
        "Broadcast",
        "Censorship",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"involving deep research to uncover facts\".",
      "answer": "Investigative",
      "options": [
        "Article",
        "Investigative",
        "Censorship",
        "Reporter"
      ]
    },
    {
      "id": "media-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"new information about events\".",
      "answer": "News",
      "options": [
        "News",
        "Headline",
        "Broadcast",
        "Editorial"
      ]
    },
    {
      "id": "media-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"the title of a news story\".",
      "answer": "Headline",
      "options": [
        "Reporter",
        "Article",
        "Censorship",
        "Headline"
      ]
    },
    {
      "id": "media-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Media & Journalism: \"a person who gathers news\".",
      "answer": "Reporter",
      "options": [
        "Source",
        "Investigative",
        "Reporter",
        "Interview"
      ]
    },
    {
      "id": "media-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"where information comes from\"?",
      "answer": "Source",
      "options": [
        "Article",
        "Investigative",
        "Source",
        "Reporter"
      ]
    },
    {
      "id": "media-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"an opinion article from a publication\"?",
      "answer": "Editorial",
      "options": [
        "News",
        "Editorial",
        "Interview",
        "Source"
      ]
    },
    {
      "id": "media-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"control over what can be published\"?",
      "answer": "Censorship",
      "options": [
        "Censorship",
        "Broadcast",
        "Editorial",
        "Headline"
      ]
    },
    {
      "id": "media-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"involving deep research to uncover facts\"?",
      "answer": "Investigative",
      "options": [
        "Article",
        "Censorship",
        "Reporter",
        "Investigative"
      ]
    },
    {
      "id": "media-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"new information about events\"?",
      "answer": "News",
      "options": [
        "Headline",
        "Broadcast",
        "News",
        "Editorial"
      ]
    },
    {
      "id": "media-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"the title of a news story\"?",
      "answer": "Headline",
      "options": [
        "Article",
        "Headline",
        "Censorship",
        "Reporter"
      ]
    },
    {
      "id": "media-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who gathers news\"?",
      "answer": "Reporter",
      "options": [
        "Reporter",
        "Investigative",
        "Interview",
        "Source"
      ]
    },
    {
      "id": "media-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"a formal question-and-answer conversation\"?",
      "answer": "Interview",
      "options": [
        "News",
        "Broadcast",
        "Editorial",
        "Interview"
      ]
    },
    {
      "id": "media-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"to send a program by TV, radio, or internet\"?",
      "answer": "Broadcast",
      "options": [
        "Article",
        "Censorship",
        "Broadcast",
        "Headline"
      ]
    },
    {
      "id": "media-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks media & journalism yang lebih formal, istilah mana yang paling sesuai dengan: \"a written piece in a newspaper or website\"?",
      "answer": "Article",
      "options": [
        "Investigative",
        "Article",
        "Reporter",
        "Source"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik17Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik17"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
