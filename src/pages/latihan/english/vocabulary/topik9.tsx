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
  "id": "education",
  "title": "Education & Academic",
  "description": "Kosakata sekolah, universitas, dan dunia akademik.",
  "topicNumber": 9,
  "terms": [
    {
      "word": "Lesson",
      "meaning": "a period of learning"
    },
    {
      "word": "Homework",
      "meaning": "school work done at home"
    },
    {
      "word": "Subject",
      "meaning": "an area of study"
    },
    {
      "word": "Exam",
      "meaning": "a formal test"
    },
    {
      "word": "Assignment",
      "meaning": "a task given by a teacher"
    },
    {
      "word": "Curriculum",
      "meaning": "the subjects taught in a course"
    },
    {
      "word": "Scholarship",
      "meaning": "money awarded for study"
    },
    {
      "word": "Lecture",
      "meaning": "a formal educational talk"
    },
    {
      "word": "Research",
      "meaning": "careful study to discover information"
    },
    {
      "word": "Thesis",
      "meaning": "a long academic paper or main argument"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "education-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a period of learning\"?",
      "answer": "Lesson",
      "options": [
        "Lesson",
        "Exam",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"school work done at home\"?",
      "answer": "Homework",
      "options": [
        "Assignment",
        "Lecture",
        "Lesson",
        "Homework"
      ]
    },
    {
      "id": "education-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"an area of study\"?",
      "answer": "Subject",
      "options": [
        "Research",
        "Homework",
        "Subject",
        "Curriculum"
      ]
    },
    {
      "id": "education-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a formal test\"?",
      "answer": "Exam",
      "options": [
        "Subject",
        "Exam",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"a task given by a teacher\"?",
      "answer": "Assignment",
      "options": [
        "Assignment",
        "Lecture",
        "Lesson",
        "Exam"
      ]
    },
    {
      "id": "education-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"the subjects taught in a course\"?",
      "answer": "Curriculum",
      "options": [
        "Research",
        "Homework",
        "Assignment",
        "Curriculum"
      ]
    },
    {
      "id": "education-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"money awarded for study\"?",
      "answer": "Scholarship",
      "options": [
        "Subject",
        "Curriculum",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a formal educational talk\"?",
      "answer": "Lecture",
      "options": [
        "Scholarship",
        "Lecture",
        "Lesson",
        "Exam"
      ]
    },
    {
      "id": "education-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"careful study to discover information\"?",
      "answer": "Research",
      "options": [
        "Research",
        "Homework",
        "Assignment",
        "Lecture"
      ]
    },
    {
      "id": "education-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"a long academic paper or main argument\"?",
      "answer": "Thesis",
      "options": [
        "Subject",
        "Curriculum",
        "Research",
        "Thesis"
      ]
    },
    {
      "id": "education-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"a formal test\".",
      "answer": "Exam",
      "options": [
        "Subject",
        "Scholarship",
        "Thesis",
        "Exam"
      ]
    },
    {
      "id": "education-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"a task given by a teacher\".",
      "answer": "Assignment",
      "options": [
        "Lecture",
        "Lesson",
        "Assignment",
        "Exam"
      ]
    },
    {
      "id": "education-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"the subjects taught in a course\".",
      "answer": "Curriculum",
      "options": [
        "Homework",
        "Curriculum",
        "Assignment",
        "Research"
      ]
    },
    {
      "id": "education-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"money awarded for study\".",
      "answer": "Scholarship",
      "options": [
        "Scholarship",
        "Curriculum",
        "Thesis",
        "Subject"
      ]
    },
    {
      "id": "education-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"a formal educational talk\".",
      "answer": "Lecture",
      "options": [
        "Scholarship",
        "Lesson",
        "Exam",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"careful study to discover information\".",
      "answer": "Research",
      "options": [
        "Homework",
        "Assignment",
        "Research",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"a long academic paper or main argument\".",
      "answer": "Thesis",
      "options": [
        "Curriculum",
        "Thesis",
        "Research",
        "Subject"
      ]
    },
    {
      "id": "education-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"a period of learning\".",
      "answer": "Lesson",
      "options": [
        "Lesson",
        "Homework",
        "Assignment",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"school work done at home\".",
      "answer": "Homework",
      "options": [
        "Subject",
        "Curriculum",
        "Research",
        "Homework"
      ]
    },
    {
      "id": "education-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Education & Academic: \"an area of study\".",
      "answer": "Subject",
      "options": [
        "Scholarship",
        "Thesis",
        "Subject",
        "Exam"
      ]
    },
    {
      "id": "education-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"money awarded for study\"?",
      "answer": "Scholarship",
      "options": [
        "Curriculum",
        "Thesis",
        "Scholarship",
        "Subject"
      ]
    },
    {
      "id": "education-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"a formal educational talk\"?",
      "answer": "Lecture",
      "options": [
        "Lesson",
        "Lecture",
        "Exam",
        "Scholarship"
      ]
    },
    {
      "id": "education-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"careful study to discover information\"?",
      "answer": "Research",
      "options": [
        "Research",
        "Assignment",
        "Lecture",
        "Homework"
      ]
    },
    {
      "id": "education-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"a long academic paper or main argument\"?",
      "answer": "Thesis",
      "options": [
        "Curriculum",
        "Research",
        "Subject",
        "Thesis"
      ]
    },
    {
      "id": "education-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"a period of learning\"?",
      "answer": "Lesson",
      "options": [
        "Homework",
        "Assignment",
        "Lesson",
        "Lecture"
      ]
    },
    {
      "id": "education-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"school work done at home\"?",
      "answer": "Homework",
      "options": [
        "Curriculum",
        "Homework",
        "Research",
        "Subject"
      ]
    },
    {
      "id": "education-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"an area of study\"?",
      "answer": "Subject",
      "options": [
        "Subject",
        "Thesis",
        "Exam",
        "Scholarship"
      ]
    },
    {
      "id": "education-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"a formal test\"?",
      "answer": "Exam",
      "options": [
        "Lesson",
        "Assignment",
        "Lecture",
        "Exam"
      ]
    },
    {
      "id": "education-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"a task given by a teacher\"?",
      "answer": "Assignment",
      "options": [
        "Curriculum",
        "Research",
        "Assignment",
        "Homework"
      ]
    },
    {
      "id": "education-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal education & academic context, which term best matches: \"the subjects taught in a course\"?",
      "answer": "Curriculum",
      "options": [
        "Thesis",
        "Curriculum",
        "Subject",
        "Scholarship"
      ]
    }
  ],
  "id": [
    {
      "id": "education-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a period of learning\"?",
      "answer": "Lesson",
      "options": [
        "Lesson",
        "Exam",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"school work done at home\"?",
      "answer": "Homework",
      "options": [
        "Assignment",
        "Lecture",
        "Lesson",
        "Homework"
      ]
    },
    {
      "id": "education-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an area of study\"?",
      "answer": "Subject",
      "options": [
        "Research",
        "Homework",
        "Subject",
        "Curriculum"
      ]
    },
    {
      "id": "education-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a formal test\"?",
      "answer": "Exam",
      "options": [
        "Subject",
        "Exam",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a task given by a teacher\"?",
      "answer": "Assignment",
      "options": [
        "Assignment",
        "Lecture",
        "Lesson",
        "Exam"
      ]
    },
    {
      "id": "education-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the subjects taught in a course\"?",
      "answer": "Curriculum",
      "options": [
        "Research",
        "Homework",
        "Assignment",
        "Curriculum"
      ]
    },
    {
      "id": "education-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"money awarded for study\"?",
      "answer": "Scholarship",
      "options": [
        "Subject",
        "Curriculum",
        "Scholarship",
        "Thesis"
      ]
    },
    {
      "id": "education-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a formal educational talk\"?",
      "answer": "Lecture",
      "options": [
        "Scholarship",
        "Lecture",
        "Lesson",
        "Exam"
      ]
    },
    {
      "id": "education-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"careful study to discover information\"?",
      "answer": "Research",
      "options": [
        "Research",
        "Homework",
        "Assignment",
        "Lecture"
      ]
    },
    {
      "id": "education-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a long academic paper or main argument\"?",
      "answer": "Thesis",
      "options": [
        "Subject",
        "Curriculum",
        "Research",
        "Thesis"
      ]
    },
    {
      "id": "education-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"a formal test\".",
      "answer": "Exam",
      "options": [
        "Subject",
        "Scholarship",
        "Thesis",
        "Exam"
      ]
    },
    {
      "id": "education-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"a task given by a teacher\".",
      "answer": "Assignment",
      "options": [
        "Lecture",
        "Lesson",
        "Assignment",
        "Exam"
      ]
    },
    {
      "id": "education-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"the subjects taught in a course\".",
      "answer": "Curriculum",
      "options": [
        "Homework",
        "Curriculum",
        "Assignment",
        "Research"
      ]
    },
    {
      "id": "education-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"money awarded for study\".",
      "answer": "Scholarship",
      "options": [
        "Scholarship",
        "Curriculum",
        "Thesis",
        "Subject"
      ]
    },
    {
      "id": "education-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"a formal educational talk\".",
      "answer": "Lecture",
      "options": [
        "Scholarship",
        "Lesson",
        "Exam",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"careful study to discover information\".",
      "answer": "Research",
      "options": [
        "Homework",
        "Assignment",
        "Research",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"a long academic paper or main argument\".",
      "answer": "Thesis",
      "options": [
        "Curriculum",
        "Thesis",
        "Research",
        "Subject"
      ]
    },
    {
      "id": "education-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"a period of learning\".",
      "answer": "Lesson",
      "options": [
        "Lesson",
        "Homework",
        "Assignment",
        "Lecture"
      ]
    },
    {
      "id": "education-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"school work done at home\".",
      "answer": "Homework",
      "options": [
        "Subject",
        "Curriculum",
        "Research",
        "Homework"
      ]
    },
    {
      "id": "education-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Education & Academic: \"an area of study\".",
      "answer": "Subject",
      "options": [
        "Scholarship",
        "Thesis",
        "Subject",
        "Exam"
      ]
    },
    {
      "id": "education-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"money awarded for study\"?",
      "answer": "Scholarship",
      "options": [
        "Curriculum",
        "Thesis",
        "Scholarship",
        "Subject"
      ]
    },
    {
      "id": "education-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"a formal educational talk\"?",
      "answer": "Lecture",
      "options": [
        "Lesson",
        "Lecture",
        "Exam",
        "Scholarship"
      ]
    },
    {
      "id": "education-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"careful study to discover information\"?",
      "answer": "Research",
      "options": [
        "Research",
        "Assignment",
        "Lecture",
        "Homework"
      ]
    },
    {
      "id": "education-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"a long academic paper or main argument\"?",
      "answer": "Thesis",
      "options": [
        "Curriculum",
        "Research",
        "Subject",
        "Thesis"
      ]
    },
    {
      "id": "education-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"a period of learning\"?",
      "answer": "Lesson",
      "options": [
        "Homework",
        "Assignment",
        "Lesson",
        "Lecture"
      ]
    },
    {
      "id": "education-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"school work done at home\"?",
      "answer": "Homework",
      "options": [
        "Curriculum",
        "Homework",
        "Research",
        "Subject"
      ]
    },
    {
      "id": "education-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"an area of study\"?",
      "answer": "Subject",
      "options": [
        "Subject",
        "Thesis",
        "Exam",
        "Scholarship"
      ]
    },
    {
      "id": "education-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"a formal test\"?",
      "answer": "Exam",
      "options": [
        "Lesson",
        "Assignment",
        "Lecture",
        "Exam"
      ]
    },
    {
      "id": "education-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"a task given by a teacher\"?",
      "answer": "Assignment",
      "options": [
        "Curriculum",
        "Research",
        "Assignment",
        "Homework"
      ]
    },
    {
      "id": "education-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks education & academic yang lebih formal, istilah mana yang paling sesuai dengan: \"the subjects taught in a course\"?",
      "answer": "Curriculum",
      "options": [
        "Thesis",
        "Curriculum",
        "Subject",
        "Scholarship"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik9Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik9"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
