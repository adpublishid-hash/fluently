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
  "id": "science",
  "title": "Science & Space",
  "description": "Kosakata sains, eksperimen, dan luar angkasa.",
  "topicNumber": 18,
  "terms": [
    {
      "word": "Planet",
      "meaning": "a large object orbiting a star"
    },
    {
      "word": "Experiment",
      "meaning": "a test done to learn something"
    },
    {
      "word": "Gravity",
      "meaning": "the force that pulls objects together"
    },
    {
      "word": "Telescope",
      "meaning": "a tool used to see distant objects"
    },
    {
      "word": "Hypothesis",
      "meaning": "an idea tested by research"
    },
    {
      "word": "Laboratory",
      "meaning": "a place for scientific work"
    },
    {
      "word": "Orbit",
      "meaning": "the path of an object around another object"
    },
    {
      "word": "Molecule",
      "meaning": "a group of atoms joined together"
    },
    {
      "word": "Astronomy",
      "meaning": "the study of space"
    },
    {
      "word": "Quantum",
      "meaning": "related to very small units of energy or matter"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "science-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"a large object orbiting a star\"?",
      "answer": "Planet",
      "options": [
        "Planet",
        "Telescope",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"a test done to learn something\"?",
      "answer": "Experiment",
      "options": [
        "Hypothesis",
        "Molecule",
        "Planet",
        "Experiment"
      ]
    },
    {
      "id": "science-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"the force that pulls objects together\"?",
      "answer": "Gravity",
      "options": [
        "Astronomy",
        "Experiment",
        "Gravity",
        "Laboratory"
      ]
    },
    {
      "id": "science-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a tool used to see distant objects\"?",
      "answer": "Telescope",
      "options": [
        "Gravity",
        "Telescope",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"an idea tested by research\"?",
      "answer": "Hypothesis",
      "options": [
        "Hypothesis",
        "Molecule",
        "Planet",
        "Telescope"
      ]
    },
    {
      "id": "science-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a place for scientific work\"?",
      "answer": "Laboratory",
      "options": [
        "Astronomy",
        "Experiment",
        "Hypothesis",
        "Laboratory"
      ]
    },
    {
      "id": "science-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"the path of an object around another object\"?",
      "answer": "Orbit",
      "options": [
        "Gravity",
        "Laboratory",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a group of atoms joined together\"?",
      "answer": "Molecule",
      "options": [
        "Orbit",
        "Molecule",
        "Planet",
        "Telescope"
      ]
    },
    {
      "id": "science-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"the study of space\"?",
      "answer": "Astronomy",
      "options": [
        "Astronomy",
        "Experiment",
        "Hypothesis",
        "Molecule"
      ]
    },
    {
      "id": "science-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"related to very small units of energy or matter\"?",
      "answer": "Quantum",
      "options": [
        "Gravity",
        "Laboratory",
        "Astronomy",
        "Quantum"
      ]
    },
    {
      "id": "science-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"a tool used to see distant objects\".",
      "answer": "Telescope",
      "options": [
        "Gravity",
        "Orbit",
        "Quantum",
        "Telescope"
      ]
    },
    {
      "id": "science-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"an idea tested by research\".",
      "answer": "Hypothesis",
      "options": [
        "Molecule",
        "Planet",
        "Hypothesis",
        "Telescope"
      ]
    },
    {
      "id": "science-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"a place for scientific work\".",
      "answer": "Laboratory",
      "options": [
        "Experiment",
        "Laboratory",
        "Hypothesis",
        "Astronomy"
      ]
    },
    {
      "id": "science-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"the path of an object around another object\".",
      "answer": "Orbit",
      "options": [
        "Orbit",
        "Laboratory",
        "Quantum",
        "Gravity"
      ]
    },
    {
      "id": "science-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"a group of atoms joined together\".",
      "answer": "Molecule",
      "options": [
        "Orbit",
        "Planet",
        "Telescope",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"the study of space\".",
      "answer": "Astronomy",
      "options": [
        "Experiment",
        "Hypothesis",
        "Astronomy",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"related to very small units of energy or matter\".",
      "answer": "Quantum",
      "options": [
        "Laboratory",
        "Quantum",
        "Astronomy",
        "Gravity"
      ]
    },
    {
      "id": "science-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"a large object orbiting a star\".",
      "answer": "Planet",
      "options": [
        "Planet",
        "Experiment",
        "Hypothesis",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"a test done to learn something\".",
      "answer": "Experiment",
      "options": [
        "Gravity",
        "Laboratory",
        "Astronomy",
        "Experiment"
      ]
    },
    {
      "id": "science-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Science & Space: \"the force that pulls objects together\".",
      "answer": "Gravity",
      "options": [
        "Orbit",
        "Quantum",
        "Gravity",
        "Telescope"
      ]
    },
    {
      "id": "science-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"the path of an object around another object\"?",
      "answer": "Orbit",
      "options": [
        "Laboratory",
        "Quantum",
        "Orbit",
        "Gravity"
      ]
    },
    {
      "id": "science-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"a group of atoms joined together\"?",
      "answer": "Molecule",
      "options": [
        "Planet",
        "Molecule",
        "Telescope",
        "Orbit"
      ]
    },
    {
      "id": "science-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"the study of space\"?",
      "answer": "Astronomy",
      "options": [
        "Astronomy",
        "Hypothesis",
        "Molecule",
        "Experiment"
      ]
    },
    {
      "id": "science-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"related to very small units of energy or matter\"?",
      "answer": "Quantum",
      "options": [
        "Laboratory",
        "Astronomy",
        "Gravity",
        "Quantum"
      ]
    },
    {
      "id": "science-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"a large object orbiting a star\"?",
      "answer": "Planet",
      "options": [
        "Experiment",
        "Hypothesis",
        "Planet",
        "Molecule"
      ]
    },
    {
      "id": "science-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"a test done to learn something\"?",
      "answer": "Experiment",
      "options": [
        "Laboratory",
        "Experiment",
        "Astronomy",
        "Gravity"
      ]
    },
    {
      "id": "science-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"the force that pulls objects together\"?",
      "answer": "Gravity",
      "options": [
        "Gravity",
        "Quantum",
        "Telescope",
        "Orbit"
      ]
    },
    {
      "id": "science-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"a tool used to see distant objects\"?",
      "answer": "Telescope",
      "options": [
        "Planet",
        "Hypothesis",
        "Molecule",
        "Telescope"
      ]
    },
    {
      "id": "science-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"an idea tested by research\"?",
      "answer": "Hypothesis",
      "options": [
        "Laboratory",
        "Astronomy",
        "Hypothesis",
        "Experiment"
      ]
    },
    {
      "id": "science-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal science & space context, which term best matches: \"a place for scientific work\"?",
      "answer": "Laboratory",
      "options": [
        "Quantum",
        "Laboratory",
        "Gravity",
        "Orbit"
      ]
    }
  ],
  "id": [
    {
      "id": "science-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a large object orbiting a star\"?",
      "answer": "Planet",
      "options": [
        "Planet",
        "Telescope",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a test done to learn something\"?",
      "answer": "Experiment",
      "options": [
        "Hypothesis",
        "Molecule",
        "Planet",
        "Experiment"
      ]
    },
    {
      "id": "science-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the force that pulls objects together\"?",
      "answer": "Gravity",
      "options": [
        "Astronomy",
        "Experiment",
        "Gravity",
        "Laboratory"
      ]
    },
    {
      "id": "science-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a tool used to see distant objects\"?",
      "answer": "Telescope",
      "options": [
        "Gravity",
        "Telescope",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an idea tested by research\"?",
      "answer": "Hypothesis",
      "options": [
        "Hypothesis",
        "Molecule",
        "Planet",
        "Telescope"
      ]
    },
    {
      "id": "science-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a place for scientific work\"?",
      "answer": "Laboratory",
      "options": [
        "Astronomy",
        "Experiment",
        "Hypothesis",
        "Laboratory"
      ]
    },
    {
      "id": "science-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the path of an object around another object\"?",
      "answer": "Orbit",
      "options": [
        "Gravity",
        "Laboratory",
        "Orbit",
        "Quantum"
      ]
    },
    {
      "id": "science-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a group of atoms joined together\"?",
      "answer": "Molecule",
      "options": [
        "Orbit",
        "Molecule",
        "Planet",
        "Telescope"
      ]
    },
    {
      "id": "science-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"the study of space\"?",
      "answer": "Astronomy",
      "options": [
        "Astronomy",
        "Experiment",
        "Hypothesis",
        "Molecule"
      ]
    },
    {
      "id": "science-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"related to very small units of energy or matter\"?",
      "answer": "Quantum",
      "options": [
        "Gravity",
        "Laboratory",
        "Astronomy",
        "Quantum"
      ]
    },
    {
      "id": "science-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"a tool used to see distant objects\".",
      "answer": "Telescope",
      "options": [
        "Gravity",
        "Orbit",
        "Quantum",
        "Telescope"
      ]
    },
    {
      "id": "science-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"an idea tested by research\".",
      "answer": "Hypothesis",
      "options": [
        "Molecule",
        "Planet",
        "Hypothesis",
        "Telescope"
      ]
    },
    {
      "id": "science-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"a place for scientific work\".",
      "answer": "Laboratory",
      "options": [
        "Experiment",
        "Laboratory",
        "Hypothesis",
        "Astronomy"
      ]
    },
    {
      "id": "science-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"the path of an object around another object\".",
      "answer": "Orbit",
      "options": [
        "Orbit",
        "Laboratory",
        "Quantum",
        "Gravity"
      ]
    },
    {
      "id": "science-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"a group of atoms joined together\".",
      "answer": "Molecule",
      "options": [
        "Orbit",
        "Planet",
        "Telescope",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"the study of space\".",
      "answer": "Astronomy",
      "options": [
        "Experiment",
        "Hypothesis",
        "Astronomy",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"related to very small units of energy or matter\".",
      "answer": "Quantum",
      "options": [
        "Laboratory",
        "Quantum",
        "Astronomy",
        "Gravity"
      ]
    },
    {
      "id": "science-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"a large object orbiting a star\".",
      "answer": "Planet",
      "options": [
        "Planet",
        "Experiment",
        "Hypothesis",
        "Molecule"
      ]
    },
    {
      "id": "science-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"a test done to learn something\".",
      "answer": "Experiment",
      "options": [
        "Gravity",
        "Laboratory",
        "Astronomy",
        "Experiment"
      ]
    },
    {
      "id": "science-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Science & Space: \"the force that pulls objects together\".",
      "answer": "Gravity",
      "options": [
        "Orbit",
        "Quantum",
        "Gravity",
        "Telescope"
      ]
    },
    {
      "id": "science-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"the path of an object around another object\"?",
      "answer": "Orbit",
      "options": [
        "Laboratory",
        "Quantum",
        "Orbit",
        "Gravity"
      ]
    },
    {
      "id": "science-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"a group of atoms joined together\"?",
      "answer": "Molecule",
      "options": [
        "Planet",
        "Molecule",
        "Telescope",
        "Orbit"
      ]
    },
    {
      "id": "science-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"the study of space\"?",
      "answer": "Astronomy",
      "options": [
        "Astronomy",
        "Hypothesis",
        "Molecule",
        "Experiment"
      ]
    },
    {
      "id": "science-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"related to very small units of energy or matter\"?",
      "answer": "Quantum",
      "options": [
        "Laboratory",
        "Astronomy",
        "Gravity",
        "Quantum"
      ]
    },
    {
      "id": "science-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"a large object orbiting a star\"?",
      "answer": "Planet",
      "options": [
        "Experiment",
        "Hypothesis",
        "Planet",
        "Molecule"
      ]
    },
    {
      "id": "science-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"a test done to learn something\"?",
      "answer": "Experiment",
      "options": [
        "Laboratory",
        "Experiment",
        "Astronomy",
        "Gravity"
      ]
    },
    {
      "id": "science-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"the force that pulls objects together\"?",
      "answer": "Gravity",
      "options": [
        "Gravity",
        "Quantum",
        "Telescope",
        "Orbit"
      ]
    },
    {
      "id": "science-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"a tool used to see distant objects\"?",
      "answer": "Telescope",
      "options": [
        "Planet",
        "Hypothesis",
        "Molecule",
        "Telescope"
      ]
    },
    {
      "id": "science-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"an idea tested by research\"?",
      "answer": "Hypothesis",
      "options": [
        "Laboratory",
        "Astronomy",
        "Hypothesis",
        "Experiment"
      ]
    },
    {
      "id": "science-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks science & space yang lebih formal, istilah mana yang paling sesuai dengan: \"a place for scientific work\"?",
      "answer": "Laboratory",
      "options": [
        "Quantum",
        "Laboratory",
        "Gravity",
        "Orbit"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik18Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik18"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
