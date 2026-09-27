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
  "id": "fashion",
  "title": "Fashion & Style",
  "description": "Kosakata tren, pakaian, dan gaya.",
  "topicNumber": 20,
  "terms": [
    {
      "word": "Shirt",
      "meaning": "clothing worn on the upper body"
    },
    {
      "word": "Dress",
      "meaning": "one-piece clothing often worn by women"
    },
    {
      "word": "Fabric",
      "meaning": "material used to make clothes"
    },
    {
      "word": "Pattern",
      "meaning": "a repeated design"
    },
    {
      "word": "Accessory",
      "meaning": "an extra item worn for style"
    },
    {
      "word": "Trend",
      "meaning": "a popular style at a time"
    },
    {
      "word": "Tailor",
      "meaning": "a person who makes or adjusts clothes"
    },
    {
      "word": "Wardrobe",
      "meaning": "a collection of clothes"
    },
    {
      "word": "Minimalist",
      "meaning": "simple in style with few details"
    },
    {
      "word": "Elegance",
      "meaning": "graceful and stylish beauty"
    }
  ]
};

const quizQuestionsByLanguage: Record<'en' | 'id', QuizQuestion[]> = {
  "en": [
    {
      "id": "fashion-Basic-0",
      "level": "Basic",
      "prompt": "Which word means \"clothing worn on the upper body\"?",
      "answer": "Shirt",
      "options": [
        "Shirt",
        "Pattern",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-1",
      "level": "Basic",
      "prompt": "Which word means \"one-piece clothing often worn by women\"?",
      "answer": "Dress",
      "options": [
        "Accessory",
        "Wardrobe",
        "Shirt",
        "Dress"
      ]
    },
    {
      "id": "fashion-Basic-2",
      "level": "Basic",
      "prompt": "Which word means \"material used to make clothes\"?",
      "answer": "Fabric",
      "options": [
        "Minimalist",
        "Dress",
        "Fabric",
        "Trend"
      ]
    },
    {
      "id": "fashion-Basic-3",
      "level": "Basic",
      "prompt": "Which word means \"a repeated design\"?",
      "answer": "Pattern",
      "options": [
        "Fabric",
        "Pattern",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-4",
      "level": "Basic",
      "prompt": "Which word means \"an extra item worn for style\"?",
      "answer": "Accessory",
      "options": [
        "Accessory",
        "Wardrobe",
        "Shirt",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Basic-5",
      "level": "Basic",
      "prompt": "Which word means \"a popular style at a time\"?",
      "answer": "Trend",
      "options": [
        "Minimalist",
        "Dress",
        "Accessory",
        "Trend"
      ]
    },
    {
      "id": "fashion-Basic-6",
      "level": "Basic",
      "prompt": "Which word means \"a person who makes or adjusts clothes\"?",
      "answer": "Tailor",
      "options": [
        "Fabric",
        "Trend",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-7",
      "level": "Basic",
      "prompt": "Which word means \"a collection of clothes\"?",
      "answer": "Wardrobe",
      "options": [
        "Tailor",
        "Wardrobe",
        "Shirt",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Basic-8",
      "level": "Basic",
      "prompt": "Which word means \"simple in style with few details\"?",
      "answer": "Minimalist",
      "options": [
        "Minimalist",
        "Dress",
        "Accessory",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Basic-9",
      "level": "Basic",
      "prompt": "Which word means \"graceful and stylish beauty\"?",
      "answer": "Elegance",
      "options": [
        "Fabric",
        "Trend",
        "Minimalist",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"a repeated design\".",
      "answer": "Pattern",
      "options": [
        "Fabric",
        "Tailor",
        "Elegance",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"an extra item worn for style\".",
      "answer": "Accessory",
      "options": [
        "Wardrobe",
        "Shirt",
        "Accessory",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"a popular style at a time\".",
      "answer": "Trend",
      "options": [
        "Dress",
        "Trend",
        "Accessory",
        "Minimalist"
      ]
    },
    {
      "id": "fashion-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"a person who makes or adjusts clothes\".",
      "answer": "Tailor",
      "options": [
        "Tailor",
        "Trend",
        "Elegance",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"a collection of clothes\".",
      "answer": "Wardrobe",
      "options": [
        "Tailor",
        "Shirt",
        "Pattern",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"simple in style with few details\".",
      "answer": "Minimalist",
      "options": [
        "Dress",
        "Accessory",
        "Minimalist",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"graceful and stylish beauty\".",
      "answer": "Elegance",
      "options": [
        "Trend",
        "Elegance",
        "Minimalist",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"clothing worn on the upper body\".",
      "answer": "Shirt",
      "options": [
        "Shirt",
        "Dress",
        "Accessory",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"one-piece clothing often worn by women\".",
      "answer": "Dress",
      "options": [
        "Fabric",
        "Trend",
        "Minimalist",
        "Dress"
      ]
    },
    {
      "id": "fashion-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Choose the best vocabulary item for this idea in Fashion & Style: \"material used to make clothes\".",
      "answer": "Fabric",
      "options": [
        "Tailor",
        "Elegance",
        "Fabric",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Advanced-0",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"a person who makes or adjusts clothes\"?",
      "answer": "Tailor",
      "options": [
        "Trend",
        "Elegance",
        "Tailor",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Advanced-1",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"a collection of clothes\"?",
      "answer": "Wardrobe",
      "options": [
        "Shirt",
        "Wardrobe",
        "Pattern",
        "Tailor"
      ]
    },
    {
      "id": "fashion-Advanced-2",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"simple in style with few details\"?",
      "answer": "Minimalist",
      "options": [
        "Minimalist",
        "Accessory",
        "Wardrobe",
        "Dress"
      ]
    },
    {
      "id": "fashion-Advanced-3",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"graceful and stylish beauty\"?",
      "answer": "Elegance",
      "options": [
        "Trend",
        "Minimalist",
        "Fabric",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Advanced-4",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"clothing worn on the upper body\"?",
      "answer": "Shirt",
      "options": [
        "Dress",
        "Accessory",
        "Shirt",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Advanced-5",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"one-piece clothing often worn by women\"?",
      "answer": "Dress",
      "options": [
        "Trend",
        "Dress",
        "Minimalist",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Advanced-6",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"material used to make clothes\"?",
      "answer": "Fabric",
      "options": [
        "Fabric",
        "Elegance",
        "Pattern",
        "Tailor"
      ]
    },
    {
      "id": "fashion-Advanced-7",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"a repeated design\"?",
      "answer": "Pattern",
      "options": [
        "Shirt",
        "Accessory",
        "Wardrobe",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Advanced-8",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"an extra item worn for style\"?",
      "answer": "Accessory",
      "options": [
        "Trend",
        "Minimalist",
        "Accessory",
        "Dress"
      ]
    },
    {
      "id": "fashion-Advanced-9",
      "level": "Advanced",
      "prompt": "In a more formal fashion & style context, which term best matches: \"a popular style at a time\"?",
      "answer": "Trend",
      "options": [
        "Elegance",
        "Trend",
        "Fabric",
        "Tailor"
      ]
    }
  ],
  "id": [
    {
      "id": "fashion-Basic-0",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"clothing worn on the upper body\"?",
      "answer": "Shirt",
      "options": [
        "Shirt",
        "Pattern",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-1",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"one-piece clothing often worn by women\"?",
      "answer": "Dress",
      "options": [
        "Accessory",
        "Wardrobe",
        "Shirt",
        "Dress"
      ]
    },
    {
      "id": "fashion-Basic-2",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"material used to make clothes\"?",
      "answer": "Fabric",
      "options": [
        "Minimalist",
        "Dress",
        "Fabric",
        "Trend"
      ]
    },
    {
      "id": "fashion-Basic-3",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a repeated design\"?",
      "answer": "Pattern",
      "options": [
        "Fabric",
        "Pattern",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-4",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"an extra item worn for style\"?",
      "answer": "Accessory",
      "options": [
        "Accessory",
        "Wardrobe",
        "Shirt",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Basic-5",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a popular style at a time\"?",
      "answer": "Trend",
      "options": [
        "Minimalist",
        "Dress",
        "Accessory",
        "Trend"
      ]
    },
    {
      "id": "fashion-Basic-6",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a person who makes or adjusts clothes\"?",
      "answer": "Tailor",
      "options": [
        "Fabric",
        "Trend",
        "Tailor",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Basic-7",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"a collection of clothes\"?",
      "answer": "Wardrobe",
      "options": [
        "Tailor",
        "Wardrobe",
        "Shirt",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Basic-8",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"simple in style with few details\"?",
      "answer": "Minimalist",
      "options": [
        "Minimalist",
        "Dress",
        "Accessory",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Basic-9",
      "level": "Basic",
      "prompt": "Kata mana yang berarti \"graceful and stylish beauty\"?",
      "answer": "Elegance",
      "options": [
        "Fabric",
        "Trend",
        "Minimalist",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Intermediate-0",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"a repeated design\".",
      "answer": "Pattern",
      "options": [
        "Fabric",
        "Tailor",
        "Elegance",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Intermediate-1",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"an extra item worn for style\".",
      "answer": "Accessory",
      "options": [
        "Wardrobe",
        "Shirt",
        "Accessory",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Intermediate-2",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"a popular style at a time\".",
      "answer": "Trend",
      "options": [
        "Dress",
        "Trend",
        "Accessory",
        "Minimalist"
      ]
    },
    {
      "id": "fashion-Intermediate-3",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"a person who makes or adjusts clothes\".",
      "answer": "Tailor",
      "options": [
        "Tailor",
        "Trend",
        "Elegance",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Intermediate-4",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"a collection of clothes\".",
      "answer": "Wardrobe",
      "options": [
        "Tailor",
        "Shirt",
        "Pattern",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-5",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"simple in style with few details\".",
      "answer": "Minimalist",
      "options": [
        "Dress",
        "Accessory",
        "Minimalist",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-6",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"graceful and stylish beauty\".",
      "answer": "Elegance",
      "options": [
        "Trend",
        "Elegance",
        "Minimalist",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Intermediate-7",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"clothing worn on the upper body\".",
      "answer": "Shirt",
      "options": [
        "Shirt",
        "Dress",
        "Accessory",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Intermediate-8",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"one-piece clothing often worn by women\".",
      "answer": "Dress",
      "options": [
        "Fabric",
        "Trend",
        "Minimalist",
        "Dress"
      ]
    },
    {
      "id": "fashion-Intermediate-9",
      "level": "Intermediate",
      "prompt": "Pilih kosakata terbaik untuk ide ini dalam topik Fashion & Style: \"material used to make clothes\".",
      "answer": "Fabric",
      "options": [
        "Tailor",
        "Elegance",
        "Fabric",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Advanced-0",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"a person who makes or adjusts clothes\"?",
      "answer": "Tailor",
      "options": [
        "Trend",
        "Elegance",
        "Tailor",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Advanced-1",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"a collection of clothes\"?",
      "answer": "Wardrobe",
      "options": [
        "Shirt",
        "Wardrobe",
        "Pattern",
        "Tailor"
      ]
    },
    {
      "id": "fashion-Advanced-2",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"simple in style with few details\"?",
      "answer": "Minimalist",
      "options": [
        "Minimalist",
        "Accessory",
        "Wardrobe",
        "Dress"
      ]
    },
    {
      "id": "fashion-Advanced-3",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"graceful and stylish beauty\"?",
      "answer": "Elegance",
      "options": [
        "Trend",
        "Minimalist",
        "Fabric",
        "Elegance"
      ]
    },
    {
      "id": "fashion-Advanced-4",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"clothing worn on the upper body\"?",
      "answer": "Shirt",
      "options": [
        "Dress",
        "Accessory",
        "Shirt",
        "Wardrobe"
      ]
    },
    {
      "id": "fashion-Advanced-5",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"one-piece clothing often worn by women\"?",
      "answer": "Dress",
      "options": [
        "Trend",
        "Dress",
        "Minimalist",
        "Fabric"
      ]
    },
    {
      "id": "fashion-Advanced-6",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"material used to make clothes\"?",
      "answer": "Fabric",
      "options": [
        "Fabric",
        "Elegance",
        "Pattern",
        "Tailor"
      ]
    },
    {
      "id": "fashion-Advanced-7",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"a repeated design\"?",
      "answer": "Pattern",
      "options": [
        "Shirt",
        "Accessory",
        "Wardrobe",
        "Pattern"
      ]
    },
    {
      "id": "fashion-Advanced-8",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"an extra item worn for style\"?",
      "answer": "Accessory",
      "options": [
        "Trend",
        "Minimalist",
        "Accessory",
        "Dress"
      ]
    },
    {
      "id": "fashion-Advanced-9",
      "level": "Advanced",
      "prompt": "Dalam konteks fashion & style yang lebih formal, istilah mana yang paling sesuai dengan: \"a popular style at a time\"?",
      "answer": "Trend",
      "options": [
        "Elegance",
        "Trend",
        "Fabric",
        "Tailor"
      ]
    }
  ]
};

function buildQuizQuestions(_: string, language: 'en' | 'id' = 'en'): QuizQuestion[] {
  return quizQuestionsByLanguage[language] ?? quizQuestionsByLanguage.en;
}

export default function EnglishVocabularyTopik20Page() {
  return (
    <VocabularyQuizPage
      key="english-vocabulary-topik20"
      topicId={material.id}
      skillId="vocabulary"
      quizTopics={[material]}
      buildQuizQuestions={buildQuizQuestions}
      quizLabel="Vocabulary"
      backPath="/latihan/english/vocabulary"
    />
  );
}
