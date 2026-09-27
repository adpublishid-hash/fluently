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
  "id": "feelings",
  "title": "Feelings & Emotions",
  "description": "Kosakata untuk mengungkapkan perasaan dan emosi.",
  "topicNumber": 8,
  "terms": [
    {
      "word": "Happy",
      "meaning": "feeling pleasure or joy"
    },
    {
      "word": "Nervous",
      "meaning": "worried or uneasy"
    },
    {
      "word": "Excited",
      "meaning": "very enthusiastic"
    },
    {
      "word": "Lonely",
      "meaning": "sad because you are alone"
    },
    {
      "word": "Relieved",
      "meaning": "happy because worry has ended"
    },
    {
      "word": "Frustrated",
      "meaning": "annoyed because something is difficult"
    },
    {
      "word": "Anxious",
      "meaning": "very worried about something"
    },
    {
      "word": "Grateful",
      "meaning": "thankful for something"
    },
    {
      "word": "Overwhelmed",
      "meaning": "feeling unable to handle too much"
    },
    {
      "word": "Content",
      "meaning": "calmly satisfied"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "feelings-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"feeling pleasure or joy\"?",
      "answer": "Happy",
      "options": [
        "Happy",
        "Lonely",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"worried or uneasy\"?",
      "answer": "Nervous",
      "options": [
        "Relieved",
        "Grateful",
        "Happy",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"very enthusiastic\"?",
      "answer": "Excited",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Excited",
        "Frustrated"
      ]
    },
    {
      "id": "feelings-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"sad because you are alone\"?",
      "answer": "Lonely",
      "options": [
        "Excited",
        "Lonely",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"happy because worry has ended\"?",
      "answer": "Relieved",
      "options": [
        "Relieved",
        "Grateful",
        "Happy",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"annoyed because something is difficult\"?",
      "answer": "Frustrated",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Relieved",
        "Frustrated"
      ]
    },
    {
      "id": "feelings-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"very worried about something\"?",
      "answer": "Anxious",
      "options": [
        "Excited",
        "Frustrated",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"thankful for something\"?",
      "answer": "Grateful",
      "options": [
        "Anxious",
        "Grateful",
        "Happy",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"feeling unable to handle too much\"?",
      "answer": "Overwhelmed",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Relieved",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"calmly satisfied\"?",
      "answer": "Content",
      "options": [
        "Excited",
        "Frustrated",
        "Overwhelmed",
        "Content"
      ]
    },
    {
      "id": "feelings-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"sad because you are alone\".",
      "answer": "Lonely",
      "options": [
        "Excited",
        "Anxious",
        "Content",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"happy because worry has ended\".",
      "answer": "Relieved",
      "options": [
        "Grateful",
        "Happy",
        "Relieved",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"annoyed because something is difficult\".",
      "answer": "Frustrated",
      "options": [
        "Nervous",
        "Frustrated",
        "Relieved",
        "Overwhelmed"
      ]
    },
    {
      "id": "feelings-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"very worried about something\".",
      "answer": "Anxious",
      "options": [
        "Anxious",
        "Frustrated",
        "Content",
        "Excited"
      ]
    },
    {
      "id": "feelings-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"thankful for something\".",
      "answer": "Grateful",
      "options": [
        "Anxious",
        "Happy",
        "Lonely",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"feeling unable to handle too much\".",
      "answer": "Overwhelmed",
      "options": [
        "Nervous",
        "Relieved",
        "Overwhelmed",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"calmly satisfied\".",
      "answer": "Content",
      "options": [
        "Frustrated",
        "Content",
        "Overwhelmed",
        "Excited"
      ]
    },
    {
      "id": "feelings-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"feeling pleasure or joy\".",
      "answer": "Happy",
      "options": [
        "Happy",
        "Nervous",
        "Relieved",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"worried or uneasy\".",
      "answer": "Nervous",
      "options": [
        "Excited",
        "Frustrated",
        "Overwhelmed",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Feelings & Emotions: \"very enthusiastic\".",
      "answer": "Excited",
      "options": [
        "Anxious",
        "Content",
        "Excited",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"very worried about something\"?",
      "answer": "Anxious",
      "options": [
        "Frustrated",
        "Content",
        "Anxious",
        "Excited"
      ]
    },
    {
      "id": "feelings-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"thankful for something\"?",
      "answer": "Grateful",
      "options": [
        "Happy",
        "Grateful",
        "Lonely",
        "Anxious"
      ]
    },
    {
      "id": "feelings-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"feeling unable to handle too much\"?",
      "answer": "Overwhelmed",
      "options": [
        "Overwhelmed",
        "Relieved",
        "Grateful",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"calmly satisfied\"?",
      "answer": "Content",
      "options": [
        "Frustrated",
        "Overwhelmed",
        "Excited",
        "Content"
      ]
    },
    {
      "id": "feelings-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"feeling pleasure or joy\"?",
      "answer": "Happy",
      "options": [
        "Nervous",
        "Relieved",
        "Happy",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"worried or uneasy\"?",
      "answer": "Nervous",
      "options": [
        "Frustrated",
        "Nervous",
        "Overwhelmed",
        "Excited"
      ]
    },
    {
      "id": "feelings-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"very enthusiastic\"?",
      "answer": "Excited",
      "options": [
        "Excited",
        "Content",
        "Lonely",
        "Anxious"
      ]
    },
    {
      "id": "feelings-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"sad because you are alone\"?",
      "answer": "Lonely",
      "options": [
        "Happy",
        "Relieved",
        "Grateful",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"happy because worry has ended\"?",
      "answer": "Relieved",
      "options": [
        "Frustrated",
        "Overwhelmed",
        "Relieved",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal feelings & emotions context, which term best matches: \"annoyed because something is difficult\"?",
      "answer": "Frustrated",
      "options": [
        "Content",
        "Frustrated",
        "Excited",
        "Anxious"
      ]
    }
  ],
  "id": [
    {
      "id": "feelings-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"feeling pleasure or joy\"?",
      "answer": "Happy",
      "options": [
        "Happy",
        "Lonely",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"worried or uneasy\"?",
      "answer": "Nervous",
      "options": [
        "Relieved",
        "Grateful",
        "Happy",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"very enthusiastic\"?",
      "answer": "Excited",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Excited",
        "Frustrated"
      ]
    },
    {
      "id": "feelings-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"sad because you are alone\"?",
      "answer": "Lonely",
      "options": [
        "Excited",
        "Lonely",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"happy because worry has ended\"?",
      "answer": "Relieved",
      "options": [
        "Relieved",
        "Grateful",
        "Happy",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"annoyed because something is difficult\"?",
      "answer": "Frustrated",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Relieved",
        "Frustrated"
      ]
    },
    {
      "id": "feelings-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"very worried about something\"?",
      "answer": "Anxious",
      "options": [
        "Excited",
        "Frustrated",
        "Anxious",
        "Content"
      ]
    },
    {
      "id": "feelings-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"thankful for something\"?",
      "answer": "Grateful",
      "options": [
        "Anxious",
        "Grateful",
        "Happy",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"feeling unable to handle too much\"?",
      "answer": "Overwhelmed",
      "options": [
        "Overwhelmed",
        "Nervous",
        "Relieved",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"calmly satisfied\"?",
      "answer": "Content",
      "options": [
        "Excited",
        "Frustrated",
        "Overwhelmed",
        "Content"
      ]
    },
    {
      "id": "feelings-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"sad because you are alone\".",
      "answer": "Lonely",
      "options": [
        "Excited",
        "Anxious",
        "Content",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"happy because worry has ended\".",
      "answer": "Relieved",
      "options": [
        "Grateful",
        "Happy",
        "Relieved",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"annoyed because something is difficult\".",
      "answer": "Frustrated",
      "options": [
        "Nervous",
        "Frustrated",
        "Relieved",
        "Overwhelmed"
      ]
    },
    {
      "id": "feelings-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"very worried about something\".",
      "answer": "Anxious",
      "options": [
        "Anxious",
        "Frustrated",
        "Content",
        "Excited"
      ]
    },
    {
      "id": "feelings-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"thankful for something\".",
      "answer": "Grateful",
      "options": [
        "Anxious",
        "Happy",
        "Lonely",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"feeling unable to handle too much\".",
      "answer": "Overwhelmed",
      "options": [
        "Nervous",
        "Relieved",
        "Overwhelmed",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"calmly satisfied\".",
      "answer": "Content",
      "options": [
        "Frustrated",
        "Content",
        "Overwhelmed",
        "Excited"
      ]
    },
    {
      "id": "feelings-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"feeling pleasure or joy\".",
      "answer": "Happy",
      "options": [
        "Happy",
        "Nervous",
        "Relieved",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"worried or uneasy\".",
      "answer": "Nervous",
      "options": [
        "Excited",
        "Frustrated",
        "Overwhelmed",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Feelings & Emotions: \"very enthusiastic\".",
      "answer": "Excited",
      "options": [
        "Anxious",
        "Content",
        "Excited",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"very worried about something\"?",
      "answer": "Anxious",
      "options": [
        "Frustrated",
        "Content",
        "Anxious",
        "Excited"
      ]
    },
    {
      "id": "feelings-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"thankful for something\"?",
      "answer": "Grateful",
      "options": [
        "Happy",
        "Grateful",
        "Lonely",
        "Anxious"
      ]
    },
    {
      "id": "feelings-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"feeling unable to handle too much\"?",
      "answer": "Overwhelmed",
      "options": [
        "Overwhelmed",
        "Relieved",
        "Grateful",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"calmly satisfied\"?",
      "answer": "Content",
      "options": [
        "Frustrated",
        "Overwhelmed",
        "Excited",
        "Content"
      ]
    },
    {
      "id": "feelings-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"feeling pleasure or joy\"?",
      "answer": "Happy",
      "options": [
        "Nervous",
        "Relieved",
        "Happy",
        "Grateful"
      ]
    },
    {
      "id": "feelings-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"worried or uneasy\"?",
      "answer": "Nervous",
      "options": [
        "Frustrated",
        "Nervous",
        "Overwhelmed",
        "Excited"
      ]
    },
    {
      "id": "feelings-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"very enthusiastic\"?",
      "answer": "Excited",
      "options": [
        "Excited",
        "Content",
        "Lonely",
        "Anxious"
      ]
    },
    {
      "id": "feelings-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"sad because you are alone\"?",
      "answer": "Lonely",
      "options": [
        "Happy",
        "Relieved",
        "Grateful",
        "Lonely"
      ]
    },
    {
      "id": "feelings-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"happy because worry has ended\"?",
      "answer": "Relieved",
      "options": [
        "Frustrated",
        "Overwhelmed",
        "Relieved",
        "Nervous"
      ]
    },
    {
      "id": "feelings-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks feelings & emotions yang lebih formal, istilah mana yang paling sesuai dengan: \"annoyed because something is difficult\"?",
      "answer": "Frustrated",
      "options": [
        "Content",
        "Frustrated",
        "Excited",
        "Anxious"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik8Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik8"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
