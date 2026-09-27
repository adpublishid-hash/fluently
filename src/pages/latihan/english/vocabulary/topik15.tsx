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
  "id": "music-arts",
  "title": "Music, Movies & Arts",
  "description": "Kosakata hiburan, film, musik, dan seni.",
  "topicNumber": 15,
  "terms": [
    {
      "word": "Song",
      "meaning": "music with words"
    },
    {
      "word": "Artist",
      "meaning": "a person who creates art"
    },
    {
      "word": "Stage",
      "meaning": "a raised area for performance"
    },
    {
      "word": "Gallery",
      "meaning": "a place where art is shown"
    },
    {
      "word": "Melody",
      "meaning": "a sequence of musical notes"
    },
    {
      "word": "Exhibition",
      "meaning": "a public display of art"
    },
    {
      "word": "Performance",
      "meaning": "an act of presenting music or drama"
    },
    {
      "word": "Composition",
      "meaning": "a piece of music or art"
    },
    {
      "word": "Critique",
      "meaning": "a careful review of art"
    },
    {
      "word": "Aesthetic",
      "meaning": "related to beauty or artistic style"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "music-arts-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"music with words\"?",
      "answer": "Song",
      "options": [
        "Song",
        "Gallery",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a person who creates art\"?",
      "answer": "Artist",
      "options": [
        "Melody",
        "Composition",
        "Song",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"a raised area for performance\"?",
      "answer": "Stage",
      "options": [
        "Critique",
        "Artist",
        "Stage",
        "Exhibition"
      ]
    },
    {
      "id": "music-arts-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a place where art is shown\"?",
      "answer": "Gallery",
      "options": [
        "Stage",
        "Gallery",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a sequence of musical notes\"?",
      "answer": "Melody",
      "options": [
        "Melody",
        "Composition",
        "Song",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a public display of art\"?",
      "answer": "Exhibition",
      "options": [
        "Critique",
        "Artist",
        "Melody",
        "Exhibition"
      ]
    },
    {
      "id": "music-arts-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"an act of presenting music or drama\"?",
      "answer": "Performance",
      "options": [
        "Stage",
        "Exhibition",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a piece of music or art\"?",
      "answer": "Composition",
      "options": [
        "Performance",
        "Composition",
        "Song",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"a careful review of art\"?",
      "answer": "Critique",
      "options": [
        "Critique",
        "Artist",
        "Melody",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"related to beauty or artistic style\"?",
      "answer": "Aesthetic",
      "options": [
        "Stage",
        "Exhibition",
        "Critique",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a place where art is shown\".",
      "answer": "Gallery",
      "options": [
        "Stage",
        "Performance",
        "Aesthetic",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a sequence of musical notes\".",
      "answer": "Melody",
      "options": [
        "Composition",
        "Song",
        "Melody",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a public display of art\".",
      "answer": "Exhibition",
      "options": [
        "Artist",
        "Exhibition",
        "Melody",
        "Critique"
      ]
    },
    {
      "id": "music-arts-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"an act of presenting music or drama\".",
      "answer": "Performance",
      "options": [
        "Performance",
        "Exhibition",
        "Aesthetic",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a piece of music or art\".",
      "answer": "Composition",
      "options": [
        "Performance",
        "Song",
        "Gallery",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a careful review of art\".",
      "answer": "Critique",
      "options": [
        "Artist",
        "Melody",
        "Critique",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"related to beauty or artistic style\".",
      "answer": "Aesthetic",
      "options": [
        "Exhibition",
        "Aesthetic",
        "Critique",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"music with words\".",
      "answer": "Song",
      "options": [
        "Song",
        "Artist",
        "Melody",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a person who creates art\".",
      "answer": "Artist",
      "options": [
        "Stage",
        "Exhibition",
        "Critique",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Music, Movies & Arts: \"a raised area for performance\".",
      "answer": "Stage",
      "options": [
        "Performance",
        "Aesthetic",
        "Stage",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"an act of presenting music or drama\"?",
      "answer": "Performance",
      "options": [
        "Exhibition",
        "Aesthetic",
        "Performance",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a piece of music or art\"?",
      "answer": "Composition",
      "options": [
        "Song",
        "Composition",
        "Gallery",
        "Performance"
      ]
    },
    {
      "id": "music-arts-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a careful review of art\"?",
      "answer": "Critique",
      "options": [
        "Critique",
        "Melody",
        "Composition",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"related to beauty or artistic style\"?",
      "answer": "Aesthetic",
      "options": [
        "Exhibition",
        "Critique",
        "Stage",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"music with words\"?",
      "answer": "Song",
      "options": [
        "Artist",
        "Melody",
        "Song",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a person who creates art\"?",
      "answer": "Artist",
      "options": [
        "Exhibition",
        "Artist",
        "Critique",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a raised area for performance\"?",
      "answer": "Stage",
      "options": [
        "Stage",
        "Aesthetic",
        "Gallery",
        "Performance"
      ]
    },
    {
      "id": "music-arts-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a place where art is shown\"?",
      "answer": "Gallery",
      "options": [
        "Song",
        "Melody",
        "Composition",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a sequence of musical notes\"?",
      "answer": "Melody",
      "options": [
        "Exhibition",
        "Critique",
        "Melody",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal music, movies & arts context, which term best matches: \"a public display of art\"?",
      "answer": "Exhibition",
      "options": [
        "Aesthetic",
        "Exhibition",
        "Stage",
        "Performance"
      ]
    }
  ],
  "id": [
    {
      "id": "music-arts-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"music with words\"?",
      "answer": "Song",
      "options": [
        "Song",
        "Gallery",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who creates art\"?",
      "answer": "Artist",
      "options": [
        "Melody",
        "Composition",
        "Song",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a raised area for performance\"?",
      "answer": "Stage",
      "options": [
        "Critique",
        "Artist",
        "Stage",
        "Exhibition"
      ]
    },
    {
      "id": "music-arts-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place where art is shown\"?",
      "answer": "Gallery",
      "options": [
        "Stage",
        "Gallery",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a sequence of musical notes\"?",
      "answer": "Melody",
      "options": [
        "Melody",
        "Composition",
        "Song",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a public display of art\"?",
      "answer": "Exhibition",
      "options": [
        "Critique",
        "Artist",
        "Melody",
        "Exhibition"
      ]
    },
    {
      "id": "music-arts-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an act of presenting music or drama\"?",
      "answer": "Performance",
      "options": [
        "Stage",
        "Exhibition",
        "Performance",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a piece of music or art\"?",
      "answer": "Composition",
      "options": [
        "Performance",
        "Composition",
        "Song",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a careful review of art\"?",
      "answer": "Critique",
      "options": [
        "Critique",
        "Artist",
        "Melody",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"related to beauty or artistic style\"?",
      "answer": "Aesthetic",
      "options": [
        "Stage",
        "Exhibition",
        "Critique",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a place where art is shown\".",
      "answer": "Gallery",
      "options": [
        "Stage",
        "Performance",
        "Aesthetic",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a sequence of musical notes\".",
      "answer": "Melody",
      "options": [
        "Composition",
        "Song",
        "Melody",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a public display of art\".",
      "answer": "Exhibition",
      "options": [
        "Artist",
        "Exhibition",
        "Melody",
        "Critique"
      ]
    },
    {
      "id": "music-arts-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"an act of presenting music or drama\".",
      "answer": "Performance",
      "options": [
        "Performance",
        "Exhibition",
        "Aesthetic",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a piece of music or art\".",
      "answer": "Composition",
      "options": [
        "Performance",
        "Song",
        "Gallery",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a careful review of art\".",
      "answer": "Critique",
      "options": [
        "Artist",
        "Melody",
        "Critique",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"related to beauty or artistic style\".",
      "answer": "Aesthetic",
      "options": [
        "Exhibition",
        "Aesthetic",
        "Critique",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"music with words\".",
      "answer": "Song",
      "options": [
        "Song",
        "Artist",
        "Melody",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a person who creates art\".",
      "answer": "Artist",
      "options": [
        "Stage",
        "Exhibition",
        "Critique",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Music, Movies & Arts: \"a raised area for performance\".",
      "answer": "Stage",
      "options": [
        "Performance",
        "Aesthetic",
        "Stage",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"an act of presenting music or drama\"?",
      "answer": "Performance",
      "options": [
        "Exhibition",
        "Aesthetic",
        "Performance",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a piece of music or art\"?",
      "answer": "Composition",
      "options": [
        "Song",
        "Composition",
        "Gallery",
        "Performance"
      ]
    },
    {
      "id": "music-arts-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a careful review of art\"?",
      "answer": "Critique",
      "options": [
        "Critique",
        "Melody",
        "Composition",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"related to beauty or artistic style\"?",
      "answer": "Aesthetic",
      "options": [
        "Exhibition",
        "Critique",
        "Stage",
        "Aesthetic"
      ]
    },
    {
      "id": "music-arts-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"music with words\"?",
      "answer": "Song",
      "options": [
        "Artist",
        "Melody",
        "Song",
        "Composition"
      ]
    },
    {
      "id": "music-arts-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who creates art\"?",
      "answer": "Artist",
      "options": [
        "Exhibition",
        "Artist",
        "Critique",
        "Stage"
      ]
    },
    {
      "id": "music-arts-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a raised area for performance\"?",
      "answer": "Stage",
      "options": [
        "Stage",
        "Aesthetic",
        "Gallery",
        "Performance"
      ]
    },
    {
      "id": "music-arts-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a place where art is shown\"?",
      "answer": "Gallery",
      "options": [
        "Song",
        "Melody",
        "Composition",
        "Gallery"
      ]
    },
    {
      "id": "music-arts-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a sequence of musical notes\"?",
      "answer": "Melody",
      "options": [
        "Exhibition",
        "Critique",
        "Melody",
        "Artist"
      ]
    },
    {
      "id": "music-arts-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks music, movies & arts yang lebih formal, istilah mana yang paling sesuai dengan: \"a public display of art\"?",
      "answer": "Exhibition",
      "options": [
        "Aesthetic",
        "Exhibition",
        "Stage",
        "Performance"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik15Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik15"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
